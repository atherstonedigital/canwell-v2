import Link from "next/link";
import { SectionMarker } from "@/components/signature/SectionMarker";
import { Inline, PlainWithPlaceholders } from "@/components/signature/RichText";
import type { NewInItem } from "@/lib/types";

interface NewInProps {
  new_in_eyebrow: string;
  new_in_h2: string;
  new_in_intro: string;
  new_in_cta_label: string;
  new_in_cta_url: string;
  items: NewInItem[];
}

export function NewIn({
  new_in_eyebrow,
  new_in_h2,
  new_in_intro,
  new_in_cta_label,
  new_in_cta_url,
  items,
}: NewInProps) {
  // QA Audit 2026-05-12 — Task 4: route hash CTAs through Link via the homepage anchor.
  const ctaIsHash = new_in_cta_url.startsWith("#") || new_in_cta_url.startsWith("/#");

  return (
    <section className="new-in">
      <div className="container">
        <div className="new-in-header">
          <div className="new-in-title">
            <SectionMarker num="04" label={new_in_eyebrow} />
            <h2 className="display-h2">
              <Inline text={new_in_h2} />
            </h2>
            <p>
              <Inline text={new_in_intro} />
            </p>
          </div>
          {ctaIsHash ? (
            <a href={new_in_cta_url} className="btn btn-secondary">
              {new_in_cta_label}
            </a>
          ) : (
            <Link href={new_in_cta_url} className="btn btn-secondary">
              {new_in_cta_label}
            </Link>
          )}
        </div>

        {/* QA Audit 2026-05-12 — Task 4: cards render as non-link tiles until the
            xshowhome.com Storefront integration lands. No dead href="#" placeholders. */}
        <div className="new-in-grid">
          {items.map((item) => (
            <div key={item.slug} className="new-in-card">
              <div className="new-in-image">
                <div className="new-in-badge" aria-hidden="true">
                  New
                </div>
              </div>
              <h3 className="new-in-name">{item.name}</h3>
              <p className="new-in-meta">
                {item.brand.toUpperCase()} · <PlainWithPlaceholders text={item.meta_label} />
              </p>
            </div>
          ))}
        </div>

        <p className="new-in-footer">
          See this week&apos;s new arrivals in the showroom.
        </p>
      </div>
    </section>
  );
}
