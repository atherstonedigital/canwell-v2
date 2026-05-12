import { Inline, Paragraphs } from "@/components/signature/RichText";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  eyebrow?: string;
  h2?: string;
  items: FAQItem[];
}

export function FAQ({ eyebrow, h2, items }: FAQProps) {
  return (
    <section className="faq-section">
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {h2 && (
          <h2 className="display-h2 faq-h2">
            <Inline text={h2} />
          </h2>
        )}
        <ul className="faq-list">
          {items.map((item, idx) => (
            <li key={idx} className="faq-item">
              <h3 className="faq-question">
                <Inline text={item.question} />
              </h3>
              <div className="faq-answer">
                <Paragraphs text={item.answer} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
