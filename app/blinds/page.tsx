import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHubTemplate } from "@/components/templates/ServiceHubTemplate";
import { getServiceHub } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const hub = getServiceHub("blinds");
  if (!hub) return {};
  return {
    title: hub.meta_title,
    description: hub.meta_description,
    alternates: { canonical: "/blinds" },
  };
}

export default function BlindsPage() {
  const hub = getServiceHub("blinds");
  if (!hub) notFound();
  return <ServiceHubTemplate hub={hub} />;
}
