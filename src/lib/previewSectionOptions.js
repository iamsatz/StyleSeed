export const PREVIEW_SECTION_OPTIONS = {
  dashboard: [
    { key: 'nav', label: 'Navigation', variants: [
      { id: 'sidebar-dark', label: 'Dark sidebar' },
      { id: 'sidebar-light', label: 'Light sidebar' },
      { id: 'topbar', label: 'Top bar' },
    ]},
    { key: 'stats', label: 'Stats row', variants: [
      { id: 'metric-cards', label: 'Metric cards' },
      { id: 'sparklines', label: 'Sparklines' },
      { id: 'inline', label: 'Inline stats' },
    ]},
    { key: 'chart', label: 'Main chart', variants: [
      { id: 'bar', label: 'Bar chart' },
      { id: 'line', label: 'Line chart' },
      { id: 'area', label: 'Area chart' },
    ]},
    { key: 'activity', label: 'Activity', variants: [
      { id: 'feed', label: 'Activity feed' },
      { id: 'table', label: 'Recent table' },
      { id: 'actions', label: 'Quick actions' },
    ]},
  ],
  blog: [
    { key: 'header', label: 'Header', variants: [
      { id: 'hero', label: 'Full hero' },
      { id: 'masthead', label: 'Masthead' },
      { id: 'featured', label: 'Featured story' },
    ]},
    { key: 'grid', label: 'Post layout', variants: [
      { id: 'three-col', label: '3-column' },
      { id: 'featured-list', label: 'Featured + list' },
      { id: 'magazine', label: 'Magazine' },
    ]},
    { key: 'sidebar', label: 'Sidebar', variants: [
      { id: 'tags-recent', label: 'Tags & recent' },
      { id: 'newsletter', label: 'Newsletter CTA' },
      { id: 'author', label: 'About author' },
    ]},
  ],
  ecommerce: [
    { key: 'banner', label: 'Hero banner', variants: [
      { id: 'promo', label: 'Promo banner' },
      { id: 'categories', label: 'Category strip' },
      { id: 'sale', label: 'Sale header' },
    ]},
    { key: 'filters', label: 'Filter bar', variants: [
      { id: 'chips', label: 'Filter chips' },
      { id: 'sidebar-filters', label: 'Sidebar + grid' },
      { id: 'dropdown', label: 'Dropdowns' },
    ]},
    { key: 'products', label: 'Product grid', variants: [
      { id: 'four-col', label: '4-column' },
      { id: 'three-col', label: '3-column' },
      { id: 'list', label: 'List view' },
    ]},
  ],
  product: [
    { key: 'gallery', label: 'Gallery', variants: [
      { id: 'stack', label: 'Image stack' },
      { id: 'hero', label: 'Single hero' },
      { id: 'thumbnails', label: 'Thumbnails' },
    ]},
    { key: 'info', label: 'Product info', variants: [
      { id: 'stacked', label: 'Stacked' },
      { id: 'side-by-side', label: 'Side by side' },
      { id: 'compact', label: 'Compact' },
    ]},
    { key: 'reviews', label: 'Reviews', variants: [
      { id: 'full', label: 'Full reviews' },
      { id: 'summary', label: 'Star summary' },
      { id: 'testimonials', label: 'Testimonials' },
    ]},
  ],
  pricing: [
    { key: 'header', label: 'Header', variants: [
      { id: 'centered', label: 'Centered' },
      { id: 'split', label: 'Split' },
    ]},
    { key: 'plans', label: 'Plan cards', variants: [
      { id: 'three-col', label: '3-column' },
      { id: 'two-col', label: '2-column' },
      { id: 'table', label: 'Feature table' },
    ]},
    { key: 'faq', label: 'FAQ', variants: [
      { id: 'accordion', label: 'Accordion' },
      { id: 'grid', label: 'Grid' },
    ]},
  ],
  signin: [
    { key: 'layout', label: 'Layout', variants: [
      { id: 'centered', label: 'Centered card' },
      { id: 'split', label: 'Split panel' },
      { id: 'full-bleed', label: 'Full bleed' },
    ]},
    { key: 'form', label: 'Auth method', variants: [
      { id: 'standard', label: 'Email + password' },
      { id: 'magic-link', label: 'Magic link' },
      { id: 'social-first', label: 'Social first' },
    ]},
  ],
  signup: [
    { key: 'layout', label: 'Layout', variants: [
      { id: 'single', label: 'Single step' },
      { id: 'multi-step', label: 'Multi-step' },
      { id: 'split', label: 'Split panel' },
    ]},
    { key: 'form', label: 'Form style', variants: [
      { id: 'basic', label: 'Basic' },
      { id: 'detailed', label: 'With details' },
      { id: 'social-first', label: 'Social first' },
    ]},
  ],
  settings: [
    { key: 'layout', label: 'Layout', variants: [
      { id: 'sidebar-tabs', label: 'Sidebar tabs' },
      { id: 'top-tabs', label: 'Top tabs' },
      { id: 'accordion', label: 'Accordion' },
    ]},
    { key: 'section', label: 'Active section', variants: [
      { id: 'profile', label: 'Profile' },
      { id: 'account', label: 'Account' },
      { id: 'notifications', label: 'Notifications' },
    ]},
  ],
  profile: [
    { key: 'header', label: 'Profile header', variants: [
      { id: 'cover', label: 'Cover + avatar' },
      { id: 'centered', label: 'Centered' },
      { id: 'minimal', label: 'Minimal' },
    ]},
    { key: 'about', label: 'About section', variants: [
      { id: 'bio-skills', label: 'Bio + skills' },
      { id: 'stats', label: 'Stats row' },
      { id: 'no-sidebar', label: 'No sidebar' },
    ]},
    { key: 'work', label: 'Work section', variants: [
      { id: 'project-grid', label: 'Project grid' },
      { id: 'case-studies', label: 'Case studies' },
      { id: 'services', label: 'Services list' },
    ]},
  ],
  docs: [
    { key: 'sidebar', label: 'Sidebar', variants: [
      { id: 'full-tree', label: 'Full tree' },
      { id: 'compact', label: 'Compact' },
      { id: 'categories', label: 'Categories' },
    ]},
    { key: 'content', label: 'Content area', variants: [
      { id: 'wide', label: 'Wide body' },
      { id: 'with-toc', label: 'With TOC' },
    ]},
    { key: 'code', label: 'Code blocks', variants: [
      { id: 'highlighted', label: 'Highlighted' },
      { id: 'terminal', label: 'Terminal' },
      { id: 'tabbed', label: 'Tabbed' },
    ]},
  ],
  admin: [
    { key: 'toolbar', label: 'Toolbar', variants: [
      { id: 'search-filters', label: 'Search + filters' },
      { id: 'bulk-actions', label: 'Bulk actions' },
    ]},
    { key: 'table', label: 'Table style', variants: [
      { id: 'full-data', label: 'Full data' },
      { id: 'compact', label: 'Compact' },
      { id: 'card-view', label: 'Card view' },
    ]},
    { key: 'pagination', label: 'Pagination', variants: [
      { id: 'simple', label: 'Simple' },
      { id: 'page-selector', label: 'Page selector' },
    ]},
  ],
  onboarding: [
    { key: 'progress', label: 'Progress style', variants: [
      { id: 'steps-bar', label: 'Steps bar' },
      { id: 'checklist', label: 'Checklist' },
      { id: 'ring', label: 'Progress ring' },
    ]},
    { key: 'content', label: 'Content layout', variants: [
      { id: 'single-focus', label: 'Single focus' },
      { id: 'split', label: 'Split' },
      { id: 'with-sidebar', label: 'With sidebar' },
    ]},
    { key: 'cta', label: 'CTA style', variants: [
      { id: 'big-primary', label: 'Big primary' },
      { id: 'dual-action', label: 'Dual action' },
    ]},
  ],
  restaurant: [
    { key: 'header', label: 'Header', variants: [
      { id: 'hero', label: 'Full hero' },
      { id: 'cover', label: 'Cover photo' },
      { id: 'compact', label: 'Compact bar' },
    ]},
    { key: 'menu', label: 'Menu layout', variants: [
      { id: 'tabs', label: 'Category tabs' },
      { id: 'sections', label: 'Sections' },
    ]},
    { key: 'items', label: 'Item style', variants: [
      { id: 'cards', label: 'Cards' },
      { id: 'list', label: 'List' },
      { id: 'large-image', label: 'Large image' },
    ]},
  ],
  realestate: [
    { key: 'search', label: 'Search bar', variants: [
      { id: 'prominent', label: 'Prominent' },
      { id: 'filter-bar', label: 'Filter bar' },
    ]},
    { key: 'listings', label: 'Listings', variants: [
      { id: 'three-col', label: '3-column grid' },
      { id: 'two-col', label: '2-column' },
      { id: 'list', label: 'List view' },
    ]},
    { key: 'card', label: 'Property card', variants: [
      { id: 'full', label: 'Full details' },
      { id: 'minimal', label: 'Minimal' },
      { id: 'featured', label: 'Featured' },
    ]},
  ],
  jobs: [
    { key: 'search', label: 'Search', variants: [
      { id: 'top-bar', label: 'Top bar' },
      { id: 'sidebar', label: 'Sidebar filters' },
    ]},
    { key: 'list', label: 'Job list style', variants: [
      { id: 'list', label: 'List' },
      { id: 'grid', label: 'Grid cards' },
      { id: 'compact', label: 'Compact' },
    ]},
    { key: 'card', label: 'Job card', variants: [
      { id: 'full', label: 'Full details' },
      { id: 'summary', label: 'Summary' },
    ]},
  ],
  analytics: [
    { key: 'kpis', label: 'KPI row', variants: [
      { id: 'metric-cards', label: 'Metric cards' },
      { id: 'sparklines', label: 'Sparklines' },
      { id: 'progress', label: 'Progress bars' },
    ]},
    { key: 'chart', label: 'Main chart', variants: [
      { id: 'bar', label: 'Bar chart' },
      { id: 'line', label: 'Line chart' },
      { id: 'donut', label: 'Donut' },
    ]},
    { key: 'table', label: 'Data table', variants: [
      { id: 'transactions', label: 'Transactions' },
      { id: 'events', label: 'Events log' },
      { id: 'pages', label: 'Top pages' },
    ]},
  ],
  error: [
    { key: 'layout', label: 'Layout', variants: [
      { id: 'centered', label: 'Centered' },
      { id: 'left', label: 'Left-aligned' },
      { id: 'full-screen', label: 'Full screen' },
    ]},
    { key: 'recovery', label: 'Recovery actions', variants: [
      { id: 'search-links', label: 'Search + links' },
      { id: 'back-home', label: 'Back + home' },
      { id: 'contact', label: 'Contact support' },
    ]},
  ],
  waitlist: [
    { key: 'hero', label: 'Hero style', variants: [
      { id: 'bold', label: 'Bold headline' },
      { id: 'split', label: 'Split panel' },
      { id: 'countdown', label: 'With countdown' },
    ]},
    { key: 'proof', label: 'Social proof', variants: [
      { id: 'counter', label: 'Signup counter' },
      { id: 'testimonials', label: 'Testimonials' },
      { id: 'logos', label: 'Trusted by' },
    ]},
    { key: 'form', label: 'Form style', variants: [
      { id: 'email-only', label: 'Email only' },
      { id: 'full', label: 'Full form' },
      { id: 'with-perks', label: 'With perks' },
    ]},
  ],
}

export function getDefaultSections(previewId) {
  const sections = PREVIEW_SECTION_OPTIONS[previewId]
  if (!sections) return {}
  return sections.reduce((acc, s) => {
    acc[s.key] = s.variants[0].id
    return acc
  }, {})
}

export function getPreviewSections(previewId) {
  return PREVIEW_SECTION_OPTIONS[previewId] || []
}
