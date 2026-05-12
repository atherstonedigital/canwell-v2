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
          <a href={new_in_cta_url} className="btn btn-secondary">
            {new_in_cta_label}
          </a>
        </div>

        <div className="new-in-grid">
          {items.map((item) => (
            <a key={item.slug} href={item.url ?? "#"} className="new-in-card">
              <div className="new-in-image">
                <div className="new-in-badge" aria-hidden="true">
                  New
                </div>
              </div>
              <h3 className="new-in-name">{item.name}</h3>
              <p className="new-in-meta">
                {item.brand.toUpperCase()} · <PlainWithPlaceholders text={item.meta_label} />
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
