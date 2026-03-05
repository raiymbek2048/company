"use client";

import { useState } from "react";
import { Mail, MapPin, Send, MessageCircle } from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError("Ошибка отправки. Попробуйте позже.");
      }
    } catch {
      setError("Ошибка сети. Попробуйте позже.");
    } finally {
      setSending(false);
    }
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              required
              className="w-full px-5 py-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 outline-none transition-all"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full px-5 py-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 outline-none transition-all"
            />
            <textarea
              name="message"
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
              ) : sending ? (
                "Отправка..."
              ) : (
                <>
                  Отправить
                  <Send size={18} />
                </>
              )}
            </button>
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
          </form>

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
                  href="mailto:info@bizden.tech"
                  className="font-medium hover:text-accent-violet-light transition-colors"
                >
                  info@bizden.tech
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
                  href="https://t.me/bizden_tech_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-accent-violet-light transition-colors"
                >
                  @bizden_tech_bot
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
