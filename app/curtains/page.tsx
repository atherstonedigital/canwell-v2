import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHubTemplate } from "@/components/templates/ServiceHubTemplate";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { getServiceHub } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const hub = getServiceHub("curtains");
  if (!hub) return {};
  return {
    title: hub.meta_title,
    description: hub.meta_description,
    alternates: { canonical: "/curtains" },
  };
}

export default function CurtainsPage() {
  const hub = getServiceHub("curtains");
  if (!hub) notFound();
  return (
    <>
      <ServiceHubTemplate hub={hub} />
      {/* QA Audit 2026-05-14 — Task 26: cross-link to design help and the MTM subpage. */}
      <RelatedLinks
        links={[
          {
            label: "Made-to-measure curtains",
            url: "/curtains/made-to-measure",
            description: "the full bespoke curtain service",
          },
          {
            label: "Free home visit",
            url: "/design-help/home-visit",
            description: "we measure and bring fabric to the room",
          },
        ]}
      />
    </>
  );
}
