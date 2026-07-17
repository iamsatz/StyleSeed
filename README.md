# StyleSeed

> Formerly **HuePrint** — renamed to StyleSeed.

StyleSeed is a design-token and typography studio for AI-builders. It helps users browse curated kits, build custom kits, extract colors from websites, preview real UI screens, and export AI-ready design context for Claude, v0, Cursor, and Replit.

## What It Does

1. **Browse kits** - curated design systems by industry.
2. **Create custom kits** - choose colors, import Figma JSON, or extract colors from a URL.
3. **Preview UI** - test kits across components and product screens.
4. **Export for AI tools** - generate tool-specific context for Claude, v0, Cursor, and Replit.
5. **Roadmap** - typography search, website inspiration matches, localhost testing, and website component extraction.

## Current Stack

- **Frontend:** React 18, Vite 5
- **Routing:** React Router
- **Backend:** Express local server plus Vercel API route for URL extraction
- **Styling:** CSS with Tailwind CSS v4 plugin available through Vite
- **Icons:** Lucide React
- **Color utilities:** chroma-js
- **Language:** mixed TypeScript and JSX
- **Package manager:** npm

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Dev Server

```bash
npm run dev
```

The local Express/Vite server uses `PORT` when provided, otherwise it defaults to `5173`.

Open:

```text
http://localhost:5173
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Current Routes

- `/` - landing page
- `/browse` - curated kit browser
- `/create` - custom kit builder with color picker, Figma JSON import, URL color extraction, previews, and export
- `/kit/:id` - kit detail page with palettes, typography, component preview, token table, and exports

## Current API

### `POST /api/extract-url`

Accepts:

```json
{
  "url": "https://example.com"
}
```

Returns:

```json
{
  "colors": ["#7c3aed"],
  "semantic": {},
  "domain": "example.com",
  "count": 1,
  "accessMode": "public"
}
```

When StyleSeed runs through the local Express dev server, URL extraction enables local developer mode and can inspect `localhost`, `127.0.0.1`, and private LAN URLs. Hosted/Vercel extraction stays public-only and blocks private network targets.

If hosted StyleSeed blocks a local/private URL, use a deployed URL, an HTTPS tunnel URL, or the future HTML/CSS upload flow for offline local files.

Future versions will extend this response with optional typography, radii, shadows, spacing, components, and sections while keeping the existing fields compatible.

## Kit Data Shape

Each kit in `public/kits/` uses:

```json
{
  "id": "saas-clarity",
  "name": "SaaS Clarity",
  "industry": "SaaS",
  "description": "A clean product kit.",
  "palette": {
    "light": {
      "background": "#ffffff",
      "surface": "#f8fafc",
      "primary": "#2563eb",
      "secondary": "#64748b",
      "accent": "#0ea5e9",
      "text": "#0f172a",
      "textMuted": "#64748b",
      "border": "#e2e8f0",
      "success": "#10b981",
      "warning": "#f59e0b"
    },
    "dark": {}
  },
  "typography": {
    "headingFont": "Inter",
    "bodyFont": "Inter",
    "baseFontSize": "16px",
    "lineHeight": "1.6"
  }
}
```

Future typography will support `displayFont`, `headingFont`, `bodyFont`, and `monoFont` roles while preserving old kits.

## Work Chunk Rule

Every feature should ship as a small visible version:

- each chunk has clear acceptance criteria
- docs stay aligned with implementation
- shared foundations land before dependent UI
- no large rewrite should block visible progress

## Roadmap

### V0 - Docs And Foundations

- Align `PRD.md`, `README.md`, and `replit.md`.
- Document the shared `Kit` language.
- Share URL extraction logic between Express and Vercel.
- Add `typecheck` and `check` verification scripts.
- Keep lint/test as next verification additions.

### V1 - Typography Studio

- Support 1-4 font roles: Display, Heading, Body, UI/Mono.
- Add Google Fonts search.
- Add curated Fontshare-style free fonts.
- Add smart font suggestions by product category.

### V2 - Website Inspiration Matches

- Add curated real website references.
- Match references by palette, contrast mood, and category.
- Let users apply a reference as inspiration without copying it.

### V3 - Localhost Testing

- Support localhost extraction only when StyleSeed runs locally.
- Keep hosted StyleSeed safe by blocking private network targets.
- Explain hosted alternatives such as deployed URLs and tunnel URLs.

### V4 - Website Token And Component Extraction

- Extract fonts, radius, shadows, spacing, and button styles.
- Detect component patterns such as cards, navbars, forms, pricing, products, and testimonials.
- Generate generic preview sections from detected patterns.

## Verification

Current required check:

```bash
npm run typecheck
npm run build
npm run check
```

Planned checks for future chunks:

```bash
npm run lint
npm test
```

## License

[MIT](./LICENSE)
