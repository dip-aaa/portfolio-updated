"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onDone: () => void;
}

export default function MobileIntro({ onDone }: Props) {
  const [phase, setPhase] = useState<"scene" | "zoom" | "flash" | "done">("scene");

  const skip = useCallback(() => {
    setPhase("flash");
    setTimeout(() => { setPhase("done"); onDone(); }, 500);
  }, [onDone]);

  // Auto-sequence (tightened from ~4.4s → ~3.5s total)
  const handleSceneReady = useCallback(() => {
    setTimeout(() => setPhase("zoom"), 900);
    setTimeout(() => setPhase("flash"), 2700);
    setTimeout(() => { setPhase("done"); onDone(); }, 3400);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#030712] overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleSceneReady}
    >
      {/* Stars / particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-300/30"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      {/* Cinematic bars */}
      <div className="absolute top-0 inset-x-0 h-[7vh] bg-black z-20" />
      <div className="absolute bottom-0 inset-x-0 h-[7vh] bg-black z-20" />

      {/* Main scene: desk illustration */}
      <motion.div
        animate={phase === "zoom" ? { scale: 12, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={
          phase === "zoom"
            ? { duration: 1.6, ease: [0.4, 0, 1, 1] }
            : { duration: 0 }
        }
        className="relative flex flex-col items-center origin-center"
      >
        {/* Desk scene — pure CSS */}
        <div className="relative" style={{ width: 280, height: 220 }}>
          {/* Glow behind monitor */}
          <div
            className="absolute rounded-full blur-3xl pointer-events-none"
            style={{
              width: 180, height: 130,
              background: "radial-gradient(circle, rgba(0,200,255,0.18), transparent 70%)",
              top: 10, left: 50,
            }}
          />

          {/* Girl silhouette */}
          <div className="absolute" style={{ left: 28, top: 60 }}>
            {/* Head */}
            <div className="w-10 h-10 rounded-full bg-[#06060f] border border-[#00ccff]/10" style={{ marginLeft: 8 }} />
            {/* Hair */}
            <div className="w-12 h-5 rounded-t-full bg-[#04040a]" style={{ marginTop: -14, marginLeft: 4 }} />
            {/* Body */}
            <div className="w-14 h-14 rounded-t-lg bg-[#06060f] border border-white/5" style={{ marginTop: 2, marginLeft: 1 }} />
            {/* Arms on desk */}
            <div className="flex gap-1 mt-1 ml-1">
              <div className="w-5 h-4 rounded bg-[#06060f] border border-white/5" style={{ transform: "rotate(-15deg)" }} />
              <div className="w-5 h-4 rounded bg-[#06060f] border border-white/5" style={{ transform: "rotate(15deg)" }} />
            </div>
          </div>

          {/* Monitor */}
          <div className="absolute" style={{ left: 90, top: 8 }}>
            {/* Screen */}
            <div
              className="w-28 rounded-sm flex items-center justify-center"
              style={{
                height: 82,
                background: "#000d1c",
                border: "2px solid #0a0a1a",
                boxShadow: "0 0 18px 4px rgba(0,180,255,0.28), inset 0 0 12px rgba(0,150,255,0.12)",
              }}
            >
              <div className="text-center">
                <div
                  className="text-base font-bold tracking-wider font-mono"
                  style={{ color: "#00ddff", textShadow: "0 0 10px #00ccff" }}
                >
                  Dipa
                </div>
                <div className="text-[8px] text-cyan-700/60 font-mono mt-1">Dev · Design</div>
              </div>
            </div>
            {/* Monitor stand neck */}
            <div className="mx-auto bg-[#0a0a14]" style={{ width: 6, height: 18 }} />
            {/* Stand base */}
            <div className="mx-auto rounded-sm bg-[#0a0a14]" style={{ width: 40, height: 5 }} />
          </div>

          {/* Desk surface */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-sm"
            style={{
              height: 50,
              background: "linear-gradient(to bottom, #100a06, #0a0704)",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          />

          {/* Keyboard */}
          <div
            className="absolute rounded-sm"
            style={{
              width: 80, height: 14,
              bottom: 36, left: 100,
              background: "#0c0c18",
              border: "1px solid rgba(0,150,255,0.1)",
              boxShadow: "0 0 6px rgba(120,0,255,0.3)",
            }}
          />

          {/* Mug */}
          <div
            className="absolute rounded-t-full rounded-b-sm"
            style={{
              width: 12, height: 16,
              bottom: 42, left: 52,
              background: "#0f0f1a",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          />

          {/* Plant */}
          <div className="absolute" style={{ bottom: 44, right: 16 }}>
            <div className="w-4 h-4 rounded-full bg-[#0a1a08]" />
            <div className="mx-auto w-2 h-3 bg-[#0f0f18]" />
            <div className="w-6 h-2 rounded-sm bg-[#0c0c18]" />
          </div>
        </div>

        {/* Label below */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 text-xs font-bold tracking-[0.3em] uppercase"
          style={{ color: "rgba(0,200,255,0.45)" }}
        >
          Entering Workspace
        </motion.p>

        <div className="flex gap-1.5 mt-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "rgba(0,200,255,0.4)" }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Skip */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={skip}
        className="absolute top-[8vh] right-4 z-30 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase
          border border-white/10 text-white/40 hover:text-white/70 backdrop-blur-sm bg-black/20 cursor-pointer
          transition-colors duration-300"
      >
        Skip
      </motion.button>

      {/* Flash */}
      <AnimatePresence>
        {phase === "flash" && (
          <motion.div
            className="absolute inset-0 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background:
                "radial-gradient(ellipse at center, #ffffff 0%, #aadeff 50%, #030712 100%)",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
