"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { NavLink } from "@/lib/types";

interface MobileMenuProps {
  links: NavLink[];
  cta_label: string;
  cta_url: string;
  phone?: string;
}

export function MobileMenu({ links, cta_label, cta_url, phone }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  // Portal needs the DOM, so wait for client mount.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) openerRef.current?.focus();
  }, [open]);

  const overlay = open ? (
    <div
      id="mobile-menu"
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
    >
      <div className="mobile-menu-header">
        <span className="eyebrow">Menu</span>
        <button
          ref={closeButtonRef}
          type="button"
          className="mobile-menu-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav className="mobile-menu-nav" aria-label="Main">
        {links.map((link) => (
          <Link key={link.url} href={link.url} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mobile-menu-cta">
        <Link href={cta_url} className="btn btn-primary" onClick={() => setOpen(false)}>
          {cta_label}
        </Link>
        {/* QA Audit 2026-05-14 — Task 22: tap-to-call CTA in the mobile drawer. */}
        {phone && (
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="btn btn-secondary mobile-menu-call"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M5 4h4l2 5-3 2c1.5 3 4 5.5 7 7l2-3 5 2v4c0 1-1 2-2 2C10.5 23 1 13.5 1 6c0-1 1-2 2-2z" strokeLinejoin="round" />
            </svg>
            <span>Call: {phone}</span>
          </a>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        className="menu-toggle"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
      </button>

      {/* Render via portal so the fixed overlay escapes the header's
          backdrop-filter stacking context and can sit above page content. */}
      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
