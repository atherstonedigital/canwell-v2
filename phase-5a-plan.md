# Phase 5A Implementation Plan: Canwell Interiors

> Produced via `/ultraplan` on 2026-05-11. Read alongside `canwell-phase-5-build-brief.md`. Resolve the open questions in §2 before the build session begins.

## 1. Scope confirmation & gaps

The brief's Phase 5A deliverable (lines 292–308) demands: a working staging site at `canwell-v2.netlify.app` with the homepage built in Next.js components pulling from Decap, `/admin` operational via Netlify Identity, design system fully ported, responsive at 900/640px, mobile menu working, and Lighthouse 95+ on all four scores.

**Source documents present in the repo** (verified via `ls`): the eight files match the brief's table EXCEPT one — `canwell-strategy-brief.md` is referenced as source #1 (brief lines 25, 144) but is **not in the repository**. The strategy framing instead sits inline in the brief's own opening sections plus the voice/tone doc. This is a documented gap, not a blocker for 5A code.

**Wave 1 homepage copy is complete** with five `{{PLACEHOLDER}}` types remaining: `{{YEAR_ESTABLISHED}}` (microcopy strip), `{{REVIEW_QUOTE_1..3}}` + reviewer name/location, `{{OPENING_HOURS_WEEKDAYS}}` and `{{OPENING_HOURS_SUNDAY}}` (visit block). Per working principle 8, render these visibly so Gary sees them in Decap.

**Mockup vs. Decap homepage singleton schema cross-check:**

| Mockup section | Schema field present? | Notes |
|---|---|---|
| Utility bar (`Open seven days · 01905 964994 · Cotswold Design Centre`) | NO field — driven from `site` singleton (phone, address) | Build agent must compose from site singleton |
| Site header / nav (sticky) | NO field in homepage schema — site nav is a global concern | Hard-code nav links in Header component (matches brief's "/components/layout") |
| Hero | hero_eyebrow, hero_pretitle, hero_title, hero_lead, hero_image | Schema covers it. Schema is missing a `hero_microcopy` list (mockup shows "FAMILY-RUN SINCE 1985 · OPEN SEVEN DAYS · FREE PARKING") — **add `hero_microcopy` (list of strings) to homepage singleton** |
| Hero CTAs (primary "Plan your visit", tertiary "Get the weekly update") | NO field — fixed copy per Wave 1 | Hard-code in Hero component, voice-rule compliant |
| Intro band | intro_eyebrow, intro_h2, intro_body | OK |
| Services (6 cards) | services_h2, services_intro, service_cards (6 inline) | Schema OK. Mockup omits `services_intro` lead text — keep field but optional |
| Design help feature | design_help_eyebrow, design_help_h2, design_help_body, design_help_image, design_help_saverys_note, design_help_stamps | OK. Mockup hard-codes CTAs ("Book a free consultation", "Or just visit and ask") — **add `design_help_primary_cta_label`/`url` and `design_help_secondary_cta_label`/`url`** OR hard-code |
| Brands strip | brands_eyebrow, brands_h2, brand_list (6 inline name+url) | OK |
| New in this week | new_in_eyebrow, new_in_h2, new_in_intro, new_in_items (relation, limit 3) | OK |
| Reviews | reviews_eyebrow, reviews_h2, featured_reviews (relation, limit 3) | OK. Mockup ends with "Read more on Google" tertiary CTA — hard-code with site.social_google_business URL |
| Email signup | email_eyebrow, email_h2, email_body, email_microcopy | OK. Schema has no field for the form button label or input placeholder — hard-code |
| Visit block | visit_eyebrow, visit_h2, visit_body, visit_image, visit_stamps | OK. Address/phone/email/hours pulled from `site` singleton, NOT homepage |
| Footer (4 cols, sister-family) | NO field — global, driven by site singleton + hard-coded service nav | Build in Footer component |

**Schema additions needed** (call these out to Dan for sign-off but include in the build):
- `hero_microcopy: list of strings` on homepage
- Either four CTA fields on the design help block OR hard-code them
- `intro_cta_label` + `intro_cta_url` (mockup omits, but wave-1 lists "See what we do →")
- `brands_intro` (Wave 1 has "Premium furniture and furnishings from the makers we trust" — the mockup uses "Premium *furniture and furnishings*, on the showroom floor"; surface as `brands_intro` text field)

## 2. Open questions for Dan/Gary (BLOCKERS)

1. **Repo identity.** Brief says "Repo name: canwell-interiors-site … start clean," but we are on `canwell-v2`, branch `claude/ultraplan-setup-uN9PW`. **Decision:** scaffold inside this repo (treat `canwell-v2` as the working name, ignore the brief's repo-name line) OR create `canwell-interiors-site` as a new GitHub repo and abandon this one? Recommend the former for continuity; the source docs already sit here.
2. **Netlify site provisioning.** Does `canwell-v2.netlify.app` exist? Has someone created the Netlify project, connected GitHub, and enabled Netlify Identity? The build agent cannot turn Identity on through code — it requires UI clicks in app.netlify.com. **Decision:** Dan creates the Netlify site + enables Identity (with "Invite only" registration) before the deploy step (4.11), OR confirm it's already done.
3. **Strategy brief location.** Brief lists `canwell-strategy-brief.md` as source doc #1 but it isn't in the repo. Is this redundant (positioning is implicit in voice/tone + sitemap), or do we need it added? Build agent will proceed without it.
4. **Placeholder treatment for photography.** Mockup uses CSS gradient blocks with the word "Photography" centred. Confirm: keep this treatment (recommended — matches mockup, zero asset weight, easiest for Gary to replace via Decap), OR something else? Stock images are out (voice/tone implications and licence cost).
5. **Visible placeholder rendering for `{{CURLY_BRACES}}` copy.** Build agent must show `{{REVIEW_QUOTE_1}}` etc. visibly in the staging site. Confirm: show literally as `{{...}}` in muted gold-pale block, OR substitute a "needs Gary input" pill component?
6. **Review-cards behaviour when fewer than 3 featured reviews exist.** Mockup expects exactly 3. Decap relation `limit: 3` allows 0–3. **Decision:** seed three from wave-1 placeholder text so the layout is always populated, or hide the section when empty?
7. **Phone number consistency.** Mockup uses `01905 964994`. Wave 1 doc uses the same number, but voice/tone calls out UK phone format. Confirm this is the live number (it appears Worcestershire-coded — Broadway is in Worcs/Glos border; sounds plausible).
8. **Klaviyo list ID for the email form.** Brief defers form wiring to Phase 5D, so 5A only stubs. Confirm the visible button reads "Sign me up" and on submit shows a non-functional confirmation, no network call.

## 3. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Lighthouse Performance 95+ with hero image + two webfont families | Use `next/font` (auto-subsets, self-hosts, eliminates render-blocking). Hero is currently a CSS gradient placeholder — keep as `<div>`, no LCP image. Only load Cormorant 400/500 (display) and DM Sans 300/400/500/600. Defer below-fold images via `next/image` `loading="lazy"`. |
| Lighthouse Accessibility — colour contrast on `gold-dark` (#8E6E2E) on `cream` (#F4EDDC) | Verify contrast: 4.62:1 on standard text — passes AA for normal body. Lead text uses `text-secondary` (#6B5F4E on cream) ~6.1:1 — fine. The risky pairing is `gold` (#B8924A) on `cream` ~3.1:1 — only used on rings/borders/decoration, never on type. Audit each use of gold-as-text. |
| Netlify Identity must be enabled in the Netlify UI before Decap login works | Document in Step 4.11 as a manual prerequisite. Block the DoD checkbox on Identity confirmed working. |
| Tailwind v4 + Next.js 15 compatibility | Tailwind v4 is the new CSS-first config (`@theme` blocks in CSS). The brief says `tailwind.config.ts` (v3-style). **Resolve in Step 4.2:** use Tailwind v4 with a `@theme` block in `globals.css`, drop the `.ts` config OR pin to Tailwind v3.4. Recommend Tailwind v4 with `@theme` — cleaner and matches v4's intended use. Update file path from `tailwind.config.ts` to `app/globals.css` `@theme` block. |
| Decap CMS + Netlify Identity sometimes fails on first load due to `redirect_uri` mismatch | Use `netlify-identity-widget` script in `/admin/index.html` per Decap's standard `gh-pages` template. |
| Sticky header `backdrop-filter: blur(8px)` not supported on older Safari | Mockup already includes a fallback `background: rgba(244, 237, 220, 0.95);` — keep it. |
| `next/image` does not optimise CSS-gradient placeholders (no images yet) | Not a problem in 5A. Real images arrive in 5B+. |

## 4. Build sequence

### 4.1 Project init
1. From `/home/user/canwell-v2`, run `npx create-next-app@latest .` (current dir) with flags: TypeScript yes, ESLint yes, Tailwind yes, App Router yes, `src/` directory no, import alias `@/*`.
2. Verify `next@15`, `react@19`, `tailwindcss@4` in `package.json`.
3. Add deps: `gray-matter`, `js-yaml`. (For client-side `/admin`, the standard pattern uses the CDN `<script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js">` in `public/admin/index.html`, no npm dep needed.)
4. Add dev deps: `@types/js-yaml`, `prettier`.
5. `tsconfig.json`: ensure `"strict": true`.
6. Create `.gitignore` additions: `.netlify/`, `.next/`, `node_modules/`.
7. Write `README.md` — local dev (`npm run dev`), Decap editing instructions, deploy notes.

### 4.2 Design tokens → Tailwind config
1. Replace `app/globals.css` with the Tailwind v4 directive set:
   ```
   @import "tailwindcss";
   @theme { /* tokens — see Section 5 */ }
   ```
2. Inside `@theme`, define every colour, font, spacing, font-size as `--color-gold`, `--font-display`, etc. (Tailwind v4 derives utilities like `bg-gold`, `text-cream`, `font-display` from these.)
3. Add a small CSS layer below for type clamps that exceed Tailwind's normal scale (hero, h1, h2, h3) — define as utility classes `.text-display-hero`, `.text-display-h1`, etc.
4. Add CSS for the signature ring motif (see Section 5.5 below) as a `@layer components` block since it uses pseudo-elements that Tailwind utilities can't express cleanly.
5. Define focus ring: `:focus-visible { outline: 2px solid var(--color-gold-dark); outline-offset: 2px }`.

### 4.3 Fonts & global styles
1. In `app/layout.tsx`, import `Cormorant_Garamond` (weights 400, 500, italic 400, italic 500) and `DM_Sans` (weights 300, 400, 500, 600) from `next/font/google`.
2. Expose as CSS variables `--font-cormorant`, `--font-dm-sans` on `<html>`.
3. Reference these in `globals.css` `@theme`: `--font-display: var(--font-cormorant), Georgia, serif;` and same for body.
4. Set `<body>` baseline: `font-family: var(--font-body)`, `background: var(--color-cream)`, antialiased, `text-rendering: optimizeLegibility`.

### 4.4 Signature components
Create under `components/signature/`:
1. `Rings.tsx` — props: `size: 'sm'|'md'|'lg'|'xl'`, `onDark?: boolean`, `children?: ReactNode`. Renders a div with the concentric border + 2 pseudo-elements (handled in CSS class `.rings .rings-md`). Children render inside (used for the section number).
2. `Stamp.tsx` — props: `line1: string`, `line2: string`, `onDark?: boolean`. Italic display line + caps line.
3. `SectionMarker.tsx` — props: `num: string` (e.g. "01"), `label: string`, `onDark?: boolean`. Uses `Rings` size sm + `<span class="num">` + `<span class="label">`.
4. `RuleRinged.tsx` — props: none. The gold line + ring + line divider.

### 4.5 Layout shell (Header, Footer, Nav, mobile menu)
Create under `components/layout/`:
1. `UtilityBar.tsx` — reads `site.opening_hours_*` summary, `site.phone`, `site.address_line_1`. Black background.
2. `Header.tsx` — sticky, cream/95 with backdrop blur. Logo (text-based brandmark per mockup, no SVG asset needed in 5A — `CI` ligature via the CSS `::before/::after` pattern in the tokens). Nav links to /carpets, /curtains, /blinds, /furniture, /soft-furnishings, /design-help. CTA button "Plan your visit" → /visit. Hides nav at `<980px`.
3. `MobileMenu.tsx` — client component. Hamburger button visible at `<980px`. Opens a full-screen overlay (cream background, large nav links, close button). Trap focus; close on `Esc`. Six service links + Plan-your-visit CTA.
4. `Footer.tsx` — black background, 4-col grid → 2-col at 900 → 1-col at 600. Reads address, phone, email from `site` singleton; `site.sister_site_*` URLs for "the wider family" column. Bottom row: copyright, /privacy /cookies /terms (these pages don't exist in 5A — render links but they 404; flag in DoD that 5B will populate them, OR set them to `#` for 5A).

### 4.6 Content loading utilities (`lib/content.ts`)
1. Export `getSite(): SiteSettings` — reads `content/singletons/site.md`, returns parsed frontmatter typed.
2. Export `getHomepage(): HomepageContent` — reads `content/singletons/homepage.md`.
3. Export `getReviews(): Review[]` and `getFeaturedReviews(slugs: string[]): Review[]` — reads `content/reviews/*.md`.
4. Export `getNewIn(): NewInItem[]` and `getNewInBySlugs(slugs: string[]): NewInItem[]`.
5. All functions are sync (file system at build time, RSC-friendly). Use `gray-matter` for frontmatter.
6. Define TypeScript interfaces alongside, exported.

### 4.7 Decap CMS setup
1. Create `public/admin/index.html` with the standard Decap shell (loads `decap-cms.js` from CDN, includes `netlify-identity-widget.js`).
2. Create `public/admin/config.yml` per Section 7 below.
3. Add the Netlify Identity script tag to `app/layout.tsx` `<head>` (one line: `<script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />`) plus a small client component that runs the redirect-on-login snippet from Decap's "Add to your site" guide.
4. `netlify.toml`: `[build] command = "next build" publish = ".next"`. `[[redirects]] from = "/admin/*" to = "/admin/index.html" status = 200`. Note: with Next.js on Netlify, `/admin` is served as static from `public/`, no redirect needed; verify.

### 4.8 Homepage section components
Create under `components/sections/`. Each is a Server Component receiving its slice of homepage props plus relations as needed:

1. `Hero.tsx` — props: `eyebrow`, `pretitle`, `title` (parses `*italic*` to `<em>`), `lead`, `microcopy[]`, `image?`. Renders the asymmetric grid; left = content, right = `hero-image` placeholder block with `Rings` label.
2. `Intro.tsx` — props: `eyebrow`, `h2`, `body`. Centred band, top + bottom border-light.
3. `Services.tsx` — props: `h2`, `intro?`, `cards: ServiceCard[]`. Renders 6 cards in 3-col grid (2-col @900, 1-col @600). Each card uses the hover ring effect from CSS.
4. `DesignHelp.tsx` — props: `eyebrow`, `h2`, `body` (markdown), `image?`, `saverysNote`, `stamps[]`. Asymmetric image-left layout. CTAs hard-coded: "Book a free consultation" → /design-help/in-store-consultation; "Or just visit and ask" → /design-help.
5. `Brands.tsx` — props: `eyebrow`, `h2` (with italic emphasis), `intro?`, `brands: {name, url}[]`. Centred name strip with `·` separators.
6. `NewIn.tsx` — props: `eyebrow`, `h2`, `intro`, `items: NewInItem[]`. Header has H2 + intro left, "Get the weekly update" secondary CTA right. 3-col grid of cards with the ringed "New" badge top-left.
7. `Reviews.tsx` — props: `eyebrow`, `h2`, `reviews: Review[]`. 3-col grid; each card has the concentric ring mark top-left, italic display quote, name, location. Tertiary CTA "Read more on Google" pulled from `site.social_google_business`.
8. `EmailSignup.tsx` — props: `eyebrow`, `h2`, `body`, `microcopy`. Black band with the radial-glow + ringed-glow background. Right column is the form inside a gold-bordered cream-light box. Submit handler stubbed (`onSubmit={(e) => e.preventDefault()}` and shows a "Thanks, this will work in launch week" inline message — voice-checked).
9. `Visit.tsx` — props: from homepage (`eyebrow`, `h2`, `body`, `image?`, `stamps[]`) PLUS site singleton (address, phone, email, hours). 2-col grid; map placeholder right.

### 4.9 Homepage page composition
1. `app/page.tsx` — Server Component. Calls `getSite()`, `getHomepage()`, `getReviews()`, `getNewIn()` plus selectors for relations. Composes the 9 sections in order. Sets `metadata` from homepage meta_title and meta_description fields (add these to the schema).
2. `app/layout.tsx` — wraps children with `<UtilityBar>`, `<Header>`, `{children}`, `<Footer>`. Sets default metadata, lang="en-GB".
3. Add `app/not-found.tsx` — minimal 404 with voice-compliant copy ("That page is not here. The showroom still is. [Plan your visit]"). British English, no banned vocabulary.

### 4.10 Seed Decap content from Wave 1 copy
For every singleton/collection, create the markdown files that the build will read on day one:

1. `content/singletons/site.md` — frontmatter with: site_name "Canwell Interiors", tagline "The Cotswolds furnishings showroom", address parts, phone "01905 964994", email "canwellcotswolds@gmail.com", year_established "{{YEAR_ESTABLISHED}}" (visible placeholder), opening hours placeholders, sister site URLs ("https://saverysofbroadway.co.uk" or `#` if unknown — flag), social URLs.
2. `content/singletons/homepage.md` — every field from Wave 1 verbatim. Hero title is `Walk in, *choose*, take home.` (italic via asterisks). Microcopy list: `["FAMILY-RUN SINCE {{YEAR_ESTABLISHED}}", "OPEN SEVEN DAYS", "FREE PARKING"]`.
3. `content/reviews/sarah-w.md`, `james-anna-h.md`, `david-m.md` — using the three placeholder review quotes that the mockup already shows (these read as real but are flagged in wave-1 as placeholders; render with a small visible "draft review" tag if the field `is_placeholder: true` is set — OR seed without the tag and ask Gary to swap).
4. `content/new-in/boucle-armchair.md`, `linen-cushion-edit.md`, `brass-table-lamp.md` — names + brand + meta line per the mockup.

### 4.11 Netlify deploy & Identity setup
1. **Pre-step (manual, Dan):** create Netlify site `canwell-v2`, link to GitHub repo, enable Netlify Identity (Invite only), enable Git Gateway, invite Gary's email.
2. Push to GitHub `main` (or whichever branch Netlify watches).
3. Verify build succeeds, site loads at `canwell-v2.netlify.app`.
4. Browse `/admin`, log in, verify homepage edits round-trip a Git commit.

### 4.12 Lighthouse pass & DoD checklist
1. Run Lighthouse on the deployed URL (mobile + desktop). Target 95+ on Performance, Accessibility, Best Practices, SEO.
2. Run `axe-core` (browser extension) on the homepage; resolve all violations.
3. Manual browser test at 1280, 900, 640 widths. Confirm: hero stacks at 900, services 3→2→1, design-help stacks at 900, reviews 3→1 at 900, footer 4→2→1.
4. Mobile menu opens/closes/traps focus/closes on Esc.
5. Tab through the page — every interactive element reachable, focus visible.
6. Console: zero errors.
7. Tick every box in the brief's "Definition of done" (lines 351–366) and notify Dan.

## 5. Tailwind config: extracted tokens

Source: `canwell-design-tokens-v2.html` lines 14–35 plus the signature CSS at lines 80–129.

### 5.1 Colours (define as `--color-*` in `@theme`)
- `gold` `#B8924A` · `gold-dark` `#8E6E2E` · `gold-light` `#D4B27D` · `gold-pale` `#EFE0BD`
- `black` `#1A1614` · `black-soft` `#2A2520`
- `cream` `#F4EDDC` · `cream-light` `#FAF6EC` · `cream-tinted` `#E9DFC8`
- `text-primary` `#2A2520` · `text-secondary` `#6B5F4E` · `text-muted` `#9B8F7E` · `text-on-dark` `#F4EDDC`
- `border-light` `#E0D4BC` · `border-medium` `#C4B496` · `border-strong` `#2A2520`

### 5.2 Fonts
- `--font-display: var(--font-cormorant), Georgia, serif;`
- `--font-body: var(--font-dm-sans), -apple-system, BlinkMacSystemFont, sans-serif;`

### 5.3 Type scale (define as `--text-*` so utilities like `text-display-h1` exist)
- `display-hero: clamp(3.5rem, 9vw, 7.5rem)` line-height 0.95, weight 400
- `display-h1: clamp(2.5rem, 5vw, 4.5rem)` line-height 1.0, weight 500
- `display-h2: clamp(2rem, 4vw, 3.25rem)` line-height 1.05, weight 500
- `display-h3: clamp(1.5rem, 3vw, 2.125rem)` line-height 1.15, weight 500
- `h4: 1.25rem` (DM Sans 600), `lead: 1.3125rem` (DM Sans 300, line 1.55), `body: 1.0625rem` (line 1.6), `small: 0.9375rem`, `caption: 0.8125rem` (letter-spacing 0.04em)
- `eyebrow` is a *utility class*, not a font-size: DM Sans 500, 0.8125rem, letter-spacing 0.18em, uppercase, colour `gold-dark`
- Letter-spacing tokens: `display: -0.015em`, `eyebrow: 0.18em`, `caption: 0.04em`

### 5.4 Spacing (`--spacing-*`)
- `1: 4px`, `2: 8px`, `3: 12px`, `4: 16px`, `5: 24px`, `6: 32px`, `7: 48px`, `8: 64px`, `9: 96px`, `10: 128px`, `11: 160px`
- Container: `--container-max: 1320px` (mockup) — use 1320 not the 1280 in the tokens HTML; the mockup is the layout reference, container-pad `clamp(20px, 5vw, 80px)`

### 5.5 Signature ring motif utilities
Implement as CSS in `@layer components` (Tailwind utilities can't express the dual `::before`/`::after` rings cleanly). Port verbatim from the tokens HTML (lines 81–93 for `.rings`, 95–103 for `.section-marker`, 106–124 for `.stamp`, 127–129 for `.rule-ringed`). Sizes: `rings-sm 40px`, `rings-md 56px`, `rings-lg 96px`, `rings-xl 140px`, `stamp 110px` (matches mockup; tokens HTML had 120px — defer to mockup). Add `.rings-on-dark` and `.stamp-on-dark` variants (border-color → `gold-light`).

Service-card hover effect (the dual expanding rings on hover): port lines 274–283 of tokens HTML / 356–365 of mockup verbatim — `::before` and `::after` rings opacity 0 → 0.7/0.25, scale animations.

### 5.6 Buttons
Implement as CSS classes (`.btn`, `.btn-primary`, `.btn-gold`, `.btn-secondary`, `.btn-tertiary`, plus `-on-dark` variants). Port from mockup lines 157–181. Don't try to do these as one-off Tailwind utility composition — they have hover transitions and pseudo-elements.

## 6. Homepage section ↔ Decap field mapping

| Section component | Reads from | Mockup ref (line) |
|---|---|---|
| `UtilityBar` | site.opening_hours_*, site.phone, site.address_line_1 | 767–775 |
| `Header` | (hard-coded nav + logo); CTA url to /visit | 778–796 |
| `Hero` | homepage.hero_eyebrow, hero_pretitle, hero_title, hero_lead, hero_image, hero_microcopy[] | 799–830 |
| `Intro` | homepage.intro_eyebrow, intro_h2, intro_body | 833–841 |
| `Services` | homepage.services_h2, services_intro, service_cards[6] (title, body, link_label, target) | 844–910 |
| `DesignHelp` | homepage.design_help_eyebrow, design_help_h2, design_help_body, design_help_image, design_help_saverys_note, design_help_stamps[] | 913–947 |
| `Brands` | homepage.brands_eyebrow, brands_h2, brands_intro, brand_list[6] (name, url) | 950–971 |
| `NewIn` | homepage.new_in_eyebrow, new_in_h2, new_in_intro, new_in_items (relation → new-in collection) | 974–1012 |
| `Reviews` | homepage.reviews_eyebrow, reviews_h2, featured_reviews (relation → reviews); site.social_google_business for the tertiary CTA url | 1015–1044 |
| `EmailSignup` | homepage.email_eyebrow, email_h2, email_body, email_microcopy | 1047–1068 |
| `Visit` | homepage.visit_eyebrow, visit_h2, visit_body, visit_image, visit_stamps[]; site.address_*, site.phone, site.email, site.opening_hours_* | 1071–1118 |
| `Footer` | site.address_*, site.phone, site.email, site.sister_site_*; (hard-coded service nav + about nav + bottom links) | 1121–1174 |

## 7. Decap config.yml shape

```yaml
backend:
  name: git-gateway
  branch: main
media_folder: public/uploads
public_folder: /uploads

collections:
  - name: site
    label: Site settings
    files:
      - file: content/singletons/site.md
        name: site
        label: Site
        fields:
          - {name: site_name, widget: string}
          - {name: tagline, widget: string}
          - {name: address_line_1, widget: string}
          - {name: address_line_2, widget: string}
          - {name: postcode, widget: string}
          - {name: phone, widget: string}
          - {name: email, widget: string}
          - {name: opening_hours_weekday, widget: string}
          - {name: opening_hours_saturday, widget: string}
          - {name: opening_hours_sunday, widget: string}
          - {name: year_established, widget: string}
          - {name: sister_site_saverys_url, widget: string, required: false}
          - {name: sister_site_xshowhome_url, widget: string, required: false}
          - {name: social_facebook, widget: string, required: false}
          - {name: social_instagram, widget: string, required: false}
          - {name: social_google_business, widget: string, required: false}

  - name: homepage
    label: Homepage
    files:
      - file: content/singletons/homepage.md
        name: homepage
        label: Homepage
        fields:
          - {name: meta_title, widget: string}
          - {name: meta_description, widget: text}
          - {name: hero_eyebrow, widget: string}
          - {name: hero_pretitle, widget: string}
          - {name: hero_title, widget: string, hint: "Use *asterisks* for italic emphasis"}
          - {name: hero_lead, widget: text}
          - {name: hero_image, widget: image, required: false}
          - name: hero_microcopy
            widget: list
            field: {name: text, widget: string}
          - {name: intro_eyebrow, widget: string}
          - {name: intro_h2, widget: string}
          - {name: intro_body, widget: text}
          - {name: services_h2, widget: string}
          - {name: services_intro, widget: text, required: false}
          - name: service_cards
            widget: list
            max: 6
            min: 6
            fields:
              - {name: title, widget: string}
              - {name: body, widget: string}
              - {name: link_label, widget: string}
              - {name: link_url, widget: string}
          - {name: design_help_eyebrow, widget: string}
          - {name: design_help_h2, widget: string}
          - {name: design_help_body, widget: markdown}
          - {name: design_help_image, widget: image, required: false}
          - {name: design_help_saverys_note, widget: text}
          - name: design_help_stamps
            widget: list
            max: 3
            fields:
              - {name: title, widget: string}
              - {name: subtitle, widget: string}
          - {name: brands_eyebrow, widget: string}
          - {name: brands_h2, widget: string}
          - {name: brands_intro, widget: text, required: false}
          - name: brand_list
            widget: list
            max: 6
            fields:
              - {name: name, widget: string}
              - {name: url, widget: string}
          - {name: new_in_eyebrow, widget: string}
          - {name: new_in_h2, widget: string}
          - {name: new_in_intro, widget: text}
          - name: new_in_items
            widget: relation
            collection: new-in
            value_field: '{{slug}}'
            search_fields: [name, brand]
            display_fields: [name, brand]
            multiple: true
            max: 3
          - {name: reviews_eyebrow, widget: string}
          - {name: reviews_h2, widget: string}
          - name: featured_reviews
            widget: relation
            collection: reviews
            value_field: '{{slug}}'
            search_fields: [name, location, quote]
            display_fields: [name, location]
            multiple: true
            max: 3
          - {name: email_eyebrow, widget: string}
          - {name: email_h2, widget: string}
          - {name: email_body, widget: text}
          - {name: email_microcopy, widget: string}
          - {name: visit_eyebrow, widget: string}
          - {name: visit_h2, widget: string}
          - {name: visit_body, widget: text}
          - {name: visit_image, widget: image, required: false}
          - name: visit_stamps
            widget: list
            max: 3
            fields:
              - {name: title, widget: string}
              - {name: subtitle, widget: string}

  - name: reviews
    label: Reviews
    folder: content/reviews
    create: true
    slug: '{{slug}}'
    fields:
      - {name: quote, widget: text}
      - {name: name, widget: string}
      - {name: location, widget: string}
      - {name: featured, widget: boolean, default: false}
      - {name: date, widget: datetime}

  - name: new-in
    label: New in this week
    folder: content/new-in
    create: true
    slug: '{{slug}}'
    fields:
      - {name: name, widget: string}
      - {name: brand, widget: string}
      - {name: meta_label, widget: string, hint: "e.g. IN STOCK, LAST TWO, TEN COLOURS IN STORE"}
      - {name: image, widget: image, required: false}
      - {name: status, widget: select, options: [in_stock, sold]}
      - {name: date_added, widget: datetime}
```

## 8. Voice rules for any generated microcopy

When the build agent writes any string not in the source docs (mobile menu close button, 404 body, form submission stub, alt text fallback, `<title>` for /admin), it must:

- **Never use em or en dashes** (commas, full stops, colons, parentheses only; en dash only in numeric ranges).
- **British English** throughout: colour, organised, recognise, behaviour, centre.
- **Sentence case in headings.** "Plan your visit" — not "Plan Your Visit", not "PLAN YOUR VISIT" (the only ALL-CAPS allowed is intentional eyebrow/caption styling done via CSS `text-transform`, never typed).
- **Banned vocabulary** (verbatim): bespoke (unless naming the MTM service), curate/curated, vision, ethos, story (the brand has none), aesthetic, signature style, statement piece, design-led, design-forward, luxury, luxurious, exquisite, sumptuous, opulent, refined, sophisticated, premium (sparingly only on brand stockist pages), discerning, elevate, elevated, the finest, the very best, world-class, nestled, picturesque, idyllic, quintessential, charming, chocolate-box, the heart of, hidden gem, passionate, strive, dedicated, customer-centric, end-to-end, holistic, comprehensive, seamless, leverage, robust, dynamic, delve, dive into, navigate (metaphor), tapestry, landscape (metaphor), realm, pivotal, underscore, foster, testament, harness, illuminate, unlock, vibrant, rich (metaphorical), in today's fast-paced world.
- **No AI tells**: no "It's not just X, it's Y" parallelism, no rule-of-three by default, no trailing puffery participles, no "We're delighted to…" / "Here at Canwell…".
- **Naming**: brand is "Canwell" or "Canwell Interiors" (never "the boutique", "the destination"). Town is "Broadway" / "Broadway in the Cotswolds". Region is "the Cotswolds" / "North Cotswolds" — never "the heart of the Cotswolds".
- **Numbers**: words for one to nine, numerals for 10+. UK phone format: `01905 964994`. Postcode: `WR12 7DJ`.
- **CTAs from the standard set** where possible: "Plan your visit", "Book a free consultation", "Get the weekly update", "Call the showroom", "Get directions". Never "Get in touch", "Learn more", "Click here".
