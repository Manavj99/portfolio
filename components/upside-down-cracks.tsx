"use client";

import { useTheme } from "@/lib/theme-context";

export function UpsideDownCracks() {
  const { theme } = useTheme();
  
  if (theme !== "upside-down") return null;

  return (
    <div 
      className="crack-layer"
      aria-hidden="true"
    />
  );
}

