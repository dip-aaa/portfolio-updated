"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub, FiExternalLink, FiFileText, FiSmartphone, FiCpu,
  FiShoppingCart, FiGlobe, FiCloud, FiDollarSign, FiHeart,
  FiBarChart2, FiEye,
} from "react-icons/fi";
import SectionTitle from "@/components/ui/SectionTitle";
import { projects, projectCategories } from "@/data";

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>> = {
  FiFileText, FiSmartphone, FiCpu, FiShoppingCart, FiGlobe, FiCloud,
  FiDollarSign, FiHeart, FiBarChart2, FiEye,
};

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-py relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Showcase"
          title="Featured Projects"
          subtitle="A selection of projects I've built — from full-stack web apps to AI-powered tools."
          center
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {projectCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "text-white"
                  : "glass-card text-muted hover:text-foreground"
              }`}
              style={
                filter === cat
                  ? { background: "linear-gradient(135deg, var(--accent), var(--accent2))" }
                  : {}
              }
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const Icon = iconMap[project.icon];
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ y: -6 }}
                  className="glass-card rounded-2xl overflow-hidden group flex flex-col"
                >
                  {/* Image placeholder */}
                  <div
                    className="h-44 flex flex-col items-center justify-center gap-2 relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--accent)/10, var(--accent2)/10)",
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "var(--accent)/20",
                        border: "1px solid var(--accent-border)",
                      }}
                    >
                      {Icon && <Icon size={28} style={{ color: "var(--accent)" }} />}
                    </motion.div>
                    <span
                      className="text-xs font-bold tracking-[0.2em] uppercase"
                      style={{ color: "var(--accent)" }}
                    >
                      {project.category}
                    </span>
                    {/* Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, var(--accent)/10, transparent 70%)",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{project.desc}</p>

                    {/* Tech tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: "var(--accent)/10",
                            color: "var(--accent)",
                            border: "1px solid var(--accent-border)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="mt-5 flex gap-3">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-white"
                        style={{
                          background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                        }}
                      >
                        <FiGithub size={14} /> GitHub
                      </motion.a>
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold
                            glass-card border border-white/10 hover:border-accent/40 text-muted hover:text-foreground transition-colors"
                        >
                          <FiExternalLink size={14} /> Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
