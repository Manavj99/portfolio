export const upsideDownPalette = {
  // True Upside Down base
  bgBase: "#010102",
  bgDeepPurple: "#0a0011",
  bgCrimsonDark: "#320010",
  bgCrimsonGlow: "#7f0e1f",

  // Cards / surfaces
  surface: "#100010",
  surfaceSoft: "#150015",
  surfaceBorder: "#c5162d",

  // Text
  textPrimary: "#f0f0f0",
  textSecondary: "#c2a4d0",
  textMuted: "#8b688f",
  textDanger: "#ff5572",

  // Accent glows
  accentRed: "#ff1b2d",
  accentPurple: "#5e1f6e",
  accentBlue: "#2c1ea0",

  // Glow
  glowSoft: "rgba(255, 27, 45, 0.35)",
  glowStrong: "rgba(255, 27, 45, 0.55)",

  // Fog colors
  fogRed: "rgba(150, 15, 30, 0.25)",
  fogPurple: "rgba(60, 10, 80, 0.25)",

  // Particles
  sporeRed: "rgba(255, 39, 66, 0.25)",
  sporeBlue: "rgba(93, 91, 255, 0.23)",
  sporePurple: "rgba(158, 67, 190, 0.25)",
};

export const upsideDownTheme = {
  colors: {
    background: upsideDownPalette.bgBase,
    backgroundSecondary: upsideDownPalette.bgGradientStart,
    panel: upsideDownPalette.surface,
    text: upsideDownPalette.textPrimary,
    textSecondary: upsideDownPalette.textSecondary,
    accent: upsideDownPalette.accentPrimary,
    accentSecondary: upsideDownPalette.accentSecondary,
    border: upsideDownPalette.surfaceBorder,
    glow: upsideDownPalette.accentGlowStrong,
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "600",
    letterSpacing: "0.05em",
    textShadow: "0 0 10px rgba(255, 39, 66, 0.5), 0 0 20px rgba(255, 39, 66, 0.3)",
  },
  effects: {
    glitch: true,
    flicker: true,
    chromaticAberration: true,
    particles: true,
    fog: true,
  },
  animations: {
    hover: {
      scale: 1.05,
      glow: "0 0 30px rgba(255, 39, 66, 0.8), 0 0 60px rgba(255, 39, 66, 0.4)",
      transition: "all 0.2s ease",
    },
    card: {
      lift: "translateY(-8px)",
      shadow: "0 12px 40px rgba(255, 39, 66, 0.4)",
    },
    text: {
      glitch: true,
      flicker: true,
    },
  },
  cursor: {
    glow: "rgba(255, 39, 66, 0.8)",
    pulse: true,
  },
};

