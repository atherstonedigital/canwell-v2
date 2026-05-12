import type {
  ArticleContent,
  BrandPageContent,
  LocationPageContent,
  Review,
  ServiceHubContent,
  SiteSettings,
} from "./types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://canwell-v2.netlify.app";

export function siteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function organizationSchema(site: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": siteUrl("/#organization"),
    name: site.site_name,
    url: siteUrl("/"),
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address_line_1}, ${site.address_line_2}`,
      addressLocality: "Broadway",
      addressRegion: "Worcestershire",
      postalCode: site.postcode,
      addressCountry: "GB",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      site.social_facebook,
      site.social_instagram,
      site.social_google_business,
    ].filter(Boolean),
  };
}

export function localBusinessSchema(site: SiteSettings) {
  return {
    ...organizationSchema(site),
    "@type": "LocalBusiness",
    "@id": siteUrl("/#localbusiness"),
    priceRange: "££-£££",
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
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": siteUrl("/#organization-reviews"),
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
