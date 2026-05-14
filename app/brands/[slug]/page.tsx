import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { CTABanner } from "@/components/sections/CTABanner";
import { Schema } from "@/components/Schema";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { brandSchema, breadcrumbSchema } from "@/lib/schema";
import { getBrand, getBrands } from "@/lib/content";

export function generateStaticParams() {
  return getBrands().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) return {};
  return {
    title: b.meta_title,
    description: b.meta_description,
    alternates: { canonical: `/brands/${slug}` },
    openGraph: {
      type: "website",
      title: b.meta_title,
      description: b.meta_description,
    },
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  return (
    <>
      <Schema
        id={`ld-breadcrumb-brand-${slug}`}
        payload={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Brands", url: "/brands" },
          { name: brand.brand_name, url: `/brands/${slug}` },
        ])}
      />
      <Schema id={`ld-brand-${slug}`} payload={brandSchema(brand)} />
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Brands", url: "/brands" },
          { name: brand.brand_name, url: `/brands/${slug}` },
        ]}
      />
      <PageHeader
        eyebrow={`${brand.brand_name} stockist`}
        h1={`*${brand.brand_name}* at Canwell, Broadway`}
        lead={brand.tagline}
        image={brand.image}
      />
      <Prose h2="About the brand" body={brand.intro_body} />
      <Prose
        h2={brand.what_we_stock_h2}
        body={brand.what_we_stock_body}
        variant="tinted"
      />
      {brand.why_h2 && brand.why_body && (
        <Prose h2={brand.why_h2} body={brand.why_body} />
      )}
      <CTABanner
        eyebrow={brand.cta_eyebrow}
        h2={brand.cta_h2}
        ctas={brand.ctas}
      />
      {/* QA Audit 2026-05-14 — Task 26: brand page bottom links back to the
          furniture floor and the wider brand list. */}
      <RelatedLinks
        links={[
          { label: "All brands we stock", url: "/brands" },
          { label: "Furniture at Canwell", url: "/furniture" },
          { label: "Plan a visit", url: "/visit" },
        ]}
      />
    </>
  );
}
