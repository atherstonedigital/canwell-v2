import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { CTABanner } from "@/components/sections/CTABanner";
import { Schema } from "@/components/Schema";
import { breadcrumbSchema } from "@/lib/schema";
import { Inline } from "@/components/signature/RichText";
import { MarkdownBody } from "@/components/signature/MarkdownBody";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { getSite, getVisit } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const v = getVisit();
  return {
    title: v.meta_title,
    description: v.meta_description,
    alternates: { canonical: "/visit" },
  };
}

export default function VisitPage() {
  const v = getVisit();
  const site = getSite();
  const ctas = v.ctas.map((cta) =>
    cta.label === "Get directions" && !cta.url
      ? { ...cta, url: site.directions_url || "/visit" }
      : cta
  );

  // QA Audit 2026-05-14 — Task 17: render the "How to find us" body with
  // tappable tel: and mailto: links. The content keeps the phone and email
  // as plain markdown link references so the source is still editable.
  const phoneTel = site.phone.replace(/\s+/g, "");
  const howToFindBody = v.how_to_find_body
    .replace(site.phone, `[${site.phone}](tel:${phoneTel})`)
    .replace(site.email, `[${site.email}](mailto:${site.email})`);

  return (
    <>
      <Schema
        id="ld-breadcrumb-visit"
        payload={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Visit", url: "/visit" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Visit", url: "/visit" },
        ]}
      />
      <PageHeader eyebrow={v.eyebrow} h1={v.h1} lead={v.lead} image={v.image} />

      <section className="prose-section">
        <div className="container">
          <div className="prose-inner">
            <h2 className="display-h2">
              <Inline text={v.how_to_find_h2} />
            </h2>
            <MarkdownBody className="prose-body" text={howToFindBody} />

            <h2 className="display-h2" style={{ marginTop: "var(--s-8)" }}>
              <Inline text={v.opening_hours_h2} />
            </h2>
            <table className="hours-table">
              <tbody>
                <tr>
                  <th>Mon–Fri</th>
                  <td>{site.opening_hours_weekday}</td>
                </tr>
                <tr>
                  <th>Saturday</th>
                  <td>{site.opening_hours_saturday}</td>
                </tr>
                <tr>
                  <th>Sunday</th>
                  <td>{site.opening_hours_sunday}</td>
                </tr>
              </tbody>
            </table>
            <p className="small" style={{ marginTop: "var(--s-4)", color: "var(--color-text-muted)" }}>
              {v.opening_hours_microcopy}
            </p>
          </div>
        </div>
      </section>

      {/* QA Audit 2026-05-14 — Task 19: embedded Google Map. */}
      <MapEmbed
        address={`${site.address_line_1}, ${site.address_line_2}, ${site.postcode}`}
        directionsUrl={site.directions_url}
      />

      <Prose
        h2={v.getting_here_h2}
        body={v.getting_here_intro}
        variant="tinted"
      >
        <div className="prose-body" style={{ marginTop: "var(--s-5)" }}>
          {v.getting_here_blocks.map((block, i) => (
            <div key={i} style={{ marginBottom: "var(--s-5)" }}>
              <h3>{block.title}</h3>
              <MarkdownBody text={block.body} />
            </div>
          ))}
        </div>
      </Prose>

      <Prose h2={v.what_to_expect_h2} body={v.what_to_expect_body} />
      <Prose h2={v.accessibility_h2} body={v.accessibility_body} variant="tinted" />
      <Prose h2={v.sister_h2} body={v.sister_body} />

      <CTABanner
        eyebrow={v.cta_eyebrow}
        h2={v.cta_h2}
        body={v.cta_body}
        ctas={ctas}
      />
    </>
  );
}
