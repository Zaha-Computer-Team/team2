const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 25500;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'public', 'uploads');
    require('fs').mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Google Sheets initialization
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

// In-memory content cache, loaded from sheet on startup/updates
let contentCache = {}; 
// In-memory fallback data for other sections if sheet is unavailable
const websiteData = { 
    teams: [], // Assume teams are managed separately or static for now
    registrations: [], 
    content: contentCache // websiteData.content now points to the dynamic cache
};


/**
 * Loads content data from the Google Sheet into the contentCache.
 * This is crucial for making the public API reflect the changes made by the admin.
 */
async function loadContentFromSheet() {
    try {
        const sheetsReady = await initGoogleSheets();
        if (!sheetsReady) return false;

        const contentSheet = doc.sheetsByTitle['Content'];
        if (!contentSheet) {
            console.error('Content sheet not found in document.');
            return false;
        }

        const rows = await contentSheet.getRows();
        const content = {};
        
        rows.forEach(row => {
            if (row.key && row.value !== undefined) {
                content[row.key] = row.value;
            }
        });

        contentCache = content;
        console.log(`✅ Content cache updated with ${Object.keys(content).length} keys.`);
        return true;
    } catch (error) {
        console.error('❌ Error loading content from sheet:', error.message);
        return false;
    }
}


async function initGoogleSheets() {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();

    // Ensure sheets exist
    const sheets = [
      { title: 'Users', headers: ['username', 'password', 'createdAt'] },
      { title: 'Content', headers: ['key', 'value', 'updatedAt'] },
      { title: 'Registrations', headers: ['id', 'name', 'email', 'phone', 'team', 'date', 'status'] }
    ];

    for (const sheetConfig of sheets) {
      let sheet;
      if (!doc.sheetsByTitle[sheetConfig.title]) {
        sheet = await doc.addSheet({ title: sheetConfig.title, headerValues: sheetConfig.headers });
      } else {
        sheet = doc.sheetsByTitle[sheetConfig.title];
        await sheet.loadHeaderRow();
      }
    }

    console.log('✅ Google Sheets connected');
    return true;
  } catch (err) {
    console.error('❌ Google Sheets init failed:', err.message);
    return false;
  }
}

// Initialize sheets and load content on startup
(async () => {
    await initGoogleSheets();
    await loadContentFromSheet();
})();

// JWT Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// ============ ROUTES ============

// Public route: Serve content from the cached sheet data
app.get('/api/content', (req, res) => {
  // Website now reads from the contentCache, which is synced with the Google Sheet
  res.json({ success: true, data: contentCache });
});

// ADMIN: GET all editable content (array format)
app.get('/api/admin/content', authenticateToken, async (req, res) => {
    try {
        const sheetsReady = await initGoogleSheets();
        if (!sheetsReady) {
            return res.status(503).json({ success: false, message: 'Google Sheets not available.' });
        }

        const contentSheet = doc.sheetsByTitle['Content'];
        const rows = await contentSheet.getRows();
        
        // Return content as an array of objects {key, value} for easier admin editing
        const contentArray = rows.map(row => ({
            key: row.key,
            value: row.value,
            updatedAt: row.updatedAt
        }));

        res.json({ success: true, data: contentArray });
    } catch (error) {
        console.error('Admin GET content error:', error);
        res.status(500).json({ success: false, message: 'Error fetching admin content.' });
    }
});


// ADMIN: PUT (UPDATE/CREATE) content in the Google Sheet
app.put('/api/admin/content', authenticateToken, async (req, res) => {
    try {
        const { key, value } = req.body;
        
        if (!key || value === undefined) {
            return res.status(400).json({ success: false, message: 'Key and value are required.' });
        }

        const sheetsReady = await initGoogleSheets();
        if (!sheetsReady) {
            return res.status(503).json({ success: false, message: 'Google Sheets not available.' });
        }

        const contentSheet = doc.sheetsByTitle['Content'];
        const rows = await contentSheet.getRows();
        const rowToUpdate = rows.find(row => row.key === key);

        let message = '';
        if (!rowToUpdate) {
            // Create a new row
            await contentSheet.addRow({
                key,
                value,
                updatedAt: new Date().toISOString()
            });
            message = `Content key '${key}' created and updated successfully.`;
        } else {
            // Update the existing row
            rowToUpdate.value = value;
            rowToUpdate.updatedAt = new Date().toISOString();
            await rowToUpdate.save();
            message = `Content key '${key}' updated successfully.`;
        }

        // Crucial: Update the in-memory cache so the public website is instantly updated
        await loadContentFromSheet(); 

        res.json({ success: true, message });
    } catch (error) {
        console.error('Admin PUT content error:', error);
        res.status(500).json({ success: false, message: 'Error updating content in Google Sheet.' });
    }
});


// Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password required' 
      });
    }

    let user = null;

    // Try Sheets first
    try {
      const sheetsReady = await initGoogleSheets();
      if (sheetsReady) {
        const sheet = doc.sheetsByTitle['Users'];
        const rows = await sheet.getRows();
        const found = rows.find(r => r.username === username);
        if (found && await bcrypt.compare(password, found.password)) {
          user = { username: found.username };
        }
      }
    } catch (err) {
      console.warn('⚠️ Sheets login failed:', err.message);
    }

    // Fallback hardcoded admin
    if (!user) {
      const hardcodedAdmin = {
        username: 'admin',
        password: '$2a$10$8K1p/a0dRTlR0dC4d2ADXuR3U2VYZu2YQ7J2J9zY9qYqVY9qY9qY9q' // 'admin123'
      };
      
      if (username === hardcodedAdmin.username && 
          await bcrypt.compare(password, hardcodedAdmin.password)) {
        user = { username };
      }
    }

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({ 
      success: true, 
      token, 
      user: { username: user.username } 
    });
    
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

// Submit registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, team } = req.body;
    
    if (!name || !email || !team) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and team are required'
      });
    }
    
    const newRegistration = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      team,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    // Try Google Sheets first
    try {
      const sheetsReady = await initGoogleSheets();
      if (sheetsReady) {
        const regSheet = doc.sheetsByTitle['Registrations'];
        await regSheet.addRow(newRegistration);
      } else {
        throw new Error('Sheets not available');
      }
    } catch (error) {
      console.log('Google Sheets registration failed, using local storage');
      websiteData.registrations.push(newRegistration);
    }
    
    res.json({
      success: true,
      message: 'Registration submitted successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting registration'
    });
  }
});

// Upload route
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    const imageUrl = '/uploads/' + req.file.filename;
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading image'
    });
  }
});

// Get Teams (using local data/fallback)
app.get('/api/teams', (req, res) => {
  res.json({ success: true, data: websiteData.teams });
});

// Admin stats
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    let registrations = [];
    
    // Try to get from Google Sheets
    try {
      const sheetsReady = await initGoogleSheets();
      if (sheetsReady) {
        const regSheet = doc.sheetsByTitle['Registrations'];
        if (regSheet) {
          const rows = await regSheet.getRows();
          registrations = rows.map(row => ({
            status: row.status || 'pending'
          }));
        }
      }
    } catch (error) {
      console.log('Google Sheets stats failed, using local storage');
      registrations = websiteData.registrations;
    }
    
    const stats = {
      totalRegistrations: registrations.length,
      pendingRegistrations: registrations.filter(r => r.status === 'pending').length,
      approvedRegistrations: registrations.filter(r => r.status === 'approved').length,
      totalTeams: websiteData.teams.length
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching stats'
    });
  }
});

// Registrations
app.get('/api/registrations', authenticateToken, async (req, res) => {
  try {
    let registrations = [];
    
    // Try Google Sheets first
    try {
      const sheetsReady = await initGoogleSheets();
      if (sheetsReady) {
        const regSheet = doc.sheetsByTitle['Registrations'];
        if (regSheet) {
          const rows = await regSheet.getRows();
          registrations = rows.map(row => ({
            id: row.id,
            name: row.name,
            email: row.email,
            phone: row.phone,
            team: row.team,
            date: row.date,
            status: row.status || 'pending'
          }));
        }
      }
    } catch (error) {
      console.log('Google Sheets registrations failed, using local storage');
      registrations = websiteData.registrations;
    }
    
    res.json({
      success: true,
      data: registrations
    });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations'
    });
  }
});

// Update team
app.put('/api/teams/:id', authenticateToken, (req, res) => {
  try {
    const teamId = parseInt(req.params.id);
    const { name, description, image } = req.body;
    
    const teamIndex = websiteData.teams.findIndex(team => team.id === teamId);
    
    if (teamIndex !== -1) {
      websiteData.teams[teamIndex] = {
        ...websiteData.teams[teamIndex],
        ...(name && { name }),
        ...(description && { description }),
        ...(image && { image })
      };
      
      res.json({
        success: true,
        message: 'Team updated successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }
  } catch (error) {
    console.error('Update team error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating team'
    });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running', 
    timestamp: new Date().toISOString() 
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Serve static files for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Zaha Culture Center server running on http://localhost:${PORT}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin.html`);
  console.log(`❤️ Health check: http://localhost:${PORT}/api/health`);
});