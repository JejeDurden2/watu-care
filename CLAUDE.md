# Claude.md

## Project Overview

Single-page application / landing page built with Next.js, TypeScript, and Tailwind CSS. Optimized for Vercel deployment with focus on performance, SEO, and user experience.

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui (optional)
- **State Management**: TanStack Query for server state, Zustand for client state
- **Testing**: Vitest + Testing Library
- **Deployment**: Vercel
- **Icons**: Lucide React

---

## Project Structure

```
/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/             # Reusable components (create as needed)
│   ├── lib/                    # Utilities, helpers (create as needed)
│   └── types/                  # TypeScript types (create as needed)
├── public/                     # Static assets
│   └── robots.txt
├── .claude/
│   └── skills/                 # Claude Code skills
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Environment Variables

Copy `.env.local.example` to `.env.local`:

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Your App Name"

# Add more as needed
```

---

## Commands Reference

```bash
# Development
npm run dev                 # Start dev server (port 3000)
pnpm dev                    # Or with pnpm

# Build
npm run build               # Production build
pnpm build

# Quality
npm run lint                # Lint code
npm run type-check          # TypeScript check
npm run format              # Format with Prettier
npm run format:check        # Check formatting

# Testing
npm run test                # Run tests
npm run test:watch          # Watch mode
npm run test:coverage       # With coverage
```

---

## Rules for Claude

### ALWAYS

1. Create reusable, typed components — no one-off implementations
2. Implement responsive
3. Add proper TypeScript types with explicit return types
4. Consider SEO impact (metadata, structure, performance, Core Web Vitals)
5. Use conventional commits with proper scope
6. Write tests for complex logic
7. **Self-review code before committing** (see code-quality skill)
8. Optimize images (use Next.js Image component)
9. Implement proper loading states and error boundaries
10. Use semantic HTML for accessibility

### NEVER

11. Use `any` type — use `unknown` + type guards
12. Skip validation (use Zod for forms and API data)
13. Hardcode values — use environment variables or constants
14. Commit without running lint and type-check
15. Skip alt text on images
16. Use generic error messages
17. Ignore accessibility (a11y)
18. Use inline styles (use Tailwind classes)

### PREFER

19. Composition over inheritance
20. Small, focused components (< 100 lines)
21. Named exports over default exports
22. Server Components over Client Components (use 'use client' only when needed)
23. Early returns over nested conditions
24. Explicit over implicit
25. Colocation of related files

---

## Customization Guide

When starting a new project:

### 1. Update Metadata

**`src/app/layout.tsx`**:
```tsx
export const metadata: Metadata = {
  title: 'Your App Name',
  description: 'Your app description',
  keywords: ['your', 'keywords'],
  openGraph: {
    title: 'Your App Name',
    description: 'Your app description',
    url: 'https://yourapp.com',
    images: [{ url: '/og-image.png' }],
  },
};
```

### 2. Customize Colors

**`tailwind.config.ts`**:
```ts
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
},
```

### 3. Add Your Logo

- Replace placeholder logo in `public/`
- Update favicon: `public/favicon.ico`
- Add OG image: `public/og-image.png` (1200x630px)

### 4. Update Robots.txt

**`public/robots.txt`**:
```
Sitemap: https://yourapp.com/sitemap.xml
```

### 5. Configure Environment

Copy `.env.local.example` to `.env.local` and update values.

---

## Skills (Detailed Documentation)

Extended documentation in `.claude/skills/`:

### Project Skills

- **[frontend-architecture.md](.claude/skills/frontend-architecture.md)** - React component patterns, TanStack Query
- **[seo.md](.claude/skills/seo.md)** - Metadata, sitemap, JSON-LD, Core Web Vitals
- **[testing.md](.claude/skills/testing.md)** - Vitest, test patterns
- **[code-quality.md](.claude/skills/code-quality.md)** - Pre-commit checklist, ESLint, Prettier
- **[design-system.md](.claude/skills/design-system.md)** - Colors, typography, glassmorphism patterns

### Vercel Skills (External)

- **[react-best-practices](.claude/skills/react-best-practices/)** - 45 React/Next.js performance rules across 8 categories
- **[web-design-guidelines](.claude/skills/web-design-guidelines/)** - UI compliance checker
- **[vercel-deploy-claimable](.claude/skills/claude.ai/vercel-deploy-claimable/)** - Deploy to Vercel

---

## SEO Best Practices

1. **Metadata**: Comprehensive in every page
2. **Open Graph**: Social media previews
3. **Sitemap**: Auto-generate with Next.js
4. **Robots.txt**: Configure crawling
5. **Structured Data**: JSON-LD for rich snippets
6. **Performance**: Optimize Core Web Vitals
7. **Responsive**: Responsive design
8. **Semantic HTML**: Use proper tags
9. **Alt Text**: All images
10. **Internal Links**: Proper navigation

---

## Performance Optimization

1. **Images**: Use Next.js `<Image>` with optimization
2. **Fonts**: Use `next/font` for optimal loading
3. **Code Splitting**: Dynamic imports for heavy components
4. **Lazy Loading**: Below-the-fold content
5. **Caching**: Leverage Vercel's edge caching
6. **Bundle Size**: Monitor and minimize
7. **Server Components**: Use by default
8. **Prefetching**: Use Next.js Link component

---

## Deployment (Vercel)

### Quick Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Via Dashboard

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Environment Variables (Vercel)

Set in project settings:
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_APP_NAME`
- Add any others from `.env.local.example`

---

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any
