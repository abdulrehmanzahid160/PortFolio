"use client";

import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";

const achievements = [
  {
    title: "3rd Position",
    subtitle: "Android App Development",
    event: "3rd International Student Expo Islamabad",
    organizer: "Organized by: Cyber-Sec Society | PAF-IAST",
    icon: "🏆",
  },
  {
    title: "Hackathon Participant",
    subtitle: "Google AI Seeehlo",
    event: "Google AI Hackathon Pakistan",
    organizer: "",
    icon: "🚀",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedText text="Milestones" />

        <div className="grid sm:grid-cols-2 gap-6">
          {achievements.map((ach, i) => (
            <motion.div
              key={i}
              className="achievement-card group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              data-magnetic
            >
              <div className="text-4xl mb-6">{ach.icon}</div>

              <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-accent mb-2">
                {ach.title}
              </h3>

              <p className="font-mono text-sm text-warm mb-4">
                {ach.subtitle}
              </p>

              <div className="w-12 h-[1px] bg-dark-border mb-4 group-hover:bg-accent group-hover:w-20 transition-all duration-500" />

              <p className="font-mono text-xs text-warm-dim leading-relaxed">
                {ach.event}
              </p>

              {ach.organizer && (
                <p className="font-mono text-xs text-warm-dim mt-1 opacity-60">
                  {ach.organizer}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
