"use client";

import { useState, type FormEvent } from "react";
import { trackLead } from "@/lib/analytics";

const FORM_NAME = "holiday-let-enquiry";

interface HolidayLetEnquiryFormProps {
  microcopy: string;
  confirmMessage: string;
}

export function HolidayLetEnquiryForm({
  microcopy,
  confirmMessage,
}: HolidayLetEnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);

  // Mirrors the contact form: the static <form> in /__forms.html lets Netlify
  // detect the form at build time; here we POST via fetch so the owner gets an
  // inline confirmation without a full page reload.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const body = new URLSearchParams();
    data.forEach((value, key) => body.append(key, value.toString()));
    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } catch {
      // Even if the fetch errors (e.g. local dev), still confirm so the owner
      // isn't stuck. Submissions in production go to Netlify.
    }
    // Meta Lead + GA4 mirror. content_name only — no raw PII in the payload.
    trackLead(FORM_NAME);
    setSubmitted(true);
  };

  return (
    <form
      className="contact-form"
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      noValidate
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="visually-hidden">
        <label>
          Don&apos;t fill this out if you&apos;re human:{" "}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="field">
        <label htmlFor="hl-name">
          Your name <span className="required-marker" aria-hidden="true">*</span>
        </label>
        <input
          id="hl-name"
          type="text"
          name="name"
          required
          aria-required="true"
          autoComplete="name"
        />
      </div>

      <div className="field">
        <label htmlFor="hl-email">
          Email <span className="required-marker" aria-hidden="true">*</span>
        </label>
        <input
          id="hl-email"
          type="email"
          name="email"
          required
          aria-required="true"
          autoComplete="email"
          inputMode="email"
        />
      </div>

      <div className="field">
        <label htmlFor="hl-phone">Phone (optional)</label>
        <input
          id="hl-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
        />
      </div>

      <div className="field">
        <label htmlFor="hl-location">
          Property location{" "}
          <span className="required-marker" aria-hidden="true">*</span>
        </label>
        <input
          id="hl-location"
          type="text"
          name="property-location"
          required
          aria-required="true"
          placeholder="Town or village, and postcode if you have it"
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="hl-message">
          Tell us about the property{" "}
          <span className="required-marker" aria-hidden="true">*</span>
        </label>
        <textarea
          id="hl-message"
          name="message"
          required
          aria-required="true"
          placeholder="How many bedrooms, what needs doing, and any launch or changeover date we should work to."
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Send your enquiry
      </button>
      <p className="form-microcopy">{microcopy}</p>
      {submitted && (
        <p className="form-confirm" role="status">
          {confirmMessage}
        </p>
      )}
    </form>
  );
}
