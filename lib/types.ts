export interface SiteSettings {
  site_name: string;
  tagline: string;
  address_line_1: string;
  address_line_2: string;
  postcode: string;
  phone: string;
  email: string;
  opening_hours_weekday: string;
  opening_hours_saturday: string;
  opening_hours_sunday: string;
  opening_hours_summary: string;
  year_established: string;
  sister_site_saverys_broadway_url: string;
  sister_site_saverys_ludlow_url: string;
  sister_site_xshowhome_url: string;
  social_facebook: string;
  social_instagram: string;
  social_google_business: string;
  directions_url: string;
}

export interface ServiceCard {
  title: string;
  body: string;
  link_label: string;
  link_url: string;
}

export interface Stamp {
  title: string;
  subtitle: string;
}

export interface BrandLink {
  name: string;
  url: string;
}

export interface HomepageContent {
  meta_title: string;
  meta_description: string;

  hero_eyebrow: string;
  hero_pretitle: string;
  hero_title: string;
  hero_lead: string;
  hero_image?: string;
  hero_microcopy: string[];

  intro_eyebrow: string;
  intro_h2: string;
  intro_body: string;

  services_section_label: string;
  services_h2: string;
  services_intro?: string;
  service_cards: ServiceCard[];

  design_help_eyebrow: string;
  design_help_h2: string;
  design_help_body: string;
  design_help_image?: string;
  design_help_saverys_note: string;
  design_help_primary_cta_label: string;
  design_help_primary_cta_url: string;
  design_help_secondary_cta_label: string;
  design_help_secondary_cta_url: string;
  design_help_stamps: Stamp[];

  brands_eyebrow: string;
  brands_h2: string;
  brands_intro?: string;
  brand_list: BrandLink[];
  brands_cta_label: string;
  brands_cta_url: string;

  new_in_eyebrow: string;
  new_in_h2: string;
  new_in_intro: string;
  new_in_cta_label: string;
  new_in_cta_url: string;
  new_in_items: string[];

  reviews_eyebrow: string;
  reviews_h2: string;
  reviews_cta_label: string;
  featured_reviews: string[];

  email_eyebrow: string;
  email_h2: string;
  email_body: string;
  email_form_label: string;
  email_form_placeholder: string;
  email_form_button: string;
  email_microcopy: string;
  email_confirm_message: string;

  visit_eyebrow: string;
  visit_h2: string;
  visit_body: string;
  visit_image?: string;
  visit_stamps: Stamp[];
}

export interface Review {
  slug: string;
  quote: string;
  name: string;
  location: string;
  featured: boolean;
  is_placeholder: boolean;
  date: string;
}

export interface NewInItem {
  slug: string;
  name: string;
  brand: string;
  meta_label: string;
  image?: string;
  status: "in_stock" | "sold";
  date_added: string;
  url?: string;
}
