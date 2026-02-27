"use client";

import { useState } from "react";
import { Mail, MapPin, Send, MessageCircle } from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-accent-violet-light block mb-4">
            {"// Контакты"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Давайте <span className="text-gradient">работать</span> вместе
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Есть идея или проект? Напишите нам, обсудим детали
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Ваше имя"
              required
              className="w-full px-5 py-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 outline-none transition-all"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-5 py-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 outline-none transition-all"
            />
            <textarea
              placeholder="Расскажите о проекте"
              rows={5}
              required
              className="w-full px-5 py-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 outline-none transition-all resize-y min-h-36"
            />
            <button
              type="submit"
              className={`w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-white transition-all ${
                submitted
                  ? "bg-gradient-to-r from-green-500 to-neon-cyan"
                  : "bg-gradient-to-r from-accent-violet to-neon-cyan shadow-[0_4px_20px_rgba(108,92,231,0.4)] hover:shadow-[0_8px_30px_rgba(108,92,231,0.5)] hover:-translate-y-0.5"
              }`}
            >
              {submitted ? (
                "Отправлено!"
              ) : (
                <>
                  Отправить
                  <Send size={18} />
                </>
              )}
            </button>
          </form>

          {/* Contact cards */}
          <div className="flex flex-col gap-4">
            <div className="glass rounded-2xl px-6 py-5 flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-violet/15 to-neon-cyan/5 border border-accent-violet/20 text-accent-violet-light shrink-0">
                <Mail size={22} strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">
                  Email
                </span>
                <a
                  href="mailto:hello@freelance.kg"
                  className="font-medium hover:text-accent-violet-light transition-colors"
                >
                  hello@freelance.kg
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl px-6 py-5 flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-violet/15 to-neon-cyan/5 border border-accent-violet/20 text-accent-violet-light shrink-0">
                <MapPin size={22} strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">
                  Локация
                </span>
                <span className="font-medium">Бишкек, Кыргызстан</span>
              </div>
            </div>

            <div className="glass rounded-2xl px-6 py-5 flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-violet/15 to-neon-cyan/5 border border-accent-violet/20 text-accent-violet-light shrink-0">
                <MessageCircle size={22} strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">
                  Telegram
                </span>
                <a
                  href="#"
                  className="font-medium hover:text-accent-violet-light transition-colors"
                >
                  @freelance_kg
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
