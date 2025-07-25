// E-commerce Website JavaScript
console.log('🛒 SnapShop E-commerce Website Loading...');

// Global Variables
let currentSlide = 0;
let cart = [];
let products = [];
let categories = {
    mobiles: [],
    electronics: [],
    fashion: [],
    women: [],
    home: [],
    books: [],
    sports: [],
    beauty: []
};

// Sample Products Data
const sampleProducts = [
    // Mobiles
    {
        id: 1,
        title: "Samsung Galaxy S24 Ultra",
        category: "mobiles",
        price: 89999,
        originalPrice: 129999,
        discount: 31,
        rating: 4.5,
        reviews: 1247,
        image: "📱",
        description: "Latest flagship smartphone with AI features"
    },
    {
        id: 2,
        title: "iPhone 15 Pro Max",
        category: "mobiles",
        price: 134900,
        originalPrice: 159900,
        discount: 16,
        rating: 4.8,
        reviews: 892,
        image: "📱",
        description: "Premium iOS smartphone with titanium design"
    },
    {
        id: 3,
        title: "OnePlus 12R",
        category: "mobiles",
        price: 39999,
        originalPrice: 49999,
        discount: 20,
        rating: 4.3,
        reviews: 567,
        image: "📱",
        description: "Flagship killer with premium features"
    },
    
    // Electronics
    {
        id: 4,
        title: "MacBook Air M3",
        category: "electronics",
        price: 114900,
        originalPrice: 134900,
        discount: 15,
        rating: 4.7,
        reviews: 324,
        image: "💻",
        description: "Ultra-thin laptop with M3 chip"
    },
    {
        id: 5,
        title: "Sony WH-1000XM5",
        category: "electronics",
        price: 24990,
        originalPrice: 34990,
        discount: 29,
        rating: 4.6,
        reviews: 789,
        image: "🎧",
        description: "Premium noise cancelling headphones"
    },
    {
        id: 6,
        title: "iPad Pro 12.9\"",
        category: "electronics",
        price: 99900,
        originalPrice: 112900,
        discount: 12,
        rating: 4.5,
        reviews: 445,
        image: "📱",
        description: "Professional tablet with M2 chip"
    },
    
    // Fashion
    {
        id: 7,
        title: "Adidas Ultraboost 22",
        category: "fashion",
        price: 8999,
        originalPrice: 16999,
        discount: 47,
        rating: 4.4,
        reviews: 1123,
        image: "👟",
        description: "Premium running shoes"
    },
    {
        id: 8,
        title: "Nike Air Jordan 1",
        category: "fashion",
        price: 12999,
        originalPrice: 19999,
        discount: 35,
        rating: 4.6,
        reviews: 891,
        image: "👟",
        description: "Classic basketball sneakers"
    },
    {
        id: 9,
        title: "Levi's 511 Slim Jeans",
        category: "fashion",
        price: 2999,
        originalPrice: 4999,
        discount: 40,
        rating: 4.2,
        reviews: 667,
        image: "👖",
        description: "Slim fit denim jeans"
    },
    
    // Home & Kitchen
    {
        id: 10,
        title: "Philips Air Fryer",
        category: "home",
        price: 8999,
        originalPrice: 12999,
        discount: 31,
        rating: 4.3,
        reviews: 445,
        image: "🍳",
        description: "Healthy cooking air fryer"
    },
    {
        id: 11,
        title: "Dyson V15 Detect",
        category: "home",
        price: 59900,
        originalPrice: 69900,
        discount: 14,
        rating: 4.7,
        reviews: 289,
        image: "🧹",
        description: "Advanced cordless vacuum cleaner"
    },
    {
        id: 12,
        title: "Instant Pot Duo 7-in-1",
        category: "home",
        price: 7999,
        originalPrice: 11999,
        discount: 33,
        rating: 4.5,
        reviews: 556,
        image: "🍲",
        description: "Multi-use programmable pressure cooker"
    },
    
    // Books
    {
        id: 13,
        title: "Atomic Habits",
        category: "books",
        price: 399,
        originalPrice: 599,
        discount: 33,
        rating: 4.8,
        reviews: 2234,
        image: "📚",
        description: "Bestselling self-help book"
    },
    {
        id: 14,
        title: "The Psychology of Money",
        category: "books",
        price: 299,
        originalPrice: 499,
        discount: 40,
        rating: 4.6,
        reviews: 1567,
        image: "📚",
        description: "Financial wisdom book"
    },
    
    // Sports
    {
        id: 15,
        title: "Yonex Badminton Racket",
        category: "sports",
        price: 3999,
        originalPrice: 6999,
        discount: 43,
        rating: 4.4,
        reviews: 334,
        image: "🏸",
        description: "Professional badminton racket"
    },
    {
        id: 16,
        title: "Adidas Football",
        category: "sports",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        rating: 4.2,
        reviews: 445,
        image: "⚽",
        description: "FIFA approved football"
    }
];

// Initialize Website
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing SnapShop...');
    
    initializeProducts();
    loadDeals();
    loadTrendingProducts();
    startBannerSlider();
    startDealTimer();
    setupEventListeners();
    loadCartFromStorage();
    
    console.log('✅ SnapShop initialized successfully!');
});

// Initialize Products
function initializeProducts() {
    products = [...sampleProducts];
    
    // Categorize products
    products.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = [];
        }
        categories[product.category].push(product);
    });
    
    console.log('📦 Products loaded:', products.length);
}

// Load Today's Deals
function loadDeals() {
    const dealsGrid = document.getElementById('dealsGrid');
    const dealProducts = products.filter(p => p.discount >= 30).slice(0, 8);
    
    dealsGrid.innerHTML = '';
    
    dealProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        dealsGrid.appendChild(productCard);
    });
}

// Load Trending Products
function loadTrendingProducts() {
    const trendingGrid = document.getElementById('trendingGrid');
    const trendingProducts = products.filter(p => p.rating >= 4.4).slice(0, 8);
    
    trendingGrid.innerHTML = '';
    
    trendingProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        trendingGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <span class="discount-badge">${product.discount}% OFF</span>
            <div style="font-size: 64px;">${product.image}</div>
        </div>
        <div class="product-info">
            <div class="product-title">${product.title}</div>
            <div class="product-price">
                <span class="current-price">₹${product.price.toLocaleString()}</span>
                <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
            </div>
            <div class="product-rating">
                <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                <span class="rating-text">(${product.reviews})</span>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

// Banner Slider
function startBannerSlider() {
    const slides = document.querySelectorAll('.banner-slide');
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

function nextSlide() {
    const slides = document.querySelectorAll('.banner-slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

function prevSlide() {
    const slides = document.querySelectorAll('.banner-slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Deal Timer
function startDealTimer() {
    const timer = document.getElementById('dealTimer');
    let timeLeft = 5 * 3600 + 30 * 60 + 45; // 5:30:45
    
    setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
        if (timeLeft < 0) {
            timeLeft = 5 * 3600 + 30 * 60 + 45; // Reset timer
        }
    }, 1000);
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showCartNotification(`${product.title} added to cart!`);
    
    console.log('🛒 Added to cart:', product.title);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
        saveCartToStorage();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px; color: red;">×</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toLocaleString();
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`🎉 Order placed successfully!\n\nTotal: ₹${total.toLocaleString()}\nItems: ${cart.length}\n\nThank you for shopping with SnapShop!`);
    
    // Clear cart
    cart = [];
    updateCartUI();
    saveCartToStorage();
    closeCart();
}

// Search Functionality
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const cartIcon = document.querySelector('.cart-icon');
    
    // Search
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            searchProducts(query);
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.toLowerCase();
            searchProducts(query);
        }
    });
    
    // Cart click
    cartIcon.addEventListener('click', openCart);
    
    // Search button
    document.querySelector('.search-btn').addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        searchProducts(query);
    });
    
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
}

function searchProducts(query) {
    console.log('🔍 Searching for:', query);
    
    const results = products.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    
    showSearchResults(results, query);
}

function showSearchResults(results, query) {
    const main = document.querySelector('.main-content');
    
    const searchSection = document.createElement('section');
    searchSection.className = 'search-results';
    searchSection.innerHTML = `
        <div class="container">
            <h2>Search Results for "${query}" (${results.length} found)</h2>
            <div class="products-grid" id="searchGrid"></div>
        </div>
    `;
    
    // Remove existing search results
    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }
    
    // Insert after hero banner
    const heroSection = document.querySelector('.hero-banner');
    heroSection.after(searchSection);
    
    // Populate results
    const searchGrid = document.getElementById('searchGrid');
    
    if (results.length === 0) {
        searchGrid.innerHTML = '<p class="text-center">No products found. Try different keywords.</p>';
    } else {
        results.forEach((product, index) => {
            const productCard = createProductCard(product);
            productCard.style.animationDelay = `${index * 0.1}s`;
            searchGrid.appendChild(productCard);
        });
    }
    
    // Scroll to results
    searchSection.scrollIntoView({ behavior: 'smooth' });
}

// Category Functions
function showCategory(category) {
    console.log('📂 Showing category:', category);
    
    const categoryProducts = categories[category] || [];
    const main = document.querySelector('.main-content');
    
    const categorySection = document.createElement('section');
    categorySection.className = 'category-results';
    categorySection.innerHTML = `
        <div class="container">
            <h2>${category.charAt(0).toUpperCase() + category.slice(1)} (${categoryProducts.length} products)</h2>
            <div class="products-grid" id="categoryGrid"></div>
        </div>
    `;
    
    // Remove existing category results
    const existingResults = document.querySelector('.category-results');
    if (existingResults) {
        existingResults.remove();
    }
    
    // Insert after hero banner
    const heroSection = document.querySelector('.hero-banner');
    heroSection.after(categorySection);
    
    // Populate results
    const categoryGrid = document.getElementById('categoryGrid');
    
    if (categoryProducts.length === 0) {
        categoryGrid.innerHTML = '<p class="text-center">No products found in this category.</p>';
    } else {
        categoryProducts.forEach((product, index) => {
            const productCard = createProductCard(product);
            productCard.style.animationDelay = `${index * 0.1}s`;
            categoryGrid.appendChild(productCard);
        });
    }
    
    // Scroll to results
    categorySection.scrollIntoView({ behavior: 'smooth' });
}

// Modal Functions
function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
    closeModal('registerModal');
}

function showRegister() {
    document.getElementById('registerModal').style.display = 'block';
    closeModal('loginModal');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const password = formData.get('password') || e.target.querySelector('input[type="password"]').value;
    
    console.log('🔐 Login attempt:', email);
    
    // Simulate login
    setTimeout(() => {
        alert(`Welcome back! Logged in as ${email}`);
        closeModal('loginModal');
        
        // Update user menu
        document.querySelector('.user-menu .dropdown span').textContent = email.split('@')[0];
    }, 500);
}

function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    
    console.log('📝 Registration:', name, email);
    
    // Simulate registration
    setTimeout(() => {
        alert(`Account created successfully! Welcome ${name}!`);
        closeModal('registerModal');
        
        // Update user menu
        document.querySelector('.user-menu .dropdown span').textContent = name;
    }, 500);
}

// Local Storage Functions
function saveCartToStorage() {
    localStorage.setItem('snapshop_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('snapshop_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Notification Functions
function showCartNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('✅ SnapShop JavaScript loaded successfully!');

// Add sample trending data refresh
setInterval(() => {
    // Simulate real-time updates
    const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 8);
    const trendingGrid = document.getElementById('trendingGrid');
    
    if (trendingGrid && Math.random() < 0.1) { // 10% chance every interval
        console.log('🔄 Refreshing trending products...');
        trendingGrid.innerHTML = '';
        randomProducts.forEach((product, index) => {
            const productCard = createProductCard(product);
            productCard.style.animationDelay = `${index * 0.1}s`;
            trendingGrid.appendChild(productCard);
        });
    }
}, 30000); // Every 30 seconds