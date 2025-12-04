export type ThemeMode = "normal" | "upside-down";

export interface ThemeColors {
  background: string;
  panel: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentSecondary: string;
  border: string;
  glow: string;
}

export const themeConfig: Record<ThemeMode, ThemeColors> = {
  normal: {
    background: "bg-[#0a0a0f]",
    panel: "bg-[rgba(15,15,25,0.8)]",
    text: "text-gray-100",
    textSecondary: "text-gray-400",
    accent: "text-neon-red",
    accentSecondary: "text-neon-blue",
    border: "border-neon-red/30",
    glow: "shadow-[0_0_20px_rgba(255,39,66,0.3)]",
  },
  "upside-down": {
    background: "bg-[#050508]",
    panel: "bg-[rgba(10,10,20,0.9)]",
    text: "text-gray-50",
    textSecondary: "text-gray-300",
    accent: "text-neon-red",
    accentSecondary: "text-neon-blue",
    border: "border-neon-red/50",
    glow: "shadow-[0_0_30px_rgba(255,39,66,0.5)]",
  },
};

