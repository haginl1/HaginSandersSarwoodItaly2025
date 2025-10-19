// Italy Trip 2025 - Flight Arrivals & Shared Itinerary with Google Sheets
// Updated: Single Google Sheet with shared travel itinerary

// Configuration - Replace with your Google Sheet URL
const GOOGLE_SHEETS_CONFIG = {
  // Single sheet with all Italy destinations
  itinerarySheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmSqiviOP7ift7QOMW1b4vOiRv0NKuAhBLgnbcQLRPLWikDFfOsjcBlA-m8gcObWoTtHSnd9_aYljl/pub?gid=1110183056&single=true&output=csv',
  // Set to true to use fallback data for testing
  useFallbackData: false
};

// Flight arrival routes (hardcoded - these don't change)
const flightRoutes = {
  maryLisa: {
    name: 'Mary & Lisa',
    color: '#ed8936',
    route: [
      { name: 'Atlanta, GA', lat: 33.6407, lng: -84.4277, order: 1 },
      { name: 'Rome, Italy', lat: 41.9028, lng: 12.4964, order: 2 }
    ]
  },
  keoKaren: {
    name: 'Keo & Karen',
    color: '#9f7aea',
    route: [
      { name: 'Sarasota, FL', lat: 27.3364, lng: -82.5307, order: 1 },
      { name: 'Boston, MA', lat: 42.3656, lng: -71.0096, order: 2 },
      { name: 'Rome, Italy', lat: 41.9028, lng: 12.4964, order: 3 }
    ]
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
    hotel: 'TBD',
    hotel_address: '',
    hotel_phone: '',
    train_info: 'N/A - Arrival city',
    rental_car: 'Not needed',
    activities: 'Colosseum, Vatican, Trevi Fountain',
    notes: 'Arrival city - everyone meets here!'
  },
  { 
    name: 'Florence', 
    lat: 43.7696, 
    lng: 11.2558, 
    order: 2, 
    dates: 'Sept 26-29', 
    hotel: 'TBD',
    hotel_address: '',
    hotel_phone: '',
    train_info: 'Rome to Florence - Trenitalia',
    rental_car: 'Not needed',
    activities: 'Uffizi Gallery, Duomo, Ponte Vecchio',
    notes: 'Book Uffizi tickets in advance'
  },
  { 
    name: 'Venice', 
    lat: 45.4408, 
    lng: 12.3155, 
    order: 3, 
    dates: 'Sept 29-Oct 2', 
    hotel: 'TBD',
    hotel_address: '',
    hotel_phone: '',
    train_info: 'Florence to Venice - Trenitalia',
    rental_car: 'Not needed',
    activities: 'Gondola rides, St Marks, Rialto Market',
    notes: 'No cars allowed - water taxis only'
  },
  { 
    name: 'Tuscany', 
    lat: 43.4667, 
    lng: 11.3000, 
    order: 4, 
    dates: 'Oct 2-4', 
    hotel: 'Villa TBD',
    hotel_address: '',
    hotel_phone: '',
    train_info: 'Venice to Florence - Trenitalia',
    rental_car: 'Pick up in Florence',
    activities: 'Wine tasting, Hill towns, Cooking class',
    notes: 'Consider renting a car'
  }
];

// Parse CSV data from Google Sheets
function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    return obj;
  }).filter(row => row.name || row.Name); // Filter out empty rows
}

// Convert Google Sheets data to itinerary format
function convertToItinerary(sheetData) {
  return sheetData
    .filter(row => (row.name || row.Name) && (row.lat || row.Lat) && (row.lng || row.Lng))
    .map(row => ({
      name: row.name || row.Name || row.location || row.Location,
      lat: parseFloat(row.lat || row.Lat || row.latitude || row.Latitude),
      lng: parseFloat(row.lng || row.Lng || row.longitude || row.Longitude),
      order: parseInt(row.order || row.Order) || 1,
      dates: row.dates || row.Dates || '',
      hotel: row.hotel || row.Hotel || row.accommodation || row.Accommodation || '',
      hotel_address: row.hotel_address || row.hotel_Address || row['hotel address'] || '',
      hotel_phone: row.hotel_phone || row.hotel_Phone || row['hotel phone'] || '',
      train_info: row.train_info || row.train_Info || row['train info'] || row.train || '',
      rental_car: row.rental_car || row.rental_Car || row['rental car'] || row.car || '',
      activities: row.activities || row.Activities || '',
      notes: row.notes || row.Notes || ''
    }))
    .sort((a, b) => a.order - b.order);
}

// Fetch data from Google Sheets using CORS-friendly method
async function fetchItineraryData(url) {
  if (GOOGLE_SHEETS_CONFIG.useFallbackData || !url || url.includes('YOUR_')) {
    console.log('Using fallback itinerary data');
    return fallbackItinerary;
  }

  try {
    // Use the published CSV URL directly (now works through localhost server)
    let csvUrl = url;
    
    console.log('Attempting to fetch from Google Sheets...');
    console.log('URL:', csvUrl);
    
    // Direct fetch - should work now that we're on localhost
    const response = await fetch(csvUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvData = await response.text();
    console.log('Raw CSV data received:', csvData.substring(0, 200) + '...');
    
    const parsedData = parseCSV(csvData);
    console.log('Parsed rows:', parsedData.length);
    
    const itinerary = convertToItinerary(parsedData);
    
    if (itinerary.length === 0) {
      console.log('⚠️ No valid data in sheet, using fallback');
      return fallbackItinerary;
    }
    
    console.log(`✅ SUCCESS! Loaded ${itinerary.length} destinations from Google Sheets`);
    console.log('Destinations:', itinerary.map(loc => loc.name).join(', '));
    return itinerary;
  } catch (error) {
    console.error('❌ Error fetching sheet data:', error);
    console.error('Error details:', error.message);
    console.log('⚠️ Using fallback itinerary data');
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

  // Add both flight routes
  Object.values(flightRoutes).forEach(flight => {
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

    // Draw flight path
    L.polyline(routeCoords, {
      color: flight.color,
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 10',
      lineCap: 'round'
    }).addTo(map);
  });

  // Fit map to show all locations
  if (allCoordinates.length > 0) {
    map.fitBounds(allCoordinates, { padding: [50, 50] });
  }
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
    
    let popupContent = `<div style="min-width: 250px; max-width: 350px;">
      <strong style="font-size: 18px; color: ${mainColor};">${location.name}</strong>`;
    
    if (location.dates) {
      popupContent += `<br><span style="color: #666;">📅 ${location.dates}</span>`;
    }
    
    // Hotel Information
    if (location.hotel) {
      popupContent += `<br><br><strong style="color: #ed8936;">🏨 Hotel:</strong><br><span style="color: #555; font-size: 14px;">${location.hotel}</span>`;
      if (location.hotel_address) {
        popupContent += `<br><span style="color: #666; font-size: 13px;">📍 ${location.hotel_address}</span>`;
      }
      if (location.hotel_phone) {
        popupContent += `<br><span style="color: #666; font-size: 13px;">📞 ${location.hotel_phone}</span>`;
      }
    }
    
    // Train Information
    if (location.train_info) {
      popupContent += `<br><br><strong style="color: #9f7aea;">🚄 Train:</strong><br><span style="color: #555; font-size: 14px;">${location.train_info}</span>`;
    }
    
    // Rental Car Information
    if (location.rental_car) {
      popupContent += `<br><br><strong style="color: #38b2ac;">🚗 Car Rental:</strong><br><span style="color: #555; font-size: 14px;">${location.rental_car}</span>`;
    }
    
    // Activities
    if (location.activities) {
      popupContent += `<br><br><strong style="color: #4299e1;">🎯 Activities:</strong><br><span style="color: #555; font-size: 14px;">${location.activities}</span>`;
    }
    
    // Notes
    if (location.notes) {
      popupContent += `<br><br><em style="font-size: 13px; color: #718096;">💡 ${location.notes}</em>`;
    }
    popupContent += `</div>`;
    
    const marker = L.marker([location.lat, location.lng], {
      icon: L.divIcon({
        html: `<div style="background: linear-gradient(135deg, ${mainColor} 0%, #3182ce 100%); color: white; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3);">${location.order}</div>`,
        className: 'custom-div-icon',
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      })
    }).addTo(map);
    
    marker.bindPopup(popupContent);
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
}

// Initialize maps when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
  console.log('Loading Italy trip data...');
  
  // Create flight arrival map
  createFlightMap('flight-arrivals-map');
  console.log('Flight arrival map loaded');
  
  // Fetch and create shared itinerary map
  const itinerary = await fetchItineraryData(GOOGLE_SHEETS_CONFIG.itinerarySheetUrl);
  createItineraryMap('italy-itinerary-map', itinerary);
  console.log('Italy itinerary map loaded');
  
  console.log('All maps loaded successfully!');
});
