import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import { Placeholder } from "@/components/signature/Placeholder";
import { getArticle, getArticles, getInspirationHub } from "@/lib/content";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.meta_title, description: a.meta_description };
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
  const hub = getInspirationHub();

  marked.setOptions({ gfm: true, breaks: false });
  const rawHtml = await marked.parse((article as unknown as { body?: string }).body ?? "");
  const html = renderPlaceholders(rawHtml as string);

  return (
    <>
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
              {article.is_placeholder && (
                <>
                  <span className="sep" aria-hidden="true">·</span>
                  <Placeholder label="Draft article" />
                </>
              )}
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
