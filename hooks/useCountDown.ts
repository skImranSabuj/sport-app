import { useEffect, useState } from "react";

export type CountdownType = "live" | "upcoming";

export type Countdown = {
  label: string;
  type: CountdownType;
  now: number;
};

export function useCountdown(startTimeISO: string): Countdown {
  const startMs = new Date(startTimeISO).getTime();
  const [now, setNow] = useState(() => Date.now());

  /**
   * Smooth shared timer (1 tick per second)
   * Using setInterval is better than RAF for timers
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const diff = startMs - now;

  // ---------------- LIVE ----------------
  if (diff <= 0) {
    return {
      label: "",
      type: "live",
      now,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  // ---------------- > 24 HOURS ----------------
  if (totalHours >= 24) {
    const date = new Date(startMs);
    const label = `${date.getDate()}/${date.getMonth() + 1}`;

    return {
      label,
      type: "upcoming",
      now,
    };
  }

  // ---------------- < 24 HOURS ----------------
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let label = "";

  if (hours > 0) {
    label = `${hours.toString().padStart(2, "0")}h ${minutes
      .toString()
      .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
  } else {
    label = `${minutes.toString().padStart(2, "0")}m ${seconds
      .toString()
      .padStart(2, "0")}s`;
  }

  return {
    label,
    type: "upcoming",
    now,
  };
}
