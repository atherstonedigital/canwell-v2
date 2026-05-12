import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { Steps } from "@/components/sections/Steps";
import { Cards } from "@/components/sections/Cards";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
import type { ServiceHubContent } from "@/lib/types";

interface Props {
  hub: ServiceHubContent;
}

export function ServiceHubTemplate({ hub }: Props) {
  return (
    <>
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
