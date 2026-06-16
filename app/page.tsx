import ThemeToggle from "./components/ThemeToggle";
import LiveClock from "./components/LiveClock";
import CopyButton from "./components/CopyButton";
import AgentDemo from "./components/AgentDemo";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* ─── Top bar ───────────────────────────────────────── */}
      <header className="topbar">
        <div className="wrap topbar__inner">
          <a className="brand" href="#top">
            <span className="brand__dot" aria-hidden="true" />
            <span className="brand__name">Tapesh Nagarwal</span>
            <span className="brand__meta mono">/ qa-sdet-aie</span>
          </a>
          <nav className="nav mono">
            <a href="#now">now</a>
            <a href="#work">work</a>
            <a href="#playground">playground</a>
            <a href="#stack">stack</a>
            <a href="#contact">contact</a>
            <a href="/intake" className="nav__cta">hire me</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main id="top">

        {/* ─── Hero ─────────────────────────────────────────── */}
        <section className="hero wrap">
          <div className="hero__meta mono">
            <span className="status-pill">
              <span className="status-pill__dot" />
              <span>senior specialist · quality engineer</span>
            </span>
            <span className="hero__loc">sayreville, nj &nbsp;·&nbsp; et</span>
          </div>

          <h1 className="hero__title">
            Shipping <span className="serif italic">agentic systems</span> that work in production.
          </h1>

          <p className="hero__lede">
            Seven years building reliable distributed systems, automation frameworks, and
            release infrastructure. Now building MCP-based agent orchestration for release
            readiness — with typed pipelines, deterministic guardrails, and observable
            rollouts that keep AI from being just another demo.
          </p>

          <div className="hero__quick mono">
            <a className="chip" href="https://github.com/TapeshN" target="_blank" rel="noopener noreferrer">
              <span className="chip__k">gh</span><span className="chip__v">TapeshN</span>
            </a>
            <a className="chip" href="https://www.linkedin.com/in/tapesh-nagarwal/" target="_blank" rel="noopener noreferrer">
              <span className="chip__k">in</span><span className="chip__v">tapesh-nagarwal</span>
            </a>
            <a className="chip" href="https://www.npmjs.com/package/@qulib/mcp" target="_blank" rel="noopener noreferrer">
              <span className="chip__k">npm</span><span className="chip__v">@qulib/mcp</span>
            </a>
            <a className="chip" href="mailto:tapeshnagarwal@gmail.com">
              <span className="chip__k">@</span><span className="chip__v">tapeshnagarwal</span>
            </a>
          </div>
        </section>

        {/* ─── Now ──────────────────────────────────────────── */}
        <section id="now" className="section wrap">
          <header className="section__head">
            <span className="section__num mono">01</span>
            <h2 className="section__title">Now</h2>
            <span className="section__rule" />
            <span className="section__meta mono"><LiveClock /></span>
          </header>

          <p className="section__lede">
            Three things in flight right now — full detail on each lives in{" "}
            <a href="#work">selected work</a> below.
          </p>

          <div className="now-focus">
            <a className="now-focus__item" href="https://www.npmjs.com/package/@qulib/mcp" target="_blank" rel="noopener noreferrer">
              <span className="now-focus__tag mono">shipping</span>
              <span className="now-focus__title">@qulib/mcp</span>
              <span className="now-focus__note">
                Open-source MCP that answers one question — &quot;is this ready to ship?&quot; — with
                seven deterministic readiness checks an agent can call.
              </span>
              <span className="now-focus__meta mono">v0.10.0 · npm · mit</span>
            </a>

            <a className="now-focus__item" href="https://notquality.com" target="_blank" rel="noopener noreferrer">
              <span className="now-focus__tag mono">teaching</span>
              <span className="now-focus__title">NotQuality.com</span>
              <span className="now-focus__note">
                A LeetCode for QA — a deliberately broken app with 48 documented bugs and a
                severity-weighted challenge engine.
              </span>
              <span className="now-focus__meta mono">live · 9 labs · vercel + neon</span>
            </a>

            <a className="now-focus__item" href="https://github.com/TapeshN/strata" target="_blank" rel="noopener noreferrer">
              <span className="now-focus__tag mono">writing</span>
              <span className="now-focus__title">Strata</span>
              <span className="now-focus__note">
                A self-populating journal the agents write as they work — the public field notes
                behind the systems I build.
              </span>
              <span className="now-focus__meta mono">public · 9 layers · 20+ entries</span>
            </a>
          </div>
        </section>

        {/* ─── Playground ───────────────────────────────────── */}
        <section id="playground" className="section wrap">
          <header className="section__head">
            <span className="section__num mono">02</span>
            <h2 className="section__title">Playground</h2>
            <span className="section__rule" />
            <span className="section__meta mono">live sweep · real target</span>
          </header>

          <p className="section__lede">
            Not a mockup. Outer-loop principal agents — Route, Check, Fetch, Scan, and Build —
            govern policy and learning while inner-loop execution agents run inside project
            workflows. Press <span className="mono">run</span> and those five principals
            execute a real release-readiness sweep against the live{" "}
            <a href="https://notquality.com" target="_blank" rel="noopener noreferrer">notquality.com</a>{" "}
            deployment: an actual HTTP fetch, a transport + security-header audit, and a11y/seo
            signals parsed from the page — rolled up into a release-confidence score you can verify yourself.
          </p>

          <AgentDemo />
        </section>

        {/* ─── Selected work ────────────────────────────────── */}
        <section id="work" className="section wrap">
          <header className="section__head">
            <span className="section__num mono">03</span>
            <h2 className="section__title">Selected work</h2>
            <span className="section__rule" />
            <span className="section__meta mono">3 projects</span>
          </header>

          {/* Project 1: NotQuality */}
          <article className="project">
            <header className="project__head">
              <div className="project__title-row">
                <h3 className="project__title">NotQuality.com</h3>
                <span className="project__kind mono">/ qa training platform</span>
              </div>
              <a className="project__cta mono" href="https://notquality.com" target="_blank" rel="noopener noreferrer">
                visit ↗
              </a>
            </header>

            <div className="project__body">
              <div className="project__embed">
                <div className="embed-chrome mono">
                  <span className="embed-chrome__dots"><i /><i /><i /></span>
                  <span className="embed-chrome__url">notquality.com</span>
                  <span className="embed-chrome__status"><span className="dot dot--ok" /> live</span>
                </div>
                <a
                  className="embed-shot"
                  href="https://notquality.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open notquality.com in a new tab"
                >
                  <Image
                    src="/notquality-preview.png"
                    alt="notquality.com homepage — a QA training platform with playground labs and scored bug-hunt challenges"
                    fill
                    sizes="(max-width: 920px) 100vw, 60vw"
                    className="embed-shot__img"
                  />
                </a>
              </div>

              <aside className="project__meta">
                <p className="project__lede">
                  A LeetCode for QA. Nine playground labs built on top of a deliberately
                  broken application — 48 documented intentional bugs across UI, API,
                  events, accessibility, performance, and mobile.
                </p>
                <ul className="project__bullets">
                  <li>Dual auth system separating learner accounts from instructor scoring.</li>
                  <li>Challenge engine with deterministic verdicts and severity-weighted scoring.</li>
                  <li>Bug catalog covers the failure modes most QA interviews never test for.</li>
                  <li>Shipping on Vercel + Neon Postgres.</li>
                </ul>
                <dl className="project__specs mono">
                  <div><dt>stack</dt><dd>next · neon postgres · vercel</dd></div>
                  <div><dt>role</dt><dd>founder / engineer</dd></div>
                  <div><dt>users</dt><dd>open enrollment</dd></div>
                </dl>
              </aside>
            </div>
          </article>

          {/* Project 2: Strata */}
          <article className="project">
            <header className="project__head">
              <div className="project__title-row">
                <h3 className="project__title">Strata</h3>
                <span className="project__kind mono">/ public agent-learning journal</span>
              </div>
              <a className="project__cta mono" href="https://github.com/TapeshN/strata" target="_blank" rel="noopener noreferrer">
                read on github ↗
              </a>
            </header>

            <div className="project__body">
              <div className="project__embed project__embed--card">
                <div className="embed-chrome mono">
                  <span className="embed-chrome__dots"><i /><i /><i /></span>
                  <span className="embed-chrome__url">github.com / TapeshN / strata</span>
                  <span className="embed-chrome__status"><span className="dot dot--ok" /> public</span>
                </div>

                <div className="notes">
                  <p className="notes__lede mono">field notes the agents deposited about their own work —</p>

                  <a className="note" href="https://github.com/TapeshN/strata/blob/main/guardrails/a-passing-suite-is-not-a-correct-one.md" target="_blank" rel="noopener noreferrer">
                    <div className="note__head mono">
                      <span className="note__cat">guardrails</span>
                      <span className="note__conf">learned</span>
                      <span className="note__src">↗</span>
                    </div>
                    <h4 className="note__title">A passing test suite is not a correct one</h4>
                    <p className="note__body">
                      An adversarial verify stage caught a false positive the builder&apos;s own
                      suite missed — its tests only proved the gate fired when it should, never
                      that it stayed quiet when it shouldn&apos;t. A green suite means &quot;the cases
                      I wrote pass,&quot; not &quot;the code is correct.&quot;
                    </p>
                  </a>

                  <a className="note" href="https://github.com/TapeshN/strata/blob/main/guardrails/gates-never-run-are-fiction.md" target="_blank" rel="noopener noreferrer">
                    <div className="note__head mono">
                      <span className="note__cat">guardrails</span>
                      <span className="note__conf">learned</span>
                      <span className="note__src">↗</span>
                    </div>
                    <h4 className="note__title">Gates that are never run are fiction</h4>
                    <p className="note__body">
                      A release sat &quot;blocked&quot; for a session on a buggy proxy count nobody
                      verified; meanwhile the real gate had never run green from a clean
                      checkout. A gate with no CI behind it is worse than no gate — it
                      manufactures false confidence.
                    </p>
                  </a>

                  <a className="note" href="https://github.com/TapeshN/strata/blob/main/skills/2026-05-30-classifier-blocks-self-modification-writes.md" target="_blank" rel="noopener noreferrer">
                    <div className="note__head mono">
                      <span className="note__cat">skills</span>
                      <span className="note__conf">learned</span>
                      <span className="note__src">↗</span>
                    </div>
                    <h4 className="note__title">Self-modification writes are gated at the tool layer</h4>
                    <p className="note__body">
                      An agent can&apos;t edit its own config, commands, or skills just because
                      the conversation approved it — that class is blocked at the tool layer,
                      independent of any spoken consent. Defense-in-depth on self-controlling
                      files is correct, not a bug.
                    </p>
                  </a>

                  <a className="note" href="https://github.com/TapeshN/strata/blob/main/infra/the-control-plane-must-govern-itself.md" target="_blank" rel="noopener noreferrer">
                    <div className="note__head mono">
                      <span className="note__cat">infra</span>
                      <span className="note__conf">learned</span>
                      <span className="note__src">↗</span>
                    </div>
                    <h4 className="note__title">The control plane has to govern itself</h4>
                    <p className="note__body">
                      The machinery that enforces discipline kept failing its own standards —
                      docs that only grew, a monitor that warned forever, a gate that over-fired.
                      The same compaction, honest-measurement, and precision-scoping rules apply
                      to the tooling, not just the work.
                    </p>
                  </a>

                  <a className="notes__more mono" href="https://github.com/TapeshN/strata" target="_blank" rel="noopener noreferrer">
                    + more across 9 layers — read the full journal ↗
                  </a>
                </div>
              </div>

              <aside className="project__meta">
                <p className="project__lede">
                  A self-populating journal the agents write to themselves. When a pattern
                  proves out or a guardrail saves a run, an agent deposits a structured,
                  IP-clean note — a public cross-section of how a governed agentic org
                  assembles itself, layer by layer.
                </p>
                <ul className="project__bullets">
                  <li>Written by the agents at natural moments — wave completions, pattern discoveries, guardrail events.</li>
                  <li>Every entry declares its confidence honestly: <span className="mono">learned · hypothesis · speculation</span>.</li>
                  <li>No prompts, no client data, no implementation code — derivable from first principles.</li>
                  <li>Seed corpus for the retrieval layer: frontmatter becomes embedding metadata.</li>
                </ul>
                <dl className="project__specs mono">
                  <div><dt>shape</dt><dd>9 layers · markdown + frontmatter</dd></div>
                  <div><dt>author</dt><dd>the agents · via /deposit</dd></div>
                  <div><dt>access</dt><dd>public · readable by anyone</dd></div>
                </dl>
              </aside>
            </div>
          </article>

          {/* Project 3: @qulib/mcp */}
          <article className="project">
            <header className="project__head">
              <div className="project__title-row">
                <h3 className="project__title">@qulib/mcp</h3>
                <span className="project__kind mono">/ open-source mcp server</span>
              </div>
              <a className="project__cta mono" href="https://www.npmjs.com/package/@qulib/mcp" target="_blank" rel="noopener noreferrer">
                view on npm ↗
              </a>
            </header>

            <div className="project__body">
              <div className="project__embed project__embed--card">
                <div className="embed-chrome mono">
                  <span className="embed-chrome__dots"><i /><i /><i /></span>
                  <span className="embed-chrome__url">npmjs.com / @qulib / mcp</span>
                  <span className="embed-chrome__status"><span className="dot dot--ok" /> published</span>
                </div>

                <div className="pkg">
                  <div className="pkg__top">
                    <div>
                      <h4 className="pkg__name">@qulib/mcp</h4>
                      <p className="pkg__tag mono">&quot;is this ready to ship?&quot; — for deployed web apps</p>
                    </div>
                    <div className="pkg__badges mono">
                      <span className="badge">v0.10.0</span>
                      <span className="badge">MIT</span>
                      <span className="badge badge--accent">mcp · stdio</span>
                    </div>
                  </div>

                  <div className="pkg__install mono">
                    <span className="pkg__prompt">$</span> npm install @qulib/mcp
                    <CopyButton text="npm install @qulib/mcp" />
                  </div>

                  <div className="pkg__tools">
                    <div className="pkg__tool">
                      <span className="pkg__tool-name mono">qulib_score_confidence</span>
                      <span className="pkg__tool-desc">flagship — fuses every signal into one verdict: ship / caution / hold / block, with a 0–100 confidence score.</span>
                    </div>
                    <div className="pkg__tool">
                      <span className="pkg__tool-name mono">analyze_app</span>
                      <span className="pkg__tool-desc">crawls the deployed surface, returns a structured readiness report.</span>
                    </div>
                    <div className="pkg__tool">
                      <span className="pkg__tool-name mono">explore_auth</span>
                      <span className="pkg__tool-desc">walks login flows under bounded credentials, with redirect tracing.</span>
                    </div>
                    <div className="pkg__tool">
                      <span className="pkg__tool-name mono">detect_auth</span>
                      <span className="pkg__tool-desc">passive detection of auth shape — sso, jwt, session cookie, etc.</span>
                    </div>
                    <div className="pkg__tool">
                      <span className="pkg__tool-name mono">qulib_score_automation</span>
                      <span className="pkg__tool-desc">scores a repo&apos;s test-automation maturity across weighted dimensions.</span>
                    </div>
                    <div className="pkg__tool">
                      <span className="pkg__tool-name mono">qulib_score_api</span>
                      <span className="pkg__tool-desc">discovers API endpoints and scores their test coverage.</span>
                    </div>
                    <div className="pkg__tool">
                      <span className="pkg__tool-name mono">qulib_scaffold_tests</span>
                      <span className="pkg__tool-desc">generates a ready-to-run Cypress scaffold from a deployed URL.</span>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="project__meta">
                <p className="project__lede">
                  A deterministic quality layer that AI agents can call. The point isn&apos;t
                  &quot;let the LLM judge&quot; — it&apos;s giving the agent seven sharp, reproducible
                  checks and letting it reason over real signal.
                </p>
                <ul className="project__bullets">
                  <li>Auth-aware scanning with bounded session walks.</li>
                  <li>axe-core accessibility checks rolled into the readiness score.</li>
                  <li>Release confidence as a single number plus a structured &quot;why&quot;.</li>
                  <li>MIT licensed, currently shipping v0.10.0.</li>
                </ul>
                <dl className="project__specs mono">
                  <div><dt>stack</dt><dd>ts · node · mcp · axe-core</dd></div>
                  <div><dt>role</dt><dd>author / maintainer</dd></div>
                  <div><dt>license</dt><dd>mit</dd></div>
                </dl>
              </aside>
            </div>
          </article>
        </section>

        {/* ─── Stack ────────────────────────────────────────── */}
        <section id="stack" className="section wrap">
          <header className="section__head">
            <span className="section__num mono">04</span>
            <h2 className="section__title">Stack</h2>
            <span className="section__rule" />
            <span className="section__meta mono">what i reach for</span>
          </header>

          <div className="stack-grid">
            <div className="stack-col">
              <h4 className="stack-col__head mono">ai &amp; agents</h4>
              <ul className="stack-col__list">
                <li>Claude</li>
                <li>MCP Protocol</li>
                <li>Multi-Agent Architecture</li>
                <li>Agentic Orchestration</li>
                <li>RAG · ChromaDB · pgvector</li>
                <li>Agent instruction design</li>
                <li>LLM Evaluation</li>
                <li>AgentOps</li>
                <li>Cursor</li>
              </ul>
            </div>
            <div className="stack-col">
              <h4 className="stack-col__head mono">languages</h4>
              <ul className="stack-col__list">
                <li>Python</li>
                <li>TypeScript</li>
                <li>Java</li>
                <li>JavaScript</li>
                <li>SQL</li>
              </ul>
            </div>
            <div className="stack-col">
              <h4 className="stack-col__head mono">backend</h4>
              <ul className="stack-col__list">
                <li>Node.js</li>
                <li>Spring Boot</li>
                <li>REST</li>
                <li>GraphQL</li>
                <li>gRPC</li>
                <li>ETL</li>
              </ul>
            </div>
            <div className="stack-col">
              <h4 className="stack-col__head mono">frontend</h4>
              <ul className="stack-col__list">
                <li>React</li>
                <li>TypeScript</li>
              </ul>
            </div>
            <div className="stack-col">
              <h4 className="stack-col__head mono">cloud &amp; infra</h4>
              <ul className="stack-col__list">
                <li>AWS</li>
                <li>Kubernetes (EKS)</li>
                <li>Docker</li>
                <li>GCP</li>
                <li>Vercel</li>
                <li>Jenkins</li>
                <li>Neon Postgres</li>
              </ul>
            </div>
            <div className="stack-col">
              <h4 className="stack-col__head mono">reliability</h4>
              <ul className="stack-col__list">
                <li>Selenium</li>
                <li>Cypress</li>
                <li>DataDog</li>
                <li>JMeter</li>
                <li>REST-Assured</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Contact ──────────────────────────────────────── */}
        <section id="contact" className="section wrap">
          <header className="section__head">
            <span className="section__num mono">05</span>
            <h2 className="section__title">Contact</h2>
            <span className="section__rule" />
            <span className="section__meta mono">open inbox</span>
          </header>

          <div className="contact">
            <p className="contact__pitch">
              Working on AI infrastructure, agentic platforms, or release-engineering at scale?{" "}
              <span className="serif italic">Send a note.</span>{" "}
              I reply to most things within a day.
            </p>

            <div className="contact__grid mono">
              <a className="contact__row" href="mailto:tapeshnagarwal@gmail.com">
                <span className="contact__k">email</span>
                <span className="contact__v">tapeshnagarwal@gmail.com</span>
                <span className="contact__arrow">↗</span>
              </a>
              <a className="contact__row" href="https://github.com/TapeshN" target="_blank" rel="noopener noreferrer">
                <span className="contact__k">github</span>
                <span className="contact__v">github.com/TapeshN</span>
                <span className="contact__arrow">↗</span>
              </a>
              <a className="contact__row" href="https://www.linkedin.com/in/tapesh-nagarwal/" target="_blank" rel="noopener noreferrer">
                <span className="contact__k">linkedin</span>
                <span className="contact__v">in/tapesh-nagarwal</span>
                <span className="contact__arrow">↗</span>
              </a>
              <a className="contact__row" href="https://www.npmjs.com/package/@qulib/mcp" target="_blank" rel="noopener noreferrer">
                <span className="contact__k">npm</span>
                <span className="contact__v">npmjs.com/package/@qulib/mcp</span>
                <span className="contact__arrow">↗</span>
              </a>
              <div className="contact__row contact__row--static">
                <span className="contact__k">based</span>
                <span className="contact__v">Sayreville, NJ · Eastern Time</span>
                <span className="contact__arrow" />
              </div>
            </div>

            <div className="contact__intake">
              <p className="contact__intake-lede">
                Looking to hire? Skip the back-and-forth.
              </p>
              <a className="intake-cta-btn mono" href="/intake">
                start an engagement ↗
              </a>
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
