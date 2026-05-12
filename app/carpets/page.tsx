import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHubTemplate } from "@/components/templates/ServiceHubTemplate";
import { getServiceHub } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const hub = getServiceHub("carpets");
  if (!hub) return {};
  return { title: hub.meta_title, description: hub.meta_description };
}

export default function CarpetsPage() {
  const hub = getServiceHub("carpets");
  if (!hub) notFound();
  return <ServiceHubTemplate hub={hub} />;
}
