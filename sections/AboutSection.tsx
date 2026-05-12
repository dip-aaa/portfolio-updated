"use client";
import { motion } from "framer-motion";
import { FiUser, FiCode, FiZap, FiBookOpen, FiAward, FiHome } from "react-icons/fi";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { aboutCards, educationTimeline } from "@/data";

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>> = {
  FiUser, FiCode, FiZap, FiBookOpen, FiAward, FiHome,
};

const dotColorMap: Record<string, { color: string; glow: string }> = {
  cyan:   { color: "var(--edu-cyan)",   glow: "var(--edu-cyan-glow)" },
  violet: { color: "var(--edu-violet)", glow: "var(--edu-violet-glow)" },
  blue:   { color: "var(--edu-blue)",   glow: "var(--edu-blue-glow)" },
};

export default function AboutSection() {
  return (
    <section id="about" className="section-py relative overflow-hidden">
      {/* Bg accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Who I Am" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Cards column */}
          <div className="flex flex-col gap-5">
            {aboutCards.map((card, i) => {
              const Icon = iconMap[card.icon];
              return (
                <GlassCard key={card.title} delay={i * 0.1}>
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, var(--accent)/20, var(--accent2)/20)",
                        border: "1px solid var(--accent-border)",
                      }}
                    >
                      {Icon && <Icon size={20} style={{ color: "var(--accent)" }} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{card.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {card.desc.split(card.highlight).map((part, j, arr) => (
                          j < arr.length - 1 ? (
                            <span key={j}>
                              {part}
                              <span className="font-semibold" style={{ color: "var(--accent)" }}>
                                {card.highlight}
                              </span>
                            </span>
                          ) : part
                        ))}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-foreground mb-1">Educational Journey</h3>
            <p className="text-sm text-muted mb-8 italic">My Learning Path</p>

            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-5 top-0 bottom-0 w-0.5 rounded-full"
                style={{ background: "linear-gradient(to bottom, var(--accent), var(--accent2))" }}
              />

              <div className="flex flex-col gap-8">
                {educationTimeline.map((item, i) => {
                  const dot = dotColorMap[item.color] ?? dotColorMap.cyan;
                  return (
                    <motion.div
                      key={item.degree}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className="flex gap-6"
                    >
                      {/* Filled dot */}
                      <div className="relative flex-shrink-0 z-10 w-10 h-10 flex items-center justify-center">
                        <div
                          className="w-3.5 h-3.5 rounded-full"
                          style={{
                            background: dot.color,
                            boxShadow: `0 0 10px ${dot.glow}`,
                          }}
                        />
                      </div>
                      {/* Content */}
                      <div className="glass-card rounded-xl p-4 flex-1">
                        <span
                          className="text-xs font-bold tracking-wider uppercase"
                          style={{ color: dot.color }}
                        >
                          {item.year}
                        </span>
                        <h4 className="font-bold text-foreground mt-1">{item.degree}</h4>
                        <p className="text-sm text-muted mt-0.5 italic">{item.school}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
