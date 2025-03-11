// getdates.js for WDD 131 - Dynamic Web Fundamentals

// Function to get and display the current year
function displayCurrentYear() {
    const currentYearElement = document.querySelector('#currentyear');
    const currentYear = new Date().getFullYear();
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }
}

// Function to display the last modified date
function displayLastModified() {
    const lastModifiedElement = document.querySelector('#lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last modification: ${document.lastModified}`;
    }
}

// Run the functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    displayCurrentYear();
    displayLastModified();
}); 