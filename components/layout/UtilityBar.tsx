import type { SiteSettings } from "@/lib/types";

interface UtilityBarProps {
  site: SiteSettings;
}

export function UtilityBar({ site }: UtilityBarProps) {
  return (
    <div className="utility-bar">
      <div className="container">
        <span>{site.opening_hours_summary}</span>
        <span className="sep" aria-hidden="true">·</span>
        <span>{site.phone}</span>
        <span className="sep" aria-hidden="true">·</span>
        <span>{site.address_line_1}</span>
      </div>
    </div>
  );
}
