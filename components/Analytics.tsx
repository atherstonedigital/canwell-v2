"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// QA Audit 2026-05-14 — Task 13: GA4, gated to the production hostname.
// Set NEXT_PUBLIC_GA_ID and NEXT_PUBLIC_PROD_HOSTNAME at deploy time. Keeps
// preview deploys, staging, and the Netlify subdomain out of the GA property.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PROD_HOSTNAME = process.env.NEXT_PUBLIC_PROD_HOSTNAME;

export function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!GA_ID || !PROD_HOSTNAME) return;
    if (window.location.hostname === PROD_HOSTNAME) {
      // Reading window.location requires a client mount, so a single
      // post-mount setState is the right pattern here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAllowed(true);
    }
  }, []);

  if (!allowed) return null;

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
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
