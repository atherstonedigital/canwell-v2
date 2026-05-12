import Link from "next/link";
import { SectionMarker } from "@/components/signature/SectionMarker";
import { Stamp } from "@/components/signature/Stamp";
import { Rings } from "@/components/signature/Rings";
import { Inline, PlainWithPlaceholders } from "@/components/signature/RichText";
import type { HomepageContent, SiteSettings } from "@/lib/types";

interface VisitProps {
  site: SiteSettings;
  visit_eyebrow: HomepageContent["visit_eyebrow"];
  visit_h2: HomepageContent["visit_h2"];
  visit_body: HomepageContent["visit_body"];
  visit_stamps: HomepageContent["visit_stamps"];
}

export function Visit({
  site,
  visit_eyebrow,
  visit_h2,
  visit_body,
  visit_stamps,
}: VisitProps) {
  const fullAddress = [
    site.address_line_1,
    site.address_line_2,
    site.postcode,
  ]
    .filter(Boolean)
    .join(", ");

  const hoursLine = site.opening_hours_weekday && site.opening_hours_saturday && site.opening_hours_sunday
    ? `${site.opening_hours_weekday} · ${site.opening_hours_saturday} · ${site.opening_hours_sunday}`
    : site.opening_hours_summary;

  return (
    <section className="visit">
      <div className="container">
        <div className="visit-grid">
          <div className="visit-content">
            <SectionMarker num="06" label={visit_eyebrow} />
            <h2 className="display-h2">
              <Inline text={visit_h2} />
            </h2>
            <p>
              <Inline text={visit_body} />
            </p>

            <ul className="visit-details">
              <li>
                <strong>Address</strong>
                <span>{fullAddress}</span>
              </li>
              <li>
                <strong>Phone</strong>
                <span>{site.phone}</span>
              </li>
              <li>
                <strong>Email</strong>
                <span>{site.email}</span>
              </li>
              <li>
                <strong>Hours</strong>
                <span>
                  <PlainWithPlaceholders text={hoursLine} />
                </span>
              </li>
            </ul>

            <div className="visit-ctas">
              {site.directions_url ? (
                <a
                  href={site.directions_url}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions
                </a>
              ) : (
                <Link href="/visit" className="btn btn-primary">
                  Get directions
                </Link>
              )}
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="btn btn-secondary"
              >
                Call the showroom
              </a>
            </div>

            {visit_stamps && visit_stamps.length > 0 && (
              <div className="visit-stamps">
                {visit_stamps.map((s, i) => (
                  <Stamp key={i} line1={s.title} line2={s.subtitle} />
                ))}
              </div>
            )}
          </div>

          <div className="visit-map">
            <div className="visit-map-label">
              <Rings size="md">
                <span style={{ fontSize: "0.625rem" }}>MAP</span>
              </Rings>
              {site.address_line_1}
              <span className="visit-map-coords">
                {site.address_line_2}, {site.postcode}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
