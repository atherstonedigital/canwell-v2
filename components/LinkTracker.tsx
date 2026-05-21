"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function LinkTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        trackEvent("click_phone", { phone_number: href.slice(4) });
      } else if (href.startsWith("mailto:")) {
        trackEvent("click_email", { email_address: href.slice(7).split("?")[0] });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
