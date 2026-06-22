// Shared conversion-event helpers. Each function fires the same logical event to
// both GA4 (gtag) and Meta (fbq) from a single call site, and no-ops safely when
// either tag is absent (gated out on non-production, blocked, or not yet loaded).
//
// | Action                       | GA4 event       | Meta standard event |
// |------------------------------|-----------------|---------------------|
// | Form submit (lead)           | generate_lead   | Lead                |
// | Click-to-call (tel: link)    | click_to_call   | Contact             |
// | Get-directions tap           | get_directions  | FindLocation        |

type W = {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

function fire(
  ga4Event: string,
  metaEvent: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;
  const w = window as unknown as W;
  if (typeof w.gtag === "function") w.gtag("event", ga4Event, params);
  if (typeof w.fbq === "function") w.fbq("track", metaEvent, params);
}

export const trackLead = (params: Record<string, unknown> = {}) =>
  fire("generate_lead", "Lead", params);

export const trackCall = (params: Record<string, unknown> = {}) =>
  fire("click_to_call", "Contact", params);

export const trackDirections = (params: Record<string, unknown> = {}) =>
  fire("get_directions", "FindLocation", params);
