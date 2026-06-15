import type {
  ArticleContent,
  BrandPageContent,
  HolidayLetsContent,
  LocationPageContent,
  Review,
  ServiceHubContent,
  SiteSettings,
} from "./types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://canwellinteriors.com";

export function siteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

// AreaServed: the cities and towns we deliver to and visit from Broadway.
const AREA_SERVED_CITIES = [
  "Broadway",
  "Chipping Campden",
  "Willersey",
  "Snowshill",
  "Stratford-upon-Avon",
  "Cheltenham",
  "Worcester",
  "Evesham",
];

// Top-level service categories that the showroom offers. Mirrored from the
// site's primary nav so the OfferCatalog stays in step with what we sell.
const OFFER_CATALOG: Array<{ name: string; url: string; description: string }> = [
  {
    name: "Carpets and flooring",
    url: "/carpets",
    description: "Carpets and flooring, measured and fitted across the Cotswolds.",
  },
  {
    name: "Curtains",
    url: "/curtains",
    description: "Made-to-measure and ready-made curtains, with fabric to feel in person.",
  },
  {
    name: "Blinds",
    url: "/blinds",
    description: "Roman, roller, wooden, perfect-fit and vertical blinds, measured and fitted.",
  },
  {
    name: "Furniture",
    url: "/furniture",
    description: "Sofas, dining, bedroom and occasional furniture from premium brands.",
  },
  {
    name: "Soft furnishings",
    url: "/soft-furnishings",
    description: "Cushions, throws, lighting, art and mirrors that finish a room.",
  },
  {
    name: "Design help",
    url: "/design-help",
    description: "Free in-store design consultation and home visits across the Cotswolds.",
  },
];

// Parse an editorial time like "10am to 4pm" or "10.30am to 5pm" into a
// 24-hour "HH:MM" string. Returns null if it doesn't look like a time.
function parseTime(raw: string): string | null {
  const m = raw.trim().match(/^(\d{1,2})(?:[.:](\d{2}))?\s*(am|pm)$/i);
  if (!m) return null;
  let hour = parseInt(m[1], 10);
  const minute = m[2] ?? "00";
  const meridiem = m[3].toLowerCase();
  if (meridiem === "pm" && hour !== 12) hour += 12;
  if (meridiem === "am" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

// Build schema.org OpeningHoursSpecification entries from the per-day list.
// Closed days (and anything we can't parse) are simply omitted — their absence
// signals "closed" to search engines.
function openingHoursSpecification(site: SiteSettings) {
  return (site.opening_hours ?? [])
    .map((d) => {
      const [open, close] = d.hours.split(/\s*(?:to|–|-|—)\s*/);
      const opens = open ? parseTime(open) : null;
      const closes = close ? parseTime(close) : null;
      if (!opens || !closes) return null;
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: d.day,
        opens,
        closes,
      };
    })
    .filter((spec): spec is NonNullable<typeof spec> => spec !== null);
}

export function organizationSchema(site: SiteSettings) {
  const sameAs = [
    site.sister_site_xshowhome_url,
    site.social_facebook,
    site.social_instagram,
    site.social_google_business,
  ].filter((url): url is string => Boolean(url && url.trim()));

  const areaServed = [
    ...AREA_SERVED_CITIES.map((name) => ({ "@type": "City", name })),
    { "@type": "AdministrativeArea", name: "The Cotswolds" },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": siteUrl("/#organization"),
    name: site.site_name,
    alternateName: `${site.site_name} Broadway`,
    description:
      "Family-run furnishings showroom at the Cotswold Design Centre in Broadway. Carpets, curtains, blinds, furniture, soft furnishings, and free design help.",
    url: siteUrl("/"),
    telephone: site.phone,
    email: site.email,
    image: [siteUrl("/og/canwell-default.jpg")],
    logo: site.logo_image ? siteUrl(site.logo_image) : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cotswold Design Centre, Kennel Lane",
      addressLocality: "Broadway",
      addressRegion: "Worcestershire",
      postalCode: site.postcode,
      addressCountry: "GB",
    },
    // Broadway, Worcestershire — Cotswold Design Centre on Kennel Lane.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.0382,
      longitude: -1.858,
    },
    openingHoursSpecification: openingHoursSpecification(site),
    areaServed,
    priceRange: "££",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Showroom services",
      itemListElement: OFFER_CATALOG.map((item) => ({
        "@type": "Offer",
        url: siteUrl(item.url),
        itemOffered: {
          "@type": "Service",
          name: item.name,
          description: item.description,
          url: siteUrl(item.url),
        },
      })),
    },
    ...(sameAs.length > 0 && { sameAs }),
  };
}

// FurnitureStore is a LocalBusiness subtype; emit the richer type directly
// so search engines and AI agents pick up the more specific signal.
export function localBusinessSchema(site: SiteSettings) {
  return organizationSchema(site);
}

export function websiteSchema(site: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteUrl("/#website"),
    name: site.site_name,
    url: siteUrl("/"),
    inLanguage: "en-GB",
  };
}

export function breadcrumbSchema(crumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: siteUrl(c.url),
    })),
  };
}

export function serviceSchema(service: ServiceHubContent, parentUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1.replace(/\*/g, ""),
    description: service.meta_description,
    provider: {
      "@type": "FurnitureStore",
      "@id": siteUrl("/#organization"),
    },
    areaServed: {
      "@type": "Place",
      name: "The Cotswolds",
    },
    url: siteUrl(parentUrl),
  };
}

// Holiday lets service page. Copy now comes from the Decap-managed
// holiday-lets singleton, so the schema is derived from that content and stays
// in step with editor changes. provider points at the existing Organization /
// LocalBusiness @id so the two stay linked.
export function holidayLetServiceSchema(content: HolidayLetsContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Holiday let interiors",
    serviceType: "Holiday let interiors",
    description: content.meta_description,
    provider: {
      "@type": "FurnitureStore",
      "@id": siteUrl("/#organization"),
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "The Cotswolds" },
      ...content.service_areas.map((name) => ({ "@type": "City", name })),
    ],
    url: siteUrl("/holiday-lets"),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Holiday let furnishing packages",
      itemListElement: content.packages.map((pkg) => ({
        "@type": "Offer",
        name: pkg.name,
        description: pkg.summary,
        itemOffered: {
          "@type": "Service",
          name: `${pkg.name} holiday let package`,
        },
      })),
    },
  };
}

export function brandSchema(brand: BrandPageContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.brand_name,
    description: brand.tagline,
    url: siteUrl(`/brands/${brand.slug}`),
  };
}

export function locationSchema(loc: LocationPageContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `Canwell Interiors near ${loc.location_name}`,
    description: loc.meta_description,
    url: siteUrl(`/locations/${loc.slug}`),
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "The Cotswolds",
    },
  };
}

export function articleSchema(article: ArticleContent, site: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description,
    ...(article.image && { image: siteUrl(article.image) }),
    datePublished: article.date_published,
    author: { "@type": "Organization", name: site.site_name },
    publisher: {
      "@type": "Organization",
      name: site.site_name,
      url: siteUrl("/"),
    },
    url: siteUrl(`/inspiration/${article.slug}`),
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\{\{[A-Z0-9_]+\}\}/g, "").trim(),
      },
    })),
  };
}

export function reviewsAggregateSchema(reviews: Review[], site: SiteSettings) {
  const real = reviews.filter((r) => !r.is_placeholder);
  if (real.length === 0) return null;
  // Reuse the organization @id so the reviews merge into the main
  // LocalBusiness entity rather than creating a duplicate one.
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": siteUrl("/#organization"),
    name: site.site_name,
    review: real.map((r) => ({
      "@type": "Review",
      reviewBody: r.quote,
      author: { "@type": "Person", name: r.name },
    })),
  };
}

export function jsonLdScriptProps<T>(payload: T) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(payload) },
  };
}
