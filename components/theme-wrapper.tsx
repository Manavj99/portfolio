"use client";

import React from "react";
import { useTheme } from "@/lib/theme-context";
import { DimensionTear } from "@/components/dimension-tear";
import { ThemeTransition } from "@/components/theme-transition";
import { UpsideDownHorrorEffects } from "@/components/upside-down-horror-effects";
import { MonsterCursor } from "@/components/monster-cursor";
import { CursorEffect } from "@/components/cursor-effect";
import { UpsideDownParticles } from "@/components/upside-down-particles";
import { UpsideDownFog } from "@/components/upside-down-fog";
import { UpsideDownCracks } from "@/components/upside-down-cracks";
import { Navbar } from "@/components/navbar";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isUpsideDown = theme === "upside-down";
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  // Only render MonsterCursor in Upside Down mode and when reduced motion is disabled
  const shouldUseMonsterCursor = isUpsideDown && !prefersReducedMotion;

  return (
    <>
      <DimensionTear />
      <ThemeTransition />
      <UpsideDownHorrorEffects />
      <UpsideDownFog />
      <UpsideDownCracks />
      {shouldUseMonsterCursor && <MonsterCursor />}
      <CursorEffect />
      <UpsideDownParticles />
      <Navbar />
      {children}
    </>
  );
}

