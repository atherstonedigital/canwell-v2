import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://canwell-v2.netlify.app";

// AI agents we want indexing the site. Listed explicitly (rather than
// relying on the User-agent: * fallback) so the intent is unmistakable
// to anyone auditing the policy or to a crawler that special-cases its
// own name.
const AI_BOTS = [
  "Google-Extended",
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Applebot-Extended",
];

const DISALLOW = ["/admin/", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
