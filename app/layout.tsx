import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import AmbientGlow from "./components/AmbientGlow";
import AuthModal from "./components/AuthModal";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Brewcraft — Precision Coffee Roasting",
  description: "Engineered extraction. Precision-roasted, data-backed artisan coffee delivered globally.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Brewcraft",
  },
};

export const viewport: Viewport = {
  themeColor: "#d97706",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Restored bg-[#0a0a0a] here to fix the washed-out contrast */}
      <body className="bg-[#0a0a0a] text-white antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <AmbientGlow />
          <Navbar />
          <AuthModal />
          <PWAInstallPrompt />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}