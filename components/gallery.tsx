"use client";

import React, { useState } from "react";
// Gallery component with cinematic animations
import { motion, AnimatePresence } from "framer-motion";
import { gallery } from "@/data/gallery";
import { X } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { AnimatedSection, fadeUp, fadeUpSlow, sceneContainer, lightboxBackdrop, lightboxImage } from "@/lib/animations";
import { useMotionEnabled } from "@/lib/use-motion-enabled";

export function Gallery() {
  const { theme } = useTheme();
  const motionEnabled = useMotionEnabled();
  const [selectedImage, setSelectedImage] = useState<typeof gallery[0] | null>(null);

  return (
    <AnimatedSection id="gallery" className="py-20 px-4 relative">
      <div className="section-shadow" />
      <div className="container mx-auto">
        <motion.h2
          className={`text-4xl md:text-5xl mb-8 section-title upside-down-heading ${
            theme === "upside-down" 
              ? "bleed-text" 
              : ""
          }`}
          variants={motionEnabled ? fadeUpSlow : undefined}
        >
          03 — Visual Experiments
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={motionEnabled ? sceneContainer : undefined}
        >
          {gallery.map((item, index) => (
            <GalleryItem
              key={item.id}
              item={item}
              index={index}
              onClick={() => setSelectedImage(item)}
            />
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              variants={motionEnabled ? lightboxBackdrop : undefined}
              initial={motionEnabled ? "hidden" : undefined}
              animate={motionEnabled ? "show" : undefined}
              exit={motionEnabled ? "exit" : undefined}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                variants={motionEnabled ? lightboxImage : undefined}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full"
              >
                <div 
                  className={`relative border rounded-lg overflow-hidden ${
                    theme === "upside-down"
                      ? "bg-[var(--surface)] border-[var(--surface-border)]/50"
                      : "bg-dark-panel/90 border-neon-red/50"
                  }`}
                >
                  <button
                    onClick={() => setSelectedImage(null)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${
                      theme === "upside-down"
                        ? "bg-[var(--surface-soft)] hover:bg-[var(--accent-primary)]"
                        : "bg-dark-panel/80 hover:bg-neon-red"
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div 
                    className="h-96 flex items-center justify-center"
                    style={theme === "upside-down" ? {
                      background: `linear-gradient(135deg, var(--fog-red) 0%, var(--fog-purple) 100%)`,
                    } : {
                      background: "linear-gradient(135deg, rgba(255,39,66,0.2) 0%, rgba(0,212,255,0.2) 100%)",
                    }}
                  >
                    <span className="text-6xl opacity-20">
                      {selectedImage.title.charAt(selectedImage.title.length - 1)}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 
                      className={`text-2xl font-bold mb-2 ${
                        theme === "upside-down" ? "text-[var(--accent-primary)]" : "text-neon-red"
                      }`}
                    >
                      {selectedImage.title}
                    </h3>
                    <p className={`mb-2 ${
                      theme === "upside-down" ? "text-[var(--text-primary)]" : "text-gray-300"
                    }`}>
                      {selectedImage.caption}
                    </p>
                    {selectedImage.description && (
                      <p className={`text-sm ${
                        theme === "upside-down" ? "text-[var(--text-secondary)]" : "text-gray-400"
                      }`}>
                        {selectedImage.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

function GalleryItem({
  item,
  index,
  onClick,
}: {
  item: typeof gallery[0];
  index: number;
  onClick: () => void;
}) {
  const { theme } = useTheme();
  const motionEnabled = useMotionEnabled();
  const isUpsideDown = theme === "upside-down";
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.1,
      y: (e.clientY - rect.top - rect.height / 2) * 0.1,
    });
  };

  return (
    <motion.div
      variants={motionEnabled ? fadeUp : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={motionEnabled ? { y: -4, scale: 1.02 } : undefined}
      style={{
        x: isHovered && motionEnabled ? mousePosition.x : 0,
        y: isHovered && motionEnabled ? mousePosition.y : 0,
      }}
      className="relative h-64 overflow-hidden rounded-lg cursor-pointer group"
      onClick={onClick}
    >
      <div 
        className={`absolute inset-0 ${
          isUpsideDown ? "" : "bg-gradient-to-br from-neon-red/20 to-neon-blue/20"
        }`}
          style={isUpsideDown ? {
            background: `linear-gradient(135deg, var(--fog-red) 0%, var(--fog-purple) 100%)`,
          } : {}}
      >
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
          {item.title.charAt(item.title.length - 1)}
        </div>
      </div>
        <motion.div
          initial={motionEnabled ? { opacity: 0, y: 20 } : undefined}
          animate={motionEnabled && isHovered ? { opacity: 1, y: 0 } : motionEnabled ? { opacity: 0, y: 20 } : undefined}
          className="absolute inset-0 flex flex-col items-center justify-center p-4"
          style={isUpsideDown ? {
            background: "var(--bg-base)",
            opacity: 0.6,
          } : {
            background: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <h3 
            className={`text-xl font-bold mb-2 ${
              isUpsideDown ? "text-[var(--accent-primary)]" : "text-neon-red"
            }`}
          >
            {item.title}
          </h3>
          <p className={`text-sm text-center ${
            isUpsideDown ? "text-[var(--text-secondary)]" : "text-gray-300"
          }`}>
            {item.caption}
          </p>
        </motion.div>
    </motion.div>
  );
}

