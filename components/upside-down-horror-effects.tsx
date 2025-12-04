"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme-context";

export function UpsideDownHorrorEffects() {
  const { theme } = useTheme();
  const isUpsideDown = theme === "upside-down";
  const [silhouettes, setSilhouettes] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([]);

  // Check for reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Generate silhouettes
  useEffect(() => {
    if (!isUpsideDown || prefersReducedMotion) {
      setSilhouettes([]);
      return;
    }

    const newSilhouettes = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: 0,
    }));

    setSilhouettes(newSilhouettes);

    // Randomly show/hide silhouettes
    const interval = setInterval(() => {
      setSilhouettes((prev) =>
        prev.map((sil) => ({
          ...sil,
          opacity: Math.random() > 0.7 ? (Math.random() * 0.15 + 0.05) : 0,
        }))
      );
    }, 15000 + Math.random() * 15000); // 15-30 seconds

    return () => clearInterval(interval);
  }, [isUpsideDown, prefersReducedMotion]);

  if (!isUpsideDown) return null;

  return (
    <>
      {/* Veiny/Tendril Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="tendrilGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--fog-red)" />
              <stop offset="50%" stopColor="var(--fog-purple)" />
              <stop offset="100%" stopColor="var(--fog-red)" />
            </linearGradient>
          </defs>
          {/* Abstract tendril shapes */}
          <motion.path
            d="M 0,500 Q 200,300 400,500 T 800,500 T 1000,500"
            stroke="url(#tendrilGradient)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M 0,300 Q 300,500 600,300 T 1000,300"
            stroke="url(#tendrilGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.path
            d="M 0,700 Q 250,500 500,700 T 1000,700"
            stroke="url(#tendrilGradient)"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0.25 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </svg>
      </div>

      {/* Stronger Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Fog Layer */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[3]"
        style={{
          background:
            "radial-gradient(circle, var(--fog-red) 0%, transparent 60%), radial-gradient(circle, var(--fog-purple) 0%, transparent 60%)",
          mixBlendMode: "lighten",
        }}
        animate={{
          opacity: [0.2, 0.3, 0.2],
          x: [-20, 10, -20],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Shadowy Silhouettes */}
      <AnimatePresence>
        {silhouettes.map(
          (sil) =>
            sil.opacity > 0 && (
              <motion.div
                key={sil.id}
                className="fixed pointer-events-none z-[4]"
                style={{
                  left: `${sil.x}%`,
                  top: `${sil.y}%`,
                  width: "200px",
                  height: "300px",
                  background:
                    "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  borderRadius: "50%",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: sil.opacity,
                  scale: [0.8, 1.2, 0.8],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )
        )}
      </AnimatePresence>
    </>
  );
}

