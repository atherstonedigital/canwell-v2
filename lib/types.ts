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

export interface CTA {
  label: string;
  url: string;
  variant?: "primary" | "secondary" | "tertiary";
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContentBlock {
  title: string;
  body: string;
}

export interface Step {
  title: string;
  body: string;
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

export interface VisitContent {
  meta_title: string;
  meta_description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  how_to_find_h2: string;
  how_to_find_body: string;
  opening_hours_h2: string;
  opening_hours_microcopy: string;
  getting_here_h2: string;
  getting_here_intro: string;
  getting_here_blocks: ContentBlock[];
  what_to_expect_h2: string;
  what_to_expect_body: string;
  accessibility_h2: string;
  accessibility_body: string;
  sister_h2: string;
  sister_body: string;
  cta_eyebrow: string;
  cta_h2: string;
  cta_body?: string;
  ctas: CTA[];
}

export interface AboutContent {
  meta_title: string;
  meta_description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  story_h2: string;
  story_body: string;
  founders_h2: string;
  founders_body: string;
  team_h2: string;
  team_body: string;
  difference_h2: string;
  difference_body: string;
  family_h2: string;
  family_body: string;
  community_h2: string;
  community_body: string;
  cta_eyebrow: string;
  cta_h2: string;
  cta_body?: string;
  ctas: CTA[];
}

export interface ContactContent {
  meta_title: string;
  meta_description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  quick_h2: string;
  call_label: string;
  call_note: string;
  email_label: string;
  email_note: string;
  visit_label: string;
  visit_note: string;
  form_h2: string;
  form_microcopy: string;
  form_confirm: string;
  small_print: string;
}

export interface ServiceHubContent {
  meta_title: string;
  meta_description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  intro_h2: string;
  intro_body: string;
  steps_h2?: string;
  steps?: Step[];
  why_h2?: string;
  why_body?: string;
  cards_h2?: string;
  cards_intro?: string;
  cards?: ServiceCard[];
  brands_h2?: string;
  brands_body?: string;
  faq_h2?: string;
  faqs?: FAQItem[];
  cta_eyebrow: string;
  cta_h2: string;
  cta_body?: string;
  ctas: CTA[];
}

export interface DesignHelpContent {
  meta_title: string;
  meta_description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  intro_h2: string;
  intro_body: string;
  routes_h2: string;
  routes: ServiceCard[];
  small_print_h2: string;
  what_you_get: string[];
  what_we_dont: string[];
  saverys_h2: string;
  saverys_body: string;
  faq_h2: string;
  faqs: FAQItem[];
  cta_eyebrow: string;
  cta_h2: string;
  cta_body?: string;
  ctas: CTA[];
}

export interface SubPageContent {
  slug: string;
  parent_url: string;
  parent_label: string;
  meta_title: string;
  meta_description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  body: string;
  cta_eyebrow: string;
  cta_h2: string;
  ctas: CTA[];
}

export interface BrandPageContent {
  slug: string;
  meta_title: string;
  meta_description: string;
  brand_name: string;
  tagline: string;
  intro_body: string;
  what_we_stock_h2: string;
  what_we_stock_body: string;
  why_h2?: string;
  why_body?: string;
  cta_eyebrow: string;
  cta_h2: string;
  ctas: CTA[];
}

export interface LocationPageContent {
  slug: string;
  location_name: string;
  meta_title: string;
  meta_description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  intro_h2: string;
  intro_body: string;
  what_we_offer_h2: string;
  what_we_offer_body: string;
  delivery_h2: string;
  delivery_body: string;
  faq_h2?: string;
  faqs?: FAQItem[];
  cta_eyebrow: string;
  cta_h2: string;
  ctas: CTA[];
}

export interface ArticleContent {
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
  category: string;
  date_published: string;
  read_time: string;
  body: string;
  is_placeholder: boolean;
}

export interface BrandsHubContent {
  meta_title: string;
  meta_description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  intro_body: string;
  cta_eyebrow: string;
  cta_h2: string;
  ctas: CTA[];
}

export interface LocationsHubContent {
  meta_title: string;
  meta_description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  intro_body: string;
  cta_eyebrow: string;
  cta_h2: string;
  ctas: CTA[];
}

export interface InspirationHubContent {
  meta_title: string;
  meta_description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  intro_body: string;
}
