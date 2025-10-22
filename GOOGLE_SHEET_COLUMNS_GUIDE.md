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

### Flight Information Columns (Add to LAST row - Milan)
| Column Name | Description | Example |
|-------------|-------------|---------|
| `mary_flight` | Mary's return flight number | "DL123" |
| `lisa_flight` | Lisa's return flight number | "DL123" |
| `keo_flight` | Keo's return flight number | "DL456" |
| `karen_flight` | Karen's return flight number | "DL456" |
| `departure_time` | Shared departure time (if all same) | "2:00 PM" |
| `mary_departure` | Mary's departure time (if different) | "2:00 PM" |
| `lisa_departure` | Lisa's departure time (if different) | "2:00 PM" |
| `keo_departure` | Keo's departure time (if different) | "3:00 PM" |
| `karen_departure` | Karen's departure time (if different) | "3:00 PM" |

## How to Fill Out Your Sheet

### Row 1: Rome (Arrival)
Fill in ARRIVAL flight information here:
```
name: Rome
dates: Nov 19-22
hotel: Hotel Forum
hotel_address: Via Tor de' Conti 25
hotel_phone: 39 06 679 2446
mary_flight: DL0214 ATL-FCO Nov 19, 4:40 PM
lisa_flight: DL0214 ATL-FCO Nov 19, 4:40 PM
keo_flight: DL456 SRQ-BOS-FCO Nov 19
karen_flight: DL456 SRQ-BOS-FCO Nov 19
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
mary_flight: DL214 (return flight to Atlanta)
lisa_flight: DL214 (return flight to Atlanta)
keo_flight: DL456 (return flight to Sarasota)
karen_flight: DL456 (return flight to Sarasota)
departure_time: 2:00 PM
(OR use individual times: mary_departure: 2:00 PM, keo_departure: 3:00 PM, etc.)
```

## 📝 Summary: Which Row for Which Flights?

### ✈️ **ARRIVAL Flights to Italy** → Use **Rome Row (Row 1)**
- Mary's inbound flight
- Lisa's inbound flight  
- Keo's inbound flight
- Karen's inbound flight

### ✈️ **DEPARTURE Flights from Italy** → Use **Milan Row (Row 4)**
- Mary's outbound flight
- Lisa's outbound flight
- Keo's outbound flight
- Karen's outbound flight

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
