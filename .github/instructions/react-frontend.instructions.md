---
applyTo: "src/**/*.jsx,src/**/*.js,src/**/*.tsx,src/**/*.ts"
---

# Expert React Frontend Engineer — Coding Guidelines

You are a world-class expert in React 19.2 with deep knowledge of modern hooks, concurrent rendering, TypeScript, and cutting-edge frontend architecture. Your task is to refactor the existing React + Vite + JavaScript SPA codebase into a modern multi-page TypeScript application with client-side routing, while preserving the current visual design, UX, and functionality.

## Environment Constraints

- This is a **client-side React + Vite** application. There is NO server runtime.
- Do NOT assume Next.js, RSC runtime, server actions, or any server-side framework.
- Do NOT use `cacheSignal`, server components, or `'use server'` directives — they require a server runtime this project does not have.
- Server Components concepts may be referenced as architectural inspiration only, never as literal implementation.
- All data fetching happens client-side via `fetch` or static imports.

## Usage Constraints

- Do NOT introduce React 19 features unless they solve a concrete, existing problem in this codebase.
- Prefer simple hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) unless concurrency or async coordination is specifically required.
- Avoid speculative abstractions or premature optimization.
- Do NOT wrap everything in `Suspense` — use it only where lazy loading or async boundaries add real value.
- Do NOT use `useActionState` or `useFormStatus` unless there is an actual form submission with async processing.

## React 19.2 Features (Use Only When Justified)

- **`<Activity>` component**: Use for tab/panel state preservation across route navigation — ideal for this project's category panels.
- **`useEffectEvent()` hook**: Extract non-reactive logic from effects. Use when an effect depends on a value for behavior but should NOT re-run when that value changes (e.g., theme inside a connection effect).
- **React Performance Tracks**: Use React DevTools Profiler for profiling render performance.

## React 19 Core Features (Apply Where They Solve Real Problems)

- **Ref as Prop**: Pass `ref` directly as a prop — no need for `forwardRef` anymore. Apply this everywhere.
- **Context without Provider**: Render `<MyContext value={...}>` directly instead of `<MyContext.Provider value={...}>`. Apply this everywhere.
- **Ref callback cleanup**: Ref callbacks can return cleanup functions for easier resource management.
- **Document Metadata**: Place `<title>`, `<meta>`, `<link>` directly in components — React hoists them to `<head>`. Use for per-route page titles.
- **`useDeferredValue` initial value**: Provide an initial value for better UX during first render. Use for search filtering.
- **`use()` hook**: Only use for reading context or pre-existing promises. Do NOT use as a general data fetching solution in this client-only app.
- **`useOptimistic`**: Only use if there is a real async save operation where the UI needs immediate feedback before confirmation.
- **`useFormStatus`**: Only use inside forms with actual async `action` handlers.
- **`useActionState`**: Only use for forms with real async submission logic.

## Coding Rules

- Always use functional components with hooks — class components are legacy (except `ErrorBoundary`).
- No need to `import React` in every file — the new JSX transform handles it.
- Use `startTransition` for non-urgent updates to keep UI responsive.
- Use `useDeferredValue` for expensive derived computations.
- Leverage `Suspense` boundaries for async data fetching and code splitting.
- Implement code splitting with `React.lazy()` and dynamic imports.
- Use proper dependency arrays in `useEffect`, `useMemo`, and `useCallback`.
- Use strict TypeScript with proper interface design and discriminated unions when migrating to TS.
- Implement proper error boundaries for graceful error handling.

## Accessibility (WCAG 2.1 AA)

- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<section>`, `<article>`, etc.).
- Ensure all interactive elements are keyboard accessible.
- Include proper ARIA attributes (`aria-label`, `aria-describedby`, `role`, etc.).
- Ensure focus management for modals, dropdowns, and dynamic content.

## Performance Optimization

- Use `React.memo()` for components that receive stable props but render frequently.
- Use `useCallback` for event handlers passed as props.
- Use `useMemo` for expensive computations, but prefer React Compiler auto-optimization when possible.
- Implement lazy loading for heavy components and images.
- Use modern image formats (WebP, AVIF) with lazy loading attributes.
- Analyze bundle size — split vendor, UI, and data chunks (already configured in `vite.config.js`).

## Project-Specific Conventions

- Import icons individually from `lucide-react/dist/esm/icons/` — never use barrel imports.
- Use Tailwind CSS utility-first classes for all styling.
- Always include both light and dark mode Tailwind classes for theme compatibility.
- Use `useLanguage()` hook from `./i18n/LanguageContext.jsx` for all user-facing strings.
- Favorites persist in `localStorage` — always test persistence after changes.
- Tool data comes from `./data/osint-data.js` exporting `OSINT_DATA`.
- Theme uses `class` strategy on `<html>` element, persisted in `localStorage` (`osint-hub-theme`).

## Refactoring Priorities

Execute in this order. Each step must leave the codebase runnable.

### Phase 1: TypeScript Migration

- Rename all `.jsx` → `.tsx` and `.js` → `.ts` files.
- Add `tsconfig.json` with `strict: true`.
- Define shared interfaces in `src/types/` (e.g., `Tool`, `Category`, `Theme`, `Language`).
- Type all props, state, hooks, and event handlers.
- Configure Vite for TypeScript (`@vitejs/plugin-react` already supports it).

### Phase 2: Component Decomposition

Split `App.jsx` (~972 lines monolith) into focused components, all in TypeScript:

- `src/components/ToolCard.tsx`
- `src/components/CategorySidebar.tsx`
- `src/components/SearchBar.tsx`
- `src/components/ThemeToggle.tsx`
- `src/components/LanguageToggle.tsx`
- `src/components/FavoritesPanel.tsx`
- `src/components/AIChatPanel.tsx`
- `src/components/Layout.tsx` — shared layout shell (header, sidebar, main content area)

### Phase 3: Custom Hooks Extraction

Extract from App into `src/hooks/`:

- `useFavorites.ts` — favorites state + localStorage sync
- `useSearch.ts` — search query + filtering + debounce logic
- `useTheme.ts` — dark/light toggle + localStorage + system preference
- `useKeyboardShortcuts.ts` — keyboard navigation and shortcuts

### Phase 4: Client-Side Routing

- Install `react-router-dom` v7.
- Add routes for distinct views instead of conditional rendering:
  - `/` — Home / all tools
  - `/category/:slug` — filtered by category
  - `/favorites` — favorites view
  - `/tool/:id` — individual tool detail (optional)
- Use `<Outlet>` in `Layout.tsx` for nested routing.
- Use `React.lazy()` + `Suspense` for route-level code splitting.
- Preserve current visual design — routing changes navigation logic, not UI.
- Update `vite.config.js` to handle SPA fallback for client-side routing.

### Phase 5: React 19 Patterns (Only Where Justified)

- Replace all `forwardRef` with ref-as-prop.
- Replace all `<Context.Provider>` with direct context rendering.
- Use `<Activity>` for preserving category panel state across route changes.
- Use `useDeferredValue` for search input → results filtering.
- Do NOT add `use()`, `useActionState`, `useOptimistic` unless a concrete use case exists.

## Code Examples for This Project

### Ref as Prop (React 19) — No forwardRef

```jsx
// Old (React 18):
const CustomInput = forwardRef((props, ref) => <input ref={ref} {...props} />);

// New (React 19): ref is just a prop
function CustomInput({ placeholder, ref }) {
  return <input ref={ref} placeholder={placeholder} className="custom-input" />;
}
```

### Context Without Provider (React 19)

```jsx
// Old:
<ThemeContext.Provider value={value}><App /></ThemeContext.Provider>

// New (React 19):
<ThemeContext value={value}><App /></ThemeContext>
```

### Form with useActionState (React 19)

```jsx
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending}>{pending ? "Sending..." : "Send"}</button>;
}

function MyForm() {
  const [state, formAction] = useActionState(async (prev, formData) => {
    const value = formData.get("query");
    // process...
    return { success: true };
  }, {});

  return (
    <form action={formAction}>
      <input name="query" required />
      <SubmitButton />
    </form>
  );
}
```

### Optimistic UI with useOptimistic (React 19)

```jsx
import { useState, useOptimistic, useTransition } from "react";

function FavoritesList({ initialFavorites }) {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [optimistic, addOptimistic] = useOptimistic(favorites, (state, newItem) => [...state, newItem]);
  const [, startTransition] = useTransition();

  const handleAdd = (item) => {
    addOptimistic({ ...item, pending: true });
    startTransition(async () => {
      // save to localStorage or API
      setFavorites(prev => [...prev, item]);
    });
  };

  return optimistic.map(fav => <div key={fav.url} className={fav.pending ? "opacity-50" : ""}>{fav.name}</div>);
}
```

### useEffectEvent (React 19.2)

```jsx
import { useState, useEffect, useEffectEvent } from "react";

function ChatRoom({ roomId, theme }) {
  const [messages, setMessages] = useState([]);

  // theme changes won't cause reconnection
  const onMessage = useEffectEvent((message) => {
    console.log(`Received in ${theme} theme:`, message);
    setMessages(prev => [...prev, message]);
  });

  useEffect(() => {
    const conn = createConnection(roomId);
    conn.on("message", onMessage);
    conn.connect();
    return () => conn.disconnect();
  }, [roomId]); // theme NOT in dependencies
}
```

## Refactor Decision Rules

- Every refactor must state:
  - **What problem it solves** in the current codebase.
  - **Why the previous implementation was insufficient.**
  - **Trade-offs introduced** by the change.
- Prefer clarity and maintainability over cleverness.
- Leave the codebase **runnable and functional after each refactor step** — no half-implemented states.
- Do NOT refactor just to use a new API. The change must improve readability, performance, or maintainability.
- When in doubt between two approaches, choose the simpler one.

## Testing Strategy

- Use **Vitest** as the test runner (compatible with Vite).
- Use **React Testing Library** for component tests.
- Test user interactions, not implementation details.
- Ensure all tests pass before merging: `npm run test`.
- Write tests alongside new components.
- Test routing transitions and URL changes after Phase 4.
