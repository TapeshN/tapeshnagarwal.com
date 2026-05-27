"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const AGENTS = [
  { id: "route", name: "route", role: "selects the readiness sweep for this target" },
  { id: "check", name: "check", role: "static + policy checks against guardrails" },
  { id: "fetch", name: "fetch", role: "auth-aware fetch of deployed surface" },
  { id: "scan",  name: "scan",  role: "axe-core + interaction probes" },
  { id: "build", name: "build", role: "rolls up verdict + release confidence" },
];

const TARGETS: Record<string, { label: string; auth: string; outcome: "warn" | "pass" | "fail" }> = {
  staging:    { label: "staging.example.com", auth: "session", outcome: "warn" },
  production: { label: "app.example.com",     auth: "sso",     outcome: "pass" },
  preview:    { label: "preview-pr-482.dev",  auth: "none",    outcome: "fail" },
};

type Tag = "info" | "pass" | "warn" | "fail" | "skip";
type AgentState = "run" | "pass" | "warn" | "fail" | "skip";

interface Step {
  agent: string;
  tag: Tag;
  msg: string;
}

function buildScript(targetKey: string): Step[] {
  const t = TARGETS[targetKey];
  const out = t.outcome;
  return [
    { agent: "route", tag: "info", msg: `selecting sweep: <em>release-readiness@v3</em> for ${t.label}` },
    { agent: "route", tag: "pass", msg: "policy bundle resolved · 4 tools registered" },

    { agent: "check", tag: "info", msg: "static guardrails: env vars · secrets · build manifest" },
    { agent: "check",
      tag: out === "fail" ? "fail" : out === "warn" ? "warn" : "pass",
      msg: out === "fail"
        ? "guardrail breach · <em>SECRET_KEY</em> resolved from .env.local"
        : out === "warn"
          ? "1 advisory · unpinned dep <em>lodash@^4</em>"
          : "all guardrails green" },

    { agent: "fetch", tag: "info", msg: `auth shape detected: <em>${t.auth}</em>` },
    { agent: "fetch",
      tag: t.auth === "none" ? "skip" : "pass",
      msg: t.auth === "none" ? "no credentialed walk — anonymous surface only" : "session walk complete · 14 routes captured" },

    { agent: "scan", tag: "info", msg: "running axe-core · interaction probes · contract checks" },
    { agent: "scan",
      tag: out === "fail" ? "fail" : out === "warn" ? "warn" : "pass",
      msg: out === "fail"
        ? "12 a11y violations · 3 serious · contract drift on <em>/api/orders</em>"
        : out === "warn"
          ? "3 a11y advisories · color-contrast on <em>/billing</em>"
          : "no violations · contracts stable" },

    { agent: "build", tag: "info", msg: "rolling up verdict from step returns" },
    { agent: "build",
      tag: out === "fail" ? "fail" : out === "warn" ? "warn" : "pass",
      msg: out === "fail"
        ? "release confidence · 41 / 100 · <em>do not ship</em>"
        : out === "warn"
          ? "release confidence · 78 / 100 · <em>ship with note</em>"
          : "release confidence · 96 / 100 · <em>ready</em>" },
  ];
}

const FINAL_STATE = {
  pass: { score: 96, label: "READY",   className: "ok" },
  warn: { score: 78, label: "WARN",    className: "warn" },
  fail: { score: 41, label: "BLOCKED", className: "fail" },
};

function ts(i: number) {
  return `+${(i * 0.34).toFixed(2)}s`;
}

type LineKind =
  | { kind: "boot"; t: string; m: string }
  | { kind: "line"; t: string; tag: Tag; agent: string; m: string };

export default function AgentDemo() {
  const [target, setTarget] = useState("staging");
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stepIdx, setStepIdx] = useState(-1);
  const [agentStates, setAgentStates] = useState<Record<string, AgentState>>({});
  const [lines, setLines] = useState<LineKind[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const termRef = useRef<HTMLDivElement>(null);

  const script = useMemo(() => buildScript(target), [target]);
  const outcome = TARGETS[target].outcome;
  const final = FINAL_STATE[outcome];

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setRunning(false); setCompleted(false);
    setStepIdx(-1); setAgentStates({}); setLines([]);
  }, []);

  const run = useCallback(() => {
    reset();
    setRunning(true);
    let i = 0;
    const states: Record<string, AgentState> = {};
    const acc: LineKind[] = [{ kind: "boot", t: "boot", m: `tapquality run · target=${TARGETS[target].label}` }];
    setLines([...acc]);

    const tick = () => {
      if (i >= script.length) {
        setRunning(false); setCompleted(true);
        return;
      }
      const step = script[i];
      const next = { ...states };
      if (step.tag === "info") {
        next[step.agent] = "run";
      } else {
        next[step.agent] = step.tag === "skip" ? "skip" : (step.tag as AgentState);
      }
      setAgentStates(next);
      Object.assign(states, next);
      acc.push({ kind: "line", t: ts(i + 1), tag: step.tag, agent: step.agent, m: step.msg });
      setLines([...acc]);
      setStepIdx(i);
      i += 1;
      timerRef.current = setTimeout(tick, step.tag === "info" ? 380 : 520);
    };
    timerRef.current = setTimeout(tick, 200);
  }, [reset, script, target]);

  const handleTargetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTarget(e.target.value);
    reset();
  };

  const verdict = completed
    ? final
    : running
      ? { score: "—", label: "running", className: "" }
      : { score: "—", label: "idle", className: "" };

  return (
    <div className="demo" role="region" aria-label="Interactive agentic pipeline demo">
      <div className="demo__bar">
        <div className="demo__target">
          <span>target</span>
          <select value={target} onChange={handleTargetChange} disabled={running}>
            <option value="staging">staging.example.com</option>
            <option value="production">app.example.com</option>
            <option value="preview">preview-pr-482.dev</option>
          </select>
          <span style={{ opacity: 0.6 }}>·</span>
          <span>auth: {TARGETS[target].auth}</span>
        </div>
        <div className="demo__legend">
          <span><i className="dot" style={{ background: "var(--accent)" }} /> pass</span>
          <span><i className="dot" style={{ background: "var(--warn)" }} /> warn</span>
          <span><i className="dot" style={{ background: "var(--fail)" }} /> fail</span>
          <span><i className="dot" style={{ background: "var(--fg-dim)" }} /> skip</span>
        </div>
        <button
          className="demo__run"
          onClick={running ? undefined : completed ? reset : run}
          disabled={running}
        >
          {running ? "running…" : completed ? "reset" : "▸ run sweep"}
        </button>
      </div>

      <div className="demo__body">
        <aside className="agents" aria-label="Principal agents">
          <h4 className="agents__title">principals</h4>
          {AGENTS.map((a, i) => {
            const s = agentStates[a.id];
            const cls = [
              "agent",
              s === "run" ? "agent--active" : "",
              s && s !== "run" ? "agent--done" : "",
            ].filter(Boolean).join(" ");
            return (
              <div key={a.id} className={cls}>
                <span className="agent__num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <span className="agent__name">{a.name}</span>
                  <span className="agent__role">{a.role}</span>
                </div>
                <span className="agent__state" data-s={s || ""}>{s || "idle"}</span>
              </div>
            );
          })}
        </aside>

        <div className="terminal" ref={termRef}>
          {lines.length === 0 && (
            <div className="terminal__line">
              <span className="terminal__t">—</span>
              <span className="terminal__m" style={{ color: "var(--fg-dim)" }}>
                press <em style={{ color: "var(--accent)", fontStyle: "normal" }}>run sweep</em> to dispatch the principal agents
              </span>
            </div>
          )}
          {lines.map((ln, i) => {
            if (ln.kind === "boot") {
              return (
                <div key={i} className="terminal__line">
                  <span className="terminal__t">{ln.t}</span>
                  <span className="terminal__m" style={{ color: "var(--fg-mute)" }}>{ln.m}</span>
                </div>
              );
            }
            return (
              <div key={i} className="terminal__line">
                <span className="terminal__t">{ln.t}</span>
                <span className="terminal__m">
                  <span className={`terminal__tag terminal__tag--${ln.tag}`}>{ln.tag.toUpperCase()}</span>
                  <span style={{ color: "var(--fg-dim)" }}>[{ln.agent}]</span>{" "}
                  <span dangerouslySetInnerHTML={{ __html: ln.m }} />
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="demo__footer">
        <div className="demo__verdict">
          <span>verdict</span>
          <span className={`demo__score${verdict.className ? ` demo__score--${verdict.className}` : ""}`}>
            {verdict.label}
          </span>
          <span style={{ opacity: 0.6 }}>·</span>
          <span>
            release confidence:{" "}
            <span style={{ color: "var(--fg)" }}>
              {verdict.score}{typeof verdict.score === "number" ? " / 100" : ""}
            </span>
          </span>
        </div>
        <div>steps: {stepIdx + 1} / {script.length}</div>
      </div>
    </div>
  );
}
