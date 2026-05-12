import type { Metadata } from "next";
import { ServiceHubTemplate } from "@/components/templates/ServiceHubTemplate";
import {
  buildSubPageMetadata,
  getSubPageOr404,
  listSubPagesForParent,
} from "@/lib/subpages";

export function generateStaticParams() {
  return listSubPagesForParent("carpets").map((p) => ({ slug: p.subslug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildSubPageMetadata("carpets", slug);
}

export default async function CarpetsSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSubPageOr404("carpets", slug);
  return <ServiceHubTemplate hub={page} />;
}
