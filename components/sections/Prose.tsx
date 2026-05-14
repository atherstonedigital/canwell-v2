import { Inline } from "@/components/signature/RichText";
import { MarkdownBody } from "@/components/signature/MarkdownBody";

interface ProseProps {
  eyebrow?: string;
  h2?: string;
  body?: string;
  align?: "left" | "centre";
  variant?: "default" | "tinted";
  children?: React.ReactNode;
}

export function Prose({
  eyebrow,
  h2,
  body,
  align = "left",
  variant = "default",
  children,
}: ProseProps) {
  return (
    <section
      className={`prose-section variant-${variant} align-${align}`}
    >
      <div className="container">
        <div className={`prose-inner align-${align}`}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {h2 && (
            <h2 className="display-h2">
              <Inline text={h2} />
            </h2>
          )}
          {/* QA Audit 2026-05-14 — Task 7: body now renders through marked so
              **bold**, bullet lists, and inline links work consistently. */}
          {body && <MarkdownBody text={body} className="prose-body" />}
          {children}
        </div>
      </div>
    </section>
  );
}
