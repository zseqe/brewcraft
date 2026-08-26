import Link from "next/link";
import { Coffee, Globe, Mail, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/10 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Coffee className="text-[#d97706] group-hover:scale-110 transition-transform" size={24} />
              <span className="text-xl font-bold text-white tracking-tight">Brewcraft</span>
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed text-sm">
              Obsessive craft. Measurable impact. We bridge the gap between agronomy at the farm level and thermodynamics in the roaster.
            </p>
          </div>
          
          {/* Navigation Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">Overview</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">Our Story</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">The Catalog</Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.05] hover:border-white/30 transition-all">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.05] hover:border-white/30 transition-all">
                <MessageSquare size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.05] hover:border-white/30 transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

        </div>
        
        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Brewcraft. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Designed for precision.</p>
        </div>
      </div>
    </footer>
  );
}