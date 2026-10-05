"use client";

import { motion } from "framer-motion";

export default function AmbientGlow() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      
      {/* Primary Thermal Glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.10, 0.15, 0.10] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        className="absolute -top-[10%] -left-[20%] w-[150vw] h-[150vw] md:-top-[20%] md:-left-[10%] md:w-[50vw] md:h-[50vw] rounded-full bg-[#d97706] blur-[80px]"
      />

      {/* Secondary Deep Roast Glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.12, 0.08] }} 
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        className="absolute top-[40%] -right-[20%] w-[120vw] h-[120vw] md:top-[20%] md:-right-[10%] md:w-[40vw] md:h-[40vw] rounded-full bg-[#78350f] blur-[80px]"
      />
    </div>
  );
}