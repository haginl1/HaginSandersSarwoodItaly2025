# ✅ Google Sheets Setup Checklist

Print this or keep it open while you work!

---

## Step 1: Create Google Sheet
- [ ] Go to https://sheets.google.com
- [ ] Click "+ Blank" to create new spreadsheet
- [ ] Name it "Italy Trip 2025 Itinerary"

## Step 2: Add Headers (Row 1)
Copy these exact names into Row 1:
- [ ] name
- [ ] lat
- [ ] lng
- [ ] order
- [ ] dates
- [ ] accommodation
- [ ] activities
- [ ] notes

## Step 3: Add Sample Data
Use the CSV template or add manually:
- [ ] Rome (41.9028, 12.4964, order: 1)
- [ ] Florence (43.7696, 11.2558, order: 2)
- [ ] Venice (45.4408, 12.3155, order: 3)
- [ ] Tuscany (43.4667, 11.3000, order: 4)

## Step 4: Publish Sheet
- [ ] Click File → Share → Publish to web
- [ ] Select your sheet/tab
- [ ] Keep format as "Web page"
- [ ] Click "Publish"
- [ ] ✅ Check "Automatically republish when changes are made"
- [ ] Copy the URL (save it below!)

**My Google Sheet URL:**
```
_____________________________________________
```

## Step 5: Update Code
- [ ] Open file: `script-single-sheet.js`
- [ ] Find line 6: `itinerarySheetUrl: 'YOUR_GOOGLE_SHEET_URL'`
- [ ] Replace with your actual URL
- [ ] Save the file

## Step 6: Activate New Page
Choose ONE option:

Option A (Recommended):
- [ ] Rename `index.html` to `index-old.html`
- [ ] Rename `index-new.html` to `index.html`

Option B:
- [ ] Open `index.html`
- [ ] Change `<script src="script.js">` to `<script src="script-single-sheet.js">`

## Step 7: Test
- [ ] Open `index.html` in web browser
- [ ] Press F12 for Developer Tools
- [ ] Check Console tab for success messages
- [ ] Verify flight arrivals map shows (orange & purple routes)
- [ ] Verify Italy itinerary map shows (blue route)
- [ ] Click markers to see popup details

## Step 8: Share with Group
- [ ] In Google Sheets, click "Share" button
- [ ] Add email addresses:
  - [ ] Mary
  - [ ] Keo
  - [ ] Karen
  - [ ] Others: _______________
- [ ] Give them "Editor" access
- [ ] Send them the website link

---

## Quick Reference

**CSV Template File:** `italy-itinerary-template.csv`

**Setup Guide:** `setup-instructions.html` (open in browser)

**Detailed Docs:** `SINGLE_SHEET_SETUP.md`

**Quick Tips:** `QUICK_REFERENCE.md`

---

## Troubleshooting

**Maps show fallback data?**
- [ ] Check Google Sheet URL is correct in script-single-sheet.js
- [ ] Verify sheet is published (not just shared)
- [ ] Try opening sheet URL in private browser

**Changes not appearing?**
- [ ] Wait 5-10 minutes for Google's cache
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Check "Automatically republish" is enabled

**Console errors?**
- [ ] Verify column names are exactly: name, lat, lng, order
- [ ] Check coordinates are numbers (no symbols)
- [ ] Make sure order is 1, 2, 3, 4...

---

## Notes & Reminders

```
_____________________________________________

_____________________________________________

_____________________________________________

_____________________________________________
```

---

**Date Completed:** _______________

**Website URL:** _______________

**Google Sheet URL:** _______________

---

## 🎉 Success!
Once complete, you can update your Italy itinerary anytime by editing the Google Sheet!
