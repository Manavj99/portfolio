"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { skills, SkillCategory } from "@/data/skills";
import { useTheme } from "@/lib/theme-context";
import { AnimatedSection, fadeUp, fadeUpSlow, slideInLeft, slideInRight, sceneContainer } from "@/lib/animations";
import { useMotionEnabled } from "@/lib/use-motion-enabled";

export function Skills() {
  const { theme } = useTheme();
  const motionEnabled = useMotionEnabled();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "All">("All");
  const categories: (SkillCategory | "All")[] = ["All", "AI/ML", "Backend", "Frontend", "DevOps/Cloud", "Data & Tools"];

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <AnimatedSection id="skills" className="py-20 px-4 relative">
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
          Skills
        </motion.h2>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-8"
          variants={motionEnabled ? fadeUp : undefined}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-neon-red text-white shadow-[0_0_15px_rgba(255,39,66,0.5)]"
                  : "bg-dark-panel/50 text-gray-300 border border-neon-red/20 hover:border-neon-red/50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={motionEnabled ? sceneContainer : undefined}
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const { theme } = useTheme();
  const motionEnabled = useMotionEnabled();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  // Alternate between left and right slide-in
  const slideVariant = index % 2 === 0 ? slideInLeft : slideInRight;

  return (
    <motion.div
      variants={motionEnabled ? slideVariant : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={motionEnabled ? { y: -4 } : undefined}
      style={{
        rotateX: isHovered && motionEnabled ? mousePosition.y * 0.05 : 0,
        rotateY: isHovered && motionEnabled ? mousePosition.x * 0.05 : 0,
      }}
    >
      <Card className="h-full cursor-pointer hover:border-neon-red/50 hover:shadow-[0_0_20px_rgba(255,39,66,0.3)] transition-all duration-300 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-lg font-semibold ${theme === "upside-down" ? "text-[var(--text-primary)]" : "text-gray-200"}`}>{skill.name}</h3>
            <span className={`text-xs ${theme === "upside-down" ? "text-[var(--text-secondary)]" : "text-gray-400"}`}>{skill.category}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 mb-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-red to-neon-blue"
              initial={motionEnabled ? { width: 0 } : undefined}
              whileInView={motionEnabled ? { width: `${(skill.level / 5) * 100}%` } : undefined}
              viewport={{ once: true }}
              transition={motionEnabled ? { duration: 1, delay: index * 0.1 } : undefined}
            />
          </div>

          <p className={`text-sm mb-3 ${theme === "upside-down" ? "text-[var(--text-secondary)]" : "text-gray-400"}`}>{skill.description}</p>

          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 10 } : undefined}
            animate={motionEnabled && isHovered ? { opacity: 1, y: 0 } : motionEnabled ? { opacity: 0, y: 10 } : undefined}
            transition={motionEnabled ? { duration: 0.2 } : undefined}
            className={`text-xs ${theme === "upside-down" ? "text-[var(--accent-primary)]" : "text-neon-blue"}`}
          >
            Used in {skill.usedInProjects}+ projects
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

