import { Inline } from "@/components/signature/RichText";
import { MarkdownBody } from "@/components/signature/MarkdownBody";

export interface Step {
  title: string;
  body: string;
}

interface StepsProps {
  eyebrow?: string;
  h2?: string;
  steps: Step[];
}

export function Steps({ eyebrow, h2, steps }: StepsProps) {
  return (
    <section className="steps-section">
      <div className="container">
        {eyebrow && <p className="eyebrow steps-eyebrow">{eyebrow}</p>}
        {h2 && (
          <h2 className="display-h2 steps-h2">
            <Inline text={h2} />
          </h2>
        )}
        <ol className="steps-grid">
          {steps.map((step, idx) => (
            <li key={idx} className="step-card">
              <span className="step-num" aria-hidden="true">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="step-title">
                <Inline text={step.title} />
              </h3>
              <MarkdownBody className="step-body" text={step.body} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
