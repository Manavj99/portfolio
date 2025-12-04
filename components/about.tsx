"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/data/profile";
import { MapPin, Briefcase, Code, GraduationCap } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { AnimatedSection, fadeUp, fadeUpSlow } from "@/lib/animations";
import { useMotionEnabled } from "@/lib/use-motion-enabled";

const quickFacts = [
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    color: "text-neon-red",
  },
  {
    icon: Briefcase,
    label: "Open to Relocation",
    value: profile.openToRelocation ? "Yes" : "No",
    color: "text-neon-blue",
  },
  {
    icon: Code,
    label: "Tech Stack",
    value: profile.techStack.slice(0, 3).join(", ") + "...",
    color: "text-neon-purple",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "MS CS, Kent State",
    color: "text-neon-red",
  },
];

export function About() {
  const { theme } = useTheme();
  const motionEnabled = useMotionEnabled();
  return (
    <AnimatedSection id="about" className="py-20 px-4 relative">
      <div className="section-shadow" />
      <div className="container mx-auto">
        <motion.h2
          className={`text-4xl md:text-5xl mb-4 section-title upside-down-heading ${
            theme === "upside-down" 
              ? "bleed-text" 
              : ""
          }`}
          variants={motionEnabled ? fadeUpSlow : undefined}
        >
          01 — The Beginning
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Left Column - Bio */}
          <motion.div variants={motionEnabled ? fadeUp : undefined}>
            <Card className="h-full hover:border-neon-red/50 hover:shadow-[0_0_20px_rgba(255,39,66,0.2)] transition-all duration-300">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent className={`space-y-4 ${theme === "upside-down" ? "text-[var(--text-primary)]" : "text-gray-300"}`}>
                <p>{profile.bio}</p>
                <motion.div 
                  className="space-y-3"
                  variants={motionEnabled ? fadeUp : undefined}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${theme === "upside-down" ? "text-[var(--accent-secondary)]" : "text-neon-blue"}`}>
                    Education
                  </h3>
                  {profile.education.map((edu, index) => (
                    <div key={index} className={`border-l-2 pl-4 ${theme === "upside-down" ? "border-[var(--surface-border)]/30" : "border-neon-red/30"}`}>
                      <p className={`font-semibold ${theme === "upside-down" ? "text-[var(--text-primary)]" : "text-gray-200"}`}>{edu.degree}</p>
                      <p className={`text-sm ${theme === "upside-down" ? "text-[var(--text-secondary)]" : "text-gray-400"}`}>{edu.institution}</p>
                      <p className={`text-xs ${theme === "upside-down" ? "text-[var(--text-muted)]" : "text-gray-500"}`}>{edu.period}</p>
                    </div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Quick Facts */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={motionEnabled ? fadeUp : undefined}
          >
            {quickFacts.map((fact, index) => (
              <motion.div
                key={index}
                variants={motionEnabled ? fadeUp : undefined}
                whileHover={motionEnabled ? { y: -4, scale: 1.02 } : undefined}
              >
                <Card className="h-full cursor-pointer hover:border-neon-red/50 hover:shadow-[0_0_15px_rgba(255,39,66,0.3)] transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <fact.icon
                      className={`w-8 h-8 mb-3 ${fact.color} transition-transform duration-300 group-hover:rotate-12`}
                    />
                    <p className={`text-xs mb-1 ${theme === "upside-down" ? "text-[var(--text-secondary)]" : "text-gray-400"}`}>{fact.label}</p>
                    <p className={`text-sm font-semibold ${theme === "upside-down" ? "text-[var(--text-primary)]" : "text-gray-200"}`}>
                      {fact.value}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

