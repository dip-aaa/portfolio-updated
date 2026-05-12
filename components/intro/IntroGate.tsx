"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const CinematicIntro = dynamic(() => import("./CinematicIntro"), { ssr: false });

const SESSION_KEY = "dipa_intro_played";
const MOBILE_BREAKPOINT = 768;

export default function IntroGate() {
  const [played, setPlayed] = useState<null | boolean>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const skip =
      sessionStorage.getItem(SESSION_KEY) === "1" ||
      window.innerWidth < MOBILE_BREAKPOINT;
    setPlayed(skip);
    if (skip) {
      sessionStorage.setItem(SESSION_KEY, "1");
      document.documentElement.classList.remove("intro-loading");
    }
  }, []);

  const handleDone = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    document.documentElement.classList.remove("intro-loading");
    setTimeout(() => setVisible(false), 100);
  };

  if (played === null) return null;
  if (played === true) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000]"
        >
          <CinematicIntro onDone={handleDone} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
