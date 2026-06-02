"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const AGENTS = [
  { id: "route", name: "route", role: "selects the readiness sweep for this target" },
  { id: "check", name: "check", role: "transport + security-header audit" },
  { id: "fetch", name: "fetch", role: "live fetch of the deployed surface" },
  { id: "scan",  name: "scan",  role: "a11y + seo signals parsed from the page" },
  { id: "build", name: "build", role: "rolls up verdict + release confidence" },
];

const TARGET = "notquality.com";

type Tag = "info" | "pass" | "warn" | "fail" | "skip";
type AgentState = "run" | "pass" | "warn" | "fail" | "skip";

interface Step {
  agent: string;
  tag: Tag;
  msg: string;
}

interface SweepResult {
  target: string;
  finalUrl: string;
  latencyMs?: number;
  steps: Step[];
  verdict: { score: number; label: string; className: string };
}

type LineKind =
  | { kind: "boot"; t: string; m: string }
  | { kind: "line"; t: string; tag: Tag; agent: string; m: string };

function ts(i: number) {
  return `+${(i * 0.34).toFixed(2)}s`;
}

export default function AgentDemo() {
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stepIdx, setStepIdx] = useState(-1);
  const [total, setTotal] = useState(0);
  const [agentStates, setAgentStates] = useState<Record<string, AgentState>>({});
  const [lines, setLines] = useState<LineKind[]>([]);
  const [verdict, setVerdict] = useState<SweepResult["verdict"] | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setRunning(false); setCompleted(false);
    setStepIdx(-1); setTotal(0); setAgentStates({}); setLines([]); setVerdict(null);
  }, []);

  const animate = useCallback((steps: Step[], finalVerdict: SweepResult["verdict"]) => {
    setTotal(steps.length);
    const states: Record<string, AgentState> = {};
    let i = 0;
    const tick = () => {
      if (i >= steps.length) {
        setRunning(false);
        setCompleted(true);
        setVerdict(finalVerdict);
        return;
      }
      const step = steps[i];
      states[step.agent] = step.tag === "info" ? "run" : (step.tag as AgentState);
      setAgentStates({ ...states });
      setLines((prev) => [...prev, { kind: "line", t: ts(i + 1), tag: step.tag, agent: step.agent, m: step.msg }]);
      setStepIdx(i);
      i += 1;
      timerRef.current = setTimeout(tick, step.tag === "info" ? 360 : 520);
    };
    timerRef.current = setTimeout(tick, 220);
  }, []);

  const run = useCallback(async () => {
    reset();
    setRunning(true);
    setLines([{ kind: "boot", t: "boot", m: `live sweep · dispatching to ${TARGET}` }]);

    try {
      const res = await fetch(`/api/sweep?target=${encodeURIComponent(TARGET)}`, { cache: "no-store" });
      const data: SweepResult & { error?: string } = await res.json();
      if (!res.ok || !data.steps) {
        throw new Error(data.error || `sweep failed (HTTP ${res.status})`);
      }
      setLines((prev) => [...prev, { kind: "boot", t: "ok", m: `connected · ${data.finalUrl}` }]);
      animate(data.steps, data.verdict);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "sweep failed";
      setLines((prev) => [...prev, { kind: "line", t: ts(1), tag: "fail", agent: "route", m: `dispatch error · ${msg}` }]);
      setRunning(false);
      setCompleted(true);
      setVerdict({ score: 0, label: "ERROR", className: "fail" });
    }
  }, [reset, animate]);

  const view = completed && verdict
    ? verdict
    : running
      ? { score: "—" as const, label: "running", className: "" }
      : { score: "—" as const, label: "idle", className: "" };

  return (
    <div className="demo" role="region" aria-label="Interactive agentic pipeline demo">
      <div className="demo__bar">
        <div className="demo__target">
          <span>target</span>
          <span style={{ color: "var(--fg)" }}>{TARGET}</span>
          <span style={{ opacity: 0.6 }}>·</span>
          <span className="status-pill status-pill--sm">
            <span className="status-pill__dot" />
            <span>live</span>
          </span>
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
          {running ? "running…" : completed ? "reset" : "▸ run live sweep"}
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
                press <em style={{ color: "var(--accent)", fontStyle: "normal" }}>run live sweep</em> to probe {TARGET} for real
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
          <span className={`demo__score${view.className ? ` demo__score--${view.className}` : ""}`}>
            {view.label}
          </span>
          <span style={{ opacity: 0.6 }}>·</span>
          <span>
            release confidence:{" "}
            <span style={{ color: "var(--fg)" }}>
              {view.score}{typeof view.score === "number" ? " / 100" : ""}
            </span>
          </span>
        </div>
        <div>steps: {stepIdx + 1} / {total || AGENTS.length * 2 + 1}</div>
      </div>
    </div>
  );
}
