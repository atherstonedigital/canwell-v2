import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import { getSite } from "@/lib/content";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://canwell-v2.netlify.app"),
  title: {
    default: "Canwell Interiors — Furnishings Showroom in Broadway, Cotswolds",
    template: "%s · Canwell Interiors",
  },
  description:
    "The Cotswolds furnishings showroom on Broadway High Street. Furniture, carpets, curtains, blinds, and honest design help, all under one roof. Open seven days.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Canwell Interiors",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSite();
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(site)) }}
        />
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <UtilityBar site={site} />
        <Header />
        <main>{children}</main>
        <Footer site={site} />
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
