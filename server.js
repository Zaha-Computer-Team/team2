// server.js
import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS and JSON
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/api/test', (req, res) => {
  console.log('✅ Test route was called!');
  res.json({ 
    success: true, 
    message: 'Server is working perfectly!',
    timestamp: new Date().toISOString()
  });
});

// Admin login route
app.post('/api/admin/login', (req, res) => {
  console.log('📨 Login attempt received:', req.body);
  
  const { username, password } = req.body;
  
  // Simple check - use admin/admin123
  if (username === 'admin' && password === 'admin123') {
    res.json({
      success: true,
      message: 'Login successful!',
      user: { 
        id: 1,
        username: 'admin',
        name: 'Administrator'
      },
      token: 'your-auth-token-here'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }
});

// Start server on a different port if 5000 is busy
const PORT = 5001; // Changed to 5001
app.listen(PORT, () => {
  console.log('🎉 Server started successfully!');
  console.log(`📍 Running on: http://localhost:${PORT}`);
  console.log(`📍 Test URL: http://localhost:${PORT}/api/test`);
  console.log('📝 Try logging in with: admin / admin123');
});