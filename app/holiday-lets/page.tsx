import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/sections/FAQ";
import { HolidayLetEnquiryForm } from "@/components/sections/HolidayLetEnquiryForm";
import { Schema } from "@/components/Schema";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Inline } from "@/components/signature/RichText";
import {
  breadcrumbSchema,
  faqSchema,
  holidayLetServiceSchema,
} from "@/lib/schema";
import { getHolidayLets, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const BREADCRUMBS = [
  { name: "Home", url: "/" },
  { name: "Holiday lets", url: "/holiday-lets" },
];

export async function generateMetadata(): Promise<Metadata> {
  const content = getHolidayLets();
  return pageMetadata({
    title: content.meta_title,
    description: content.meta_description,
    canonical: "/holiday-lets",
  });
}

export default function HolidayLetsPage() {
  const content = getHolidayLets();
  const site = getSite();
  const phoneTel = site.phone.replace(/\s+/g, "");

  return (
    <>
      <Schema
        id="ld-service-holiday-lets"
        payload={holidayLetServiceSchema(content)}
      />
      <Schema id="ld-faq-holiday-lets" payload={faqSchema(content.faqs)} />
      <Schema
        id="ld-breadcrumb-holiday-lets"
        payload={breadcrumbSchema(BREADCRUMBS)}
      />

      <Breadcrumbs items={BREADCRUMBS} />

      {/* Hero */}
      <section className="page-header hl-hero">
        <div className="container">
          <div
            className={`page-header-grid${
              content.hero_image ? "" : " page-header-grid--single"
            }`}
          >
            <div className="page-header-content">
              <p className="eyebrow page-header-eyebrow">
                {content.hero_eyebrow}
              </p>
              <h1 className="display-h1 page-header-h1">
                <Inline text={content.h1} />
              </h1>
              <p className="hl-emphasis">{content.hero_emphasis}</p>
              <p className="lead page-header-lead">
                <Inline text={content.hero_lead} />
              </p>
              <div className="hl-hero-ctas">
                <Link href="#enquire" className="btn btn-primary">
                  {content.hero_cta_label}
                </Link>
                <a href={`tel:${phoneTel}`} className="btn btn-secondary">
                  Call {site.phone}
                </a>
              </div>
            </div>

            {content.hero_image && (
              <div className="page-header-image">
                <Image
                  src={content.hero_image}
                  alt={content.hero_image_alt}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why owners work with us */}
      <section className="prose-section variant-tinted">
        <div className="container">
          <div className="prose-inner">
            <h2 className="display-h2">
              <Inline text={content.why_h2} />
            </h2>
            <ul className="hl-bullets">
              {content.why_points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Our packages */}
      <section className="cards-section hl-packages">
        <div className="container">
          <div className="cards-header">
            <h2 className="display-h2">
              <Inline text={content.packages_h2} />
            </h2>
            <p className="cards-intro">{content.packages_intro}</p>
          </div>
          <div className="hl-package-grid">
            {content.packages.map((pkg) => (
              <div key={pkg.name} className="hl-package">
                <h3 className="hl-package-name">{pkg.name}</h3>
                <p className="hl-package-summary">{pkg.summary}</p>
                <ul className="hl-bullets">
                  {pkg.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="hl-package-note">{content.packages_note}</p>
        </div>
      </section>

      {/* What we supply */}
      <section className="prose-section hl-supply">
        <div className="container">
          <div className="cards-header">
            <h2 className="display-h2">
              <Inline text={content.supply_h2} />
            </h2>
          </div>
          <div className="hl-supply-grid">
            {content.supply.map((cat) => (
              <div key={cat.title} className="hl-supply-item">
                {cat.image ? (
                  <div className="hl-supply-image">
                    <Image
                      src={cat.image}
                      alt={cat.image_alt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  // No image set in the CMS yet: render a flagged placeholder
                  // using the (final) alt text as the accessible label.
                  <div
                    className="hl-supply-image hl-supply-image--placeholder"
                    role="img"
                    aria-label={cat.image_alt}
                  >
                    <span className="hl-supply-image-note" aria-hidden="true">
                      Photography to follow
                    </span>
                  </div>
                )}
                <h3 className="hl-supply-title">{cat.title}</h3>
                <ul className="hl-bullets">
                  {cat.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ h2={content.faq_h2} items={content.faqs} />

      {/* Enquiry block */}
      <section className="contact-form-section hl-enquiry" id="enquire">
        <div className="container">
          <div className="hl-enquiry-grid">
            <div className="hl-enquiry-intro">
              <h2 className="display-h2">
                <Inline text={content.enquiry_h2} />
              </h2>
              <p className="lead">{content.enquiry_lead}</p>
              <p className="hl-enquiry-contact">
                <a href={`tel:${phoneTel}`}>{site.phone}</a>
                <br />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <HolidayLetEnquiryForm
              microcopy={content.enquiry_microcopy}
              confirmMessage={content.enquiry_confirm}
            />
          </div>
        </div>
      </section>
    </>
  );
}
