"use client";

import Script from "next/script";

const PROD_HOSTNAME = "canwellinteriors.com";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Gated GA4 loader. Returns null (loads nothing) on the server, on any hostname
// other than the production domain (preview deploys, the *.netlify.app
// subdomain, localhost), or when NEXT_PUBLIC_GA_ID is unset.
export default function GA4() {
  if (typeof window === "undefined") return null;
  if (window.location.hostname !== PROD_HOSTNAME) return null;
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true, send_page_view: true });
        `}
      </Script>
    </>
  );
}
