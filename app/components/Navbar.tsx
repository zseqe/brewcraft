"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

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

        {/* Center Navigation Links */}
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

        {/* Right CTA Button */}
        <div className="flex items-center">
          <Link
            href="/services"
            className="px-6 py-2.5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white text-sm font-bold transition shadow-lg shadow-[#d97706]/20"
          >
            Shop Now
          </Link>
        </div>

      </div>
    </header>
  );
}