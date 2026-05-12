import Link from "next/link";
import Image from "next/image";
import { SectionMarker } from "@/components/signature/SectionMarker";
import { Rings } from "@/components/signature/Rings";
import { Inline, PlainWithPlaceholders } from "@/components/signature/RichText";
import type { CTA, HomepageContent } from "@/lib/types";

interface HeroProps {
  hero_eyebrow: HomepageContent["hero_eyebrow"];
  hero_pretitle: HomepageContent["hero_pretitle"];
  hero_title: HomepageContent["hero_title"];
  hero_lead: HomepageContent["hero_lead"];
  hero_microcopy: HomepageContent["hero_microcopy"];
  hero_image?: HomepageContent["hero_image"];
  hero_ctas?: CTA[];
}

const DEFAULT_HERO_CTAS: CTA[] = [
  { label: "Plan your visit", url: "/visit", variant: "primary" },
  { label: "Get the weekly update", url: "#subscribe", variant: "tertiary" },
];

function ctaClass(variant: CTA["variant"]) {
  switch (variant) {
    case "tertiary":
      return "btn btn-tertiary";
    case "secondary":
      return "btn btn-secondary";
    default:
      return "btn btn-primary";
  }
}

export function Hero({
  hero_eyebrow,
  hero_pretitle,
  hero_title,
  hero_lead,
  hero_microcopy,
  hero_image,
  hero_ctas,
}: HeroProps) {
  const ctas = hero_ctas && hero_ctas.length > 0 ? hero_ctas : DEFAULT_HERO_CTAS;

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
              {ctas.map((cta, i) => {
                const isHash = cta.url.startsWith("#");
                if (isHash) {
                  return (
                    <a key={i} href={cta.url} className={ctaClass(cta.variant)}>
                      {cta.label}
                    </a>
                  );
                }
                return (
                  <Link key={i} href={cta.url} className={ctaClass(cta.variant)}>
                    {cta.label}
                  </Link>
                );
              })}
            </div>
            {hero_microcopy && hero_microcopy.length > 0 && (
              <div className="hero-microcopy">
                {hero_microcopy.map((item, idx) => (
                  <span
                    key={idx}
                    style={{ display: "inline-flex", alignItems: "center", gap: "var(--s-4)" }}
                  >
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
            {hero_image ? (
              <Image
                src={hero_image}
                alt="Canwell Interiors showroom"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="hero-image-label">
                <Rings size="md">
                  <span style={{ fontSize: "0.625rem" }}>HERO</span>
                </Rings>
                Showroom photography
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
