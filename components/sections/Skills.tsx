"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";

interface SkillNode {
  name: string;
  group: string;
  x: number;
  y: number;
}

const skillGroups: Record<string, string[]> = {
  Mobile: ["Flutter", "Dart", "Java", "Android"],
  Languages: ["Python", "C++", "JavaScript"],
  "AI/ML": ["Agentic AI", "FastAPI", "OpenAI"],
  Tools: ["Firebase", "PostgreSQL", "SQLite", "Git"],
};

const groupColors: Record<string, string> = {
  Mobile: "#d4a843",
  Languages: "#a8a49a",
  "AI/ML": "#e8c878",
  Tools: "#8b7d6b",
};

function generateNodes(): SkillNode[] {
  const nodes: SkillNode[] = [];
  const groups = Object.entries(skillGroups);
  const centerX = 50;
  const centerY = 50;
  const groupRadius = 30;

  groups.forEach(([group, skills], gi) => {
    const groupAngle = (gi / groups.length) * Math.PI * 2 - Math.PI / 2;
    const gx = centerX + Math.cos(groupAngle) * groupRadius;
    const gy = centerY + Math.sin(groupAngle) * groupRadius;

    skills.forEach((skill, si) => {
      const skillAngle = (si / skills.length) * Math.PI * 2 - Math.PI / 2;
      const skillRadius = 10 + Math.random() * 5;
      const sx = gx + Math.cos(skillAngle) * skillRadius;
      const sy = gy + Math.sin(skillAngle) * skillRadius;
      nodes.push({
        name: skill,
        group,
        x: Math.max(5, Math.min(95, sx)),
        y: Math.max(5, Math.min(95, sy)),
      });
    });
  });

  return nodes;
}

export default function Skills() {
  const [nodes] = useState<SkillNode[]>(() => generateNodes());
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1, y: -1 });
  const animRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  }, []);

  useEffect(() => {
    if (isMobile || !isVisible) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    container.addEventListener("mousemove", handleMouseMove);

    function draw() {
      if (!canvas || !ctx || !container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      ctx.clearRect(0, 0, w, h);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const ax = (a.x / 100) * w;
          const ay = (a.y / 100) * h;
          const bx = (b.x / 100) * w;
          const by = (b.y / 100) * h;
          const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
          const maxDist = w * 0.3;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            const sameGroup = a.group === b.group;

            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = sameGroup
              ? `rgba(212, 168, 67, ${alpha * 2})`
              : `rgba(168, 164, 154, ${alpha})`;
            ctx.lineWidth = sameGroup ? 1 : 0.5;
            ctx.stroke();
          }
        }
      }

      // Mouse proximity glow
      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      if (mx >= 0) {
        nodes.forEach((node) => {
          const nx = (node.x / 100) * w;
          const ny = (node.y / 100) * h;
          const mxAbs = (mx / 100) * w;
          const myAbs = (my / 100) * h;
          const dist = Math.sqrt((nx - mxAbs) ** 2 + (ny - myAbs) ** 2);
          const proximity = 120;

          if (dist < proximity) {
            const alpha = (1 - dist / proximity) * 0.3;
            ctx.beginPath();
            ctx.arc(nx, ny, 30, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 168, 67, ${alpha})`;
            ctx.fill();
          }
        });
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [isMobile, isVisible, nodes, handleMouseMove]);

  // Mobile fallback: grid layout
  if (isMobile) {
    return (
      <section id="skills" className="py-24 sm:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedText text="My Toolkit" />
          <div className="space-y-8">
            {Object.entries(skillGroups).map(([group, skills], gi) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.1 }}
              >
                <h3
                  className="font-mono text-xs tracking-widest uppercase mb-3"
                  style={{ color: groupColors[group] }}
                >
                  {group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      className="tech-pill"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: si * 0.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedText text="My Toolkit" />

        {/* Legend */}
        <motion.div
          className="flex flex-wrap gap-6 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {Object.entries(groupColors).map(([group, color]) => (
            <div key={group} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="font-mono text-[10px] tracking-wider uppercase text-warm-dim">
                {group}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Constellation */}
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ height: "500px" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {nodes.map((node, i) => (
            <motion.div
              key={node.name}
              className="skill-node"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
                borderColor: groupColors[node.group] + "40",
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                type: "spring",
                stiffness: 200,
              }}
            >
              {node.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
