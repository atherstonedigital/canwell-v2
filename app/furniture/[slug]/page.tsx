import type { Metadata } from "next";
import { ServiceHubTemplate } from "@/components/templates/ServiceHubTemplate";
import { RelatedLinks, type RelatedLink } from "@/components/sections/RelatedLinks";
import {
  buildSubPageMetadata,
  getSubPageOr404,
  listSubPagesForParent,
} from "@/lib/subpages";

// QA Audit 2026-05-14 — Task 26: per-subpage related-content. Sofas link
// to the brands that supply them; other subpages get a sensible default.
const RELATED_BY_SLUG: Record<string, RelatedLink[]> = {
  sofas: [
    {
      label: "Richmond Interiors at Canwell",
      url: "/brands/richmond-interiors",
    },
    { label: "Hills Furniture at Canwell", url: "/brands/hills-furniture" },
    { label: "Free design consultation", url: "/design-help/in-store-consultation" },
  ],
};

const DEFAULT_RELATED: RelatedLink[] = [
  { label: "All furniture", url: "/furniture" },
  { label: "All brands we stock", url: "/brands" },
  { label: "Plan your visit", url: "/visit" },
];

export function generateStaticParams() {
  return listSubPagesForParent("furniture").map((p) => ({ slug: p.subslug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildSubPageMetadata("furniture", slug);
}

export default async function FurnitureSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSubPageOr404("furniture", slug);
  return (
    <>
      <ServiceHubTemplate hub={page} />
      <RelatedLinks links={RELATED_BY_SLUG[slug] ?? DEFAULT_RELATED} />
    </>
  );
}
