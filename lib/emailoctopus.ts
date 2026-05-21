// EmailOctopus v2 contacts client. Docs: https://emailoctopus.com/api-documentation/v2
// Server-only — relies on EMAILOCTOPUS_API_KEY which must never reach the bundle.

const ENDPOINT = "https://api.emailoctopus.com";
const TIMEOUT_MS = 10_000;

export type SubscribeInput = {
  email: string;
  firstName?: string;
  lastName?: string;
};

export type SubscribeResult =
  | { ok: true }
  | {
      ok: false;
      code: "already_subscribed" | "invalid_email" | "rate_limited" | "server_error";
      message: string;
    };

type EmailOctopusError = {
  error?: { code?: string; message?: string };
};

export async function subscribeContact({
  email,
  firstName,
  lastName,
}: SubscribeInput): Promise<SubscribeResult> {
  const apiKey = process.env.EMAILOCTOPUS_API_KEY;
  const listId = process.env.EMAILOCTOPUS_LIST_ID;

  if (!apiKey || !listId) {
    throw new Error(
      "EmailOctopus is not configured: set EMAILOCTOPUS_API_KEY and EMAILOCTOPUS_LIST_ID."
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const fields: Record<string, string> = {};
  if (firstName) fields.FirstName = firstName;
  if (lastName) fields.LastName = lastName;

  console.log("[emailoctopus] config", {
    hasApiKey: !!process.env.EMAILOCTOPUS_API_KEY,
    apiKeyTail: process.env.EMAILOCTOPUS_API_KEY?.slice(-4) ?? null,
    listId: process.env.EMAILOCTOPUS_LIST_ID ?? null,
    endpoint: `https://api.emailoctopus.com/lists/${process.env.EMAILOCTOPUS_LIST_ID}/contacts`,
  });

  try {
    const res = await fetch(`${ENDPOINT}/lists/${listId}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        fields,
        status: "pending",
      }),
      signal: controller.signal,
    });

    const responseText = await res.text();
    console.log("[emailoctopus] response", {
      status: res.status,
      statusText: res.statusText,
      body: responseText,
    });

    if (res.ok) return { ok: true };

    let body: EmailOctopusError = {};
    try {
      body = responseText ? (JSON.parse(responseText) as EmailOctopusError) : {};
    } catch {
      // Body wasn't JSON — fall through and use status code only.
    }
    const code = body.error?.code;

    console.error("[emailoctopus] non-ok response", {
      status: res.status,
      providerCode: code,
      providerMessage: body.error?.message,
    });

    if (res.status === 409 || code === "MEMBER_EXISTS_WITH_EMAIL_ADDRESS") {
      return {
        ok: false,
        code: "already_subscribed",
        message: "Contact is already on this list.",
      };
    }
    if (res.status === 422) {
      return {
        ok: false,
        code: "invalid_email",
        message: "Email address rejected by provider.",
      };
    }
    if (res.status === 429) {
      return {
        ok: false,
        code: "rate_limited",
        message: "Rate limited by provider.",
      };
    }
    return {
      ok: false,
      code: "server_error",
      message: `EmailOctopus responded ${res.status}`,
    };
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    console.error("[emailoctopus] request failed", {
      aborted,
      error: err instanceof Error ? err.message : String(err),
    });
    return {
      ok: false,
      code: "server_error",
      message: aborted ? "Request to EmailOctopus timed out." : "Network error reaching EmailOctopus.",
    };
  } finally {
    clearTimeout(timer);
  }
}
