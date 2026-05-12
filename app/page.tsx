import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { DesignHelp } from "@/components/sections/DesignHelp";
import { Brands } from "@/components/sections/Brands";
import { NewIn } from "@/components/sections/NewIn";
import { Reviews } from "@/components/sections/Reviews";
import { EmailSignup } from "@/components/sections/EmailSignup";
import { Visit } from "@/components/sections/Visit";
import {
  getHomepage,
  getNewInBySlug,
  getReviewsBySlug,
  getSite,
} from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const homepage = getHomepage();
  return {
    // QA Audit 2026-05-12 — Task 1: home uses the absolute default title from the
    // layout (no template suffix appended); page just provides description and canonical.
    title: homepage.meta_title ? { absolute: homepage.meta_title } : undefined,
    description: homepage.meta_description || undefined,
    alternates: { canonical: "/" },
  };
}

export default function Home() {
  const site = getSite();
  const homepage = getHomepage();
  const newInItems = getNewInBySlug(homepage.new_in_items || []);
  const featuredReviews = getReviewsBySlug(homepage.featured_reviews || []);

  return (
    <>
      <Hero
        hero_eyebrow={homepage.hero_eyebrow}
        hero_pretitle={homepage.hero_pretitle}
        hero_title={homepage.hero_title}
        hero_lead={homepage.hero_lead}
        hero_microcopy={homepage.hero_microcopy}
        hero_image={homepage.hero_image}
        hero_ctas={homepage.hero_ctas}
      />

      <Intro
        intro_eyebrow={homepage.intro_eyebrow}
        intro_h2={homepage.intro_h2}
        intro_body={homepage.intro_body}
      />

      <Services
        services_section_label={homepage.services_section_label}
        services_h2={homepage.services_h2}
        services_intro={homepage.services_intro}
        service_cards={homepage.service_cards}
      />

      <DesignHelp
        design_help_eyebrow={homepage.design_help_eyebrow}
        design_help_h2={homepage.design_help_h2}
        design_help_body={homepage.design_help_body}
        design_help_saverys_note={homepage.design_help_saverys_note}
        design_help_primary_cta_label={homepage.design_help_primary_cta_label}
        design_help_primary_cta_url={homepage.design_help_primary_cta_url}
        design_help_secondary_cta_label={homepage.design_help_secondary_cta_label}
        design_help_secondary_cta_url={homepage.design_help_secondary_cta_url}
        design_help_stamps={homepage.design_help_stamps}
      />

      <Brands
        brands_eyebrow={homepage.brands_eyebrow}
        brands_h2={homepage.brands_h2}
        brands_intro={homepage.brands_intro}
        brand_list={homepage.brand_list}
        brands_cta_label={homepage.brands_cta_label}
        brands_cta_url={homepage.brands_cta_url}
      />

      <NewIn
        new_in_eyebrow={homepage.new_in_eyebrow}
        new_in_h2={homepage.new_in_h2}
        new_in_intro={homepage.new_in_intro}
        new_in_cta_label={homepage.new_in_cta_label}
        new_in_cta_url={homepage.new_in_cta_url}
        items={newInItems}
      />

      <Reviews
        reviews_eyebrow={homepage.reviews_eyebrow}
        reviews_h2={homepage.reviews_h2}
        reviews_cta_label={homepage.reviews_cta_label}
        reviews_cta_url={site.social_google_business}
        reviews={featuredReviews}
      />

      <EmailSignup
        email_eyebrow={homepage.email_eyebrow}
        email_h2={homepage.email_h2}
        email_body={homepage.email_body}
        email_form_label={homepage.email_form_label}
        email_form_placeholder={homepage.email_form_placeholder}
        email_form_button={homepage.email_form_button}
        email_microcopy={homepage.email_microcopy}
        email_confirm_message={homepage.email_confirm_message}
      />

      <Visit
        site={site}
        visit_eyebrow={homepage.visit_eyebrow}
        visit_h2={homepage.visit_h2}
        visit_body={homepage.visit_body}
        visit_stamps={homepage.visit_stamps}
      />
    </>
  );
}
