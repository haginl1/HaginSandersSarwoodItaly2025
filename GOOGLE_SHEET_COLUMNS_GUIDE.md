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
| `mary_flight` | Mary's return flight | "DL123 - Departs 2:00pm" |
| `lisa_flight` | Lisa's return flight | "DL123 - Departs 2:00pm" |
| `keo_flight` | Keo's return flight | "DL456 - Departs 3:00pm" |
| `karen_flight` | Karen's return flight | "DL456 - Departs 3:00pm" |

## How to Fill Out Your Sheet

### Row 1: Rome (Arrival)
- No train info needed (arrival city)
- Leave train ticket columns empty

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
Fill in train info from Florence → Milan AND flight info:
```
train_info: "Florence to Milan - Italo, Departs 3:00pm, Arrives 5:45pm"
mary_ticket: IT32345678
lisa_ticket: IT32345679
keo_ticket: IT32345680
karen_ticket: IT32345681
mary_flight: DL123 to Atlanta - Nov 28, 2:00pm
lisa_flight: DL123 to Atlanta - Nov 28, 2:00pm
keo_flight: DL456 to Sarasota - Nov 28, 3:00pm
karen_flight: DL456 to Sarasota - Nov 28, 3:00pm
```

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
