"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const CinematicCanvas = dynamic(() => import("./CinematicCanvas"), { ssr: false });

interface Props {
  onDone: () => void;
}

export default function CinematicIntro({ onDone }: Props) {
  const [phase, setPhase]     = useState<"scene" | "flash" | "done">("scene");
  const [sceneIn, setSceneIn] = useState(false);

  // Canvas is mounted — start scene fade-in
  const handleCanvasMount = useCallback(() => setSceneIn(true), []);
  void handleCanvasMount;

  // Camera has zoomed close enough → trigger white flash
  const handleZoomed = useCallback(() => {
    if (phase !== "scene") return;
    setPhase("flash");
    setTimeout(() => {
      setPhase("done");
      onDone();
    }, 900);
  }, [phase, onDone]);

  const skip = useCallback(() => {
    setPhase("flash");
    setTimeout(() => {
      setPhase("done");
      onDone();
    }, 600);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden bg-[#030712]">
      {/* 3D Canvas — fills entire viewport */}
      <div className="absolute inset-0">
        <CinematicCanvas onZoomed={handleZoomed} />
      </div>

      {/* Initial scene fade-in overlay */}
      <motion.div
        className="absolute inset-0 bg-[#030712] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Cinematic bars */}
      <div className="absolute top-0 left-0 right-0 h-[6vh] bg-black pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-[6vh] bg-black pointer-events-none z-10" />

      {/* Intro label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span
          className="text-xs font-bold tracking-[0.35em] uppercase"
          style={{ color: "rgba(0,200,255,0.5)" }}
        >
          Entering Workspace
        </span>
        {/* Progress dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "rgba(0,200,255,0.4)" }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={skip}
        className="absolute top-[8vh] right-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase
          border border-white/10 hover:border-white/30 text-white/40 hover:text-white/70
          backdrop-blur-sm bg-black/20 transition-all duration-300 cursor-pointer"
      >
        Skip Intro
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M2 2l8 4-8 4V2z" />
          <rect x="9" y="2" width="1.5" height="8" rx="0.5" />
        </svg>
      </motion.button>

      {/* Flash transition overlay */}
      <AnimatePresence>
        {phase === "flash" && (
          <motion.div
            className="absolute inset-0 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(ellipse at center, #ffffff 0%, #aadeff 40%, #030712 100%)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
