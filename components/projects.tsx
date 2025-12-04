"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects, ProjectCategory } from "@/data/projects";
import { X, ExternalLink, Github, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/lib/theme-context";
import { AnimatedSection, fadeUp, fadeUpSlow, slideInUp, sceneContainer, modalBackdrop, modalContent } from "@/lib/animations";
import { useMotionEnabled } from "@/lib/use-motion-enabled";

export function Projects() {
  const { theme } = useTheme();
  const motionEnabled = useMotionEnabled();
  const isUpsideDown = theme === "upside-down";
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "All">("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [showDeepDive, setShowDeepDive] = useState(false);

  const categories: (ProjectCategory | "All")[] = ["All", "AI/ML", "Agents", "Web", "Computer Vision", "Data"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <AnimatedSection id="experiments" className="py-20 px-4 relative">
      <div className="section-shadow" />
      <div className="container mx-auto">
        <motion.div
          className="relative"
          variants={motionEnabled ? fadeUpSlow : undefined}
        >
          <h2 
            className={`text-4xl md:text-5xl mb-8 section-title upside-down-heading ${
              isUpsideDown 
                ? "glitch-text" 
                : ""
            }`}
          >
            02 — Experiments
          </h2>
          {isUpsideDown && (
            <motion.div
              className="absolute -left-4 top-0 bottom-0 w-1 bg-neon-red"
              variants={motionEnabled ? { hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.8, delay: 0.2 } } } : undefined}
            />
          )}
        </motion.div>

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
                  ? isUpsideDown
                    ? "bg-[var(--accent-primary)] text-white shadow-[0_0_20px_var(--glow-strong)]"
                    : "bg-[#4a9eff] text-white shadow-[0_0_15px_rgba(74,158,255,0.5)]"
                  : isUpsideDown
                    ? "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--surface-border)]/40 hover:border-[var(--surface-border)]/60"
                    : "bg-[rgba(20,20,25,0.7)] text-gray-300 border border-[rgba(74,158,255,0.2)] hover:border-[rgba(74,158,255,0.4)]"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={motionEnabled ? sceneContainer : undefined}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => {
                setSelectedProject(null);
                setShowDeepDive(false);
              }}
              onDeepDive={() => setShowDeepDive(true)}
              showDeepDive={showDeepDive}
            />
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: typeof projects[0];
  index: number;
  onClick: () => void;
}) {
  const { theme } = useTheme();
  const motionEnabled = useMotionEnabled();
  const isUpsideDown = theme === "upside-down";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={motionEnabled ? slideInUp : undefined}
      whileHover={motionEnabled ? { y: -8, scale: 1.02 } : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={`h-full cursor-pointer overflow-hidden transition-all duration-300 ${
          isUpsideDown
            ? "border-[var(--surface-border)]/30 hover:border-[var(--surface-border)]/60 hover:shadow-[0_0_30px_var(--glow-soft)] chromatic-hover"
            : "border-[rgba(74,158,255,0.2)] hover:border-[rgba(74,158,255,0.4)] hover:shadow-[0_0_20px_rgba(74,158,255,0.3)]"
        }`}
        onClick={onClick}
      >
        <div 
          className={`relative h-48 overflow-hidden ${
            isUpsideDown
              ? "bg-gradient-to-br from-[var(--fog-red)] to-[var(--fog-purple)]"
              : "bg-gradient-to-br from-[rgba(74,158,255,0.2)] to-[rgba(123,104,238,0.2)]"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
            {project.title.charAt(0)}
          </div>
          {isHovered && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              className={`absolute inset-0 ${
                isUpsideDown
                  ? "bg-gradient-to-br from-[var(--fog-red)] to-[var(--fog-purple)]"
                  : "bg-gradient-to-br from-[rgba(74,158,255,0.15)] to-[rgba(123,104,238,0.15)]"
              }`}
            />
          )}
        </div>
        <CardHeader>
          <motion.div
            animate={isHovered && isUpsideDown ? { x: [0, -2, 2, -2, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <CardTitle 
              className={isUpsideDown ? "text-[var(--accent-primary)]" : "text-[#4a9eff]"}
              style={isUpsideDown && isHovered ? {
                textShadow: "0 0 15px var(--glow-strong)",
              } : {}}
            >
              {project.title}
            </CardTitle>
          </motion.div>
          <p className={`text-sm ${isUpsideDown ? "text-[var(--text-secondary)]" : "text-gray-400"}`}>
            {project.tagline}
          </p>
        </CardHeader>
        <CardContent>
          <p className={`text-sm mb-4 line-clamp-2 ${
            isUpsideDown ? "text-[var(--text-primary)]" : "text-gray-300"
          }`}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className={`px-2 py-1 text-xs rounded ${
                  isUpsideDown
                    ? "bg-[var(--surface)] border border-[var(--surface-border)]/40 text-[var(--text-secondary)]"
                    : "bg-[rgba(20,20,25,0.7)] border border-[rgba(74,158,255,0.2)] text-gray-400"
                }`}
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
  onDeepDive,
  showDeepDive,
}: {
  project: typeof projects[0];
  onClose: () => void;
  onDeepDive: () => void;
  showDeepDive: boolean;
}) {
  const { theme } = useTheme();
  const motionEnabled = useMotionEnabled();
  const isUpsideDown = theme === "upside-down";
  return (
    <>
      <motion.div
        variants={motionEnabled ? modalBackdrop : undefined}
        initial={motionEnabled ? "hidden" : undefined}
        animate={motionEnabled ? "show" : undefined}
        exit={motionEnabled ? "exit" : undefined}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          variants={motionEnabled ? modalContent : undefined}
          onClick={(e) => e.stopPropagation()}
          className={`border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
            isUpsideDown
              ? "bg-[var(--bg-base)] border-[var(--surface-border)]/50"
              : "bg-dark-bg border-neon-red/50"
          }`}
        >
          <div 
            className="relative h-64"
            style={isUpsideDown ? {
              background: `linear-gradient(135deg, var(--fog-red) 0%, var(--fog-purple) 100%)`,
            } : {
              background: "linear-gradient(135deg, rgba(255,39,66,0.2) 0%, rgba(0,212,255,0.2) 100%)",
            }}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                isUpsideDown
                  ? "bg-[var(--surface-soft)] hover:bg-[var(--accent-primary)]"
                  : "bg-dark-panel/80 hover:bg-neon-red"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <h2 
              className={`text-3xl font-bold mb-2 ${
                isUpsideDown ? "text-[var(--accent-primary)]" : "text-neon-red"
              }`}
            >
              {project.title}
            </h2>
            <p className={`text-xl mb-6 ${
              isUpsideDown ? "text-[var(--text-primary)]" : "text-gray-300"
            }`}>
              {project.tagline}
            </p>

            {project.problem && project.approach && project.result && (
              <div className="space-y-6 mb-6">
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isUpsideDown ? "text-[var(--accent-secondary)]" : "text-neon-blue"
                  }`}>
                    Problem
                  </h3>
                  <p className={isUpsideDown ? "text-[var(--text-primary)]" : "text-gray-300"}>
                    {project.problem}
                  </p>
                </div>
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isUpsideDown ? "text-[var(--accent-secondary)]" : "text-neon-blue"
                  }`}>
                    Approach
                  </h3>
                  <p className={isUpsideDown ? "text-[var(--text-primary)]" : "text-gray-300"}>
                    {project.approach}
                  </p>
                </div>
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isUpsideDown ? "text-[var(--accent-secondary)]" : "text-neon-blue"
                  }`}>
                    Result
                  </h3>
                  <p className={isUpsideDown ? "text-[var(--text-primary)]" : "text-gray-300"}>
                    {project.result}
                  </p>
                </div>
              </div>
            )}

            {project.architecture && (
              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-3 ${
                  isUpsideDown ? "text-[var(--accent-secondary)]" : "text-neon-blue"
                }`}>
                  Architecture
                </h3>
                <ul className="space-y-2">
                  {project.architecture.map((item, index) => (
                    <li 
                      key={index} 
                      className={`flex items-start gap-2 ${
                        isUpsideDown ? "text-[var(--text-primary)]" : "text-gray-300"
                      }`}
                    >
                      <ChevronRight 
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: isUpsideDown ? "var(--accent-primary)" : "#ff2742" }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.metrics && (
              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-3 ${
                  isUpsideDown ? "text-[var(--accent-secondary)]" : "text-neon-blue"
                }`}>
                  Impact Metrics
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {project.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className={`border rounded p-4 text-center ${
                        isUpsideDown
                          ? "bg-[var(--surface)] border-[var(--surface-border)]/20"
                          : "bg-dark-panel/50 border-neon-red/20"
                      }`}
                    >
                      <p 
                        className="text-2xl font-bold"
                        style={{ color: isUpsideDown ? "var(--accent-primary)" : "#ff2742" }}
                      >
                        {metric.value}
                      </p>
                      <p className={`text-sm ${
                        isUpsideDown ? "text-[var(--text-secondary)]" : "text-gray-400"
                      }`}>
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 border border-neon-red/50 text-neon-red hover:bg-neon-red/10 hover:border-neon-red hover:shadow-[0_0_15px_rgba(255,39,66,0.3)] h-10 px-4 py-2"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              )}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 border border-neon-red/50 text-neon-red hover:bg-neon-red/10 hover:border-neon-red hover:shadow-[0_0_15px_rgba(255,39,66,0.3)] h-10 px-4 py-2"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              )}
              {project.isFlagship && (
                <Button onClick={onDeepDive}>
                  Deep Dive <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Deep Dive Drawer */}
      <AnimatePresence>
        {showDeepDive && (
          <motion.div
            variants={motionEnabled ? modalBackdrop : undefined}
            initial={motionEnabled ? "hidden" : undefined}
            animate={motionEnabled ? "show" : undefined}
            exit={motionEnabled ? "exit" : undefined}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            onClick={onClose}
          >
            <motion.div
              initial={motionEnabled ? { x: "100%" } : undefined}
              animate={motionEnabled ? { x: 0 } : undefined}
              exit={motionEnabled ? { x: "100%" } : undefined}
              transition={motionEnabled ? { type: "spring", damping: 25, stiffness: 200 } : undefined}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-dark-bg border-l border-neon-red/50 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neon-red">
                  Deep Dive: {project.title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-neon-red/20 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6 text-gray-300">
                <p>{project.description}</p>
                {project.architecture && (
                  <div>
                    <h3 className="text-xl font-semibold text-neon-blue mb-3">
                      Detailed Architecture
                    </h3>
                    <ol className="space-y-3 list-decimal list-inside">
                      {project.architecture.map((item, index) => (
                        <li key={index} className="pl-2">
                          {item}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

