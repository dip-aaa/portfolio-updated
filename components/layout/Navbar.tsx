"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "@/data";
import { useScrolled } from "@/hooks/useScrolled";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const scrolled = useScrolled(40);
  const activeId = useScrollSpy(sectionIds);
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const activeTheme = mounted ? theme : "dark";

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-background/70 border-b border-white/10 shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav("#home"); }}
            whileHover={{ scale: 1.03 }}
            className="text-3xl sm:text-4xl font-black tracking-tight leading-none"
            style={{ color: "var(--accent)", letterSpacing: "-0.02em" }}
          >
            Dipa
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const active = activeId === id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: activeTheme === "dark"
                          ? "rgba(255,255,255,0.10)"
                          : "rgba(146,64,14,0.12)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(activeTheme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-full glass-card text-muted hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {activeTheme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
            </motion.button>

            {/* Resume */}
            <motion.a
              href="/Dipa_Khanal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white transition-shadow duration-300"
              style={{
                background: activeTheme === "dark"
                  ? "linear-gradient(to right, #06b6d4, #2563eb)"
                  : "linear-gradient(to right, #92400e, #b45309)",
                boxShadow: activeTheme === "dark"
                  ? "0 4px 14px rgba(6,182,212,0.25)"
                  : "0 4px 14px rgba(146,64,14,0.25)",
              }}
            >
              Resume
            </motion.a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full glass-card text-muted hover:text-foreground"
              aria-label="Menu"
            >
              {open ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 backdrop-blur-xl bg-background/90 border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/Dipa_Khanal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center text-white"
                style={{
                  background: activeTheme === "dark"
                    ? "linear-gradient(to right, #06b6d4, #2563eb)"
                    : "linear-gradient(to right, #92400e, #b45309)",
                }}
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
