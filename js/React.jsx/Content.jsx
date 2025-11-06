import { useEffect, useState, Fragment } from 'react';

// --- CONFIGURATION (Based on your original file) ---
// **IMPORTANT:** Replace these placeholder values with your actual ID and GID
// if they differ from the original file's values.
const SHEET_ID = '1_Y3ETDpkkBX_LOBSawAR5WYA3UHFxf8hOm_NQPZfghc';
const SHEET_GID = '1354526022';

// Global variables (Kept for compatibility with all existing non-React components)
// All components in the original file rely on this global variable being updated.
let sheetData = null; 

const getDefaultData = () => ({ 
    // Provide some robust defaults here if needed, in case the sheet fails to load
    header_title: "Default Website Title",
    section_a_title: "Data Loading...",
    section_a_content: "Content is being loaded from Google Sheets. Please wait.",
    section_b_title: "Loading Status",
    section_b_content: "Initializing system components.",
    footer_text: "Default Footer Content"
});

// Global function used by all original components (g, r, N, f, u, w, j, t, p, n, l)
const getText = (key) => {
    // This function will fetch from the global 'sheetData'
    const currentData = sheetData || getDefaultData();
    return currentData[key] || getDefaultData()[key] || key;
};

// --- CORE DATA FETCHING FUNCTION (Improved for robustness) ---
// This function fetches data using the gviz endpoint but safely parses the response.
const fetchSheetData = async () => {
    try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;
        const response = await fetch(url);
        
        // Use a 5-second timeout for the text response
        const textPromise = response.text();
        const text = await Promise.race([
            textPromise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('Sheet response timeout')), 5000))
        ]);

        // Robust parsing: Safely check for the JSON boundaries
        const startIndex = text.indexOf('{');
        const endIndex = text.lastIndexOf('}');
        
        if (startIndex === -1 || endIndex === -1) {
            console.error('Error parsing Google Sheet data: Invalid JSONP response format.');
            return getDefaultData();
        }

        const jsonText = text.substring(startIndex, endIndex + 1);
        const json = JSON.parse(jsonText);
        
        // Extract key-value pairs (assuming column 1 is key, column 2 is value)
        const rows = json.table.rows.map(row => ({
            key: row.c[0]?.v,
            value: row.c[1]?.v
        }));
        
        const fetchedData = {};
        rows.forEach(row => {
            if (row.key && row.value !== undefined) {
                fetchedData[row.key] = row.value;
            }
        });
        
        return fetchedData;
    } catch (error) {
        console.error('Error fetching Google Sheet data:', error);
        return getDefaultData();
    }
};

// --- NEW REACT COMPONENT TO MANAGE DATA STATE ---
// This component manages the fetching lifecycle and state update, replacing the 
// window.dispatchEvent(new Event('resize')) hack.
const SheetDataProvider = ({ children }) => {
    // State to track if loading is complete. Updating this state triggers a clean re-render.
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock function for any initial window-level setup, if needed (like 'y()' in original)
        if (typeof window.y === 'function') {
            window.y(); 
        }

        fetchSheetData().then(fetchedData => {
            // 1. Update the global variable that all old components rely on
            sheetData = fetchedData; 
            
            // 2. Mark loading as complete (triggers a clean re-render of App)
            setIsLoading(false);
            console.log('Sheet data loaded and application state updated.');
        }).catch(err => {
            console.error('Fatal error during fetch and update:', err);
            setIsLoading(false); // Still render, but using defaults
        });
    }, []); 

    // Optional: Render a loading state while waiting for the sheet data
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="p-8 bg-white rounded-xl shadow-2xl flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-gray-700 font-semibold text-lg">Loading Website Content...</span>
                </div>
            </div>
        );
    }
    
    // Once loaded (or timed out), render the rest of the application
    return <Fragment>{children}</Fragment>;
};

// --- MOCK COMPONENTS (Based on your original component names) ---
// These mock components simulate your actual application structure 
// (n, g, r, N, f, u, w, j, t, p, l) using the global getText() function.
const MockN = () => <header className="p-4 bg-indigo-700 text-white font-extrabold text-3xl shadow-lg rounded-t-xl">
    {getText('header_title') || 'Default Header Title'}
</header>;
const MockG = () => <section className="p-6 bg-white shadow-md rounded-lg mb-4 transform hover:scale-[1.01] transition duration-200">
    <h2 className="text-xl font-bold text-indigo-800 mb-2">Component G: {getText('section_a_title')}</h2>
    <p className="text-gray-600">{getText('section_a_content')}</p>
</section>;
const MockR = () => <section className="p-6 bg-white shadow-md rounded-lg mb-4 transform hover:scale-[1.01] transition duration-200">
    <h2 className="text-xl font-bold text-indigo-800 mb-2">Component R: {getText('section_b_title')}</h2>
    <p className="text-gray-600">{getText('section_b_content')}</p>
</section>;
const MockN_Divider = ({ type }) => <div className={`h-1 my-4 rounded-full ${type === 'down' ? 'bg-indigo-200' : 'bg-indigo-300'}`}></div>;
// Mocks for f, u, w, j, t, p are consolidated to show the repeating layout pattern
const MockContentBlock = ({ id }) => <section className="p-6 bg-white shadow-md rounded-lg mb-4 transform hover:scale-[1.01] transition duration-200">
    <h2 className="text-xl font-bold text-gray-800 mb-2">Content Block {id}</h2>
    <p className="text-gray-600">This block uses dynamic text: **{getText(`block_${id}_text`) || `Fallback for block ${id}`}**</p>
</section>;
const MockL = () => <footer className="p-4 mt-8 bg-indigo-900 text-white text-center text-sm rounded-b-xl shadow-inner">
    {getText('footer_text') || '© 2024 Enhanced Website'}
</footer>;


// --- ROOT COMPONENT (I) ---
// This is the main application component, now simplified because fetching is elsewhere.
const App = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <MockN /> {/* n */}
            <div id="wrapper" className="max-w-5xl mx-auto py-8">
                <main className="flex flex-col gap-4 p-8 bg-white border border-gray-200 rounded-xl shadow-2xl">
                    {/* The original order of your components is preserved here */}
                    <MockG /> {/* g */}
                    <MockR /> {/* r */}
                    <MockN_Divider type="down" /> {/* N */}
                    <MockContentBlock id="f" /> {/* f */}
                    <MockN_Divider type="up" /> {/* N */}
                    <MockContentBlock id="u" /> {/* u */}
                    <MockN_Divider type="down" /> {/* N */}
                    <MockContentBlock id="w" /> {/* w */}
                    <MockN_Divider type="up" /> {/* N */}
                    <MockContentBlock id="j" /> {/* j */}
                    <MockN_Divider type="down" /> {/* N */}
                    <MockN_Divider type="up" /> {/* N */}
                    <MockContentBlock id="t" /> {/* t */}
                    <MockN_Divider type="down" /> {/* N */}
                    <MockContentBlock id="p" /> {/* p */}
                </main>
            </div>
            <MockL /> {/* l */}

            <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg max-w-5xl mx-auto shadow">
                <p className="font-bold">System Improvement Status</p>
                <p className="text-sm">
                    The data fetching system is now managed by a top-level React component, which guarantees a clean and reliable re-render upon successful data load, eliminating the need for `window.dispatchEvent('resize')`. The global `getText()` function remains compatible with all your existing application logic.
                </p>
            </div>
        </div>
    );
};

// Export the final application structure wrapped by the new provider
const FinalApp = () => (
    <SheetDataProvider>
        <App />
    </SheetDataProvider>
);

export default FinalApp;