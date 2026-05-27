import ThemeToggle from "./components/ThemeToggle";
import LiveClock from "./components/LiveClock";
import CopyButton from "./components/CopyButton";
import AgentDemo from "./components/AgentDemo";
import IframeEmbed from "./components/IframeEmbed";

export default function Home() {
  return (
    <>
      {/* ─── Top bar ───────────────────────────────────────── */}
      <header className="topbar">
        <div className="wrap topbar__inner">
          <a className="brand" href="#top">
            <span className="brand__dot" aria-hidden="true" />
            <span className="brand__name">Tapesh Nagarwal</span>
            <span className="brand__meta mono">/ swe</span>
          </a>
          <nav className="nav mono">
            <a href="#now">now</a>
            <a href="#work">work</a>
            <a href="#playground">playground</a>
            <a href="#stack">stack</a>
            <a href="#contact">contact</a>
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
              <span>available for senior IC roles · ai infra</span>
            </span>
            <span className="hero__loc">sayreville, nj &nbsp;·&nbsp; et</span>
          </div>

          <h1 className="hero__title">
            Shipping <span className="serif italic">agentic systems</span> that work in production.
          </h1>

          <p className="hero__lede">
            Seven years building reliable distributed systems and release infrastructure.
            Now architecting an outer/inner-loop multi-agent platform on the Anthropic MCP protocol —
            with the boring rigor (typed pipelines, deterministic guardrails, observable rollouts) that
            keeps AI from being a demo.
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
            <span className="section__meta mono">updated · live</span>
          </header>

          <div className="now-grid">
            <article className="now-card">
              <div className="now-card__head mono">
                <span className="now-card__tag">building</span>
                <LiveClock />
              </div>
              <h3 className="now-card__title">TapQuality.ai</h3>
              <p className="now-card__body">
                Multi-agent orchestration for release readiness. Outer-loop principals
                (Route · Check · Fetch · Scan · Build) govern policy and learn across
                engagements; inner-loop execution agents run inside client projects.
                Step-based pipeline with typed status returns and roll-up resolution.
              </p>
              <ul className="now-card__list mono">
                <li><span>stack</span>typescript · node · mcp · chromadb → pgvector</li>
                <li><span>shape</span>outer-loop governance · inner-loop execution</li>
                <li><span>stage</span>private alpha</li>
              </ul>
            </article>

            <article className="now-card">
              <div className="now-card__head mono">
                <span className="now-card__tag">shipping</span>
                <span className="now-card__time">v0.5.x</span>
              </div>
              <h3 className="now-card__title">@qulib/mcp</h3>
              <p className="now-card__body">
                An open-source MCP server that answers a single question:{" "}
                <em>is this ready to ship?</em>{" "}
                Four tools — <span className="mono">analyze_app</span>,{" "}
                <span className="mono">explore_auth</span>,{" "}
                <span className="mono">detect_auth</span>,{" "}
                <span className="mono">qulib_score_automation</span> —
                with auth-aware scanning and a deterministic release-confidence score.
              </p>
              <ul className="now-card__list mono">
                <li><span>license</span>mit</li>
                <li><span>runtime</span>node · stdio mcp transport</li>
                <li><span>install</span>npm i @qulib/mcp</li>
              </ul>
            </article>

            <article className="now-card">
              <div className="now-card__head mono">
                <span className="now-card__tag">teaching</span>
                <span className="now-card__time">live</span>
              </div>
              <h3 className="now-card__title">NotQuality.com</h3>
              <p className="now-card__body">
                A LeetCode-style platform for QA engineers — a deliberately broken app
                with 48 documented bugs across UI, API, events, accessibility, performance,
                and mobile. Dual auth, challenge engine, severity-weighted scoring.
              </p>
              <ul className="now-card__list mono">
                <li><span>labs</span>9 playgrounds · 48 intentional defects</li>
                <li><span>infra</span>vercel · neon postgres</li>
                <li><span>cohort</span>open enrollment</li>
              </ul>
            </article>
          </div>
        </section>

        {/* ─── Playground ───────────────────────────────────── */}
        <section id="playground" className="section wrap">
          <header className="section__head">
            <span className="section__num mono">02</span>
            <h2 className="section__title">Playground</h2>
            <span className="section__rule" />
            <span className="section__meta mono">live demo · agentic pipeline</span>
          </header>

          <p className="section__lede">
            Below is a runnable model of the orchestration layer I&apos;m building —
            five principal agents executing a release-readiness sweep against a
            target deployment. Press <span className="mono">run</span> to dispatch.
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

          {/* Project 1: TapQuality */}
          <article className="project">
            <header className="project__head">
              <div className="project__title-row">
                <h3 className="project__title">TapQuality.ai</h3>
                <span className="project__kind mono">/ agentic orchestration platform</span>
              </div>
              <a className="project__cta mono" href="https://tapquality.ai" target="_blank" rel="noopener noreferrer">
                visit ↗
              </a>
            </header>

            <div className="project__body">
              <IframeEmbed
                src="https://tapquality.ai"
                title="TapQuality.ai"
                chromeUrl="tapquality.ai"
                chromeStatus="live"
              />

              <aside className="project__meta">
                <p className="project__lede">
                  An outer/inner-loop multi-agent system. Principal agents govern, learn,
                  and orchestrate; deployable execution agents run inside client projects
                  with a polymorphic config that overrides skills per engagement.
                </p>
                <ul className="project__bullets">
                  <li>Step-based pipeline with typed <span className="mono">PASS / WARN / FAIL / SKIP</span> returns and roll-up resolution.</li>
                  <li>Machine-readable guardrails driving both agent rules and shell scripts.</li>
                  <li>File-based and MCP-based handoff bridge connecting Claude Code and Cursor sessions.</li>
                  <li>RAG layer (ChromaDB → pgvector) for cross-engagement pattern learning.</li>
                </ul>
                <dl className="project__specs mono">
                  <div><dt>stack</dt><dd>ts · node · mcp · chromadb · pgvector</dd></div>
                  <div><dt>role</dt><dd>founder / principal engineer</dd></div>
                  <div><dt>stage</dt><dd>private alpha</dd></div>
                </dl>
              </aside>
            </div>
          </article>

          {/* Project 2: @qulib/mcp */}
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
                      <span className="badge">v0.5.x</span>
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
                      <span className="pkg__tool-desc">weighted release-confidence score with diagnostic breakdown.</span>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="project__meta">
                <p className="project__lede">
                  A deterministic quality layer that AI agents can call. The point isn&apos;t
                  &quot;let the LLM judge&quot; — it&apos;s giving the agent four sharp, reproducible
                  checks and letting it reason over real signal.
                </p>
                <ul className="project__bullets">
                  <li>Auth-aware scanning with bounded session walks.</li>
                  <li>axe-core accessibility checks rolled into the readiness score.</li>
                  <li>Release confidence as a single number plus a structured &quot;why&quot;.</li>
                  <li>MIT licensed, currently shipping v0.5.x.</li>
                </ul>
                <dl className="project__specs mono">
                  <div><dt>stack</dt><dd>ts · node · mcp · axe-core</dd></div>
                  <div><dt>role</dt><dd>author / maintainer</dd></div>
                  <div><dt>license</dt><dd>mit</dd></div>
                </dl>
              </aside>
            </div>
          </article>

          {/* Project 3: NotQuality */}
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
              <IframeEmbed
                src="https://notquality.com"
                title="NotQuality.com"
                chromeUrl="notquality.com"
                chromeStatus="live"
              />

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
                <li>Agentic Orchestration</li>
                <li>Multi-Agent Architecture</li>
                <li>Prompt Engineering</li>
                <li>RAG · ChromaDB · pgvector</li>
                <li>Cursor</li>
                <li>AgentOps</li>
                <li>LLM Evaluation</li>
              </ul>
            </div>
            <div className="stack-col">
              <h4 className="stack-col__head mono">languages</h4>
              <ul className="stack-col__list">
                <li>TypeScript</li>
                <li>JavaScript</li>
                <li>Python</li>
                <li>Java</li>
                <li>SQL</li>
              </ul>
            </div>
            <div className="stack-col">
              <h4 className="stack-col__head mono">backend</h4>
              <ul className="stack-col__list">
                <li>Node.js</li>
                <li>Spring Boot</li>
                <li>GraphQL</li>
                <li>REST</li>
                <li>gRPC</li>
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
                <li>Docker</li>
                <li>Kubernetes (EKS)</li>
                <li>GCP</li>
                <li>Jenkins</li>
                <li>Vercel</li>
                <li>Neon Postgres</li>
              </ul>
            </div>
            <div className="stack-col">
              <h4 className="stack-col__head mono">reliability</h4>
              <ul className="stack-col__list">
                <li>DataDog</li>
                <li>Cypress</li>
                <li>JMeter</li>
                <li>REST-Assured</li>
                <li>Selenium</li>
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
              <a className="contact__row" href="tel:+17326685408">
                <span className="contact__k">phone</span>
                <span className="contact__v">+1 (732) 668-5408</span>
                <span className="contact__arrow">↗</span>
              </a>
              <div className="contact__row contact__row--static">
                <span className="contact__k">based</span>
                <span className="contact__v">Sayreville, NJ · Eastern Time</span>
                <span className="contact__arrow" />
              </div>
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
