import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1) Import the FavoritesProvider
import FavoritesProvider from "@/context/FavoritesContext";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2) Wrap everything inside FavoritesProvider so the context is available everywhere */}
        <FavoritesProvider>
          {/* Dark Themed Header */}
          <header className="bg-gray-800 shadow-lg">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
              {/* Logo */}
              <Link href="/">
                <span className="text-2xl font-bold text-white">Pokedex Lite</span>
              </Link>
              {/* Navigation */}
              <nav className="flex space-x-4">
                <NavLink href="/pokedex">Pokedex</NavLink>
                <NavLink href="/favourites">Favourites</NavLink>
                {/* If you want a link to the login page, uncomment below: */}
                {/* <NavLink href="/login">Login</NavLink> */}
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main>{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}

// Reusable NavLink component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      {children}
    </Link>
  );
}
