import { Inline } from "@/components/signature/RichText";
import { SectionMarker } from "@/components/signature/SectionMarker";
import { RuleRinged } from "@/components/signature/RuleRinged";

interface PageHeaderProps {
  eyebrow?: string;
  marker_num?: string;
  marker_label?: string;
  h1: string;
  lead?: string;
  align?: "left" | "centre";
}

export function PageHeader({
  eyebrow,
  marker_num,
  marker_label,
  h1,
  lead,
  align = "left",
}: PageHeaderProps) {
  return (
    <section className="page-header" data-align={align}>
      <div className="container">
        <div className={`page-header-inner align-${align}`}>
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
      </div>
    </section>
  );
}
