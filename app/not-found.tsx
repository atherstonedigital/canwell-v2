import Link from "next/link";
import { RuleRinged } from "@/components/signature/RuleRinged";

export default function NotFound() {
  return (
    <div className="not-found">
      <RuleRinged />
      <h1>That page is not here.</h1>
      <p>The showroom still is. Pop in, or pick something below.</p>
      <div style={{ display: "flex", gap: "var(--s-4)", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn btn-primary">Back to the homepage</Link>
        <Link href="/visit" className="btn btn-secondary">Plan your visit</Link>
      </div>
    </div>
  );
}
