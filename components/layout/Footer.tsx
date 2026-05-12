"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiFacebook, FiMail } from "react-icons/fi";
import { navLinks } from "@/data";

const socials = [
  { icon: FiGithub, href: "https://github.com/", label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com/", label: "LinkedIn" },
  { icon: FiInstagram, href: "https://instagram.com/", label: "Instagram" },
  { icon: FiFacebook, href: "https://facebook.com/", label: "Facebook" },
  { icon: FiTwitter, href: "https://twitter.com/", label: "Twitter" },
  { icon: FiMail, href: "mailto:khanaldeepa126@gmail.com", label: "Email" },
];

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = (mounted ? theme : "dark") === "dark";

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 overflow-hidden"
      style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(180,130,80,0.15)"}` }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(to top, #030712, transparent)"
            : "linear-gradient(to top, #ede0cc, transparent)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <span className="text-2xl font-extrabold" style={{ color: "var(--accent)" }}>
              Dipa
            </span>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">
              Transforming ideas into seamless digital realities. Passionate about building clean,
              performant web experiences.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
              Quick Links
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="group relative inline-flex text-sm text-muted hover:text-foreground transition-colors duration-300"
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        aria-hidden
                        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                        style={{
                          background:
                            "linear-gradient(to right, var(--accent), var(--accent2))",
                        }}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact snippet */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
              Get In Touch
            </p>
            <p className="text-sm text-muted">khanaldeepa126@gmail.com</p>
            <p className="text-sm text-muted mt-1">+977 9863335195</p>
            <p className="text-sm text-muted mt-1">Kathmandu, Nepal</p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(180,130,80,0.15)"}` }}
        >
          <p className="text-xs text-muted">© 2025 Dipa. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-muted hover:text-accent transition-colors duration-200"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
