"use client";
import { motion } from "framer-motion";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionTitle({ eyebrow, title, subtitle, center = false }: SectionTitleProps) {
  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-bold tracking-[0.25em] uppercase text-cyan-400 dark:text-cyan-400 light:text-amber-600 mb-3"
          style={{ color: "var(--accent)" }}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl font-extrabold text-foreground"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-muted max-w-2xl"
          style={{ margin: center ? "1rem auto 0" : "1rem 0 0" }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 ${center ? "mx-auto" : ""}`}
        style={{ background: "linear-gradient(to right, var(--accent), var(--accent2))" }}
      />
    </div>
  );
}
