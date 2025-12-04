"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ThemeMode } from "./theme";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  isTransitioning: boolean;
  tearDirection: "normal-to-upside" | "upside-to-normal" | null;
  showTear: boolean;
  handleTearMidpoint: () => void;
  handleTearComplete: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type Dimension = "normal" | "upsideDown";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dimension, setDimension] = useState<Dimension>("normal");
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetDimension, setTargetDimension] = useState<Dimension | null>(null);

  // Convert dimension to ThemeMode
  const theme: ThemeMode = dimension === "normal" ? "normal" : "upside-down";
  const tearDirection: "normal-to-upside" | "upside-to-normal" | null = 
    targetDimension === "upsideDown" ? "normal-to-upside" : 
    targetDimension === "normal" ? "upside-to-normal" : null;
  const showTear = isTransitioning && targetDimension !== null;

  const toggleTheme = useCallback(() => {
    if (isTransitioning) return; // Prevent multiple toggles during transition
    
    const newDimension: Dimension = dimension === "normal" ? "upsideDown" : "normal";
    setTargetDimension(newDimension);
    setIsTransitioning(true);
    
    // Lock scroll during transition
    document.body.style.overflow = "hidden";
  }, [dimension, isTransitioning]);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as ThemeMode | null;
    if (saved) {
      setDimension(saved === "normal" ? "normal" : "upsideDown");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "m") {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [mounted, toggleTheme]);

  const handleTearMidpoint = useCallback(() => {
    // Switch dimension at the midpoint of the tear animation (~1.0s)
    if (targetDimension) {
      setDimension(targetDimension);
    }
  }, [targetDimension]);

  const handleTearComplete = useCallback(() => {
    // Unlock scroll and cleanup
    document.body.style.overflow = "";
    setIsTransitioning(false);
    setTargetDimension(null);
  }, []);

  // Always provide context, even during SSR
  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme, 
        isTransitioning, 
        tearDirection, 
        showTear,
        handleTearMidpoint,
        handleTearComplete 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

