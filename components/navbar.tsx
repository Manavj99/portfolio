"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experiments", label: "Experiments" },
  { href: "#gallery", label: "Gallery" },
  { href: "#seasons", label: "Seasons" },
  { href: "#case-files", label: "Case Files" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isUpsideDown = theme === "upside-down";
  const [activeLink, setActiveLink] = useState("");
  const [bulbStates, setBulbStates] = useState<boolean[]>(
    new Array(8).fill(false)
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveLink(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 8);
      setBulbStates((prev) => {
        const newState = [...prev];
        newState[randomIndex] = !newState[randomIndex];
        setTimeout(() => {
          setBulbStates((current) => {
            const updated = [...current];
            updated[randomIndex] = !updated[randomIndex];
            return updated;
          });
        }, 200);
        return newState;
      });
    }, 3000);

    // Random full flicker for Upside Down mode
    let flickerInterval: NodeJS.Timeout | null = null;
    if (isUpsideDown) {
      flickerInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          // Brief flicker of all bulbs
          setBulbStates(new Array(8).fill(false));
          setTimeout(() => {
            setBulbStates(new Array(8).fill(true));
            setTimeout(() => {
              setBulbStates(new Array(8).fill(false));
            }, 100);
          }, 50);
        }
      }, 5000 + Math.random() * 10000); // Every 5-15 seconds
    }

    return () => {
      clearInterval(interval);
      if (flickerInterval) clearInterval(flickerInterval);
    };
  }, [isUpsideDown]);

  const handleLinkHover = (index: number) => {
    setBulbStates((prev) => {
      const newState = [...prev];
      newState[index] = true;
      newState[index + 1] = true;
      return newState;
    });
  };

  const handleLinkLeave = () => {
    setBulbStates(new Array(8).fill(false));
  };

  const navBg = isUpsideDown 
    ? "bg-black/90 backdrop-blur-md border-b border-neon-red/40" 
    : "bg-[#0d0d0f]/80 backdrop-blur-md border-b border-[rgba(74,158,255,0.2)]";
  const logoColor = isUpsideDown ? "text-neon-red" : "text-[#4a9eff]";
  const linkColor = isUpsideDown 
    ? "text-[#ff6b7a] hover:text-neon-red" 
    : "text-gray-300 hover:text-[#4a9eff]";
  const activeIndicator = isUpsideDown ? "bg-neon-red" : "bg-[#4a9eff]";
  const bulbColor = isUpsideDown 
    ? (lit: boolean) => lit ? "text-neon-red" : "text-gray-700"
    : (lit: boolean) => lit ? "text-[#4a9eff]" : "text-gray-600";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${navBg} transition-all duration-500`}>
      {/* Fairy Lights */}
      <div className={`flex justify-center gap-1 py-1 ${isUpsideDown ? "opacity-80" : "opacity-60"}`}>
        {bulbStates.map((lit, index) => (
          <motion.div
            key={index}
            animate={{
              opacity: lit ? 1 : (isUpsideDown ? 0.4 : 0.3),
              scale: lit ? 1.2 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Lightbulb
              className={`w-3 h-3 ${bulbColor(lit)} ${
                isUpsideDown && lit ? "drop-shadow-[0_0_8px_var(--glow-strong)]" : ""
              }`}
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="#home" 
            className={`text-2xl font-bold ${logoColor} transition-colors duration-500 ${
              isUpsideDown ? "glitch-text" : ""
            }`}
          >
            MJ
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => handleLinkHover(index)}
                onMouseLeave={handleLinkLeave}
                className={`relative text-sm ${linkColor} transition-colors duration-200 ${
                  isUpsideDown ? "font-semibold" : ""
                }`}
              >
                {link.label}
                {activeLink === link.href && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${activeIndicator} ${
                      isUpsideDown ? "shadow-[0_0_10px_var(--glow-strong)]" : ""
                    }`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className={`text-xs transition-all duration-300 ${
              isUpsideDown 
                ? "border-[var(--surface-border)]/60 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 hover:shadow-[0_0_15px_var(--glow-soft)]" 
                : "border-[rgba(74,158,255,0.3)] text-[#4a9eff] hover:bg-[#4a9eff]/10"
            }`}
          >
            {theme === "normal" ? "Enter Upside Down" : "Return to Normal"}
          </Button>
        </div>
      </div>
    </nav>
  );
}

