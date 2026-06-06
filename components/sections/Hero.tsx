"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const subtitles = ["App Developer", "AI Student", "Builder of things that think"];

export default function Hero() {
  const [displayName, setDisplayName] = useState("");
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const dotGridRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  // Scramble text effect
  useEffect(() => {
    const targetText = "Abdul Rehman";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let iteration = 0;
    const maxIterations = targetText.length;

    const interval = setInterval(() => {
      setDisplayName(
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayName(targetText);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Cycle subtitles
  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Dot grid mouse interaction
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    const dots = dotGridRef.current?.querySelectorAll<HTMLDivElement>(".dot-grid-dot");
    if (!dots) return;

    function animate() {
      dots?.forEach((dot) => {
        const rect = dot.getBoundingClientRect();
        const dotX = rect.left + rect.width / 2;
        const dotY = rect.top + rect.height / 2;
        const dx = mousePos.current.x - dotX;
        const dy = mousePos.current.y - dotY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 8;
          const moveX = (dx / dist) * force;
          const moveY = (dy / dist) * force;
          dot.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.1})`;
          dot.style.opacity = `${0.15 + force * 0.05}`;
        } else {
          dot.style.transform = "translate(0, 0) scale(1)";
          dot.style.opacity = "0.15";
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [handleMouseMove]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Generate dot grid positions
  const dots = [];
  const spacing = 40;
  const cols = Math.ceil(1920 / spacing);
  const rows = Math.ceil(1080 / spacing);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dots.push({ x: j * spacing, y: i * spacing, key: `${i}-${j}` });
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dot Grid Background */}
      <div ref={dotGridRef} className="dot-grid">
        {dots.map((dot) => (
          <div
            key={dot.key}
            className="dot-grid-dot"
            style={{ left: dot.x, top: dot.y }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Name */}
        <motion.h1
          className="font-playfair text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-accent">
            {displayName.split(" ")[0] || ""}
          </span>{" "}
          <span className="text-warm">
            {displayName.split(" ").slice(1).join(" ") || ""}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          className="h-8 mb-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={subtitleIndex}
              className="font-mono text-sm sm:text-base tracking-widest uppercase text-warm-dim"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {subtitles[subtitleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button
            onClick={() => scrollTo("projects")}
            className="magnetic-btn"
            data-magnetic
          >
            View My Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="magnetic-btn"
            data-magnetic
          >
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="font-mono text-[10px] tracking-widest uppercase text-warm-dim">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-8 bg-warm-dim"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
