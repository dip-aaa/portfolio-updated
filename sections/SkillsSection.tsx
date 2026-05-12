"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMonitor, FiServer, FiTool, FiCpu } from "react-icons/fi";
import SectionTitle from "@/components/ui/SectionTitle";
import { skillCategories } from "@/data";

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>> = { FiMonitor, FiServer, FiTool, FiCpu };

export default function SkillsSection() {
  const [active, setActive] = useState(0);
  const cat = skillCategories[active];

  return (
    <section id="skills" className="section-py relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent2), transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Expertise"
          title="Skills & Technologies"
          subtitle="A curated set of tools and technologies I work with to bring ideas to life."
          center
        />

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((c, i) => {
            const Icon = iconMap[c.icon];
            const isActive = active === i;
            return (
              <motion.button
                key={c.label}
                onClick={() => setActive(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-lg"
                    : "glass-card text-muted hover:text-foreground"
                }`}
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                        boxShadow: "0 0 20px var(--accent)/30",
                      }
                    : {}
                }
              >
                {Icon && <Icon size={16} />}
                {c.label}
              </motion.button>
            );
          })}
        </div>

        {/* Skills grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto"
        >
          {cat.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card rounded-2xl p-5 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-foreground">{skill.name}</span>
                <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>
                  {skill.level}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(to right, var(--accent), var(--accent2))",
                    boxShadow: "0 0 8px var(--accent)/50",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating tag cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {["React", "Next.js", "TypeScript", "Python", "Node.js", "Tailwind", "MongoDB", "Git", "Figma", "REST APIs", "SQL", "C/C++"].map((tag, i) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.1, y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="px-4 py-1.5 rounded-full text-xs font-semibold glass-card text-muted hover:text-accent cursor-default transition-colors duration-200"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
