"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiSend,
  FiCheck,
  FiAlertCircle,
  FiGlobe,
  FiClock,
} from "react-icons/fi";
import SectionTitle from "@/components/ui/SectionTitle";
import { contactInfo } from "@/data";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>
> = { FiMail, FiPhone, FiMapPin, FiLinkedin };

const projectTypes = [
  "Web Development",
  "UI/UX Design",
  "Backend Development",
  "Full Stack Project",
  "Consulting",
  "Other",
];

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

type Toast = { type: "success" | "error"; message: string } | null;

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);

  const showToast = (t: NonNullable<Toast>) => {
    setToast(t);
    window.setTimeout(() => setToast(null), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending || sent) return;

    const required = ["firstName", "lastName", "email", "message"] as const;
    const missing = required.filter((k) => !form[k].trim());
    if (missing.length > 0) {
      showToast({ type: "error", message: "Please fill in all required fields." });
      return;
    }
    if (!FORMSPREE_ENDPOINT) {
      showToast({
        type: "error",
        message:
          "Email service not configured. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT in .env.local.",
      });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          projectType: form.projectType,
          message: form.message,
          _subject: `Portfolio inquiry from ${form.firstName} ${form.lastName}`.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const msg =
          (data && Array.isArray(data.errors) && data.errors[0]?.message) ||
          "Something went wrong. Please try again.";
        showToast({ type: "error", message: msg });
        return;
      }

      setSent(true);
      showToast({
        type: "success",
        message: "Message sent! I'll get back to you within 24 hours.",
      });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });
      window.setTimeout(() => setSent(false), 4000);
    } catch {
      showToast({
        type: "error",
        message: "Network error. Check your connection and try again.",
      });
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b py-3 text-sm text-foreground outline-none transition-colors duration-300";

  const inputStyle = (name: string): React.CSSProperties => ({
    borderBottomColor:
      focused === name ? "var(--accent)" : "var(--input-border)",
  });

  return (
    <section id="contact" className="section-py relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Let's Connect"
          title="Get In Touch"
          subtitle="Ready to start your project? Let's create something amazing together!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact cards column */}
          <div className="flex flex-col gap-5">
            {contactInfo.map((info, i) => {
              const Icon = iconMap[info.icon];
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className="glass-card rounded-2xl p-5 flex items-center gap-5 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110"
                    style={{
                      background: "var(--icon-bg)",
                      border: "1px solid var(--accent-border)",
                      transition:
                        "transform 0.3s ease, background 0.4s ease, border-color 0.4s ease",
                    }}
                  >
                    {Icon && <Icon size={20} style={{ color: "var(--accent)" }} />}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                      {info.label}
                    </p>
                    <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                      {info.value}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{info.sub}</p>
                  </div>
                </motion.a>
              );
            })}

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card rounded-2xl p-6 mt-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent), var(--accent2))",
                    boxShadow: "0 6px 18px rgba(34,211,238,0.25)",
                  }}
                >
                  <FiGlobe size={18} className="text-white" />
                </span>
                <div>
                  <h4 className="font-bold text-foreground">Open to Opportunities</h4>
                  <p className="text-xs text-muted">
                    Freelance, internships, and collaborations
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <FiClock size={12} style={{ color: "var(--accent)" }} />
                  Replies within 24 hours
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FiMapPin size={12} style={{ color: "var(--accent)" }} />
                  GMT+5:45 (NPT)
                </span>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-1">
              Send me a message
            </h3>
            <p className="text-sm text-muted mb-6">
              Let&apos;s discuss your project in detail
            </p>

            {/* Inline toast */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  role="status"
                  className="mb-5 flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm font-medium"
                  style={{
                    background:
                      toast.type === "success"
                        ? "rgba(34,197,94,0.10)"
                        : "rgba(239,68,68,0.10)",
                    border: `1px solid ${
                      toast.type === "success"
                        ? "rgba(34,197,94,0.30)"
                        : "rgba(239,68,68,0.30)"
                    }`,
                    color: toast.type === "success" ? "#16a34a" : "#dc2626",
                  }}
                >
                  {toast.type === "success" ? (
                    <FiCheck size={16} className="mt-0.5 shrink-0" />
                  ) : (
                    <FiAlertCircle size={16} className="mt-0.5 shrink-0" />
                  )}
                  <span>{toast.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form
              onSubmit={handleSubmit}
              noValidate={false}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(["firstName", "lastName"] as const).map((name) => (
                  <div key={name} className="relative">
                    <input
                      type="text"
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      onFocus={() => setFocused(name)}
                      onBlur={() => setFocused(null)}
                      placeholder={name === "firstName" ? "First Name" : "Last Name"}
                      className={inputClass}
                      style={inputStyle(name)}
                      required
                      autoComplete={name === "firstName" ? "given-name" : "family-name"}
                    />
                  </div>
                ))}
              </div>

              {[
                { name: "email", placeholder: "Email Address", type: "email", required: true, autoComplete: "email" },
                { name: "phone", placeholder: "Phone Number (Optional)", type: "tel", required: false, autoComplete: "tel" },
              ].map(({ name, placeholder, type, required, autoComplete }) => (
                <div key={name} className="relative">
                  <input
                    type={type}
                    name={name}
                    value={form[name as keyof typeof form]}
                    onChange={handleChange}
                    onFocus={() => setFocused(name)}
                    onBlur={() => setFocused(null)}
                    placeholder={placeholder}
                    className={inputClass}
                    style={inputStyle(name)}
                    required={required}
                    autoComplete={autoComplete}
                  />
                </div>
              ))}

              <div className="relative">
                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  onFocus={() => setFocused("projectType")}
                  onBlur={() => setFocused(null)}
                  className={`${inputClass} cursor-pointer`}
                  style={{ ...inputStyle("projectType"), appearance: "auto" }}
                >
                  <option value="" disabled>Select Project Type</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="Project Details"
                  rows={4}
                  className={`${inputClass} resize-none`}
                  style={inputStyle("message")}
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending || sent}
                whileHover={{ scale: sending || sent ? 1 : 1.03 }}
                whileTap={{ scale: sending || sent ? 1 : 0.97 }}
                className="w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-80 disabled:cursor-not-allowed"
                style={{
                  background: sent
                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                    : "linear-gradient(135deg, var(--accent), var(--accent2))",
                  boxShadow: "0 8px 24px rgba(34,211,238,0.25)",
                }}
              >
                {sending ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : sent ? (
                  <>
                    <FiCheck size={16} /> Message Sent!
                  </>
                ) : (
                  <>
                    <FiSend size={16} /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
