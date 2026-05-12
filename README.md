# Canwell Interiors

The new Canwell Interiors website. Next.js 16 (App Router) + TypeScript + Tailwind v4, content managed through Decap CMS at `/admin`, deployed to Netlify.

## Build status (Phase 5A → Phase 5C, plus 5D infrastructure)

Per `docs/canwell-phase-5-build-brief.md` and `docs/phase-5a-plan.md`, this build covers:

**Phase 5A — design system + homepage + Decap**
- Full design system ported from `docs/canwell-design-tokens-v2.html`
- Homepage built against `docs/canwell-homepage-mockup.html`, all 9 sections pulling from Decap
- Decap CMS at `/admin` with content models for every page
- Mobile menu (focus-trapped, Esc-to-close), sticky header, responsive at 1280/900/640
- Voice-compliant 404 page

**Phase 5B — Wave 1 pages (all 10)**
- `/visit`, `/about`, `/contact` (with form stub)
- `/design-help` hub
- 5 service hubs: `/carpets`, `/curtains`, `/blinds`, `/furniture`, `/soft-furnishings`

**Phase 5C — Wave 2 priority pages**
- 11 service sub-pages (under `/carpets`, `/curtains`, `/blinds`, `/furniture`, `/design-help`)
- `/brands` hub + `/brands/richmond-interiors` + `/brands/hills-furniture` (other brands flagged "Coming soon" on the hub)
- `/locations` hub + `/locations/cheltenham` + `/locations/stratford-upon-avon` (other locations flagged "Coming soon")
- `/inspiration` hub + 3 article shells (each marked `is_placeholder: true` — opening + outline ready for Gary to expand)

**Phase 5D infrastructure (partial)**
- JSON-LD: `LocalBusiness` schema injected globally in `<head>`. Per-page schema utilities ready in `lib/schema.ts` (Service, Brand, Place, Article, FAQPage, BreadcrumbList, Reviews aggregate)
- `/sitemap.xml` auto-generated from all routes (App Router `sitemap.ts`)
- `/robots.txt` (App Router `robots.ts`) — disallows `/admin/`, points to sitemap
- `/llms.txt` for LLM-aware indexing
- Open Graph + Twitter card metadata defaults; per-page meta_title and meta_description from Decap

**Deferred to a later sub-phase**
- Wiring `serviceSchema`/`articleSchema`/`faqSchema` into each page (utilities are built; not yet injected per page)
- 301 redirects from the old GoDaddy site (need the URL list)
- GA4 + Meta pixel installation (need real measurement IDs)
- Klaviyo signup wiring (form is currently a stub)
- Cross-browser QA, Lighthouse audit, DNS cutover (5E launch tasks)

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Edit content

The site reads content from `content/` (markdown with frontmatter):

- `content/singletons/site.md` — contact details, hours, social URLs (used by the utility bar, footer, Visit block, and the Reviews "Read more on Google" button)
- `content/singletons/homepage.md` — every section of the homepage
- `content/reviews/*.md` — customer reviews. Toggle `featured: true` and reference the slug from the homepage `featured_reviews` list.
- `content/new-in/*.md` — items currently in the showroom. Reference up to three from the homepage `new_in_items` list.

In production, edit these via the admin at `/admin`. Login uses Netlify Identity (the Netlify dashboard manages invites). Edits are committed to the Git repo and the site rebuilds automatically.

### Placeholder syntax

Any text that should be visibly flagged as "awaiting content" uses double curly braces, e.g. `{{YEAR_ESTABLISHED}}`. These render as a gold "Needs Gary" pill on the site so missing facts are obvious. Replace them via the admin.

### Inline italic emphasis

Headings support `*asterisks*` for italic emphasis matching the gold-dark display style. E.g. `Walk in, *choose*, take home.` renders the word "choose" italicised.

## Project structure

```
app/                  Next.js App Router pages
  layout.tsx          Root layout, fonts, header, footer
  page.tsx            Homepage composition
  not-found.tsx       404
  globals.css         Design tokens + signature CSS

components/
  signature/          Rings, Stamp, SectionMarker, RuleRinged, Placeholder, RichText
  layout/             UtilityBar, Header, Footer, MobileMenu, nav links
  sections/           Hero, Intro, Services, DesignHelp, Brands, NewIn, Reviews, EmailSignup, Visit

lib/
  types.ts            Shared content type definitions
  content.ts          File-system content loaders + placeholder/italic parsers

content/              Decap content (markdown + frontmatter)
  singletons/         site.md, homepage.md
  reviews/            One file per review
  new-in/             One file per "new in" item

public/
  admin/              Decap admin shell (index.html + config.yml)

docs/                 Strategy, sitemap, voice, copy, design tokens HTML, homepage mockup, build brief, Phase 5A plan
```

## Deploy

The repo is configured for Netlify continuous deployment via `netlify.toml`. The build command is `npm run build`, the publish dir is `.next`, and the `@netlify/plugin-nextjs` plugin handles the runtime.

For Decap CMS to work in production:

1. In the Netlify dashboard, enable **Identity** (registration: invite only).
2. Enable **Git Gateway** under Identity → Services.
3. Invite Gary's email via Identity → Invite users.
4. Gary clicks the invite, sets a password, then logs in at `/admin/` and can edit content.

## Stack and key decisions

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | Brief specified 15 but 16 is the current latest with identical App Router behaviour |
| Language | TypeScript strict | enabled in `tsconfig.json` |
| Styling | Tailwind v4 | `@theme` block in `app/globals.css`; design tokens live there |
| Fonts | `next/font/google` | Cormorant Garamond + DM Sans, self-hosted, swap |
| Content | Git-based markdown + Decap CMS | No DB, no external service cost |
| Hosting | Netlify | Required for Netlify Identity + Git Gateway |
| Images | next/image (when real images arrive) | Phase 5A uses CSS gradient placeholders matching the mockup |

## What's not yet here (deferred to later sub-phases)

- Wave 1 pages other than homepage (Visit, About, Contact, six service hubs) → **5B**
- Wave 2 pages (sub-services, brand stockists, locations, articles) → **5C**
- JSON-LD schema, sitemap.xml, robots.txt, llms.txt, 301 redirects, GA4, Meta pixel, Klaviyo integration → **5D**
- WCAG 2.1 AA audit, Lighthouse pass, cross-browser QA, DNS cutover → **5E**

## Voice rules

When editing any string not covered by the source copy docs, follow `docs/canwell-voice-and-tone.md`:

- No em dashes
- British English (colour, organised, recognise)
- Sentence case in headings
- No banned vocabulary (delve, dive into, tapestry, robust, seamless, comprehensive, luxury, premium-as-adjective, nestled, picturesque, transform, journey, elevate, etc.)
- No AI tells ("It's not just X, it's Y", rule-of-three filler, "We're delighted to...")
