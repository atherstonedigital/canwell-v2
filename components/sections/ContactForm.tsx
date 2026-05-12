"use client";

import { useState, type FormEvent } from "react";

interface ContactFormProps {
  microcopy: string;
  confirmMessage: string;
}

export function ContactForm({ microcopy, confirmMessage }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="contact-name">
          Your name <span className="required-marker">*</span>
        </label>
        <input id="contact-name" type="text" name="name" required autoComplete="name" />
      </div>

      <div className="field">
        <label htmlFor="contact-email">
          Email <span className="required-marker">*</span>
        </label>
        <input id="contact-email" type="email" name="email" required autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="contact-phone">Phone (optional)</label>
        <input id="contact-phone" type="tel" name="phone" autoComplete="tel" />
      </div>

      <div className="field">
        <label htmlFor="contact-postcode">
          Postcode (optional, helps us tell you about delivery and home visits)
        </label>
        <input id="contact-postcode" type="text" name="postcode" autoComplete="postal-code" />
      </div>

      <div className="field">
        <label htmlFor="contact-message">
          What can we help with? <span className="required-marker">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          placeholder="A sofa you saw on Instagram, a carpet for a new room, a fabric you're trying to match. Whatever it is."
        />
      </div>

      <div className="field">
        <label htmlFor="contact-source">How did you hear about us? (optional)</label>
        <select id="contact-source" name="source" defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          <option value="google">Google</option>
          <option value="friend">Friend</option>
          <option value="passing">Walking past</option>
          <option value="social">Social media</option>
          <option value="email">Weekly email</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Send
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
