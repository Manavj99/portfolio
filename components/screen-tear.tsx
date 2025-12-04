"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface ScreenTearProps {
  isActive: boolean;
  direction: "normal-to-upside" | "upside-to-normal";
  onComplete: () => void;
}

export function ScreenTear({ isActive, direction, onComplete }: ScreenTearProps) {
  const [phase, setPhase] = useState<"pre-tear" | "tear-opening" | "shards" | "closing" | "complete">("pre-tear");
  const controls = useAnimation();

  useEffect(() => {
    if (!isActive) {
      setPhase("pre-tear");
      return;
    }

    const sequence = async () => {
      // Pre-tear build-up (0-0.3s)
      setPhase("pre-tear");
      await controls.start({
        opacity: 0.8,
        scale: [1, 1.01, 1],
        x: [0, -2, 2, -2, 0],
        filter: [
          "hue-rotate(0deg)",
          "hue-rotate(5deg) saturate(1.2)",
          "hue-rotate(0deg)",
        ],
        transition: { duration: 0.3 },
      });

      // Tear opening (0.3-1.1s)
      setPhase("tear-opening");
      await controls.start({
        clipPath: direction === "normal-to-upside"
          ? [
              "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              "polygon(48% 0%, 52% 0%, 52% 100%, 48% 100%)",
              "polygon(45% 0%, 55% 0%, 50% 20%, 48% 40%, 50% 60%, 48% 80%, 50% 100%, 45% 100%, 48% 80%, 46% 60%, 48% 40%, 46% 20%, 45% 0%)",
              "polygon(40% 0%, 60% 0%, 55% 20%, 50% 40%, 55% 60%, 50% 80%, 55% 100%, 40% 100%, 45% 80%, 40% 60%, 45% 40%, 40% 20%, 40% 0%)",
              "polygon(30% 0%, 70% 0%, 65% 20%, 60% 40%, 65% 60%, 60% 80%, 65% 100%, 30% 100%, 35% 80%, 30% 60%, 35% 40%, 30% 20%, 30% 0%)",
              "polygon(20% 0%, 80% 0%, 75% 20%, 70% 40%, 75% 60%, 70% 80%, 75% 100%, 20% 100%, 25% 80%, 20% 60%, 25% 40%, 20% 20%, 20% 0%)",
              "polygon(10% 0%, 90% 0%, 85% 20%, 80% 40%, 85% 60%, 80% 80%, 85% 100%, 10% 100%, 15% 80%, 10% 60%, 15% 40%, 10% 20%, 10% 0%)",
              "polygon(0% 0%, 100% 0%, 95% 20%, 90% 40%, 95% 60%, 90% 80%, 95% 100%, 0% 100%, 5% 80%, 0% 60%, 5% 40%, 0% 20%, 0% 0%)",
            ]
          : [
              "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              "polygon(10% 0%, 90% 0%, 85% 20%, 80% 40%, 85% 60%, 80% 80%, 85% 100%, 10% 100%, 15% 80%, 10% 60%, 15% 40%, 10% 20%, 10% 0%)",
              "polygon(20% 0%, 80% 0%, 75% 20%, 70% 40%, 75% 60%, 70% 80%, 75% 100%, 20% 100%, 25% 80%, 20% 60%, 25% 40%, 20% 20%, 20% 0%)",
              "polygon(30% 0%, 70% 0%, 65% 20%, 60% 40%, 65% 60%, 60% 80%, 65% 100%, 30% 100%, 35% 80%, 30% 60%, 35% 40%, 30% 20%, 30% 0%)",
              "polygon(40% 0%, 60% 0%, 55% 20%, 50% 40%, 55% 60%, 50% 80%, 55% 100%, 40% 100%, 45% 80%, 40% 60%, 45% 40%, 40% 20%, 40% 0%)",
              "polygon(45% 0%, 55% 0%, 50% 20%, 48% 40%, 50% 60%, 48% 80%, 50% 100%, 45% 100%, 48% 80%, 46% 60%, 48% 40%, 46% 20%, 45% 0%)",
              "polygon(48% 0%, 52% 0%, 52% 100%, 48% 100%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ],
        transition: { duration: 0.8, ease: "easeInOut" },
      });

      // Shards & light burst (0.7-1.3s) - happens during tear opening
      setPhase("shards");
      await controls.start({
        boxShadow: [
          "0 0 0px transparent",
          `0 0 100px var(--accent-glow-strong), 0 0 200px var(--accent-glow-soft)`,
          `0 0 50px var(--accent-glow-soft)`,
        ],
        transition: { duration: 0.6, times: [0, 0.3, 1] },
      });

      // Tear closing / fade-out (1.1-1.7s)
      setPhase("closing");
      await controls.start({
        opacity: [1, 0.8, 0],
        scale: 1,
        x: 0,
        filter: "hue-rotate(0deg)",
        transition: { duration: 0.6 },
      });

      setPhase("complete");
      onComplete();
    };

    sequence();
  }, [isActive, direction, controls, onComplete]);

  if (!isActive) return null;

  const backgroundGradient = direction === "normal-to-upside"
    ? "radial-gradient(circle at top, var(--bg-gradient-end) 0%, var(--bg-gradient-mid) 35%, var(--bg-base) 100%)"
    : "linear-gradient(135deg, #0d0d0f 0%, #151518 50%, #1a1a2e 100%)";

  return (
    <motion.div
      className="fixed inset-0 z-[99999] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={controls}
          style={{
            background: direction === "normal-to-upside"
              ? "var(--bg-base)"
              : "rgba(0, 0, 0, 0.9)",
            opacity: 0.8,
          }}
    >
      {/* Main tear overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: backgroundGradient,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
        animate={controls}
      />

      {/* Glass shards */}
      {phase === "shards" && (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${45 + (i % 4) * 2.5}%`,
                top: `${20 + Math.floor(i / 4) * 30}%`,
                width: "20px",
                height: "30px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 100%)",
                clipPath: `polygon(${30 + i * 5}% 0%, ${70 + i * 5}% 0%, ${60 + i * 5}% 100%, ${40 + i * 5}% 100%)`,
              }}
              initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: (i % 2 === 0 ? 1 : -1) * (20 + i * 5),
                y: (i % 2 === 0 ? 1 : -1) * (15 + i * 3),
                rotate: i * 15,
              }}
              transition={{
                duration: 0.6,
                delay: 0.7 + i * 0.05,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Light burst */}
      {phase === "shards" && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, var(--accent-glow-strong) 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.5, 2],
          }}
          transition={{
            duration: 0.6,
            delay: 0.7,
            ease: "easeOut",
          }}
        />
      )}

      {/* Chromatic aberration overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "transparent",
          mixBlendMode: "screen",
        }}
        animate={{
          filter: phase === "pre-tear" || phase === "tear-opening"
            ? [
                "drop-shadow(-3px 0 0 rgba(255, 0, 0, 0.5)) drop-shadow(3px 0 0 rgba(0, 0, 255, 0.5))",
                "drop-shadow(-5px 0 0 rgba(255, 0, 0, 0.8)) drop-shadow(5px 0 0 rgba(0, 0, 255, 0.8))",
                "drop-shadow(-2px 0 0 rgba(255, 0, 0, 0.3)) drop-shadow(2px 0 0 rgba(0, 0, 255, 0.3))",
                "drop-shadow(0 0 0 rgba(255, 0, 0, 0)) drop-shadow(0 0 0 rgba(0, 0, 255, 0))",
              ]
            : "drop-shadow(0 0 0 rgba(255, 0, 0, 0)) drop-shadow(0 0 0 rgba(0, 0, 255, 0))",
        }}
        transition={{
          duration: 1.4,
          times: [0, 0.2, 0.5, 1],
        }}
      />
    </motion.div>
  );
}
