"use client";

import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Gallery } from "@/components/gallery";
import { Timeline } from "@/components/timeline";
import { CaseFiles } from "@/components/case-files";
import { Contact } from "@/components/contact";
import { ParallaxBackground } from "@/components/parallax-background";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <ParallaxBackground />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Gallery />
      <Timeline />
      <CaseFiles />
      <Contact />
    </main>
  );
}

