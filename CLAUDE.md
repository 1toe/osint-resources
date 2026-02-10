# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VeriSource is a React SPA for discovering and organizing Open Source Intelligence (VeriSource) tools. It provides a searchable catalog of 50+ tools across 8 categories, with favorites, search history, dark/light theming, bilingual support (Spanish/English), and optional Gemini AI integration.

## Commands

```bash
npm run dev       # Start dev server on http://localhost:3000
npm run build     # Production build to /dist
npm run preview   # Preview production build
npm run lint      # ESLint (zero warnings allowed)
```

No test framework is configured.

## Architecture

**Stack:** React 18 + Vite + Tailwind CSS 3 + Lucide React icons

**Entry flow:** `index.html` -> `src/main.jsx` (theme init + mount) -> `LanguageProvider` -> `App.jsx`

**Key structural decisions:**

- `src/App.jsx` is the monolithic main component (~1200 lines) containing all UI logic, state, and the `VeriSource_DATA` tools database. All views (search/browse, favorites, history, AI assistant) live here.
- `src/components/SearchHistory.jsx` and `src/components/ExportTools.jsx` are the only extracted components.
- `src/i18n/LanguageContext.jsx` provides React Context for language state with browser detection and localStorage persistence.
- `src/i18n/translations.js` holds all translation strings keyed by dot-notation (e.g., `tools.google_desc`). Spanish is primary, English is fallback.

**State management:** All state is local `useState` hooks in App.jsx. No external state library. User preferences persist to localStorage under `VeriSource-hub-*` keys.

**Theming:** Class-based dark mode (`darkMode: 'class'` in Tailwind config). A `theme` object computed in App.jsx maps semantic names (bg, card, textMain, etc.) to Tailwind classes based on `isDarkMode`.

**Tool data model:** Each tool has `{ name, url, descKey, tags[] }` nested under categories with `{ category, icon, color, items[] }` in the `VeriSource_DATA` array.

**Tailwind customizations** (in `tailwind.config.js`): Custom colors `VeriSource-500` (cyan) and `cyber-500` (green), custom fonts (Inter, Fira Code, Cal Sans), custom animations (fade-in, slide-up, pulse-glow, float). Custom utility classes like `.glass`, `.gradient-text`, `.card-hover` are defined in `src/index.css`.

**AI integration:** Optional Gemini API calls in App.jsx (`callGemini` function) with retry logic. API key must be provided by the user; it is not committed.

**Build config** (`vite.config.js`): Path alias `@` -> `./src`. Manual chunks split `react`/`react-dom` and `lucide-react` into separate vendor bundles. Source maps disabled in production.

## Internationalization

Adding a new UI string requires entries in both `es` and `en` objects in `src/i18n/translations.js`. The `t()` function from `LanguageContext` resolves dot-notation keys with English fallback.

## Keyboard Shortcuts

Defined in a `useEffect` in App.jsx: `Ctrl+K` (search focus), `Ctrl+Shift+F` (favorites), `Ctrl+Shift+H` (history), `Ctrl+Shift+D` (toggle theme).
