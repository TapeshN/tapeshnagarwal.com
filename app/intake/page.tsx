"use client";

import { useState, useRef } from "react";
import ThemeToggle from "../components/ThemeToggle";

const QA_MATURITY_OPTIONS = [
  "",
  "None — no automated tests at all",
  "Some — a handful of tests, no CI discipline",
  "Mature — solid test suite, looking to level up",
  "Unsure — not sure what we have",
];

const TIMELINE_OPTIONS = [
  "",
  "ASAP — we have a blocker right now",
  "Weeks — targeting kick-off within a month",
  "Months — planning ahead, not urgent",
  "Exploring — just researching options",
];

type FormState = "idle" | "submitting" | "success" | "error" | "unavailable";

interface UnavailableData {
  mailto: string;
  github_form: string;
}

export default function IntakePage() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [unavailable, setUnavailable] = useState<UnavailableData | null>(null);
  const [issueUrl, setIssueUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 503 && data.error === "service_unavailable") {
        setUnavailable(data.fallback);
        setState("unavailable");
        return;
      }

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setIssueUrl(data.issue_url || "");
      setState("success");
      formRef.current?.reset();
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
      setState("error");
    }
  }

  return (
    <>
      {/* ─── Top bar ───────────────────────────────────────── */}
      <header className="topbar">
        <div className="wrap topbar__inner">
          <a className="brand" href="/">
            <span className="brand__dot" aria-hidden="true" />
            <span className="brand__name">Tapesh Nagarwal</span>
            <span className="brand__meta mono">/ qa-sdet-aie</span>
          </a>
          <nav className="nav mono">
            <a href="/#now">now</a>
            <a href="/#work">work</a>
            <a href="/#playground">playground</a>
            <a href="/#stack">stack</a>
            <a href="/#contact">contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main id="top" className="intake-main">
        <section className="intake-hero wrap">
          <div className="intake-hero__back mono">
            <a href="/">← back</a>
          </div>
          <div className="intake-hero__meta mono">
            <span className="status-pill">
              <span className="status-pill__dot" />
              <span>open for engagements</span>
            </span>
          </div>

          <h1 className="intake-hero__title">
            Start an <span className="serif italic">engagement</span>
          </h1>

          <p className="intake-hero__lede">
            Describe the problem, your stack, and your timeline. I reply within 2 business days.
            If we're a fit I'll send a short scoping call invite.
          </p>
        </section>

        <section className="wrap intake-body">
          <div className="intake-layout">
            {/* ── Sidebar ──────────────────────────────────── */}
            <aside className="intake-sidebar mono">
              <div className="intake-sidebar__block">
                <span className="intake-sidebar__label">what happens next</span>
                <ol className="intake-sidebar__steps">
                  <li>I read your intake within 2 business days.</li>
                  <li>If there's a fit, I send a 30-min scoping call invite.</li>
                  <li>We agree on scope, timeline, and rate.</li>
                  <li>Work begins.</li>
                </ol>
              </div>
              <div className="intake-sidebar__block">
                <span className="intake-sidebar__label">good fits</span>
                <ul className="intake-sidebar__list">
                  <li>QA strategy &amp; test architecture</li>
                  <li>Agentic system design &amp; review</li>
                  <li>Release infrastructure &amp; CI/CD</li>
                  <li>Automation framework builds</li>
                </ul>
              </div>
              <div className="intake-sidebar__block">
                <span className="intake-sidebar__label">or reach out directly</span>
                <a
                  className="intake-sidebar__link"
                  href="mailto:tapeshnagarwal@gmail.com"
                >
                  tapeshnagarwal@gmail.com ↗
                </a>
              </div>
            </aside>

            {/* ── Form ─────────────────────────────────────── */}
            <div className="intake-form-wrap">
              {state === "success" ? (
                <div className="intake-notice intake-notice--success">
                  <div className="intake-notice__icon">✓</div>
                  <h2 className="intake-notice__title">Intake received</h2>
                  <p className="intake-notice__body">
                    I&apos;ll review it and follow up within 2 business days. In the
                    meantime you can{" "}
                    {issueUrl ? (
                      <a href={issueUrl} target="_blank" rel="noopener noreferrer">
                        track the issue on GitHub ↗
                      </a>
                    ) : (
                      "track the issue on GitHub"
                    )}
                    .
                  </p>
                  <button
                    className="intake-btn intake-btn--ghost"
                    onClick={() => { setState("idle"); setIssueUrl(""); }}
                  >
                    Submit another
                  </button>
                </div>
              ) : state === "unavailable" && unavailable ? (
                <div className="intake-notice intake-notice--warn">
                  <div className="intake-notice__icon">!</div>
                  <h2 className="intake-notice__title">Service temporarily unavailable</h2>
                  <p className="intake-notice__body">
                    The intake form isn&apos;t accepting submissions right now. Please reach out
                    directly:
                  </p>
                  <ul className="intake-notice__links mono">
                    <li>
                      <a href={`mailto:${unavailable.mailto}`}>{unavailable.mailto}</a>
                    </li>
                    <li>
                      <a href={unavailable.github_form} target="_blank" rel="noopener noreferrer">
                        GitHub issue form ↗
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <form
                  ref={formRef}
                  className="intake-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* Honeypot — hidden from real users, filled by bots */}
                  <input
                    type="text"
                    name="website_hp"
                    tabIndex={-1}
                    aria-hidden="true"
                    autoComplete="off"
                    className="intake-honeypot"
                  />

                  {/* Required fields */}
                  <div className="intake-row intake-row--half">
                    <div className="intake-field">
                      <label className="intake-label mono" htmlFor="company_name">
                        Company / Your Name <span className="intake-req">*</span>
                      </label>
                      <input
                        id="company_name"
                        name="company_name"
                        type="text"
                        className="intake-input"
                        placeholder="Acme Corp or Jane Smith"
                        required
                        autoComplete="organization"
                      />
                    </div>
                    <div className="intake-field">
                      <label className="intake-label mono" htmlFor="contact_email">
                        Contact Email <span className="intake-req">*</span>
                      </label>
                      <input
                        id="contact_email"
                        name="contact_email"
                        type="email"
                        className="intake-input"
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="intake-field">
                    <label className="intake-label mono" htmlFor="help_needed">
                      What do you need help with? <span className="intake-req">*</span>
                    </label>
                    <p className="intake-hint">
                      Describe the problem in as much detail as you can. What is broken, slow,
                      untested, or risky? What would &ldquo;done&rdquo; look like?
                    </p>
                    <textarea
                      id="help_needed"
                      name="help_needed"
                      className="intake-textarea"
                      rows={5}
                      placeholder={
                        "We ship a SaaS product and have no automated tests. Every deploy\n" +
                        "feels risky. We need someone to build a test harness and establish\n" +
                        "a baseline quality signal before our Q3 launch."
                      }
                      required
                    />
                  </div>

                  <div className="intake-field">
                    <label className="intake-label mono" htmlFor="repos_urls">
                      Relevant Repos / URLs
                    </label>
                    <p className="intake-hint">
                      Links to your repository, staging environment, production app, or any docs
                      that help us understand the codebase. We sign an NDA before accessing anything
                      private.
                    </p>
                    <textarea
                      id="repos_urls"
                      name="repos_urls"
                      className="intake-textarea"
                      rows={3}
                      placeholder={"https://github.com/your-org/your-repo\nhttps://staging.yourapp.com"}
                    />
                  </div>

                  <div className="intake-field">
                    <label className="intake-label mono" htmlFor="tech_stack">
                      Tech Stack
                    </label>
                    <input
                      id="tech_stack"
                      name="tech_stack"
                      type="text"
                      className="intake-input"
                      placeholder="Next.js, Postgres, AWS ECS, GitHub Actions"
                    />
                  </div>

                  <div className="intake-row intake-row--half">
                    <div className="intake-field">
                      <label className="intake-label mono" htmlFor="qa_maturity">
                        Current Testing / QA Maturity
                      </label>
                      <div className="intake-select-wrap">
                        <select
                          id="qa_maturity"
                          name="qa_maturity"
                          className="intake-select"
                          defaultValue=""
                        >
                          {QA_MATURITY_OPTIONS.map((o) => (
                            <option key={o} value={o} disabled={o === ""}>
                              {o === "" ? "Select…" : o}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="intake-field">
                      <label className="intake-label mono" htmlFor="timeline">
                        Timeline
                      </label>
                      <div className="intake-select-wrap">
                        <select
                          id="timeline"
                          name="timeline"
                          className="intake-select"
                          defaultValue=""
                        >
                          {TIMELINE_OPTIONS.map((o) => (
                            <option key={o} value={o} disabled={o === ""}>
                              {o === "" ? "Select…" : o}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="intake-field">
                    <label className="intake-label mono" htmlFor="anything_else">
                      Anything Else?
                    </label>
                    <p className="intake-hint">
                      Budget range, team size, constraints, questions, or context that doesn&apos;t fit above.
                    </p>
                    <textarea
                      id="anything_else"
                      name="anything_else"
                      className="intake-textarea"
                      rows={3}
                      placeholder="Team of 4 engineers, ~$5k budget, working in a regulated environment."
                    />
                  </div>

                  {state === "error" && (
                    <div className="intake-error" role="alert">
                      {errorMsg}
                    </div>
                  )}

                  <div className="intake-actions">
                    <button
                      type="submit"
                      className="intake-btn intake-btn--primary"
                      disabled={state === "submitting"}
                    >
                      {state === "submitting" ? "Sending…" : "Send intake"}
                    </button>
                    <span className="intake-actions__note mono">
                      Fields marked <span className="intake-req">*</span> are required
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer wrap mono">
        <div className="footer__line">
          <span>© 2026 Tapesh Nagarwal</span>
          <span className="footer__sep">·</span>
          <span>built by hand · no template</span>
        </div>
        <div className="footer__line">
          <span className="status-pill status-pill--sm">
            <span className="status-pill__dot" />
            <span>all systems normal</span>
          </span>
        </div>
      </footer>
    </>
  );
}
