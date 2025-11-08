// server.js - Node.js Backend
const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');

const app = express();
const port = 3000;

// === CONFIGURATION ===
// Sheet ID from your URL: 1_Y3ETDpkkBX_LOBSawAR5WYA3UHFxf8hOm_NQPZfghc
const SHEET_ID = '1_Y3ETDpkkBX_LOBSawAR5WYA3UHFxf8hOm_NQPZfghc'; 
// Path to your downloaded service account key file
const KEY_FILE_PATH = './service-account-key.json'; 
// Sheet Name (e.g., 'Sheet1' or 'Sheet2')
const SHEET_NAME = 'Sheet2'; 

let sheetData = {};

// Use the service account credentials for authentication
const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

/**
 * Fetches and processes data from the Google Sheet.
 */
async function fetchSheetData() {
    try {
        console.log('Authenticating with Google Sheets API...');
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        // Fetch data from Columns A and B of the specified sheet
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: `${SHEET_NAME}!A:B`, // Fetch all data from A and B
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.warn('No data found in the sheet.');
            return;
        }

        const newSheetData = {};
        
        rows.forEach((row, index) => {
            const rawKey = row[0]; // Column A
            const rawValue = row[1] !== undefined ? row[1] : ''; // Column B, default to empty string

            if (rawKey) {
                // Normalize key: trim and uppercase
                const key = String(rawKey).trim().toUpperCase();
                const value = String(rawValue);
                
                newSheetData[key] = value;
            }
        });
        
        sheetData = newSheetData; // Update the global data store
        console.log(`Successfully fetched and processed ${Object.keys(sheetData).length} key/value pairs.`);

    } catch (error) {
        console.error('ERROR during Google Sheets API fetch:', error.message);
    }
}

// Set up CORS and JSON parsing
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow access from your local development environment
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Endpoint to serve the data
app.get('/api/translations', (req, res) => {
    if (Object.keys(sheetData).length === 0) {
        // If data is empty, try to fetch it again or send an error
        return res.status(503).json({ error: 'Data not loaded yet. Check server logs.' });
    }
    // Serve the clean, pre-processed data
    res.json(sheetData);
});

// Start the server and initiate the first data fetch
app.listen(port, async () => {
    console.log(`Node.js server running at http://localhost:${port}`);
    await fetchSheetData();
    // Schedule periodic updates (e.g., every 5 minutes)
    setInterval(fetchSheetData, 5 * 60 * 1000); 
});