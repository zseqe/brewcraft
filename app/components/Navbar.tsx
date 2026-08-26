"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Our Story", href: "/about" },
    { name: "Catalog", href: "/services" },
  ];

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

        {/* Right CTA Button (Desktop Only) */}
        <div className="hidden md:flex items-center">
          <Link
            href="/services"
            className="px-6 py-2.5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white text-sm font-bold transition shadow-lg shadow-[#d97706]/20"
          >
            Shop Now
          </Link>
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
          <div className="pt-4 border-t border-white/10">
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-xl bg-[#d97706] text-white font-bold transition shadow-lg shadow-[#d97706]/20"
            >
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}