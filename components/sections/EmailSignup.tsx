"use client";

import Link from "next/link";
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

type FormState = "idle" | "submitting" | "success" | "error";

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
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const firstName = String(data.get("firstName") || "").trim();
    const consent = data.get("consent") === "on";
    const hp = String(data.get("hp") || "");

    setState("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          consent,
          hp,
        }),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };

      if (payload.ok) {
        setState("success");
        setMessage(payload.message || email_confirm_message);
        form.reset();
      } else {
        setState("error");
        setMessage(payload.message || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("Couldn't reach the server. Please try again.");
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

          <form className="email-form" onSubmit={handleSubmit} noValidate>
            <p className="visually-hidden" aria-hidden="true">
              <label>
                Don&apos;t fill this out:{" "}
                <input
                  type="text"
                  name="hp"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </label>
            </p>

            <label htmlFor="newsletter-first-name" className="email-form-label">
              First name <span className="email-form-optional">(optional)</span>
            </label>
            <div className="email-form-row email-form-row-single">
              <input
                id="newsletter-first-name"
                type="text"
                name="firstName"
                autoComplete="given-name"
                placeholder="First name"
              />
            </div>

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
              <button
                type="submit"
                className="btn btn-gold"
                disabled={state === "submitting"}
              >
                {state === "submitting" ? "Sending…" : email_form_button}
              </button>
            </div>

            <label className="email-form-consent">
              <input type="checkbox" name="consent" required />
              <span>
                I&apos;d like to hear from Canwell about new arrivals, showroom events
                and seasonal offers. Unsubscribe any time. See our{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </span>
            </label>

            <p className="email-form-microcopy">{email_microcopy}</p>

            {state === "success" && (
              <p
                className="email-form-confirm"
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            )}
            {state === "error" && (
              <p
                className="email-form-confirm email-form-confirm-error"
                role="alert"
                aria-live="assertive"
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
