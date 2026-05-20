import Image from "next/image";
import { Inline } from "@/components/signature/RichText";
import { SectionMarker } from "@/components/signature/SectionMarker";
import { RuleRinged } from "@/components/signature/RuleRinged";
import { getShowroomImage } from "@/lib/showroom-images";

interface PageHeaderProps {
  eyebrow?: string;
  marker_num?: string;
  marker_label?: string;
  h1: string;
  lead?: string;
  image?: string;
  image_label?: string;
}

export function PageHeader({
  eyebrow,
  marker_num,
  marker_label,
  h1,
  lead,
  image,
  image_label,
}: PageHeaderProps) {
  const imageMeta = getShowroomImage(image);
  const labelText = image_label || eyebrow || marker_label || "Photography";
  const altText = imageMeta?.alt ?? labelText;

  return (
    <section className="page-header">
      <div className="container">
        <div className={`page-header-grid${image ? "" : " page-header-grid--single"}`}>
          <div className="page-header-content">
            {marker_num && marker_label ? (
              <SectionMarker num={marker_num} label={marker_label} />
            ) : eyebrow ? (
              <p className="eyebrow page-header-eyebrow">{eyebrow}</p>
            ) : null}
            <h1 className="display-h1 page-header-h1">
              <Inline text={h1} />
            </h1>
            {lead && (
              <p className="lead page-header-lead">
                <Inline text={lead} />
              </p>
            )}
            <div className="page-header-rule">
              <RuleRinged />
            </div>
          </div>

          {image && (
            <div className="page-header-image">
              <Image
                src={image}
                alt={altText}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
