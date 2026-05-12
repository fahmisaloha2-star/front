"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Projects" },
    { path: "/shop", label: "Shop" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-secondary shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-xl">MIS</span>
            </div>
            <div className="text-white">
              <div className="font-bold text-xl">MIS Metal</div>
              <div className="text-sm text-gray-300">Construction</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-white hover:text-primary transition-colors ${
                  pathname === link.path ? "text-primary" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-white/70 hover:text-primary flex items-center gap-1.5"
                  >
                    <LayoutDashboard size={16} /> Admin
                  </Link>
                )}
                <Link
                  href="/client"
                  className="bg-primary text-white px-5 py-2 rounded hover:brightness-110 transition"
                >
                  Client Space
                </Link>
                <button
                  onClick={() => signOut()}
                  title="Sign out"
                  className="text-white/60 hover:text-white p-2"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-primary text-white px-6 py-2 rounded hover:brightness-110 transition flex items-center gap-2"
              >
                <LogIn size={16} /> Sign in
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-secondary border-t border-blue-900/40">
            <div className="flex flex-col py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-white hover:text-primary transition-colors px-4 ${
                    pathname === link.path ? "text-primary" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <Link
                  href="/client"
                  className="bg-primary text-white px-6 py-2 rounded hover:brightness-110 transition mx-4 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Client Space
                </Link>
              ) : (
                <Link
                  href="/auth"
                    className="bg-primary text-white px-6 py-2 rounded hover:brightness-110 transition mx-4 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
