// === DOM Elements ===
document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mobile menu toggle
    const menuButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav');
    
    if (menuButton && primaryNav) {
        menuButton.addEventListener('click', () => {
            primaryNav.classList.toggle('show');
        });
    }

    // Initialize all interactive features
    initFilterButtons();
    initTabButtons();
    initGalleryLightbox();
    initTimelineSlider();
    initMemoryWall();
    initForms();
    loadStoredUserPreferences();
});

// === Filter Buttons ===
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Get filter value
                const filter = button.getAttribute('data-filter');
                
                // Filter adventure posts
                filterItems(filter);
            });
        });
    }
}

function filterItems(filter) {
    // Filter adventure posts
    const adventurePosts = document.querySelectorAll('.adventure-post');
    if (adventurePosts.length > 0) {
        adventurePosts.forEach(post => {
            if (filter === 'all') {
                post.style.display = 'block';
            } else {
                const categories = post.getAttribute('data-category').split(' ');
                if (categories.includes(filter)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            }
        });
    }

    // Filter gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block';
            } else {
                const category = item.getAttribute('data-category');
                if (category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        });

        // Store user's filter preference in localStorage
        localStorage.setItem('galleryFilter', filter);
    }
}

// === Tab Buttons ===
function initTabButtons() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Get tab value
                const tab = button.getAttribute('data-tab');
                
                // Show tab content
                showTabContent(tab);
            });
        });
    }
}

function showTabContent(tab) {
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabPanes.length > 0) {
        tabPanes.forEach(pane => {
            if (pane.id === tab) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });

        // Store user's tab preference in localStorage
        localStorage.setItem('activeTab', tab);
    }
}

// === Gallery Lightbox ===
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    
    if (galleryItems.length > 0 && lightbox) {
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeLightbox = document.getElementById('close-lightbox');
        const prevImage = document.getElementById('prev-image');
        const nextImage = document.getElementById('next-image');
        
        let currentIndex = 0;
        
        // Open lightbox
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = index;
                
                // Set lightbox image and caption
                lightboxImage.src = item.src;
                lightboxImage.alt = item.alt;
                
                // Get caption from parent's caption div
                const caption = item.closest('.gallery-item').querySelector('.image-caption');
                if (caption) {
                    lightboxCaption.innerHTML = caption.innerHTML;
                }
                
                // Show lightbox
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close lightbox
        if (closeLightbox) {
            closeLightbox.addEventListener('click', () => {
                lightbox.classList.remove('show');
                document.body.style.overflow = 'auto'; // Enable scrolling
            });
        }
        
        // Navigate to previous image
        if (prevImage) {
            prevImage.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightboxContent(galleryItems[currentIndex], lightboxImage, lightboxCaption);
            });
        }
        
        // Navigate to next image
        if (nextImage) {
            nextImage.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightboxContent(galleryItems[currentIndex], lightboxImage, lightboxCaption);
            });
        }
        
        // Close lightbox when clicking outside the content
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('show');
                document.body.style.overflow = 'auto'; // Enable scrolling
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('show')) return;
            
            if (e.key === 'Escape') {
                lightbox.classList.remove('show');
                document.body.style.overflow = 'auto'; // Enable scrolling
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightboxContent(galleryItems[currentIndex], lightboxImage, lightboxCaption);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightboxContent(galleryItems[currentIndex], lightboxImage, lightboxCaption);
            }
        });
    }
}

function updateLightboxContent(item, lightboxImage, lightboxCaption) {
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    
    // Get caption from parent's caption div
    const caption = item.closest('.gallery-item').querySelector('.image-caption');
    if (caption) {
        lightboxCaption.innerHTML = caption.innerHTML;
    }
}

// === Timeline Slider ===
function initTimelineSlider() {
    const timelineTrack = document.getElementById('timeline-track');
    
    if (timelineTrack) {
        const timelinePoints = timelineTrack.querySelectorAll('.timeline-point');
        const prevBtn = document.getElementById('timeline-prev');
        const nextBtn = document.getElementById('timeline-next');
        
        // Set initial active year
        if (timelinePoints.length > 0) {
            setActiveYear(timelinePoints[0].getAttribute('data-year'));
        }
        
        // Add click event to points
        timelinePoints.forEach(point => {
            point.addEventListener('click', () => {
                const year = point.getAttribute('data-year');
                setActiveYear(year);
            });
        });
        
        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const activeIndex = getActivePointIndex(timelinePoints);
                const newIndex = (activeIndex - 1 + timelinePoints.length) % timelinePoints.length;
                setActiveYear(timelinePoints[newIndex].getAttribute('data-year'));
            });
        }
        
        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const activeIndex = getActivePointIndex(timelinePoints);
                const newIndex = (activeIndex + 1) % timelinePoints.length;
                setActiveYear(timelinePoints[newIndex].getAttribute('data-year'));
            });
        }
    }
}

function getActivePointIndex(timelinePoints) {
    for (let i = 0; i < timelinePoints.length; i++) {
        if (timelinePoints[i].classList.contains('active')) {
            return i;
        }
    }
    return 0;
}

function setActiveYear(year) {
    // Update active point
    const timelinePoints = document.querySelectorAll('.timeline-point');
    timelinePoints.forEach(point => {
        if (point.getAttribute('data-year') === year) {
            point.classList.add('active');
        } else {
            point.classList.remove('active');
        }
    });
    
    // Filter gallery items by year
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        if (item.getAttribute('data-year') === year) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Store user's year preference in localStorage
    localStorage.setItem('activeYear', year);
}

// === Memory Wall ===
function initMemoryWall() {
    const memoryForm = document.getElementById('memory-form');
    const memoriesContainer = document.getElementById('memories-container');
    
    if (memoryForm && memoriesContainer) {
        // Load existing memories
        displayMemories();
        
        // Form submission
        memoryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('memory-name').value;
            const message = document.getElementById('memory-message').value;
            
            if (name && message) {
                addMemory(name, message);
                memoryForm.reset();
            }
        });
    }
}

function addMemory(name, message) {
    // Create memory object
    const memory = {
        name,
        message,
        date: new Date().toLocaleDateString()
    };
    
    // Get existing memories from localStorage
    let memories = JSON.parse(localStorage.getItem('memories')) || [];
    
    // Add new memory
    memories.push(memory);
    
    // Save to localStorage
    localStorage.setItem('memories', JSON.stringify(memories));
    
    // Update display
    displayMemories();
}

function displayMemories() {
    const memoriesContainer = document.getElementById('memories-container');
    
    if (memoriesContainer) {
        // Get memories from localStorage
        const memories = JSON.parse(localStorage.getItem('memories')) || [];
        
        // Clear container
        memoriesContainer.innerHTML = '';
        
        // Display memories
        if (memories.length === 0) {
            memoriesContainer.innerHTML = '<p>No memories shared yet. Be the first to share!</p>';
        } else {
            memories.forEach(memory => {
                const memoryCard = document.createElement('div');
                memoryCard.className = 'memory-card';
                
                memoryCard.innerHTML = `
                    <div class="memory-author">${memory.name}</div>
                    <div class="memory-text">${memory.message}</div>
                    <div class="memory-date">${memory.date}</div>
                `;
                
                memoriesContainer.appendChild(memoryCard);
            });
        }
    }
}

// === Forms ===
function initForms() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            
            if (email) {
                // Save subscription to localStorage
                saveSubscription(email);
                newsletterForm.reset();
                alert('Thank you for subscribing to Camilo\'s adventures!');
            }
        });
    }
    
    // Share adventure form
    const shareForm = document.getElementById('share-form');
    if (shareForm) {
        shareForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const yourName = document.getElementById('your-name').value;
            const dogName = document.getElementById('dog-name').value;
            const adventureType = document.getElementById('adventure-type').value;
            const adventureStory = document.getElementById('adventure-story').value;
            
            if (yourName && dogName && adventureType && adventureStory) {
                // Save story to localStorage
                saveSharedStory(yourName, dogName, adventureType, adventureStory);
                shareForm.reset();
                alert('Thank you for sharing your adventure with us!');
            }
        });
    }
    
    // Question form
    const questionForm = document.getElementById('question-form');
    if (questionForm) {
        questionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const questionName = document.getElementById('question-name').value;
            const questionEmail = document.getElementById('question-email').value;
            const questionCategory = document.getElementById('question-category').value;
            const questionText = document.getElementById('question-text').value;
            
            if (questionName && questionEmail && questionCategory && questionText) {
                // Save question to localStorage
                saveQuestion(questionName, questionEmail, questionCategory, questionText);
                questionForm.reset();
                alert('Thank you for your question! We\'ll respond as soon as possible.');
            }
        });
    }
}

function saveSubscription(email) {
    // Get existing subscriptions
    let subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
    
    // Add new subscription if not already subscribed
    if (!subscriptions.includes(email)) {
        subscriptions.push(email);
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }
}

function saveSharedStory(yourName, dogName, adventureType, adventureStory) {
    // Create story object
    const story = {
        yourName,
        dogName,
        adventureType,
        adventureStory,
        date: new Date().toLocaleDateString()
    };
    
    // Get existing stories
    let stories = JSON.parse(localStorage.getItem('sharedStories')) || [];
    
    // Add new story
    stories.push(story);
    
    // Save to localStorage
    localStorage.setItem('sharedStories', JSON.stringify(stories));
}

function saveQuestion(name, email, category, question) {
    // Create question object
    const questionObj = {
        name,
        email,
        category,
        question,
        date: new Date().toLocaleDateString()
    };
    
    // Get existing questions
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    
    // Add new question
    questions.push(questionObj);
    
    // Save to localStorage
    localStorage.setItem('questions', JSON.stringify(questions));
}

// === Load User Preferences ===
function loadStoredUserPreferences() {
    // Load gallery filter preference
    const galleryFilter = localStorage.getItem('galleryFilter');
    if (galleryFilter) {
        // Find and click the stored filter button
        const filterButton = document.querySelector(`.filter-btn[data-filter="${galleryFilter}"]`);
        if (filterButton) {
            filterButton.click();
        }
    }
    
    // Load active tab preference
    const activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
        // Find and click the stored tab button
        const tabButton = document.querySelector(`.tab-button[data-tab="${activeTab}"]`);
        if (tabButton) {
            tabButton.click();
        }
    }
    
    // Load timeline year preference
    const activeYear = localStorage.getItem('activeYear');
    if (activeYear) {
        setActiveYear(activeYear);
    }
}

// === Load More Button ===
const loadMoreBtn = document.getElementById('load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        // In a real application, this would load more adventures from a server
        // For this demo, we'll just hide the button
        loadMoreBtn.textContent = 'No More Adventures to Load';
        loadMoreBtn.disabled = true;
        
        // Store this preference
        localStorage.setItem('adventuresLoaded', 'all');
    });
    
    // Check if all adventures are already loaded
    if (localStorage.getItem('adventuresLoaded') === 'all') {
        loadMoreBtn.textContent = 'No More Adventures to Load';
        loadMoreBtn.disabled = true;
    }
} 