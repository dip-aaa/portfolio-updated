"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiFacebook, FiArrowRight, FiDownload } from "react-icons/fi";

const roles = ["Developer", "Designer", "Problem Solver", "Tech Enthusiast"];
const socials = [
  { icon: FiGithub, href: "https://github.com/", label: "GitHub" },
  { icon: FiFacebook, href: "https://facebook.com/", label: "Facebook" },
  { icon: FiLinkedin, href: "https://linkedin.com/", label: "LinkedIn" },
  { icon: FiTwitter, href: "https://twitter.com/", label: "Twitter" },
  { icon: FiInstagram, href: "https://instagram.com/", label: "Instagram" },
];

function TypeWriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 100);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 60);
    } else {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words]);

  return (
    <span className="relative">
      <span
        className="px-3 py-1 rounded-md font-extrabold"
        style={{
          background: "linear-gradient(135deg, var(--accent)/20, var(--accent2)/20)",
          color: "var(--accent)",
          backdropFilter: "blur(4px)",
          border: "1px solid var(--accent-border)",
        }}
      >
        {displayed}
        <span className="animate-pulse ml-0.5">|</span>
      </span>
    </span>
  );
}

export default function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = (mounted ? theme : "dark") === "dark";

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full opacity-15 dark:opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--accent2), transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
            >
              Hey, I&apos;m{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent2))" }}
              >
                Dipa Khanal
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-xl sm:text-3xl font-bold text-foreground"
            >
              I&apos;m a <TypeWriter words={roles} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 text-sm sm:text-lg text-muted max-w-lg leading-relaxed mx-auto lg:mx-0"
            >
              A curious developer who loves learning, building, and solving problems through code.
              Passionate about creating clean, user-friendly web apps and exploring new technologies every day.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-7 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNav("#projects")}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold text-white transition-shadow duration-300"
                style={{
                  background: isDark
                    ? "linear-gradient(to right, #06b6d4, #2563eb)"
                    : "linear-gradient(to right, #92400e, #b45309)",
                  boxShadow: isDark
                    ? "0 8px 20px rgba(6,182,212,0.30)"
                    : "0 8px 20px rgba(146,64,14,0.30)",
                }}
              >
                View Projects <FiArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNav("#contact")}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold glass-card border border-white/20 hover:border-accent/50 transition-colors duration-300"
                style={{ color: "var(--foreground)" }}
              >
                Contact Me <FiDownload size={16} />
              </motion.button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-7 flex items-center gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full glass-card text-muted
                    hover:text-accent hover:border-accent/50 transition-colors duration-300"
                >
                  <Icon size={16} className="sm:hidden" />
                  <Icon size={18} className="hidden sm:block" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer glowing ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 blob-morph-slow border border-dashed"
                style={{ borderColor: "var(--accent-border)" }}
              />
              {/* Floating dots */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-3 -left-3 w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                style={{ background: "var(--accent2)" }}
              />
              {/* Image container */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 blob-morph overflow-hidden"
                style={{
                  border: "3px solid var(--accent-border)",
                  boxShadow: "0 0 60px color-mix(in srgb, var(--accent) 20%, transparent)",
                }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Dipa Khanal — Developer & Designer"
                  fill
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 320px, 384px"
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
