import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── Platform endpoint ─────────────────────────────────────────────────────────
const PLATFORM_INTAKE_URL = "https://app.tapquality.ai/api/intake";

// ── Rate limiting (in-memory, resets on cold start) ──────────────────────────
// Simple sliding-window: max 5 submissions per IP per 10 minutes.
const rateMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  rateMap.set(ip, hits);
  return hits.length > RATE_MAX;
}

// ── Validation helpers ───────────────────────────────────────────────────────
const MAX_LENGTHS: Record<string, number> = {
  your_name: 200,
  company: 200,
  contact_email: 254,
  help_needed: 8000,
  repos_urls: 2000,
  tech_stack: 500,
  qa_maturity: 200,
  timeline: 200,
  anything_else: 2000,
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function trimStr(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

// ── Field mapping → platform contract ────────────────────────────────────────
// Platform expects: { name, email, company?, projectType?, message?, website_hp }
// Form sends:       your_name, company, contact_email, help_needed, repos_urls,
//                   tech_stack, qa_maturity, timeline, anything_else, website_hp
function buildPlatformPayload(body: Record<string, unknown>): {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message?: string;
  website_hp: string;
} {
  const your_name = trimStr(body.your_name);
  const company = trimStr(body.company);
  const contact_email = trimStr(body.contact_email);
  const help_needed = trimStr(body.help_needed);
  const repos_urls = trimStr(body.repos_urls);
  const tech_stack = trimStr(body.tech_stack);
  const qa_maturity = trimStr(body.qa_maturity);
  const timeline = trimStr(body.timeline);
  const anything_else = trimStr(body.anything_else);

  // Compose a full message from the richer form fields so no signal is lost.
  const messageParts: string[] = [];
  if (help_needed) messageParts.push(`### What do you need help with?\n\n${help_needed}`);
  if (repos_urls) messageParts.push(`### Repos / URLs\n\n${repos_urls}`);
  if (tech_stack) messageParts.push(`**Tech stack:** ${tech_stack}`);
  if (anything_else) messageParts.push(`### Anything else?\n\n${anything_else}`);

  // Derive projectType from the maturity + timeline selects.
  const projectTypeParts: string[] = [];
  if (qa_maturity) projectTypeParts.push(`QA maturity: ${qa_maturity}`);
  if (timeline) projectTypeParts.push(`Timeline: ${timeline}`);
  const projectType = projectTypeParts.join(" · ") || undefined;

  return {
    name: your_name,
    email: contact_email,
    company: company || undefined,
    projectType,
    message: messageParts.join("\n\n") || undefined,
    website_hp: trimStr(body.website_hp),
  };
}

export async function POST(req: NextRequest) {
  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // ── Honeypot check ──────────────────────────────────────────────────────────
  // Real users leave website_hp blank — bots fill it.
  // We still forward the value to the platform so it can apply its own check,
  // but we short-circuit loudly here too (silently return ok so bots see success).
  if (trimStr(body.website_hp)) {
    return NextResponse.json({ ok: true });
  }

  // ── Rate limiting ───────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions — please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  // ── Validate required fields ────────────────────────────────────────────────
  const your_name = trimStr(body.your_name);
  const contact_email = trimStr(body.contact_email);
  const help_needed = trimStr(body.help_needed);

  if (!your_name) {
    return NextResponse.json({ error: "Your Name is required." }, { status: 422 });
  }
  if (!contact_email || !isValidEmail(contact_email)) {
    return NextResponse.json({ error: "A valid contact email is required." }, { status: 422 });
  }
  if (!help_needed) {
    return NextResponse.json({ error: "Please describe what you need help with." }, { status: 422 });
  }

  // ── Field-length guard ───────────────────────────────────────────────────────
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const val = trimStr(body[field]);
    if (val.length > max) {
      return NextResponse.json(
        { error: `Field '${field}' exceeds maximum length of ${max} characters.` },
        { status: 422 },
      );
    }
  }

  // ── Forward to TapQuality platform ──────────────────────────────────────────
  const platformPayload = buildPlatformPayload(body);

  let platformRes: Response;
  try {
    platformRes = await fetch(PLATFORM_INTAKE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(platformPayload),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "network error";
    console.error(`[intake] platform fetch failed: ${msg}`);
    return NextResponse.json(
      { error: "Could not reach the intake service. Please email tapeshnagarwal@gmail.com directly." },
      { status: 502 },
    );
  }

  // ── Handle platform response ─────────────────────────────────────────────────
  let platformData: Record<string, unknown> = {};
  try {
    platformData = await platformRes.json();
  } catch {
    // non-JSON body — treat as opaque
  }

  if (platformRes.status === 429) {
    return NextResponse.json(
      { error: "Too many submissions — please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  if (platformRes.status === 400) {
    const msg =
      typeof platformData.error === "string"
        ? platformData.error
        : "Submission rejected — please review your details and try again.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (!platformRes.ok) {
    console.error(`[intake] platform returned ${platformRes.status}`, platformData);
    return NextResponse.json(
      {
        error:
          "The intake service is temporarily unavailable. Please email tapeshnagarwal@gmail.com directly.",
        fallback: {
          mailto: "tapeshnagarwal@gmail.com",
          github_form:
            "https://github.com/TapeshN/tapeshnagarwal.com/issues/new?template=service-intake.yml",
        },
      },
      { status: 503 },
    );
  }

  // Success — platform returns { ok: true, ... }; proxy it back to the client.
  return NextResponse.json({ ok: true }, { status: 200 });
}
