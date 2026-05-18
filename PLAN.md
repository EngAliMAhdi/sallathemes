# NOVA Epic Gaming Theme - Architecture & Implementation Plan

## 1. Reference Analysis: senocard.com
(Unable to fetch due to size limits) Based on URL and domain context: dark gaming/gift card store with:
- Dark gradient backgrounds (deep purple/navy)
- Neon/vibrant accent colors for CTAs
- Glassmorphism cards for products
- Bold typography
- Sticky navigation
- Animated hero sections
- Category grids with hover effects
- Countdown timers for offers
- Trust badges
- Modern, premium feel

## 2. Current Codebase Analysis

### Architecture (112 files)
```
D:\salla\
├── twilight.json         → 1156 lines, 26 features, 14 settings, ~15 components
├── tailwind.config.js    → Dark mode: class, Twilight plugin + forms + line-clamp
├── package.json          → theme-raed v1.0.3, webpack 5
├── webpack.config.js     → 25 JS entries (product-card, main-menu, etc.)
├── src/
│   ├── assets/styles/    → 20+ SCSS files (organized in 01-settings through 05-utilities)
│   │   ├── app.scss      → Master import file (98 lines)
│   │   └── components/_nova.scss → Current dark theme overrides (85 lines)
│   ├── assets/js/        → 15+ JS modules (product-card.js, main-menu.js, etc.)
│   ├── locales/          → ar.json, en.json (Salla default translations)
│   └── views/
│       ├── layouts/      → master.twig + customer.twig
│       ├── pages/        → 16 pages (home, product, cart, blog, brands, customer/*, etc.)
│       ├── components/
│       │   ├── header/   → header.twig (uses salla-menu, salla-search, salla-localization-modal, etc.)
│       │   ├── footer/   → footer.twig + footer sub-components (4 files)
│       │   └── home/     → 24 home component Twigs (including 5 nova-* custom ones)
│       └── partials/     → Shared partials (product options, review, blog card, etc.)
└── public/               → Built output (app.css, app.js, etc.)
```

### Rendered Components (via `{% component home %}`)
| Feature/Component | Twig File | Description |
|---|---|---|
| component-enhanced-slider | enhanced-slider.twig | Hero slider with Swiper |
| component-main-links | main-links.twig | Category circles |
| component-featured-products | featured-products-style1/2/3.twig | Tabbed product grids |
| component-fixed-banner | fixed-banner.twig | Full-width promotional banner |
| component-fixed-products | fixed-products.twig | Fixed grid with banner |
| component-products-slider | products-slider.twig | Horizontal product slider |
| component-photos-slider | photos-slider.twig | Image gallery slider |
| component-parallax-background | parallax-background.twig | Parallax CTA section |
| component-testimonials | testimonials.twig | Customer reviews swiper |
| component-square-photos | square-photos.twig | Grid of square images |
| component-store-features | store-features.twig | 3-column features |
| component-youtube | youtube.twig | Video embed |
| component-latest-products | latest-products.twig | Latest products |
| nova-hero (custom) | nova-hero.twig | Epic hero slider |
| nova-categories (custom) | nova-categories.twig | Gaming platform cards |
| nova-flash (custom) | nova-flash.twig | Flash deals + countdown |
| nova-giftcards (custom) | nova-giftcards.twig | Gift card platforms |
| nova-latest (custom) | nova-latest.twig | Latest products epic |
| custom-testimonials | custom-testimonials.twig | Advanced testimonials |
| brands | brands.twig | Brand logos |
| slider-products-with-header | slider-products-with-header.twig | Products + header combo |
| enhanced-square-banners | enhanced-square-banners.twig | Square promo banners |

### Design System & Colors

**Current Colors (from tailwind.config.js + global.scss + _nova.scss):**
- Primary (CSS var): `var(--color-primary)` from Salla portal → currently `#414042` (dark gray)
- Dark: `#1D1F1F`, Darker: `#0E0F0F`
- Nova override body: `#0a0014` (deep purple-black)
- Nova accents: Purple `#a855f7`, Cyan `#06b6d4`, Fuchsia `#ec4899`

**CSS Variables set in master.twig:**
```css
:root {
  --font-main: 'DINNextLTArabic';
  --color-primary: {{ theme.color.primary }};       /* merchant chosen */
  --color-primary-dark: {{ theme.color.darker(0.15) }};
  --color-primary-light: {{ theme.color.lighter(0.15) }};
  --color-primary-reverse: {{ theme.color.reverse_text }};
}
```

## 3. Complete Design Plan

### Color Palette (Gaming/Modern)

| Token | Hex | Usage |
|-------|-----|-------|
| **bg-primary** | `#06001a` | Body background (deep midnight purple) |
| **bg-secondary** | `#0d0028` | Card backgrounds, sections |
| **bg-tertiary** | `#150033` | Elevated surfaces |
| **accent-purple** | `#9333ea` | Primary CTA, active states |
| **accent-cyan** | `#06b6d4` | Secondary accent, info elements |
| **accent-pink** | `#ec4899` | Sale badges, urgency elements |
| **accent-green** | `#10b981` | Success, in-stock |
| **accent-yellow** | `#f59e0b` | Ratings, highlights |
| **text-primary** | `#ffffff` | Headings, important text |
| **text-secondary** | `rgba(255,255,255,0.6)` | Body text |
| **text-muted** | `rgba(255,255,255,0.3)` | Subdued text |
| **border-default** | `rgba(255,255,255,0.06)` | Default borders |
| **border-hover** | `rgba(147,51,234,0.2)` | Purple hover borders |
| **glass-bg** | `rgba(255,255,255,0.02)` | Glass card backgrounds |
| **glass-border** | `rgba(255,255,255,0.04)` | Glass card borders |
| **glass-blur** | `12px` | Backdrop blur amount |

### Typography
- Headings: Bold, Space Grotesk style (via CSS)
- Body: var(--font-main) from Salla portal
- Prices: Bold, mono or display font
- Countdown: Mono font (JetBrains Mono)

### Spacing & Layout
- Container max-width: 1280px (already configured)
- Section padding: py-16 (64px) base, py-24 for hero
- Gap: 1rem (mobile), 1.5rem+ (desktop)
- Border radius: 0.75rem default, 1rem cards

### Animations & Effects
1. **Fade Up on Scroll** - Elements animate in as they enter viewport
2. **Card Hover Lift** - Cards lift 4px on hover with enhanced shadow
3. **Neon Glow** - Purple glow on interactive elements
4. **Shimmer** - Loading states with gradient shimmer
5. **Pulse** - CTA buttons pulse animation
6. **Gradient Border** - Animated gradient border on hero buttons
7. **Countdown Flip** - Smooth countdown digit changes

## 4. Page-by-Page Design

### Home Page (index.twig)
Order of sections rendered by `{% component home %}`:
1. **Hero** (nova-hero) - Full viewport slider with gradient overlays, badge, title, CTA
2. **Category Grid** (nova-categories) - 6-card grid with gaming platform icons + neon hover
3. **Flash Deals** (nova-flash) - Countdown timer row + product cards
4. **Main Categories** (main-links) - Category circle navigation
5. **Featured Products** (featured-products-style1) - Tabbed grid: All/Best Selling/Newest
6. **Gift Cards** (nova-giftcards) - 4-card row (PS, Xbox, Steam, Google Play)
7. **Fixed Banner** (fixed-banner) - Promotional full-width image
8. **Latest Products** (nova-latest) - Grid + "View All" link
9. **Products Slider** (products-slider) - Horizontal product slider
10. **Store Features** (store-features) - 3-column trust features
11. **Testimonials** (testimonials) - Customer reviews carousel
12. **Brands** (brands) - Brand logos grid

### Product Listing Page (product/index.twig)
- Breadcrumb navigation
- Category title + description
- Sidebar filters (salla-filters)
- Product grid 2/3/4 columns
- Sort dropdown
- Infinite scroll or pagination

### Product Single Page (product/single.twig)
- Product image gallery with zoom
- Thumbnail navigation
- Brand logo + name
- Product title + subtitle
- Price display (sale/regular)
- Rating stars + review count
- Product options (colors, sizes, etc.)
- Quantity selector
- Add to cart button (full width)
- Sticky add-to-cart bar (mobile)
- Description tabs
- Metadata table
- Reviews section
- Related products slider

### Cart Page (cart.twig)
- Cart items list with image, name, quantity, price
- Update/remove item buttons
- Coupon code input
- Order summary sidebar
- Subtotal, shipping, discount, total
- Proceed to checkout button
- Payment methods display
- Empty cart state

### Checkout Page
- Shipping address form
- Payment method selection
- Order review
- Terms acceptance
- Place order button

### Blog Pages (blog/index.twig, blog/single.twig)
- Blog listing grid with cards
- Blog single with full article
- Comments section

### Customer Pages (customer/*.twig)
- Profile management
- Orders history + details
- Wishlist
- Notifications
- Loyalty points

## 5. SCSS File Plan (What to modify)

### Files to OVERWRITE (complete rewrite):
| File | Changes |
|------|---------|
| `_nova.scss` → `_nova-theme.scss` | Central dark theme file with ALL overrides |
| `home-blocks.scss` | Dark backgrounds, glass cards, neon effects for ALL home components |
| `header.scss` | Dark header (already done) - enhance search bar, menu colors |
| `footer.scss` | Dark footer (already done) - enhance links, borders |
| `menus.scss` | Dark mega menu dropdowns |
| `product.scss` | Dark product card overrides, image gallery, sticky bar |
| `slider.scss` | Custom navigation arrows, dots, gradient overlays for dark theme |
| `user-pages.scss` | Dark sidebar, tables, forms for customer area |
| `form.scss` | Dark inputs, selects, checkboxes |

### Files to ENHANCE (targeted edits):
| File | Changes |
|------|---------|
| `common.scss` | Already dark body bg - add selection, scrollbar |
| `buttons.scss` | Already done - verify consistency |
| `no-content-placeholder.scss` | Dark placeholder states |
| `filters.scss` | Dark filter panel |
| `brands.scss` | Dark brand cards |
| `gifting.scss` | Dark gifting interface |
| `loyalty.scss` | Dark loyalty cards |

## 6. Custom Product Card Design

The `custom-salla-product-card` in `product-card.js` need these CSS enhancements:
- Glassmorphism background: `rgba(255,255,255,0.02)`
- Subtle border: `1px solid rgba(255,255,255,0.04)`
- Rounded corners: 1rem
- Hover: lift with purple border glow
- Image: scale 1.05 on hover
- Price: purple color for regular, red for sale
- Badge: neon styles for sale/new/hot
- Quick wishlist heart: positioned top-right
- Add to cart button: gradient purple CTA

## 7. Color Consistency Strategy

All pages share colors via:
1. **CSS Variables** (set in master.twig head):
```css
:root {
  --color-primary: #9333ea;
  --color-primary-dark: #7e22ce;
  --color-primary-light: #a855f7;
  --color-primary-reverse: #ffffff;
  --color-bg: #06001a;
  --color-bg-secondary: #0d0028;
  --color-text: #ffffff;
  --color-text-secondary: rgba(255,255,255,0.6);
  --color-border: rgba(255,255,255,0.06);
}
```

2. **SCSS Variables** (in _nova-theme.scss):
```scss
$bg-dark: #06001a;
$bg-card: rgba(255,255,255,0.02);
$accent: #9333ea;
$accent-cyan: #06b6d4;
$accent-pink: #ec4899;
$text-primary: #ffffff;
$text-secondary: rgba(255,255,255,0.6);
$border-subtle: rgba(255,255,255,0.06);
```

3. **Tailwind `@apply` directives** in component SCSS files for consistent utility classes.

## 8. File Changes Needed

| # | File | Action | Priority |
|---|------|--------|----------|
| 1 | `src/assets/styles/components/_nova.scss` | Rewrite → `_nova-theme.scss` with all dark tokens | HIGH |
| 2 | `src/assets/styles/04-components/home-blocks.scss` | Full rewrite with dark styling for ALL 24 blocks | HIGH |
| 3 | `src/assets/styles/04-components/header.scss` | Enhance (already partially dark) | HIGH |
| 4 | `src/assets/styles/04-components/menus.scss` | Dark menu dropdowns + mobile menu | HIGH |
| 5 | `src/assets/styles/04-components/product.scss` | Dark cards, single page, gallery, sticky bar | HIGH |
| 6 | `src/assets/styles/04-components/slider.scss` | Custom nav arrows + dots for dark theme | HIGH |
| 7 | `src/assets/styles/04-components/user-pages.scss` | Dark customer dashboard | MED |
| 8 | `src/assets/styles/03-elements/form.scss` | Dark inputs + selects | MED |
| 9 | `src/assets/styles/02-generic/common.scss` | Verify scrollbar + selection (done) | LOW |
| 10 | `src/assets/styles/03-elements/buttons.scss` | Verify (done) | LOW |
| 11 | `src/assets/styles/01-settings/global.scss` | Update CSS variables | LOW |
| 12 | `src/assets/styles/app.scss` | Update _nova import path | LOW |
| 13 | `twilight.json` | Add description, verify features | LOW |
| 14 | None | Rebuild + verify | FINAL |
