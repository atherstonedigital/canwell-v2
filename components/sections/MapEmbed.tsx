"use client";

import { useState } from "react";

interface MapEmbedProps {
  address: string;
  directionsUrl?: string;
  caption?: string;
}

// QA Audit 2026-05-14 — Task 19: privacy-respecting Google Maps embed.
// The iframe (which sets cookies) is only loaded after the user opts in,
// so the page stays cookie-free until then.
export function MapEmbed({ address, directionsUrl, caption }: MapEmbedProps) {
  const [showMap, setShowMap] = useState(false);
  const query = encodeURIComponent(address);
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`;
  const directions =
    directionsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section className="map-embed-section">
      <div className="container">
        <div className="map-embed">
          {showMap ? (
            <iframe
              title={`Map of ${address}`}
              src={embedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="map-embed-placeholder"
              onClick={() => setShowMap(true)}
              aria-label={`Load Google Map showing ${address}`}
            >
              <span className="map-embed-overlay">
                <span className="map-embed-cta">Load map</span>
                <span className="map-embed-note">
                  Loads Google Maps. Cookies set by Google.
                </span>
              </span>
            </button>
          )}
        </div>
        <div className="map-embed-caption">
          <p>{caption ?? address}</p>
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-tertiary"
          >
            Get directions
          </a>
        </div>
      </div>
    </section>
  );
}
