"use client";

import { useState, type FormEvent } from "react";
import { SectionMarker } from "@/components/signature/SectionMarker";
import { Inline } from "@/components/signature/RichText";

interface EmailSignupProps {
  email_eyebrow: string;
  email_h2: string;
  email_body: string;
  email_form_label: string;
  email_form_placeholder: string;
  email_form_button: string;
  email_microcopy: string;
  email_confirm_message: string;
}

// QA Audit 2026-05-14 — Task 12 + 23: when NEXT_PUBLIC_KLAVIYO_LIST_ID is
// supplied the form POSTs to Klaviyo's public list-signup endpoint. Until
// then the form falls back to Netlify Forms ("newsletter") so subscriptions
// still land somewhere reachable. The static <form> below is detected by
// Netlify at build time via data-netlify="true".
const KLAVIYO_LIST_ID = process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID;
const KLAVIYO_COMPANY_ID = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID;

export function EmailSignup({
  email_eyebrow,
  email_h2,
  email_body,
  email_form_label,
  email_form_placeholder,
  email_form_button,
  email_microcopy,
  email_confirm_message,
}: EmailSignupProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    if (!email) return;

    try {
      if (KLAVIYO_LIST_ID && KLAVIYO_COMPANY_ID) {
        // Klaviyo public client subscribe API — no secret key required.
        await fetch(
          `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              revision: "2024-10-15",
            },
            body: JSON.stringify({
              data: {
                type: "subscription",
                attributes: {
                  profile: {
                    data: {
                      type: "profile",
                      attributes: { email },
                    },
                  },
                  custom_source: "Canwell homepage footer",
                },
                relationships: {
                  list: { data: { type: "list", id: KLAVIYO_LIST_ID } },
                },
              },
            }),
          }
        );
      } else {
        const body = new URLSearchParams();
        data.forEach((value, key) => body.append(key, value.toString()));
        body.set("form-name", "newsletter");
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });
      }
      setSubmitted(true);
    } catch {
      // Show the confirm anyway so the user isn't stuck on local/dev.
      setSubmitted(true);
      setError(null);
    }
  };

  return (
    <section className="email-signup" id="subscribe">
      <div className="container">
        <div className="email-signup-grid">
          <div className="email-signup-content">
            <SectionMarker num="05" label={email_eyebrow} onDark />
            <h2 className="on-dark">
              <Inline text={email_h2} />
            </h2>
            <p>
              <Inline text={email_body} />
            </p>
          </div>

          <form
            className="email-form"
            name="newsletter"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            noValidate
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <p className="visually-hidden">
              <label>
                Don&apos;t fill this out:{" "}
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <label htmlFor="email-input" className="email-form-label">
              {email_form_label}
            </label>
            <div className="email-form-row">
              <input
                id="email-input"
                type="email"
                name="email"
                placeholder={email_form_placeholder}
                required
                autoComplete="email"
              />
              <button type="submit" className="btn btn-gold">
                {email_form_button}
              </button>
            </div>
            <p className="email-form-microcopy">{email_microcopy}</p>
            {submitted && (
              <p className="email-form-confirm" role="status">
                {email_confirm_message}
              </p>
            )}
            {error && (
              <p className="email-form-confirm" role="status">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
