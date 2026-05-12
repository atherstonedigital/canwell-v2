interface PlaceholderProps {
  label?: string;
}

export function Placeholder({ label = "Needs Gary" }: PlaceholderProps) {
  return (
    <span
      className="placeholder-pill"
      title="Awaiting content. Edit via the admin to replace."
    >
      {label}
    </span>
  );
}
