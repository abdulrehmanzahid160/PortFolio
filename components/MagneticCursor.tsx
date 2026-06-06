"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const cursorX = useSpring(0, { damping: 25, stiffness: 300 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 300 });
  const ringX = useSpring(0, { damping: 20, stiffness: 200 });
  const ringY = useSpring(0, { damping: 20, stiffness: 200 });
  const ringScaleX = useSpring(1, { damping: 20, stiffness: 300 });
  const ringScaleY = useSpring(1, { damping: 20, stiffness: 300 });
  const prevPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      // Calculate velocity for stretch effect
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      const stretch = Math.min(velocity * 0.008, 0.3);

      if (velocity > 2) {
        const angle = Math.atan2(dy, dx);
        const cos = Math.abs(Math.cos(angle));
        const sin = Math.abs(Math.sin(angle));
        ringScaleX.set(1 + stretch * cos);
        ringScaleY.set(1 + stretch * sin);
      } else {
        ringScaleX.set(1);
        ringScaleY.set(1);
      }

      prevPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, [data-magnetic], .magnetic-btn, .filter-tab, .project-card") !== null;
      setIsHovering(isInteractive);
      if (isInteractive) {
        ringScaleX.set(1.5);
        ringScaleY.set(1.5);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, [data-magnetic], .magnetic-btn, .filter-tab, .project-card") !== null;
      if (isInteractive) {
        setIsHovering(false);
        ringScaleX.set(1);
        ringScaleY.set(1);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, ringX, ringY, ringScaleX, ringScaleY]);

  if (isTouchDevice) return null;

  return (
    <div className="custom-cursor" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99999 }}>
      {/* Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          position: "fixed",
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#d4a843",
          opacity: isVisible ? 1 : 0,
          zIndex: 99999,
        }}
      />
      {/* Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          scaleX: ringScaleX,
          scaleY: ringScaleY,
          position: "fixed",
          top: -20,
          left: -20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `1px solid ${isHovering ? "rgba(212, 168, 67, 0.8)" : "rgba(240, 236, 224, 0.3)"}`,
          opacity: isVisible ? 1 : 0,
          zIndex: 99998,
          transition: "border-color 0.3s ease",
        }}
      />
    </div>
  );
}
