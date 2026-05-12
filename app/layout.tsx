import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import { getNavigation, getSite } from "@/lib/content";
import { localBusinessSchema } from "@/lib/schema";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://canwell-v2.netlify.app";
// QA Audit 2026-05-12 — Task 21: dev site noindex; flip to true at launch.
const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === "true";

export async function generateMetadata(): Promise<Metadata> {
  const site = getSite();
  const icons: Metadata["icons"] = site.favicon
    ? {
        icon: [
          { url: site.favicon },
          { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
        ],
        apple: site.apple_touch_icon || site.favicon,
      }
    : undefined;

  const defaultTitle =
    "Canwell Interiors — Furnishings Showroom in Broadway, Cotswolds";
  const description =
    "The Cotswolds furnishings showroom at the Cotswold Design Centre in Broadway. Furniture, carpets, curtains, blinds, and honest design help, all under one roof. Open seven days.";

  return {
    metadataBase: new URL(SITE_URL),
    // QA Audit 2026-05-12 — Task 1: template strips the duplicate brand suffix.
    title: {
      default: defaultTitle,
      template: `%s · ${site.site_name}`,
    },
    description,
    // QA Audit 2026-05-12 — Task 15: canonical defaults to homepage; pages override.
    alternates: {
      canonical: "/",
    },
    // QA Audit 2026-05-12 — Task 21: gate indexing behind env flag.
    robots: INDEXABLE
      ? { index: true, follow: true }
      : { index: false, follow: false },
    // QA Audit 2026-05-12 — Task 9: site-wide OG/Twitter defaults with image.
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: site.site_name,
      title: defaultTitle,
      description,
      images: [
        {
          url: "/og/canwell-default.jpg",
          width: 1200,
          height: 630,
          alt: "The Canwell Interiors showroom in Broadway, Cotswolds",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description,
      images: ["/og/canwell-default.jpg"],
    },
    icons,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSite();
  const nav = getNavigation();
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        {/* QA Audit 2026-05-12 — Task 17: skip link for keyboard users. */}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(site)) }}
        />
        {/* QA Audit 2026-05-12 — Task 20: Plausible analytics (gated until production domain set). */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <UtilityBar site={site} />
        <Header />
        <main id="main">{children}</main>
        <Footer site={site} nav={nav} />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">{`
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", function (user) {
              if (!user) {
                window.netlifyIdentity.on("login", function () {
                  document.location.href = "/admin/";
                });
              }
            });
          }
        `}</Script>
      </body>
    </html>
  );
}
