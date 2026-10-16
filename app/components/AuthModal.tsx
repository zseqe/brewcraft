"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Coffee, Mail, Lock, User, ArrowRight, Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type AuthTab = "login" | "signup";

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, signup, loginAsGuest, authTriggerCallback, setAuthTriggerCallback } = useAuth();
  const [tab, setTab] = useState<AuthTab>("login");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);

  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPw, setShowSignupPw] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  // Reset form when modal closes
  useEffect(() => {
    if (!showAuthModal) {
      setLoginEmail(""); setLoginPassword("");
      setSignupName(""); setSignupEmail(""); setSignupPassword("");
      setError(""); setIsProcessing(false);
    }
  }, [showAuthModal]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) { setError("Please fill in all fields."); return; }
    setError(""); setIsProcessing(true);
    try {
      await login(loginEmail, loginPassword);
      authTriggerCallback?.();
      setAuthTriggerCallback(null);
    } catch {
      setError("Invalid credentials. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) { setError("Please fill in all fields."); return; }
    if (signupPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
    setError(""); setIsProcessing(true);
    try {
      await signup(signupName, signupEmail, signupPassword);
      authTriggerCallback?.();
      setAuthTriggerCallback(null);
    } catch {
      setError("Could not create account. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    authTriggerCallback?.();
    setAuthTriggerCallback(null);
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAuthModal(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 24 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Ambient top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#d97706]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/[0.04] border border-white/10 text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              <X size={18} />
            </button>

            <div className="p-8">
              {/* Logo */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#d97706]/10 border border-[#d97706]/20 flex items-center justify-center mb-4">
                  <Coffee className="text-[#d97706]" size={28} />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Welcome to Brewcraft</h2>
                <p className="text-gray-400 text-sm mt-1 text-center">Sign in to track orders and save your preferences</p>
              </div>

              {/* Tab Switcher */}
              <div className="flex bg-white/[0.03] p-1 rounded-xl border border-white/10 mb-6">
                <button
                  onClick={() => { setTab("login"); setError(""); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    tab === "login" ? "bg-[#d97706] text-white shadow-md" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <LogIn size={15} /> Sign In
                </button>
                <button
                  onClick={() => { setTab("signup"); setError(""); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    tab === "signup" ? "bg-[#d97706] text-white shadow-md" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <UserPlus size={15} /> Create Account
                </button>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Login Form */}
              <AnimatePresence mode="wait">
                {tab === "login" ? (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleLogin}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#d97706]/50 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type={showLoginPw ? "text" : "password"}
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#d97706]/50 focus:bg-white/[0.06] transition-all"
                      />
                      <button type="button" onClick={() => setShowLoginPw(!showLoginPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition">
                        {showLoginPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 rounded-xl bg-[#d97706] hover:bg-[#b45309] disabled:opacity-60 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#d97706]/20 mt-2"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing in...
                        </span>
                      ) : (
                        <>Sign In <ArrowRight size={16} /></>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="signup"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSignup}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Full name"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#d97706]/50 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#d97706]/50 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type={showSignupPw ? "text" : "password"}
                        placeholder="Password (min. 6 chars)"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#d97706]/50 focus:bg-white/[0.06] transition-all"
                      />
                      <button type="button" onClick={() => setShowSignupPw(!showSignupPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition">
                        {showSignupPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 rounded-xl bg-[#d97706] hover:bg-[#b45309] disabled:opacity-60 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#d97706]/20 mt-2"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating account...
                        </span>
                      ) : (
                        <>Create Account <ArrowRight size={16} /></>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-gray-600 text-xs uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Guest Checkout */}
              <button
                onClick={handleGuest}
                className="w-full py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium flex items-center justify-center gap-2 transition-all"
              >
                <User size={15} className="text-gray-500" />
                Continue as Guest
              </button>

              <p className="text-center text-gray-600 text-xs mt-5">
                Your data is private and never sold. Guest orders are not tracked.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
