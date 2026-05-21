import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHubTemplate } from "@/components/templates/ServiceHubTemplate";
import { getServiceHub } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const hub = getServiceHub("soft-furnishings");
  if (!hub) return {};
  return pageMetadata({
    title: hub.meta_title,
    description: hub.meta_description,
    canonical: "/soft-furnishings",
  });
}

export default function SoftFurnishingsPage() {
  const hub = getServiceHub("soft-furnishings");
  if (!hub) notFound();
  return <ServiceHubTemplate hub={hub} />;
}
