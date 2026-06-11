import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function trimStr(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

// ── GitHub issue creation ─────────────────────────────────────────────────────
const GITHUB_REPO = "TapeshN/tapeshnagarwal.com";
const ISSUE_LABEL = "intake";

interface IntakePayload {
  company_name: string;
  contact_email: string;
  help_needed: string;
  repos_urls: string;
  tech_stack: string;
  qa_maturity: string;
  timeline: string;
  anything_else: string;
}

function buildIssueBody(p: IntakePayload): string {
  const rows: string[] = [];
  rows.push(`**Company / Your Name:** ${p.company_name}`);
  rows.push(`**Contact Email:** ${p.contact_email}`);
  rows.push(`\n### What do you need help with?\n\n${p.help_needed}`);
  if (p.repos_urls) {
    rows.push(`\n### Relevant Repos / URLs\n\n${p.repos_urls}`);
  }
  if (p.tech_stack) {
    rows.push(`\n**Tech Stack:** ${p.tech_stack}`);
  }
  if (p.qa_maturity) {
    rows.push(`**QA Maturity:** ${p.qa_maturity}`);
  }
  if (p.timeline) {
    rows.push(`**Timeline:** ${p.timeline}`);
  }
  if (p.anything_else) {
    rows.push(`\n### Anything Else?\n\n${p.anything_else}`);
  }
  rows.push(`\n---\n_Submitted via tapeshnagarwal.com/intake_`);
  return rows.join("\n");
}

export async function POST(req: NextRequest) {
  // ── Honeypot check ──────────────────────────────────────────────────────────
  // The client-side form has a hidden field "website" that real users never fill.
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (trimStr(body.website)) {
    // Silently accept (bot sees a 200) but don't create an issue.
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
  const company_name = trimStr(body.company_name);
  const contact_email = trimStr(body.contact_email);
  const help_needed = trimStr(body.help_needed);

  if (!company_name) {
    return NextResponse.json({ error: "Company / Your Name is required." }, { status: 422 });
  }
  if (!contact_email || !isValidEmail(contact_email)) {
    return NextResponse.json({ error: "A valid contact email is required." }, { status: 422 });
  }
  if (!help_needed) {
    return NextResponse.json({ error: "Please describe what you need help with." }, { status: 422 });
  }

  // ── Token presence check ─────────────────────────────────────────────────────
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    // FAIL-OPEN: no token configured — guide the user to alternatives.
    return NextResponse.json(
      {
        error: "service_unavailable",
        message:
          "The intake service is not configured yet. Please email tapeshnagarwal@gmail.com directly " +
          "or use the GitHub issue form at https://github.com/TapeshN/tapeshnagarwal.com/issues/new?template=service-intake.yml",
        fallback: {
          mailto: "tapeshnagarwal@gmail.com",
          github_form:
            "https://github.com/TapeshN/tapeshnagarwal.com/issues/new?template=service-intake.yml",
        },
      },
      { status: 503 },
    );
  }

  // ── Build and submit GitHub issue ────────────────────────────────────────────
  const payload: IntakePayload = {
    company_name,
    contact_email,
    help_needed,
    repos_urls: trimStr(body.repos_urls),
    tech_stack: trimStr(body.tech_stack),
    qa_maturity: trimStr(body.qa_maturity),
    timeline: trimStr(body.timeline),
    anything_else: trimStr(body.anything_else),
  };

  const issueTitle = `[Intake] ${company_name}`;
  const issueBody = buildIssueBody(payload);

  let ghRes: Response;
  try {
    ghRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: issueTitle,
        body: issueBody,
        labels: [ISSUE_LABEL],
      }),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "network error";
    return NextResponse.json(
      { error: `GitHub request failed: ${msg}` },
      { status: 502 },
    );
  }

  if (!ghRes.ok) {
    const text = await ghRes.text().catch(() => "");
    console.error(`[intake] GitHub API ${ghRes.status}: ${text}`);
    return NextResponse.json(
      { error: "Could not create the intake issue. Please email tapeshnagarwal@gmail.com directly." },
      { status: 502 },
    );
  }

  const issue = await ghRes.json();
  return NextResponse.json({ ok: true, issue_url: issue.html_url }, { status: 201 });
}
