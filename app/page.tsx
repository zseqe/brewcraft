"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Package, Truck, Briefcase } from "lucide-react";

export default function Home() {
  // Upgraded structured telemetry data (No emojis, highly technical)
  const telemetryData = [
    { id: "SYS.01", label: "DRUM_TEMP", value: "204.5°C" },
    { id: "SYS.02", label: "TARGET_ROR", value: "5.2°C/MIN" },
    { id: "SYS.03", label: "BATCH_LOG", value: "14/20" },
    { id: "SYS.04", label: "REST_CYCLE", value: "YIRGACHEFFE [48H]" },
    { id: "SYS.05", label: "LOT_STATUS", value: "MYSURU_402 [READY]" },
    { id: "SYS.06", label: "MOISTURE_IDX", value: "11.2%" },
    { id: "SYS.07", label: "AIRFLOW_CFM", value: "TIER_4 [80%]" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
            alt="Artisan Coffee Brewing"
            fill
            priority
            className="object-cover object-center brightness-50 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/[0.03] text-gray-400 text-[10px] font-mono uppercase tracking-[0.3em] mb-8 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] animate-pulse"></span>
              Live Extraction Metrics Active
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Engineered <span className="text-[#d97706] font-light italic">Extraction.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              We bridge the gap between agronomy and thermodynamics. Precision-roasted, data-backed coffee delivered globally.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#d97706] hover:bg-[#b45309] text-white text-sm font-semibold tracking-wide uppercase transition-all"
              >
                Access Catalog <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent hover:bg-white/5 text-white text-sm font-semibold tracking-wide uppercase transition-all border border-white/20"
              >
                Read Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terminal-Style Telemetry Ticker */}
      <div className="w-full bg-[#050505] border-y border-white/10 py-2.5 overflow-hidden flex items-center relative z-20">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex whitespace-nowrap items-center font-mono text-[11px] tracking-[0.2em] uppercase"
        >
          {/* Render array twice for infinite loop */}
          {[...telemetryData, ...telemetryData].map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="mx-6 flex items-center gap-3">
                <span className="text-gray-600">{item.id}</span>
                <span className="text-gray-400">{item.label}</span>
                <span className="text-gray-600">::</span>
                <span className="text-[#d97706] font-bold">{item.value}</span>
              </span>
              <span className="text-white/10">|</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Customer-Facing Services Section */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Infrastructure & Delivery</h2>
              <p className="text-gray-400 font-light">End-to-end solutions from our roastery direct to your workflow.</p>
            </div>
            <Link href="/services" className="text-[#d97706] hover:text-white transition-colors text-sm font-mono tracking-widest uppercase mt-6 md:mt-0 flex items-center gap-2">
              View All Systems <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 bg-[#0f0f0f] border border-white/5 hover:border-white/20 transition-colors"
            >
              <Package size={24} className="text-[#d97706] mb-8 opacity-80" />
              <h3 className="text-lg font-semibold text-white mb-3 tracking-wide">Automated Allocation</h3>
              <p className="text-gray-400 leading-relaxed text-sm font-light">Freshly roasted beans matched to your parameters, compiled and shipped on your recurring schedule.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 bg-[#0f0f0f] border border-white/5 hover:border-white/20 transition-colors"
            >
              <Truck size={24} className="text-[#d97706] mb-8 opacity-80" />
              <h3 className="text-lg font-semibold text-white mb-3 tracking-wide">Rapid Fulfillment</h3>
              <p className="text-gray-400 leading-relaxed text-sm font-light">Logistics optimized to ensure beans arrive precisely within their peak post-roast resting window.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 bg-[#0f0f0f] border border-white/5 hover:border-white/20 transition-colors"
            >
              <Briefcase size={24} className="text-[#d97706] mb-8 opacity-80" />
              <h3 className="text-lg font-semibold text-white mb-3 tracking-wide">Enterprise Scaling</h3>
              <p className="text-gray-400 leading-relaxed text-sm font-light">High-volume wholesale beans and precision hardware deployment for commercial cafe environments.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}