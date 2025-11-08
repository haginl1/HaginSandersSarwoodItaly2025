// Italy Trip 2025 - Flight Arrivals & Shared Itinerary with Google Sheets
// Updated: Single Google Sheet with shared travel itinerary

// Configuration - Replace with your Google Sheet URL
const GOOGLE_SHEETS_CONFIG = {
  // Single sheet with all Italy destinations
  itinerarySheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmSqiviOP7ift7QOMW1b4vOiRv0NKuAhBLgnbcQLRPLWikDFfOsjcBlA-m8gcObWoTtHSnd9_aYljl/pub?gid=1110183056&single=true&output=csv',
  // Set to true to use fallback data for testing
  useFallbackData: false
};

// Flight routes (hardcoded - these don't change)
const flightRoutes = {
  // Arrival routes
  arrival: {
    maryLisa: {
      name: 'Mary & Lisa - Arrival',
      color: '#ed8936',
      route: [
        { name: 'Atlanta, GA', lat: 33.6407, lng: -84.4277, order: 1 },
        { name: 'Rome, Italy', lat: 41.9028, lng: 12.4964, order: 2 }
      ]
    },
    keoKaren: {
      name: 'Keo & Karen - Arrival',
      color: '#9f7aea',
      route: [
        { name: 'Sarasota, FL', lat: 27.3364, lng: -82.5307, order: 1 },
        { name: 'Boston, MA', lat: 42.3656, lng: -71.0096, order: 2 },
        { name: 'Rome, Italy', lat: 41.9028, lng: 12.4964, order: 3 }
      ]
    }
  },
  // Departure routes
  departure: {
    maryLisa: {
      name: 'Mary & Lisa - Departure',
      color: '#38a169',
      route: [
        { name: 'Milan, Italy', lat: 45.4642, lng: 9.1900, order: 1 },
        { name: 'New York JFK', lat: 40.6413, lng: -73.7781, order: 2 },
        { name: 'Atlanta, GA', lat: 33.6407, lng: -84.4277, order: 3 }
      ]
    },
    keoKaren: {
      name: 'Keo & Karen - Departure',
      color: '#4299e1',
      route: [
        { name: 'Milan, Italy', lat: 45.4642, lng: 9.1900, order: 1 },
        { name: 'New York JFK', lat: 40.6413, lng: -73.7781, order: 2 },
        { name: 'Orlando, FL', lat: 28.4294, lng: -81.3089, order: 3 }
      ]
    }
  }
};

// Fallback Italy itinerary (used if Google Sheets not configured)
const fallbackItinerary = [
  { 
    name: 'Rome', 
    lat: 41.9028, 
    lng: 12.4964, 
    order: 1, 
    dates: 'Sept 23-26', 
    accommodation: 'TBD',
    activities: 'Colosseum, Vatican, Trevi Fountain',
    notes: 'Arrival city - everyone meets here!'
  },
  { 
    name: 'Florence', 
    lat: 43.7696, 
    lng: 11.2558, 
    order: 2, 
    dates: 'Sept 26-29', 
    accommodation: 'TBD',
    activities: 'Uffizi Gallery, Duomo, Ponte Vecchio',
    notes: 'Book Uffizi tickets in advance'
  },
  { 
    name: 'Venice', 
    lat: 45.4408, 
    lng: 12.3155, 
    order: 3, 
    dates: 'Sept 29-Oct 2', 
    accommodation: 'TBD',
    activities: 'Gondola rides, St Marks, Rialto Market',
    notes: 'No cars allowed - water taxis only'
  },
  { 
    name: 'Tuscany', 
    lat: 43.4667, 
    lng: 11.3000, 
    order: 4, 
    dates: 'Oct 2-4', 
    accommodation: 'TBD',
    activities: 'Wine tasting, Hill towns, Cooking class',
    notes: 'Consider renting a car'
  }
];

// Parse CSV data from Google Sheets with proper handling of quoted fields
function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    return obj;
  }).filter(row => row.name || row.Name); // Filter out empty rows
}

// Parse a single CSV line handling quoted fields with commas
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add last field
  result.push(current.trim());
  return result;
}

// Convert Google Sheets data to itinerary format
function convertToItinerary(sheetData) {
  return sheetData
    .filter(row => (row.name || row.Name) && (row.lat || row.Lat) && (row.lng || row.Lng))
    .map(row => {
      return {
      name: row.name || row.Name || row.location || row.Location,
      lat: parseFloat(row.lat || row.Lat || row.latitude || row.Latitude),
      lng: parseFloat(row.lng || row.Lng || row.longitude || row.Longitude),
      order: parseInt(row.order || row.Order) || 1,
      dates: row.dates || row.Dates || '',
      accommodation: row.accommodation || row.Accommodation || row.hotel || row.Hotel || '',
      activities: row.activities || row.Activities || '',
      activityLinks: row.activity_links || row.Activity_Links || '',
      activityLocations: row.activity_locations || row.Activity_Locations || '',
      notes: row.notes || row.Notes || '',
      // Hotel information
      hotelAddress: row.hotel_address || row.Hotel_Address || '',
      hotelPhone: row.hotel_phone || row.Hotel_Phone || '',
      hotelWebsite: row.hotel_website || row.Hotel_Website || row.website || row.Website || '',
      hotelConfirmation: row.hotel_confirmation || row.Hotel_Confirmation || row.confirmation || row.Confirmation || '',
      // Train ticket information
      trainInfo: row.train_info || row.Train_Info || '',
      trainStation: row.train_station || row.Train_Station || '',
      maryTicket: row.mary_ticket || row.Mary_Ticket || '',
      lisaTicket: row.lisa_ticket || row.Lisa_Ticket || '',
      keoTicket: row.keo_ticket || row.Keo_Ticket || '',
      karenTicket: row.karen_ticket || row.Karen_Ticket || '',
      // Train seat information
      marySeat: row.mary_seat || row.Mary_Seat || '',
      lisaSeat: row.lisa_seat || row.Lisa_Seat || '',
      keoSeat: row.keo_seat || row.Keo_Seat || '',
      karenSeat: row.karen_seat || row.Karen_Seat || '',
      // Rental car information
      rentalCar: row.rental_car || row.Rental_Car || '',
      // Flight information - Inbound
      maryFlight: row.mary_flight || row.Mary_Flight || '',
      lisaFlight: row.lisa_flight || row.Lisa_Flight || '',
      keoFlight: row.keo_flight || row.Keo_Flight || '',
      karenFlight: row.karen_flight || row.Karen_Flight || '',
      // Flight departure dates from USA
      maryDepartDate: row.mary_depart_date || row.Mary_Depart_Date || '',
      lisaDepartDate: row.lisa_depart_date || row.Lisa_Depart_Date || '',
      keoDepartDate: row.keo_depart_date || row.Keo_Depart_Date || '',
      karenDepartDate: row.karen_depart_date || row.Karen_Depart_Date || '',
      // Shared depart date (if all same)
      departDate: row.depart_date || row.Depart_Date || '',
      // Flight arrival times in Italy
      maryArrival: row.mary_arrival || row.Mary_Arrival || '',
      lisaArrival: row.lisa_arrival || row.Lisa_Arrival || '',
      keoArrival: row.keo_arrival || row.Keo_Arrival || '',
      karenArrival: row.karen_arrival || row.Karen_Arrival || '',
      // Flight arrival dates in Italy
      maryArrivalDate: row.mary_arrival_date || row.Mary_Arrival_Date || '',
      lisaArrivalDate: row.lisa_arrival_date || row.Lisa_Arrival_Date || '',
      keoArrivalDate: row.keo_arrival_date || row.Keo_Arrival_Date || '',
      karenArrivalDate: row.karen_arrival_date || row.Karen_Arrival_Date || '',
      // Shared arrival time/date (if all same)
      arrivalTime: row.arrival_time || row.Arrival_Time || '',
      arrivalDate: row.arrival_date || row.Arrival_Date || '',
      // Flight connections
      maryConnection: row.mary_connection || row.Mary_Connection || '',
      lisaConnection: row.lisa_connection || row.Lisa_Connection || '',
      keoConnection: row.keo_connection || row.Keo_Connection || '',
      karenConnection: row.karen_connection || row.Karen_Connection || '',
      // Flight departure times from Italy (for outbound flights)
      maryDeparture: row.mary_departure || row.Mary_Departure || '',
      lisaDeparture: row.lisa_departure || row.Lisa_Departure || '',
      keoDeparture: row.keo_departure || row.Keo_Departure || '',
      karenDeparture: row.karen_departure || row.Karen_Departure || '',
      // Shared departure time (if all same)
      departureTime: row.departure_time || row.Departure_Time || row.flight_time || row.Flight_Time || '',
      // Departure dates from Italy
      maryDepartureDate: row.mary_departure_date || row.Mary_Departure_Date || '',
      lisaDepartureDate: row.lisa_departure_date || row.Lisa_Departure_Date || '',
      keoDepartureDate: row.keo_departure_date || row.Keo_Departure_Date || '',
      karenDepartureDate: row.karen_departure_date || row.Karen_Departure_Date || '',
      departureDate: row.departure_date || row.Departure_Date || '',
      // Departure connections (return flights)
      maryDepartureConnection: row.mary_departure_connection || row.Mary_Departure_Connection || '',
      lisaDepartureConnection: row.lisa_departure_connection || row.Lisa_Departure_Connection || '',
      keoDepartureConnection: row.keo_departure_connection || row.Keo_Departure_Connection || '',
      karenDepartureConnection: row.karen_departure_connection || row.Karen_Departure_Connection || '',
      // Final destinations (for return flights)
      maryFinalDestination: row.mary_final_destination || row.Mary_Final_Destination || '',
      lisaFinalDestination: row.lisa_final_destination || row.Lisa_Final_Destination || '',
      keoFinalDestination: row.keo_final_destination || row.Keo_Final_Destination || '',
      karenFinalDestination: row.karen_final_destination || row.Karen_Final_Destination || ''
    };
  })
    .sort((a, b) => a.order - b.order);
}

// Fetch data from Google Sheets
async function fetchItineraryData(url) {
  if (GOOGLE_SHEETS_CONFIG.useFallbackData || !url || url.includes('YOUR_')) {
    console.log('Using fallback itinerary data');
    return fallbackItinerary;
  }

  try {
    let csvUrl = url;
    if (url.includes('/edit')) {
      csvUrl = url.replace('/edit#gid=', '/export?format=csv&gid=');
      csvUrl = csvUrl.replace('/edit?usp=sharing', '/export?format=csv');
      csvUrl = csvUrl.replace(/\/edit.*$/, '/export?format=csv');
    }

    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error('Failed to fetch sheet data');
    
    const csvData = await response.text();
    const parsedData = parseCSV(csvData);
    const itinerary = convertToItinerary(parsedData);
    
    if (itinerary.length === 0) {
      console.log('No valid data in sheet, using fallback');
      return fallbackItinerary;
    }
    
    console.log(`Loaded ${itinerary.length} destinations from Google Sheets`);
    return itinerary;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    console.log('Using fallback itinerary data');
    return fallbackItinerary;
  }
}

// Create flight arrival map
function createFlightMap(mapId) {
  const map = L.map(mapId).setView([45.0, -10.0], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const allCoordinates = [];

  // Add arrival routes
  Object.values(flightRoutes.arrival).forEach(flight => {
    const routeCoords = [];
    
    flight.route.forEach(stop => {
      routeCoords.push([stop.lat, stop.lng]);
      allCoordinates.push([stop.lat, stop.lng]);
      
      const popupContent = `<div style="min-width: 150px;">
        <strong style="font-size: 16px; color: ${flight.color};">${stop.name}</strong>
        <br><span style="color: #666;">${flight.name}</span>
        <br><em style="font-size: 13px;">Stop ${stop.order}</em>
      </div>`;
      
      const marker = L.marker([stop.lat, stop.lng], {
        icon: L.divIcon({
          html: `<div style="background: ${flight.color}; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${stop.order}</div>`,
          className: 'custom-div-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      }).addTo(map);
      
      marker.bindPopup(popupContent);
    });

    // Draw arrival flight path (dashed)
    L.polyline(routeCoords, {
      color: flight.color,
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 10',
      lineCap: 'round'
    }).addTo(map);
  });

  // Add departure routes
  Object.values(flightRoutes.departure).forEach(flight => {
    const routeCoords = [];
    
    flight.route.forEach(stop => {
      routeCoords.push([stop.lat, stop.lng]);
      allCoordinates.push([stop.lat, stop.lng]);
      
      const popupContent = `<div style="min-width: 150px;">
        <strong style="font-size: 16px; color: ${flight.color};">${stop.name}</strong>
        <br><span style="color: #666;">${flight.name}</span>
        <br><em style="font-size: 13px;">Stop ${stop.order}</em>
      </div>`;
      
      const marker = L.marker([stop.lat, stop.lng], {
        icon: L.divIcon({
          html: `<div style="background: ${flight.color}; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${stop.order}</div>`,
          className: 'custom-div-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      }).addTo(map);
      
      marker.bindPopup(popupContent);
    });

    // Draw departure flight path (solid)
    L.polyline(routeCoords, {
      color: flight.color,
      weight: 3,
      opacity: 0.7,
      lineCap: 'round'
    }).addTo(map);
  });

  // Fit map to show all locations
  if (allCoordinates.length > 0) {
    map.fitBounds(allCoordinates, { padding: [50, 50] });
  }
}

// Create individual flight map for a specific traveler group
function createIndividualFlightMap(mapId, travelerGroup) {
  const map = L.map(mapId).setView([45.0, -10.0], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const allCoordinates = [];
  const arrivalLetters = ['A', 'B', 'C'];

  // Add arrival route for this group
  const arrivalFlight = flightRoutes.arrival[travelerGroup];
  if (arrivalFlight) {
    const routeCoords = [];
    
    arrivalFlight.route.forEach((stop, index) => {
      routeCoords.push([stop.lat, stop.lng]);
      allCoordinates.push([stop.lat, stop.lng]);
      
      const popupContent = `<div style="min-width: 150px;">
        <strong style="font-size: 16px; color: ${arrivalFlight.color};">${stop.name}</strong>
        <br><span style="color: #666;">${arrivalFlight.name}</span>
        <br><em style="font-size: 13px;">Arrival Stop ${arrivalLetters[index]}</em>
      </div>`;
      
      const marker = L.marker([stop.lat, stop.lng], {
        icon: L.divIcon({
          html: `<div style="background: ${arrivalFlight.color}; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${arrivalLetters[index]}</div>`,
          className: 'custom-div-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      }).addTo(map);
      
      marker.bindPopup(popupContent);
    });

    // Draw arrival flight path (dashed)
    L.polyline(routeCoords, {
      color: arrivalFlight.color,
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 10',
      lineCap: 'round'
    }).addTo(map);
  }

  // Add departure route for this group
  const departureFlight = flightRoutes.departure[travelerGroup];
  if (departureFlight) {
    const routeCoords = [];
    
    departureFlight.route.forEach(stop => {
      // Use original coordinates for polyline
      routeCoords.push([stop.lat, stop.lng]);
      allCoordinates.push([stop.lat, stop.lng]);
      
      // Add small offset to marker if it overlaps with arrival route
      let markerLat = stop.lat;
      let markerLng = stop.lng;
      
      // Check if this location exists in arrival route (same coordinates)
      if (arrivalFlight) {
        const overlaps = arrivalFlight.route.some(
          arrivalStop => Math.abs(arrivalStop.lat - stop.lat) < 0.01 && 
                         Math.abs(arrivalStop.lng - stop.lng) < 0.01
        );
        if (overlaps) {
          // Offset the marker slightly to the right and down
          markerLat += 0.3;
          markerLng += 0.5;
        }
      }
      
      const popupContent = `<div style="min-width: 150px;">
        <strong style="font-size: 16px; color: ${departureFlight.color};">${stop.name}</strong>
        <br><span style="color: #666;">${departureFlight.name}</span>
        <br><em style="font-size: 13px;">Departure Stop ${stop.order}</em>
      </div>`;
      
      const marker = L.marker([markerLat, markerLng], {
        icon: L.divIcon({
          html: `<div style="background: ${departureFlight.color}; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${stop.order}</div>`,
          className: 'custom-div-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      }).addTo(map);
      
      marker.bindPopup(popupContent);
    });

    // Draw departure flight path (solid)
    L.polyline(routeCoords, {
      color: departureFlight.color,
      weight: 3,
      opacity: 0.7,
      lineCap: 'round'
    }).addTo(map);
  }

  // Fit map to show all locations
  if (allCoordinates.length > 0) {
    map.fitBounds(allCoordinates, { padding: [50, 50] });
  }
  
  return map;
}

// Create shared Italy itinerary map
function createItineraryMap(mapId, itinerary) {
  const map = L.map(mapId).setView([43.0, 12.0], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const routeCoordinates = [];
  const mainColor = '#4299e1';

  itinerary.forEach(location => {
    routeCoordinates.push([location.lat, location.lng]);
    
    // Destination popup content
    let popupContent = `<div style="min-width: 220px;">
      <strong style="font-size: 18px; color: ${mainColor};">${location.name}</strong>`;
    
    if (location.dates) {
      popupContent += `<br><span style="color: #666;">📅 ${location.dates}</span>`;
    }
    if (location.accommodation) {
      popupContent += `<br><span style="color: #666;">🏨 ${location.accommodation}</span>`;
    }
    if (location.activities) {
      popupContent += `<br><br><strong style="color: #4299e1;">Activities:</strong><br><span style="color: #555; font-size: 14px;">${location.activities}</span>`;
    }
    if (location.notes) {
      popupContent += `<br><br><em style="font-size: 13px; color: #718096;">${location.notes}</em>`;
    }
    popupContent += `</div>`;
    
    // Add numbered destination marker
    const marker = L.marker([location.lat, location.lng], {
      icon: L.divIcon({
        html: `<div style="background: linear-gradient(135deg, ${mainColor} 0%, #3182ce 100%); color: white; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3);">${location.order}</div>`,
        className: 'custom-div-icon',
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      })
    }).addTo(map);
    
    marker.bindPopup(popupContent);
    
    // Add hotel marker if accommodation exists
    if (location.accommodation && location.accommodation !== 'Hotel TBD') {
      // Hotel popup content
      let hotelPopup = `<div style="min-width: 250px;">
        <strong style="font-size: 16px; color: #f39c12;">🏨 ${location.accommodation}</strong>
        <br><span style="color: #888; font-size: 13px;">${location.name}</span>`;
      
      if (location.hotelAddress && location.hotelAddress !== 'Address TBD') {
        // Create Google Maps link with encoded address
        const encodedAddress = encodeURIComponent(location.hotelAddress);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        hotelPopup += `<br><br><a href="${googleMapsUrl}" target="_blank" style="color: #4299e1; text-decoration: none; font-weight: 500;">📍 ${location.hotelAddress}</a>`;
      }
      if (location.hotelPhone && location.hotelPhone !== 'Phone TBD') {
        // Make phone number clickable with tel: link
        const phoneNumber = location.hotelPhone.replace(/\s+/g, '');
        hotelPopup += `<br><a href="tel:+${phoneNumber}" style="color: #555; text-decoration: none;">📞 ${location.hotelPhone}</a>`;
      }
      if (location.hotelWebsite) {
        hotelPopup += `<br><br><a href="${location.hotelWebsite}" target="_blank" style="color: #4299e1; text-decoration: none; font-weight: 600;">Visit Website →</a>`;
      }
      if (location.hotelConfirmation) {
        hotelPopup += `<br><br><span style="color: #38b2ac; font-size: 13px;">✅ Confirmation: ${location.hotelConfirmation}</span>`;
      }
      hotelPopup += `</div>`;
      
      // Add hotel marker with distinct style
      const hotelMarker = L.marker([location.lat, location.lng], {
        icon: L.divIcon({
          html: `<div style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); color: white; border-radius: 8px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); transform: translate(20px, -20px);">🏨</div>`,
          className: 'hotel-marker-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      }).addTo(map);
      
      hotelMarker.bindPopup(hotelPopup);
    }
    
    // Add activity location markers if available
    if (location.activityLocations) {
      const activities = (location.activities || '').split(/[;,]/).map(a => a.trim()).filter(a => a.length > 0);
      const activityLocations = (location.activityLocations || '').split(/[;,]/).map(a => a.trim()).filter(a => a.length > 0);
      const activityLinks = (location.activityLinks || '').split(/[;,]/).map(a => a.trim()).filter(a => a.length > 0);
      
      activityLocations.forEach((activityLocation, index) => {
        if (activityLocation) {
          const activityName = activities[index] || `Activity ${index + 1}`;
          const activityLink = activityLinks[index] || '';
          
          // Activity popup content
          let activityPopup = `<div style="min-width: 200px;">
            <strong style="font-size: 15px; color: #9f7aea;">🎯 ${activityName}</strong>
            <br><span style="color: #888; font-size: 12px;">${location.name}</span>`;
          
          if (activityLocation) {
            const encodedLocation = encodeURIComponent(activityLocation);
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
            activityPopup += `<br><br><a href="${googleMapsUrl}" target="_blank" style="color: #4299e1; text-decoration: none; font-size: 13px;">📍 ${activityLocation}</a>`;
          }
          
          if (activityLink) {
            activityPopup += `<br><br><a href="${activityLink}" target="_blank" style="color: #9f7aea; text-decoration: none; font-weight: 600; font-size: 13px;">Visit Website →</a>`;
          }
          
          activityPopup += `</div>`;
          
          // Add activity marker with distinct purple style, offset to avoid overlap
          const offsetLat = location.lat + (Math.random() - 0.5) * 0.02;
          const offsetLng = location.lng + (Math.random() - 0.5) * 0.02;
          
          const activityMarker = L.marker([offsetLat, offsetLng], {
            icon: L.divIcon({
              html: `<div style="background: linear-gradient(135deg, #9f7aea 0%, #805ad5 100%); color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">🎯</div>`,
              className: 'activity-marker-icon',
              iconSize: [28, 28],
              iconAnchor: [14, 14]
            })
          }).addTo(map);
          
          activityMarker.bindPopup(activityPopup);
        }
      });
    }
    
    // Add train station marker if train station info exists
    if (location.trainStation) {
      // Train station popup content
      let stationPopup = `<div style="min-width: 220px;">
        <strong style="font-size: 16px; color: #38a169;">🚂 Train Station</strong>
        <br><span style="color: #888; font-size: 13px;">${location.name}</span>`;
      
      // Create Google Maps link for the station
      const encodedStation = encodeURIComponent(location.trainStation);
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedStation}`;
      stationPopup += `<br><br><a href="${googleMapsUrl}" target="_blank" style="color: #4299e1; text-decoration: none; font-size: 13px;">📍 ${location.trainStation}</a>`;
      
      // Add train info if available
      if (location.trainInfo) {
        stationPopup += `<br><br><span style="color: #666; font-size: 12px;">ℹ️ ${location.trainInfo}</span>`;
      }
      
      stationPopup += `</div>`;
      
      // Add train station marker with distinct green style, offset slightly
      // Roma Termini is slightly south (-0.002 lat) and east (+0.0065 lng) of city center
      const stationOffsetLat = location.lat - 0.002;
      const stationOffsetLng = location.lng + 0.0065;
      
      const stationMarker = L.marker([stationOffsetLat, stationOffsetLng], {
        icon: L.divIcon({
          html: `<div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: white; border-radius: 6px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">🚂</div>`,
          className: 'train-station-marker-icon',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        })
      }).addTo(map);
      
      stationMarker.bindPopup(stationPopup);
    }
  });

  // Draw route path
  L.polyline(routeCoordinates, {
    color: mainColor,
    weight: 4,
    opacity: 0.8,
    dashArray: '10, 5',
    lineCap: 'round',
    lineJoin: 'round'
  }).addTo(map);

  // Fit map to show all markers
  if (routeCoordinates.length > 0) {
    map.fitBounds(routeCoordinates, { padding: [40, 40] });
  }
  
  return map;
}

// Create destination cards from itinerary data
function createDestinationCards(itinerary) {
  const container = document.getElementById('destination-cards-container');
  if (!container) return;
  
  container.innerHTML = ''; // Clear existing cards
  
  itinerary.forEach(destination => {
    const card = document.createElement('div');
    card.className = 'destination-card';
    
    // Split activities by semicolon or comma
    const activities = (destination.activities || '')
      .split(/[;,]/)
      .map(a => a.trim())
      .filter(a => a.length > 0);
    
    // Split activity links and locations (same delimiter)
    const activityLinks = (destination.activityLinks || '')
      .split(/[;,]/)
      .map(a => a.trim())
      .filter(a => a.length > 0);
    
    const activityLocations = (destination.activityLocations || '')
      .split(/[;,]/)
      .map(a => a.trim())
      .filter(a => a.length > 0);
    
    // Create activities HTML with optional links and locations
    let activitiesHTML = '';
    if (activities.length > 0) {
      activitiesHTML = '<ul class="activities-list">';
      activities.forEach((activity, index) => {
        const link = activityLinks[index] || '';
        const location = activityLocations[index] || '';
        
        let activityItem = '';
        
        // If there's a link, make the activity name clickable
        if (link) {
          activityItem = `<a href="${link}" target="_blank" class="activity-link" rel="noopener noreferrer">${activity}</a>`;
        } else {
          activityItem = activity;
        }
        
        // Add location with Google Maps link if available
        if (location) {
          const encodedLocation = encodeURIComponent(location);
          const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
          activityItem += `<br><small class="activity-location">📍 <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer">${location}</a></small>`;
        }
        
        activitiesHTML += `<li>${activityItem}</li>`;
      });
      activitiesHTML += '</ul>';
    } else {
      activitiesHTML = '<p class="info-content">No activities listed yet</p>';
    }
    
    card.innerHTML = `
      <h4>
        ${destination.name}
        <span class="order-badge">Stop ${destination.order}</span>
      </h4>
      <div class="dates">📅 ${destination.dates || 'Dates TBD'}</div>
      
      ${destination.accommodation ? `
        <div class="info-section">
          <div class="info-label">🏨 Accommodation</div>
          <div class="info-content">${destination.accommodation}</div>
        </div>
      ` : ''}
      
      ${activities.length > 0 ? `
        <div class="info-section">
          <div class="info-label">✨ Activities</div>
          ${activitiesHTML}
        </div>
      ` : ''}
      
      ${destination.notes ? `
        <div class="notes">
          💡 ${destination.notes}
        </div>
      ` : ''}
    `;
    
    container.appendChild(card);
  });
}

// Create hotel information cards
function createHotelCards(itinerary) {
  const container = document.getElementById('hotel-cards-container');
  if (!container) return;
  
  container.innerHTML = ''; // Clear existing cards
  
  itinerary.forEach(destination => {
    const card = document.createElement('div');
    card.className = 'hotel-card-detail';
    
    const hotelName = destination.accommodation || 'Hotel TBD';
    const hotelAddress = destination.hotelAddress || 'Address TBD';
    const hotelPhone = destination.hotelPhone || 'Phone TBD';
    const hotelWebsite = destination.hotelWebsite || '';
    const hotelConfirmation = destination.hotelConfirmation || '';
    
    card.innerHTML = `
      <h4>
        <span class="hotel-icon">🏨</span>
        ${hotelName}
      </h4>
      <div class="hotel-city-badge">${destination.name}</div>
      
      <div class="hotel-info-item">
        <strong>📅 Dates:</strong> ${destination.dates || 'Dates TBD'}
      </div>
      
      ${hotelAddress !== 'Address TBD' ? `
        <div class="hotel-info-item">
          <strong>📍 Address:</strong> 
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelAddress)}" 
             target="_blank" 
             class="hotel-address-link"
             rel="noopener noreferrer">
            ${hotelAddress} →
          </a>
        </div>
      ` : ''}
      
      ${hotelPhone !== 'Phone TBD' ? `
        <div class="hotel-info-item">
          <strong>📞 Phone:</strong> 
          <a href="tel:+${hotelPhone.replace(/\s+/g, '')}" class="hotel-phone-link">
            ${hotelPhone}
          </a>
        </div>
      ` : ''}
      
      ${hotelWebsite ? `
        <div class="hotel-info-item">
          <strong>🌐 Website:</strong>
          <a href="${hotelWebsite}" target="_blank" class="hotel-link" rel="noopener noreferrer">
            Visit Hotel Website →
          </a>
        </div>
      ` : ''}
      
      ${hotelConfirmation ? `
        <div class="hotel-confirmation">
          ✅ <strong>Confirmation:</strong> ${hotelConfirmation}
        </div>
      ` : ''}
    `;
    
    container.appendChild(card);
  });
}

// Update train ticket cards with Google Sheets data
function updateTrainTickets(itinerary) {
  // Find routes where train_info is specified
  itinerary.forEach((destination, index) => {
    if (destination.trainInfo && index > 0) {
      const prevDestination = itinerary[index - 1];
      const routeKey = `${prevDestination.name.toLowerCase()}-${destination.name.toLowerCase()}`;
      
      // Find the matching transport card
      const cards = document.querySelectorAll('.transport-card');
      cards.forEach(card => {
        const header = card.querySelector('.route-header');
        if (header && header.textContent.includes(prevDestination.name) && header.textContent.includes(destination.name)) {
          // Update passenger tickets and seats
          updatePassengerInfo(card, 'Mary', destination.maryTicket, destination.marySeat);
          updatePassengerInfo(card, 'Lisa', destination.lisaTicket, destination.lisaSeat);
          updatePassengerInfo(card, 'Keo', destination.keoTicket, destination.keoSeat);
          updatePassengerInfo(card, 'Karen', destination.karenTicket, destination.karenSeat);
          
          // Update route details if train_info provided
          const routeDetails = card.querySelector('.route-details');
          if (routeDetails && destination.trainInfo) {
            routeDetails.textContent = destination.trainInfo;
          }
        }
      });
    }
  });
}

// Helper function to update individual passenger ticket and seat
function updatePassengerInfo(card, passengerName, ticketNumber, seatNumber) {
  const passengers = card.querySelectorAll('.passenger-item');
  passengers.forEach(item => {
    const nameSpan = item.querySelector('.passenger-name');
    if (nameSpan && nameSpan.textContent.includes(passengerName)) {
      // Update ticket number
      if (ticketNumber) {
        const ticketSpan = item.querySelector('.ticket-info');
        if (ticketSpan) {
          ticketSpan.textContent = `Ticket #: ${ticketNumber}`;
        }
      }
      // Update seat number
      if (seatNumber) {
        const seatSpan = item.querySelector('.seat-info');
        if (seatSpan) {
          seatSpan.textContent = `Seat: ${seatNumber}`;
        }
      }
    }
  });
}

// Update rental car info
function updateRentalCarInfo(itinerary) {
  const rentalCarCard = document.querySelector('.transport-card.rental-car');
  if (!rentalCarCard) return;
  
  // Look for rental car info in any destination (usually Verona)
  itinerary.forEach(destination => {
    if (destination.rentalCar && destination.rentalCar !== '-') {
      const rentalInfo = rentalCarCard.querySelector('.rental-info');
      if (rentalInfo) {
        const existingDetails = rentalInfo.querySelectorAll('.rental-detail');
        
        // Find and update the Company detail
        existingDetails.forEach(detail => {
          if (detail.innerHTML.includes('Company:')) {
            detail.innerHTML = `<strong>🚙 Company:</strong> ${destination.rentalCar}`;
          }
        });
      }
    }
  });
}

// Update departure flight information from Milan row (last destination)
function updateFlightInfo(itinerary) {
  // Look for flight info in the last destination (Milan)
  const lastDestination = itinerary[itinerary.length - 1];
  if (!lastDestination) return;
  
  // Update Mary & Lisa departure flight card
  if (lastDestination.maryFlight || lastDestination.lisaFlight) {
    const maryLisaCard = document.querySelector('.flight-card-mary-lisa');
    if (maryLisaCard) {
      const flightDetails = maryLisaCard.querySelectorAll('.flight-detail');
      flightDetails.forEach(detail => {
        if (detail.innerHTML.includes('Flight #:')) {
          if (lastDestination.maryFlight) {
            let flightInfo = `<strong>✈️ Flight #:</strong> ${lastDestination.maryFlight}`;
            
            // Add connection if available
            if (lastDestination.maryDepartureConnection) {
              flightInfo += `<br><strong>Via:</strong> ${lastDestination.maryDepartureConnection}`;
            }
            
            // Add final destination if available
            if (lastDestination.maryFinalDestination) {
              flightInfo += `<br><strong>To:</strong> ${lastDestination.maryFinalDestination}`;
            }
            
            detail.innerHTML = flightInfo;
          }
        }
        if (detail.innerHTML.includes('Departure:')) {
          // Use specific departure date/time
          const departureTime = lastDestination.maryDeparture || lastDestination.departureTime || '';
          const departureDate = lastDestination.maryDepartureDate || lastDestination.departureDate || '';
          
          let departureInfo = '';
          if (departureDate) {
            departureInfo = `<strong>🕐 Departure:</strong> ${departureDate}`;
            if (departureTime) {
              departureInfo += ` at ${departureTime}`;
            }
          } else if (departureTime) {
            departureInfo = `<strong>🕐 Departure:</strong> ${departureTime}`;
          }
          
          if (departureInfo) {
            detail.innerHTML = departureInfo;
          }
        }
      });
    }
  }
  
  // Update Keo & Karen departure flight card
  if (lastDestination.keoFlight || lastDestination.karenFlight) {
    const keoKarenCard = document.querySelector('.flight-card-keo-karen');
    if (keoKarenCard) {
      const flightDetails = keoKarenCard.querySelectorAll('.flight-detail');
      flightDetails.forEach(detail => {
        if (detail.innerHTML.includes('Flight #:')) {
          if (lastDestination.keoFlight) {
            let flightInfo = `<strong>✈️ Flight #:</strong> ${lastDestination.keoFlight}`;
            
            // Add connection if available
            if (lastDestination.keoDepartureConnection) {
              flightInfo += `<br><strong>Via:</strong> ${lastDestination.keoDepartureConnection}`;
            }
            
            // Add final destination if available
            if (lastDestination.keoFinalDestination) {
              flightInfo += `<br><strong>To:</strong> ${lastDestination.keoFinalDestination}`;
            }
            
            detail.innerHTML = flightInfo;
          }
        }
        if (detail.innerHTML.includes('Departure:')) {
          // Use specific departure date/time
          const departureTime = lastDestination.keoDeparture || lastDestination.departureTime || '';
          const departureDate = lastDestination.keoDepartureDate || lastDestination.departureDate || '';
          
          let departureInfo = '';
          if (departureDate) {
            departureInfo = `<strong>🕐 Departure:</strong> ${departureDate}`;
            if (departureTime) {
              departureInfo += ` at ${departureTime}`;
            }
          } else if (departureTime) {
            departureInfo = `<strong>🕐 Departure:</strong> ${departureTime}`;
          }
          
          if (departureInfo) {
            detail.innerHTML = departureInfo;
          }
        }
      });
    }
  }
}

// Update arrival flight information from Rome row (first destination)
function updateArrivalFlights(itinerary) {
  // Get the first destination (Rome - arrival city)
  const arrivalCity = itinerary[0];
  if (!arrivalCity) return;
  
  // Update Mary & Lisa arrival flight card
  if (arrivalCity.maryFlight || arrivalCity.lisaFlight) {
    const maryLisaCard = document.querySelector('.flight-card.mary-lisa');
    if (maryLisaCard) {
      const routes = maryLisaCard.querySelectorAll('.route');
      routes.forEach(route => {
        if (route.innerHTML.includes('Flight Details:')) {
          if (arrivalCity.maryFlight) {
            // Build detailed flight info
            let flightInfo = `<strong>Flight:</strong> ${arrivalCity.maryFlight}`;
            
            // Add connection if available
            if (arrivalCity.maryConnection) {
              flightInfo += `<br><strong>Via:</strong> ${arrivalCity.maryConnection}`;
            }
            
            route.innerHTML = flightInfo;
          }
        }
        if (route.innerHTML.includes('Arrival:')) {
          // Use specific arrival date/time or shared values
          const arrivalTime = arrivalCity.maryArrival || arrivalCity.arrivalTime || '';
          const arrivalDate = arrivalCity.maryArrivalDate || arrivalCity.arrivalDate || arrivalCity.dates.split('-')[0].trim();
          
          let arrivalInfo = `<strong>Arrival:</strong> ${arrivalDate}`;
          if (arrivalTime) {
            arrivalInfo += ` at ${arrivalTime}`;
          }
          route.innerHTML = arrivalInfo;
        }
        // Add departure info if needed
        if (route.innerHTML.includes('Departs:')) {
          const departDate = arrivalCity.maryDepartDate || arrivalCity.departDate || '';
          if (departDate) {
            route.innerHTML = `<strong>Departs USA:</strong> ${departDate}`;
          }
        }
      });
    }
  }
  
  // Update Keo & Karen arrival flight card
  if (arrivalCity.keoFlight || arrivalCity.karenFlight) {
    const keoKarenCard = document.querySelector('.flight-card.keo-karen');
    if (keoKarenCard) {
      const routes = keoKarenCard.querySelectorAll('.route');
      routes.forEach(route => {
        if (route.innerHTML.includes('Flight Details:')) {
          if (arrivalCity.keoFlight) {
            // Build detailed flight info
            let flightInfo = `<strong>Flight:</strong> ${arrivalCity.keoFlight}`;
            
            // Add connection if available
            if (arrivalCity.keoConnection) {
              flightInfo += `<br><strong>Via:</strong> ${arrivalCity.keoConnection}`;
            }
            
            route.innerHTML = flightInfo;
          }
        }
        if (route.innerHTML.includes('Arrival:')) {
          // Use specific arrival date/time or shared values
          const arrivalTime = arrivalCity.keoArrival || arrivalCity.arrivalTime || '';
          const arrivalDate = arrivalCity.keoArrivalDate || arrivalCity.arrivalDate || arrivalCity.dates.split('-')[0].trim();
          
          let arrivalInfo = `<strong>Arrival:</strong> ${arrivalDate}`;
          if (arrivalTime) {
            arrivalInfo += ` at ${arrivalTime}`;
          }
          route.innerHTML = arrivalInfo;
        }
        // Add departure info if needed
        if (route.innerHTML.includes('Departs:')) {
          const departDate = arrivalCity.keoDepartDate || arrivalCity.departDate || '';
          if (departDate) {
            route.innerHTML = `<strong>Departs USA:</strong> ${departDate}`;
          }
        }
      });
    }
  }
}

// Create calendar view of the trip
function createTripCalendar(itinerary) {
  console.log('Creating trip calendar with itinerary:', itinerary);
  const calendarContainer = document.getElementById('trip-calendar');
  if (!calendarContainer) {
    console.error('Calendar container not found!');
    return;
  }
  
  if (!itinerary || itinerary.length === 0) {
    console.error('No itinerary data for calendar!');
    calendarContainer.innerHTML = '<div style="padding: 2rem; text-align: center; color: #718096;">No itinerary data available.</div>';
    return;
  }

  // Parse dates and create a map of trip data by date
  const tripDataMap = new Map();
  let tripDayCounter = 1;
  
  itinerary.forEach(location => {
    console.log('Processing location:', location.name, 'Dates:', location.dates);
    if (location.dates) {
      let startDateStr, endDateStr;
      
      // Check if format is "Nov 19-22" (no spaces around dash, no repeated month)
      if (location.dates.includes('-') && !location.dates.match(/[a-zA-Z]+\s*-\s*[a-zA-Z]+/)) {
        const parts = location.dates.split('-');
        if (parts.length === 2) {
          startDateStr = parts[0].trim();
          const monthMatch = startDateStr.match(/([a-zA-Z]+)/);
          if (monthMatch) {
            const month = monthMatch[1];
            const endDay = parts[1].trim();
            endDateStr = `${month} ${endDay}`;
          }
        }
      } else {
        const dates = location.dates.split('-').map(d => d.trim());
        startDateStr = dates[0];
        endDateStr = dates.length > 1 ? dates[1] : dates[0];
      }
      
      const startDateObj = parseShortDate(startDateStr, 2025);
      const endDateObj = parseShortDate(endDateStr, 2025);
      
      if (startDateObj && endDateObj) {
        let currentDate = new Date(startDateObj);
        while (currentDate <= endDateObj) {
          const dateKey = currentDate.toISOString().split('T')[0];
          tripDataMap.set(dateKey, {
            date: new Date(currentDate),
            location: location.name,
            hotel: location.accommodation,
            hotelConfirmation: location.hotelConfirmation,
            activities: location.activities,
            activityLinks: location.activityLinks,
            dayNumber: tripDayCounter
          });
          tripDayCounter++;
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    }
  });
  
  if (tripDataMap.size === 0) {
    console.warn('No calendar days - calendar will be empty');
    calendarContainer.innerHTML = '<div style="padding: 2rem; text-align: center; color: #718096;">No calendar data available.</div>';
    return;
  }
  
  // Get the month/year to display (November 2025)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const month = 10; // November
  const year = 2025;
  
  // Get calendar boundaries
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  
  // Build calendar HTML
  let html = `
    <div class="calendar-month-header">
      <h3>${monthNames[month]} ${year}</h3>
    </div>
    <div class="calendar-grid">
      <div class="calendar-weekday">S</div>
      <div class="calendar-weekday">M</div>
      <div class="calendar-weekday">T</div>
      <div class="calendar-weekday">W</div>
      <div class="calendar-weekday">T</div>
      <div class="calendar-weekday">F</div>
      <div class="calendar-weekday">S</div>
  `;
  
  // Add empty cells before the 1st
  for (let i = 0; i < startingDayOfWeek; i++) {
    html += '<div class="calendar-cell empty"></div>';
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    const currentDate = new Date(year, month, day);
    const dateKey = currentDate.toISOString().split('T')[0];
    const tripData = tripDataMap.get(dateKey);
    
    if (tripData) {
      // Split activities by newline or comma
      let activities = [];
      if (tripData.activities) {
        if (tripData.activities.includes('\n')) {
          activities = tripData.activities.split('\n').filter(a => a.trim());
        } else {
          activities = tripData.activities.split(',').filter(a => a.trim());
        }
      }
      
      const links = tripData.activityLinks ? tripData.activityLinks.split('\n').filter(l => l.trim()) : [];
      const dayOfWeek = dayNames[currentDate.getDay()];
      
      // This is a trip day - make it clickable
      html += `
        <div class="calendar-cell trip-day" onclick="showDayDetails('${dateKey}')">
          <div class="cell-date">${day}</div>
          <div class="cell-badge">D${tripData.dayNumber}</div>
          <div class="cell-loc">${tripData.location}</div>
          ${activities.length > 0 ? `<div class="cell-activities">${activities.slice(0, 2).map(a => `<div class="activity-item">• ${a.trim()}</div>`).join('')}</div>` : ''}
        </div>
      `;
      
      // Store data for modal
      window.tripDayData = window.tripDayData || {};
      window.tripDayData[dateKey] = {
        dayNumber: tripData.dayNumber,
        dayOfWeek: dayOfWeek,
        date: `${monthNames[month]} ${day}, ${year}`,
        location: tripData.location,
        hotel: tripData.hotel,
        hotelConfirmation: tripData.hotelConfirmation,
        activities: activities,
        activityLinks: links
      };
    } else {
      // Regular non-trip day
      html += `<div class="calendar-cell"><div class="cell-date">${day}</div></div>`;
    }
  }
  
  html += '</div>';
  
  // Add modal for day details
  html += `
    <div id="day-details-modal" class="modal" onclick="closeDayDetails(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="closeDayDetails()">&times;</span>
        <div id="modal-body"></div>
      </div>
    </div>
  `;
  
  calendarContainer.innerHTML = html;
}

// Show day details in modal
function showDayDetails(dateKey) {
  const data = window.tripDayData[dateKey];
  if (!data) return;
  
  const modal = document.getElementById('day-details-modal');
  const modalBody = document.getElementById('modal-body');
  
  let html = `
    <h2 style="color: #ed8936; margin: 0 0 0.5rem 0;">Day ${data.dayNumber}</h2>
    <h3 style="color: #2d3748; margin: 0 0 1rem 0;">${data.dayOfWeek}, ${data.date}</h3>
    <div style="border-bottom: 2px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 1rem;">
      <div style="font-size: 1.3rem; font-weight: 700; color: #4299e1; margin-bottom: 0.5rem;">
        📍 ${data.location}
      </div>
      ${data.hotel ? `
        <div style="background: #f7fafc; padding: 1rem; border-radius: 8px; margin-top: 0.75rem;">
          <div style="font-weight: 600; color: #2d3748;">🏨 ${data.hotel}</div>
          ${data.hotelConfirmation ? `<div style="font-size: 0.9rem; color: #718096; margin-top: 0.25rem;">Confirmation: ${data.hotelConfirmation}</div>` : ''}
        </div>
      ` : ''}
    </div>
  `;
  
  if (data.activities.length > 0) {
    html += '<h4 style="color: #2d3748; margin-bottom: 1rem;">📋 Activities</h4>';
    html += '<div style="display: flex; flex-direction: column; gap: 0.75rem;">';
    
    data.activities.forEach((activity, index) => {
      const timeMatch = activity.match(/(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))/);
      const time = timeMatch ? timeMatch[1] : '';
      const activityName = time ? activity.replace(time, '').trim() : activity.trim();
      const link = data.activityLinks[index] || '';
      
      html += `
        <div style="background: linear-gradient(135deg, #fff5f0 0%, #ffe4d6 100%); padding: 1rem; border-radius: 8px; border-left: 4px solid #ed8936;">
          ${time ? `<div style="font-weight: 700; color: #ed8936; margin-bottom: 0.5rem;">⏰ ${time}</div>` : ''}
          <div style="color: #2d3748; font-size: 1.05rem;">
            ${link ? `<a href="${link}" target="_blank" style="color: #4299e1; text-decoration: none; font-weight: 600;">${activityName} 🔗</a>` : activityName}
          </div>
        </div>
      `;
    });
    
    html += '</div>';
  }
  
  modalBody.innerHTML = html;
  modal.style.display = 'block';
}

function closeDayDetails(event) {
  const modal = document.getElementById('day-details-modal');
  modal.style.display = 'none';
}

// Helper function to parse short dates like "Nov 20", "November 20", "11/20", etc.
function parseShortDate(dateStr, year) {
  if (!dateStr || !dateStr.trim()) return null;
  
  const cleaned = dateStr.trim().toLowerCase();
  console.log('Parsing date:', cleaned);
  
  const months = {
    'jan': 0, 'january': 0,
    'feb': 1, 'february': 1,
    'mar': 2, 'march': 2,
    'apr': 3, 'april': 3,
    'may': 4,
    'jun': 5, 'june': 5,
    'jul': 6, 'july': 6,
    'aug': 7, 'august': 7,
    'sep': 8, 'sept': 8, 'september': 8,
    'oct': 9, 'october': 9,
    'nov': 10, 'november': 10,
    'dec': 11, 'december': 11
  };
  
  // Try format: "Nov 20" or "November 20"
  let parts = cleaned.match(/([a-z]+)\s+(\d+)/);
  if (parts && parts.length === 3) {
    const month = months[parts[1]];
    const day = parseInt(parts[2]);
    if (month !== undefined && day) {
      console.log('Parsed date:', year, month, day);
      return new Date(year, month, day);
    }
  }
  
  // Try format: "11/20" or "11-20"
  parts = cleaned.match(/(\d+)[\/\-](\d+)/);
  if (parts && parts.length === 3) {
    const month = parseInt(parts[1]) - 1; // Month is 0-indexed
    const day = parseInt(parts[2]);
    if (month >= 0 && month <= 11 && day >= 1 && day <= 31) {
      console.log('Parsed date:', year, month, day);
      return new Date(year, month, day);
    }
  }
  
  console.warn('Could not parse date:', dateStr);
  return null;
}

// Helper function to format date
function formatDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

// Initialize maps when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
  console.log('DOM loaded, initializing maps...');
  
  // Wait for Leaflet to be loaded
  if (typeof L === 'undefined') {
    console.error('Leaflet library not loaded!');
    return;
  }
  
  try {
    console.log('Loading Italy trip data...');
    
    // Fetch itinerary data first
    const itinerary = await fetchItineraryData(GOOGLE_SHEETS_CONFIG.itinerarySheetUrl);
    
    // Create itinerary map (in active/visible tab)
    window.itineraryMap = createItineraryMap('italy-itinerary-map', itinerary);
    console.log('Italy itinerary map loaded');
    
    // Create destination cards
    createDestinationCards(itinerary);
    console.log('Destination cards created');
    
    // Create hotel information cards
    createHotelCards(itinerary);
    console.log('Hotel cards created');
    
    // Create trip calendar
    createTripCalendar(itinerary);
    console.log('Trip calendar created');
    
    // Update arrival flight information
    updateArrivalFlights(itinerary);
    console.log('Arrival flights updated');
    
    // Update transportation information from Google Sheets
    updateTrainTickets(itinerary);
    updateRentalCarInfo(itinerary);
    updateFlightInfo(itinerary);
    console.log('Transportation info updated from Google Sheets');
    
    console.log('All maps loaded successfully!');
  } catch (error) {
    console.error('Error initializing page:', error);
  }
});
