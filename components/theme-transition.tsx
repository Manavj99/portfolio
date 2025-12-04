"use client";

import React from "react";
import { useTheme } from "@/lib/theme-context";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeTransition() {
  const { isTransitioning } = useTheme();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="theme-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </AnimatePresence>
  );
}

