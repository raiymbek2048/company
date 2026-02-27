"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "О нас" },
  { href: "#showcase", label: "3D" },
  { href: "#projects", label: "Проекты" },
  { href: "#team", label: "Команда" },
  { href: "#contact", label: "Контакты" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/85 backdrop-blur-xl border-b border-border"
          : "py-5"
      }`}
    >
      <a href="#" className="font-mono text-xl font-bold tracking-tight">
        <span className="text-accent-violet">{`{`}</span>
        freelance
        <span className="text-neon-cyan">.</span>
        kg
        <span className="text-accent-violet">{`}`}</span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex gap-9">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-cyan rounded group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </div>

      {/* Mobile burger */}
      <button
        className="md:hidden text-foreground p-1"
        onClick={() => setOpen(!open)}
        aria-label="Меню"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 w-72 h-dvh bg-background/97 backdrop-blur-xl border-l border-border flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
