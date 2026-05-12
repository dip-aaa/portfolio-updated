"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiAward, FiMapPin, FiCalendar } from "react-icons/fi";
import SectionTitle from "@/components/ui/SectionTitle";
import { achievements } from "@/data";

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="section-py relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div
        className="absolute top-24 -left-32 w-[26rem] h-[26rem] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--accent), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 -right-32 w-[30rem] h-[30rem] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--accent2), transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          eyebrow="Awards & Recognition"
          title="Turning Ideas Into Achievements"
          subtitle="A journey of innovation, teamwork, hackathons, and recognition."
          center
        />

        {/* Timeline rail — subtle vertical line, desktop only */}
        <div
          aria-hidden
          className="hidden lg:block absolute left-1/2 top-[22rem] bottom-24 w-px -translate-x-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, var(--accent-border) 12%, var(--accent-border) 88%, transparent 100%)",
          }}
        />

        <div className="flex flex-col gap-20 md:gap-28 mt-4 md:mt-8">
          {achievements.map((a, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={a.title}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative"
              >
                {/* Timeline node (desktop) */}
                <span
                  aria-hidden
                  className="hidden lg:block absolute left-1/2 top-10 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 0 6px rgba(34,211,238,0.12)",
                  }}
                />

                <div
                  className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Image */}
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="lg:col-span-7 relative rounded-3xl overflow-hidden"
                    style={{
                      boxShadow:
                        "0 20px 60px rgba(0,0,0,0.28), 0 4px 14px rgba(0,0,0,0.12)",
                    }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                      <Image
                        src={a.image}
                        alt={`${a.title} — ${a.award}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                        priority={i === 0}
                      />
                      {/* very subtle vignette for depth */}
                      <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none opacity-60"
                        style={{
                          background:
                            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div
                    className={`lg:col-span-5 ${
                      reverse ? "lg:pr-4" : "lg:pl-4"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                    >
                      {/* Step number */}
                      <div
                        className="text-xs font-bold tracking-[0.35em] uppercase mb-4"
                        style={{ color: "var(--accent)" }}
                      >
                        {String(i + 1).padStart(2, "0")} — Milestone
                      </div>

                      <h3 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
                        {a.title}
                      </h3>

                      {/* Award line */}
                      <div className="flex items-center gap-2 mt-4">
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(34,211,238,0.18), rgba(59,130,246,0.18))",
                            border: "1px solid var(--accent-border)",
                          }}
                        >
                          <FiAward size={15} style={{ color: "var(--accent)" }} />
                        </span>
                        <span
                          className="text-base md:text-lg font-semibold"
                          style={{ color: "var(--accent)" }}
                        >
                          {a.award}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <FiCalendar size={14} />
                          {a.year}
                        </span>
                        <span
                          aria-hidden
                          className="w-1 h-1 rounded-full"
                          style={{ background: "var(--muted)" }}
                        />
                        <span className="inline-flex items-center gap-1.5">
                          <FiMapPin size={14} />
                          {a.location}
                        </span>
                      </div>

                      <p className="mt-6 text-base text-muted leading-relaxed">
                        {a.desc}
                      </p>

                      {/* Accent underline */}
                      <div
                        className="mt-7 h-px w-20 rounded-full"
                        style={{
                          background:
                            "linear-gradient(to right, var(--accent), transparent)",
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
