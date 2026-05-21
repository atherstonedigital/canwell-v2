import { NextResponse } from "next/server";
import { subscribeContact } from "@/lib/emailoctopus";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  email?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  consent?: unknown;
  hp?: unknown;
};

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  // Honeypot — pretend success, do not call the provider.
  if (typeof body.hp === "string" && body.hp.length > 0) {
    return NextResponse.json({ ok: true, message: "Thanks." });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const firstName =
    typeof body.firstName === "string" && body.firstName.trim()
      ? body.firstName.trim()
      : undefined;
  const lastName =
    typeof body.lastName === "string" && body.lastName.trim()
      ? body.lastName.trim()
      : undefined;
  const consent = body.consent === true;

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, message: "That email doesn't look right." },
      { status: 400 }
    );
  }
  if (!consent) {
    return NextResponse.json(
      { ok: false, message: "Please tick the consent box to subscribe." },
      { status: 400 }
    );
  }

  const limited = rateLimit(clientIp(req));
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } }
    );
  }

  if (!process.env.EMAILOCTOPUS_API_KEY || !process.env.EMAILOCTOPUS_LIST_ID) {
    console.error(
      "[newsletter] EmailOctopus env vars missing",
      {
        hasKey: Boolean(process.env.EMAILOCTOPUS_API_KEY),
        hasListId: Boolean(process.env.EMAILOCTOPUS_LIST_ID),
      }
    );
    return NextResponse.json(
      {
        ok: false,
        message: "Newsletter signup isn't configured yet. Please try again soon.",
      },
      { status: 503 }
    );
  }

  try {
    const result = await subscribeContact({ email, firstName, lastName });
    if (result.ok) {
      console.log("[newsletter] result", { branch: "success", email });
      return NextResponse.json({
        ok: true,
        message: "Check your email to confirm your subscription.",
      });
    }
    if (result.code === "already_subscribed") {
      console.log("[newsletter] result", { branch: "already_subscribed", email });
      return NextResponse.json({
        ok: true,
        message: "You're already on the list.",
      });
    }
    if (result.code === "invalid_email") {
      console.log("[newsletter] result", { branch: "invalid_email", email, code: result.code });
      return NextResponse.json(
        { ok: false, message: "That email doesn't look right." },
        { status: 400 }
      );
    }
    if (result.code === "rate_limited") {
      console.log("[newsletter] result", { branch: "rate_limited", email, code: result.code });
      return NextResponse.json(
        { ok: false, message: "We're hitting a rate limit. Try again in a moment." },
        { status: 429 }
      );
    }
    console.log("[newsletter] result", { branch: "server_error", email, code: result.code });
    return NextResponse.json(
      {
        ok: false,
        message: "Something went wrong on our end. Try again in a moment.",
      },
      { status: 502 }
    );
  } catch (err) {
    console.error("[newsletter] subscribeContact threw", {
      error: err instanceof Error ? err.message : String(err),
    });
    console.log("[newsletter] result", { branch: "exception", email });
    return NextResponse.json(
      {
        ok: false,
        message: "Something went wrong on our end. Try again in a moment.",
      },
      { status: 502 }
    );
  }
}
