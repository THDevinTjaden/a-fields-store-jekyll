# A-Fields Store - Jekyll E-commerce Site

A modern, responsive e-commerce website built with Jekyll for GitHub Pages hosting. This project showcases a premium online store with a clean, professional design and full e-commerce functionality.

## 🚀 Features

- **Modern Design**: Clean, professional UI with mobile-first responsive design
- **Product Catalog**: Complete product management with categories, pricing, and variants
- **Shopping Cart**: Full cart functionality with localStorage persistence
- **Product Pages**: Detailed product pages with galleries, reviews, and specifications
- **Search & Filter**: Advanced product filtering and search capabilities
- **Newsletter**: Email subscription functionality
- **Contact Forms**: Customer support and inquiry forms
- **SEO Optimized**: Built-in SEO features and meta tags
- **GitHub Pages Ready**: Fully compatible with GitHub Pages hosting

## 🛠️ Technology Stack

- **Jekyll**: Static site generator
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS for interactivity
- **GitHub Pages**: Hosting platform

## 📁 Project Structure

```
a-fields-store-jekyll/
├── _config.yml              # Jekyll configuration
├── _layouts/                # Layout templates
│   ├── default.html         # Main layout
│   └── product.html         # Product page layout
├── _includes/               # Reusable components
│   ├── header.html          # Site header
│   ├── footer.html          # Site footer
│   ├── product-card.html    # Product card component
│   └── cart-modal.html      # Shopping cart modal
├── _products/               # Product pages
│   ├── smart-watch.md       # Sample product
│   └── wireless-headphones.md
├── assets/                  # Static assets
│   ├── css/
│   │   └── main.css         # Main stylesheet
│   ├── js/
│   │   ├── main.js          # Main JavaScript
│   │   └── cart.js          # Cart functionality
│   └── images/              # Product images
├── index.html               # Homepage
├── products.html            # Products listing page
├── about.html               # About page
├── contact.html             # Contact page
└── 404.html                 # Error page
```

## 🚀 Getting Started

### Prerequisites

- Ruby (2.4 or higher)
- Jekyll (4.0 or higher)
- Bundler

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/a-fields-store-jekyll.git
   cd a-fields-store-jekyll
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Configure the site**
   - Update `_config.yml` with your site information
   - Replace placeholder images with your product images
   - Update social media links and contact information

4. **Run locally**
   ```bash
   bundle exec jekyll serve
   ```
   
   The site will be available at `http://localhost:4000`

### Configuration

#### Site Settings (`_config.yml`)

```yaml
# Update these values for your store
title: "A-Fields Store"
description: "Premium products for modern living"
email: "hello@a-fields-store.com"
url: "https://yourusername.github.io"
baseurl: "/a-fields-store-jekyll"

# Store settings
store:
  currency: "$"
  shipping: 5.99
  free_shipping_threshold: 50
```

#### Adding Products

1. Create a new markdown file in the `_products/` directory
2. Use the following front matter structure:

```yaml
---
layout: product
title: "Product Name"
sku: "PRODUCT001"
price: 99.99
original_price: 129.99  # Optional
image: "/assets/images/products/product.jpg"
description: "Product description"
category: "technology"
featured: true
in_stock: true
rating: 4.8
reviews_count: 25
---
```

## 🎨 Customization

### Colors and Styling

The site uses CSS custom properties for easy customization. Update the variables in `assets/css/main.css`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --accent-color: #f59e0b;
  /* ... more variables */
}
```

### Adding New Categories

1. Update the navigation in `_includes/header.html`
2. Add category pages in the root directory
3. Update product front matter with the new category

### Custom Components

Create new components in the `_includes/` directory and include them in your layouts:

```liquid
{% include your-component.html %}
```

## 📱 Mobile-First Design

The site is built with a mobile-first approach:

- Responsive grid layouts using CSS Grid
- Flexible typography using rem units
- Touch-friendly buttons and interactions
- Optimized for all screen sizes

## 🛒 E-commerce Features

### Shopping Cart

- Persistent cart using localStorage
- Add/remove items
- Quantity controls
- Price calculations
- Checkout simulation

### Product Management

- Product collections
- Categories and filtering
- Search functionality
- Product variants
- Reviews and ratings

## 🔧 Development

### Adding New Features

1. **JavaScript**: Add functionality in `assets/js/main.js` or create new modules
2. **Styling**: Add styles in `assets/css/main.css` or create component-specific stylesheets
3. **Layouts**: Create new layouts in `_layouts/` directory

### Best Practices

- Use semantic HTML elements
- Follow mobile-first responsive design
- Optimize images for web
- Maintain consistent naming conventions
- Test across different browsers and devices

## 🚀 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. Select the main branch as source
4. Your site will be available at `https://yourusername.github.io/a-fields-store-jekyll`

### Custom Domain

1. Add your custom domain in GitHub Pages settings
2. Update `_config.yml` with your domain
3. Add a CNAME file to your repository

## 📊 Performance

The site is optimized for performance:

- Minified CSS and JavaScript
- Optimized images
- Lazy loading for images
- Efficient caching strategies
- Fast loading times

## 🔒 Security

- No server-side code (static site)
- Secure form handling
- HTTPS enforced on GitHub Pages
- No sensitive data stored in code

## 📈 SEO

Built-in SEO features:

- Meta tags and Open Graph
- Structured data markup
- Sitemap generation
- Robots.txt configuration
- Clean URLs and navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Contact us through the website contact form
- Email: hello@a-fields-store.com

## 🎯 Roadmap

- [ ] Payment gateway integration
- [ ] User accounts and profiles
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Product recommendations
- [ ] Multi-language support
- [ ] Analytics integration

---

**Built with ❤️ for modern e-commerce**