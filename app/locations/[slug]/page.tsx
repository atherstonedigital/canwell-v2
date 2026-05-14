import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQ } from "@/components/sections/FAQ";
import { Schema } from "@/components/Schema";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { breadcrumbSchema, faqSchema, locationSchema } from "@/lib/schema";
import { getLocation, getLocations } from "@/lib/content";

export function generateStaticParams() {
  return getLocations().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) return {};
  return {
    title: l.meta_title,
    description: l.meta_description,
    alternates: { canonical: `/locations/${slug}` },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  return (
    <>
      <Schema
        id={`ld-breadcrumb-location-${slug}`}
        payload={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Locations", url: "/locations" },
          { name: loc.location_name, url: `/locations/${slug}` },
        ])}
      />
      <Schema id={`ld-location-${slug}`} payload={locationSchema(loc)} />
      {loc.faqs && loc.faqs.length > 0 && (
        <Schema id={`ld-faq-location-${slug}`} payload={faqSchema(loc.faqs)} />
      )}
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Locations", url: "/locations" },
          { name: loc.location_name, url: `/locations/${slug}` },
        ]}
      />
      <PageHeader eyebrow={loc.eyebrow} h1={loc.h1} lead={loc.lead} image={loc.image} />
      <Prose h2={loc.intro_h2} body={loc.intro_body} />
      <Prose h2={loc.what_we_offer_h2} body={loc.what_we_offer_body} variant="tinted" />
      <Prose h2={loc.delivery_h2} body={loc.delivery_body} />
      {loc.faqs && loc.faqs.length > 0 && (
        <FAQ h2={loc.faq_h2} items={loc.faqs} />
      )}
      <CTABanner
        eyebrow={loc.cta_eyebrow}
        h2={loc.cta_h2}
        ctas={loc.ctas}
      />
      {/* QA Audit 2026-05-14 — Task 26: location pages link to visit + home visit. */}
      <RelatedLinks
        links={[
          { label: "Plan your visit", url: "/visit" },
          { label: "Free home design visit", url: "/design-help/home-visit" },
        ]}
      />
    </>
  );
}
