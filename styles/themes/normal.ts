export const normalTheme = {
  colors: {
    background: "#0d0d0f",
    backgroundSecondary: "#151518",
    panel: "rgba(20, 20, 25, 0.7)",
    text: "#e0e0e0",
    textSecondary: "#a0a0a0",
    accent: "#4a9eff",
    accentSecondary: "#7b68ee",
    border: "rgba(74, 158, 255, 0.2)",
    glow: "rgba(74, 158, 255, 0.1)",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "normal",
    letterSpacing: "normal",
    textShadow: "none",
  },
  effects: {
    glitch: false,
    flicker: false,
    chromaticAberration: false,
    particles: false,
    fog: false,
  },
  animations: {
    hover: {
      scale: 1.02,
      glow: "0 0 15px rgba(74, 158, 255, 0.3)",
      transition: "all 0.3s ease",
    },
    card: {
      lift: "translateY(-4px)",
      shadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
    },
    text: {
      glitch: false,
      flicker: false,
    },
  },
  cursor: {
    glow: "rgba(74, 158, 255, 0.3)",
    pulse: false,
  },
};

