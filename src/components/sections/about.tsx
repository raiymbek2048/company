"use client";

import { useEffect, useRef } from "react";
import { Monitor, Smartphone, Server, Shield, Headphones, Database, ArrowRightLeft, BarChart3 } from "lucide-react";
import AnimatedShaderHero from "@/components/ui/animated-shader-hero";

const services = [
  {
    icon: Monitor,
    title: "Веб-разработка",
    desc: "Современные веб-приложения и сайты с акцентом на скорость, UX и масштабируемость.",
  },
  {
    icon: Smartphone,
    title: "Мобильные приложения",
    desc: "Кроссплатформенные и нативные мобильные приложения для iOS и Android.",
  },
  {
    icon: Server,
    title: "IT-инфраструктура",
    desc: "Проектирование и внедрение надёжной IT-инфраструктуры для вашего бизнеса.",
  },
  {
    icon: Shield,
    title: "Кибербезопасность",
    desc: "Защита данных, аудит безопасности и внедрение передовых систем защиты.",
  },
  {
    icon: ArrowRightLeft,
    title: "Системная интеграция",
    desc: "Объединяем разрозненные системы в единую эффективную экосистему.",
  },
  {
    icon: Database,
    title: "Миграция данных",
    desc: "Безопасный перенос данных между платформами без потерь и простоев.",
  },
  {
    icon: BarChart3,
    title: "IT-консалтинг",
    desc: "Анализ решений и стратегическое планирование цифровой трансформации.",
  },
  {
    icon: Headphones,
    title: "Техническая поддержка",
    desc: "Круглосуточная поддержка и IT-аутсорсинг для бесперебойной работы.",
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

export function About() {
  return (
    <section id="about">
      <AnimatedShaderHero
        trustBadge={{
          text: "Надёжный IT-партнёр в Кыргызстане",
          icons: ["✨"],
        }}
        headline={{
          line1: "Создаём",
          line2: "цифровые решения",
        }}
        subtitle="Мы помогаем бизнесу эффективно решать современные цифровые задачи. Внедряем инновационные и надёжные IT-сервисы, отслеживаем технологические тренды и выстраиваем долгосрочные отношения с клиентами."
        buttons={{
          primary: {
            text: "Обсудить проект",
            href: "#contact",
          },
          secondary: {
            text: "Наша команда",
            href: "#team",
          },
        }}
      />

      <div className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-accent-violet-light block mb-4">
              {"// Что мы делаем"}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Наши <span className="text-gradient">услуги</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Полный спектр IT-услуг для развития вашего бизнеса
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <RevealCard key={s.title} delay={i * 80}>
                <div className="glass rounded-2xl p-8 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300 relative overflow-hidden group h-full">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-violet/15 to-neon-cyan/5 border border-accent-violet/20 text-accent-violet-light mb-5">
                    <s.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {s.desc}
                  </p>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
