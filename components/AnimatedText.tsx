"use client";

import { useEffect, useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
}

export default function AnimatedText({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 0.05,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>(".word");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            words.forEach((word, i) => {
              setTimeout(() => {
                word.style.opacity = "1";
                word.style.transform = "translateY(0)";
              }, delay * 1000 + i * stagger * 1000);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay, stagger]);

  const words = text.split(" ");

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>} className={`section-title ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word"
          style={{
            display: "inline-block",
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            marginRight: "0.3em",
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
