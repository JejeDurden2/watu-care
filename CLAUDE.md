# Watu Care - Claude Instructions

Shared engineering and copy rules live in the global `~/.claude/engineering-rules.md` (loaded automatically). This file only holds what is specific to this project.

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
  --primary: 200 70% 38%;      /* Medical blue — carries text, 4.9:1 on white */
  --secondary: 206 50% 13%;    /* Dark navy */
  --accent: 175 55% 32%;       /* Teal green — carries text, 4.8:1 on white */

  --primary-light: 200 65% 70%; /* Text/graphics on the navy sections */
  --accent-light: 175 55% 58%;  /* Text/graphics on the navy sections */
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
│   └── products/              # Product images (kebab-case)
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

1. Gloves
2. Infection Prevention & PPE
3. Bodily Waste & Excreta Management
4. Surgical & Procedure Packs
5. Wound Care & Dressing
6. Clinical Consumables
7. Vascular Access & Catheters
8. Airway & Respiratory
9. Surgical Instruments & Sutures
10. Patient Care & Basic Equipment

---

## Project-specific rules

1. Optimize images (Next.js Image component); never skip alt text
2. Implement proper loading states
3. Use semantic HTML for accessibility; never ignore a11y
4. Server Components by default
5. Small, focused components (< 100 lines)
6. No inline styles — use Tailwind
7. Validation with Zod
8. No generic error messages

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
