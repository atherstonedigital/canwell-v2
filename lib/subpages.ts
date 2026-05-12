import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ServiceHubContent } from "./types";
import { getSubPages } from "./content";

interface SubPageWithMeta extends ServiceHubContent {
  parent: string;
  subslug: string;
}

export function findSubPage(parent: string, subslug: string): SubPageWithMeta | undefined {
  const pages = getSubPages() as unknown as SubPageWithMeta[];
  return pages.find((p) => p.parent === parent && p.subslug === subslug);
}

export function listSubPagesForParent(parent: string): SubPageWithMeta[] {
  const pages = getSubPages() as unknown as SubPageWithMeta[];
  return pages.filter((p) => p.parent === parent);
}

export function buildSubPageMetadata(parent: string, subslug: string): Metadata {
  const page = findSubPage(parent, subslug);
  if (!page) return {};
  return { title: page.meta_title, description: page.meta_description };
}

export function getSubPageOr404(parent: string, subslug: string): SubPageWithMeta {
  const page = findSubPage(parent, subslug);
  if (!page) notFound();
  return page;
}
