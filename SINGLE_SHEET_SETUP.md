# 📊 Single Google Sheet Setup Guide - Italy Trip 2025

## Overview
Your trip now has:
- **2 Flight Arrival Routes** (hardcoded - Mary/Lisa from Atlanta, Keo/Karen from Sarasota→Boston)
- **1 Shared Italy Itinerary** (from Google Sheets - everyone travels together in Italy!)

## Quick Setup (3 Steps!)

### Step 1: Create Your Google Sheet 📝

Create **ONE** Google Sheet with these columns:

| name | lat | lng | order | dates | accommodation | activities | notes |
|------|-----|-----|-------|-------|---------------|------------|-------|
| Rome | 41.9028 | 12.4964 | 1 | Sept 23-26 | Hotel Forum | Colosseum, Vatican | Arrival city! |
| Florence | 43.7696 | 11.2558 | 2 | Sept 26-29 | TBD | Uffizi, Duomo | Book Uffizi ahead |
| Venice | 45.4408 | 12.3155 | 3 | Sept 29-Oct 2 | TBD | Gondolas, St Marks | No cars! |
| Tuscany | 43.4667 | 11.3000 | 4 | Oct 2-4 | Villa TBD | Wine tasting, Cooking | Consider car rental |

**Column Descriptions:**

**Required:**
- `name` - City/location name
- `lat` - Latitude (from Google Maps)
- `lng` - Longitude (from Google Maps)
- `order` - Stop number (1, 2, 3, 4...)

**Optional (but recommended):**
- `dates` - When you'll be there
- `accommodation` - Hotel/lodging
- `activities` - What you'll do
- `notes` - Important reminders

### Step 2: Publish Your Google Sheet 🌐

1. In Google Sheets: **File → Share → Publish to web**
2. Select your sheet/tab from dropdown
3. Keep format as "Web page" (or select CSV)
4. Click **"Publish"**
5. ✅ Check "Automatically republish when changes are made"
6. **Copy the URL** that appears

Your URL should look like:
```
https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0/edit#gid=0
```

### Step 3: Update Your Code 💻

1. Open `script-single-sheet.js`
2. Find this section at the top:
```javascript
const GOOGLE_SHEETS_CONFIG = {
  itinerarySheetUrl: 'YOUR_GOOGLE_SHEET_URL',
  useFallbackData: false
};
```

3. Replace `'YOUR_GOOGLE_SHEET_URL'` with your actual sheet URL:
```javascript
const GOOGLE_SHEETS_CONFIG = {
  itinerarySheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=0',
  useFallbackData: false
};
```

4. Replace `index.html` with `index-new.html`:
   - Rename: `index.html` → `index-old.html` (backup)
   - Rename: `index-new.html` → `index.html`

OR just update the script reference in your existing index.html:
```html
<script src="script-single-sheet.js"></script>
```

### Step 4: Test! ✅

1. Open `index-new.html` in a browser
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Look for: "All maps loaded successfully!"
5. Check both maps display correctly

## Getting Coordinates from Google Maps 🗺️

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your location (e.g., "Rome, Italy")
3. **Right-click** on the location
4. **Click the coordinates** at the top of the menu (they'll copy automatically)
5. First number = **lat**, Second number = **lng**

Example: `41.9028, 12.4964`

## Sample Data Template

Copy this into your Google Sheet to get started:

```csv
name,lat,lng,order,dates,accommodation,activities,notes
Rome,41.9028,12.4964,1,Sept 23-26,Hotel Forum,Colosseum; Vatican; Trevi Fountain,Everyone arrives here!
Florence,43.7696,11.2558,2,Sept 26-29,Hotel TBD,Uffizi Gallery; Duomo; Ponte Vecchio,Book Uffizi tickets ahead
Venice,45.4408,12.3155,3,Sept 29-Oct 2,Hotel TBD,Gondola rides; St Mark's Basilica; Rialto,No cars - water taxis only
Tuscany,43.4667,11.3000,4,Oct 2-4,Villa TBD,Wine tasting; Hill towns; Cooking class,Consider renting a car
```

## Making Updates 🔄

1. **Edit your Google Sheet** - Change dates, hotels, activities, etc.
2. **Save** (Google auto-saves)
3. **Refresh your website** - Changes appear automatically!

*Note: May take 5-10 minutes for Google's cache to update*

## What Shows on Your Website

### Flight Arrivals Map
- Shows 2 flight routes to Rome (Mary/Lisa from Atlanta, Keo/Karen via Boston)
- **These are hardcoded** - don't need to update in sheets
- Orange route = Mary & Lisa
- Purple route = Keo & Karen

### Italy Itinerary Map
- Shows your shared Italy travel route
- **Pulls from Google Sheets** - easy to update!
- Blue route = Everyone traveling together
- Click markers for details (dates, hotels, activities)

## Troubleshooting 🔧

**Map shows fallback data:**
- Check that Google Sheet URL is correct in `script-single-sheet.js`
- Verify sheet is published (File → Share → Publish to web)
- Try opening sheet URL in private browser window

**Changes not appearing:**
- Wait 5-10 minutes for cache
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure "Automatically republish" is enabled

**Console errors:**
- Verify column names match exactly (case-sensitive!)
- Check coordinates are numbers only (no degree symbols)
- Make sure order values are sequential (1, 2, 3, 4...)

**Flight map not showing:**
- Flight routes are hardcoded in `script-single-sheet.js`
- Check that `index-new.html` has the correct map div IDs
- Look for JavaScript errors in Console (F12)

## Benefits of This Setup 🎉

✅ **Simple** - Only one Google Sheet to manage
✅ **Collaborative** - Share with all travelers for editing
✅ **Flexible** - Add/remove/reorder destinations easily
✅ **Live Updates** - Changes appear automatically
✅ **Mobile Friendly** - Update from any device
✅ **Clear Visual** - See both flight arrivals and travel route

## Flight Information

To update flight details, edit the HTML file:

1. Open `index-new.html`
2. Find the flight-cards section
3. Update the "TBD" entries with actual flight info:

```html
<div class="route">
    <strong>Flight Details:</strong> Delta #123, departs 3:00 PM
</div>
```

## Need More Help?

- Check browser Console (F12) for detailed error messages
- The fallback data will display if sheets aren't configured
- Make sure sheet is published, not just shared
- Test with sample data first before adding all details

---

**Pro Tip:** Keep the Google Sheet URL bookmarked so you can quickly update your itinerary as you plan and travel!
