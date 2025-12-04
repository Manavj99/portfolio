"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DemoPage() {
  const { theme, toggleTheme } = useTheme();
  const [previewTheme, setPreviewTheme] = useState<"normal" | "upside-down">("normal");

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-neon-red">
            Dimension Switch Demo
          </h1>
          <p className="text-xl text-gray-300">
            Compare the two completely different visual worlds
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Normal World Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              className={`h-full ${
                previewTheme === "normal"
                  ? "border-[rgba(74,158,255,0.5)] shadow-[0_0_30px_rgba(74,158,255,0.3)]"
                  : "border-[rgba(74,158,255,0.2)]"
              } transition-all duration-300`}
            >
              <CardHeader>
                <CardTitle className="text-[#4a9eff]">Normal World</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="rounded-lg p-8 min-h-[400px] relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #0d0d0f 0%, #151518 50%, #1a1a2e 100%)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 20% 50%, rgba(74, 158, 255, 0.1) 0%, transparent 50%)",
                    }}
                  />
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-2xl font-bold text-[#4a9eff]">
                      Clean & Modern
                    </h3>
                    <p className="text-gray-300">
                      Smooth animations, soft blue/purple gradients, minimal
                      glow effects
                    </p>
                    <div className="space-y-2">
                      <div className="bg-[rgba(20,20,25,0.7)] border border-[rgba(74,158,255,0.2)] rounded p-4">
                        <p className="text-sm text-gray-300">Card Example</p>
                      </div>
                      <div className="bg-[rgba(20,20,25,0.7)] border border-[rgba(74,158,255,0.2)] rounded p-4">
                        <p className="text-sm text-gray-300">Smooth Hover</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upside Down Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card
              className={`h-full ${
                previewTheme === "upside-down"
                  ? "border-neon-red/60 shadow-[0_0_40px_rgba(255,39,66,0.5)]"
                  : "border-neon-red/30"
              } transition-all duration-300`}
            >
              <CardHeader>
                <CardTitle className="text-neon-red glitch-text">
                  Upside Down
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="rounded-lg p-8 min-h-[400px] relative overflow-hidden"
                  style={{
                    background: "#000000",
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, rgba(255, 39, 66, 0.15) 0%, transparent 50%)",
                  }}
                >
                  <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjkiIG51bU9jdGF2ZXM9IjQiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')]" />
                  <div className="relative z-10 space-y-4">
                    <h3
                      className="text-2xl font-bold text-neon-red"
                      style={{
                        textShadow:
                          "0 0 10px rgba(255,39,66,0.5), 0 0 20px rgba(255,39,66,0.3)",
                      }}
                    >
                      Dark & Glitchy
                    </h3>
                    <p className="text-[#ff6b7a]">
                      Red neon borders, heavy glow, chromatic aberration, fog
                      effects
                    </p>
                    <div className="space-y-2">
                      <div className="bg-[rgba(20,0,0,0.9)] border border-neon-red/60 rounded p-4 shadow-[0_0_20px_rgba(255,39,66,0.3)]">
                        <p className="text-sm text-neon-red">Card Example</p>
                      </div>
                      <div className="bg-[rgba(20,0,0,0.9)] border border-neon-red/60 rounded p-4 shadow-[0_0_20px_rgba(255,39,66,0.3)]">
                        <p className="text-sm text-neon-red">Glitch Hover</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <Button
              onClick={() => setPreviewTheme("normal")}
              className={
                previewTheme === "normal"
                  ? "bg-[#4a9eff] text-white"
                  : "border-[rgba(74,158,255,0.3)] text-[#4a9eff]"
              }
            >
              Preview Normal
            </Button>
            <Button
              onClick={() => setPreviewTheme("upside-down")}
              className={
                previewTheme === "upside-down"
                  ? "bg-neon-red text-white"
                  : "border-neon-red/30 text-neon-red"
              }
            >
              Preview Upside Down
            </Button>
          </div>
          <Button
            onClick={toggleTheme}
            className="mt-4 bg-neon-red hover:bg-neon-red/90"
          >
            {theme === "normal"
              ? "Switch to Upside Down Mode"
              : "Switch to Normal Mode"}
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            Current theme: <span className="text-neon-red">{theme}</span>
          </p>
        </div>
      </div>
    </main>
  );
}

