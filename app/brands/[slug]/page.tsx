import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { CTABanner } from "@/components/sections/CTABanner";
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
  return { title: b.meta_title, description: b.meta_description };
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
    </>
  );
}
