import Link from "next/link";

export interface RelatedLink {
  label: string;
  url: string;
  description?: string;
}

interface RelatedLinksProps {
  heading?: string;
  links: RelatedLink[];
}

// QA Audit 2026-05-14 — Task 26: small "Also useful" block at the foot of
// long-form pages. Each entry is a single internal link with a one-line
// description, kept short so the block reads as guidance rather than navigation.
export function RelatedLinks({
  heading = "Also useful",
  links,
}: RelatedLinksProps) {
  if (!links || links.length === 0) return null;
  return (
    <section className="related-links">
      <div className="container">
        <div className="prose-inner">
          <h2 className="display-h3 related-links-heading">{heading}</h2>
          <ul>
            {links.map((link) => (
              <li key={link.url}>
                <Link href={link.url}>{link.label}</Link>
                {link.description && <span> — {link.description}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
