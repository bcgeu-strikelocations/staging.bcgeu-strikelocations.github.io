import { map } from './map-config.js';
import { postalCodeIcon } from './icons.js';


/**
 * Geocodes a Canadian postal code using OpenStreetMap's Nominatim API
 * @param {string} postalCode - The postal code to geocode
 * @returns {Promise<Object>} - Object containing lat, lng, and display name
 */
async function geocodePostalCode(postalCode) {
    try {
        // Clean and format the postal code
        const cleanPostalCode = postalCode.replace(/\s+/g, '').toUpperCase();
        
        // Validate Canadian postal code format
        const postalCodeRegex = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;
        if (!postalCodeRegex.test(cleanPostalCode)) {
            throw new Error('Invalid Canadian postal code format. Please use format like V6B 1A1');
        }

        // Add space for proper formatting in search
        const formattedPostalCode = cleanPostalCode.replace(/([A-Z]\d[A-Z])(\d[A-Z]\d)/, '$1 $2');
        
        // Use Geocoder.ca API for Canadian postal codes
        let result = null;
        
        // Geocoder.ca API (specialized for Canadian postal codes)
        try {
            const response = await fetch(
                `https://geocoder.ca/?locate=${encodeURIComponent(formattedPostalCode)}&json=1`
            );
            
            if (response.ok) {
                const data = await response.json();
                if (data.latt && data.longt) {
                    // Build display name with available data
                    const city = data.standard?.city || data.city || '';
                    const prov = data.standard?.prov || data.prov || '';
                    const locationParts = [formattedPostalCode];
                    if (city) locationParts.push(city);
                    if (prov) locationParts.push(prov);
                    
                    result = {
                        lat: data.latt.toString(),
                        lon: data.longt.toString(),
                        display_name: locationParts.join(', '),
                        address: { postcode: formattedPostalCode },
                        geocoder_data: data // Store the full response for popup
                    };
                }
            }
        } catch (error) {
            console.log('Geocoder.ca API failed:', error);
        }
        
        
        
        if (!result) {
            throw new Error('Postal code not found. Please check the postal code and try again.');
        }
        
        return {
            lat: parseFloat(result.lat),
            lng: parseFloat(result.lon),
            displayName: result.display_name,
            postalCode: formattedPostalCode
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Adds a postal code marker to the map
 * @param {Object} location - Object containing lat, lng, displayName, and postalCode
 */
function addPostalCodeMarker(location) {
    const marker = L.marker([location.lat, location.lng], { icon: postalCodeIcon })
        .addTo(map)
        .bindPopup(createPostalCodePopup(location));
    
    return marker;
}

/**
 * Creates a rich popup for postal code markers using Geocoder.ca data
 * @param {Object} location - Location object with geocoder data
 * @returns {string} - HTML popup content
 */
function createPostalCodePopup(location) {
    const data = location.geocoder_data;
    
    if (data) {
        return `
            <div class="popup-content postal-popup">
                <div class="popup-address">📍 ${location.postalCode}</div>
                <div class="popup-location">
                    <div><strong>City:</strong> ${data.standard?.city || data.city || 'N/A'}</div>
                    <div><strong>Province:</strong> ${data.standard?.prov || data.prov || 'N/A'}</div>
                    ${data.standard && data.standard.stnumber !== '0' ? 
                        `<div><strong>Street Number:</strong> ${data.standard.stnumber}</div>` : ''}
                </div>
                <div class="popup-coordinates">
                    <div><strong>Coordinates:</strong></div>
                    <div class="coord-detail">Lat: ${parseFloat(data.latt).toFixed(6)}</div>
                    <div class="coord-detail">Lng: ${parseFloat(data.longt).toFixed(6)}</div>
                </div>
                ${data.standard && data.standard.confidence ? 
                    `<div class="popup-confidence">Confidence: ${(parseFloat(data.standard.confidence) * 100).toFixed(0)}%</div>` : ''}
            </div>
        `;
    } else {
        // Fallback for non-Geocoder.ca results
        return `
            <div class="popup-content">
                <div class="popup-address">📍 ${location.postalCode}</div>
                <div><strong>Location:</strong> ${location.displayName}</div>
            </div>
        `;
    }
}

/**
 * Clears all postal code markers from the map
 */
export function clearPostalCodeMarkers() {
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker && layer.options.icon === postalCodeIcon) {
            map.removeLayer(layer);
        }
    });
}

/**
 * Searches for a postal code and adds it to the map
 * @param {string} postalCode - The postal code to search for
 * @returns {Promise<Object>} - The search result
 */
export async function searchPostalCode(postalCode) {
    try {
        const location = await geocodePostalCode(postalCode);
        const marker = addPostalCodeMarker(location);
        
        // Center the map on the new location
        map.setView([location.lat, location.lng], 13);
        
        // Open the popup for the new marker
        marker.openPopup();
        
        return {
            success: true,
            location: location,
            marker: marker
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

