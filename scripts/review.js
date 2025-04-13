// Function to get URL query parameters
function getQueryParams() {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  for (const [key, value] of urlParams.entries()) {
    // Handle multiple values for the same key (like checkbox groups)
    if (params[key]) {
      if (Array.isArray(params[key])) {
        params[key].push(value);
      } else {
        params[key] = [params[key], value];
      }
    } else {
      params[key] = value;
    }
  }
  
  return params;
}

// Function to update the review count
function updateReviewCount() {
  // Get the current count from localStorage, default to 0 if not set
  let reviewCount = localStorage.getItem('reviewCount') || 0;
  
  // Increment the count
  reviewCount = parseInt(reviewCount) + 1;
  
  // Store the updated count
  localStorage.setItem('reviewCount', reviewCount);
  
  // Update the display
  document.getElementById('review-count').textContent = reviewCount;
}

// Function to display the star rating
function displayStarRating(rating) {
  const fullStar = '★';
  let stars = '';
  
  for (let i = 0; i < rating; i++) {
    stars += fullStar;
  }
  
  return stars;
}

// Function to format the date
function formatDate(dateString) {
  if (!dateString) return 'Not provided';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Function to display the review details
function displayReviewDetails() {
  const params = getQueryParams();
  const reviewDetailsContainer = document.getElementById('review-details');
  
  if (reviewDetailsContainer) {
    let html = '';
    
    // Product
    html += `
      <div class="review-details-item">
        <span class="review-details-label">Product:</span>
        <div>${params.product || 'Not selected'}</div>
      </div>
    `;
    
    // Rating
    html += `
      <div class="review-details-item">
        <span class="review-details-label">Rating:</span>
        <div class="star-rating">${displayStarRating(params.rating || 0)}</div>
      </div>
    `;
    
    // Installation Date
    html += `
      <div class="review-details-item">
        <span class="review-details-label">Installation Date:</span>
        <div>${formatDate(params['installation-date'])}</div>
      </div>
    `;
    
    // Features
    html += `
      <div class="review-details-item">
        <span class="review-details-label">Useful Features:</span>
    `;
    
    if (params.features) {
      html += '<div class="feature-list">';
      
      // Convert to array if it's a single value
      const features = Array.isArray(params.features) ? params.features : [params.features];
      
      features.forEach(feature => {
        // Convert values like "ease-of-use" to "Ease of Use"
        const formattedFeature = feature
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
          
        html += `<span class="feature-tag">${formattedFeature}</span>`;
      });
      
      html += '</div>';
    } else {
      html += '<div>No features selected</div>';
    }
    
    html += '</div>';
    
    // Written Review
    html += `
      <div class="review-details-item">
        <span class="review-details-label">Written Review:</span>
        <div>${params.review || 'No written review provided'}</div>
      </div>
    `;
    
    // Name
    html += `
      <div class="review-details-item">
        <span class="review-details-label">Reviewer:</span>
        <div>${params.name || 'Anonymous'}</div>
      </div>
    `;
    
    reviewDetailsContainer.innerHTML = html;
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Display the review details
  displayReviewDetails();
  
  // Update the review count
  updateReviewCount();
}); 