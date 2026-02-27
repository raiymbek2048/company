"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { ShaderAnimation } from "@/components/ui/shader-animation";

function Counter({
  target,
  label,
}: {
  target: number;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let start: number | null = null;
    const duration = 2000;

    function step(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el!.textContent = Math.round(target * eased) + "+";
      if (progress < 1) requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="flex flex-col">
      <span
        ref={ref}
        className="text-4xl font-extrabold text-gradient leading-tight"
      >
        0
      </span>
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Shader background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <ShaderAnimation />
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/70 via-background/50 to-background" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center min-h-screen max-w-7xl mx-auto px-6 pt-28 pb-20 gap-16">
        {/* Content */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-dot" />
            Открыты к новым проектам
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-6 animate-fade-in-up delay-100">
            Мы создаём{" "}
            <span className="text-gradient">цифровое будущее</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10 animate-fade-in-up delay-200">
            Команда из 4 разработчиков, которая превращает идеи в стартапы и
            продукты. Разрабатываем, запускаем, масштабируем.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-16 animate-fade-in-up delay-300">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-violet to-neon-cyan text-white font-semibold shadow-[0_4px_20px_rgba(108,92,231,0.4)] hover:shadow-[0_8px_30px_rgba(108,92,231,0.5)] hover:-translate-y-0.5 transition-all"
            >
              Обсудить проект
              <ArrowRight size={18} />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center px-7 py-3.5 rounded-xl border border-border text-muted-foreground font-semibold hover:text-foreground hover:bg-card transition-all"
            >
              Наши проекты
            </a>
          </div>

          <div className="flex gap-12 justify-center lg:justify-start animate-fade-in-up delay-400">
            <Counter target={4} label="В команде" />
            <Counter target={10} label="Проектов" />
            <Counter target={3} label="Стартапа" />
          </div>
        </div>

        {/* Code block */}
        <div className="flex-1 max-w-md w-full animate-fade-in-up delay-300">
          <div className="rounded-2xl overflow-hidden bg-secondary border border-border shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_60px_rgba(108,92,231,0.05)]">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-auto font-mono text-xs text-muted-foreground">
                startup.js
              </span>
            </div>
            <pre className="p-6 font-mono text-sm leading-loose overflow-x-auto">
              <code>
                <span className="code-keyword">const</span>{" "}
                <span className="code-var">team</span> ={" "}
                <span className="code-keyword">new</span>{" "}
                <span className="code-class">FreelanceKG</span>();
                {"\n\n"}
                <span className="code-keyword">await</span> team.
                <span className="code-method">build</span>({"{"}
                {"\n"}
                {"  "}
                <span className="code-prop">idea</span>:{" "}
                <span className="code-string">&quot;your_startup&quot;</span>,
                {"\n"}
                {"  "}
                <span className="code-prop">stack</span>: [
                <span className="code-string">&quot;modern&quot;</span>,{" "}
                <span className="code-string">&quot;fast&quot;</span>],
                {"\n"}
                {"  "}
                <span className="code-prop">quality</span>:{" "}
                <span className="code-string">&quot;production&quot;</span>
                {"\n"}
                {"}"});{"\n\n"}
                <span className="code-comment">
                  {"// Result: shipped"}
                </span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
