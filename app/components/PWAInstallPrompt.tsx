"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Coffee } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem("pwa_banner_dismissed");
    if (dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setIsDismissed(true);
    sessionStorage.setItem("pwa_banner_dismissed", "true");
  };

  if (isDismissed || !deferredPrompt) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-[360px] z-[90] bg-[#111] border border-white/15 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
        >
          {/* Amber accent line */}
          <div className="h-0.5 w-full bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#d97706]" />
          
          <div className="p-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#d97706]/10 border border-[#d97706]/20 flex items-center justify-center shrink-0">
              <Coffee className="text-[#d97706]" size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white mb-1">Install Brewcraft</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Add to your home screen for fast, offline-ready access to our catalog.
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleInstall}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold transition"
                >
                  <Download size={13} /> Install App
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-400 hover:text-white text-xs font-medium transition"
                >
                  Not now
                </button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-gray-600 hover:text-gray-300 transition shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
