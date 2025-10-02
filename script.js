// Italy Trip 2025 - Interactive Map and Navigation
// Hagin-Sanders and Sarwood Families
// Wait for DOM to be fully loaded

document.addEventListener('DOMContentLoaded', function() {
  // Hagin-Sanders Family Route
  const haginSandersRoute = [
    { name: 'Venice', lat: 45.4408, lng: 12.3155, color: '#4299e1', order: 1 },
    { name: 'Florence', lat: 43.7696, lng: 11.2558, color: '#4299e1', order: 2 },
    { name: 'Rome', lat: 41.9028, lng: 12.4964, color: '#4299e1', order: 3 },
    { name: 'Cinque Terre', lat: 44.1268, lng: 9.7267, color: '#4299e1', order: 4 },
    { name: 'Milan', lat: 45.4642, lng: 9.1900, color: '#4299e1', order: 5 }
  ];

  // Sarwood Family Route
  const sarwoodRoute = [
    { name: 'Venice', lat: 45.4408, lng: 12.3155, color: '#48bb78', order: 1 },
    { name: 'Florence', lat: 43.7696, lng: 11.2558, color: '#48bb78', order: 2 },
    { name: 'Rome', lat: 41.9028, lng: 12.4964, color: '#48bb78', order: 3 },
    { name: 'Siena', lat: 43.3188, lng: 11.3307, color: '#48bb78', order: 4 },
    { name: 'Chianti Region', lat: 43.4667, lng: 11.3000, color: '#48bb78', order: 5 }
  ];

  function createMap(mapId, route, routeColor) {
    const map = L.map(mapId).setView([43.0, 12.0], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // Add numbered markers and route path
    const routeCoordinates = [];
    route.forEach(loc => {
      routeCoordinates.push([loc.lat, loc.lng]);
      const marker = L.marker([loc.lat, loc.lng], {
        icon: L.divIcon({
          html: `<div style="background: linear-gradient(135deg, ${routeColor} 0%, ${routeColor} 100%); color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${loc.order}</div>`,
          className: 'custom-div-icon',
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        })
      }).addTo(map);
      marker.bindPopup(`<strong>${loc.name}</strong>`);
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

  // Create both family maps
  createMap('hagin-sanders-map', haginSandersRoute, '#4299e1');
  createMap('sarwood-map', sarwoodRoute, '#48bb78');
});