interface StampProps {
  line1: string;
  line2: string;
  onDark?: boolean;
}

export function Stamp({ line1, line2, onDark = false }: StampProps) {
  const classes = ["stamp", onDark ? "stamp-on-dark" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes}>
      <span className="stamp-line-1">{line1}</span>
      <span className="stamp-line-2">{line2}</span>
    </div>
  );
}
