// Shopping Cart functionality for A-Fields Store

const cart = {
  items: [],
  shipping: 5.99,
  freeShippingThreshold: 50,

  // Initialize cart
  init: () => {
    cart.loadFromStorage();
    cart.updateDisplay();
    cart.bindEvents();
  },

  // Load cart from localStorage
  loadFromStorage: () => {
    const savedCart = localStorage.getItem('a-fields-cart');
    if (savedCart) {
      try {
        cart.items = JSON.parse(savedCart);
      } catch (e) {
        console.error('Error loading cart from storage:', e);
        cart.items = [];
      }
    }
  },

  // Save cart to localStorage
  saveToStorage: () => {
    localStorage.setItem('a-fields-cart', JSON.stringify(cart.items));
  },

  // Add item to cart
  addItem: (product) => {
    const existingItem = cart.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      cart.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: product.quantity || 1
      });
    }
    
    cart.saveToStorage();
    cart.updateDisplay();
    cart.showNotification('Product added to cart!');
  },

  // Remove item from cart
  removeItem: (productId) => {
    cart.items = cart.items.filter(item => item.id !== productId);
    cart.saveToStorage();
    cart.updateDisplay();
    cart.showNotification('Product removed from cart!');
  },

  // Update item quantity
  updateQuantity: (productId, quantity) => {
    const item = cart.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        cart.removeItem(productId);
      } else {
        item.quantity = quantity;
        cart.saveToStorage();
        cart.updateDisplay();
      }
    }
  },

  // Clear cart
  clearCart: () => {
    cart.items = [];
    cart.saveToStorage();
    cart.updateDisplay();
    cart.showNotification('Cart cleared!');
  },

  // Get cart total
  getSubtotal: () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  // Get shipping cost
  getShippingCost: () => {
    const subtotal = cart.getSubtotal();
    return subtotal >= cart.freeShippingThreshold ? 0 : cart.shipping;
  },

  // Get total
  getTotal: () => {
    return cart.getSubtotal() + cart.getShippingCost();
  },

  // Get item count
  getItemCount: () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  },

  // Update cart display
  updateDisplay: () => {
    cart.updateCartCount();
    cart.updateCartItems();
    cart.updateCartTotals();
  },

  // Update cart count in header
  updateCartCount: () => {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      const count = cart.getItemCount();
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'block' : 'none';
    }
  },

  // Update cart items in modal
  updateCartItems: () => {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;

    if (cart.items.length === 0) {
      cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
      return;
    }

    cartItems.innerHTML = cart.items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-quantity">
            <button onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
          </div>
        </div>
        <div class="cart-item-total">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
        <button class="remove-item" onclick="cart.removeItem('${item.id}')">×</button>
      </div>
    `).join('');
  },

  // Update cart totals
  updateCartTotals: () => {
    const subtotal = cart.getSubtotal();
    const shipping = cart.getShippingCost();
    const total = cart.getTotal();

    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping');
    const totalEl = document.getElementById('cart-total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

    // Show free shipping message
    if (subtotal > 0 && subtotal < cart.freeShippingThreshold) {
      const remaining = cart.freeShippingThreshold - subtotal;
      if (shippingEl) {
        shippingEl.innerHTML = `$${shipping.toFixed(2)} <small>(Add $${remaining.toFixed(2)} for free shipping)</small>`;
      }
    }
  },

  // Show notification
  showNotification: (message) => {
    if (window.utils && window.utils.showNotification) {
      window.utils.showNotification(message, 'success');
    } else {
      // Fallback notification
      const notification = document.createElement('div');
      notification.className = 'notification success';
      notification.textContent = message;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }
  },

  // Toggle cart modal
  toggleCart: () => {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
      cartModal.classList.toggle('active');
    }
  },

  // Proceed to checkout
  proceedToCheckout: () => {
    if (cart.items.length === 0) {
      cart.showNotification('Your cart is empty!');
      return;
    }

    // For demo purposes, show a checkout form
    cart.showCheckoutForm();
  },

  // Show checkout form (demo)
  showCheckoutForm: () => {
    const checkoutHTML = `
      <div class="checkout-modal" id="checkout-modal">
        <div class="checkout-overlay" onclick="cart.closeCheckout()"></div>
        <div class="checkout-content">
          <div class="checkout-header">
            <h3>Checkout</h3>
            <button class="close-btn" onclick="cart.closeCheckout()">×</button>
          </div>
          <div class="checkout-form">
            <h4>Shipping Information</h4>
            <form id="checkout-form">
              <div class="form-row">
                <input type="text" placeholder="First Name" required>
                <input type="text" placeholder="Last Name" required>
              </div>
              <input type="email" placeholder="Email" required>
              <input type="text" placeholder="Address" required>
              <div class="form-row">
                <input type="text" placeholder="City" required>
                <input type="text" placeholder="State" required>
                <input type="text" placeholder="ZIP Code" required>
              </div>
              <h4>Payment Information</h4>
              <input type="text" placeholder="Card Number" required>
              <div class="form-row">
                <input type="text" placeholder="MM/YY" required>
                <input type="text" placeholder="CVV" required>
              </div>
              <button type="submit" class="btn btn-primary">Complete Order</button>
            </form>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', checkoutHTML);
    
    // Add styles for checkout modal
    const styles = `
      <style>
        .checkout-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .checkout-content {
          background: white;
          border-radius: 12px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }
        .checkout-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }
        .checkout-form {
          padding: 20px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .checkout-form input {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          margin-bottom: 10px;
        }
        .checkout-form h4 {
          margin: 20px 0 10px 0;
        }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
    
    // Handle form submission
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
      e.preventDefault();
      cart.processOrder();
    });
  },

  // Close checkout
  closeCheckout: () => {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
      checkoutModal.remove();
    }
  },

  // Process order (demo)
  processOrder: () => {
    cart.showNotification('Order placed successfully! Thank you for your purchase.');
    cart.clearCart();
    cart.closeCheckout();
    cart.toggleCart();
  },

  // Bind events
  bindEvents: () => {
    // Cart toggle
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
      cartBtn.addEventListener('click', cart.toggleCart);
    }

    // Close cart when clicking overlay
    const cartOverlay = document.querySelector('.cart-overlay');
    if (cartOverlay) {
      cartOverlay.addEventListener('click', cart.toggleCart);
    }

    // Clear cart button
    const clearCartBtn = document.querySelector('.cart-actions .btn-secondary');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', cart.clearCart);
    }

    // Checkout button
    const checkoutBtn = document.querySelector('.cart-actions .btn-primary');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', cart.proceedToCheckout);
    }
  }
};

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  cart.init();
});

// Export cart for global access
window.cart = cart;
window.addToCart = cart.addItem; 