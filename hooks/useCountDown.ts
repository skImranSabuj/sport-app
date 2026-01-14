import { useEffect, useState } from "react";

export type CountdownState =
  | { type: "upcoming"; label: string; now: any }
  | { type: "live"; label: string; now: any };

function format(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function useCountdown(startTimeISO: string) {
  const startMs = new Date(startTimeISO).getTime();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const diff = startMs - now;

  if (diff <= 0) {
    return { type: "live", label: "LIVE" } as CountdownState;
  }

  return {
    type: "upcoming",
    label: format(diff),
    now,
  } as CountdownState;
}
