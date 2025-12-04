"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme-context";

export function MonsterCursor() {
  const { theme } = useTheme();
  const isUpsideDown = theme === "upside-down";
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Check if fancy cursor should be enabled
  const enableFancyCursor = !prefersReducedMotion && isUpsideDown;

  useEffect(() => {
    if (!enableFancyCursor) {
      return;
    }

    const handleMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], .cursor-glow, [data-interactive]"
    );
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Smooth cursor movement with minimal lag
    let frame: number;
    const loop = () => {
      const el = cursorRef.current;
      if (el) {
        // Smooth follow with 0.4 factor for fast response
        currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.4;
        currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.4;
        el.style.transform = `translate3d(${currentPos.current.x - 20}px, ${currentPos.current.y - 20}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      cancelAnimationFrame(frame);
    };
  }, [enableFancyCursor]);

  if (!enableFancyCursor) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="monster-cursor"
      style={{
        transform: `translate3d(${currentPos.current.x - 20}px, ${currentPos.current.y - 20}px, 0)`,
      }}
    >
      <div
        className="relative"
        style={{
          transform: isClicking ? "scale(0.7)" : isHovering ? "scale(1.3)" : "scale(1)",
          transition: "transform 0.2s ease-out",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" className="relative">
          {/* Jagged outer petals */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            const rad = (angle * Math.PI) / 180;
            const x1 = 20 + 15 * Math.cos(rad);
            const y1 = 20 + 15 * Math.sin(rad);
            const x2 = 20 + 18 * Math.cos(rad + 0.3);
            const y2 = 20 + 18 * Math.sin(rad + 0.3);
            const x3 = 20 + 15 * Math.cos(rad + 0.6);
            const y3 = 20 + 15 * Math.sin(rad + 0.6);

            return (
              <path
                key={i}
                d={`M 20,20 L ${x1},${y1} L ${x2},${y2} L ${x3},${y3} Z`}
                fill="var(--accent-primary)"
                fillOpacity="0.8"
                stroke="var(--text-danger)"
                strokeOpacity="0.6"
                strokeWidth="0.5"
              />
            );
          })}
          {/* Inner dark center */}
          <circle
            cx="20"
            cy="20"
            r="8"
            fill="var(--bg-base)"
            fillOpacity="0.9"
            stroke="var(--accent-primary)"
            strokeOpacity="0.6"
            strokeWidth="1"
          />
          {/* Center "mouth" */}
          <circle
            cx="20"
            cy="20"
            r="4"
            fill="var(--bg-base)"
            fillOpacity="0.8"
          />
        </svg>
      </div>
      {/* Simple pulse animation via CSS */}
      <style jsx>{`
        @keyframes cursorPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .monster-cursor {
          animation: cursorPulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
