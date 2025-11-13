import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meesho Description Generator",
  description: "Generate attractive, emoji-filled product descriptions for Meesho resellers.",
  applicationName: "Meesho Description Generator",
  authors: [{ name: "Kavia" }],
  keywords: ["Meesho", "description", "generator", "reseller", "share"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg,#f9fafb)] text-[var(--text,#111827)] antialiased">
        <header className="sticky top-0 z-30 border-b border-black/5 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block size-6 rounded bg-blue-600" />
              <span className="font-semibold tracking-tight">Meesho Description Generator</span>
            </div>
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            </nav>
          </div>
        </header>
        <div className="mx-auto max-w-5xl px-4 py-6">{children}</div>
        <footer className="mt-10 border-t border-black/5">
          <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-gray-500">
            <p>Built with Next.js • Ocean Professional theme</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
