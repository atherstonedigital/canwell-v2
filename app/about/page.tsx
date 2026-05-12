import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { CTABanner } from "@/components/sections/CTABanner";
import { Schema } from "@/components/Schema";
import { breadcrumbSchema } from "@/lib/schema";
import { getAbout } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const a = getAbout();
  // QA Audit 2026-05-12 — Task 15: per-page canonical.
  return {
    title: a.meta_title,
    description: a.meta_description,
    alternates: { canonical: "/about" },
  };
}

export default function AboutPage() {
  const a = getAbout();
  return (
    <>
      {/* QA Audit 2026-05-12 — Task 10: breadcrumb JSON-LD. */}
      <Schema
        id="ld-breadcrumb-about"
        payload={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />
      <PageHeader eyebrow={a.eyebrow} h1={a.h1} lead={a.lead} image={a.image} />
      <Prose h2={a.story_h2} body={a.story_body} />
      <Prose h2={a.founders_h2} body={a.founders_body} variant="tinted" />
      {/* QA Audit 2026-05-12 — Task 2: team and community sections hidden until copy arrives. */}
      {a.team_h2 && a.team_body && <Prose h2={a.team_h2} body={a.team_body} />}
      <Prose h2={a.difference_h2} body={a.difference_body} variant="tinted" />
      <Prose h2={a.family_h2} body={a.family_body} />
      {a.community_h2 && a.community_body && (
        <Prose h2={a.community_h2} body={a.community_body} variant="tinted" />
      )}
      <CTABanner
        eyebrow={a.cta_eyebrow}
        h2={a.cta_h2}
        body={a.cta_body}
        ctas={a.ctas}
      />
    </>
  );
}
