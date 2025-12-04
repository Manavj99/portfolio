"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionEnabled } from "@/lib/use-motion-enabled";

export function ParallaxBackground() {
  const motionEnabled = useMotionEnabled();
  const { scrollY } = useScroll();
  
  // Parallax transforms for background layers
  const fogY = useTransform(scrollY, [0, 2000], [0, -40]);

  return (
    <>
      {/* Vignette Overlay - Always present but respects reduced motion */}
      {motionEnabled && (
        <div className="vignette-overlay" />
      )}
      
      {/* Parallax fog layers - only visible in upside-down mode and when motion is enabled */}
      {motionEnabled && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            y: fogY,
            willChange: "transform",
          }}
        >
          <div className="fog-layer" data-theme="upside-down" />
        </motion.div>
      )}
    </>
  );
}

