"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { trackCall, trackDirections } from "@/lib/track";

// Delegated click listener. tel: and Google Maps "get directions" links are
// rendered all over the site — in the header, footer, contact page, and from
// CMS content via shared CTA components — so we catch them once at the document
// level rather than wiring an onClick onto every individual anchor.
const DIRECTIONS_HOSTS = [
  "google.com/maps",
  "maps.google",
  "goo.gl/maps",
  "maps.app.goo.gl",
];

export function LinkTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        // GA4 click_to_call + Meta Contact, mirrored from one call.
        trackCall({ phone_number: href.slice(4) });
      } else if (href.startsWith("mailto:")) {
        trackEvent("click_email", { email_address: href.slice(7).split("?")[0] });
      } else if (DIRECTIONS_HOSTS.some((host) => href.includes(host))) {
        // GA4 get_directions + Meta FindLocation.
        trackDirections({ link_url: href });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
