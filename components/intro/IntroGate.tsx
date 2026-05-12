"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const CinematicIntro = dynamic(() => import("./CinematicIntro"), { ssr: false });
const MobileIntro    = dynamic(() => import("./MobileIntro"), { ssr: false });

const SESSION_KEY = "dipa_intro_played";

export default function IntroGate() {
  const [played, setPlayed] = useState<null | boolean>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const { setTheme } = useTheme();

  useEffect(() => {
    const done = sessionStorage.getItem(SESSION_KEY) === "1";
    setPlayed(done);
    setIsMobile(window.innerWidth < 768);
    if (done) document.documentElement.classList.remove("intro-loading");
  }, []);

  const handleDone = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setTheme("dark");
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
          {isMobile ? (
            <MobileIntro onDone={handleDone} />
          ) : (
            <CinematicIntro onDone={handleDone} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
