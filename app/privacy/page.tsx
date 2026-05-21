import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Schema } from "@/components/Schema";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: "Privacy Policy",
    description:
      "How Canwell Interiors handles your personal information, including newsletter signups and contact enquiries.",
    canonical: "/privacy",
  });
}

export default function PrivacyPage() {
  return (
    <>
      <Schema
        id="ld-breadcrumb-privacy"
        payload={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Privacy", url: "/privacy" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Privacy", url: "/privacy" },
        ]}
      />
      <PageHeader
        eyebrow="Privacy"
        h1="Privacy Policy"
        lead="A short note on how we handle your information. This page is a placeholder pending legal review."
      />
      <Prose h2="Newsletter signups">
        <p>
          When you subscribe to our newsletter we collect your email address, and
          optionally your first name, so we can send you updates about new arrivals,
          showroom events and seasonal offers. We use{" "}
          <a
            href="https://emailoctopus.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            EmailOctopus
          </a>{" "}
          to deliver these emails. They process your data on our behalf. You can
          unsubscribe at any time from the link in the footer of any email.
        </p>
        <p>
          We use a double opt-in: after submitting the form you&rsquo;ll receive a
          confirmation email and only become an active subscriber once you confirm.
        </p>
        <p>
          <strong>This page is a placeholder.</strong> Full privacy policy copy is
          pending legal review.
        </p>
      </Prose>
    </>
  );
}
