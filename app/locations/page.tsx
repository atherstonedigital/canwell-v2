import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { CTABanner } from "@/components/sections/CTABanner";
import { getLocations, getLocationsHub } from "@/lib/content";

const ALL_LOCATIONS = [
  { slug: "cheltenham", name: "Cheltenham", note: "Twenty minutes via the A46" },
  { slug: "stratford-upon-avon", name: "Stratford-upon-Avon", note: "Twenty-five minutes through the Cotswolds" },
  { slug: "evesham", name: "Evesham", note: "Fifteen minutes" },
  { slug: "worcester", name: "Worcester", note: "Thirty-five minutes" },
  { slug: "chipping-campden", name: "Chipping Campden", note: "Ten minutes" },
  { slug: "stow-on-the-wold", name: "Stow-on-the-Wold", note: "Twenty-five minutes" },
  { slug: "moreton-in-marsh", name: "Moreton-in-Marsh", note: "Twenty minutes" },
];

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
  const built = getLocations();
  const builtSlugs = new Set(built.map((l) => l.slug));

  return (
    <>
      <PageHeader eyebrow={hub.eyebrow} h1={hub.h1} lead={hub.lead} image={hub.image} />
      <Prose body={hub.intro_body} />

      <section className="prose-section variant-tinted">
        <div className="container">
          <h2 className="display-h2" style={{ marginBottom: "var(--s-7)" }}>
            Areas we serve
          </h2>
          {ALL_LOCATIONS.map((loc) => {
            if (builtSlugs.has(loc.slug)) {
              return (
                <Link key={loc.slug} href={`/locations/${loc.slug}`} className="brand-row">
                  <span className="brand-row-name">{loc.name}</span>
                  <span className="brand-row-tag">{loc.note}</span>
                  <span className="brand-row-cta">See the {loc.name} page</span>
                </Link>
              );
            }
            return (
              <div key={loc.slug} className="brand-row" style={{ cursor: "default" }}>
                <span className="brand-row-name">{loc.name}</span>
                <span className="brand-row-tag">{loc.note}</span>
                <span className="brand-row-cta" style={{ color: "var(--color-text-muted)" }}>
                  Page coming soon
                </span>
              </div>
            );
          })}
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
