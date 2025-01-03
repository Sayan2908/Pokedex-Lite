import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";


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
  title: "Pokedex-Lite App",
  description: "View and manage your favorite Pokémon",
  icons: {
    icon: "/favicon.ico",
  }
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
        <FavoritesProvider>
          <header className="bg-gray-800 shadow-lg rounded-b-lg">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-2 sm:p-3 md:p-4">
              <Link href="/">
                <div className="w-16 sm:w-16 md:w-20 lg:w-24 xl:w-32">
                  <Image
                    src="/pokemon-logo.png"
                    alt="Pokemon Logo"
                    width={500}
                    height={300}
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              <nav className="flex space-x-2 sm:space-x-4">
                <NavLink href="/pokedex">Pokedex</NavLink>
                <NavLink href="/favourites">Favourites</NavLink>
                {/* <NavLink href="/login">Login</NavLink> */}
              </nav>
            </div>
          </header>

          <main>{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative rounded-md px-2 py-1 sm:px-4 sm:py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      {children}
    </Link>
  );
}
