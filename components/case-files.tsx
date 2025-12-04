"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { posts } from "@/data/posts";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { fadeUp, fadeUpSlow, sceneContainer } from "@/lib/animations";
import { useMotionEnabled } from "@/lib/use-motion-enabled";

export function CaseFiles() {
  const { theme } = useTheme();
  const motionEnabled = useMotionEnabled();
  
  const sectionProps = motionEnabled ? {
    variants: sceneContainer,
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.3 }
  } : {};
  
  const headingProps = motionEnabled ? {
    variants: fadeUpSlow
  } : {};
  
  const gridProps = motionEnabled ? {
    variants: sceneContainer
  } : {};
  
  const SectionWrapper = motionEnabled ? motion.section : "section";
  const HeadingWrapper = motionEnabled ? motion.h2 : "h2";
  const DivWrapper = motionEnabled ? motion.div : "div";
  
  return (
    <SectionWrapper
      id="case-files"
      className="py-20 px-4 relative"
      {...sectionProps}
    >
      <div className="section-shadow" />
      <div className="container mx-auto">
        <HeadingWrapper
          className={`text-4xl md:text-5xl mb-8 section-title upside-down-heading ${
            theme === "upside-down" 
              ? "bleed-text" 
              : ""
          }`}
          {...headingProps}
        >
          05 — Case Files
        </HeadingWrapper>

        <DivWrapper 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          {...gridProps}
        >
          {posts.map((post, index) => (
            <CaseFileCard key={post.slug} post={post} index={index} />
          ))}
        </DivWrapper>
      </div>
    </SectionWrapper>
  );
}

function CaseFileCard({
  post,
  index,
}: {
  post: typeof posts[0];
  index: number;
}) {
  const { theme } = useTheme();
  const motionEnabled = useMotionEnabled();
  const [isHovered, setIsHovered] = React.useState(false);
  
  const cardProps = motionEnabled ? {
    variants: fadeUp,
    whileHover: { y: -4 }
  } : {};
  
  const CardWrapper = motionEnabled ? motion.div : "div";
  const InnerDivWrapper = motionEnabled ? motion.div : "div";
  
  const innerDivProps = motionEnabled ? {
    animate: isHovered ? { x: [0, -2, 2, -2, 0] } : {},
    transition: { duration: 0.3 }
  } : {};

  return (
    <CardWrapper
      {...cardProps}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/case-files/${post.slug}`}>
        <Card 
          className={`h-full cursor-pointer transition-all duration-300 ${
            theme === "upside-down"
              ? "hover:border-[var(--surface-border)]/50 hover:shadow-[0_0_20px_var(--glow-soft)]"
              : "hover:border-neon-red/50 hover:shadow-[0_0_20px_rgba(255,39,66,0.3)]"
          }`}
        >
          <CardHeader>
            <InnerDivWrapper {...innerDivProps}>
              <CardTitle className="mb-2">
                {post.title}
              </CardTitle>
            </InnerDivWrapper>
            <div className={`flex items-center gap-4 text-sm ${
              theme === "upside-down" ? "text-[var(--text-secondary)]" : "text-gray-400"
            }`}>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className={`mb-4 ${
              theme === "upside-down" ? "text-[var(--text-primary)]" : "text-gray-300"
            }`}>{post.summary}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-1 text-xs rounded ${
                    theme === "upside-down"
                      ? "bg-[var(--surface)] border border-[var(--surface-border)]/20 text-[var(--text-secondary)]"
                      : "bg-dark-panel/50 border border-neon-red/20 text-gray-400"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className={`flex items-center text-sm ${
              theme === "upside-down" ? "text-[var(--accent-secondary)]" : "text-neon-blue"
            }`}>
              Read more <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </CardWrapper>
  );
}

