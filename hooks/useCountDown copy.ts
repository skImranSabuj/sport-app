import { useEffect, useState } from "react";

// Optional: type of countdown
export type Countdown = {
  label: string;
  now: number;
  type: "live" | "upcoming";
};

// Hook: optimized countdown for multiple cards
export function useCountdown(targetTimeISO: string): Countdown {
  const targetTime = new Date(targetTimeISO).getTime();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let animationFrame: number;

    const tick = () => {
      setNow(Date.now());
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const diff = targetTime - now;
  const isLive = diff <= 0;

  // Format countdown label
  let label: string;
  if (isLive) {
    label = "LIVE";
  } else {
    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    label =
      hours > 0
        ? `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        : `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
  }

  return {
    label,
    now,
    type: isLive ? "live" : "upcoming",
  };
}
