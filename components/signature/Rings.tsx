import type { ReactNode } from "react";

type RingsSize = "sm" | "md" | "lg" | "xl";

interface RingsProps {
  size?: RingsSize;
  onDark?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Rings({
  size = "md",
  onDark = false,
  className = "",
  children,
}: RingsProps) {
  const classes = [
    "rings",
    `rings-${size}`,
    onDark ? "rings-on-dark" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes} aria-hidden="true">
      {children}
    </div>
  );
}
