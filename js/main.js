import { loadLocations } from './locations.js';
import { getUserLocation } from './user-location.js';

// Make getUserLocation available globally for the button onclick
window.getUserLocation = getUserLocation;

// Load locations when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    loadLocations();
});
