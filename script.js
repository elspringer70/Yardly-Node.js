// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input input');
    const searchBtn = document.querySelector('.btn-search');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const location = searchInput.value.trim();
            if (location) {
                alert(`Searching for backyards in: ${location}`);
                // In a real app, this would navigate to a search results page
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Load listings from the database
    loadListings();
});

// Favorite button functionality
function attachFavoriteListeners() {
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    favoriteBtns.forEach(btn => {
        // Remove existing listener to avoid duplicates
        btn.onclick = function() {
            this.classList.toggle('active');
            const isFavorite = this.classList.contains('active');
            const svg = this.querySelector('svg');
            
            if (isFavorite) {
                svg.setAttribute('fill', 'currentColor');
            } else {
                svg.setAttribute('fill', 'none');
            }
        };
    });
}

async function loadListings() {
    const grid = document.getElementById('listings-grid');
    if (!grid) return;

    try {
        const response = await fetch('/api/listings');
        const listings = await response.json();
        
        grid.innerHTML = listings.map(listing => `
            <div class="listing-card">
                <div class="listing-image">
                    <img src="${listing.image_url}" alt="${listing.title}">
                    <button class="favorite-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="listing-info">
                    <div class="listing-header">
                        <span class="listing-location">${listing.location}</span>
                        <span class="listing-rating">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1L10.5 6.5L16 7.5L12 11.5L13 17L8 14L3 17L4 11.5L0 7.5L5.5 6.5L8 1Z" stroke="#FFD700" stroke-width="0.5"/>
                            </svg>
                            <span>${listing.rating}</span>
                        </span>
                    </div>
                    <h3 class="listing-title">${listing.title}</h3>
                    <p class="listing-host">Hosted by ${listing.host_name}</p>
                    <div class="listing-price">
                        <span class="price">$${listing.price_per_hour}</span>
                        <span class="price-unit">/hr</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        attachFavoriteListeners();
    } catch (err) {
        console.error('Error loading listings:', err);
    }
}
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth <= 768 && navLinks) {
        // Create mobile menu button
        const menuBtn = document.createElement('button');
        menuBtn.innerHTML = '☰';
        menuBtn.style.cssText = 'background: none; border: none; font-size: 24px; cursor: pointer;';
        
        document.querySelector('.nav-logo').appendChild(menuBtn);
        
        menuBtn.addEventListener('click', function() {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '60px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid #ddd';
            }
        });
    }
});