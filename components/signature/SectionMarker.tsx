import { Rings } from "./Rings";

interface SectionMarkerProps {
  num: string;
  label: string;
  onDark?: boolean;
}

export function SectionMarker({
  num,
  label,
  onDark = false,
}: SectionMarkerProps) {
  const classes = ["section-marker", onDark ? "on-dark" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes}>
      <Rings size="sm" onDark={onDark}>
        <span className="num">{num}</span>
      </Rings>
      <span className="label">{label}</span>
    </div>
  );
}
