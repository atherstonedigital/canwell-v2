import Link from "next/link";
import { SectionMarker } from "@/components/signature/SectionMarker";
import { Stamp } from "@/components/signature/Stamp";
import { Inline } from "@/components/signature/RichText";
import { MarkdownBody } from "@/components/signature/MarkdownBody";
import type { HomepageContent } from "@/lib/types";

type DesignHelpProps = Pick<
  HomepageContent,
  | "design_help_eyebrow"
  | "design_help_h2"
  | "design_help_body"
  | "design_help_saverys_note"
  | "design_help_primary_cta_label"
  | "design_help_primary_cta_url"
  | "design_help_secondary_cta_label"
  | "design_help_secondary_cta_url"
  | "design_help_stamps"
>;

export function DesignHelp({
  design_help_eyebrow,
  design_help_h2,
  design_help_body,
  design_help_saverys_note,
  design_help_primary_cta_label,
  design_help_primary_cta_url,
  design_help_secondary_cta_label,
  design_help_secondary_cta_url,
  design_help_stamps,
}: DesignHelpProps) {
  return (
    <section className="design-help-feature">
      <div className="container">
        <div className="design-help-grid">
          <div className="design-help-image" aria-hidden="true" />

          <div className="design-help-content">
            <SectionMarker num="03" label={design_help_eyebrow} />
            <h2 className="display-h2">
              <Inline text={design_help_h2} />
            </h2>
            <MarkdownBody text={design_help_body} />
            {design_help_saverys_note && (
              <p className="small design-help-saverys">
                <Inline text={design_help_saverys_note} />
              </p>
            )}

            <div className="design-help-ctas">
              <Link href={design_help_primary_cta_url} className="btn btn-primary">
                {design_help_primary_cta_label}
              </Link>
              <Link href={design_help_secondary_cta_url} className="btn btn-tertiary">
                {design_help_secondary_cta_label}
              </Link>
            </div>

            {design_help_stamps && design_help_stamps.length > 0 && (
              <div className="design-help-stamps">
                {design_help_stamps.map((s, i) => (
                  <Stamp key={i} line1={s.title} line2={s.subtitle} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
