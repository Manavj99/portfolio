import { normalTheme } from "@/styles/themes/normal";
import { upsideDownTheme } from "@/styles/themes/upsideDown";
import { ThemeMode } from "./theme";

export function getThemeStyles(theme: ThemeMode) {
  return theme === "upside-down" ? upsideDownTheme : normalTheme;
}

export function getThemeClasses(theme: ThemeMode) {
  const styles = getThemeStyles(theme);
  
  return {
    background: theme === "upside-down" 
      ? "bg-black" 
      : "bg-[#0d0d0f]",
    backgroundSecondary: theme === "upside-down"
      ? "bg-[#0a0000]"
      : "bg-[#151518]",
    panel: theme === "upside-down"
      ? "bg-[rgba(20,0,0,0.9)] border-neon-red/60"
      : "bg-[rgba(20,20,25,0.7)] border-[rgba(74,158,255,0.2)]",
    text: theme === "upside-down"
      ? "text-neon-red"
      : "text-[#e0e0e0]",
    textSecondary: theme === "upside-down"
      ? "text-[#ff6b7a]"
      : "text-[#a0a0a0]",
    accent: theme === "upside-down"
      ? "text-neon-red"
      : "text-[#4a9eff]",
    glow: theme === "upside-down"
      ? "shadow-[0_0_30px_rgba(255,39,66,0.8),0_0_60px_rgba(255,39,66,0.4)]"
      : "shadow-[0_0_15px_rgba(74,158,255,0.3)]",
    hoverGlow: theme === "upside-down"
      ? "hover:shadow-[0_0_30px_rgba(255,39,66,0.8)]"
      : "hover:shadow-[0_0_15px_rgba(74,158,255,0.3)]",
    border: theme === "upside-down"
      ? "border-neon-red/60"
      : "border-[rgba(74,158,255,0.2)]",
    textGlow: theme === "upside-down"
      ? "[text-shadow:0_0_10px_rgba(255,39,66,0.5),0_0_20px_rgba(255,39,66,0.3)]"
      : "",
    glitch: theme === "upside-down" ? "animate-glitch" : "",
    flicker: theme === "upside-down" ? "animate-flicker" : "",
  };
}

