import Link from "next/link";
import Image from "next/image";
import { getNavigation, getSite } from "@/lib/content";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const nav = getNavigation();
  const site = getSite();
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="site-logo" aria-label={`${site.site_name} home`}>
          {site.logo_image ? (
            <span className="site-logo-image">
              {/* QA Audit 2026-05-12 — Task 22: descriptive alt that names the destination. */}
              <Image
                src={site.logo_image}
                alt={`${site.site_name}, home`}
                width={120}
                height={48}
                priority
              />
            </span>
          ) : (
            <>
              <span className="site-logo-icon" aria-hidden="true" />
              <span className="site-logo-text">{site.site_name}</span>
            </>
          )}
        </Link>

        <nav className="site-nav" aria-label="Main">
          {nav.primary_nav.map((link) => (
            <Link key={link.url} href={link.url}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-header-cta">
          <Link href={nav.header_cta_url} className="btn btn-primary">
            {nav.header_cta_label}
          </Link>
          <MobileMenu
            links={nav.primary_nav}
            cta_label={nav.mobile_menu_cta_label}
            cta_url={nav.mobile_menu_cta_url}
            phone={site.phone}
          />
        </div>
      </div>
    </header>
  );
}
