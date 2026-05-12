import type { Metadata } from "next";
import { ServiceHubTemplate } from "@/components/templates/ServiceHubTemplate";
import {
  buildSubPageMetadata,
  getSubPageOr404,
  listSubPagesForParent,
} from "@/lib/subpages";

export function generateStaticParams() {
  return listSubPagesForParent("curtains").map((p) => ({ slug: p.subslug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildSubPageMetadata("curtains", slug);
}

export default async function CurtainsSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSubPageOr404("curtains", slug);
  return <ServiceHubTemplate hub={page} />;
}
