// Temple Album JavaScript

// Update the year for the copyright
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Update the last modified date
document.getElementById('lastModified').textContent = document.lastModified;

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const hamburgerIcon = document.querySelector('.hamburger span:first-child');
    const closeIcon = document.querySelector('.hamburger .close');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', function() {
        // Toggle navigation visibility
        nav.classList.toggle('open');
        
        // Toggle icons
        if (nav.classList.contains('open')) {
            hamburgerIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            hamburgerIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
}); 