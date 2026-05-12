import Link from "next/link";
import { Fragment } from "react";
import { Inline } from "@/components/signature/RichText";
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
          {brand_list.map((brand, i) => (
            <Fragment key={brand.url}>
              {i > 0 && <span className="brand-sep" aria-hidden="true">·</span>}
              <Link href={brand.url} className="brand-name">
                {brand.name}
              </Link>
            </Fragment>
          ))}
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
