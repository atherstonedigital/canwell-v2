import { Inline, Paragraphs } from "@/components/signature/RichText";

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
          {body && (
            <div className="prose-body">
              <Paragraphs text={body} />
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
