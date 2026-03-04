"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Globe } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    icon: Globe,
    tags: ["Web App", "Фриланс", "Стартап"],
    title: "Freelance.kg",
    desc: "Платформа для фрилансеров Кыргызстана. Связываем заказчиков с лучшими специалистами по всей стране.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=375&fit=crop",
    link: "https://freelance.kg",
  },
];

function RevealItem({
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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

export function Projects() {
  return (
    <section id="projects" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-accent-violet-light block mb-4">
            {"// Проекты"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Наши <span className="text-gradient">работы</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Стартапы и проекты, которые мы создали и запустили
          </p>
        </div>

        <div className="grid md:grid-cols-1 max-w-xl mx-auto gap-6">
          {projects.map((p, i) => (
            <RevealItem key={p.title} delay={i * 120}>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="block group rounded-2xl overflow-hidden bg-card/50 border border-border hover:border-border/200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-accent-violet/10 text-accent-violet-light border border-accent-violet/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {p.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-violet-light group-hover:text-neon-cyan group-hover:gap-2.5 transition-all">
                    Перейти на сайт
                    <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}
