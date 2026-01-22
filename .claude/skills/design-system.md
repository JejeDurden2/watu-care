# Design System - Watu Care

## Philosophy

**Warm yet professional** — a B2B medical supplier that inspires trust while showing genuine care for healthcare outcomes. Think established medical company, not sterile corporate.

### Design Principles

- **Trust through clarity**: Clean layouts, clear hierarchy, professional aesthetics
- **People-focused warmth**: Not cold corporate, remember "Watu" means people
- **Medical precision**: Accurate, reliable, quality-focused
- **Accessibility**: Reaching developing economies means universal design

---

## Brand Color Palette

### Primary Colors (CSS Variables in `globals.css`)

```css
:root {
  /* Watu Care Brand Colors */
  --primary: 200 65% 55%;           /* Medical blue - trust, healthcare */
  --primary-foreground: 0 0% 100%;  /* White */

  --secondary: 206 50% 13%;         /* Dark navy - professionalism, reliability */
  --secondary-foreground: 0 0% 100%;

  --accent: 175 50% 45%;            /* Teal green - CTAs, growth, vitality */
  --accent-foreground: 0 0% 100%;

  --background: 210 20% 98%;        /* Light gray-blue - clean, clinical */
  --foreground: 206 50% 13%;        /* Dark navy */

  --muted: 210 20% 96%;             /* Subtle backgrounds */
  --muted-foreground: 206 20% 40%;  /* Muted text */

  --border: 210 20% 90%;            /* Soft borders */
}
```

### Semantic Mappings

| Token                | HSL Value          | Usage                    |
| -------------------- | ------------------ | ------------------------ |
| `primary`            | 200 65% 55%        | Links, highlights, icons |
| `secondary`          | 206 50% 13%        | Headings, nav, footer    |
| `accent`             | 175 50% 45%        | CTAs, success states     |
| `background`         | 210 20% 98%        | Page background          |
| `muted`              | 210 20% 96%        | Section backgrounds      |
| `muted-foreground`   | 206 20% 40%        | Secondary text           |

### Tailwind Usage

```tsx
// Primary CTA button (accent color)
<button className="bg-accent text-accent-foreground hover:brightness-110">
  Request a Quote
</button>

// Secondary button
<button className="bg-secondary text-secondary-foreground">
  Learn More
</button>

// Outline button
<button className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white">
  Contact Us
</button>

// Cards
<div className="bg-white border border-border shadow-soft rounded-2xl">

// Section with muted background
<section className="bg-muted py-20">

// Headings (auto-styled in globals.css)
<h1 className="text-secondary font-semibold tracking-tight">
```

---

## Typography

### Fonts

- **Sans-serif**: Inter (via `next/font/google`)
- **Font variable**: `--font-inter`

### Font Sizes

| Class    | Size    | Usage           |
| -------- | ------- | --------------- |
| `text-sm`| 0.875rem| Captions, meta  |
| `text-base`| 1rem  | Body text       |
| `text-lg`| 1.125rem| Lead paragraphs |
| `text-xl`| 1.25rem | Subheadings     |
| `text-3xl`| 1.875rem| Section titles |
| `text-4xl`| 2.25rem | Page titles    |
| `text-5xl`| 3rem   | Hero headlines  |

### Usage

```tsx
<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
  Hero Title
</h1>
<h2 className="text-3xl font-bold tracking-tight">
  Section Title
</h2>
<p className="text-lg text-muted-foreground leading-relaxed">
  Body text with good readability
</p>
```

---

## Shadows

```typescript
boxShadow: {
  'soft': '0 2px 8px -2px rgba(0,0,0,0.05), 0 4px 16px -4px rgba(0,0,0,0.05)',
  'soft-md': '0 4px 12px -4px rgba(0,0,0,0.08), 0 8px 24px -8px rgba(0,0,0,0.06)',
  'soft-lg': '0 8px 24px -8px rgba(0,0,0,0.1), 0 16px 48px -16px rgba(0,0,0,0.08)',
}
```

---

## Border Radius

```typescript
borderRadius: {
  xl: '1rem',
  '2xl': '1.25rem',
}
```

---

## Component Patterns

### Cards

```tsx
<div className="rounded-2xl border border-border bg-white p-6 shadow-soft transition-shadow hover:shadow-soft-md">
  {/* content */}
</div>
```

### Primary Button (Accent CTA)

```tsx
<button className="bg-accent text-accent-foreground rounded-xl px-8 py-4 font-medium shadow-soft transition-all hover:shadow-soft-md hover:brightness-110">
  Request a Quote
</button>
```

### Secondary Button

```tsx
<button className="bg-secondary text-secondary-foreground rounded-xl px-8 py-4 font-medium shadow-soft transition-all hover:shadow-soft-md hover:brightness-110">
  Learn More
</button>
```

### Outline Button

```tsx
<button className="border-2 border-secondary text-secondary rounded-xl px-8 py-4 font-medium transition-colors hover:bg-secondary hover:text-white">
  Contact Us
</button>
```

### Section Spacing

```tsx
<section className="py-20 lg:py-28">
  <Container>
    {/* content */}
  </Container>
</section>
```

### Header/Navbar

```tsx
<header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
```

### Footer

```tsx
<footer className="border-t border-border bg-secondary text-secondary-foreground">
```

---

## Icon Usage

Using **Lucide React** for consistent iconography:

```tsx
import { Package, Globe2, ShieldCheck, Headphones } from 'lucide-react';

// In icon containers
<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
  <Package className="h-7 w-7 text-primary" />
</div>

// Inline with text
<div className="flex items-center gap-2">
  <Mail className="h-4 w-4 text-accent" />
  <span>contact@watu-care.com</span>
</div>
```

---

## Animations

```typescript
animation: {
  'fade-in': 'fadeIn 0.5s ease-out',
  'slide-up': 'slideUp 0.5s ease-out',
}
```

All interactive elements use `transition-all duration-200 ease-out`.

---

## Key Rules

1. **CTAs**: Use `bg-accent` with `text-accent-foreground`
2. **Headings**: Use `text-secondary font-semibold tracking-tight`
3. **Body text**: Use `text-muted-foreground` for secondary content
4. **Cards**: White background, `shadow-soft`, `rounded-2xl`
5. **Sections**: Alternate between `bg-background` and `bg-muted`
6. **Transitions**: Always `duration-200 ease-out`
7. **Spacing**: Generous - sections get `py-20 lg:py-28`
8. **Focus states**: Use `ring-2 ring-primary ring-offset-2`
9. **Icons**: Use `primary` color in `bg-primary/10` containers
10. **Mobile-first**: Start with mobile, scale up with `sm:`, `md:`, `lg:`
