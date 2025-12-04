"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { Download, Code } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { AnimatedSection, fadeUp, fadeUpSlow, heroBackground, sceneContainer } from "@/lib/animations";
import { useMotionEnabled } from "@/lib/use-motion-enabled";

export function Hero() {
  const { theme } = useTheme();
  const isUpsideDown = theme === "upside-down";
  const motionEnabled = useMotionEnabled();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Parallax scroll for hero background
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -40]);
  const fogY = useTransform(scrollY, [0, 1000], [0, -30]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex(
        (prev) => (prev + 1) % profile.rotatingRoles.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setGlitch(true);
    const timer = setTimeout(() => setGlitch(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.1);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.1);
  };

  return (
    <AnimatedSection
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      variants={sceneContainer}
    >
      <div className="section-shadow" />
      {/* Animated Background - Theme Specific with Parallax */}
      {isUpsideDown ? (
        <motion.div
          className="absolute inset-0"
          style={{ background: "var(--bg-base)" }}
          variants={motionEnabled ? heroBackground : undefined}
          initial={motionEnabled ? "hidden" : undefined}
          animate={motionEnabled ? "show" : undefined}
        >
          <motion.div
            className="absolute inset-0 center-glow"
            style={{
              background: `radial-gradient(circle at ${x}px ${y}px, rgba(127, 14, 31, 0.45) 0%, transparent 60%)`,
              y: motionEnabled ? backgroundY : 0,
            }}
          />
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at ${-x}px ${-y}px, var(--fog-red) 0%, transparent 50%)`,
              y: motionEnabled ? fogY : 0,
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#0d0d0f] via-[#151518] to-[#1a1a2e]"
          variants={motionEnabled ? heroBackground : undefined}
          initial={motionEnabled ? "hidden" : undefined}
          animate={motionEnabled ? "show" : undefined}
        >
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at ${x}px ${y}px, rgba(74,158,255,0.2) 0%, transparent 50%)`,
              y: motionEnabled ? backgroundY : 0,
            }}
          />
          <motion.div
            className="absolute inset-0 opacity-15"
            style={{
              background: `radial-gradient(circle at ${-x}px ${-y}px, rgba(123,104,238,0.2) 0%, transparent 50%)`,
              y: motionEnabled ? fogY : 0,
            }}
          />
        </motion.div>
      )}

      {/* Fog Effect - Only in Upside Down with Parallax */}
      {isUpsideDown && (
        <motion.div
          className="absolute inset-0 fog-layer bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjkiIG51bU9jdGF2ZXM9IjQiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')]"
          style={{ y: motionEnabled ? fogY : 0 }}
        />
      )}

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1
          className={`text-5xl md:text-7xl mb-6 hero-title upside-down-heading ${
            isUpsideDown 
              ? (glitch ? "animate-glitch" : "") 
              : ""
          } ${isUpsideDown ? "glitch-text" : ""}`}
          onMouseEnter={() => {
            if (isUpsideDown) {
              setGlitch(true);
              setTimeout(() => setGlitch(false), 300);
            }
          }}
          variants={motionEnabled ? fadeUpSlow : undefined}
        >
          <span>{profile.tagline}</span>
        </motion.h1>

        <motion.p
          className={`text-xl md:text-2xl mb-4 hero-body-text ${
            isUpsideDown ? "hero-body-text" : "text-gray-300"
          }`}
          variants={motionEnabled ? fadeUp : undefined}
        >
          {profile.bio}
        </motion.p>

        <motion.div
          className={`text-lg md:text-xl mb-8 h-8 ${
            isUpsideDown ? "text-[var(--accent-primary)]" : "text-[#4a9eff]"
          }`}
          variants={motionEnabled ? fadeUp : undefined}
        >
          {profile.rotatingRoles.map((role, index) => (
            <span
              key={role}
              className={`absolute left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
                index === currentRoleIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {role}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={motionEnabled ? fadeUp : undefined}
        >
          <Button
            size="lg"
            className={`group relative overflow-hidden transition-all duration-300 ${
              isUpsideDown 
                ? "bg-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/90 hover:shadow-[0_0_30px_var(--glow-strong)] hover:scale-105" 
                : "bg-[#4a9eff] hover:bg-[#4a9eff]/90 hover:shadow-[0_0_20px_rgba(74,158,255,0.5)] hover:scale-105"
            }`}
            onMouseEnter={(e) => {
              if (isUpsideDown) {
                e.currentTarget.classList.add("animate-flicker");
              }
            }}
            onClick={() => {
              document.getElementById("experiments")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Code className="mr-2 w-5 h-5" />
            View Experiments
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={`group relative overflow-hidden transition-all duration-300 ${
              isUpsideDown
                ? "border-[var(--surface-border)]/60 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 hover:shadow-[0_0_20px_var(--glow-soft)] hover:scale-105"
                : "border-[rgba(74,158,255,0.3)] text-[#4a9eff] hover:bg-[#4a9eff]/10 hover:shadow-[0_0_15px_rgba(74,158,255,0.3)] hover:scale-105"
            }`}
            onMouseEnter={(e) => {
              if (isUpsideDown) {
                e.currentTarget.classList.add("animate-flicker");
              }
            }}
            onClick={() => {
              // Placeholder for resume download
              window.open("/resume.pdf", "_blank");
            }}
          >
            <Download className="mr-2 w-5 h-5" />
            Download Resume
          </Button>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

