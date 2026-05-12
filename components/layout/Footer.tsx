import Link from "next/link";
import Image from "next/image";
import type { NavLink, SiteSettings, NavigationContent } from "@/lib/types";

interface FooterProps {
  site: SiteSettings;
  nav: NavigationContent;
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
            <p>{site.phone}</p>
            <p>{site.email}</p>
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
