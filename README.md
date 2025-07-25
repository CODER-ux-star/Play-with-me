# SnapShop - Complete E-commerce Website

A fully functional e-commerce website inspired by Snapdeal, built with modern web technologies. Features responsive design, shopping cart, user authentication, and complete online shopping experience.

## 🛒 Website Features

### 🏠 Homepage
- **Responsive Header**: Logo, search bar, cart icon, user menu
- **Navigation Menu**: Category-wise product browsing
- **Hero Banners**: Auto-sliding promotional banners
- **Product Sections**: Today's deals, trending products, featured brands
- **Footer**: Complete site map with useful links

### 🛍️ Shopping Experience
- **Product Catalog**: 16+ products across 6+ categories
- **Search Functionality**: Real-time product search
- **Category Filtering**: Browse by categories (Mobiles, Electronics, Fashion, etc.)
- **Product Cards**: Images, prices, ratings, reviews, discounts
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout Process**: Complete order placement simulation

### 👤 User Features
- **User Registration**: Create new account
- **User Login**: Secure login simulation
- **Profile Management**: User menu with account options
- **Order History**: Track user purchases (simulation)
- **Wishlist**: Save favorite products

### 📱 Mobile Responsive
- **Mobile-First Design**: Optimized for all screen sizes
- **Touch-Friendly**: Easy navigation on mobile devices
- **Responsive Grid**: Adaptive layout for different devices
- **Mobile Cart**: Slide-out cart sidebar

## 🚀 How to Run

### Option 1: Direct Browser Access
1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. Start shopping!

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -SimpleHTTPServer 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎯 How to Use

### 🔍 Search Products
1. **Search Bar**: Type product name, brand, or category
2. **Real-time Results**: Get instant search suggestions
3. **Category Navigation**: Click on category menus
4. **Filter Results**: Browse by specific categories

### 🛒 Shopping Cart
1. **Add to Cart**: Click "Add to Cart" on any product
2. **View Cart**: Click cart icon in header
3. **Manage Items**: Increase/decrease quantities or remove items
4. **Checkout**: Click "Proceed to Checkout" to place order

### 👤 User Account
1. **Sign Up**: Click "Sign In" → "Register" for new account
2. **Login**: Use email/mobile and password
3. **Profile**: Access account settings and order history

## 📦 Product Categories

### 📱 **Mobiles & Electronics**
- Samsung Galaxy S24 Ultra - ₹89,999
- iPhone 15 Pro Max - ₹1,34,900
- OnePlus 12R - ₹39,999
- MacBook Air M3 - ₹1,14,900
- Sony WH-1000XM5 Headphones - ₹24,990
- iPad Pro 12.9" - ₹99,900

### 👕 **Fashion**
- Adidas Ultraboost 22 - ₹8,999
- Nike Air Jordan 1 - ₹12,999
- Levi's 511 Slim Jeans - ₹2,999

### 🏠 **Home & Kitchen**
- Philips Air Fryer - ₹8,999
- Dyson V15 Detect Vacuum - ₹59,900
- Instant Pot Duo 7-in-1 - ₹7,999

### 📚 **Books & Media**
- Atomic Habits - ₹399
- The Psychology of Money - ₹299

### ⚽ **Sports & Fitness**
- Yonex Badminton Racket - ₹3,999
- Adidas Football - ₹1,999

## 🏗️ Technical Details

### Built With
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: ES6+ features, no external dependencies
- **Font Awesome**: Icons for enhanced UI
- **Responsive Design**: Mobile-first approach

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ✨ Key Features

### 🛒 **E-commerce Functionality**
- Real-time cart updates
- Local storage for cart persistence
- Product search and filtering
- Category-based browsing
- Price and rating display
- Discount calculations

### 🎨 **UI/UX Design**
- Snapdeal-inspired color scheme (Red & White)
- Hover effects and animations
- Loading animations for products
- Notification system for cart actions
- Modal dialogs for login/register

### 📊 **Business Features**
- Deal countdown timers
- Promotional banners
- Featured brands showcase
- Customer reviews and ratings
- Multiple payment method icons
- Complete footer with site links

## 🔧 Customization

### Adding New Products
```javascript
// Add to sampleProducts array in script.js
{
    id: 17,
    title: "Your Product Name",
    category: "category_name",
    price: 9999,
    originalPrice: 12999,
    discount: 23,
    rating: 4.5,
    reviews: 234,
    image: "🎯",
    description: "Product description"
}
```

### Adding New Categories
1. Update categories object in `script.js`
2. Add navigation menu item in `index.html`
3. Style the new category in `styles.css`

### Customizing Design
- **Colors**: Update CSS variables in `styles.css`
- **Fonts**: Change font-family in CSS
- **Layout**: Modify grid and flexbox properties
- **Animations**: Update CSS keyframes

## 📱 Mobile Optimization

### Responsive Features
- **Flexible Grid**: Adapts to screen size
- **Touch Navigation**: Mobile-friendly menus
- **Optimized Images**: Scalable product images
- **Readable Text**: Appropriate font sizes
- **Easy Cart Access**: Mobile cart sidebar

### Performance
- **Lightweight**: No heavy frameworks
- **Fast Loading**: Optimized assets
- **Smooth Animations**: CSS transitions
- **Local Storage**: Client-side cart persistence

## 🚀 Future Enhancements

### Phase 1
- Real backend integration
- Payment gateway integration
- User authentication with database
- Order management system
- Admin panel for product management

### Phase 2
- Product reviews and ratings system
- Wishlist functionality
- Price comparison
- Inventory management
- Email notifications

### Phase 3
- Mobile app version
- Push notifications
- Social media integration
- Advanced search filters
- Recommendation engine

## 🐛 Known Limitations

- **Backend**: Currently frontend-only (no real database)
- **Payments**: Simulated checkout process
- **Authentication**: Local simulation only
- **Inventory**: No real stock management
- **Orders**: No real order processing

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Happy Shopping! 🛒 Experience the power of modern e-commerce!** ✨

## 📞 Support

For any questions or issues, please create an issue in this repository.

**Live Demo**: Open `index.html` in your browser or run local server
**Repository**: https://github.com/CODER-ux-star/Play-with-me