'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export function SplineShowcase() {
  return (
    <section id="showcase" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-accent-violet-light block mb-4">
            {"// Технологии"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Интерактивный <span className="text-gradient">3D</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Мы используем передовые технологии для создания впечатляющих интерфейсов
          </p>
        </div>

        <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden rounded-2xl border-border">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex h-full">
            {/* Left content */}
            <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Interactive 3D
              </h1>
              <p className="mt-4 text-neutral-300 max-w-lg">
                Оживляем интерфейсы красивыми 3D-сценами. Создаём иммерсивный
                опыт, который привлекает внимание и усиливает ваш дизайн.
              </p>
            </div>

            {/* Right content - Spline Robot */}
            <div className="flex-1 relative">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
