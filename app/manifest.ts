import type { MetadataRoute } from "next";

// QA Audit 2026-05-12 — Task 16: PWA-style manifest for installable site.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Canwell Interiors",
    short_name: "Canwell",
    description: "The Cotswolds furnishings showroom in Broadway.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4EDDC",
    theme_color: "#1A1614",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
