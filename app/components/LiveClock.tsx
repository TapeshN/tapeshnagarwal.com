"use client";

import { useEffect, useState } from "react";

function getETTime() {
  return (
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/New_York",
    }).format(new Date()) + " et"
  );
}

export default function LiveClock() {
  const [time, setTime] = useState("—");

  useEffect(() => {
    setTime(getETTime());
    const id = setInterval(() => setTime(getETTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  return <span className="now-card__time">{time}</span>;
}
