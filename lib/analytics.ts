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

// Conversion-event helpers (Lead / Contact / FindLocation, mirrored to GA4) live
// in lib/track.ts so every conversion fires to both GA4 and Meta from one call.
