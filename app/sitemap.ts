import type { MetadataRoute } from "next";
import {
  getBrands,
  getLocations,
  getPublishedArticles,
  getServiceHubs,
  getSubPages,
} from "@/lib/content";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://canwell-v2.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "/",
    "/visit",
    "/about",
    "/contact",
    "/design-help",
    "/brands",
    "/locations",
    "/inspiration",
  ];

  const hubs = getServiceHubs().map((h) => `/${(h as unknown as { slug: string }).slug}`);

  const subpages = getSubPages().map((p) => {
    const meta = p as unknown as { parent: string; subslug: string };
    return `/${meta.parent}/${meta.subslug}`;
  });

  const brandRoutes = getBrands().map((b) => `/brands/${b.slug}`);
  const locationRoutes = getLocations().map((l) => `/locations/${l.slug}`);
  // QA Audit 2026-05-14 — Task 4: drafts stay out of the sitemap.
  const articleRoutes = getPublishedArticles().map(
    (a) => `/inspiration/${a.slug}`
  );

  const all = [
    ...staticRoutes,
    ...hubs,
    ...subpages,
    ...brandRoutes,
    ...locationRoutes,
    ...articleRoutes,
  ];

  return all.map((path) => ({
    url: new URL(path, BASE).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
