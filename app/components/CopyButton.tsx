"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      /* no-op: clipboard API unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button className="pkg__copy" onClick={handleClick} aria-label="Copy install command">
      {copied ? "copied" : "copy"}
    </button>
  );
}
