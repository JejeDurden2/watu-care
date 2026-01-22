# Watu Care

**Premium Medical Devices & PPE Wholesale**

B2B medical wholesale platform connecting Asia's leading manufacturers with healthcare providers across Africa and the Middle East.

> "Watu" means "people" in Swahili — and that is exactly what drives us.

## About

Based in Hong Kong, Watu Care bridges the gap between world-class medical manufacturers and healthcare facilities in developing economies. We understand that behind every medical supply order is a healthcare worker striving to save lives and a patient hoping for recovery.

**Website**: https://watu-care.com

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Linting**: ESLint 9 (flat config)
- **Testing**: Vitest + Testing Library
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Scripts

```bash
npm run dev           # Development server
npm run build         # Production build
npm run lint          # ESLint check
npm run type-check    # TypeScript check
npm run format        # Prettier format
npm run test          # Run tests
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout + SEO metadata
│   ├── page.tsx          # Landing page
│   └── globals.css       # Brand colors + base styles
├── components/
│   ├── ui/               # Button, Container
│   ├── layout/           # Header, Footer
│   └── sections/         # Hero, Mission, Stats, ValueProps, etc.
└── lib/
    └── utils.ts          # Utility functions
```

## Product Categories

- Procedure Packs & Drapes
- Tubes & Airway Management
- Anti-Infection Central Venous Catheter
- Dressing & Kits
- Laboratory Supplies
- Veterinary Supplies
- Medical Equipment
- Gloves & Face Protection

## Brand Colors

| Color     | HSL                  | Usage              |
|-----------|----------------------|--------------------|
| Primary   | hsl(200 65% 55%)     | Medical blue       |
| Secondary | hsl(206 50% 13%)     | Dark navy          |
| Accent    | hsl(175 50% 45%)     | Teal green (CTAs)  |

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

Environment variables:
- `NEXT_PUBLIC_APP_URL` - https://watu-care.com
- `NEXT_PUBLIC_APP_NAME` - Watu Care

## Documentation

- [CLAUDE.md](./CLAUDE.md) - AI assistant instructions
- [.claude/skills/](./.claude/skills/) - Extended documentation

## License

Proprietary - Watu Care
