"use client";

import { useEffect, useRef, useState } from "react";

interface IframeEmbedProps {
  src: string;
  title: string;
  chromeUrl: string;
  chromeStatus: string;
}

export default function IframeEmbed({ src, title, chromeUrl, chromeStatus }: IframeEmbedProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState((s) => (s === "loading" ? "failed" : s));
    }, 6000);
    return () => clearTimeout(timeout);
  }, []);

  const handleLoad = () => setState("loaded");

  return (
    <div
      ref={wrapRef}
      className={`project__embed${state === "loaded" ? " is-loaded" : ""}${state === "failed" ? " is-failed" : ""}`}
    >
      <div className="embed-chrome mono">
        <span className="embed-chrome__dots">
          <i /><i /><i />
        </span>
        <span className="embed-chrome__url">{chromeUrl}</span>
        <span className="embed-chrome__status">
          <span className="dot dot--ok" /> {chromeStatus}
        </span>
      </div>
      <iframe
        className="embed-frame"
        src={src}
        loading="lazy"
        title={title}
        onLoad={handleLoad}
      />
      <div className="embed-fallback" aria-hidden="true">
        <span className="mono">preview unavailable — visit ↗</span>
      </div>
    </div>
  );
}
