import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { CTABanner } from "@/components/sections/CTABanner";
import { Schema } from "@/components/Schema";
import { breadcrumbSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getLocations, getLocationsHub } from "@/lib/content";

const LOCATION_NOTES: Record<string, string> = {
  cheltenham: "Twenty minutes via the A46",
  "stratford-upon-avon": "Twenty-five minutes through the Cotswolds",
};

export async function generateMetadata(): Promise<Metadata> {
  const h = getLocationsHub();
  return {
    title: h.meta_title,
    description: h.meta_description,
    alternates: { canonical: "/locations" },
  };
}

export default function LocationsHubPage() {
  const hub = getLocationsHub();
  // QA Audit 2026-05-14 — Task 11: only render real, built location pages.
  // Placeholder "Coming soon" entries are removed this sprint; the missing
  // areas are flagged in the hub intro instead.
  const built = getLocations();

  return (
    <>
      <Schema
        id="ld-breadcrumb-locations"
        payload={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Locations", url: "/locations" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Locations", url: "/locations" },
        ]}
      />
      <PageHeader eyebrow={hub.eyebrow} h1={hub.h1} lead={hub.lead} image={hub.image} />
      <Prose body={hub.intro_body} />

      <section className="prose-section variant-tinted">
        <div className="container">
          <h2 className="display-h2" style={{ marginBottom: "var(--s-7)" }}>
            Areas we serve
          </h2>
          {built.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="brand-row"
            >
              <span className="brand-row-name">{loc.location_name}</span>
              <span className="brand-row-tag">
                {LOCATION_NOTES[loc.slug] ?? ""}
              </span>
              <span className="brand-row-cta">
                See the {loc.location_name} page
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTABanner
        eyebrow={hub.cta_eyebrow}
        h2={hub.cta_h2}
        ctas={hub.ctas}
      />
    </>
  );
}
