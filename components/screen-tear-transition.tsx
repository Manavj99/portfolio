"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface ScreenTearTransitionProps {
  isActive: boolean;
  direction: "normal-to-upside" | "upside-to-normal";
  onComplete: () => void;
}

export function ScreenTearTransition({
  isActive,
  direction,
  onComplete,
}: ScreenTearTransitionProps) {
  const controls = useAnimation();
  const [phase, setPhase] = useState<"idle" | "shake" | "tear-open" | "switch" | "fade-out">("idle");

  useEffect(() => {
    if (!isActive) {
      setPhase("idle");
      controls.set({ opacity: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
      return;
    }

    const sequence = async () => {
      // 0-0.2s: Screen shake + darken
      setPhase("shake");
      await controls.start({
        opacity: [1, 0.7, 1],
        x: [0, -3, 3, -2, 2, -1, 0],
        y: [0, -2, 2, -1, 1, 0],
        transition: { duration: 0.2, ease: "easeInOut" },
      });

      // 0.2-0.9s: Tear opens (bright vertical line widens to jagged tear)
      setPhase("tear-open");
      const tearPath = direction === "normal-to-upside"
        ? [
            "polygon(49% 0%, 51% 0%, 51% 100%, 49% 100%)", // Thin line
            "polygon(48% 0%, 52% 0%, 52% 100%, 48% 100%)", // Slightly wider
            "polygon(47% 0%, 53% 0%, 52% 10%, 48% 20%, 52% 30%, 48% 40%, 52% 50%, 48% 60%, 52% 70%, 48% 80%, 52% 90%, 48% 100%, 47% 100%)", // Jagged start
            "polygon(45% 0%, 55% 0%, 54% 10%, 46% 20%, 54% 30%, 46% 40%, 54% 50%, 46% 60%, 54% 70%, 46% 80%, 54% 90%, 46% 100%, 45% 100%)", // Wider
            "polygon(40% 0%, 60% 0%, 58% 10%, 42% 20%, 58% 30%, 42% 40%, 58% 50%, 42% 60%, 58% 70%, 42% 80%, 58% 90%, 42% 100%, 40% 100%)", // Even wider
            "polygon(30% 0%, 70% 0%, 68% 10%, 32% 20%, 68% 30%, 32% 40%, 68% 50%, 32% 60%, 68% 70%, 32% 80%, 68% 90%, 32% 100%, 30% 100%)", // Wide tear
          ]
        : [
            "polygon(30% 0%, 70% 0%, 68% 10%, 32% 20%, 68% 30%, 32% 40%, 68% 50%, 32% 60%, 68% 70%, 32% 80%, 68% 90%, 32% 100%, 30% 100%)", // Wide tear
            "polygon(40% 0%, 60% 0%, 58% 10%, 42% 20%, 58% 30%, 42% 40%, 58% 50%, 42% 60%, 58% 70%, 42% 80%, 58% 90%, 42% 100%, 40% 100%)", // Narrower
            "polygon(45% 0%, 55% 0%, 54% 10%, 46% 20%, 54% 30%, 46% 40%, 54% 50%, 46% 60%, 54% 70%, 46% 80%, 54% 90%, 46% 100%, 45% 100%)", // Even narrower
            "polygon(47% 0%, 53% 0%, 52% 10%, 48% 20%, 52% 30%, 48% 40%, 52% 50%, 48% 60%, 52% 70%, 48% 80%, 52% 90%, 48% 100%, 47% 100%)", // Jagged
            "polygon(48% 0%, 52% 0%, 52% 100%, 48% 100%)", // Slightly wider
            "polygon(49% 0%, 51% 0%, 51% 100%, 49% 100%)", // Thin line
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Closed
          ];

      await controls.start({
        clipPath: tearPath,
        opacity: [1, 1, 1, 1, 1, 0.95],
        transition: {
          duration: 0.7,
          ease: [0.4, 0, 0.2, 1], // cubic-bezier for smooth easing
          times: direction === "normal-to-upside" ? [0, 0.1, 0.3, 0.5, 0.7, 1] : [0, 0.3, 0.5, 0.7, 0.9, 1],
        },
      });

      // At ~0.9s: Switch theme
      setPhase("switch");
      await new Promise((resolve) => setTimeout(resolve, 50));

      // 0.9-1.5s: Tear edges retract/blur and fade
      setPhase("fade-out");
      await controls.start({
        clipPath: direction === "normal-to-upside"
          ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: [0.95, 0.7, 0.3, 0],
        filter: ["blur(0px)", "blur(2px)", "blur(5px)", "blur(10px)"],
        transition: {
          duration: 0.6,
          ease: "easeInOut",
        },
      });

      onComplete();
    };

    sequence();
  }, [isActive, direction, controls, onComplete]);

  if (!isActive) return null;

  const backgroundGradient = direction === "normal-to-upside"
    ? "radial-gradient(circle at center, var(--bg-gradient-end) 0%, var(--bg-gradient-mid) 30%, var(--bg-gradient-start) 55%, var(--bg-base) 100%)"
    : "linear-gradient(135deg, #0d0d0f 0%, #151518 50%, #1a1a2e 100%)";

  return (
    <motion.div
      className="fixed inset-0 z-[99999] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {/* Main tear overlay with bright white/red edge */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: backgroundGradient,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
        animate={controls}
      />

      {/* Bright tear edge with glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "transparent",
          filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 40px rgba(255, 39, 66, 0.6))",
        }}
        animate={controls}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 48%, rgba(255, 39, 66, 0.8) 50%, rgba(255, 255, 255, 0.9) 52%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>

      {/* Outer glow around tear */}
      {phase === "tear-open" && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.3) 0%, rgba(255, 39, 66, 0.2) 30%, transparent 60%)",
            mixBlendMode: "screen",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.6, 0.4, 0],
            scale: [0.8, 1.2, 1.5, 2],
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        />
      )}
    </motion.div>
  );
}

