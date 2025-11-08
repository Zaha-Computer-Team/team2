// Code.gs
const SHEET_ID = '1_Y3ETDpkkBX_LOBSawAR5WYA3UHFxf8hOm_NQPZfghc'; // <- your sheet id
const SHEET_NAME = ''; // optional: set to specific sheet name or leave empty to use first sheet

/**
 * Serve the HTML UI (Index.html)
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Glassy Sheet Editor')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Return the sheet data as a 2D array.
 * The front-end will render the whole table exactly as the sheet values array.
 */
function getSheetData() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
  if (!sheet) return { error: 'Sheet not found' };

  // Use getDataRange to capture existing table bounds (no added rows outside current data)
  const range = sheet.getDataRange();
  const values = range.getValues(); // 2D array (rows x cols)
  return { values: values };
}

/**
 * Update a single existing cell. Expects:
 *   { row: <1-based>, col: <1-based>, value: <string|number|boolean> }
 * Returns { success: true } or { success:false, error: "..." }
 *
 * This enforces that the cell must be inside the sheet's current data bounds.
 */
function updateCell(payload) {
  try {
    const row = Number(payload.row);
    const col = Number(payload.col);
    const value = payload.value;

    if (!row || !col) return { success: false, error: 'Invalid row/col' };

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
    if (!sheet) return { success: false, error: 'Sheet not found' };

    const dataRange = sheet.getDataRange();
    const lastRow = dataRange.getLastRow();
    const lastCol = dataRange.getLastColumn();

    if (row < 1 || col < 1 || row > lastRow || col > lastCol) {
      return { success: false, error: 'Out of bounds. Editing allowed only inside existing data.' };
    }

    sheet.getRange(row, col).setValue(value);
    return { success: true, row: row, col: col };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}
