import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { CTABanner } from "@/components/sections/CTABanner";
import { Placeholder } from "@/components/signature/Placeholder";
import { getArticles, getInspirationHub } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const h = getInspirationHub();
  return {
    title: h.meta_title,
    description: h.meta_description,
    alternates: { canonical: "/inspiration" },
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

export default function InspirationHubPage() {
  const hub = getInspirationHub();
  const articles = getArticles().sort((a, b) =>
    (b.date_published || "").localeCompare(a.date_published || "")
  );

  return (
    <>
      <PageHeader eyebrow={hub.eyebrow} h1={hub.h1} lead={hub.lead} image={hub.image} />
      <Prose h2="Why we write these" body={hub.intro_body} />

      <section className="prose-section">
        <div className="container">
          <h2 className="display-h2" style={{ marginBottom: "var(--s-7)" }}>
            Articles
          </h2>
          <div className="article-list">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/inspiration/${article.slug}`}
                className="article-card"
              >
                <div className="article-card-image">
                  {article.image && (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="article-meta">
                  <span>{article.category}</span>
                  <span className="sep" aria-hidden="true">·</span>
                  <span>{formatDate(article.date_published)}</span>
                  <span className="sep" aria-hidden="true">·</span>
                  <span>{article.read_time}</span>
                  {article.is_placeholder && (
                    <>
                      <span className="sep" aria-hidden="true">·</span>
                      <Placeholder label="Draft" />
                    </>
                  )}
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {hub.subscribe_h2 && (
        <CTABanner
          eyebrow="Subscribe"
          h2={hub.subscribe_h2}
          body={hub.subscribe_body}
          ctas={hub.subscribe_ctas || []}
        />
      )}
    </>
  );
}
