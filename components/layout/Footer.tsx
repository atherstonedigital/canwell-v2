import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { ABOUT_NAV, PRIMARY_NAV } from "./nav-links";

interface FooterProps {
  site: SiteSettings;
}

export function Footer({ site }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-grid">
          <div className="footer-col">
            <span className="footer-brand-text">{site.site_name}</span>
            <p className="footer-brand-line">
              The Cotswolds furnishings showroom. Walk in, choose, take home.
            </p>
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

          <div className="footer-col">
            <h4>What we do</h4>
            <ul>
              {PRIMARY_NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>About</h4>
            <ul>
              {ABOUT_NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>The wider family</h4>
            <ul>
              <li>
                <a
                  href={site.sister_site_saverys_broadway_url || "#"}
                  target={site.sister_site_saverys_broadway_url ? "_blank" : undefined}
                  rel={site.sister_site_saverys_broadway_url ? "noopener noreferrer" : undefined}
                >
                  Saverys of Broadway
                </a>
              </li>
              <li>
                <a
                  href={site.sister_site_saverys_ludlow_url || "#"}
                  target={site.sister_site_saverys_ludlow_url ? "_blank" : undefined}
                  rel={site.sister_site_saverys_ludlow_url ? "noopener noreferrer" : undefined}
                >
                  Saverys of Ludlow
                </a>
              </li>
              <li>
                <a
                  href={site.sister_site_xshowhome_url || "#"}
                  target={site.sister_site_xshowhome_url ? "_blank" : undefined}
                  rel={site.sister_site_xshowhome_url ? "noopener noreferrer" : undefined}
                >
                  xshowhome.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {site.site_name} {year} · A family-run furnishings showroom in
            Broadway, Cotswolds
          </p>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
