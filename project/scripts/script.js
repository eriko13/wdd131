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
            menuButton.classList.toggle('active');
            primaryNav.classList.toggle('show');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when a link is clicked
        const navLinks = primaryNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuButton.classList.remove('active');
                primaryNav.classList.remove('show');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (primaryNav.classList.contains('show') && 
                !primaryNav.contains(e.target) && 
                !menuButton.contains(e.target)) {
                menuButton.classList.remove('active');
                primaryNav.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Initialize all interactive features
    initFilterButtons();
    initTabButtons();
    initGalleryLightbox();
    initTimelineSlider();
    initMemoryWall();
    initForms();
    initAnimations();
    loadStoredUserPreferences();
});

// === Animation on Scroll ===
function initAnimations() {
    // Simple animation observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    // Make gallery items visible immediately to fix filter issue
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.classList.add('animate');
    });
    
    // Observe elements with animation classes (except gallery items)
    const animationElements = document.querySelectorAll('.activity-card, .preview, .blog-post, .tip-category');
    animationElements.forEach(el => {
        observer.observe(el);
        el.classList.add('pre-animation');
    });
}

// === Filter Buttons ===
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        // Initially show all gallery items by default
        galleryItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        });
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get the filter value from data-filter attribute
                const filterValue = button.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    // If 'all' is selected or item has the selected category, show it
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        // Otherwise hide it with animation
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
                
                // Store user's filter preference
                localStorage.setItem('galleryFilter', filterValue);
            });
        });
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
                setTimeout(() => {
                    pane.classList.add('fade-in');
                }, 50);
            } else {
                pane.classList.remove('active');
                pane.classList.remove('fade-in');
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
                
                // Add loading animation
                lightboxImage.classList.add('loading');
                
                // When image loads, remove loading class
                lightboxImage.onload = () => {
                    lightboxImage.classList.remove('loading');
                };
                
                // Get caption from parent's caption div
                const caption = item.closest('.gallery-item').querySelector('.gallery-caption');
                if (caption) {
                    lightboxCaption.innerHTML = caption.innerHTML;
                }
                
                // Show lightbox with animation
                lightbox.classList.add('show');
                setTimeout(() => {
                    lightboxImage.classList.add('show');
                    lightboxCaption.classList.add('show');
                }, 100);
                
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close lightbox
        if (closeLightbox) {
            closeLightbox.addEventListener('click', () => {
                closeLightbox();
            });
        }
        
        // Close lightbox function
        function closeLightbox() {
            lightboxImage.classList.remove('show');
            lightboxCaption.classList.remove('show');
            
            setTimeout(() => {
                lightbox.classList.remove('show');
                document.body.style.overflow = 'auto'; // Enable scrolling
            }, 300);
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
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('show')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightboxContent(galleryItems[currentIndex], lightboxImage, lightboxCaption);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightboxContent(galleryItems[currentIndex], lightboxImage, lightboxCaption);
            }
        });
        
        // Swipe support for touch devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - next image
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightboxContent(galleryItems[currentIndex], lightboxImage, lightboxCaption);
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe right - previous image
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightboxContent(galleryItems[currentIndex], lightboxImage, lightboxCaption);
            }
        }
    }
}

function updateLightboxContent(item, lightboxImage, lightboxCaption) {
    // Add loading animation
    lightboxImage.classList.add('loading');
    
    // Set new image
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    
    // When image loads, remove loading class
    lightboxImage.onload = () => {
        lightboxImage.classList.remove('loading');
    };
    
    // Get caption from parent's caption div
    const caption = item.closest('.gallery-item').querySelector('.gallery-caption');
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
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
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
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for sharing your memory!';
                memoryForm.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.classList.add('show');
                }, 100);
                
                setTimeout(() => {
                    successMessage.classList.remove('show');
                    setTimeout(() => {
                        memoryForm.removeChild(successMessage);
                    }, 300);
                }, 3000);
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
            memoriesContainer.innerHTML = '<p class="no-memories">No memories shared yet. Be the first to share!</p>';
        } else {
            memories.forEach((memory, index) => {
                const memoryCard = document.createElement('div');
                memoryCard.className = 'memory-card pre-animation';
                
                memoryCard.innerHTML = `
                    <div class="memory-author">${memory.name}</div>
                    <div class="memory-text">${memory.message}</div>
                    <div class="memory-date">${memory.date}</div>
                `;
                
                memoriesContainer.appendChild(memoryCard);
                
                // Animate cards with delay
                setTimeout(() => {
                    memoryCard.classList.add('animate');
                }, index * 100);
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
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for subscribing to Camilo\'s adventures!';
                newsletterForm.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.classList.add('show');
                }, 100);
                
                setTimeout(() => {
                    successMessage.classList.remove('show');
                    setTimeout(() => {
                        newsletterForm.removeChild(successMessage);
                    }, 300);
                }, 3000);
            }
        });
    }
    
    // Form validation and enhanced UI
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        // Add focus and blur events for animation
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
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
    } else {
        // If no stored preference, ensure that all items are visible
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        });
        
        // Ensure 'All Photos' button is active
        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allButton) {
            allButton.classList.add('active');
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
        // Add loading animation
        loadMoreBtn.classList.add('loading');
        loadMoreBtn.textContent = 'Loading...';
        
        // Simulate loading delay
        setTimeout(() => {
            // In a real application, this would load more adventures from a server
            loadMoreBtn.classList.remove('loading');
            loadMoreBtn.textContent = 'No More Adventures to Load';
            loadMoreBtn.disabled = true;
            
            // Store this preference
            localStorage.setItem('adventuresLoaded', 'all');
        }, 1500);
    });
    
    // Check if all adventures are already loaded
    if (localStorage.getItem('adventuresLoaded') === 'all') {
        loadMoreBtn.textContent = 'No More Adventures to Load';
        loadMoreBtn.disabled = true;
    }
} 