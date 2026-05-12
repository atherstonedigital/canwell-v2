import Link from "next/link";
import type { Metadata } from "next";
import { RuleRinged } from "@/components/signature/RuleRinged";
import { Inline } from "@/components/signature/RichText";
import { getNotFound } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const nf = getNotFound();
  return { title: nf.meta_title, description: nf.meta_description };
}

export default function NotFound() {
  const nf = getNotFound();
  return (
    <div className="not-found">
      <RuleRinged />
      <h1>
        <Inline text={nf.h1} />
      </h1>
      <p>
        <Inline text={nf.body} />
      </p>
      <div
        style={{
          display: "flex",
          gap: "var(--s-4)",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {nf.ctas.map((cta, i) => {
          const cls =
            cta.variant === "tertiary"
              ? "btn btn-tertiary"
              : cta.variant === "secondary"
              ? "btn btn-secondary"
              : "btn btn-primary";
          return (
            <Link key={i} href={cta.url} className={cls}>
              {cta.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
