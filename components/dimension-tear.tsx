"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, Variants } from "framer-motion";
import { useTheme } from "@/lib/theme-context";

export function DimensionTear() {
  const { isTransitioning, tearDirection, handleTearMidpoint, handleTearComplete } = useTheme();
  const controls = useAnimation();
  const overlayControls = useAnimation();
  const isMountedRef = useRef(false);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isTransitioning || !tearDirection) {
      controls.set({ scaleX: 0, opacity: 0 });
      overlayControls.set({ opacity: 0, x: 0, y: 0 });
      return;
    }

    const run = async () => {
      if (!isMountedRef.current) return;

      try {
        // Start overlay animation
        await overlayControls.start("enter");
        
        // 1) Play open animation
        if (isMountedRef.current) {
          await controls.start("open");
        }
        
        // 2) Swap dimension at peak
        if (isMountedRef.current) {
          handleTearMidpoint();
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        // 3) Play close animation
        if (isMountedRef.current) {
          await controls.start("close");
        }

        // 4) Fade out overlay
        if (isMountedRef.current) {
          await overlayControls.start("exit");
        }

        // 5) Cleanup
        if (isMountedRef.current) {
          handleTearComplete();
        }
      } catch (error) {
        if (isMountedRef.current) {
          console.error("DimensionTear animation error:", error);
          handleTearComplete();
        }
      }
    };

    const rafId = requestAnimationFrame(() => {
      run();
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isTransitioning, tearDirection, controls, overlayControls, handleTearMidpoint, handleTearComplete]);

  const targetBackground =
    tearDirection === "normal-to-upside"
      ? "radial-gradient(circle at center, #7f0e1f 0%, #320010 25%, #0a0011 55%, #010102 100%)"
      : "linear-gradient(135deg, #0d0d0f 0%, #151518 50%, #1a1a2e 100%)";

  // Jagged tear path - narrow at top/bottom, wide in middle
  const tearPath = "M 50 0 L 48 5 L 52 10 L 47 15 L 53 20 L 46 25 L 54 30 L 45 35 L 55 40 L 44 45 L 56 50 L 43 55 L 57 60 L 42 65 L 58 70 L 41 75 L 59 80 L 40 85 L 60 90 L 39 95 L 61 100 L 38 95 L 62 90 L 37 85 L 63 80 L 36 75 L 64 70 L 35 65 L 65 60 L 34 55 L 66 50 L 33 45 L 67 40 L 32 35 L 68 30 L 31 25 L 69 20 L 30 15 L 70 10 L 29 5 L 71 0 L 50 0 Z";

  const tearVariants: Variants = {
    open: {
      scaleX: [0, 0.02, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3],
      opacity: [0, 0.3, 0.5, 0.7, 0.9, 1, 1, 1],
      transition: {
        duration: prefersReducedMotion ? 0.6 : 0.8,
        ease: [0.4, 0, 0.2, 1],
        times: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
      },
    },
    close: {
      scaleX: [0.3, 0.35, 0.3, 0.2, 0.1, 0.05, 0],
      opacity: [1, 1, 0.9, 0.7, 0.4, 0.2, 0],
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.6,
        ease: "easeInOut",
      },
    },
  };

  const overlayVariants: Variants = {
    enter: {
      opacity: [0, 0.85],
      x: prefersReducedMotion ? 0 : [0, -2, 2, -1, 1, 0],
      y: prefersReducedMotion ? 0 : [0, -1, 1, -0.5, 0.5, 0],
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: [0.85, 0.5, 0.2, 0],
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && tearDirection && (
        <motion.div
          key="dimension-tear"
          className="fixed inset-0 z-[99999] pointer-events-none"
          initial="enter"
          animate={overlayControls}
          exit="exit"
          variants={overlayVariants}
        >
          {/* Dark overlay with shake */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: tearDirection === "normal-to-upside" ? "#020005" : "rgba(0, 0, 0, 0.9)",
            }}
            variants={overlayVariants}
            animate={overlayControls}
          />

          {/* RGB Split / Chromatic Aberration */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                mixBlendMode: "screen",
              }}
              animate={{
                filter: [
                  "drop-shadow(-3px 0 0 rgba(255, 0, 0, 0.5)) drop-shadow(3px 0 0 rgba(0, 0, 255, 0.5))",
                  "drop-shadow(-5px 0 0 rgba(255, 0, 0, 0.8)) drop-shadow(5px 0 0 rgba(0, 0, 255, 0.8))",
                  "drop-shadow(-2px 0 0 rgba(255, 0, 0, 0.3)) drop-shadow(2px 0 0 rgba(0, 0, 255, 0.3))",
                  "drop-shadow(0 0 0 rgba(255, 0, 0, 0)) drop-shadow(0 0 0 rgba(0, 0, 255, 0))",
                ],
              }}
              transition={{
                duration: 1.1,
                times: [0, 0.2, 0.5, 1],
              }}
            />
          )}

          {/* Main Tear SVG */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="absolute inset-0"
              style={{
                filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 60px rgba(255, 39, 66, 0.8))",
                transformOrigin: "center",
              }}
              variants={tearVariants}
              animate={controls}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0"
                style={{
                  overflow: "visible",
                }}
              >
                <defs>
                  {/* Swirling gradient for inside the tear - Upside Down energy */}
                  <radialGradient id="tearGradient" cx="50%" cy="0%">
                    <stop offset="0%" stopColor="#ff1b2d" />
                    <stop offset="40%" stopColor="#7f0e1f" />
                    <stop offset="80%" stopColor="#0a0011" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="rotate"
                      values="0 50 50;360 50 50"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </radialGradient>
                  
                  {/* Normal world gradient */}
                  <radialGradient id="tearGradientNormal" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="rgba(180, 205, 255, 0.9)" />
                    <stop offset="50%" stopColor="rgba(74, 158, 255, 0.7)" />
                    <stop offset="100%" stopColor="rgba(26, 26, 46, 0.6)" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="rotate"
                      values="0 50 50;360 50 50"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </radialGradient>

                  {/* Mask to reveal target dimension inside tear */}
                  <mask id="tearMask">
                    <rect width="100" height="100" fill="black" />
                    <g transform="scale(1, 1)">
                      <path d={tearPath} fill="white" />
                    </g>
                  </mask>
                </defs>

                {/* Target dimension background inside tear */}
                <rect
                  width="100"
                  height="100"
                  fill={targetBackground}
                  mask="url(#tearMask)"
                />

                {/* Swirling energy inside tear */}
                <path
                  d={tearPath}
                  fill={tearDirection === "normal-to-upside" ? "url(#tearGradient)" : "url(#tearGradientNormal)"}
                  mask="url(#tearMask)"
                  style={{
                    mixBlendMode: "screen",
                  }}
                />

                {/* Bright edge - theme dependent */}
                <path
                  d={tearPath}
                  fill="none"
                  stroke={tearDirection === "normal-to-upside" ? "#ff1b2d" : "#f0f4ff"}
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                  className={tearDirection === "normal-to-upside" ? "dimension-tear-edge" : "dimension-tear-edge--normal"}
                  style={{
                    filter: tearDirection === "normal-to-upside" 
                      ? "drop-shadow(0 0 14px rgba(255, 27, 45, 0.9))"
                      : "drop-shadow(0 0 14px rgba(180, 205, 255, 0.85))",
                  }}
                />
              </svg>
            </motion.div>
          </div>

          {/* Outer glow around tear */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.6, 0.5, 0.3, 0],
              scale: [0.8, 1.2, 1.5, 2, 2.5],
            }}
            transition={{
              duration: 1.1,
              ease: "easeOut",
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: "radial-gradient(ellipse at center, rgba(255, 27, 45, 0.3) 0%, rgba(150, 15, 30, 0.2) 20%, rgba(60, 10, 80, 0.15) 40%, transparent 70%)",
                mixBlendMode: "lighten",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
