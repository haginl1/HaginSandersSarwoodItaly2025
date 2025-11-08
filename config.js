// Configuration file for Google Sheets Integration
// Replace the URLs below with your published Google Sheets URLs

window.GOOGLE_SHEETS_CONFIG = {
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

// Google Photos Configuration
// To display photos from Google Photos:
// 1. Create a shared Google Photos album for your Italy trip
// 2. Add photos to the album from your phone during the trip
// 3. Get the shareable link: Open album → Share → Create link → Copy
// 4. Paste the link below
window.GOOGLE_PHOTOS_CONFIG = {
  albumUrl: 'https://photos.app.goo.gl/zfWpnkSRrKjrRT416', // Paste your Google Photos album share link here
  
  // PHOTO URLS - Add direct image URLs here for the scrolling gallery
  // To get direct URLs from Google Photos:
  // 1. Open a photo in Google Photos
  // 2. Click the 3-dot menu → "Download" or right-click → "Open image in new tab"
  // 3. Copy the image URL from the new tab
  // 4. Add it to the array below
  photoUrls: [
    // Example: 'https://lh3.googleusercontent.com/...',
    // Add your photo URLs here - they will appear in the scrolling gallery at the bottom of the page
    // You can also use any other image hosting service (Imgur, Cloudinary, etc.)
  ]
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
