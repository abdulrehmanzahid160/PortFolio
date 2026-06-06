"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";

const bio =
  "I am a second semester AI student at Nutech University Islamabad who builds real things. From Android apps to AI backends — I turn ideas into working products.";

const achievements = [
  "3rd Place — International Student Expo Islamabad",
  "Google AI Seeehlo Hackathon Participant",
];

const techStack = [
  "Flutter",
  "Dart",
  "Java",
  "C++",
  "Python",
  "FastAPI",
  "Firebase",
  "Agentic AI",
];

export default function About() {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTyped) {
            setIsTyping(true);
            setHasTyped(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    return () => observer.disconnect();
  }, [hasTyped]);

  useEffect(() => {
    if (!isTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= bio.length) {
        setTypedText(bio.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isTyping]);

  return (
    <section id="about" className="py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedText text="About" />

        {/* Terminal */}
        <div ref={terminalRef} className="terminal-window mb-12">
          <div className="terminal-header">
            <div className="terminal-dot red" />
            <div className="terminal-dot yellow" />
            <div className="terminal-dot green" />
            <span className="font-mono text-xs text-warm-dim ml-4">
              ~/about-me
            </span>
          </div>
          <div className="terminal-body">
            <span className="text-accent">$</span>{" "}
            <span className="text-warm-dim">cat</span> bio.txt
            <br />
            <br />
            <span>{typedText}</span>
            {(isTyping || !hasTyped) && <span className="terminal-cursor" />}
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              className="border-l-2 border-accent pl-4 py-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <p className="font-mono text-sm text-warm">{achievement}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {techStack.map((tech, i) => (
            <motion.span
              key={tech}
              className="tech-pill"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
