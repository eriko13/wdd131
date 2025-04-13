// Product data array
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Function to populate the product dropdown
function populateProductDropdown() {
  const productSelect = document.getElementById('product');
  
  // If the product select element exists
  if (productSelect) {
    // Loop through the products array
    products.forEach(product => {
      // Create a new option element
      const option = document.createElement('option');
      
      // Set the value to the product id
      option.value = product.name;
      
      // Set the display text to the product name
      // Capitalize the first letter of each word
      option.textContent = product.name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Add the option to the select element
      productSelect.appendChild(option);
    });
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Populate the product dropdown
  populateProductDropdown();
}); 