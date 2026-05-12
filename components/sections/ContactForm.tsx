"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

interface ContactFormProps {
  microcopy: string;
  confirmMessage: string;
}

const SUBJECT_PRESETS: Record<string, string> = {
  "in-store-consultation":
    "I'd like to book a free in-store design consultation. ",
  "home-visit": "I'd like to request a home design visit. ",
  carpets: "I'm asking about carpets. ",
  curtains: "I'm asking about curtains. ",
  blinds: "I'm asking about blinds. ",
  furniture: "I'm asking about furniture. ",
};

export function ContactForm({ microcopy, confirmMessage }: ContactFormProps) {
  const params = useSearchParams();
  const subject = params?.get("subject") ?? "";
  // QA Audit 2026-05-12 — Task 18: derive initial message from the ?subject= query.
  const initialMessage = subject && SUBJECT_PRESETS[subject] ? SUBJECT_PRESETS[subject] : "";
  const [message, setMessage] = useState(initialMessage);
  const [submitted, setSubmitted] = useState(false);

  // QA Audit 2026-05-12 — Task 13: POST as form-urlencoded to Netlify Forms.
  // The static <form> below (with `data-netlify="true"`) lets Netlify detect
  // the form at build time; this handler submits via fetch so the user gets
  // an inline confirmation without a full page reload.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const body = new URLSearchParams();
    data.forEach((value, key) => body.append(key, value.toString()));
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } catch {
      // Even if the fetch errors (e.g. local dev), we still show the confirm
      // so the user isn't stuck. Submissions in production go to Netlify.
    }
    setSubmitted(true);
  };

  return (
    <form
      className="contact-form"
      name="contact"
      method="POST"
      action="/contact/thanks"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* QA Audit 2026-05-12 — Task 13: Netlify Forms requires form-name + honeypot. */}
      <input type="hidden" name="form-name" value="contact" />
      <p className="visually-hidden">
        <label>
          Don&apos;t fill this out if you&apos;re human:{" "}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      {subject && (
        <input type="hidden" name="subject" value={subject} />
      )}

      <div className="field">
        <label htmlFor="contact-name">
          Your name <span className="required-marker" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          aria-required="true"
          autoComplete="name"
        />
      </div>

      <div className="field">
        <label htmlFor="contact-email">
          Email <span className="required-marker" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          aria-required="true"
          autoComplete="email"
          inputMode="email"
        />
      </div>

      <div className="field">
        <label htmlFor="contact-phone">Phone (optional)</label>
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
        />
      </div>

      <div className="field">
        <label htmlFor="contact-postcode">
          Postcode (optional, helps us tell you about delivery and home visits)
        </label>
        <input
          id="contact-postcode"
          type="text"
          name="postcode"
          autoComplete="postal-code"
          inputMode="text"
        />
      </div>

      <div className="field">
        <label htmlFor="contact-message">
          What can we help with?{" "}
          <span className="required-marker" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          aria-required="true"
          placeholder="A sofa you saw on Instagram, a carpet for a new room, a fabric you're trying to match. Whatever it is."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="contact-referrer">
          How did you hear about us? (optional)
        </label>
        <select id="contact-referrer" name="referrer" defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          <option value="google">Google</option>
          <option value="friend">Friend</option>
          <option value="walking-past">Walking past</option>
          <option value="social">Social media</option>
          <option value="email">Weekly email</option>
          <option value="other">Other</option>
        </select>
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
