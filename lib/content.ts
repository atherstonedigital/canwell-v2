import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  AboutContent,
  ArticleContent,
  BrandPageContent,
  BrandsHubContent,
  ContactContent,
  DesignHelpContent,
  HomepageContent,
  InspirationHubContent,
  LocationPageContent,
  LocationsHubContent,
  NavigationContent,
  NewInItem,
  NotFoundContent,
  Review,
  ServiceHubContent,
  SiteSettings,
  SubPageContent,
  VisitContent,
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function readMarkdownData(relativePath: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const filePath = path.join(CONTENT_ROOT, relativePath);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  return { data: parsed.data, content: parsed.content };
}

function readMarkdown(relativePath: string): Record<string, unknown> {
  return readMarkdownData(relativePath).data;
}

function readCollection(
  folder: string
): Array<Record<string, unknown> & { slug: string; body?: string }> {
  const dir = path.join(CONTENT_ROOT, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug, body: content.trim(), ...data };
    });
}

export function getSite(): SiteSettings {
  return readMarkdown("singletons/site.md") as unknown as SiteSettings;
}

export function getNavigation(): NavigationContent {
  return readMarkdown("singletons/navigation.md") as unknown as NavigationContent;
}

export function getNotFound(): NotFoundContent {
  return readMarkdown("singletons/not-found.md") as unknown as NotFoundContent;
}

export function getHomepage(): HomepageContent {
  return readMarkdown("singletons/homepage.md") as unknown as HomepageContent;
}

export function getVisit(): VisitContent {
  return readMarkdown("singletons/visit.md") as unknown as VisitContent;
}

export function getAbout(): AboutContent {
  return readMarkdown("singletons/about.md") as unknown as AboutContent;
}

export function getContact(): ContactContent {
  return readMarkdown("singletons/contact.md") as unknown as ContactContent;
}

export function getDesignHelpHub(): DesignHelpContent {
  return readMarkdown("singletons/design-help.md") as unknown as DesignHelpContent;
}

export function getBrandsHub(): BrandsHubContent {
  return readMarkdown("singletons/brands-hub.md") as unknown as BrandsHubContent;
}

export function getLocationsHub(): LocationsHubContent {
  return readMarkdown("singletons/locations-hub.md") as unknown as LocationsHubContent;
}

export function getInspirationHub(): InspirationHubContent {
  return readMarkdown("singletons/inspiration-hub.md") as unknown as InspirationHubContent;
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

export function getServiceHubs(): ServiceHubContent[] {
  return readCollection("service-hubs") as unknown as ServiceHubContent[];
}

export function getServiceHub(slug: string): ServiceHubContent | undefined {
  return getServiceHubs().find((s) => (s as unknown as { slug: string }).slug === slug);
}

export function getSubPages(): SubPageContent[] {
  return readCollection("service-subpages") as unknown as SubPageContent[];
}

export function getSubPage(slug: string): SubPageContent | undefined {
  return getSubPages().find((p) => p.slug === slug);
}

export function getBrands(): BrandPageContent[] {
  return readCollection("brands") as unknown as BrandPageContent[];
}

export function getBrand(slug: string): BrandPageContent | undefined {
  return getBrands().find((b) => b.slug === slug);
}

export function getLocations(): LocationPageContent[] {
  return readCollection("locations") as unknown as LocationPageContent[];
}

export function getLocation(slug: string): LocationPageContent | undefined {
  return getLocations().find((l) => l.slug === slug);
}

export function getArticles(): ArticleContent[] {
  return readCollection("articles") as unknown as ArticleContent[];
}

export function getArticle(slug: string): ArticleContent | undefined {
  return getArticles().find((a) => a.slug === slug);
}

// QA Audit 2026-05-14 — Task 3/4: derive publish status with a legacy fallback.
// Anything missing an explicit `status` field, or carrying the legacy
// `is_placeholder: true` marker, is treated as a draft.
export function isPublishedArticle(article: ArticleContent): boolean {
  if (article.status === "published") return true;
  if (article.status === "draft") return false;
  return article.is_placeholder === false;
}

export function getPublishedArticles(): ArticleContent[] {
  return getArticles()
    .filter(isPublishedArticle)
    .sort((a, b) =>
      (b.date_published || "").localeCompare(a.date_published || "")
    );
}
