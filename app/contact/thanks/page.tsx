import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";

// QA Audit 2026-05-12 — Task 13: Netlify Forms thank-you destination.
export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Thanks for getting in touch with Canwell Interiors. We reply within one working day.",
  alternates: { canonical: "/contact/thanks" },
  robots: { index: false, follow: true },
};

export default function ContactThanksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Got it"
        h1="Thank you — *we'll be in touch*"
        lead="Your enquiry has reached us. We reply within one working day, usually sooner."
      />
      <Prose
        h2="While you wait"
        body="If it's urgent, call the showroom on 01905 964994 during opening hours. Otherwise, take a look around — there's plenty to see."
      >
        <div className="prose-body" style={{ marginTop: "var(--s-6)", display: "flex", flexWrap: "wrap", gap: "var(--s-3)" }}>
          <Link href="/visit" className="btn btn-primary">
            Plan a visit to the showroom
          </Link>
          <Link href="/design-help" className="btn btn-secondary">
            Read about our design help
          </Link>
          <Link href="/#subscribe" className="btn btn-tertiary">
            Get the weekly update
          </Link>
        </div>
      </Prose>
    </>
  );
}
