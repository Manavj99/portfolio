"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { useMotionEnabled } from "./use-motion-enabled";

// Cinematic easing curve - smooth, no bounce
const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Animation Variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cinematicEase },
  },
};

export const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: cinematicEase },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: cinematicEase },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: cinematicEase },
  },
};

export const slideInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cinematicEase },
  },
};

export const sceneContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

// Modal/Drawer animations
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: cinematicEase },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: { duration: 0.25, ease: cinematicEase },
  },
};

// Lightbox animations
export const lightboxBackdrop: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

export const lightboxImage: Variants = {
  hidden: { scale: 0.96, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: cinematicEase },
  },
  exit: {
    scale: 0.96,
    opacity: 0,
    transition: { duration: 0.3, ease: cinematicEase },
  },
};

// Hero background animation
export const heroBackground: Variants = {
  hidden: { opacity: 0, scale: 1.02 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: cinematicEase },
  },
};

// Timeline dot animation
export const timelineDot: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: cinematicEase },
  },
};

// Timeline line animation
export const timelineLine: Variants = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 0.8, ease: cinematicEase },
  },
};

// AnimatedSection Component
export interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variants?: Variants;
}

function AnimatedSectionComponent({
  children,
  className = "",
  id,
  variants = sceneContainer,
}: AnimatedSectionProps) {
  const [mounted, setMounted] = React.useState(false);
  const motionEnabled = useMotionEnabled();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial mount, always render content (no animations)
  if (!mounted || !motionEnabled) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  // Once mounted and motion is enabled, apply animations
  return (
    <motion.section
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      animate="show"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.section>
  );
}

AnimatedSectionComponent.displayName = "AnimatedSection";

export const AnimatedSection = AnimatedSectionComponent;

