import Link from "next/link";
import { PRIMARY_NAV } from "./nav-links";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="site-logo" aria-label="Canwell Interiors home">
          <span className="site-logo-icon" aria-hidden="true" />
          <span className="site-logo-text">Canwell Interiors</span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          {PRIMARY_NAV.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-header-cta">
          <Link href="/visit" className="btn btn-primary">
            Plan your visit
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
