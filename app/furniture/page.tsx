import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHubTemplate } from "@/components/templates/ServiceHubTemplate";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { getServiceHub } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const hub = getServiceHub("furniture");
  if (!hub) return {};
  return {
    title: hub.meta_title,
    description: hub.meta_description,
    alternates: { canonical: "/furniture" },
  };
}

export default function FurniturePage() {
  const hub = getServiceHub("furniture");
  if (!hub) notFound();
  return (
    <>
      <ServiceHubTemplate hub={hub} />
      {/* QA Audit 2026-05-14 — Task 26: cross-links to brands and key sub-pages. */}
      <RelatedLinks
        links={[
          { label: "Sofas at Canwell", url: "/furniture/sofas" },
          { label: "Dining furniture", url: "/furniture/dining" },
          { label: "Bedroom furniture", url: "/furniture/bedroom" },
          { label: "All brands we stock", url: "/brands" },
        ]}
      />
    </>
  );
}
