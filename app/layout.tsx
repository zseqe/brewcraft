import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import AmbientGlow from "./components/AmbientGlow"; 

export const metadata: Metadata = {
  title: "Brewcraft",
  description: "Precision Coffee Roasting",
  manifest: "/manifest.json",
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
        <AmbientGlow />
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}