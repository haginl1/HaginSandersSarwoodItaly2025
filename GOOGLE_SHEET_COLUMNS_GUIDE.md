# Google Sheet Columns Guide for Transportation Data

## Current Columns (Keep These)
- `name` - City name (Rome, Verona, Florence, Milan)
- `lat` - Latitude
- `lng` - Longitude
- `order` - Stop number (1, 2, 3, 4)
- `dates` - Date range (Nov 19-22, etc.)
- `hotel` - Hotel name
- `hotel_address` - Hotel address
- `hotel_phone` - Hotel phone
- `hotel_website` - Hotel website URL
- `hotel_confirmation` - Booking confirmation number
- `activities` - Activities (semicolon separated)
- `activity_links` - Activity company website URLs (semicolon separated, matches activities order)
- `activity_locations` - Activity meeting locations/addresses (semicolon separated, matches activities order)
- `notes` - Special notes

## NEW COLUMNS TO ADD - Train Tickets

Add these columns to capture train ticket information for each leg of the journey:

### Train Information Columns
| Column Name | Description | Example |
|-------------|-------------|---------|
| `train_info` | Train route details | "Rome to Verona - Italo, Departs 9:30am, Arrives 11:00am" |
| `train_station` | Train station name/address | "Roma Termini, Piazza dei Cinquecento, Rome" |
| `mary_ticket` | Mary's ticket number | "IT12345678" |
| `lisa_ticket` | Lisa's ticket number | "IT12345679" |
| `keo_ticket` | Keo's ticket number | "IT12345680" |
| `karen_ticket` | Karen's ticket number | "IT12345681" |
| `mary_seat` | Mary's seat number | "12A" |
| `lisa_seat` | Lisa's seat number | "12B" |
| `keo_seat` | Keo's seat number | "13A" |
| `karen_seat` | Karen's seat number | "13B" |

### Rental Car Column
| Column Name | Description | Example |
|-------------|-------------|---------|
| `rental_car` | Rental car company and confirmation | "SIXT - Conf# ABC123" |

### Flight Information Columns

#### For ARRIVAL flights (Add to FIRST row - Rome):
| Column Name | Description | Example |
|-------------|-------------|---------|
| **Flight Numbers** | | |
| `mary_flight` | Mary's arrival flight number | "DL0214" |
| `lisa_flight` | Lisa's arrival flight number | "DL0214" |
| `keo_flight` | Keo's arrival flight number | "DL456" |
| `karen_flight` | Karen's arrival flight number | "DL456" |
| **Departure from USA** | | |
| `depart_date` | Shared depart date (if all same) | "Nov 19" |
| `mary_depart_date` | Mary's depart date (if different) | "Nov 19" |
| `lisa_depart_date` | Lisa's depart date (if different) | "Nov 19" |
| `keo_depart_date` | Keo's depart date (if different) | "Nov 19" |
| `karen_depart_date` | Karen's depart date (if different) | "Nov 19" |
| **Connections/Layovers** | | |
| `mary_connection` | Mary's connection city | "Direct" |
| `lisa_connection` | Lisa's connection city | "Direct" |
| `keo_connection` | Keo's connection city | "Boston" |
| `karen_connection` | Karen's connection city | "Boston" |
| **Arrival in Italy** | | |
| `arrival_date` | Shared arrival date (if all same) | "Nov 20" |
| `mary_arrival_date` | Mary's arrival date (if different) | "Nov 20" |
| `lisa_arrival_date` | Lisa's arrival date (if different) | "Nov 20" |
| `keo_arrival_date` | Keo's arrival date (if different) | "Nov 20" |
| `karen_arrival_date` | Karen's arrival date (if different) | "Nov 20" |
| `arrival_time` | Shared arrival time (if all same) | "7:55 AM" |
| `mary_arrival` | Mary's arrival time (if different) | "7:55 AM" |
| `lisa_arrival` | Lisa's arrival time (if different) | "7:55 AM" |
| `keo_arrival` | Keo's arrival time (if different) | "10:30 AM" |
| `karen_arrival` | Karen's arrival time (if different) | "10:30 AM" |

#### For DEPARTURE flights (Add to LAST row - Milan):
| Column Name | Description | Example |
|-------------|-------------|---------|
| **Flight Numbers** | | |
| `mary_flight` | Mary's departure flight number | "DL0185" |
| `lisa_flight` | Lisa's departure flight number | "DL0185" |
| `keo_flight` | Keo's departure flight number | "DL789" |
| `karen_flight` | Karen's departure flight number | "DL789" |
| **Departure from Italy** | | |
| `departure_date` | Shared departure date (if all same) | "Nov 28" |
| `mary_departure_date` | Mary's departure date (if different) | "Nov 28" |
| `lisa_departure_date` | Lisa's departure date (if different) | "Nov 28" |
| `keo_departure_date` | Keo's departure date (if different) | "Nov 28" |
| `karen_departure_date` | Karen's departure date (if different) | "Nov 28" |
| `departure_time` | Shared departure time (if all same) | "12:00 PM" |
| `mary_departure` | Mary's departure time (if different) | "12:00 PM" |
| `lisa_departure` | Lisa's departure time (if different) | "12:00 PM" |
| `keo_departure` | Keo's departure time (if different) | "1:00 PM" |
| `karen_departure` | Karen's departure time (if different) | "1:00 PM" |

## 📋 Activity Booking Information

### NEW COLUMNS - Activity Links & Locations
When you book activities, add these columns to make them clickable and show meeting locations:

| Column Name | Description | Example |
|-------------|-------------|---------|
| `activity_links` | Company website URLs (semicolon separated) | "https://colosseum.com; https://vaticanmuseum.va" |
| `activity_locations` | Meeting addresses (semicolon separated) | "Piazza del Colosseo, Rome; Vatican Museums entrance" |

**Important:** 
- The order must match your `activities` column
- Use semicolons (;) to separate multiple entries
- Leave blank if you don't have booking info yet

**Example for Rome:**
```
activities: Colosseum Tour; Vatican Museums; Cooking Class
activity_links: https://colosseum.com; https://vaticanmuseum.va; https://cookingrome.com
activity_locations: Piazza del Colosseo 1; Viale Vaticano; Via dei Coronari 35
```

On the website, this will display as:
- ✓ **Colosseum Tour** (clickable link)
  📍 Piazza del Colosseo 1 (opens in Google Maps)
- ✓ **Vatican Museums** (clickable link)
  📍 Viale Vaticano (opens in Google Maps)

## How to Fill Out Your Sheet

### Row 1: Rome (Arrival)
Fill in ARRIVAL flight information here:
```
name: Rome
dates: Nov 20-22

# Hotel info
hotel: Hotel Forum
hotel_address: Via Tor de' Conti 25
hotel_phone: 39 06 679 2446

# Mary & Lisa (Direct flight from Atlanta)
mary_flight: DL214
lisa_flight: DL214
mary_depart_date: Nov 19
lisa_depart_date: Nov 19
mary_connection: Direct
lisa_connection: Direct
mary_arrival_date: Nov 20
lisa_arrival_date: Nov 20
mary_arrival: 7:55 AM
lisa_arrival: 7:55 AM

# Keo & Karen (Connection through Boston)
keo_flight: DL456
karen_flight: DL456
keo_depart_date: Nov 19
karen_depart_date: Nov 19
keo_connection: Boston
karen_connection: Boston
keo_arrival_date: Nov 20
karen_arrival_date: Nov 20
keo_arrival: 10:30 AM
karen_arrival: 10:30 AM

(Leave train ticket columns empty - no train to Rome)
```

### Row 2: Verona
Fill in train info from Rome → Verona:
```
train_info: "Rome to Verona - Italo, Departs 9:30am, Arrives 11:00am"
mary_ticket: IT12345678
lisa_ticket: IT12345679
keo_ticket: IT12345680
karen_ticket: IT12345681
rental_car: SIXT - Pickup Verona Station, Conf# ABC123
```

### Row 3: Florence
Fill in train info from Verona → Florence:
```
train_info: "Verona to Florence - Italo, Departs 10:00am, Arrives 11:30am"
mary_ticket: IT22345678
lisa_ticket: IT22345679
keo_ticket: IT22345680
karen_ticket: IT22345681
```

### Row 4: Milan (Departure)
Fill in train info from Florence → Milan AND DEPARTURE flight info:
```
# Train info
train_info: "Florence to Milan - Italo, Departs 3:00pm, Arrives 5:45pm"
mary_ticket: IT32345678
lisa_ticket: IT32345679
keo_ticket: IT32345680
karen_ticket: IT32345681

# Mary & Lisa (Direct flight to Atlanta)
mary_flight: DL185
lisa_flight: DL185
mary_departure_date: Nov 28
lisa_departure_date: Nov 28
mary_departure: 12:00 PM
lisa_departure: 12:00 PM

# Keo & Karen (Connection through Boston)
keo_flight: DL789
karen_flight: DL789
keo_departure_date: Nov 28
karen_departure_date: Nov 28
keo_departure: 1:00 PM
karen_departure: 1:00 PM

# OR if everyone has same departure time, use:
# departure_date: Nov 28
# departure_time: 12:00 PM
```

## 📝 Summary: Which Row for Which Flights?

### ✈️ **ARRIVAL Flights to Italy** → Use **Rome Row (Row 1)**
- Add flight numbers: `mary_flight`, `lisa_flight`, `keo_flight`, `karen_flight`
- Add depart dates from USA: `depart_date` OR individual `mary_depart_date`, etc.
- Add connections: `mary_connection`, `keo_connection` (e.g., "Direct" or "Boston")
- Add arrival dates in Italy: `arrival_date` OR individual `mary_arrival_date`, etc.
- Add arrival times: `arrival_time` OR individual `mary_arrival`, `keo_arrival`, etc.

### ✈️ **DEPARTURE Flights from Italy** → Use **Milan Row (Row 4)**
- Add flight numbers: `mary_flight`, `lisa_flight`, `keo_flight`, `karen_flight`
- Add departure dates from Italy: `departure_date` OR individual `mary_departure_date`, etc.
- Add departure times: `departure_time` OR individual `mary_departure`, `keo_departure`, etc.

## After Adding Columns

1. **Save your Google Sheet** (auto-saves)
2. **Refresh your web page** at http://localhost:8000/index.html
3. **The train tickets, rental car, and flights will auto-populate!**

## Tips

- ✅ Column names are case-insensitive (train_info = Train_Info)
- ✅ Leave cells empty (blank) if you don't have the info yet
- ✅ Use semicolons (;) to separate multiple items
- ✅ The page will show "TBD" for any empty fields
- ✅ Update anytime - just refresh the page to see changes

## Example Row Structure

```
name, lat, lng, order, dates, hotel, train_info, mary_ticket, lisa_ticket, keo_ticket, karen_ticket, rental_car
Verona, 45.4384, 10.9917, 2, Nov 22-25, Hotel TBD, "Rome to Verona - Departs 9:30am", IT12345, IT12346, IT12347, IT12348, "SIXT - ABC123"
```
