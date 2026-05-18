# NOVA - Salla Twilight Theme

A futuristic premium ecommerce theme for Salla stores, built with Twilight Web Components, TailwindCSS, AlpineJS, and Twig templates.

## Features

- Dark luxury modern UI with glassmorphism
- Animated sticky header with mega menu
- Hero banner slider with autoplay
- Flash sales section with countdown timers
- Neon hover effects on category cards
- Glassmorphism product cards with quick actions
- Floating cart with dropdown
- Smart search overlay with keyboard navigation
- Testimonials, trust badges, and payment methods sections
- AI-style futuristic features section
- Mobile-first responsive design
- Full Arabic/English RTL/LTR support
- AlpineJS-powered interactive components

## Tech Stack

- **Twilight Web Components** - Salla's native component library
- **TailwindCSS v3** - Utility-first CSS framework
- **AlpineJS v3** - Lightweight JavaScript framework
- **Twig** - PHP templating engine
- **Webpack 5** - Asset bundling

## Getting Started

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview on demo store
salla theme preview
```

## Structure

```
├── twilight.json          # Theme configuration
├── tailwind.config.js     # Custom design tokens
├── webpack.config.js      # Build configuration
├── src/
│   ├── assets/
│   │   ├── js/            # AlpineJS modules
│   │   └── styles/        # TailwindCSS source
│   ├── locales/           # Translations (ar/en)
│   └── views/
│       ├── layouts/       # Master layout
│       ├── pages/         # Page templates
│       ├── components/    # Reusable components
│       └── partials/      # Micro-components
```

## License

MIT
