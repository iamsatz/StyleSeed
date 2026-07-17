# StyleSeed Product Requirements Document

**Version:** 2.0
**Date:** June 2026
**Status:** Active product roadmap
**Platform:** Web app - React 18, Vite, Express/Vercel API
**Repo:** `styleseed`

## Product Summary

StyleSeed helps AI-builders create, preview, and export design systems that can be used in Claude, v0, Cursor, Replit, and similar coding tools. The product started as curated design token kits and now includes a custom kit builder, URL-based color extraction, live UI previews, and AI-ready exports.

The next product direction is to make StyleSeed a design reference and typography studio:

- suggest real websites with a similar color/style feel
- let developers test local apps when StyleSeed runs locally
- search and apply free fonts from Google Fonts, Fontshare-style catalogs, and curated free font sources
- support 1-4 font roles per kit
- extract richer design tokens, components, and preview sections from websites without cloning third-party content

**Core principle:** StyleSeed should create usable design context, not just color values. A kit should tell an AI tool how to apply colors, typography, spacing, components, and visual rules.

## Target Users

| Persona | Description | Job to be done |
|---|---|---|
| Solo founder | Builds with Claude, v0, Cursor, Replit, or similar tools | Get branded UI without becoming a designer |
| Indie hacker | Ships multiple small products per year | Start from a professional visual system quickly |
| Product designer | Explores product directions and design systems | Generate palettes, typography, previews, and AI-ready specs |
| Frontend developer | Has a local product and wants to test styles | Extract design cues from deployed or local websites |

## Current Product

### Current User Flows

1. Browse curated kits by industry.
2. Open a kit detail page with palettes, typography, component preview, token table, and exports.
3. Build a custom kit by picking colors and typography.
4. Import Figma variables JSON into a kit.
5. Extract colors from a public website URL.
6. Preview a custom kit across common product screens.
7. Export AI-ready files for Claude, v0, Cursor, and Replit.

### Current Kit Model

A StyleSeed kit currently includes:

- identity: `id`, `name`, `industry`, `description`
- palette: light and dark semantic colors
- typography: heading font, body font, base size, line height
- optional spacing, border radius, and shadow tokens
- preview behavior through scoped CSS custom properties
- export behavior through AI-tool-specific generators

## Work Chunk Rule

Every feature must ship in small, visible, testable chunks.

- Each chunk should produce either visible UI, documented behavior, reusable data, or a verified internal foundation.
- Avoid giant rewrites that block user-visible progress.
- Each version below should be implementable as one small PR or a short sequence of tightly related PRs.
- Every version must have clear acceptance criteria before implementation starts.
- Docs must stay updated as features land.

## Product Options Library

This section captures the reusable product options StyleSeed should expose over time. Each option needs a short explanation in the UI so users learn why they are choosing it.

### Color Usage Options

Color usage options explain how much visual space each color role should occupy. They should guide previews and AI exports, not enforce exact pixels.

| Option | Best for | Why it matters |
|---|---|---|
| Classic Balance | General websites, MVPs, simple apps | Gives beginners a simple dominant/support/accent model using the familiar 60/30/10 composition idea. |
| Material Role-Based | Mobile apps, web apps, design-system-driven products | Teaches users to think in surface, primary, secondary, tertiary, and status roles rather than spreading one brand color everywhere. |
| Enterprise Neutral | Dashboards, admin tools, fintech, legal, B2B SaaS | Keeps dense product UI calm and scannable by reserving strong color for actions and state changes. |
| Product Workflow | CRMs, task apps, project tools, productivity apps | Helps workflow-heavy products use brand, information, discovery, success, warning, and danger colors with clear meaning. |
| Marketing Bold | Landing pages, launches, creator sites, portfolios | Allows more brand expression for pages where persuasion and memorability matter more than dense repeated use. |
| Luxury Editorial | Premium brands, fashion, hospitality, editorial layouts | Preserves whitespace and restraint so accents feel selective and high-end. |
| Creative / Gaming | Games, music, events, experimental brands | Makes room for expressive color, saturated contrast, and stronger visual energy. |
| Custom | Strict brand systems or unusual visual directions | Lets users override presets when they already have brand rules, accessibility constraints, or a specific art direction. |

### Typography Options

Typography options define how many fonts a kit uses and where each font should appear.

| Option | Best for | Why it matters |
|---|---|---|
| Single Font System | MVPs, dashboards, utility apps | Keeps the product simple, consistent, and easy to implement. Good default when the user is unsure. |
| Two-Font Pair | Most websites and SaaS products | Gives hierarchy without making the system complex: one heading font and one body/UI font. |
| Three-Font Brand System | Marketing sites, portfolios, editorial products | Adds a display font for hero/brand moments while keeping headings and body readable. |
| Four-Font Product System | Mature products, docs, developer tools | Supports display, heading, body, and mono/UI roles for richer systems with code, data, or technical surfaces. |
| Custom Role Mapping | Advanced brand systems | Lets users assign fonts by context, such as hero, headings, body, UI labels, and code. |

### Font Source Options

Font source options should be searchable in one Typography Studio UI.

| Option | Best for | Why it matters |
|---|---|---|
| Google Fonts | Broad free font search | Has a large public catalog and metadata, making it the best first dynamic font source. |
| Fontshare-Style Curated Fonts | Modern brand/UI fonts | Adds more contemporary free font choices, starting with a curated local index. |
| Curated StyleSeed Picks | Users who do not want to search | Gives high-quality defaults by industry and avoids choice overload. |
| Manual Font Entry | Existing brand fonts | Lets users type a family name or CSS import when the font is not in the catalog. |

### Smart Font Suggestion Options

Smart suggestions should produce complete font systems rather than isolated font names.

| Option | Best for | Why it matters |
|---|---|---|
| SaaS / Product | B2B tools, dashboards, startups | Prioritizes clarity, x-height, and neutral UI readability. |
| Fintech / Legal | Finance, compliance, law, enterprise | Prioritizes trust, restraint, and legibility. |
| Healthcare / Wellness | Medical, therapy, wellness products | Prioritizes calm, softness, and approachable readability. |
| Ecommerce / Retail | Product browsing and checkout | Balances brand personality with readable prices, cards, and CTAs. |
| Luxury / Editorial | Premium, fashion, hospitality, publishing | Prioritizes elegance, whitespace, and display typography. |
| Gaming / Creative | Games, events, music, creator brands | Prioritizes energy, distinctiveness, and expressive display choices. |
| Documentation / Developer | Docs, SDKs, technical products | Prioritizes body readability, code readability, and clear hierarchy. |

### Website Inspiration Options

Website inspiration should help users learn from real products without copying them.

| Option | Best for | Why it matters |
|---|---|---|
| Similar Websites | Users choosing colors | Shows real references with a similar visual feel so users can judge whether a palette feels right. |
| Match Reasons | Every inspiration card | Builds trust by explaining the match, such as similar primary color, dark UI, high contrast, or restrained accent use. |
| Apply Inspiration | Users who want direction fast | Applies palette/style guidance without copying website copy, assets, or exact layouts. |
| Filter By Category | Users building for a known industry | Prevents irrelevant inspiration by matching SaaS, fintech, healthcare, ecommerce, portfolio, gaming, and other contexts. |
| Save Reference | Future account/saved-kit flows | Lets users keep a design direction while iterating on colors and typography. |

### Localhost Testing Options

Localhost testing must be explicit because hosted StyleSeed cannot access a user's machine-local URLs.

| Option | Best for | Why it matters |
|---|---|---|
| Public URL | Hosted and local StyleSeed | Safest default for extracting colors from deployed websites. |
| Localhost Dev Mode | Developers running StyleSeed locally | Allows `localhost`, `127.0.0.1`, and private LAN targets only when the app is local/dev. |
| Tunnel URL Guidance | Hosted users with local apps | Explains that users can expose a local app through a temporary public tunnel. |
| HTML/CSS Upload | Future offline/local extraction | Lets users inspect local projects without network access or crawling. |

### Website Extraction Options

Extraction should advance in levels so each stage is useful by itself.

| Option | Best for | Why it matters |
|---|---|---|
| Color Extraction | Current public URL flow | Gives immediate palette suggestions and preserves the existing feature. |
| Token Extraction | Richer design-system creation | Adds fonts, font sizes, radius, shadows, spacing rhythm, and button styles. |
| Component Detection | Improving preview relevance | Detects buttons, cards, navbars, forms, badges, pricing cards, product cards, testimonials, and footers. |
| Section Generation | Preview website creation | Creates generic hero, feature, pricing, auth, dashboard, product, and footer sections from extracted style signals. |
| Manual Review | Avoiding wrong extraction | Lets users choose which detected tokens/components/sections should be added. |

### Preview Template Options

Preview templates should be added by real product context, not decorative variety.

| Option | Best for | Why it matters |
|---|---|---|
| Components | All kits | Shows buttons, inputs, cards, badges, states, and typography in a compact baseline. |
| SaaS Landing | Startups and product pages | Tests hero, feature, CTA, and brand usage. |
| Dashboard / Admin | B2B, fintech, analytics | Tests dense UI, tables, stats, navigation, and low-accent usage. |
| Auth / Onboarding | Apps with signup flows | Tests forms, trust, labels, errors, and focused CTAs. |
| Ecommerce / Product | Retail and marketplaces | Tests product cards, pricing, promo accents, and checkout-like actions. |
| Content / Blog / Docs | Editorial and developer tools | Tests long-form readability, headings, code, sidebars, and links. |
| Portfolio / Creative | Personal and agency brands | Tests expressive typography, visual rhythm, and accent moments. |
| Industry Sections | Categories with thin previews | Ensures each major kit category has at least four useful preview contexts. |

### Export Guidance Options

Exports should teach AI tools how to use the system, not just list values.

| Option | Best for | Why it matters |
|---|---|---|
| Claude Prompt | Broad AI coding/design context | Gives high-level rules, usage guidance, and do/don't instructions. |
| v0 / Tailwind Config | Tailwind-based UI generation | Turns selected tokens into practical utility names. |
| Cursor Rules | Ongoing codebase assistance | Keeps design rules available while editing files. |
| Replit Prompt | Replit AI workflows | Gives compact CSS variable and design guidance inside the Replit context. |
| Future CSS/JSON Tokens | Direct implementation | Supports non-AI workflows and design-token pipelines later. |

## Roadmap

### V0.1 - Product Docs And Baseline Cleanup

Goal: align docs with the current product and future roadmap.

Requirements:

- Update PRD from old MVP language to current product behavior.
- Update README with the real stack and current exports.
- Update Replit/project notes with the roadmap.
- Add the Work Chunk Rule to product docs.

Acceptance:

- `PRD.md`, `README.md`, and `replit.md` describe the same product.
- Future work is split into small versions.

### V0.2 - Technical Foundation Before New Features

Goal: document the technical foundation needed before large new features.

Requirements:

- Treat a `Kit` as the shared product unit for colors, typography, previews, and exports.
- Use one shared `/api/extract-url` module for both local Express and Vercel API routes.
- Add required verification language for typecheck, build, future lint, and future tests.

Acceptance:

- Local Express and Vercel API routes call the same extraction helper.
- Docs identify typecheck/build/lint/test as required checks for feature chunks.

### V0.3 - Color Usage Ratio Presets

Goal: help users understand how much visual space each color should occupy in a UI.

Important positioning:

- These are StyleSeed usage presets, not official fixed ratios from Material, Carbon, or Atlassian.
- Material Design, IBM Carbon, and Atlassian Design System use role-based color systems rather than fixed percentages.
- StyleSeed translates those role-based principles into practical ratio guidance for AI-generated UI.
- Ratios should guide composition and AI prompts, not hard-code exact pixel measurements.

Requirements:

- Add a Color Usage section to Create Kit.
- Offer preset ratios with name, ratio, best-fit categories, and "why use this" explanation.
- Let users manually customize ratios.
- Export usage guidance in AI prompts so generated UIs avoid overusing strong brand colors.

Acceptance:

- User can choose a preset or custom ratio.
- UI explains why each preset exists.
- Export output includes color usage guidance.
- Existing kits work without selecting a ratio by using the default preset.

#### Preset Options

| Preset | Ratio | Best for | Why use this |
|---|---:|---|---|
| Classic Balance | 60 / 30 / 10 | General websites, MVPs, simple apps | A simple visual-balance rule. Use one dominant base, one supporting color, and one clear accent without overthinking the palette. |
| Material Role-Based | 75 / 10 / 10 / 5 | Mobile apps, web apps, design-system-driven products | Good for apps that need clear color roles. Most of the UI stays on surfaces, while primary, secondary, tertiary, and status colors are used only for meaning and emphasis. |
| Enterprise Neutral | 85 / 8 / 5 / 2 | Dashboards, admin tools, fintech, legal, B2B SaaS | Keeps the interface calm and scannable, with color reserved for actions, alerts, and important states. Inspired by IBM Carbon-style neutral layering. |
| Product Workflow | 80 / 8 / 7 / 5 | Task apps, CRMs, project tools, productivity products | Uses neutral UI as the base, brand color for key actions, and semantic colors for workflow states. Inspired by Atlassian-style role-based tokens. |
| Marketing Bold | 50 / 25 / 15 / 10 | Landing pages, launches, creator sites, portfolios | Allows more brand color and accent energy while still keeping a readable background structure. |
| Luxury Editorial | 75 / 20 / 5 | Premium brands, fashion, hospitality, editorial layouts | Uses restrained accent color so the design feels spacious, selective, and high-end. |
| Creative / Gaming | 45 / 35 / 20 | Games, music, events, experimental brands | Gives more room to saturated color and visual energy for expressive interfaces. |
| Custom | User-defined | Products with strict brand rules or unique visual systems | Use when a product has a specific brand rule, accessibility constraint, or visual direction that does not fit a preset. |

#### Suggested Role Mapping

| Preset | Ratio meaning |
|---|---|
| Classic Balance | Background/canvas 60%, surface/supporting color 30%, accent/CTA 10% |
| Material Role-Based | Surface/background 75%, primary 10%, secondary/tertiary 10%, status 5% |
| Enterprise Neutral | Neutral layers 85%, primary action 8%, status 5%, accent 2% |
| Product Workflow | Neutral UI 80%, brand/action 8%, information/discovery 7%, status 5% |
| Marketing Bold | Background 50%, brand 25%, secondary 15%, accent 10% |
| Luxury Editorial | Neutral/background 75%, supporting tone 20%, accent 5% |
| Creative / Gaming | Dominant visual color 45%, secondary color 35%, accent 20% |

#### Reference Systems

- Material Design 3: color roles such as surface, primary, secondary, tertiary, error, and on-color roles.
- IBM Carbon: neutral theme/layer model with restrained action and status colors.
- Atlassian Design System: token-based color roles for neutral, brand, information, success, warning, danger, discovery, accent, inverse, and input.

### V1.0 - Typography Studio: Basic Multi-Font Roles

Goal: replace the simple font-pair selector with a richer typography system.

Requirements:

- Support 1-4 font roles:
  - Display
  - Heading
  - Body
  - UI/Mono
- Keep compatibility with existing `headingFont` and `bodyFont`.
- Add a Typography tab in Create Kit.
- Live previews must update when roles change.
- Exports must include selected typography roles.

Acceptance:

- User can use one font for the whole kit.
- User can assign separate display, heading, body, and mono fonts.
- Existing kits continue to render.

### V1.0.1 - Portfolio Structure Preview Controls

Goal: make the Portfolio preview useful for personal and agency portfolio sites by testing a real portfolio information architecture without copying any reference site's visual design.

Reference structure:

- Use portfolio-style structure inspired by common designer portfolios, including top navigation, intro/profile hero, client or credibility strip, case studies, selected projects, explorations or experiments, contact CTA, and footer.
- The reference site `https://sateeshkumar.vercel.app/` is useful as a structural example only. Do not copy its visual design, exact copy, assets, or layout details.

Requirements:

- Expand the Portfolio preview into multiple portfolio sections.
- Add section-level controls in Create Kit when Portfolio preview is selected.
- Let users change the relevant component style for each section, such as hero layout, client strip style, case study card style, project grid style, exploration list style, contact CTA style, and footer style.
- Keep section variants generic and kit-driven through StyleSeed tokens.
- Preserve existing preview behavior for non-portfolio previews.

Acceptance:

- User can select Portfolio preview and see a portfolio-style page structure.
- User can change component variants for each portfolio section.
- Variant changes update the live preview immediately.
- The preview uses placeholder content and kit tokens, not copied third-party content or assets.

### V1.1 - Google Fonts Search

Goal: let users search and apply free Google Fonts inside StyleSeed.

Requirements:

- Add a searchable Google Fonts catalog using metadata.
- Support filters for category, popularity, number of styles, and variable font availability.
- Load only selected fonts dynamically.
- Assign a selected font to a typography role.

Acceptance:

- User can search Google Fonts, preview a font, assign it, and see live preview update.

### V1.2 - Fontshare And Curated Free Fonts

Goal: expand font search beyond Google Fonts.

Requirements:

- Add Fontshare-style fonts through a curated local index first.
- Store provider, license label, CSS embed URL, category, tags, and recommended use.
- Clearly label free/commercial-use status where known.

Acceptance:

- User can search Google Fonts and curated Fontshare-style fonts in one interface.

### V1.3 - Smart Font Suggestions

Goal: help users choose good font systems for their product context.

Requirements:

- Add context-based suggestions for SaaS, fintech, healthcare, ecommerce, luxury, education, gaming, portfolio, and documentation.
- Add "Suggest pairings" for a selected font.
- Return 3-5 complete font systems with role assignments.

Acceptance:

- User can choose a category and apply a recommended typography system.

### V2.0 - Website Inspiration Matches: Curated Dataset

Goal: suggest real websites that feel similar to the selected kit.

Requirements:

- Create a curated website reference dataset.
- Each record should include name, URL, category, screenshot, palette, typography notes, style tags, and match notes.
- Start with manual curation, not live crawling.

Acceptance:

- StyleSeed can show real website references from static data.

### V2.1 - Palette Similarity Matching

Goal: rank inspiration websites based on the user's selected colors.

Status: Implemented. StyleSeed now ranks curated website references by palette similarity, contrast mood, and optional category in Create Kit and Kit Detail.

Requirements:

- Compare primary color, background color, contrast mood, and optional category.
- Add "Similar Websites" panel in Create Kit and Kit Detail.
- Show match reasons in human language.

Acceptance:

- After choosing colors, user sees ranked website references with clear reasons.

### V2.2 - Apply Inspiration

Goal: let users use references as direction without copying them.

Status: Implemented. Create Kit can apply a reference as adapted palette, typography, color-usage, and preview guidance without copying site content, assets, or exact layouts.

Requirements:

- Add "Use as inspiration" action.
- Adjust kit suggestions using reference palette and style metadata.
- Do not copy website text, layouts, or assets exactly.

Acceptance:

- User can apply a reference and update kit suggestions safely.

### V3.0 - Localhost Testing: Safe Developer Mode

Goal: let developers test local websites when StyleSeed runs locally.

Status: Implemented. Shared extraction logic now allows localhost and private LAN URLs only when the local Express dev server explicitly enables private-network extraction; the hosted API keeps those targets blocked.

Requirements:

- Document that hosted StyleSeed cannot access a user's local `localhost`.
- Add explicit local/dev mode for localhost extraction.
- Allow `localhost`, `127.0.0.1`, and private LAN addresses only in local/dev mode.

Acceptance:

- User running StyleSeed locally can extract from `http://localhost:3000`.
- Hosted/public mode keeps private network targets blocked.

### V3.1 - Hosted Alternatives For Local Apps

Goal: give hosted users a clear path when localhost cannot work.

Status: Implemented. Hosted/public mode now explains why localhost/private URLs cannot work and suggests deployed URLs, HTTPS tunnel URLs, or the planned HTML/CSS upload path.

Requirements:

- Explain the hosted limitation in the UI.
- Suggest deployed URL, tunnel URL, or future HTML/CSS upload.

Acceptance:

- Hosted users understand why localhost fails and what to do next.

### V4.0 - Website Token Extraction Beyond Colors

Goal: extract richer design tokens from websites.

Status: Implemented locally. URL extraction now returns static CSS token suggestions for typography, radius, shadows, spacing, and button styles while keeping the existing color response shape.

Requirements:

- Detect fonts, font sizes, border radius, shadows, spacing rhythm, and button styles.
- Show extracted tokens with confidence levels.
- Keep existing `{ colors, semantic, domain, count }` response working.

Acceptance:

- Entering a URL produces token suggestions beyond colors.

### V4.1 - Component Pattern Detection

Goal: detect common component patterns from website DOM/CSS.

Requirements:

- Detect buttons, cards, navbars, forms, badges, pricing cards, product cards, testimonials, and footers.
- Keep detection pattern-based rather than exact cloning.

Acceptance:

- StyleSeed lists detected component types and lets users choose preview additions.

### V4.2 - Section Preview Generator

Goal: generate preview sections from detected website patterns.

Requirements:

- Generate generic preview sections for hero, feature grid, pricing, dashboard cards, auth form, product grid, and footer.
- Use extracted tokens and placeholder content.
- Do not copy third-party content or assets.

Acceptance:

- A website can add matching preview sections without becoming a clone.

### V4.3 - Category Preview Expansion

Goal: make every major kit category feel useful in previews.

Requirements:

- Audit current category gaps.
- Add missing preview templates by category.
- Prioritize categories with fewer realistic components.

Acceptance:

- Every major category has at least four useful preview contexts.

## Public Interfaces And Data Shapes

### Kit Typography

Future kits should support:

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

Existing kits with only `headingFont` and `bodyFont` must continue to work.

### Color Usage Preset

Future kits should support optional color usage guidance:

```json
{
  "colorUsage": {
    "preset": "enterprise-neutral",
    "label": "Enterprise Neutral",
    "ratios": [
      { "role": "neutralLayers", "label": "Neutral layers", "percent": 85 },
      { "role": "primaryAction", "label": "Primary action", "percent": 8 },
      { "role": "status", "label": "Status colors", "percent": 5 },
      { "role": "accent", "label": "Accent", "percent": 2 }
    ],
    "why": "Keeps product interfaces calm and scannable, with color reserved for actions, alerts, and important states.",
    "inspiredBy": ["IBM Carbon neutral layering"]
  }
}
```

If `colorUsage` is missing, default to Classic Balance or the best preset for the kit industry.

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

### Extraction Response

The current extraction response must remain valid:

```json
{
  "colors": ["#7c3aed"],
  "semantic": {},
  "domain": "example.com",
  "count": 1
}
```

Future optional fields:

```json
{
  "typography": {},
  "radii": {},
  "shadows": {},
  "spacing": {},
  "components": [],
  "sections": []
}
```

## Technical Requirements

- Share URL extraction logic between the local Express server and Vercel API route.
- Keep public URL extraction safe by default.
- Localhost and private network extraction must require explicit local/dev mode.
- Do not load all font files into the bundle.
- Load only selected fonts dynamically.
- Avoid exact website cloning; extract design signals and generate generic previews.

## Verification Requirements

Each feature chunk should include the smallest useful verification set:

- `npm run build`
- `npm run typecheck`
- `npm run check`
- future `npm run lint`
- future unit tests for new pure logic
- manual acceptance check for user-visible UI

Required test coverage over time:

- font role mapping and export generation
- backwards compatibility for old typography fields
- Google font URL generation
- palette similarity scoring
- URL extraction safety, including private URL blocking, localhost dev mode, redirects, and timeouts
- Create Kit flows: choose colors, choose fonts, preview, export, similar websites

## Success Metrics

| Metric | Target |
|---|---|
| Browse/Create -> export conversion | >25% |
| Create Kit users who edit typography | >35% |
| Similar Website panel engagement | >20% |
| URL extraction success rate for public sites | >60% |
| Avg session duration | >2 min |

## Assumptions

- Google Fonts ships first because it has an official metadata API.
- Fontshare starts as curated local data.
- Website inspiration starts as curated references, not live web search.
- Component and section extraction generates inspired preview templates, not exact clones.
- Large features must be broken into small, testable chunks before implementation.
