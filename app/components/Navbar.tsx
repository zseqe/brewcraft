"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, Menu, X, LogIn, LogOut, User, ChevronDown, ShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, setShowAuthModal } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Our Story", href: "/about" },
    { name: "Catalog", href: "/services" },
    { name: "Telemetry", href: "/roast-telemetry" },
    { name: "Wholesale", href: "/wholesale" },
  ];

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Coffee className="text-[#d97706] group-hover:scale-110 transition-transform" size={24} />
          <span className="text-xl font-bold text-white tracking-tight">Brewcraft</span>
        </Link>

        {/* Center Navigation Links (Desktop Only) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-2 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#d97706]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right — Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart shortcut */}
          <Link
            href="/services"
            className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-gray-400 hover:text-[#d97706] transition-all"
            title="Go to Catalog"
          >
            <ShoppingBag size={18} />
          </Link>

          {/* Auth button */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-white transition-all"
              >
                {user.isGuest ? (
                  <User size={16} className="text-gray-400" />
                ) : (
                  <span className="w-6 h-6 rounded-full bg-[#d97706] flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </span>
                )}
                <span className="text-sm font-medium max-w-[100px] truncate">
                  {user.isGuest ? "Guest" : user.name}
                </span>
                <ChevronDown size={14} className={`text-gray-500 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                  {!user.isGuest && (
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  )}
                  <button
                    onClick={() => { logout(); setUserMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                  >
                    <LogOut size={15} className="text-gray-500" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white text-sm font-bold transition shadow-lg shadow-[#d97706]/20"
            >
              <LogIn size={16} />
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg bg-white/[0.02] border border-white/10"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                    isActive ? "bg-white/[0.05] text-white" : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-xl bg-[#d97706] text-white font-bold transition shadow-lg shadow-[#d97706]/20"
            >
              Shop Now
            </Link>
            {user ? (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="block w-full text-center py-3 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 font-medium transition"
              >
                Sign Out ({user.isGuest ? "Guest" : user.name})
              </button>
            ) : (
              <button
                onClick={() => { setShowAuthModal(true); setMobileMenuOpen(false); }}
                className="block w-full text-center py-3 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 font-medium transition"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}