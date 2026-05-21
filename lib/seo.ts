import type { Metadata } from "next";
import { getSite } from "./content";

const DEFAULT_OG_IMAGE = "/og/canwell-default.jpg";
const DEFAULT_OG_ALT = "The Canwell Interiors showroom in Broadway, Cotswolds";

export interface PageMetaInput {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  imageAlt?: string;
  robots?: Metadata["robots"];
}

function brandKey(siteName: string): string {
  return siteName.split(/\s+/)[0].toLowerCase();
}

function resolveTitle(title: string | undefined, siteName: string): Metadata["title"] | undefined {
  if (!title) return undefined;
  const trimmed = title.trim();
  // Page title already mentions the brand (e.g. "Areas We Serve | Canwell, Broadway").
  // Skip the template suffix so we don't render "Canwell ... · Canwell Interiors".
  if (trimmed.toLowerCase().includes(brandKey(siteName))) {
    return { absolute: trimmed };
  }
  return trimmed;
}

export function pageMetadata(input: PageMetaInput): Metadata {
  const site = getSite();
  const titleField = resolveTitle(input.title, site.site_name);
  const ogTwitterTitle = input.title?.trim() || undefined;
  const description = input.description?.trim() || undefined;

  const imageUrl = input.image || DEFAULT_OG_IMAGE;
  const imageAlt = input.imageAlt || DEFAULT_OG_ALT;

  const meta: Metadata = {
    ...(titleField !== undefined && { title: titleField }),
    ...(description && { description }),
    ...(input.canonical && { alternates: { canonical: input.canonical } }),
    ...(input.robots && { robots: input.robots }),
    openGraph: {
      ...(ogTwitterTitle && { title: ogTwitterTitle }),
      ...(description && { description }),
      ...(input.canonical && { url: input.canonical }),
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      ...(ogTwitterTitle && { title: ogTwitterTitle }),
      ...(description && { description }),
      images: [imageUrl],
    },
  };

  return meta;
}
