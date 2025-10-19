# 📊 Google Sheets Integration - Quick Reference

## What This Does
Allows you to edit your Italy trip itinerary in Google Sheets and have the changes automatically appear on your website. No more editing code!

## Files Created
- ✅ `script-sheets.js` - Updated JavaScript with Google Sheets integration
- ✅ `GOOGLE_SHEETS_SETUP.md` - Detailed setup instructions
- ✅ `google-sheets-template.html` - Visual setup guide (open in browser)
- ✅ `config.js` - Configuration file reference

## Quick Setup (5 minutes)

### 1. Create Your Google Sheets 📝
Create 2 Google Sheets (one per family) with these columns:

**Required columns:**
- `name` - Location name (e.g., "Venice")
- `lat` - Latitude (e.g., 45.4408)
- `lng` - Longitude (e.g., 12.3155)
- `order` - Stop number (1, 2, 3...)

**Optional columns:**
- `dates` - When you'll be there
- `accommodation` - Where you're staying
- `activities` - What you'll do
- `notes` - Any reminders

### 2. Get Coordinates 🗺️
1. Open Google Maps
2. Right-click on a location
3. Click the coordinates at the top
4. Paste into your sheet (first = lat, second = lng)

### 3. Publish Your Sheets 🌐
1. File → Share → Publish to web
2. Select your sheet
3. Click "Publish"
4. Copy the URL
5. ✅ Check "Automatically republish when changes are made"

### 4. Update Your Code 💻
Open `script-sheets.js` and find this section:
```javascript
const GOOGLE_SHEETS_CONFIG = {
  haginSandersSheetUrl: 'YOUR_HAGIN_SANDERS_SHEET_URL',
  sarwoodSheetUrl: 'YOUR_SARWOOD_SHEET_URL'
};
```

Replace with your actual Google Sheets URLs.

### 5. Update index.html 📄
Find this line:
```html
<script src="script.js"></script>
```

Change to:
```html
<script src="script-sheets.js"></script>
```

### 6. Test! ✅
1. Open `index.html` in a browser
2. Press F12 (Developer Tools)
3. Check Console for: "Maps loaded successfully!"

## Sample Data Template

Copy this into your Google Sheets:

```
name,lat,lng,order,dates,accommodation,activities,notes
Venice,45.4408,12.3155,1,May 15-17,Hotel Danieli,Gondola; Museums,Arrive by train
Florence,43.7696,11.2558,2,May 17-19,Villa Medici,Uffizi; Duomo,Book ahead
Rome,41.9028,12.4964,3,May 19-22,Hotel Forum,Colosseum; Vatican,Wednesday tour
```

## Making Updates

1. **Edit your Google Sheet** - Change anything you want
2. **Save** - Google auto-saves
3. **Refresh website** - See your changes! (may take 5-10 min for cache)

## Tips 💡

✅ **Do:**
- Keep column names lowercase and exact
- Use decimal coordinates (45.4408, not 45° 26')
- Number your stops in order (1, 2, 3...)
- Share edit access with family members

❌ **Don't:**
- Rename the required columns
- Use degree symbols in coordinates
- Skip the "order" column
- Forget to publish the sheet

## Troubleshooting 🔧

**Maps show fallback data?**
- Check URLs are pasted correctly in script-sheets.js
- Verify sheets are published (not just shared)
- Try opening sheet URL in private browser window

**Changes not showing?**
- Wait 5-10 minutes (Google cache)
- Clear browser cache (Ctrl+Shift+Delete)
- Check "Automatically republish" is enabled

**Console errors?**
- Check column names match exactly
- Verify coordinates are numbers only
- Make sure "order" values are 1, 2, 3...

## Benefits 🎉

- ✨ Easy updates without touching code
- 👥 Share editing with family
- 📱 Edit from phone, tablet, anywhere
- 💾 Always have a backup in Google Sheets
- 🔄 Changes sync automatically

## Need More Help?

- 📖 Read `GOOGLE_SHEETS_SETUP.md` for detailed instructions
- 🌐 Open `google-sheets-template.html` in a browser for visual guide
- 🛠️ Check browser Console (F12) for error messages
- 💬 The fallback data will always work if sheets aren't configured

## Your Google Sheets URLs

Keep track of your sheet URLs here:

**Hagin-Sanders Sheet:**
```
_________________________________________
```

**Sarwood Sheet:**
```
_________________________________________
```

---

**Created:** $(date)
**Last Updated:** $(date)
