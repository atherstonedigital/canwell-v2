import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { CTABanner } from "@/components/sections/CTABanner";
import { Schema } from "@/components/Schema";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { breadcrumbSchema } from "@/lib/schema";
import { getBrands, getBrandsHub, getHomepage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const h = getBrandsHub();
  return {
    title: h.meta_title,
    description: h.meta_description,
    alternates: { canonical: "/brands" },
  };
}

const FALLBACK_BRANDS = [
  { name: "Riva", tagline: "Cushions, throws, curtains, and accents." },
  { name: "IFD", tagline: "Hardwood furniture with character." },
  { name: "Light & Living", tagline: "Lighting, ceramics, and decorative pieces." },
  { name: "Malini", tagline: "Fabric, cushions, and finishing pieces." },
];

export default function BrandsHubPage() {
  const hub = getBrandsHub();
  const stocked = getBrands();
  const homepage = getHomepage();
  const stockedSlugs = new Set(stocked.map((b) => b.slug));
  const homepageBrandSlugs = (homepage.brand_list || []).map((b) =>
    b.url.replace("/brands/", "")
  );

  return (
    <>
      <Schema
        id="ld-breadcrumb-brands"
        payload={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Brands", url: "/brands" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Brands", url: "/brands" },
        ]}
      />
      <PageHeader eyebrow={hub.eyebrow} h1={hub.h1} lead={hub.lead} image={hub.image} />
      <Prose h2="Why these, and not others" body={hub.intro_body} />

      <section className="prose-section variant-tinted">
        <div className="container">
          <h2 className="display-h2" style={{ marginBottom: "var(--s-7)" }}>The brands</h2>
          {stocked.map((brand) => (
            <Link key={brand.slug} href={`/brands/${brand.slug}`} className="brand-row">
              <span className="brand-row-name">{brand.brand_name}</span>
              <span className="brand-row-tag">{brand.tagline}</span>
              <span className="brand-row-cta">See {brand.brand_name} at Canwell</span>
            </Link>
          ))}
          {/* QA Audit 2026-05-12 — Task 12: brands without dedicated pages render
              as muted entries with an "in the showroom" note, not "Coming soon". */}
          {homepageBrandSlugs
            .filter((slug) => !stockedSlugs.has(slug))
            .map((slug) => {
              const homepageEntry = (homepage.brand_list || []).find(
                (b) => b.url === `/brands/${slug}`
              );
              const fallback = FALLBACK_BRANDS.find(
                (f) => f.name === homepageEntry?.name
              );
              return (
                <div key={slug} className="brand-row brand-row-pending" style={{ cursor: "default" }}>
                  <span className="brand-row-name">{homepageEntry?.name ?? slug}</span>
                  <span className="brand-row-tag">
                    {fallback?.tagline ?? "Available on the showroom floor."}
                  </span>
                  <span className="brand-row-cta" style={{ color: "var(--color-text-muted)" }}>
                    Available in the showroom now. Brand page coming soon.
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
