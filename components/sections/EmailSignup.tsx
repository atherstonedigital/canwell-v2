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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
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

          <form className="email-form" onSubmit={handleSubmit} noValidate>
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
          </form>
        </div>
      </div>
    </section>
  );
}
