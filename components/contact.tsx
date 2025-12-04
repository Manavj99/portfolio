"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/data/profile";
import { Mail, Linkedin, Github, Check } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { AnimatedSection, fadeUp, fadeUpSlow } from "@/lib/animations";
import { useMotionEnabled } from "@/lib/use-motion-enabled";

export function Contact() {
  const { theme } = useTheme();
  const motionEnabled = useMotionEnabled();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection id="contact" className="py-20 px-4 relative">
      <div className="section-shadow" />
      <div className="container mx-auto max-w-4xl">
        <motion.div variants={motionEnabled ? fadeUpSlow : undefined}>
          <h2 
            className={`text-4xl md:text-5xl mb-4 section-title upside-down-heading ${
              theme === "upside-down" 
                ? "bleed-text" 
                : ""
            }`}
          >
            06 — Contact
          </h2>
          <motion.p 
            className="text-lg text-gray-300 mb-12"
            variants={motionEnabled ? fadeUp : undefined}
          >
            Open to AI/ML, full-stack, and agentic systems roles & collaborations.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            className="space-y-4"
            variants={motionEnabled ? fadeUp : undefined}
          >
            <Card className="hover:border-neon-red/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-neon-red" />
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-gray-300 hover:text-neon-red transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-neon-blue" />
                    <a
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-neon-blue transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-neon-purple" />
                    <a
                      href={profile.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-neon-purple transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={motionEnabled ? fadeUp : undefined}
          >
            <Card className="hover:border-neon-red/50 transition-all duration-300">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  <Textarea
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : isSuccess ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Sent!
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

