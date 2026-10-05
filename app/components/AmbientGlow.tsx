"use client";

import { motion } from "framer-motion";

export default function AmbientGlow() {
  return (
    // z-0 ensures it sits directly on the body, but no solid bg color here
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }} // Drastically increased opacity
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        className="absolute -top-[10%] -left-[20%] w-[150vw] h-[150vw] md:-top-[20%] md:-left-[10%] md:w-[50vw] md:h-[50vw] rounded-full bg-[#d97706] blur-[60px]"
      />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} // Drastically increased opacity
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        className="absolute top-[40%] -right-[20%] w-[120vw] h-[120vw] md:top-[20%] md:-right-[10%] md:w-[40vw] md:h-[40vw] rounded-full bg-[#78350f] blur-[60px]"
      />
    </div>
  );
}