"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { timeline } from "@/data/timeline";
import { useTheme } from "@/lib/theme-context";
import { AnimatedSection, fadeUp, fadeUpSlow, timelineDot, timelineLine, sceneContainer } from "@/lib/animations";
import { useMotionEnabled } from "@/lib/use-motion-enabled";

export function Timeline() {
  const { theme } = useTheme();
  const motionEnabled = useMotionEnabled();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <AnimatedSection id="seasons" className="py-20 px-4 relative">
      <div className="section-shadow" />
      <div className="container mx-auto">
        <motion.h2
          className={`text-4xl md:text-5xl mb-12 section-title upside-down-heading ${
            theme === "upside-down" 
              ? "bleed-text" 
              : ""
          }`}
          variants={motionEnabled ? fadeUpSlow : undefined}
        >
          04 — Seasons
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div 
            className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 origin-top"
            style={theme === "upside-down" 
              ? { backgroundColor: "var(--accent-primary)", opacity: 0.3 }
              : { backgroundColor: "rgba(255, 39, 66, 0.3)" }
            }
            variants={motionEnabled ? timelineLine : undefined}
          />

          <motion.div 
            className="space-y-12"
            variants={motionEnabled ? sceneContainer : undefined}
          >
            {timeline.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isHovered={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function TimelineItem({
  item,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  item: typeof timeline[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const { theme } = useTheme();
  const motionEnabled = useMotionEnabled();
  return (
    <motion.div
      variants={motionEnabled ? fadeUp : undefined}
      className="relative flex gap-8"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Timeline Dot */}
      <div className="hidden md:flex items-center justify-center flex-shrink-0">
        <motion.div
          variants={motionEnabled ? timelineDot : undefined}
          animate={motionEnabled ? {
            scale: isHovered ? 1.5 : 1,
            boxShadow: isHovered
              ? (theme === "upside-down" 
                  ? "0 0 30px var(--glow-strong)" 
                  : "0 0 30px rgba(255,39,66,0.8)")
              : (theme === "upside-down"
                  ? "0 0 10px var(--glow-soft)"
                  : "0 0 10px rgba(255,39,66,0.3)"),
          } : {}}
          className="w-4 h-4 rounded-full relative z-10"
          style={{ backgroundColor: theme === "upside-down" ? "var(--accent-primary)" : "#ff2742" }}
        />
      </div>

      {/* Content Card */}
      <motion.div
        animate={{
          backgroundColor: isHovered
            ? (theme === "upside-down" 
                ? "var(--fog-red)" 
                : "rgba(255,39,66,0.1)")
            : (theme === "upside-down"
                ? "var(--surface)"
                : "rgba(15,15,25,0.8)"),
        }}
        className="flex-1"
      >
        <Card 
          className={`transition-all duration-300 ${
            theme === "upside-down"
              ? "border-[var(--surface-border)]/20 hover:border-[var(--surface-border)]/50"
              : "border-neon-red/20 hover:border-neon-red/50"
          }`}
        >
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle>
                {item.season}
              </CardTitle>
              <span className={`text-sm ${
                theme === "upside-down" ? "text-[var(--text-secondary)]" : "text-gray-400"
              }`}>
                {item.period}
              </span>
            </div>
            <h3 className={`text-xl font-semibold mt-2 ${
              theme === "upside-down" ? "text-[var(--text-primary)]" : "text-gray-200"
            }`}>
              {item.title}
            </h3>
            <p className={`text-sm ${
              theme === "upside-down" ? "text-[var(--accent-secondary)]" : "text-neon-blue"
            }`}>
              {item.role}
            </p>
          </CardHeader>
          <CardContent>
            <p className={`mb-4 ${
              theme === "upside-down" ? "text-[var(--text-primary)]" : "text-gray-300"
            }`}>{item.description}</p>
            <ul className="space-y-2">
              {item.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-2 text-sm ${
                    theme === "upside-down" ? "text-[var(--text-secondary)]" : "text-gray-400"
                  }`}
                >
                  <span 
                    className="mt-1"
                    style={{ color: theme === "upside-down" ? "var(--accent-primary)" : "#ff2742" }}
                  >▸</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

