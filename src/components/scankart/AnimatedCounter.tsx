/**
 * AnimatedCounter - Smoothly animates number changes
 * Used in dashboard for sales, orders, etc.
 */

import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 800,
  className = "",
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const start = startRef.current;
    const diff = value - start;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      setDisplay(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        startRef.current = value;
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value, duration]);

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}
