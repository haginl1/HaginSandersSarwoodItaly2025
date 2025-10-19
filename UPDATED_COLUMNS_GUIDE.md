# 🎉 UPDATED: Google Sheet Template with Hotel, Train & Car Info

## What's New? (Added Today!)

I've enhanced your Google Sheet template with **5 new columns** to track all your travel logistics:

### New Columns:
- 🏨 **hotel** - Hotel/accommodation name
- 📍 **hotel_address** - Full address for GPS/directions
- 📞 **hotel_phone** - Contact number (include country code)
- 🚄 **train_info** - Train routes, tickets, booking numbers
- 🚗 **rental_car** - Car rental company, pickup/return details

### What This Means:
✅ Click any location on your map → See ALL your travel details!
✅ Hotel info, train tickets, and car rentals all in one place
✅ No more searching through emails for confirmation numbers
✅ Share with your group so everyone has the info

---

## Complete Column List

### Required (Must Have):
1. **name** - Location name (e.g., "Rome")
2. **lat** - Latitude (e.g., 41.9028)
3. **lng** - Longitude (e.g., 12.4964)
4. **order** - Stop number (1, 2, 3, 4...)

### Optional But Recommended:
5. **dates** - When you'll be there (e.g., "Sept 23-26")
6. **hotel** - Hotel name (e.g., "Hotel Forum") **[NEW!]**
7. **hotel_address** - Full address (e.g., "Via Tor de' Conti 25") **[NEW!]**
8. **hotel_phone** - Phone with country code (e.g., "+39 06 679 2446") **[NEW!]**
9. **train_info** - Route & booking (e.g., "Rome to Florence - Trenitalia #FR9615") **[NEW!]**
10. **rental_car** - Company & pickup (e.g., "Hertz - Florence Station") **[NEW!]**
11. **activities** - Things to do (separate with semicolons)
12. **notes** - Important reminders

---

## Copy This Header Row Into Your Google Sheet:

```
name,lat,lng,order,dates,hotel,hotel_address,hotel_phone,train_info,rental_car,activities,notes
```

---

## Sample Data (Ready to Copy!):

```csv
name,lat,lng,order,dates,hotel,hotel_address,hotel_phone,train_info,rental_car,activities,notes
Rome,41.9028,12.4964,1,Sept 23-26,Hotel Forum,Via Tor de' Conti 25,+39 06 679 2446,N/A - Arrival city,Not needed,Colosseum; Vatican; Trevi Fountain; Roman Forum,Everyone arrives here! Meeting point.
Florence,43.7696,11.2558,2,Sept 26-29,Hotel TBD,Address TBD,Phone TBD,Rome to Florence - Trenitalia,Not needed,Uffizi Gallery; Duomo; Ponte Vecchio; Academia Gallery,Book Uffizi tickets in advance
Venice,45.4408,12.3155,3,Sept 29-Oct 2,Hotel TBD,Address TBD,Phone TBD,Florence to Venice - Trenitalia,Not needed,Gondola rides; St Mark's Basilica; Rialto Market; Doge's Palace,No cars allowed - water taxis only
Tuscany,43.4667,11.3000,4,Oct 2-4,Villa TBD,Address TBD,Phone TBD,Venice to Florence - Trenitalia,Hertz - Pick up in Florence,Wine tasting; Hill towns; Cooking class; Countryside tours,Car rental recommended for flexibility
```

---

## How to Use Each Column:

### 🏨 Hotel Columns:

**hotel:**
- Just the hotel name
- Example: "Hotel Forum" or "Grand Hotel Minerva"

**hotel_address:**
- Full street address
- Include city if helpful
- Example: "Via Tor de' Conti 25, 00184 Roma"

**hotel_phone:**
- Include country code (+39 for Italy)
- Example: "+39 06 679 2446"
- Useful for taxi drivers and emergencies

### 🚄 Train Information:

**Format:** "From → To - Company [Booking #]"

**Examples:**
- "Rome to Florence - Trenitalia #FR9615"
- "Florence to Venice - Italo Train Conf: AB123456"
- "N/A - Arrival city" (for first stop)
- "TBD - Book later" (if not booked yet)

**Tips:**
- Add train number if you have it
- Include booking confirmation number
- Note departure time if helpful

### 🚗 Rental Car:

**Format:** "Company - Pickup Location [Confirmation #]"

**Examples:**
- "Hertz - Florence Santa Maria Novella Station"
- "Enterprise - Pickup: Florence Airport, Return: Rome Airport"
- "Not needed" (if no car at this location)
- "Europecar - Conf #AB123456"

**Tips:**
- Note both pickup AND return if different
- Add confirmation number when you book
- Specify exact pickup location (station, airport, etc.)

---

## Example Map Popup Display:

When you click a location marker, it will show:

```
🗺️ Rome
📅 Sept 23-26

🏨 Hotel:
Hotel Forum
📍 Via Tor de' Conti 25
📞 +39 06 679 2446

🚄 Train:
N/A - Arrival city

🚗 Car Rental:
Not needed

🎯 Activities:
Colosseum; Vatican; Trevi Fountain; Roman Forum

💡 Everyone arrives here! Meeting point.
```

---

## Quick Setup (If Starting Fresh):

1. **Go to Google Sheets:** https://sheets.google.com
2. **Create new spreadsheet:** Click "+ Blank"
3. **Import the template:** File → Import → Upload → Select `italy-itinerary-template.csv`
4. **Customize:** Replace "TBD" with your actual bookings
5. **Publish:** File → Share → Publish to web
6. **Copy URL** and paste in `script-single-sheet.js` (line 6)
7. **Test:** Open your website and click map markers!

---

## If You Already Have a Google Sheet:

1. **Add new columns:** Insert 5 columns after "dates"
2. **Name them:** hotel, hotel_address, hotel_phone, train_info, rental_car
3. **Fill in your info** as you book hotels, trains, and cars
4. **Your map will automatically update!** (may take 5-10 min for cache)

---

## Files Updated:

✅ **italy-itinerary-template.csv** - New columns added
✅ **script-single-sheet.js** - Now reads and displays new info
✅ **updated-template-guide.html** - Visual guide (open in browser!)

---

## Tips for Filling in Your Sheet:

### As You Book Hotels:
- Add hotel name immediately
- Copy address from booking confirmation
- Save phone number (you'll need it for taxis)

### When Booking Trains:
- Buy tickets on Trenitalia.com or Italotreno.it
- Add route and train number
- Note your booking reference

### For Rental Cars:
- Book early for better rates
- Add pickup location and time
- Save confirmation number
- Note return location if different

### General Tips:
- ✅ Update as you book (don't wait until the end)
- ✅ Use "TBD" for things not booked yet
- ✅ Add notes about what needs to be done
- ✅ Share sheet with all travelers (Editor access)

---

## Need Help?

**Visual Guide:** Open `updated-template-guide.html` in browser
**Original Setup:** See `setup-instructions.html`
**Quick Reference:** See `QUICK_REFERENCE.md`
**CSV Template:** Use `italy-itinerary-template.csv`

---

## 🎉 That's It!

Your trip planning just got a whole lot easier. All your hotels, trains, and rental cars 
in one place, automatically showing on your map. No more digging through emails!

**Pro Tip:** Bookmark your Google Sheet URL so you can quickly update it from your phone 
while you're traveling in Italy! 🇮🇹✨
