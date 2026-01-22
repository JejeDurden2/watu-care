# Code Quality & Review

## Pre-Commit Checklist

### 1. Static Analysis

```bash
npm run lint           # ESLint 9 (zero errors)
npm run type-check     # TypeScript (zero errors)
npm run format:check   # Prettier consistent
```

### 2. Code Quality Review

#### TypeScript

- [ ] No `any` types — use explicit types or `unknown`
- [ ] Explicit return types on exported functions
- [ ] No type assertions (`as`) unless necessary with comment
- [ ] Null/undefined handled (optional chaining, nullish coalescing)

#### Components

- [ ] Components are reusable, no hardcoded values
- [ ] Props properly typed with interfaces
- [ ] Server Components by default, 'use client' only when needed
- [ ] Small focused components (< 100 lines)

#### Performance

- [ ] Images use Next.js `<Image>` component
- [ ] Large components lazy loaded with `dynamic()`
- [ ] No unnecessary re-renders

#### Security

- [ ] No secrets in code — use env variables
- [ ] User input validated (Zod)
- [ ] Sensitive data not logged

### 3. Testing

```bash
npm run test           # All tests pass
npm run test:coverage  # Coverage adequate
```

### 4. Final Verification

```bash
npm run build          # Build succeeds
npm run dev            # App runs without errors
```

---

## Self-Review Workflow

```
1. WRITE      → Implement the feature/fix
2. LINT       → Run npm run lint && npm run type-check
3. FIX        → Fix any errors found
4. REVIEW     → Go through checklist above
5. VERIFY     → Run npm run build
6. COMMIT     → Only if all checks pass
```

---

## Common Issues to Fix

| Issue                     | Fix                                   |
| ------------------------- | ------------------------------------- |
| Missing return type       | Add explicit `: ReturnType`           |
| `any` type                | Replace with proper type or `unknown` |
| Long function (>50 lines) | Extract helper functions              |
| Nested conditionals       | Use early returns                     |
| Duplicated code           | Extract to shared util/component      |
| Hardcoded string          | Extract to constant or env var        |
| Missing validation        | Add Zod schema                        |
| Console.log left in       | Remove or replace with proper logging |

---

## ESLint 9 Flat Config

The project uses ESLint 9 with the new flat config format in `eslint.config.mjs`:

```javascript
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nextPlugin from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@next/next': nextPlugin,
    },
    rules: {
      // Custom rules...
    },
  },
  prettierConfig
);
```

### Key Rules

- `@typescript-eslint/no-unused-vars` - Error with `^_` pattern ignored
- `@typescript-eslint/no-explicit-any` - Warn
- `react-hooks/rules-of-hooks` - Error
- `react-hooks/exhaustive-deps` - Warn
- `no-console` - Warn (allow warn, error)

---

## Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100
}
```

---

## Conventional Commits

```
feat(section): add testimonials section
fix(header): mobile menu not closing
style(hero): adjust spacing on mobile
refactor(button): extract variants to cva
docs(readme): update deployment instructions
```
