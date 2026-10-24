import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

interface Env {
  SEND_EMAIL: { send(message: EmailMessage): Promise<void> };
  FEEDBACK_RATE_LIMIT: KVNamespace;
}

const FEEDBACK_RATINGS = new Set(["good", "okay", "bad"]);
const FEEDBACK_RATE_WINDOW_SECONDS = 60 * 60; // 1 vote per IP per page per hour

async function handleFeedback(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const raw = await request.text();
  if (raw.length > 1000) {
    return new Response(JSON.stringify({ error: "payload_too_large" }), {
      status: 413,
      headers: { "content-type": "application/json" },
    });
  }

  let body: { rating?: unknown; path?: unknown; theme?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const rating = typeof body.rating === "string" ? body.rating : "";
  if (!FEEDBACK_RATINGS.has(rating)) {
    return new Response(JSON.stringify({ error: "invalid_rating" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const path = typeof body.path === "string" ? body.path.slice(0, 200) : "/";
  const theme = typeof body.theme === "string" ? body.theme.slice(0, 50) : "unknown";

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  // Keyed on IP only, not path: path is client-supplied and an attacker
  // varying it per request would otherwise get a fresh rate-limit bucket
  // every time, bypassing the limit entirely.
  const rateLimitKey = `fb:${ip}`;

  const alreadyVoted = await env.FEEDBACK_RATE_LIMIT.get(rateLimitKey);
  if (alreadyVoted) {
    return new Response(JSON.stringify({ error: "rate_limited" }), {
      status: 429,
      headers: { "content-type": "application/json" },
    });
  }

  await env.FEEDBACK_RATE_LIMIT.put(rateLimitKey, "1", {
    expirationTtl: FEEDBACK_RATE_WINDOW_SECONDS,
  });

  const msg = createMimeMessage();
  msg.setSender({ name: "Portfolio Feedback", addr: "mailer@nirmalkarthikeyan.com" });
  msg.setRecipient("nirmalkarthikeyan1@gmail.com");
  msg.setSubject(`Portfolio feedback: ${rating}`);
  msg.addMessage({
    contentType: "text/plain",
    data: `Rating: ${rating}\nPage: ${path}\nTheme: ${theme}`,
  });

  await env.SEND_EMAIL.send(
    new EmailMessage("mailer@nirmalkarthikeyan.com", "nirmalkarthikeyan1@gmail.com", msg.asRaw())
  );

  return new Response(null, { status: 204 });
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/feedback") {
      return handleFeedback(request, env);
    }
    return new Response("Not found", { status: 404 });
  },

  async email(message: ForwardableEmailMessage, env: Env, _ctx: ExecutionContext) {
    await message.forward("nirmalkarthikeyan1@gmail.com");

    const msg = createMimeMessage();
    msg.setSender({ name: "Portfolio Mail", addr: "mailer@nirmalkarthikeyan.com" });
    msg.setRecipient("nirmalkarthikeyan1@gmail.com");
    msg.setSubject("New email received");
    msg.addMessage({
      contentType: "text/plain",
      data: `New email from ${message.from}`,
    });

    await env.SEND_EMAIL.send(
      new EmailMessage("mailer@nirmalkarthikeyan.com", "nirmalkarthikeyan1@gmail.com", msg.asRaw())
    );
  },
};
