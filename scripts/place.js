// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Set last modified date in footer
document.getElementById('last-modified').textContent = document.lastModified;

// Function to calculate wind chill
function calculateWindChill(tempF, windSpeedMph) {
    // Check if conditions meet the requirements for wind chill calculation
    // For Fahrenheit, wind chill is only defined for temps at or below 50°F and wind speeds above 3 mph
    if (tempF <= 50 && windSpeedMph > 3) {
        // Wind chill formula for Fahrenheit
        const windChill = 35.74 + 0.6215 * tempF - 35.75 * Math.pow(windSpeedMph, 0.16) + 0.4275 * tempF * Math.pow(windSpeedMph, 0.16);
        return Math.round(windChill);
    } else {
        // Return "N/A" if conditions aren't met
        return "N/A";
    }
}

// Convert km/h to mph for calculation
function kmhToMph(kmh) {
    return kmh * 0.621371;
}

// Set the wind chill value when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Get temperature and wind speed values from the page
    const tempElement = document.querySelector('.weather-data .value:nth-of-type(2)');
    const windSpeedElement = document.querySelector('.weather-data .value:nth-of-type(6)');
    
    if (tempElement && windSpeedElement) {
        // Extract numeric values
        const tempText = tempElement.textContent;
        const windSpeedText = windSpeedElement.textContent;
        
        const tempF = parseFloat(tempText);
        const windSpeedKmh = parseFloat(windSpeedText);
        const windSpeedMph = kmhToMph(windSpeedKmh);
        
        // Calculate and display wind chill
        const windchillElement = document.getElementById('windchill');
        
        if (windchillElement) {
            const windchill = calculateWindChill(tempF, windSpeedMph);
            
            if (windchill === "N/A") {
                windchillElement.textContent = windchill;
            } else {
                // Add °F
                windchillElement.textContent = `${windchill}°F`;
            }
        }
    }
}); 