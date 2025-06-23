// Main JavaScript file for A-Fields Store

// Utility functions
const utils = {
  // Format currency
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  },

  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Show notification
  showNotification: (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  },

  // Smooth scroll to element
  scrollToElement: (element) => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  },

  // Get URL parameters
  getUrlParameter: (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  },

  // Set URL parameter
  setUrlParameter: (name, value) => {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.replaceState({}, '', url);
  }
};

// Search functionality
const search = {
  init: () => {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', search.handleSearch);
    }

    // Live search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', utils.debounce(search.handleLiveSearch, 300));
    }
  },

  handleSearch: (e) => {
    e.preventDefault();
    const query = e.target.querySelector('input[name="q"]').value.trim();
    if (query) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  },

  handleLiveSearch: (e) => {
    const query = e.target.value.trim();
    if (query.length > 2) {
      // Implement live search results here
      console.log('Live search for:', query);
    }
  }
};

// Mobile menu functionality
const mobileMenu = {
  init: () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.getElementById('mobile-nav');
    
    if (toggle && nav) {
      toggle.addEventListener('click', mobileMenu.toggle);
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
          mobileMenu.close();
        }
      });
    }
  },

  toggle: () => {
    const nav = document.getElementById('mobile-nav');
    nav.classList.toggle('active');
  },

  close: () => {
    const nav = document.getElementById('mobile-nav');
    nav.classList.remove('active');
  }
};

// Newsletter functionality
const newsletter = {
  init: () => {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
      form.addEventListener('submit', newsletter.handleSubmit);
    });
  },

  handleSubmit: (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (newsletter.validateEmail(email)) {
      newsletter.subscribe(email);
      e.target.reset();
    } else {
      utils.showNotification('Please enter a valid email address.', 'error');
    }
  },

  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  subscribe: (email) => {
    // Simulate API call
    setTimeout(() => {
      utils.showNotification('Thank you for subscribing! We\'ll keep you updated with our latest products.');
    }, 500);
  }
};

// Product functionality
const product = {
  init: () => {
    // Initialize product image gallery
    product.initGallery();
    
    // Initialize quantity controls
    product.initQuantityControls();
    
    // Initialize variant selectors
    product.initVariantSelectors();
  },

  initGallery: () => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    if (thumbnails.length && mainImage) {
      thumbnails.forEach(thumb => {
        thumb.addEventListener('click', (e) => {
          e.preventDefault();
          mainImage.src = thumb.src;
          
          // Update active thumbnail
          thumbnails.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
      });
    }
  },

  initQuantityControls: () => {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
      // Ensure quantity is within valid range
      quantityInput.addEventListener('change', () => {
        const value = parseInt(quantityInput.value);
        if (value < 1) quantityInput.value = 1;
        if (value > 99) quantityInput.value = 99;
      });
    }
  },

  initVariantSelectors: () => {
    const variantSelect = document.getElementById('variant-select');
    if (variantSelect) {
      variantSelect.addEventListener('change', product.updateVariant);
    }
  },

  updateVariant: () => {
    const select = document.getElementById('variant-select');
    const selectedOption = select.options[select.selectedIndex];
    const price = selectedOption.value;
    const sku = selectedOption.dataset.sku;
    
    // Update price display
    const priceElement = document.querySelector('.current-price');
    if (priceElement) {
      priceElement.textContent = utils.formatCurrency(price);
    }
    
    // Update SKU display
    const skuElement = document.getElementById('product-sku');
    if (skuElement) {
      skuElement.textContent = sku;
    }
  },

  addToCart: (productData) => {
    // This will be handled by cart.js
    if (window.cart && window.cart.addItem) {
      window.cart.addItem(productData);
    }
  },

  addToWishlist: (productId) => {
    // Simulate adding to wishlist
    utils.showNotification('Product added to wishlist!');
  }
};

// Lazy loading for images
const lazyLoad = {
  init: () => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
};

// Smooth scrolling for anchor links
const smoothScroll = {
  init: () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          utils.scrollToElement(target);
        }
      });
    });
  }
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  search.init();
  mobileMenu.init();
  newsletter.init();
  product.init();
  lazyLoad.init();
  smoothScroll.init();
  
  // Add loading states to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.type === 'submit' || btn.classList.contains('btn-primary')) {
        btn.disabled = true;
        btn.innerHTML = '<span class="loading">Loading...</span>';
        
        // Re-enable after a delay (for demo purposes)
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = btn.dataset.originalText || btn.innerHTML;
        }, 2000);
      }
    });
  });
  
  // Store original button text
  document.querySelectorAll('.btn').forEach(btn => {
    btn.dataset.originalText = btn.innerHTML;
  });
});

// Export utilities for use in other scripts
window.utils = utils;
window.search = search;
window.mobileMenu = mobileMenu;
window.newsletter = newsletter;
window.product = product; 