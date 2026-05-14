import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { Steps } from "@/components/sections/Steps";
import { Cards } from "@/components/sections/Cards";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
import { Schema } from "@/components/Schema";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/schema";
import type { ServiceHubContent } from "@/lib/types";

interface SubPageMeta {
  parent?: string;
  subslug?: string;
}

interface Props {
  hub: ServiceHubContent;
}

export function ServiceHubTemplate({ hub }: Props) {
  // QA Audit 2026-05-12 — Task 10: build breadcrumb + service schemas per page.
  const meta = hub as ServiceHubContent & SubPageMeta;
  const isSub = Boolean(meta.parent && meta.subslug);
  const path = isSub ? `/${meta.parent}/${meta.subslug}` : `/${(hub as unknown as { slug?: string }).slug ?? ""}`;
  const parentName = isSub ? (meta.parent ?? "").replace(/-/g, " ") : "";
  const breadcrumbs = isSub
    ? [
        { name: "Home", url: "/" },
        { name: parentName.charAt(0).toUpperCase() + parentName.slice(1), url: `/${meta.parent}` },
        { name: hub.h1.replace(/\*/g, ""), url: path },
      ]
    : [
        { name: "Home", url: "/" },
        { name: hub.h1.replace(/\*/g, ""), url: path },
      ];

  return (
    <>
      <Schema id={`ld-breadcrumb-${path}`} payload={breadcrumbSchema(breadcrumbs)} />
      <Schema id={`ld-service-${path}`} payload={serviceSchema(hub, path)} />
      {hub.faqs && hub.faqs.length > 0 && (
        <Schema id={`ld-faq-${path}`} payload={faqSchema(hub.faqs)} />
      )}
      {/* QA Audit 2026-05-14 — Task 21: visible breadcrumbs on every service page. */}
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader
        eyebrow={hub.eyebrow}
        h1={hub.h1}
        lead={hub.lead}
        image={hub.image}
      />
      <Prose h2={hub.intro_h2} body={hub.intro_body} />

      {hub.cards && hub.cards.length > 0 && (
        <Cards
          h2={hub.cards_h2}
          intro={hub.cards_intro}
          cards={hub.cards}
          columns={hub.cards.length === 2 ? 2 : 3}
        />
      )}

      {hub.steps && hub.steps.length > 0 && (
        <Steps h2={hub.steps_h2} steps={hub.steps} />
      )}

      {hub.why_h2 && hub.why_body && (
        <Prose h2={hub.why_h2} body={hub.why_body} variant="tinted" />
      )}

      {hub.brands_h2 && hub.brands_body && (
        <Prose h2={hub.brands_h2} body={hub.brands_body} />
      )}

      {hub.faqs && hub.faqs.length > 0 && (
        <FAQ h2={hub.faq_h2} items={hub.faqs} />
      )}

      <CTABanner
        eyebrow={hub.cta_eyebrow}
        h2={hub.cta_h2}
        body={hub.cta_body}
        ctas={hub.ctas}
      />
    </>
  );
}
