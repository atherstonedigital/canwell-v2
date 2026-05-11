import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  HomepageContent,
  NewInItem,
  Review,
  SiteSettings,
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function readMarkdown(relativePath: string): Record<string, unknown> {
  const filePath = path.join(CONTENT_ROOT, relativePath);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  return data;
}

function readCollection(folder: string): Array<Record<string, unknown> & { slug: string }> {
  const dir = path.join(CONTENT_ROOT, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return { slug, ...data };
    });
}

export function getSite(): SiteSettings {
  return readMarkdown("singletons/site.md") as unknown as SiteSettings;
}

export function getHomepage(): HomepageContent {
  return readMarkdown("singletons/homepage.md") as unknown as HomepageContent;
}

export function getReviews(): Review[] {
  return readCollection("reviews") as unknown as Review[];
}

export function getReviewsBySlug(slugs: string[]): Review[] {
  const all = getReviews();
  const bySlug = new Map(all.map((r) => [r.slug, r]));
  return slugs.map((s) => bySlug.get(s)).filter((r): r is Review => Boolean(r));
}

export function getNewIn(): NewInItem[] {
  return readCollection("new-in") as unknown as NewInItem[];
}

export function getNewInBySlug(slugs: string[]): NewInItem[] {
  const all = getNewIn();
  const bySlug = new Map(all.map((i) => [i.slug, i]));
  return slugs
    .map((s) => bySlug.get(s))
    .filter((i): i is NewInItem => Boolean(i));
}
