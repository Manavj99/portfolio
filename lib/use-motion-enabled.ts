"use client";

import { useEffect, useState } from "react";

/**
 * Hook to check if motion is enabled (respects prefers-reduced-motion)
 * @returns true if motion should be enabled, false if reduced motion is preferred
 */
export function useMotionEnabled(): boolean {
  // Start with true to avoid hydration mismatch, will update on client
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Set initial value
    setMotionEnabled(!mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setMotionEnabled(!e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } 
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Return true during SSR and initial render to avoid hydration issues
  if (!mounted) {
    return true;
  }

  return motionEnabled;
}

