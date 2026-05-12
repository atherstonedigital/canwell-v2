import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { CTABanner } from "@/components/sections/CTABanner";
import { getBrands, getBrandsHub, getHomepage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const h = getBrandsHub();
  return { title: h.meta_title, description: h.meta_description };
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
                <div key={slug} className="brand-row" style={{ cursor: "default" }}>
                  <span className="brand-row-name">{homepageEntry?.name ?? slug}</span>
                  <span className="brand-row-tag">
                    {fallback?.tagline ?? "Stockist page coming soon."}
                  </span>
                  <span className="brand-row-cta" style={{ color: "var(--color-text-muted)" }}>
                    Coming soon
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
