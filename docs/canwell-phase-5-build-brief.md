# Canwell Interiors: Phase 5 Build Brief

**The build phase. Where the strategy becomes a working site.**
*Prepared by Dan Atherstone, Atherstone Digital | May 2026*
*For execution via Claude Code, with phase gates*

---

## What this document is

This document is the spine for Phase 5: building the Canwell Interiors website. It does two jobs.

The first half is the **Phase 5 master plan**: how the build is sequenced, what each sub-phase produces, and where the review gates sit. This is for Gary and me to align on before any code is written.

The second half is the **Claude Code system prompt for Phase 5A (scaffold)**: a ready-to-paste prompt that initialises the Next.js project, ports the design system, sets up Decap CMS, and builds the homepage as a working staging site. Subsequent sub-phase prompts (5B, 5C, 5D, 5E) follow as separate briefs after each gate.

---

## Source documents

Eight existing deliverables are the source of truth. Claude Code should be pointed at all of them at the start of every Phase 5 session.

| # | Document | Location | What it locks |
|---|---|---|---|
| 1 | Strategy brief | canwell-strategy-brief.md | Positioning, segments, metrics |
| 2 | Sitemap & content map | canwell-sitemap-and-content-map.md | Page architecture, SEO map |
| 3 | Voice & Tone brief | canwell-voice-and-tone.md | Tone, banned vocabulary, AI tells |
| 4 | Photography brief & shot list | canwell-photography-brief.md | Image direction (for when photography arrives) |
| 5 | Wave 1 launch copy | canwell-wave-1-copy.md | Full copy for the 10 launch-essential pages |
| 6 | Wave 2 launch copy | canwell-wave-2-copy.md | Full copy for sub-pages, brands, locations, articles |
| 7 | Design tokens v2 | canwell-design-tokens-v2.html | Colour, type, spacing, components, signature motif |
| 8 | Homepage mockup | canwell-homepage-mockup.html | Full page reference: layout, components, signature in context |

The build copies from these documents. It does not invent content, layout, voice, or visual decisions.

---

## Stack and infrastructure (locked)

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Matches Saverys for operational consistency |
| Language | TypeScript (strict) | Maintainability, fewer runtime errors |
| Styling | Tailwind CSS v4 | Ports cleanly from the design tokens HTML |
| Fonts | next/font (Cormorant Garamond, DM Sans) | Zero FOIT/FOUT, self-hosted, free |
| CMS | Decap CMS at /admin | Git-based, matches Saverys, no external service cost |
| Auth | Netlify Identity for Decap login | Standard Decap pattern on Netlify |
| Images | next/image with sharp | Optimisation, lazy loading, responsive |
| Schema | JSON-LD via custom utility | Per-page schema generation |
| Sitemap | next-sitemap (or app/sitemap.ts) | Auto-generated on build |
| Hosting | Netlify | Existing relationship, Decap-native, ISR support |
| Domain | canwellinteriors.com | Existing, currently pointing to GoDaddy WebsiteBuilder (to be cut over at launch) |

---

## Phase 5 at a glance

Five sub-phases. Each has its own Claude Code prompt, deliverable, and review gate.

### Phase 5A: Scaffold and infrastructure

Initialise the Next.js project. Port the design tokens into Tailwind config. Set up Decap CMS with content models matching the Wave 1 and Wave 2 page structures. Build the base component library. Build the homepage as the first complete page, pulling from Decap. Deploy to a Netlify staging subdomain.

**Deliverable:** A working staging site at `canwell-v2.netlify.app` showing the homepage with all sections, all interactions, the design system fully working. Decap admin at `/admin` operational. Content for the homepage editable through Decap.

**Gate:** Gary and Dan review the homepage on staging before Phase 5B begins.

### Phase 5B: Wave 1 pages

The remaining nine Wave 1 launch-essential pages: Visit, About, Contact, and the six service hubs (Carpets, Curtains, Blinds, Furniture, Soft Furnishings, Design Help). Each page reads from a Decap content model and uses the patterns established in the homepage.

**Deliverable:** All 10 Wave 1 pages live on staging, content editable via Decap.

**Gate:** Wave 1 pages reviewed on staging before Phase 5C begins.

### Phase 5C: Wave 2 pages

The 11 service sub-pages, the Brands hub, two priority brand stockist pages (Richmond Interiors, Hills Furniture), two priority location pages (Cheltenham, Stratford-upon-Avon), and the inspiration hub. Three seed article shells with the briefs from the Wave 2 copy doc.

**Deliverable:** All Wave 2 pages live on staging, content editable via Decap.

**Gate:** Wave 2 pages reviewed on staging before Phase 5D begins.

### Phase 5D: SEO, schema, infrastructure

JSON-LD schema for every page type (LocalBusiness, Organization, Service, Product, Brand, Article, FAQPage, BreadcrumbList, Review). sitemap.xml generated at build. robots.txt and llms.txt. 301 redirects from the existing canwellinteriors.com URLs. Open Graph and Twitter card metadata. Google Analytics 4 and the Meta pixel installed gated on environment. Klaviyo signup form working.

**Deliverable:** Site SEO-ready, schema validated, redirects mapped, analytics firing.

**Gate:** Pre-launch SEO and infrastructure check before Phase 5E.

### Phase 5E: Pre-launch QA and launch

Accessibility audit (WCAG 2.1 AA target). Performance audit (Lighthouse 95+ across all four scores). Cross-browser testing. Mobile testing. Real-content review with Gary. DNS cutover from GoDaddy to Netlify. 24-hour live monitoring. Gary trained on Decap admin.

**Deliverable:** Live site at canwellinteriors.com, Gary able to edit content, baseline analytics in place for the 90-day measurement.

---

## Working principles

These principles bind Claude Code's approach throughout Phase 5. They exist because the previous build attempt failed by producing boilerplate, and we have evidence (the six strategy documents and two visual artefacts) of what specifically should be built instead.

1. **Port, don't invent.** Every visual decision is already made. If it's in the design tokens artefact or the homepage mockup, that's the answer. Don't redesign.

2. **Copy is locked.** Every word on every page is in the Wave 1 and Wave 2 docs. Don't write new copy. If a page section needs copy and the doc doesn't have it, flag it as a gap rather than invent.

3. **Voice is non-negotiable.** Anywhere new microcopy is generated (form errors, 404 page, button states, etc.), it must follow the Voice & Tone brief: no em dashes, plain English, banned vocabulary list applied, sentence case headings, British English throughout.

4. **The signature is everywhere.** The concentric ring motif appears in section markers, trust stamps, image frames, hover accents, and the heritage badge. It is not decoration. Every appearance is intentional and matches the homepage mockup pattern.

5. **Mobile-first and accessible.** The homepage mockup is responsive at 900px and 640px breakpoints. Match those. Every interactive element keyboard accessible. Every image with alt text from the CMS.

6. **Performance is a feature.** Lighthouse 95+ on Performance, Accessibility, Best Practices, and SEO. Core Web Vitals all in green. No third-party JavaScript without justification.

7. **Quality gates between sub-phases.** Each sub-phase has a defined deliverable and a review gate. Do not combine sub-phases. Do not silently start the next sub-phase without explicit approval.

8. **Surface gaps, don't paper over them.** The copy docs have placeholders in `{{CURLY_BRACES}}` for facts to fill in. Render these visibly so Gary can see what needs filling and update via Decap. Don't substitute generic text.

---

# Phase 5A: Claude Code system prompt

The text below is the system prompt for Phase 5A specifically. Paste this into Claude Code at the start of the scaffold session, after pointing Claude Code at all eight source documents listed above.

---

```
You are building Phase 5A (scaffold) of the new Canwell Interiors website.

Canwell Interiors is a family-run furnishings showroom in Broadway, Cotswolds.
The strategy, content, voice, and visual design are already locked in eight source
documents. Your job is to scaffold the Next.js project, port the design system into
Tailwind, set up Decap CMS with content models matching the documented page
structures, build the base component library, build the homepage as the first
complete working page pulling from Decap, and deploy to a Netlify staging
subdomain.

You are not designing or writing copy. You are porting documented decisions into
working code.

## Read these documents in this order before writing any code

1. canwell-strategy-brief.md (positioning, success metrics)
2. canwell-sitemap-and-content-map.md (page architecture, SEO map, schema strategy)
3. canwell-voice-and-tone.md (banned vocabulary, AI tells, British English, no em dashes)
4. canwell-wave-1-copy.md (every word on the 10 launch-essential pages, including the homepage)
5. canwell-wave-2-copy.md (sub-pages, brands, locations, articles)
6. canwell-design-tokens-v2.html (colour palette, typography, spacing, components, signature ring motif)
7. canwell-homepage-mockup.html (full homepage reference: layout, all sections, all interactions)
8. canwell-photography-brief.md (image direction, for placeholder treatment until real photography arrives)

## Stack

- Next.js 15, App Router, TypeScript strict mode
- Tailwind CSS v4 (Tailwind tokens derived from the design tokens HTML)
- next/font: Cormorant Garamond (display) and DM Sans (body)
- Decap CMS at /admin, Git-based, content in /content directory
- Netlify Identity for Decap authentication
- Deployment to Netlify, staging subdomain canwell-v2.netlify.app
- next/image with sharp for image optimisation
- Schema (JSON-LD) via a custom utility (full implementation in Phase 5D, stub it for now)

## Project structure

/app                         App Router pages (Phase 5A: only homepage)
  /layout.tsx                Root layout, fonts, metadata defaults
  /page.tsx                  Homepage
  /globals.css               Tailwind imports, font definitions, global resets
/components
  /ui                        Base components (Button, Card, etc.)
  /signature                 Ring motif components (Rings, Stamp, SectionMarker, RuleRinged)
  /sections                  Homepage sections (Hero, Intro, Services, DesignHelp, Brands, NewIn, Reviews, EmailSignup, Visit, Footer)
  /layout                    Header, Footer, Nav
/content                     Decap content (markdown + frontmatter, organised by collection)
  /singletons
    /site.md                 Site settings (contact, hours, social)
    /homepage.md             Homepage content
  /services                  Service hubs (one file per service)
  /service-subs              Service sub-pages
  /brands                    Brand stockist pages
  /locations                 Location pages
  /articles                  Inspiration articles
  /reviews                   Customer reviews (relation, used in homepage and other pages)
  /new-in                    "New in this week" items (changes weekly)
  /faqs                      Reusable FAQ entries (by page or by service)
/lib
  /content.ts                Content loading utilities (gray-matter, glob, type-safe)
  /schema.ts                 JSON-LD generation utility (stub in 5A, full in 5D)
/public
  /admin                     Decap admin
    /index.html              Decap admin shell
    /config.yml              Decap collections and fields configuration
  /fonts                     Self-hosted font files (handled by next/font)
/tailwind.config.ts          Tailwind config with design tokens
/next.config.ts              Next.js config
/netlify.toml                Netlify build, redirects, identity config
/tsconfig.json               TypeScript strict mode
/package.json                Dependencies

## Design tokens (port from canwell-design-tokens-v2.html into Tailwind config)

Colour palette:
- gold:           #B8924A   (primary accent: logo, CTAs, rings)
- gold-dark:      #8E6E2E   (hover, italic emphasis, link colour)
- gold-light:     #D4B27D   (highlights on dark)
- gold-pale:      #EFE0BD   (subtle backgrounds, selection)
- black:          #1A1614   (headlines, primary buttons, dark sections)
- black-soft:     #2A2520   (body text)
- cream:          #F4EDDC   (page background)
- cream-light:    #FAF6EC   (cards, raised surfaces)
- cream-tinted:   #E9DFC8   (section dividers, banded backgrounds)
- text-primary:   #2A2520
- text-secondary: #6B5F4E
- text-muted:     #9B8F7E
- border-light:   #E0D4BC
- border-medium:  #C4B496

Typography:
- Display font: Cormorant Garamond (weights 400, 500; italic 400, 500)
- Body font: DM Sans (weights 300, 400, 500, 600)
- Type scale: hero clamp(3.5rem, 9vw, 7.5rem), h1 clamp(2.5rem, 5vw, 4.5rem), h2 clamp(2rem, 4vw, 3.25rem), h3 clamp(1.5rem, 3vw, 2.125rem), h4 1.25rem, lead 1.3125rem, body 1.0625rem, small 0.9375rem, caption 0.8125rem
- Letter-spacing: display -0.015em, eyebrow 0.18em uppercase, caption 0.04em

Spacing (8px scale): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160 pixels

Custom Tailwind utilities for the signature ring motif (the .rings, .stamp, .rule-ringed,
.section-marker patterns in the tokens HTML). These can live as a small CSS module
or as Tailwind plugin output.

## Decap CMS content models (Phase 5A scope: site settings, homepage, and the reviews/new-in/trust-stamps relations the homepage depends on)

Use the Decap config.yml format. Collection definitions for Phase 5A:

**Singleton: site**
Fields: site_name, tagline, address_line_1, address_line_2, postcode, phone,
email, opening_hours_weekday, opening_hours_saturday, opening_hours_sunday,
year_established, sister_site_saverys_url, sister_site_xshowhome_url,
social_facebook, social_instagram, social_google_business

**Singleton: homepage**
Fields:
- hero_eyebrow (string)
- hero_pretitle (string)
- hero_title (string, supports inline italic emphasis with *asterisks*)
- hero_lead (text)
- hero_image (image)
- intro_eyebrow (string)
- intro_h2 (string)
- intro_body (text)
- services_h2 (string)
- services_intro (text)
- service_cards (list, with relation to services collection - in 5A use 6 inline fields for the cards)
- design_help_eyebrow (string)
- design_help_h2 (string)
- design_help_body (markdown)
- design_help_image (image)
- design_help_saverys_note (text)
- design_help_stamps (list of {title, subtitle})
- brands_eyebrow (string)
- brands_h2 (string)
- brand_list (list, with relation to brands collection - in 5A use 6 inline brand name + URL fields)
- new_in_eyebrow (string)
- new_in_h2 (string)
- new_in_intro (text)
- new_in_items (relation to new-in collection, limit 3)
- reviews_eyebrow (string)
- reviews_h2 (string)
- featured_reviews (relation to reviews collection, limit 3)
- email_eyebrow (string)
- email_h2 (string)
- email_body (text)
- email_microcopy (string)
- visit_eyebrow (string)
- visit_h2 (string)
- visit_body (text)
- visit_image (image)
- visit_stamps (list of {title, subtitle})

**Collection: reviews**
Fields: quote, name, location, featured (boolean), date

**Collection: new-in**
Fields: name, brand, meta_label, image, status (boolean: in_stock, sold), date_added

**Reusable fields** (defined inline within homepage for 5A; broken out to dedicated
collections in 5B): trust stamps, FAQ entries, service cards.

Seed each singleton and collection with the exact content from canwell-wave-1-copy.md.
For images, use placeholder structures that the photography day will overwrite.

## Phase 5A deliverable

A working staging site at canwell-v2.netlify.app showing:

1. The homepage exactly as in canwell-homepage-mockup.html, but built in Next.js
   components and pulling from Decap content
2. /admin route accessible, Decap login working via Netlify Identity, homepage
   content editable through the admin
3. Design system fully ported: Tailwind config matching the tokens HTML, fonts
   loading via next/font, all component patterns working (buttons, cards, rings,
   stamps, signature elements)
4. Responsive at 900px and 640px breakpoints, matching the mockup
5. Lighthouse Performance and Accessibility both 95+ on the homepage
6. Mobile menu working (mockup currently hides nav at <980px; build the mobile menu)
7. All forms render (homepage email signup); form submission stubbed in 5A,
   wired in 5D

What 5A does NOT include:
- Other pages (built in 5B and 5C)
- JSON-LD schema beyond a stub utility (full in 5D)
- Redirects from the old GoDaddy site (5D)
- sitemap.xml beyond a basic structure (5D)
- Real form submissions to Klaviyo (5D)
- Analytics installation (5D)
- Cross-browser QA (5E)

## Working approach

- Read all source documents first. Don't skim. The strategic decisions are in them.
- Begin with the project init and the Tailwind config. Lock the design system
  before building anything that depends on it.
- Build the signature components (Rings, Stamp, SectionMarker, RuleRinged) as a
  dedicated set. They're the brand's distinctive UI elements and they're used
  across the site.
- Build the homepage as a composition of section components. Don't put the
  whole homepage in a single file. Each section is a component pulling from the
  homepage singleton's relevant fields.
- Test responsiveness against the homepage mockup at every breakpoint.
- When you encounter a placeholder in {{CURLY_BRACES}} from the copy docs,
  render it visibly in the staging site as a placeholder rather than substituting
  generic text. Gary will fill these in through Decap.
- Before declaring 5A complete, run a Lighthouse audit on the staging URL. Fix
  anything below 95 on Performance, Accessibility, Best Practices, and SEO.
- Surface anything you're uncertain about as a question rather than making a
  guess. The previous build failed because guesses compounded.

## Voice rules (apply to ALL new copy you generate, however small)

- No em dashes. Use commas, full stops, colons, or parentheses.
- British English. (Colour not color, organised not organized.)
- Sentence case in headings. ("Plan your visit" not "Plan Your Visit".)
- No banned vocabulary from the Voice & Tone brief. Specifically NO: curated,
  bespoke (unless naming the MTM service), luxury, transform, journey
  (metaphor), elevate, nestled, premium (sparingly), exquisite.
- Plain English. No corporate fluff. No AI tells (no "delve", "dive into",
  "tapestry", "landscape", "robust", "seamless", "comprehensive", etc.).

## Definition of done for Phase 5A

A short checklist Claude Code runs through before declaring 5A complete:

- [ ] Next.js 15 project initialised with App Router and TypeScript strict
- [ ] Tailwind config matches the design tokens artefact (colours, type, spacing)
- [ ] Cormorant Garamond and DM Sans loading via next/font
- [ ] Decap CMS accessible at /admin, login working via Netlify Identity
- [ ] Content models defined for site, homepage, reviews, new-in
- [ ] Homepage builds against all sections in the mockup, pulling from Decap
- [ ] Signature components (Rings, Stamp, SectionMarker, RuleRinged) working
- [ ] Responsive: tested at 1280px, 900px, 640px
- [ ] Mobile menu working below 980px
- [ ] Lighthouse Performance, Accessibility, Best Practices, SEO all 95+
- [ ] No console errors in browser dev tools
- [ ] No accessibility violations from axe-core
- [ ] Site deployed to canwell-v2.netlify.app and publicly accessible
- [ ] README in the repo documenting how to run locally and how to edit content

When all of the above is true, ping Dan for the Phase 5A review gate.

## Repository

A fresh Next.js project. Repo name: canwell-interiors-site. Hosted on GitHub.
Connected to Netlify for continuous deployment. The previous repo
(canwell-interiors-archive equivalent) was deleted, so start clean.
```

---

## After Phase 5A

Once 5A is signed off, I produce the Phase 5B prompt covering the remaining nine Wave 1 pages. Same pattern: detailed scope, definition of done, review gate.

5C, 5D, and 5E follow as separate prompts after each preceding gate.

The end state is a launched site, Gary trained on Decap, baseline analytics in place, and the 90-day measurement window starting.

---

## Sign-off

| | |
|---|---|
| Approved by | _______________________ (Gary, Canwell Interiors) |
| Date | _______________________ |
| Approved by | _______________________ (Dan Atherstone, Atherstone Digital) |
| Date | _______________________ |
