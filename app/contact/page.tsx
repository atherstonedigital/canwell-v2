import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { getContact, getSite } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const c = getContact();
  return { title: c.meta_title, description: c.meta_description };
}

export default function ContactPage() {
  const c = getContact();
  const site = getSite();
  const phoneTel = site.phone.replace(/\s+/g, "");

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} h1={c.h1} lead={c.lead} image={c.image} />

      <section className="quick-contact">
        <div className="container">
          <h2 className="display-h2">{c.quick_h2}</h2>
          <div className="quick-contact-grid">
            <div className="quick-contact-card">
              <h3>{c.call_label}</h3>
              <a href={`tel:${phoneTel}`} className="value">
                {site.phone}
              </a>
              <p className="note">{c.call_note}</p>
            </div>
            <div className="quick-contact-card">
              <h3>{c.email_label}</h3>
              <a href={`mailto:${site.email}`} className="value">
                {site.email}
              </a>
              <p className="note">{c.email_note}</p>
            </div>
            <div className="quick-contact-card">
              <h3>{c.visit_label}</h3>
              <span className="value">
                {site.address_line_1}, {site.address_line_2}, {site.postcode}
              </span>
              <p className="note">{c.visit_note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container">
          <h2 className="display-h2" style={{ marginBottom: "var(--s-6)" }}>
            {c.form_h2}
          </h2>
          <ContactForm microcopy={c.form_microcopy} confirmMessage={c.form_confirm} />
        </div>
      </section>

      <section className="prose-section">
        <div className="container">
          <div className="prose-inner">
            <h2 className="display-h2">Hours and address</h2>
            <table className="hours-table">
              <tbody>
                <tr>
                  <th>Address</th>
                  <td>
                    {site.address_line_1}, {site.address_line_2}, {site.postcode}
                  </td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{site.phone}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{site.email}</td>
                </tr>
                <tr>
                  <th>Mon–Fri</th>
                  <td>{site.opening_hours_weekday}</td>
                </tr>
                <tr>
                  <th>Saturday</th>
                  <td>{site.opening_hours_saturday}</td>
                </tr>
                <tr>
                  <th>Sunday</th>
                  <td>{site.opening_hours_sunday}</td>
                </tr>
              </tbody>
            </table>
            <p className="small" style={{ marginTop: "var(--s-6)", color: "var(--color-text-muted)" }}>
              {c.small_print}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
