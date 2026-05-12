import Link from "next/link";
import { Inline } from "@/components/signature/RichText";

export interface CTAButton {
  label: string;
  url: string;
  variant?: "primary" | "secondary" | "tertiary";
}

interface CTABannerProps {
  eyebrow?: string;
  h2?: string;
  body?: string;
  ctas: CTAButton[];
  variant?: "default" | "dark";
}

export function CTABanner({
  eyebrow,
  h2,
  body,
  ctas,
  variant = "default",
}: CTABannerProps) {
  return (
    <section className={`cta-banner variant-${variant}`}>
      <div className="container">
        <div className="cta-banner-inner">
          {eyebrow && (
            <p className={`eyebrow${variant === "dark" ? " eyebrow-on-dark" : ""}`}>
              {eyebrow}
            </p>
          )}
          {h2 && (
            <h2 className={`display-h2${variant === "dark" ? " on-dark" : ""}`}>
              <Inline text={h2} />
            </h2>
          )}
          {body && (
            <p className="cta-banner-body">
              <Inline text={body} />
            </p>
          )}
          <div className="cta-banner-ctas">
            {ctas.map((cta, idx) => {
              const cls =
                cta.variant === "tertiary"
                  ? `btn btn-tertiary${variant === "dark" ? " btn-tertiary-on-dark" : ""}`
                  : cta.variant === "secondary"
                  ? `btn ${variant === "dark" ? "btn-secondary-on-dark" : "btn-secondary"}`
                  : `btn ${variant === "dark" ? "btn-on-dark" : "btn-primary"}`;
              const isExternal = cta.url.startsWith("http") || cta.url.startsWith("tel:") || cta.url.startsWith("mailto:");
              if (isExternal) {
                return (
                  <a key={idx} href={cta.url} className={cls}>
                    {cta.label}
                  </a>
                );
              }
              return (
                <Link key={idx} href={cta.url} className={cls}>
                  {cta.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
