import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Only these public sites may be probed — prevents the endpoint from being
// turned into an open SSRF proxy. Keyed by the value the client may pass.
const ALLOWLIST: Record<string, string> = {
  "notquality.com": "https://notquality.com",
};

type Tag = "info" | "pass" | "warn" | "fail" | "skip";
interface Step {
  agent: string;
  tag: Tag;
  msg: string;
}

// Escape any remote-derived text before it reaches the client, which renders
// step messages as HTML (only our own <em> emphasis should survive).
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const SECURITY_HEADERS: [string, string][] = [
  ["strict-transport-security", "HSTS"],
  ["content-security-policy", "CSP"],
  ["x-content-type-options", "X-Content-Type-Options"],
  ["x-frame-options", "X-Frame-Options"],
  ["referrer-policy", "Referrer-Policy"],
];

export async function GET(req: NextRequest) {
  const targetKey = (req.nextUrl.searchParams.get("target") || "notquality.com").toLowerCase();
  const startUrl = ALLOWLIST[targetKey];
  if (!startUrl) {
    return NextResponse.json(
      { error: `target not allowed — pick one of: ${Object.keys(ALLOWLIST).join(", ")}` },
      { status: 400 },
    );
  }

  const steps: Step[] = [];

  // ── route ──────────────────────────────────────────────
  steps.push({ agent: "route", tag: "info", msg: `selecting sweep: <em>release-readiness@live</em> for ${esc(targetKey)}` });
  steps.push({ agent: "route", tag: "pass", msg: "policy bundle resolved · probing the live deployment" });

  // ── fetch ──────────────────────────────────────────────
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 12000);
  const t0 = Date.now();
  let res: Response | null = null;
  let body = "";
  let netError = "";
  try {
    res = await fetch(startUrl, {
      redirect: "follow",
      signal: ctrl.signal,
      cache: "no-store",
      headers: { "user-agent": "tapquality-sweep/1.0 (+https://tapeshnagarwal.com)" },
    });
    body = await res.text();
  } catch (e: unknown) {
    const err = e instanceof Error ? e : null;
    netError = err?.name === "AbortError" ? "timeout after 12s" : err?.message || "network error";
  } finally {
    clearTimeout(timeout);
  }
  const latencyMs = Date.now() - t0;

  if (!res) {
    steps.push({ agent: "fetch", tag: "fail", msg: `unreachable · <em>${esc(netError)}</em>` });
    steps.push({ agent: "check", tag: "skip", msg: "no response — guardrail audit skipped" });
    steps.push({ agent: "scan", tag: "skip", msg: "no document — a11y/seo scan skipped" });
    steps.push({ agent: "build", tag: "fail", msg: "release confidence · <em>0 / 100</em> · unreachable" });
    return NextResponse.json({
      target: targetKey,
      finalUrl: startUrl,
      latencyMs,
      steps,
      verdict: { score: 0, label: "BLOCKED", className: "fail" },
    });
  }

  const response = res;
  const status = response.status;
  const finalUrl = response.url || startUrl;
  const bytes = body.length;
  const server = response.headers.get("server") || "unknown";
  const reachable = status >= 200 && status < 400;

  let score = 0;
  steps.push({
    agent: "fetch",
    tag: reachable ? "pass" : "fail",
    msg: reachable
      ? `HTTP <em>${status}</em> · ${latencyMs}ms · ${(bytes / 1024).toFixed(0)}KB · served by <em>${esc(server)}</em>`
      : `HTTP <em>${status}</em> · target returned an error`,
  });
  if (reachable) score += 30;
  if (latencyMs < 800) score += 10;
  else if (latencyMs < 2000) score += 5;

  // ── check (transport + security headers) ───────────────
  steps.push({ agent: "check", tag: "info", msg: "auditing transport + security headers" });
  const present = SECURITY_HEADERS.filter(([h]) => response.headers.get(h));
  const missing = SECURITY_HEADERS.filter(([h]) => !response.headers.get(h));
  const checkTag: Tag = missing.length === 0 ? "pass" : present.length === 0 ? "fail" : "warn";
  steps.push({
    agent: "check",
    tag: checkTag,
    msg:
      `${present.length}/${SECURITY_HEADERS.length} security headers present` +
      (missing.length ? ` · missing <em>${esc(missing.map(([, n]) => n).join(", "))}</em>` : " · all green"),
  });
  score += Math.round((present.length / SECURITY_HEADERS.length) * 20);

  // ── scan (a11y + seo, parsed from the live HTML) ───────
  steps.push({ agent: "scan", tag: "info", msg: "parsing document · a11y + seo signals" });
  const hasLang = /<html[^>]*\blang=["'][^"']+["']/i.test(body);
  const title = (body.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "").trim();
  const hasDesc = /<meta[^>]+name=["']description["'][^>]*>/i.test(body);
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(body);
  const h1Count = (body.match(/<h1[\s>]/gi) || []).length;
  const imgs = body.match(/<img\b[^>]*>/gi) || [];
  const imgsNoAlt = imgs.filter((t) => !/\balt=/i.test(t)).length;

  const issues: string[] = [];
  if (!hasLang) issues.push("missing html[lang]");
  if (!title) issues.push("missing <title>");
  if (!hasDesc) issues.push("no meta description");
  if (!hasViewport) issues.push("no viewport meta");
  if (h1Count === 0) issues.push("no h1");
  if (imgsNoAlt > 0) issues.push(`${imgsNoAlt} img missing alt`);

  const scanTag: Tag = issues.length === 0 ? "pass" : issues.length <= 2 ? "warn" : "fail";
  steps.push({
    agent: "scan",
    tag: scanTag,
    msg:
      issues.length === 0
        ? `clean · lang ✓ · title ✓ · description ✓ · ${imgs.length} imgs all alt-tagged · ${h1Count} h1`
        : `${issues.length} advisor${issues.length > 1 ? "ies" : "y"} · <em>${esc(issues.join(" · "))}</em>`,
  });
  if (hasLang) score += 7;
  if (title) score += 8;
  if (hasDesc) score += 7;
  if (hasViewport) score += 6;
  if (h1Count > 0) score += 6;
  if (imgsNoAlt === 0) score += 6;

  score = Math.max(0, Math.min(100, score));
  const label = score >= 90 ? "READY" : score >= 70 ? "WARN" : score >= 50 ? "REVIEW" : "BLOCKED";
  const className = score >= 90 ? "ok" : score >= 70 ? "warn" : "fail";

  // ── build (roll-up) ────────────────────────────────────
  steps.push({ agent: "build", tag: "info", msg: "rolling up verdict from measured signals" });
  steps.push({
    agent: "build",
    tag: className === "ok" ? "pass" : className === "warn" ? "warn" : "fail",
    msg: `release confidence · <em>${score} / 100</em> · ${
      label === "READY" ? "ready to ship" : label === "WARN" ? "ship with note" : "needs review"
    }`,
  });

  return NextResponse.json({
    target: targetKey,
    finalUrl,
    status,
    latencyMs,
    bytes,
    server,
    title,
    steps,
    verdict: { score, label, className },
  });
}
