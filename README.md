# Al-amer Mall Website

A modern, bilingual (English/Arabic) shopping mall website built with React, TypeScript, and Vite. Features include responsive design, internationalization, lazy loading, and optimized performance.

## 🌟 Features

- **Bilingual Support** - Full English & Arabic translations with RTL support
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Performance Optimized** - Code splitting, lazy loading, and image optimization
- **SEO Ready** - Meta tags, Open Graph, and Twitter Cards
- **Modern Stack** - React 19, TypeScript, Vite, React Router
- **Accessible** - WCAG compliant components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # TypeScript type checking
```

## 🏗️ Project Structure

```
├── public/              # Static assets
│   ├── images/         # Image assets
│   └── fonts/          # Font files
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── locales/        # Translation files (en/ar)
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   ├── hooks/          # Custom React hooks
│   └── router/         # Route configuration
├── docs/               # Documentation
└── scripts/            # Build scripts
```

## 🌍 Internationalization

The site supports English and Arabic with automatic RTL layout switching.

- Translation files: `src/locales/{en,ar}/`
- Documentation: `docs/TRANSLATION_GUIDE.md`
- Keys reference: `docs/TRANSLATION_KEYS.md`

## 🎨 Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **i18n**: i18next
- **Forms**: React Hook Form + Yup
- **Icons**: Lucide React

## 📄 Documentation

- [Production Launch Checklist](PRODUCTION_LAUNCH_CHECKLIST.md)
- [Translation Guide](docs/TRANSLATION_GUIDE.md)
- [Image Optimization Guide](docs/IMAGE_OPTIMIZATION_GUIDE.md)
- [Migration Plan](docs/MIGRATION_PLAN.md)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## Project Documentation

- See `docs/README.md` for product/user documentation, including user stories and the Draw.io low‑fidelity design.
