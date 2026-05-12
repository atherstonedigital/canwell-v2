import { Inline } from "@/components/signature/RichText";

interface IntroProps {
  intro_eyebrow: string;
  intro_h2: string;
  intro_body: string;
}

export function Intro({ intro_eyebrow, intro_h2, intro_body }: IntroProps) {
  return (
    <section className="intro">
      <div className="container">
        <div className="intro-inner">
          <p className="eyebrow">{intro_eyebrow}</p>
          <h2 className="display-h2">
            <Inline text={intro_h2} />
          </h2>
          <p className="intro-body">
            <Inline text={intro_body} />
          </p>
        </div>
      </div>
    </section>
  );
}
