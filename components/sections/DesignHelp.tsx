import Link from "next/link";
import Image from "next/image";
import { SectionMarker } from "@/components/signature/SectionMarker";
import { Stamp } from "@/components/signature/Stamp";
import { Inline } from "@/components/signature/RichText";
import { MarkdownBody } from "@/components/signature/MarkdownBody";
import { getShowroomImage } from "@/lib/showroom-images";
import type { HomepageContent } from "@/lib/types";

type DesignHelpProps = Pick<
  HomepageContent,
  | "design_help_eyebrow"
  | "design_help_h2"
  | "design_help_body"
  | "design_help_image"
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
  design_help_image,
  design_help_saverys_note,
  design_help_primary_cta_label,
  design_help_primary_cta_url,
  design_help_secondary_cta_label,
  design_help_secondary_cta_url,
  design_help_stamps,
}: DesignHelpProps) {
  const imageMeta = getShowroomImage(design_help_image);
  return (
    <section className="design-help-feature">
      <div className="container">
        <div className={`design-help-grid${design_help_image ? "" : " design-help-grid--single"}`}>
          {design_help_image && (
            <div className="design-help-image">
              <Image
                src={design_help_image}
                alt={imageMeta?.alt ?? "Canwell Interiors design help"}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}

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
