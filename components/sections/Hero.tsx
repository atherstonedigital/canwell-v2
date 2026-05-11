import Link from "next/link";
import { SectionMarker } from "@/components/signature/SectionMarker";
import { Rings } from "@/components/signature/Rings";
import { Inline } from "@/components/signature/RichText";
import { PlainWithPlaceholders } from "@/components/signature/RichText";
import type { HomepageContent } from "@/lib/types";

interface HeroProps {
  hero_eyebrow: HomepageContent["hero_eyebrow"];
  hero_pretitle: HomepageContent["hero_pretitle"];
  hero_title: HomepageContent["hero_title"];
  hero_lead: HomepageContent["hero_lead"];
  hero_microcopy: HomepageContent["hero_microcopy"];
}

export function Hero({
  hero_eyebrow,
  hero_pretitle,
  hero_title,
  hero_lead,
  hero_microcopy,
}: HeroProps) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <SectionMarker num="01" label={hero_eyebrow} />
            <p className="hero-pretitle">{hero_pretitle}</p>
            <h1 className="hero-title">
              <Inline text={hero_title} />
            </h1>
            <p className="hero-lead">{hero_lead}</p>
            <div className="hero-ctas">
              <Link href="/visit" className="btn btn-primary">
                Plan your visit
              </Link>
              <a href="#subscribe" className="btn btn-tertiary">
                Get the weekly update
              </a>
            </div>
            {hero_microcopy && hero_microcopy.length > 0 && (
              <div className="hero-microcopy">
                {hero_microcopy.map((item, idx) => (
                  <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "var(--s-4)" }}>
                    {idx > 0 && <span className="sep" aria-hidden="true">·</span>}
                    <span>
                      <PlainWithPlaceholders text={item} />
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="hero-image">
            <div className="hero-image-label">
              <Rings size="md">
                <span style={{ fontSize: "0.625rem" }}>HERO</span>
              </Rings>
              Showroom photography
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
