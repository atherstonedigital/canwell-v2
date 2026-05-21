import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHubTemplate } from "@/components/templates/ServiceHubTemplate";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { getServiceHub } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const hub = getServiceHub("carpets");
  if (!hub) return {};
  return pageMetadata({
    title: hub.meta_title,
    description: hub.meta_description,
    canonical: "/carpets",
  });
}

export default function CarpetsPage() {
  const hub = getServiceHub("carpets");
  if (!hub) notFound();
  return (
    <>
      <ServiceHubTemplate hub={hub} />
      {/* QA Audit 2026-05-14 — Task 26: cross-link to the related design-help service. */}
      <RelatedLinks
        links={[
          {
            label: "Carpets, measured and fitted",
            url: "/carpets/measured-and-fitted",
            description: "the full fitted-carpet service",
          },
          {
            label: "Free home visit",
            url: "/design-help/home-visit",
            description: "we measure and bring samples to the room",
          },
        ]}
      />
    </>
  );
}
