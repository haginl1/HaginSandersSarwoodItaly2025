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
- `notes` - Special notes

## NEW COLUMNS TO ADD - Train Tickets

Add these columns to capture train ticket information for each leg of the journey:

### Train Information Columns
| Column Name | Description | Example |
|-------------|-------------|---------|
| `train_info` | Train route details | "Rome to Verona - Italo, Departs 9:30am, Arrives 11:00am" |
| `mary_ticket` | Mary's ticket number | "IT12345678" |
| `lisa_ticket` | Lisa's ticket number | "IT12345679" |
| `keo_ticket` | Keo's ticket number | "IT12345680" |
| `karen_ticket` | Karen's ticket number | "IT12345681" |

### Rental Car Column
| Column Name | Description | Example |
|-------------|-------------|---------|
| `rental_car` | Rental car company and confirmation | "SIXT - Conf# ABC123" |

### Flight Information Columns

#### For ARRIVAL flights (Add to FIRST row - Rome):
| Column Name | Description | Example |
|-------------|-------------|---------|
| `mary_flight` | Mary's arrival flight number | "DL0214 ATL-FCO Nov 20" |
| `lisa_flight` | Lisa's arrival flight number | "DL0214 ATL-FCO Nov 20" |
| `keo_flight` | Keo's arrival flight number | "DL456 SRQ-BOS-FCO Nov 20" |
| `karen_flight` | Karen's arrival flight number | "DL456 SRQ-BOS-FCO Nov 20" |
| `arrival_time` | Shared arrival time (if all same) | "7:55 AM" |
| `mary_arrival` | Mary's arrival time (if different) | "7:55 AM" |
| `lisa_arrival` | Lisa's arrival time (if different) | "7:55 AM" |
| `keo_arrival` | Keo's arrival time (if different) | "8:30 AM" |
| `karen_arrival` | Karen's arrival time (if different) | "8:30 AM" |

#### For DEPARTURE flights (Add to LAST row - Milan):
| Column Name | Description | Example |
|-------------|-------------|---------|
| `mary_flight` | Mary's departure flight number | "DL0185 MXP-JFK-ATL Nov 28" |
| `lisa_flight` | Lisa's departure flight number | "DL0185 MXP-JFK-ATL Nov 28" |
| `keo_flight` | Keo's departure flight number | "DL789 MXP-BOS-SRQ Nov 28" |
| `karen_flight` | Karen's departure flight number | "DL789 MXP-BOS-SRQ Nov 28" |
| `departure_time` | Shared departure time (if all same) | "12:00 PM" |
| `mary_departure` | Mary's departure time (if different) | "12:00 PM" |
| `lisa_departure` | Lisa's departure time (if different) | "12:00 PM" |
| `keo_departure` | Keo's departure time (if different) | "1:00 PM" |
| `karen_departure` | Karen's departure time (if different) | "1:00 PM" |

## How to Fill Out Your Sheet

### Row 1: Rome (Arrival)
Fill in ARRIVAL flight information here:
```
name: Rome
dates: Nov 19-22
hotel: Hotel Forum
hotel_address: Via Tor de' Conti 25
hotel_phone: 39 06 679 2446
mary_flight: DL0214 ATL-FCO Nov 20
lisa_flight: DL0214 ATL-FCO Nov 20
keo_flight: DL456 SRQ-BOS-FCO Nov 20
karen_flight: DL456 SRQ-BOS-FCO Nov 20
arrival_time: 7:55 AM
(Or use mary_arrival, lisa_arrival, keo_arrival, karen_arrival if different times)
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
train_info: "Florence to Milan - Italo, Departs 3:00pm, Arrives 5:45pm"
mary_ticket: IT32345678
lisa_ticket: IT32345679
keo_ticket: IT32345680
karen_ticket: IT32345681
mary_flight: DL0185 MXP-JFK-ATL Nov 28
lisa_flight: DL0185 MXP-JFK-ATL Nov 28
keo_flight: DL789 MXP-BOS-SRQ Nov 28
karen_flight: DL789 MXP-BOS-SRQ Nov 28
departure_time: 12:00 PM
(OR use individual times: mary_departure: 12:00 PM, keo_departure: 1:00 PM, etc.)
```

## 📝 Summary: Which Row for Which Flights?

### ✈️ **ARRIVAL Flights to Italy** → Use **Rome Row (Row 1)**
- Add flight numbers in: `mary_flight`, `lisa_flight`, `keo_flight`, `karen_flight`
- Add arrival times in: `arrival_time` (if all arrive same time) OR individual `mary_arrival`, `lisa_arrival`, `keo_arrival`, `karen_arrival` (if different)
- Example: mary_flight="DL0214 ATL-FCO Nov 20", arrival_time="7:55 AM"

### ✈️ **DEPARTURE Flights from Italy** → Use **Milan Row (Row 4)**
- Add flight numbers in: `mary_flight`, `lisa_flight`, `keo_flight`, `karen_flight`
- Add departure times in: `departure_time` (if all depart same time) OR individual `mary_departure`, `lisa_departure`, `keo_departure`, `karen_departure` (if different)
- Example: mary_flight="DL0185 MXP-JFK-ATL Nov 28", departure_time="12:00 PM"

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
