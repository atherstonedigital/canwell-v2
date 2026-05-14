import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import { Schema } from "@/components/Schema";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  getArticle,
  getArticles,
  getInspirationHub,
  getSite,
  isPublishedArticle,
} from "@/lib/content";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

// QA Audit 2026-05-14 — Task 4: only pre-render published articles. Drafts
// fall through to the production-time check below and 404 cleanly.
export function generateStaticParams() {
  return getArticles()
    .filter(isPublishedArticle)
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.meta_title,
    description: a.meta_description,
    alternates: { canonical: `/inspiration/${slug}` },
    openGraph: {
      type: "article",
      title: a.meta_title,
      description: a.meta_description,
      publishedTime: a.date_published || undefined,
      authors: ["Canwell Interiors"],
    },
  };
}

function formatDate(iso: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function renderPlaceholders(html: string): string {
  return html.replace(
    /\{\{([A-Z0-9_]+)\}\}/g,
    (_match, label) =>
      `<span class="placeholder-pill" title="Awaiting content. Edit via the admin to replace.">${label}</span>`
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  // QA Audit 2026-05-14 — Task 4: drafts always 404 in production. On
  // staging/preview deploys they remain readable so editors can preview.
  const isProduction = process.env.NODE_ENV === "production";
  const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";
  const draft = !isPublishedArticle(article);
  if (draft && isProduction && indexable) notFound();

  const hub = getInspirationHub();
  const site = getSite();

  marked.setOptions({ gfm: true, breaks: false });
  const rawHtml = await marked.parse((article as unknown as { body?: string }).body ?? "");
  const html = renderPlaceholders(rawHtml as string);

  return (
    <>
      <Schema
        id={`ld-breadcrumb-article-${slug}`}
        payload={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Inspiration", url: "/inspiration" },
          { name: article.title, url: `/inspiration/${slug}` },
        ])}
      />
      <Schema
        id={`ld-article-${slug}`}
        payload={articleSchema(article, site)}
      />
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Inspiration", url: "/inspiration" },
          { name: article.title, url: `/inspiration/${slug}` },
        ]}
      />

      {draft && (
        // QA Audit 2026-05-14 — Task 3: draft preview banner on staging only.
        <div
          role="status"
          style={{
            background: "var(--color-gold-pale)",
            color: "var(--color-gold-dark)",
            textAlign: "center",
            padding: "12px 16px",
            fontSize: "var(--fs-small)",
          }}
        >
          Draft preview. Not visible to readers on production.
        </div>
      )}

      <PageHeader
        eyebrow={article.category}
        h1={article.title}
        lead={article.excerpt}
        image={article.image}
      />

      <section className="prose-section">
        <div className="container">
          <div className="prose-inner">
            <div className="article-meta" style={{ marginBottom: "var(--s-6)" }}>
              <span>{formatDate(article.date_published)}</span>
              <span className="sep" aria-hidden="true">·</span>
              <span>{article.read_time}</span>
            </div>
            <div
              className="prose-body"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <p style={{ marginTop: "var(--s-7)" }}>
              <Link href="/inspiration" className="btn btn-tertiary">
                Back to all articles
              </Link>
            </p>
          </div>
        </div>
      </section>

      {hub.article_end_h2 && (
        <CTABanner
          eyebrow={hub.article_end_eyebrow}
          h2={hub.article_end_h2}
          body={hub.article_end_body}
          ctas={hub.article_end_ctas || []}
        />
      )}
    </>
  );
}
