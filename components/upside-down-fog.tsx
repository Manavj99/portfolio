"use client";

import { useTheme } from "@/lib/theme-context";

export function UpsideDownFog() {
  const { theme } = useTheme();
  
  if (theme !== "upside-down") return null;

  return (
    <div 
      className="fog-layer fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}

