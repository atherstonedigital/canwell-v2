import Link from "next/link";
import Image from "next/image";
import type { NavLink, SiteSettings, NavigationContent } from "@/lib/types";

interface FooterProps {
  site: SiteSettings;
  nav: NavigationContent;
}

// QA Audit 2026-05-14 — Task 20: social icons render as muted SVGs once a
// real URL is supplied via Decap. Empty URLs hide the corresponding link
// so we never ship a dead icon. Keep this list aligned with the
// Organization schema sameAs so the two stay in lockstep.
function SocialIcon({ kind }: { kind: "instagram" | "facebook" | "google" }) {
  if (kind === "instagram") {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "facebook") {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M14 9h2.5l.5-3H14V4.5C14 3.5 14.5 3 15.5 3H17V0.5C16.5 0.4 15.5 0 14.5 0 12.5 0 11 1.4 11 3.6V6H8v3h3v9h3z" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2C7 2 3 6 3 11s4 9 9 9 9-4 9-9c0-1-0.1-2-0.4-3H12v3h5.2c-0.4 1.7-1.5 3.2-3.2 4.1V18l3 0.5c2-2 3-4.6 3-7.5 0-1-0.1-2-0.4-3H12V2z" />
      <circle cx="12" cy="11" r="3" />
    </svg>
  );
}

function resolveSisterUrl(label: string, url: string, site: SiteSettings): string {
  if (url) return url;
  if (label.toLowerCase().includes("broadway")) {
    return site.sister_site_saverys_broadway_url || "#";
  }
  if (label.toLowerCase().includes("ludlow")) {
    return site.sister_site_saverys_ludlow_url || "#";
  }
  if (label.toLowerCase().includes("xshowhome")) {
    return site.sister_site_xshowhome_url || "#";
  }
  return "#";
}

function FooterLink({ link, site }: { link: NavLink; site: SiteSettings }) {
  const url = link.external ? resolveSisterUrl(link.label, link.url, site) : link.url;
  const isExternal =
    link.external ||
    url.startsWith("http") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:");
  if (isExternal && url !== "#") {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }
  // QA Audit 2026-05-12 — Task 5: Saverys URLs awaiting confirmation; render as
  // muted text rather than href="#" placeholders.
  // TODO(links): Saverys URLs awaiting confirmation
  if (url === "#") {
    return <span className="footer-link-pending">{link.label}</span>;
  }
  return <Link href={url}>{link.label}</Link>;
}

export function Footer({ site, nav }: FooterProps) {
  const year = new Date().getFullYear();
  const footerLogo = site.footer_logo_image || site.logo_image;
  // QA Audit 2026-05-14 — Task 17: footer phone and email are tap-linked.
  const phoneTel = site.phone.replace(/\s+/g, "");
  // QA Audit 2026-05-14 — Task 20: only render socials when a real URL is set.
  const socials: Array<{
    kind: "instagram" | "facebook" | "google";
    url: string;
    label: string;
  }> = [
    { kind: "instagram", url: site.social_instagram, label: "Instagram" },
    { kind: "facebook", url: site.social_facebook, label: "Facebook" },
    {
      kind: "google",
      url: site.social_google_business,
      label: "Google Business Profile",
    },
  ].filter((s) => Boolean(s.url)) as typeof socials;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-grid">
          <div className="footer-col">
            {footerLogo ? (
              <span className="footer-brand-logo">
                {/* QA Audit 2026-05-12 — Task 22: footer logo is a decorative repeat. */}
                <Image
                  src={footerLogo}
                  alt=""
                  width={160}
                  height={56}
                />
              </span>
            ) : (
              <span className="footer-brand-text">{site.site_name}</span>
            )}
            {nav.footer_brand_line && (
              <p className="footer-brand-line">{nav.footer_brand_line}</p>
            )}
            <p>
              {site.address_line_1}
              <br />
              {site.address_line_2}
              <br />
              {site.postcode}
            </p>
            <p>
              <a href={`tel:${phoneTel}`}>{site.phone}</a>
            </p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            {socials.length > 0 && (
              <ul className="footer-social" aria-label="Find us on social">
                {socials.map((s) => (
                  <li key={s.kind}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                    >
                      <SocialIcon kind={s.kind} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {nav.footer_columns.map((col, idx) => (
            <div key={idx} className="footer-col">
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <FooterLink link={link} site={site} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>
            © {site.site_name} {year}
            {nav.footer_copyright ? ` · ${nav.footer_copyright}` : ""}
          </p>
          <div className="footer-bottom-links">
            {nav.footer_bottom_links.map((link, i) => (
              <Link key={i} href={link.url}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
