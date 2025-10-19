# 🎯 Quick Reference - Single Sheet Italy Trip

## What Changed?

### BEFORE (Old Version):
- ❌ 2 separate family itineraries
- ❌ 2 different routes through Italy
- ❌ Needed 2 Google Sheets

### AFTER (New Version):
- ✅ 2 flight arrival routes (Mary/Lisa & Keo/Karen)
- ✅ 1 shared Italy itinerary (everyone travels together)
- ✅ Only 1 Google Sheet needed!

## Files You Need

### Main Files:
- **`index-new.html`** - Your new webpage (rename to `index.html` when ready)
- **`script-single-sheet.js`** - JavaScript with single-sheet integration
- **1 Google Sheet** - Your Italy destinations

### Setup Guides:
- **`SINGLE_SHEET_SETUP.md`** - Complete setup instructions
- **`QUICK_START.md`** - Original guide (for reference)

## 3-Minute Setup

1. **Create Google Sheet** with columns:
   ```
   name | lat | lng | order | dates | accommodation | activities | notes
   ```

2. **Publish it:**
   - File → Share → Publish to web → Publish
   - Copy the URL

3. **Update `script-single-sheet.js`:**
   ```javascript
   itinerarySheetUrl: 'PASTE_YOUR_URL_HERE'
   ```

4. **Use the new page:**
   - Rename `index-new.html` to `index.html`
   - Or update your current `index.html` to use `script-single-sheet.js`

## What You'll See

### 🛫 Flight Arrivals Map
- **Orange route:** Mary & Lisa (Atlanta → Rome)
- **Purple route:** Keo & Karen (Sarasota → Boston → Rome)
- Hardcoded - no need to edit!

### 🗺️ Italy Itinerary Map
- **Blue route:** Everyone's shared Italy journey
- From Google Sheets - easy to update!
- Click markers for details

## Sample Google Sheet Data

```csv
name,lat,lng,order,dates,accommodation,activities,notes
Rome,41.9028,12.4964,1,Sept 23-26,Hotel Forum,Colosseum; Vatican,Arrival city!
Florence,43.7696,11.2558,2,Sept 26-29,TBD,Uffizi; Duomo,Book ahead
Venice,45.4408,12.3155,3,Sept 29-Oct 2,TBD,Gondolas; St Marks,No cars
Tuscany,43.4667,11.3000,4,Oct 2-4,Villa TBD,Wine tasting,Car rental?
```

## Getting Coordinates

1. Google Maps → Right-click location → Click coordinates
2. Format: `41.9028, 12.4964`
3. First = lat, Second = lng

## Making Changes

### Update Italy Itinerary:
1. Edit Google Sheet
2. Save (auto-saves)
3. Refresh website (5-10 min delay)

### Update Flight Info:
1. Edit `index-new.html`
2. Find flight-cards section
3. Replace "TBD" with real info

## File Summary

| File | Purpose | Need to Edit? |
|------|---------|---------------|
| `index-new.html` | New webpage | Only for flight details |
| `script-single-sheet.js` | Map code | Yes - add sheet URL |
| `Google Sheet` | Italy destinations | Yes - your itinerary! |
| `SINGLE_SHEET_SETUP.md` | Detailed guide | No - reference only |

## Checklist

- [ ] Created Google Sheet with correct columns
- [ ] Added Italy destinations with coordinates
- [ ] Published sheet to web (File → Share → Publish)
- [ ] Copied sheet URL
- [ ] Pasted URL in `script-single-sheet.js`
- [ ] Tested in browser (open `index-new.html`)
- [ ] Checked Console for "All maps loaded successfully!"
- [ ] Updated flight details in HTML (optional)
- [ ] Ready to share with travel group!

## Tips

💡 Share Google Sheet edit access with all travelers
💡 Bookmark your sheet URL for quick access
💡 Test with sample data before adding everything
💡 Use semicolons (;) to separate multiple activities
💡 Clear browser cache if changes don't appear

## Support

- Open browser Console (F12) to see errors
- Fallback data displays if sheet not configured
- Check `SINGLE_SHEET_SETUP.md` for troubleshooting

---

**Ready to go?** Open `index-new.html` in your browser to see it in action!
