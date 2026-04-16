# CUPRA Electric & Hybrid Page Migration Plan

## Source Page
**URL:** `https://www.cupraofficial.co.uk/electric-and-hybrid`

## Project Context
- **Project type:** Crosswalk (xwalk) — Universal Editor authoring
- **AEM Author:** `author-p135360-e1341441.adobeaemcloud.com`
- **Existing blocks:** Hero, Cards, Carousel, Columns, Tabs, Accordion, Table, Embed, Form, Fragment, Modal, Quote, Search, Video
- **Default content:** Text, Title, Image, Button

---

## Page Structure & Block Mapping

The source page has **13 identifiable content areas**. After excluding non-authorable elements (cookie banner, global header/footer, breadcrumbs), the following **11 sections** map to existing crosswalk blocks or default content:

| # | Source Component | EDS Block | Variant Needed? | Notes |
|---|---|---|---|---|
| 1 | Secondary sub-nav | **Excluded** | — | Utility navigation, not authorable content |
| 2 | Hero banner (`hero-ev`) | **Hero** | No | Image + H1 + paragraph. Standard hero model fits perfectly |
| 3 | Model comparison carousel (`model-table`) | **Cards** | Yes — `cards (model-specs)` | 6 vehicle cards with image, title, type label, spec rows. Needs custom CSS for specs layout and filter chips JS |
| 4 | EV vs PHEV comparison (`info-cards extended`) | **Columns** (2-col) | Yes — styling | 2 side-by-side cards, each with image + H3 + 3 feature items (H4+p) + CTA. Columns block structure works; needs CSS for card-style appearance |
| 5 | Icon cards — "Find Your CUPRA" (`icon-cards`) | **Cards** | Yes — `cards (icon)` | 3 cards with icon + H3 + text + CTA button. Needs icon support and button styling |
| 6 | Advantages feature showcase (`smooth-vertical-slide`) | **Carousel** | No | 4 slides with background image + H3 + text. Standard carousel-item model fits |
| 7 | Banner — "Book a Test Drive" (`banner`) | **Hero** | Yes — `hero (banner)` | Background image + H2 + text + CTA link. Hero model supports this; needs banner-variant CSS |
| 8 | Two-column — "Charging Map" (`two-columns`) | **Columns** (2-col) | No | Image column + text column with app store badge links. Standard columns |
| 9 | Two-column — "CUPRA Connect" (`two-columns`) | **Columns** (2-col) | No | Image column + text column + CTA button. Standard columns |
| 10 | Info cards carousel (`info-cards standard`) | **Cards** | No | 4 cards with image + H3 + CTA link. Standard cards model |
| 11 | Banner — "EV FAQs" (`banner`) | **Hero** | Yes — reuse `hero (banner)` | Same pattern as #7: background image + H2 + text + CTA |
| 12 | Disclaimer text | **Default content** (text) | No | Small legal footnote paragraph |
| 13 | Newsletter sign-up | **Default content** (title + button) | No | H4 heading + CTA link |

---

## Section Layout (EDS Sections)

The page translates to **9 authored sections** in Universal Editor:

| Section | Content | Style |
|---|---|---|
| **Section 1** | Hero block (full-width banner) | `hero-section` |
| **Section 2** | H2 "Electric and hybrid vehicles" + Cards (model-specs) block | `dark-bg` |
| **Section 3** | H2 + intro text + Columns block (EV vs PHEV comparison) | `dark-bg` |
| **Section 4** | H2 "Find Your CUPRA" + Cards (icon) block | `dark-bg` |
| **Section 5** | H2 + intro text + Carousel block (4 advantage slides) | `dark-bg` |
| **Section 6** | Hero (banner variant) — "Book a Test Drive" | `banner-section` |
| **Section 7** | Columns block (Charging Map) + Columns block (CUPRA Connect) | `dark-bg` |
| **Section 8** | Cards block (More EV info) | `dark-bg` |
| **Section 9** | Hero (banner variant) — "EV FAQs" + disclaimer text + newsletter CTA | `banner-section` |

---

## Custom Work Required

### New Block Variants (CSS only — reuse existing JS)
1. **`cards (model-specs)`** — Vehicle spec card layout with type label, spec rows, and horizontal scroll
2. **`cards (icon)`** — Icon-style cards with centered icon, heading, text, and CTA button
3. **`hero (banner)`** — CTA banner variant with background image, left-aligned text overlay, and call-to-action link

### New Section Styles
4. **`dark-bg`** — Dark background theme (matches CUPRA brand dark palette) with light text
5. **`banner-section`** — Full-bleed section for banner-style hero blocks

### CSS Design Tokens
6. **Brand colours** — CUPRA copper/bronze accent, dark backgrounds, light text
7. **Typography** — Headings use existing Roboto fonts; may need weight/size adjustments

### JavaScript Enhancements
8. **Model filter chips** (Section 2) — Optional: JS to filter cards by "All / Electric / e-HYBRID" using data attributes

---

## Exclusions (Non-Authorable)
- Cookie consent banner
- Global header / navigation
- Global footer
- Breadcrumb trail
- Secondary sub-navigation bar (anchored link bar)
- Any JavaScript-driven utility overlays

---

## Migration Approach

This migration will use the `excat-site-migration` skill to:
1. Analyse the page and classify content sections
2. Generate import infrastructure (parsers + transformers)
3. Map source DOM selectors to crosswalk block structures
4. Create the HTML content file with proper block tables
5. Create custom block variant CSS for `cards (model-specs)`, `cards (icon)`, and `hero (banner)`
6. Apply CUPRA dark-theme section styling
7. Validate the rendered output against the source page

---

## Checklist

- [ ] Run site analysis and create page template skeleton
- [ ] Analyse page structure and map DOM selectors to blocks
- [ ] Create block mappings in page template (hero, cards, columns, carousel)
- [ ] Build import infrastructure (parsers for each block type)
- [ ] Generate page transformer for section structure
- [ ] Create `cards (model-specs)` variant CSS for vehicle spec cards
- [ ] Create `cards (icon)` variant CSS for icon CTA cards
- [ ] Create `hero (banner)` variant CSS for CTA banners
- [ ] Add `dark-bg` and `banner-section` section styles
- [ ] Extract and apply CUPRA brand design tokens (colours, typography)
- [ ] Run content import to generate HTML
- [ ] Preview and validate rendered page against source
- [ ] Fix any visual discrepancies or content gaps
- [ ] Verify Universal Editor authorability (block models, field hints)

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| Model comparison filter chips require custom JS | Implement as progressive enhancement; cards still render without filtering |
| Vehicle spec data is structured/tabular | Use richtext field in card model with semantic HTML (definition lists) |
| Dark theme needs consistent application | Apply via section-level `dark-bg` style class rather than per-block |
| App store badge images in Charging Map section | Author as image links within columns default content |
| Source uses Swiper.js carousels | EDS carousel block has built-in slide behaviour — no Swiper dependency needed |

---

> **Note:** Execution of this plan requires switching to Execute mode. The `excat-site-migration` skill will orchestrate the full workflow.
