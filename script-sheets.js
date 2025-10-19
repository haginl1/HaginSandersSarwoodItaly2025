// Italy Trip 2025 - Interactive Map with Google Sheets Integration
// Hagin-Sanders and Sarwood Families

// Configuration - Replace with your Google Sheets details
const GOOGLE_SHEETS_CONFIG = {
  // Get this from your published Google Sheet (File -> Share -> Publish to web -> CSV)
  haginSandersSheetUrl: 'YOUR_HAGIN_SANDERS_SHEET_URL',
  sarwoodSheetUrl: 'YOUR_SARWOOD_SHEET_URL'
};

// Fallback data in case sheets aren't configured
const fallbackHaginSandersRoute = [
  { name: 'Venice', lat: 45.4408, lng: 12.3155, color: '#4299e1', order: 1, dates: 'May 15-17', notes: '' },
  { name: 'Florence', lat: 43.7696, lng: 11.2558, color: '#4299e1', order: 2, dates: 'May 17-19', notes: '' },
  { name: 'Rome', lat: 41.9028, lng: 12.4964, color: '#4299e1', order: 3, dates: 'May 19-22', notes: '' },
  { name: 'Cinque Terre', lat: 44.1268, lng: 9.7267, color: '#4299e1', order: 4, dates: 'May 22-24', notes: '' },
  { name: 'Milan', lat: 45.4642, lng: 9.1900, color: '#4299e1', order: 5, dates: 'May 24-26', notes: '' }
];

const fallbackSarwoodRoute = [
  { name: 'Venice', lat: 45.4408, lng: 12.3155, color: '#48bb78', order: 1, dates: 'May 15-17', notes: '' },
  { name: 'Florence', lat: 43.7696, lng: 11.2558, color: '#48bb78', order: 2, dates: 'May 17-19', notes: '' },
  { name: 'Rome', lat: 41.9028, lng: 12.4964, color: '#48bb78', order: 3, dates: 'May 19-22', notes: '' },
  { name: 'Siena', lat: 43.3188, lng: 11.3307, color: '#48bb78', order: 4, dates: 'May 22-23', notes: '' },
  { name: 'Chianti Region', lat: 43.4667, lng: 11.3000, color: '#48bb78', order: 5, dates: 'May 23-26', notes: '' }
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
  });
}

// Convert Google Sheets data to route format
function convertToRoute(sheetData, color) {
  return sheetData
    .filter(row => row.name && row.lat && row.lng) // Only include rows with required data
    .map(row => ({
      name: row.name || row.Name || row.location || row.Location,
      lat: parseFloat(row.lat || row.Lat || row.latitude || row.Latitude),
      lng: parseFloat(row.lng || row.Lng || row.longitude || row.Longitude),
      color: color,
      order: parseInt(row.order || row.Order) || 1,
      dates: row.dates || row.Dates || '',
      notes: row.notes || row.Notes || '',
      accommodation: row.accommodation || row.Accommodation || '',
      activities: row.activities || row.Activities || ''
    }))
    .sort((a, b) => a.order - b.order);
}

// Fetch data from Google Sheets
async function fetchSheetData(url, fallbackData, color) {
  // Check if URL is configured
  if (!url || url.includes('YOUR_') || url === '') {
    console.log('Using fallback data - Google Sheets not configured');
    return fallbackData;
  }

  try {
    // Convert Google Sheets URL to CSV export format
    let csvUrl = url;
    if (url.includes('/edit')) {
      csvUrl = url.replace('/edit#gid=', '/export?format=csv&gid=');
      csvUrl = csvUrl.replace('/edit?usp=sharing', '/export?format=csv');
    }

    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error('Failed to fetch sheet data');
    
    const csvData = await response.text();
    const parsedData = parseCSV(csvData);
    return convertToRoute(parsedData, color);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    console.log('Using fallback data');
    return fallbackData;
  }
}

// Create interactive map
function createMap(mapId, route, routeColor) {
  const map = L.map(mapId).setView([43.0, 12.0], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Add numbered markers and route path
  const routeCoordinates = [];
  route.forEach(loc => {
    routeCoordinates.push([loc.lat, loc.lng]);
    
    // Create popup content with all available info
    let popupContent = `<div style="min-width: 200px;">
      <strong style="font-size: 16px; color: ${routeColor};">${loc.name}</strong>`;
    
    if (loc.dates) {
      popupContent += `<br><span style="color: #666;">📅 ${loc.dates}</span>`;
    }
    if (loc.accommodation) {
      popupContent += `<br><span style="color: #666;">🏨 ${loc.accommodation}</span>`;
    }
    if (loc.activities) {
      popupContent += `<br><span style="color: #666;">🎯 ${loc.activities}</span>`;
    }
    if (loc.notes) {
      popupContent += `<br><br><em style="font-size: 13px;">${loc.notes}</em>`;
    }
    popupContent += `</div>`;
    
    const marker = L.marker([loc.lat, loc.lng], {
      icon: L.divIcon({
        html: `<div style="background: linear-gradient(135deg, ${routeColor} 0%, ${routeColor} 100%); color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${loc.order}</div>`,
        className: 'custom-div-icon',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      })
    }).addTo(map);
    
    marker.bindPopup(popupContent);
  });

  // Create polyline for route
  L.polyline(routeCoordinates, {
    color: routeColor,
    weight: 4,
    opacity: 0.8,
    dashArray: '10, 5',
    lineCap: 'round',
    lineJoin: 'round'
  }).addTo(map);

  // Fit map to show all markers
  if (routeCoordinates.length > 0) {
    map.fitBounds(routeCoordinates, { padding: [30, 30] });
  }
}

// Initialize maps when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
  console.log('Loading trip data...');
  
  // Fetch data from Google Sheets (or use fallback)
  const haginSandersRoute = await fetchSheetData(
    GOOGLE_SHEETS_CONFIG.haginSandersSheetUrl,
    fallbackHaginSandersRoute,
    '#4299e1'
  );
  
  const sarwoodRoute = await fetchSheetData(
    GOOGLE_SHEETS_CONFIG.sarwoodSheetUrl,
    fallbackSarwoodRoute,
    '#48bb78'
  );

  // Create both family maps
  createMap('hagin-sanders-map', haginSandersRoute, '#4299e1');
  createMap('sarwood-map', sarwoodRoute, '#48bb78');
  
  console.log('Maps loaded successfully!');
});
