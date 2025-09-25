import { map } from './map-config.js';
import { strikeIcon } from './icons.js';
import { createRadiusCircle, createPopupContent } from './utils.js';

export async function loadLocations() {
    try {
        const response = await fetch('locations.json');
        const data = await response.json();
        const locations = data.locations;
        
        let validLocationCount = 0;
        const bounds = [];
        
        locations.forEach(location => {
            if (location.coordinates && location.coordinates[0] !== null && location.coordinates[1] !== null) {
                const [lng, lat] = location.coordinates;
                const latLng = [lat, lng];
                
                const marker = L.marker(latLng, { icon: strikeIcon })
                    .addTo(map)
                    .bindPopup(createPopupContent(location));
                
                const circle = createRadiusCircle(latLng);
                circle.addTo(map);
                
                bounds.push(latLng);
                validLocationCount++;
            }
        });
        
        document.getElementById('location-count').textContent = 
            `${validLocationCount} strike locations displayed`;
        
        if (bounds.length > 0) {
            map.fitBounds(bounds, { padding: [20, 20] });
        }
        
    } catch (error) {
        console.error('Error loading locations:', error);
        document.getElementById('location-count').textContent = 'Error loading locations';
    }
}
