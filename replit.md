# StyleSeed Project Notes

## Overview

StyleSeed is a React + Vite web application for creating design token kits for AI-builders. Users can browse curated kits, create custom kits, import Figma JSON, extract colors from website URLs, preview UI screens, and export AI-ready design context.

The product roadmap expands StyleSeed into a design reference and typography studio with free font search, real website inspiration, localhost testing, and website component/section extraction.

## Tech Stack

- **Frontend:** React 18, Vite 5
- **Backend:** Express local server serving Vite middleware plus `/api/extract-url`
- **Hosted API:** Vercel-style API route in `api/extract-url.js`
- **Routing:** react-router-dom
- **Language:** mixed TypeScript and JSX
- **Styling:** CSS, with Tailwind CSS v4 Vite plugin installed
- **Icons:** Lucide React
- **Color utilities:** chroma-js
- **Package manager:** npm

## Current Routes

- `/` - landing page
- `/browse` - kit browser with industry filters
- `/create` - custom kit builder
- `/kit/:id` - kit detail page

## Current Product Areas

### Curated Kits

Kit JSON files live in `public/kits/`. The manifest is `public/kits/index.json`.

Each kit includes:

- identity: `id`, `name`, `industry`, `description`
- light and dark semantic palette
- typography
- optional spacing, border radius, and shadows

### Create Kit

The Create Kit page supports:

- manual color picking
- Figma variables JSON import
- public website color extraction
- font pair selection
- live preview templates
- inline export for Claude, v0, Cursor, and Replit

### Kit Detail

The Kit Detail page supports:

- light/dark mode switching
- editable color overrides for curated kits
- typography specimen
- color palette display
- component gallery
- token table
- export panel

### URL Extraction

`POST /api/extract-url` accepts:

```json
{
  "url": "https://example.com"
}
```

It currently returns:

```json
{
  "colors": ["#7c3aed"],
  "semantic": {},
  "domain": "example.com",
  "count": 1,
  "accessMode": "public"
}
```

Local Express dev mode enables private-network extraction for `localhost`, `127.0.0.1`, and private LAN targets. Hosted/Vercel API mode always keeps those targets blocked and only extracts from public websites.

Hosted alternatives for local apps are: deploy the app and paste the public URL, expose the local dev server through an HTTPS tunnel, or use the planned HTML/CSS upload flow when it lands.

Future extraction will add optional `typography`, `radii`, `shadows`, `spacing`, `components`, and `sections`.

## Running The App

```bash
npm run dev
```

The local server reads `PORT` when provided and otherwise defaults to `5173`.

```text
http://localhost:5173
```

Build:

```bash
npm run build
```

## Work Chunk Rule

Every feature should ship in a small version with visible progress and acceptance criteria.

- Prefer one focused feature chunk over a large rewrite.
- Shared foundations should land before UI that depends on them.
- Docs should be updated with each product capability.
- Each chunk should have at least one verification step.

## Roadmap By Version

### V0.1 - Product Docs And Baseline Cleanup

- Align `PRD.md`, `README.md`, and this file with the current product.
- Document custom kit builder, URL color extraction, AI-tool exports, and previews.
- Add this Work Chunk Rule.

### V0.2 - Technical Foundation

- Treat `Kit` as the shared unit for colors, typography, previews, and exports.
- URL extraction logic is shared by `server.js` and `api/extract-url.js` through `lib/extractUrl.js`.
- Typecheck and combined check scripts are available.
- Lint and unit test scripts remain future verification additions.

### V3.0 - Localhost Testing: Safe Developer Mode

- Shared extraction accepts an explicit private-network option.
- The local Express dev server enables localhost/private LAN extraction.
- The hosted/Vercel API keeps private targets blocked.
- Create Kit explains the current extraction mode in the From URL tab.

### V3.1 - Hosted Alternatives For Local Apps

- Hosted/public mode explains why machine-local URLs cannot be reached.
- Private-network block responses include deployed URL, tunnel URL, and planned upload alternatives.
- Create Kit shows those options in the From URL tab and blocked-error state.

### V1.0 - Typography Studio: Multi-Font Roles

- Support Display, Heading, Body, and UI/Mono roles.
- Preserve existing `headingFont` and `bodyFont` behavior.
- Add a Typography tab in Create Kit.
- Update exports to include all selected font roles.

### V1.1 - Google Fonts Search

- Add searchable Google Fonts metadata.
- Filter by category, popularity, styles, and variable font availability.
- Dynamically load only selected fonts.

### V1.2 - Fontshare And Curated Free Fonts

- Add a curated local Fontshare-style index.
- Store provider, license, CSS embed URL, category, tags, and recommended use.
- Show free/commercial-use labels where known.

### V1.3 - Smart Font Suggestions

- Suggest font systems by category: SaaS, fintech, healthcare, ecommerce, luxury, education, gaming, portfolio, documentation.
- Add "Suggest pairings" for selected fonts.

### V2.0 - Website Inspiration Dataset

- Add curated real website references.
- Store name, URL, category, screenshot, palette, font notes, style tags, and match notes.

### V2.1 - Palette Similarity Matching

- Rank website references by primary color, background color, contrast mood, and category.
- Add Similar Websites panels in Create Kit and Kit Detail.

### V2.2 - Apply Inspiration

- Let users apply a reference as inspiration.
- Adjust kit suggestions without copying third-party website copy, layouts, or assets.

### V3.0 - Localhost Testing

- Allow localhost extraction only in explicit local/dev mode.
- Keep private network URLs blocked in hosted/public mode.
- Support `localhost`, `127.0.0.1`, and private LAN addresses only locally.

### V3.1 - Hosted Alternatives

- Explain why hosted StyleSeed cannot access a user's local `localhost`.
- Suggest deployed URLs, tunnel URLs, and future HTML/CSS upload.

### V4.0 - Website Token Extraction Beyond Colors

- Extract fonts, font sizes, radius, shadows, spacing rhythm, and button styles.
- Show extracted tokens with confidence levels.

### V4.1 - Component Pattern Detection

- Detect buttons, cards, navbars, forms, badges, pricing cards, product cards, testimonials, and footers.
- Keep this as pattern detection, not exact cloning.

### V4.2 - Section Preview Generator

- Generate generic preview sections for hero, feature grid, pricing, dashboard cards, auth form, product grid, and footer.
- Use extracted tokens and placeholder content.

### V4.3 - Category Preview Expansion

- Audit categories with thin preview coverage.
- Ensure every major category has at least four useful preview contexts.

## Future Data Shapes

### Typography

```json
{
  "typography": {
    "displayFont": "Clash Display",
    "headingFont": "Satoshi",
    "bodyFont": "Inter",
    "monoFont": "JetBrains Mono",
    "baseFontSize": "16px",
    "lineHeight": "1.6",
    "roles": {
      "hero": "displayFont",
      "headings": "headingFont",
      "body": "bodyFont",
      "ui": "bodyFont",
      "code": "monoFont"
    }
  }
}
```

### Font Catalog Record

```json
{
  "id": "inter-google",
  "family": "Inter",
  "provider": "google",
  "category": "sans-serif",
  "weights": [400, 500, 600, 700],
  "styles": ["normal", "italic"],
  "license": "OFL",
  "sourceUrl": "https://fonts.google.com/specimen/Inter",
  "cssEmbedUrl": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  "tags": ["ui", "saas", "neutral"]
}
```

### Website Reference Record

```json
{
  "id": "linear",
  "name": "Linear",
  "url": "https://linear.app",
  "category": "SaaS",
  "screenshot": "/references/linear.png",
  "palette": {
    "primary": "#5e6ad2",
    "background": "#08090a",
    "surface": "#111113",
    "text": "#f7f8f8"
  },
  "fontNotes": "Modern product sans, compact UI rhythm",
  "styleTags": ["dark", "technical", "premium", "minimal"],
  "matchNotes": ["similar dark background", "high contrast SaaS style"]
}
```

## Verification Expectations

Current check:

```bash
npm run typecheck
npm run build
npm run check
```

Future checks to add:

```bash
npm run lint
npm test
```

Important future test areas:

- font role mapping
- export generation with 1-4 fonts
- backwards compatibility with `headingFont` and `bodyFont`
- palette similarity scoring
- URL extraction safety
- localhost allowed only in local/dev mode
- Create Kit UI flows
