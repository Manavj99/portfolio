"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";

export function CursorEffect() {
  const { theme } = useTheme();
  const isUpsideDown = theme === "upside-down";
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Check for reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion || isUpsideDown) {
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], .cursor-glow"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [prefersReducedMotion, isUpsideDown]);

  const cursorColor = isUpsideDown ? "rgba(255, 39, 66, 0.8)" : "rgba(74, 158, 255, 0.5)";
  const borderColor = isUpsideDown ? "border-neon-red" : "border-[#4a9eff]";

  if (prefersReducedMotion || isUpsideDown) {
    return null;
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-[10000] mix-blend-difference"
      animate={{
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
        scale: isHovering ? (isUpsideDown ? 1.8 : 1.5) : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
    >
      <motion.div
        className={`w-10 h-10 rounded-full border-2 ${borderColor} transition-all duration-300 ${
          isHovering ? (isUpsideDown ? "bg-neon-red/30" : "bg-[#4a9eff]/20") : "bg-transparent"
        }`}
        animate={isUpsideDown && isHovering ? {
          boxShadow: [
            `0 0 20px ${cursorColor}`,
            `0 0 40px ${cursorColor}`,
            `0 0 20px ${cursorColor}`,
          ],
        } : {}}
        transition={isUpsideDown ? {
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        } : {}}
        style={{
          boxShadow: isHovering
            ? (isUpsideDown 
                ? `0 0 30px ${cursorColor}` 
                : `0 0 20px rgba(74, 158, 255, 0.4)`)
            : (isUpsideDown 
                ? `0 0 10px ${cursorColor}` 
                : `0 0 8px rgba(74, 158, 255, 0.2)`),
        }}
      />
    </motion.div>
  );
}

