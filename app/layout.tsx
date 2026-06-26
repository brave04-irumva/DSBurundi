import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discovery School Burundi",
  description: "Rooted in Christ, Ready for Tomorrow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased">
        
        {/* Global Navigation Header */}
        <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md border-b-4 border-amber-500">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* School Branding Layout */}
            <a href="/" className="flex items-center space-x-3 cursor-pointer group select-none">
              <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-md bg-transparent select-none group-hover:scale-105 transition-transform">
                <img 
                  src="/ds-sun-bg.png" 
                  alt="Discovery School Sun Emblem" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight block group-hover:text-amber-500 transition-colors">DISCOVERY SCHOOL</span>
                <span className="text-xs text-slate-400 block -mt-1 tracking-wider">BURUNDI</span>
              </div>
            </a>

            {/* Main Navigation Bar */}
            <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 font-semibold tracking-wide text-sm">
              <a href="/" className="hover:text-amber-500 transition-colors">Home</a>
              <a href="/about" className="hover:text-amber-500 transition-colors">About Us</a>
              <a href="/curriculum" className="hover:text-amber-500 transition-colors">Admissions & Academics</a>
              <a href="/gallery" className="hover:text-amber-500 transition-colors">Student Life</a>
              <a href="/faculty" className="hover:text-amber-500 transition-colors">Our Staff</a>
              <a href="/support" className="hover:text-amber-500 transition-colors text-amber-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">Get Involved</a>
              
              {/* Clean Top Header Entry Point for Faculty */}
              <a href="/dashboard/login" className="text-slate-400 hover:text-white transition-colors border-l border-slate-700 pl-4 text-xs tracking-wider uppercase font-bold">
                Staff Portal 🔐
              </a>
            </nav>
          </div>
        </header>

        {/* Dynamic Page Targets */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Global Structural Footer Layer */}
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm pb-8 border-b border-slate-800">
            <div className="space-y-3">
              <span className="font-bold text-white tracking-wider uppercase block text-xs">Discovery School</span>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                An American-system Christian Pre-school, Primary, and Secondary school operating in Bujumbura, Burundi.
              </p>
            </div>
            <div className="space-y-3">
              <span className="font-bold text-white tracking-wider uppercase block text-xs">Quick Resource Links</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a href="/about" className="hover:text-white transition-colors">Our Mission</a>
                <a href="/curriculum" className="hover:text-white transition-colors">Tuition & Fees</a>
                <a href="/faculty" className="hover:text-white transition-colors">School Leadership</a>
                <a href="/dashboard/login" className="text-amber-500 hover:underline transition-all font-bold">Internal Staff Login 🔐</a>
              </div>
            </div>
            <div className="space-y-3">
              <span className="font-bold text-white tracking-wider uppercase block text-xs">Accreditation</span>
              <p className="text-xs text-slate-500">
                Fully Authorized Member of the National Association of Private Schools (NAPS).
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>&copy; 2026 Discovery School Burundi. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">Rooted in Christ, Ready for Tomorrow.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}