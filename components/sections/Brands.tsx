import Link from "next/link";
import { Fragment } from "react";
import { Inline } from "@/components/signature/RichText";
import { getBrands } from "@/lib/content";
import type { BrandLink } from "@/lib/types";

interface BrandsProps {
  brands_eyebrow: string;
  brands_h2: string;
  brands_intro?: string;
  brand_list: BrandLink[];
  brands_cta_label: string;
  brands_cta_url: string;
}

export function Brands({
  brands_eyebrow,
  brands_h2,
  brands_intro,
  brand_list,
  brands_cta_label,
  brands_cta_url,
}: BrandsProps) {
  // QA Audit 2026-05-12 — Task 12: only the brands with real pages get rendered
  // as links; the rest read as plain text to avoid 404s.
  const stocked = new Set(getBrands().map((b) => `/brands/${b.slug}`));

  return (
    <section className="brands">
      <div className="container">
        <p className="eyebrow brands-eyebrow">{brands_eyebrow}</p>
        <h2 className="display-h2">
          <Inline text={brands_h2} />
        </h2>
        {brands_intro && (
          <p className="brands-intro">
            <Inline text={brands_intro} />
          </p>
        )}

        <div className="brands-strip">
          {brand_list.map((brand, i) => {
            const hasPage = stocked.has(brand.url);
            return (
              <Fragment key={brand.url}>
                {i > 0 && <span className="brand-sep" aria-hidden="true">·</span>}
                {hasPage ? (
                  <Link href={brand.url} className="brand-name">
                    {brand.name}
                  </Link>
                ) : (
                  <span className="brand-name brand-name-pending">{brand.name}</span>
                )}
              </Fragment>
            );
          })}
        </div>

        <div className="brands-cta">
          <Link href={brands_cta_url} className="btn btn-tertiary">
            {brands_cta_label}
          </Link>
        </div>
      </div>
    </section>
  );
}
