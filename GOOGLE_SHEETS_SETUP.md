# Google Sheets Integration Setup Guide

This guide will help you connect your Italy trip itinerary to Google Sheets for easy updates.

## Step 1: Create Your Google Sheets

### Option A: Use the Template Structure

Create two Google Sheets (one for each family) with the following columns:

| name | lat | lng | order | dates | accommodation | activities | notes |
|------|-----|-----|-------|-------|---------------|------------|-------|
| Venice | 45.4408 | 12.3155 | 1 | May 15-17 | Hotel Danieli | Gondola ride, St. Mark's | Arrive by train |
| Florence | 43.7696 | 11.2558 | 2 | May 17-19 | Villa Medici | Uffizi Gallery, Duomo | Book Uffizi ahead |
| Rome | 41.9028 | 12.4964 | 3 | May 19-22 | Hotel Forum | Colosseum, Vatican | Vatican on Wed |

### Column Descriptions:
- **name** (required): City or location name
- **lat** (required): Latitude coordinate (get from Google Maps)
- **lng** (required): Longitude coordinate (get from Google Maps)
- **order** (required): Stop number in the trip (1, 2, 3, etc.)
- **dates** (optional): Date range for this location
- **accommodation** (optional): Where you're staying
- **activities** (optional): What you plan to do
- **notes** (optional): Any additional notes or reminders

### Finding Coordinates:
1. Go to Google Maps
2. Right-click on the location
3. Click the coordinates that appear at the top
4. Copy the latitude (first number) and longitude (second number)

## Step 2: Publish Your Google Sheets

For each sheet:

1. **Open your Google Sheet**
2. **Click "File" → "Share" → "Publish to web"**
3. **In the dialog:**
   - Link: Select the specific sheet/tab you want to publish
   - Format: Leave as "Web page" or select "Comma-separated values (.csv)"
   - Click "Publish"
4. **Copy the URL** that appears - you'll need this!

### Important Publishing Settings:
- Make sure "Automatically republish when changes are made" is checked
- You can keep the sheet private to edit, but it needs to be published to read

## Step 3: Update Your Website Code

1. **Open `script-sheets.js`** in your code editor

2. **Find this section at the top:**
```javascript
const GOOGLE_SHEETS_CONFIG = {
  haginSandersSheetUrl: 'YOUR_HAGIN_SANDERS_SHEET_URL',
  sarwoodSheetUrl: 'YOUR_SARWOOD_SHEET_URL'
};
```

3. **Replace the URLs** with your published Google Sheets URLs:
```javascript
const GOOGLE_SHEETS_CONFIG = {
  haginSandersSheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=0',
  sarwoodSheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=0'
};
```

4. **Update `index.html`** to use the new script:
   - Find: `<script src="script.js"></script>`
   - Replace with: `<script src="script-sheets.js"></script>`

## Step 4: Test It!

1. Open `index.html` in a browser
2. Open browser Developer Tools (F12)
3. Check the Console tab for any errors
4. You should see: "Loading trip data..." and "Maps loaded successfully!"

## Step 5: Make Updates

Now you can easily update your trip:

1. **Edit your Google Sheet** - add, remove, or modify locations
2. **Save the changes** - they auto-publish
3. **Refresh your website** - new data appears automatically!

### Update Frequency:
- Google Sheets may cache for 5-10 minutes
- Add `?nocache=${Date.now()}` to force fresh data during testing

## Troubleshooting

### Maps show fallback data:
- Check that your Google Sheets URLs are correctly pasted
- Verify the sheets are published to the web
- Open the sheet URL in a private browser window to test access

### Coordinates not working:
- Make sure lat/lng are numbers (no text)
- Check for correct decimal format (e.g., 45.4408, not 45° 26' 27")
- Use negative numbers for South latitude and West longitude

### Changes not appearing:
- Clear your browser cache (Ctrl+Shift+Delete)
- Wait 5-10 minutes for Google's cache to update
- Check that "Automatically republish when changes are made" is enabled

## Example Google Sheets URLs

You'll need URLs that look like one of these:

✅ **Good formats:**
- `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0/edit#gid=0`
- `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0/export?format=csv`

❌ **Won't work:**
- Desktop file paths
- Private/non-published sheets
- Sheets without proper columns

## Sample Data Template

Create a new Google Sheet and copy this data to get started:

### Hagin-Sanders Family Sheet:
```
name,lat,lng,order,dates,accommodation,activities,notes
Venice,45.4408,12.3155,1,May 15-17,Hotel Danieli,Gondola ride; St Mark's Basilica,Arrive by train from airport
Florence,43.7696,11.2558,2,May 17-19,Villa Medici,Uffizi Gallery; Duomo; Ponte Vecchio,Book Uffizi tickets in advance
Rome,41.9028,12.4964,3,May 19-22,Hotel Forum,Colosseum; Vatican; Trevi Fountain,Vatican tour on Wednesday
Cinque Terre,44.1268,9.7267,4,May 22-24,Vernazza B&B,Hiking; Beach; Local cuisine,Bring hiking shoes
Milan,45.4642,9.1900,5,May 24-26,Hotel Principe,Duomo; Last Supper; Shopping,Book Last Supper ahead
```

### Sarwood Family Sheet:
```
name,lat,lng,order,dates,accommodation,activities,notes
Venice,45.4408,12.3155,1,May 15-17,Hotel Palazzo,Canal tour; Doge's Palace,Same hotel district as Hagins
Florence,43.7696,11.2558,2,May 17-19,Palazzo Vecchio,Galleries; Cathedral; Markets,Meet for dinner at 7pm
Rome,41.9028,12.4964,3,May 19-22,Residenza Roma,Ancient sites; Vatican; Food tour,Joint Vatican tour with Hagins
Siena,43.3188,11.3307,4,May 22-23,Siena Garden Hotel,Piazza del Campo; Cathedral,Medieval city exploration
Chianti Region,43.4667,11.3000,5,May 23-26,Villa Tuscany,Wine tasting; Countryside,Rental car needed
```

## Next Steps

After setup:
1. Keep the Google Sheets open in a browser tab for easy editing
2. Share the sheets with travel companions (view or edit access)
3. Update as you plan and book
4. Refresh the website to see changes

## Need Help?

- The fallback data will always work if sheets aren't configured
- Test with one sheet first, then add the second
- Check browser console (F12) for detailed error messages
