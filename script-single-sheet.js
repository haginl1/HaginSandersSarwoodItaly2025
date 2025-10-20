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
      accommodation: row.accommodation || row.Accommodation || row.hotel || row.Hotel || '',
      activities: row.activities || row.Activities || '',
      notes: row.notes || row.Notes || '',
      // Train ticket information
      trainInfo: row.train_info || row.Train_Info || '',
      maryTicket: row.mary_ticket || row.Mary_Ticket || '',
      lisaTicket: row.lisa_ticket || row.Lisa_Ticket || '',
      keoTicket: row.keo_ticket || row.Keo_Ticket || '',
      karenTicket: row.karen_ticket || row.Karen_Ticket || '',
      // Rental car information
      rentalCar: row.rental_car || row.Rental_Car || '',
      // Flight information
      maryFlight: row.mary_flight || row.Mary_Flight || '',
      lisaFlight: row.lisa_flight || row.Lisa_Flight || '',
      keoFlight: row.keo_flight || row.Keo_Flight || '',
      karenFlight: row.karen_flight || row.Karen_Flight || '',
      // Flight departure times
      maryDeparture: row.mary_departure || row.Mary_Departure || '',
      lisaDeparture: row.lisa_departure || row.Lisa_Departure || '',
      keoDeparture: row.keo_departure || row.Keo_Departure || '',
      karenDeparture: row.karen_departure || row.Karen_Departure || '',
      // Shared departure time (if all same)
      departureTime: row.departure_time || row.Departure_Time || row.flight_time || row.Flight_Time || ''
    }))
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
    
    const activitiesHTML = activities.length > 0 
      ? `<ul class="activities-list">
           ${activities.map(activity => `<li>${activity}</li>`).join('')}
         </ul>`
      : '<p class="info-content">No activities listed yet</p>';
    
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
          // Update passenger tickets
          updatePassengerTicket(card, 'Mary', destination.maryTicket);
          updatePassengerTicket(card, 'Lisa', destination.lisaTicket);
          updatePassengerTicket(card, 'Keo', destination.keoTicket);
          updatePassengerTicket(card, 'Karen', destination.karenTicket);
          
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

// Helper function to update individual passenger ticket
function updatePassengerTicket(card, passengerName, ticketNumber) {
  if (!ticketNumber) return;
  
  const passengers = card.querySelectorAll('.passenger-item');
  passengers.forEach(item => {
    const nameSpan = item.querySelector('.passenger-name');
    if (nameSpan && nameSpan.textContent.includes(passengerName)) {
      const ticketSpan = item.querySelector('.ticket-info');
      if (ticketSpan) {
        ticketSpan.textContent = `Ticket #: ${ticketNumber}`;
      }
    }
  });
}

// Update rental car info
function updateRentalCarInfo(itinerary) {
  const rentalCarCard = document.querySelector('.transport-card.rental-car');
  if (!rentalCarCard) return;
  
  // Look for rental car info in any destination
  itinerary.forEach(destination => {
    if (destination.rentalCar) {
      const rentalInfo = rentalCarCard.querySelector('.rental-info');
      // You can parse rental_car field to update specific details
      // For now, we'll add it as a note
      const existingDetails = rentalInfo.querySelectorAll('.rental-detail');
      const companyDetail = Array.from(existingDetails).find(d => d.innerHTML.includes('Company:'));
      if (companyDetail && destination.rentalCar) {
        companyDetail.innerHTML = `<strong>🚙 Company:</strong> ${destination.rentalCar}`;
      }
    }
  });
}

// Update flight information
function updateFlightInfo(itinerary) {
  // Look for flight info in the last destination
  const lastDestination = itinerary[itinerary.length - 1];
  if (!lastDestination) return;
  
  // Update Mary & Lisa flight
  if (lastDestination.maryFlight || lastDestination.lisaFlight || lastDestination.maryDeparture || lastDestination.departureTime) {
    const maryLisaCard = document.querySelector('.flight-card-mary-lisa');
    if (maryLisaCard) {
      const flightDetails = maryLisaCard.querySelectorAll('.flight-detail');
      flightDetails.forEach(detail => {
        if (detail.innerHTML.includes('Flight #:') && lastDestination.maryFlight) {
          detail.innerHTML = `<strong>✈️ Flight #:</strong> ${lastDestination.maryFlight}`;
        }
        if (detail.innerHTML.includes('Departure:')) {
          const depTime = lastDestination.maryDeparture || lastDestination.departureTime;
          if (depTime) {
            detail.innerHTML = `<strong>🕐 Departure:</strong> ${depTime}`;
          }
        }
      });
    }
  }
  
  // Update Keo & Karen flight
  if (lastDestination.keoFlight || lastDestination.karenFlight || lastDestination.keoDeparture || lastDestination.departureTime) {
    const keoKarenCard = document.querySelector('.flight-card-keo-karen');
    if (keoKarenCard) {
      const flightDetails = keoKarenCard.querySelectorAll('.flight-detail');
      flightDetails.forEach(detail => {
        if (detail.innerHTML.includes('Flight #:') && lastDestination.keoFlight) {
          detail.innerHTML = `<strong>✈️ Flight #:</strong> ${lastDestination.keoFlight}`;
        }
        if (detail.innerHTML.includes('Departure:')) {
          const depTime = lastDestination.keoDeparture || lastDestination.departureTime;
          if (depTime) {
            detail.innerHTML = `<strong>🕐 Departure:</strong> ${depTime}`;
          }
        }
      });
    }
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
  
  // Create destination cards
  createDestinationCards(itinerary);
  console.log('Destination cards created');
  
  // Update transportation information from Google Sheets
  updateTrainTickets(itinerary);
  updateRentalCarInfo(itinerary);
  updateFlightInfo(itinerary);
  console.log('Transportation info updated from Google Sheets');
  
  console.log('All maps loaded successfully!');
});
