// Temple Album JavaScript

// Get current year and set it in the footer
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;

// Get last modified date and set it in the footer
document.getElementById('lastModified').textContent = document.lastModified;

// Hamburger menu functionality
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger span:first-child");
    const closeButton = document.querySelector(".hamburger span.close");
    const nav = document.querySelector("nav"); // Corrected: Select the nav element directly

    nav.classList.remove('open');
    hamburger.style.display = 'block';
    closeButton.style.display = 'none';

    // Function to toggle navigation
    function toggleNav() {
        nav.classList.toggle("open"); // Corrected: Use 'open' class
        hamburger.style.display = nav.classList.contains("open") ? "none" : "block"; // Corrected: Check for 'open' class
        closeButton.style.display = nav.classList.contains("open") ? "block" : "none"; // Corrected: Check for 'open' class
    }

    hamburger.addEventListener("click", toggleNav);
    closeButton.addEventListener("click", toggleNav);

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                toggleNav();
            }
        });
    });
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "San Diego California",
    location: "San Diego, California, United States",
    dedicated: "1993, April, 25",
    area: 72000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/san-diego-california-temple/san-diego-california-temple-39444.jpg"
  },
  { 
    templeName: "Salt Lake City Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1983, April, 6",
    area: 382207,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-37021.jpg"
  },
  {
    templeName: "Provo City Center Utah",
    location: "Provo, Utah, United States",
    dedicated: "2016, March, 20",
    area: 85084,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/provo-city-center-temple/provo-city-center-temple-3394.jpg"
  }
];

const templeGrid = document.querySelector('.temple-grid');
const pageTitle = document.querySelector('#page-title');

// Function to create a single temple card
const createTempleCard = (temple) => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} Temple`;
    img.loading = 'lazy';
    img.classList.add('temple-image');

    figcaption.innerHTML = `
        <h3>${temple.templeName}</h3>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    `;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    return figure;
};

// Function to display temples
const displayTemples = (templeArray) => {
    if (!templeGrid) {
        console.error("Temple grid container not found!");
        return;
    }
    templeGrid.innerHTML = ''; // Clear existing grid
    templeArray.forEach(temple => {
        const card = createTempleCard(temple);
        templeGrid.appendChild(card);
    });
};

// Function to update the page title
const updateTitle = (title) => {
    if (!pageTitle) {
        console.error("Page title element not found!");
        return;
    }
    pageTitle.textContent = title;
};

// Navigation Event Listeners Setup
const setupNavListeners = () => {
    const homeLink = document.querySelector('#home');
    const oldLink = document.querySelector('#old');
    const newLink = document.querySelector('#new');
    const largeLink = document.querySelector('#large');
    const smallLink = document.querySelector('#small');

    if (!homeLink || !oldLink || !newLink || !largeLink || !smallLink) {
        console.error("One or more navigation links not found!");
        return;
    }

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        updateTitle('Home');
        displayTemples(temples);
    });

    oldLink.addEventListener('click', (e) => {
        e.preventDefault();
        updateTitle('Old Temples (Dedicated before 1900)');
        displayTemples(temples.filter(temple => {
            const year = parseInt(temple.dedicated.split(',')[0]);
            return year < 1900;
        }));
    });

    newLink.addEventListener('click', (e) => {
        e.preventDefault();
        updateTitle('New Temples (Dedicated after 2000)');
        displayTemples(temples.filter(temple => {
             const year = parseInt(temple.dedicated.split(',')[0]);
             return year > 2000;
        }));
    });

    largeLink.addEventListener('click', (e) => {
        e.preventDefault();
        updateTitle('Large Temples (Area > 90,000 sq ft)');
        displayTemples(temples.filter(temple => temple.area > 90000));
    });

    smallLink.addEventListener('click', (e) => {
        e.preventDefault();
        updateTitle('Small Temples (Area < 10,000 sq ft)');
        displayTemples(temples.filter(temple => temple.area < 10000));
    });
};

document.addEventListener('DOMContentLoaded', () => {
    setupNavListeners();

    displayTemples(temples);
}); 