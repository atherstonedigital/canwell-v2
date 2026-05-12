import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { CTABanner } from "@/components/sections/CTABanner";
import { Placeholder } from "@/components/signature/Placeholder";
import { getArticles, getInspirationHub } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const h = getInspirationHub();
  return { title: h.meta_title, description: h.meta_description };
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
      <PageHeader eyebrow={hub.eyebrow} h1={hub.h1} lead={hub.lead} />
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
                <div className="article-card-image" />
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

      <CTABanner
        eyebrow="Subscribe"
        h2="New pieces, in the *weekly email*."
        body="We publish a new piece roughly every fortnight. The Friday email includes anything new along with new arrivals in the showroom and any upcoming events. One email a week. Unsubscribe in one click."
        ctas={[
          { label: "Get the weekly update", url: "/#subscribe", variant: "primary" },
          { label: "Visit the showroom", url: "/visit", variant: "secondary" },
          { label: "Book a design consultation", url: "/design-help/in-store-consultation", variant: "tertiary" },
        ]}
      />
    </>
  );
}
