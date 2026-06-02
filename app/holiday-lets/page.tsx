import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FAQ, type FAQItem } from "@/components/sections/FAQ";
import { showroomImages, type ShowroomImage } from "@/lib/showroom-images";
import { HolidayLetEnquiryForm } from "@/components/sections/HolidayLetEnquiryForm";
import { Schema } from "@/components/Schema";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  breadcrumbSchema,
  faqSchema,
  holidayLetServiceSchema,
} from "@/lib/schema";
import { getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Holiday let interiors in the Cotswolds | Canwell Interiors",
  description:
    "Canwell Interiors furnishes and styles holiday lets across the Cotswolds. Carpets, furniture, blinds and full fit-outs, measured, supplied and fitted by one team.",
  canonical: "https://canwellinteriors.com/holiday-lets",
});

const BREADCRUMBS = [
  { name: "Home", url: "/" },
  { name: "Holiday lets", url: "/holiday-lets" },
];

const WHY_POINTS = [
  "One team measures, supplies and fits, so you're not chasing five different trades.",
  "Hard-wearing specifications chosen for high-turnover lets, not just for the photos.",
  "Everything from one showroom in Broadway — see the carpet, sit on the sofa, feel the fabric.",
  "Honest pricing. No project fees, no commission selling, no upsell you didn't ask for.",
  "We work around changeover days and quiet weeks to keep your calendar earning.",
];

const PACKAGES: Array<{ name: string; summary: string; points: string[] }> = [
  {
    name: "Bronze",
    summary: "A practical refresh for a let that needs bringing back up to standard.",
    points: [
      "New carpet or flooring where it's worn",
      "Curtains or blinds to fit",
      "Cushions, throws and the soft furnishings that photograph well",
    ],
  },
  {
    name: "Silver",
    summary: "A room-by-room furnishing, specified for guest wear and fitted together.",
    points: [
      "Beds, sofas and dining chosen for durability",
      "Flooring and window dressings throughout",
      "Delivered and fitted in one coordinated visit",
    ],
  },
  {
    name: "Gold",
    summary: "A complete fit-out, ready for photography and the first booking.",
    points: [
      "Whole-property furnishing from floor to finishing touches",
      "One team measuring, supplying, fitting and styling",
      "Planned around your launch date",
    ],
  },
];

type SupplyCategory = {
  title: string;
  points: string[];
  // Real showroom photography from the manifest (accurate alt text), or a
  // flagged placeholder where we don't yet have a relevant shot.
  image?: ShowroomImage;
  placeholderAlt?: string;
};

const SUPPLY: SupplyCategory[] = [
  {
    title: "Carpets and flooring",
    image: showroomImages.carpetsCormarDisplay,
    points: [
      "Wool blends and stain-resistant synthetics for high traffic",
      "Hard flooring and runners for halls and stairs",
      "Measured and fitted by our own fitters",
    ],
  },
  {
    title: "Furniture",
    image: showroomImages.sofasBolton,
    points: [
      "Sofas, beds, dining and occasional furniture",
      "Frames and fabrics that stand up to guest turnover",
      "Premium brands you can see in the showroom",
    ],
  },
  {
    title: "Curtains and blinds",
    image: showroomImages.curtainsVignettePlaceholder,
    points: [
      "Made-to-measure and ready-made curtains",
      "Roman, roller, wooden and perfect-fit blinds",
      "Lined for warmth and a good night's sleep",
    ],
  },
  {
    title: "Beds and mattresses",
    // No bedroom shot in the current set — flagged for the next photography drop.
    placeholderAlt:
      "A dressed double bed with quality mattress and linen in a holiday let guest room",
    points: [
      "Mattresses chosen for comfort across many guests",
      "Divans, frames and headboards",
      "Protectors, toppers and spare linen",
    ],
  },
  {
    title: "Soft furnishings and finishing touches",
    image: showroomImages.lightingLampsDisplay,
    points: [
      "Cushions, throws and bedding",
      "Lighting, mirrors and art",
      "The accessories that make a listing stand out",
    ],
  },
];

const FAQS: FAQItem[] = [
  {
    question: "Do you supply and fit, or just supply?",
    answer:
      "Both. One team measures, supplies and fits — carpets, furniture, blinds and window dressings — so you deal with us from the first visit to the final room.",
  },
  {
    question: "Can you furnish a whole property to a deadline?",
    answer:
      "Yes. Tell us your launch date and we plan the order and fit around it. For a full fit-out we measure, agree the specification, then deliver and fit everything together so the property is ready for photography and the first booking.",
  },
  {
    question: "Do you choose hard-wearing options for lets?",
    answer:
      "Yes. We specify carpets, fabrics and furniture for high turnover and easy cleaning, not just for looks. We'll tell you honestly where it's worth spending more and where it isn't.",
  },
  {
    question: "Which areas do you cover?",
    answer:
      "We furnish holiday lets across the Cotswolds, including Broadway, Chipping Campden, Stow-on-the-Wold, Moreton-in-Marsh, Stratford-upon-Avon, Cheltenham and the surrounding villages, all from our showroom in Broadway.",
  },
];

export default function HolidayLetsPage() {
  const site = getSite();
  const phoneTel = site.phone.replace(/\s+/g, "");

  return (
    <>
      <Schema id="ld-service-holiday-lets" payload={holidayLetServiceSchema()} />
      <Schema id="ld-faq-holiday-lets" payload={faqSchema(FAQS)} />
      <Schema
        id="ld-breadcrumb-holiday-lets"
        payload={breadcrumbSchema(BREADCRUMBS)}
      />

      <Breadcrumbs items={BREADCRUMBS} />

      {/* Hero */}
      <section className="page-header hl-hero">
        <div className="container">
          <div className="page-header-grid">
            <div className="page-header-content">
              <p className="eyebrow page-header-eyebrow">
                For holiday let and second-home owners
              </p>
              <h1 className="display-h1 page-header-h1">
                Holiday let interiors across the Cotswolds
              </h1>
              <p className="hl-emphasis">
                Furnished, fitted and ready for the next booking.
              </p>
              <p className="lead page-header-lead">
                We furnish and style holiday lets across the Cotswolds. Carpets,
                furniture, blinds and full fit-outs, measured, supplied and
                fitted by one team — so you&apos;re not coordinating five
                different trades around a changeover day.
              </p>
              <div className="hl-hero-ctas">
                <Link href="#enquire" className="btn btn-primary">
                  Enquire about your property
                </Link>
                <a href={`tel:${phoneTel}`} className="btn btn-secondary">
                  Call {site.phone}
                </a>
              </div>
            </div>

            <div className="page-header-image">
              <Image
                src={showroomImages.lifestyleWoodburner.src}
                alt={showroomImages.lifestyleWoodburner.alt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why owners work with us */}
      <section className="prose-section variant-tinted">
        <div className="container">
          <div className="prose-inner">
            <h2 className="display-h2">Why owners work with us</h2>
            <ul className="hl-bullets">
              {WHY_POINTS.map((point) => (
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
            <h2 className="display-h2">Our packages</h2>
            <p className="cards-intro">
              Three starting points. We tailor the final specification to the
              property and how hard it works.
            </p>
          </div>
          <div className="hl-package-grid">
            {PACKAGES.map((pkg) => (
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
          <p className="hl-package-note">
            Every property is different, so we quote per project rather than
            from a price list. Tell us what you have and we&apos;ll be straight
            with you about what it needs.
          </p>
        </div>
      </section>

      {/* What we supply */}
      <section className="prose-section hl-supply">
        <div className="container">
          <div className="cards-header">
            <h2 className="display-h2">What we supply</h2>
          </div>
          <div className="hl-supply-grid">
            {SUPPLY.map((cat) => (
              <div key={cat.title} className="hl-supply-item">
                {cat.image ? (
                  <div className="hl-supply-image">
                    <Image
                      src={cat.image.src}
                      alt={cat.image.alt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  // TODO(photography): no relevant shot yet; alt text is final.
                  <div
                    className="hl-supply-image hl-supply-image--placeholder"
                    role="img"
                    aria-label={cat.placeholderAlt}
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

      <FAQ h2="Holiday let questions, answered" items={FAQS} />

      {/* Enquiry block */}
      <section className="contact-form-section hl-enquiry" id="enquire">
        <div className="container">
          <div className="hl-enquiry-grid">
            <div className="hl-enquiry-intro">
              <h2 className="display-h2">Tell us about your property</h2>
              <p className="lead">
                Send us a few details and we&apos;ll come back with the next
                step. Prefer to talk it through?
              </p>
              <p className="hl-enquiry-contact">
                <a href={`tel:${phoneTel}`}>{site.phone}</a>
                <br />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <HolidayLetEnquiryForm
              microcopy="We'll only use these details to reply about your property. No marketing list, no sharing."
              confirmMessage="Thanks — we've got your enquiry and we'll be in touch shortly."
            />
          </div>
        </div>
      </section>
    </>
  );
}
