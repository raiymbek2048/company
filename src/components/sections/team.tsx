"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Shield, Code, LineChart, Scale } from "lucide-react";
import CyberneticGridShader from "@/components/ui/cybernetic-grid-shader";

const members = [
  {
    name: "Toni",
    role: "Fullstack Developer",
    icon: Code,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Щит",
    role: "Cyber Security",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "dr.Doom",
    role: "Analytic / PM",
    icon: LineChart,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Финч",
    role: "Юрист",
    icon: Scale,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
  },
];

function RevealCard({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => el.classList.add("animate-fade-in-up"), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="opacity-0">
      {children}
    </div>
  );
}

export function Team() {
  return (
    <section id="team" className="py-28 relative overflow-hidden">
      <CyberneticGridShader className="opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-accent-violet-light block mb-4">
            {"// Команда"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Наша <span className="text-gradient">команда</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Опытные специалисты, решающие сложные задачи
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <RevealCard key={m.name} delay={i * 100}>
              <div className="group glass rounded-2xl p-8 text-center hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-neon-purple to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative w-22 h-22 mx-auto mb-5 rounded-full overflow-hidden border-2 border-border">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent-violet flex items-center justify-center border-2 border-background">
                    <m.icon size={14} className="text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-1">{m.name}</h3>
                <span className="text-sm text-accent-violet-light font-medium block mb-4">
                  {m.role}
                </span>

                <div className="flex justify-center gap-3">
                  <a
                    href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent-violet hover:bg-accent-violet/10 transition-all"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent-violet hover:bg-accent-violet/10 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
