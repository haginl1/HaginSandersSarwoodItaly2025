// Configuration file for Google Sheets Integration
// Replace the URLs below with your published Google Sheets URLs

export const GOOGLE_SHEETS_CONFIG = {
  // Hagin-Sanders Family Sheet URL
  // Get this from: File → Share → Publish to web → Copy link
  haginSandersSheetUrl: 'YOUR_HAGIN_SANDERS_SHEET_URL',
  
  // Sarwood Family Sheet URL
  // Get this from: File → Share → Publish to web → Copy link
  sarwoodSheetUrl: 'YOUR_SARWOOD_SHEET_URL',
  
  // Optional: Set to true to always use fallback data (for testing)
  useFallbackData: false,
  
  // Optional: Cache duration in milliseconds (default: 5 minutes)
  cacheTimeout: 300000
};

/* 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create your Google Sheets with these columns:
 *    - name (required)
 *    - lat (required) 
 *    - lng (required)
 *    - order (required)
 *    - dates (optional)
 *    - accommodation (optional)
 *    - activities (optional)
 *    - notes (optional)
 * 
 * 2. Publish your sheets:
 *    - File → Share → Publish to web
 *    - Select your sheet/tab
 *    - Click "Publish"
 *    - Copy the URL
 * 
 * 3. Paste the URLs above
 * 
 * 4. Update index.html to use script-sheets.js instead of script.js
 * 
 * For detailed instructions, see: GOOGLE_SHEETS_SETUP.md
 * For a visual guide, open: google-sheets-template.html
 */
