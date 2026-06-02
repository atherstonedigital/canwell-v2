type GtagParams = Record<string, string | number | boolean | undefined>;

type FbqParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: GtagParams) => void;
    fbq?: (command: "track" | "trackCustom", name: string, params?: FbqParams) => void;
  }
}

export function trackEvent(name: string, params?: GtagParams): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

// Fire a Meta `Lead` for a converted enquiry and mirror it to GA4 as
// `generate_lead`. Only the non-PII content_name is sent to either pixel —
// names, emails and phone numbers never enter the analytics payload.
export function trackLead(contentName: string): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: contentName });
  }
  trackEvent("generate_lead", { content_name: contentName });
}
