// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Set last modified date in footer
document.getElementById('last-modified').textContent = document.lastModified;

// Function to calculate wind chill
function calculateWindChill(tempC, windSpeedKmh) {
    // Convert to Celsius if needed - already using Celsius in this example
    const temp = tempC;
    const windSpeed = windSpeedKmh;
    
    // Check if conditions meet the requirements for wind chill calculation
    if (temp <= 10 && windSpeed > 4.8) {
        // Wind chill formula for Celsius
        return 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
    } else {
        // Return "N/A" if conditions aren't met
        return "N/A";
    }
}

// Set the wind chill value when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Get static temperature and wind speed values from the page
    // In a real app, these would come from an API
    const tempElement = document.querySelector('.weather-data .value:nth-of-type(2)');
    const windSpeedElement = document.querySelector('.weather-data .value:nth-of-type(4)');
    
    if (tempElement && windSpeedElement) {
        // Extract numeric values
        const tempText = tempElement.textContent;
        const windSpeedText = windSpeedElement.textContent;
        
        const tempC = parseFloat(tempText);
        const windSpeedKmh = parseFloat(windSpeedText);
        
        // Calculate and display wind chill
        const windchillElement = document.getElementById('windchill');
        
        if (windchillElement) {
            const windchill = calculateWindChill(tempC, windSpeedKmh);
            
            if (windchill === "N/A") {
                windchillElement.textContent = windchill;
            } else {
                // Round to one decimal place and add °C
                windchillElement.textContent = `${Math.round(windchill * 10) / 10}°C`;
            }
        }
    }
}); 