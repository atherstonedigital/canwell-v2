import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { Cards } from "@/components/sections/Cards";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
import { Inline } from "@/components/signature/RichText";
import { getDesignHelpHub } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const d = getDesignHelpHub();
  return { title: d.meta_title, description: d.meta_description };
}

export default function DesignHelpPage() {
  const d = getDesignHelpHub();
  return (
    <>
      <PageHeader eyebrow={d.eyebrow} h1={d.h1} lead={d.lead} image={d.image} />
      <Prose h2={d.intro_h2} body={d.intro_body} />

      <Cards
        h2={d.routes_h2}
        cards={d.routes}
        columns={2}
      />

      <section className="prose-section variant-tinted">
        <div className="container">
          <div className="prose-inner" style={{ maxWidth: "880px" }}>
            <h2 className="display-h2" style={{ marginBottom: "var(--s-6)" }}>
              <Inline text={d.small_print_h2} />
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-7)" }}>
              <div>
                <h3 className="heading-h4" style={{ marginBottom: "var(--s-3)" }}>What you get</h3>
                <ul style={{ paddingLeft: "var(--s-5)", color: "var(--color-text-secondary)" }}>
                  {d.what_you_get.map((item, i) => (
                    <li key={i} style={{ marginBottom: "var(--s-2)" }}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="heading-h4" style={{ marginBottom: "var(--s-3)" }}>What we don&apos;t do</h3>
                <ul style={{ paddingLeft: "var(--s-5)", color: "var(--color-text-secondary)" }}>
                  {d.what_we_dont.map((item, i) => (
                    <li key={i} style={{ marginBottom: "var(--s-2)" }}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Prose h2={d.saverys_h2} body={d.saverys_body} />
      <FAQ h2={d.faq_h2} items={d.faqs} />
      <CTABanner
        eyebrow={d.cta_eyebrow}
        h2={d.cta_h2}
        body={d.cta_body}
        ctas={d.ctas}
      />
    </>
  );
}
