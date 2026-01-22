# Watu Care - Claude Instructions

## Project Overview

**Watu Care** is a B2B medical wholesale landing page connecting Asia's medical manufacturers with healthcare providers across Africa and the Middle East.

- **URL**: https://watu-care.com
- **HQ**: Hong Kong
- **Tagline**: "We deliver premium medical devices and PPE, ensuring quality and accessibility where it matters most."

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Linting**: ESLint 9 (flat config)
- **Testing**: Vitest + Testing Library
- **Deployment**: Vercel
- **Icons**: Lucide React

---

## Brand Colors

```css
:root {
  --primary: 200 65% 55%;      /* Medical blue */
  --secondary: 206 50% 13%;    /* Dark navy */
  --accent: 175 50% 45%;       /* Teal green */
}
```

---

## Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # CSS variables + base styles
│   ├── components/
│   │   ├── ui/                 # Button, Container
│   │   ├── layout/             # Header, Footer
│   │   └── sections/           # Hero, Mission, Stats, etc.
│   └── lib/
│       └── utils.ts            # cn() helper
├── public/
│   ├── logo.png
│   ├── hero-medical.jpg
│   └── fluid-management.jpg
├── eslint.config.mjs           # ESLint 9 flat config
├── tailwind.config.ts
└── package.json
```

---

## Commands Reference

```bash
npm run dev           # Start dev server (port 3000)
npm run build         # Production build
npm run lint          # ESLint (flat config)
npm run type-check    # TypeScript check
npm run format        # Prettier format
npm run test          # Vitest
```

---

## Product Categories

1. Procedure Packs & Drapes
2. Tubes & Airway Management
3. Anti-Infection Central Venous Catheter
4. Dressing & Kits
5. Laboratory Supplies
6. Veterinary Supplies
7. Medical Equipment
8. Gloves & Face Protection

---

## Rules for Claude

### ALWAYS

1. Create reusable, typed components
2. Implement mobile-first responsive design
3. Add proper TypeScript types with explicit return types
4. Consider SEO impact (metadata, Core Web Vitals)
5. Use conventional commits with proper scope
6. Write tests for complex logic
7. Self-review code before committing
8. Optimize images (Next.js Image component)
9. Implement proper loading states
10. Use semantic HTML for accessibility

### NEVER

11. Use `any` type — use `unknown` + type guards
12. Skip validation (use Zod)
13. Hardcode values — use env vars or constants
14. Commit without running lint and type-check
15. Skip alt text on images
16. Use generic error messages
17. Ignore accessibility (a11y)
18. Use inline styles (use Tailwind)

### PREFER

19. Composition over inheritance
20. Small, focused components (< 100 lines)
21. Named exports over default exports
22. Server Components by default
23. Early returns over nested conditions
24. Explicit over implicit

---

## Skills (Documentation)

Extended docs in `.claude/skills/`:

- **frontend-architecture.md** - React patterns, components
- **seo.md** - Metadata, JSON-LD, Core Web Vitals
- **code-quality.md** - ESLint, Prettier, pre-commit
- **design-system.md** - Colors, typography, glassmorphism

---

## Deployment (Vercel)

```bash
vercel         # Deploy preview
vercel --prod  # Production
```

Environment variables:
- `NEXT_PUBLIC_APP_URL=https://watu-care.com`
- `NEXT_PUBLIC_APP_NAME=Watu Care`

---

## Plan Mode

- Make plans extremely concise
- List unresolved questions at end
