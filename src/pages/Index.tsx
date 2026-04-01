import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const services = [
  {
    num: "01",
    title: "Стратегия",
    desc: "Глубокий анализ рынка, аудитории и конкурентов. Выстраиваем позиционирование, которое работает.",
  },
  {
    num: "02",
    title: "Дизайн",
    desc: "Визуальные решения, которые не просто красивы — они продают. Каждый пиксель на своём месте.",
  },
  {
    num: "03",
    title: "Разработка",
    desc: "Чистый код, высокая скорость, надёжность. Запускаем в срок и поддерживаем после.",
  },
  {
    num: "04",
    title: "Рост",
    desc: "SEO, аналитика, A/B тесты. Превращаем трафик в клиентов и постоянно улучшаем результат.",
  },
];

const works = [
  { label: "Проектов завершено", value: "140+" },
  { label: "Лет на рынке", value: "8" },
  { label: "Средний рост конверсии", value: "×3.2" },
  { label: "Клиентов возвращаются", value: "91%" },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.animationPlayState = "running";
            e.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ─── NAV ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#" className="font-cormorant text-xl font-semibold tracking-widest text-gold uppercase">
            Студия
          </a>
          <div className="hidden md:flex items-center gap-8 font-golos text-sm tracking-wide">
            {["Услуги", "Работы", "О нас", "Контакт"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-foreground/60 hover:text-gold transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-foreground/70 hover:text-gold transition-colors"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 border border-gold/50 hover:border-gold text-gold text-sm font-golos px-5 py-2 transition-all duration-300 hover:bg-gold/10 tracking-wide"
          >
            Начать проект
          </a>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 pb-6 pt-2 flex flex-col gap-4">
            {["Услуги", "Работы", "О нас", "Контакт"].map((item) => (
              <a
                key={item}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="text-foreground/70 hover:text-gold font-golos text-sm transition-colors py-1"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        {/* Background geometry */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-[-10%] w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] animate-float" />
          <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full bg-gold/4 blur-[100px]" style={{animationDelay:'3s'}} />
          {/* Decorative lines */}
          <div className="absolute top-0 right-24 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
          <div className="absolute top-0 left-24 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-20">
          {/* Overline */}
          <div
            className="opacity-init animate-fade-in flex items-center gap-3 mb-10"
            style={{ animationPlayState: "running" }}
          >
            <span className="w-8 h-px bg-gold" />
            <span className="font-golos text-xs text-gold/80 tracking-[0.25em] uppercase">
              Цифровая студия
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="opacity-init animate-fade-up font-cormorant font-light leading-[0.95] mb-8"
            style={{ animationPlayState: "running" }}
          >
            <span className="block text-[clamp(56px,10vw,140px)] text-foreground/95 tracking-tight">
              Создаём
            </span>
            <span className="block text-[clamp(56px,10vw,140px)] italic text-gold tracking-tight">
              сайты
            </span>
            <span className="block text-[clamp(56px,10vw,140px)] text-foreground/95 tracking-tight">
              которые растут
            </span>
          </h1>

          {/* Gold line */}
          <div className="w-0 h-px bg-gold mb-10 animate-line-grow" style={{ animationPlayState: "running" }} />

          {/* Sub and CTA row */}
          <div
            className="opacity-init animate-fade-up-delay flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16"
            style={{ animationPlayState: "running" }}
          >
            <p className="font-golos text-foreground/55 text-base md:text-lg max-w-md leading-relaxed">
              Стратегия, дизайн и разработка в одном месте. Берём проекты, в которые верим, и доводим до результата.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="font-golos text-sm tracking-widest uppercase bg-gold text-background px-8 py-4 hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)]">
                Обсудить проект
              </button>
              <button className="font-golos text-sm tracking-widest uppercase border border-border hover:border-gold/50 text-foreground/70 hover:text-gold px-8 py-4 transition-all duration-300 flex items-center gap-2 group">
                Наши работы
                <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="font-golos text-xs tracking-widest uppercase text-foreground/60">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-foreground/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="border-y border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4">
          {works.map((w, i) => (
            <div
              key={i}
              data-reveal
              className="opacity-init py-12 px-6 border-r border-border last:border-r-0 even:border-r-0 md:even:border-r text-center"
              style={{ animation: `fade-up 0.7s ease-out ${i * 0.12}s forwards`, animationPlayState: "paused" }}
            >
              <div className="font-cormorant text-4xl md:text-5xl font-light text-gold mb-2">{w.value}</div>
              <div className="font-golos text-xs text-foreground/50 tracking-wide uppercase">{w.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Section header */}
          <div
            data-reveal
            className="opacity-init flex items-start gap-16 mb-20"
            style={{ animation: "fade-up 0.8s ease-out forwards", animationPlayState: "paused" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-gold" />
                <span className="font-golos text-xs text-gold/80 tracking-[0.25em] uppercase">Услуги</span>
              </div>
              <h2 className="font-cormorant font-light text-[clamp(38px,6vw,80px)] leading-tight text-foreground">
                Что мы<br /><em className="text-gold not-italic">делаем</em>
              </h2>
            </div>
            <p className="hidden md:block font-golos text-foreground/50 text-base leading-relaxed max-w-sm mt-auto mb-2">
              Полный цикл создания цифровых продуктов — от идеи до масштабирования.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {services.map((s, i) => (
              <div
                key={i}
                data-reveal
                className="opacity-init bg-background p-8 md:p-12 group hover:bg-card transition-colors duration-500 cursor-default"
                style={{ animation: `fade-up 0.7s ease-out ${i * 0.1}s forwards`, animationPlayState: "paused" }}
              >
                <div className="font-cormorant text-6xl font-light text-border group-hover:text-gold/20 transition-colors duration-500 mb-6 leading-none">
                  {s.num}
                </div>
                <h3 className="font-cormorant text-2xl md:text-3xl font-light mb-4 text-foreground group-hover:text-gold transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="font-golos text-foreground/50 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-gold/0 group-hover:text-gold transition-all duration-300">
                  <span className="font-golos text-xs tracking-widest uppercase">Подробнее</span>
                  <Icon name="ArrowUpRight" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="border-y border-border py-5 overflow-hidden">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{
            animation: "marquee 18s linear infinite",
          }}
        >
          {Array.from({ length: 3 }).flatMap(() =>
            ["Стратегия", "Дизайн", "Разработка", "Брендинг", "SEO", "Аналитика", "Рост", "Результат"].map(
              (t, i) => (
                <span key={`${t}-${i}`} className="font-cormorant text-xl italic text-foreground/20 shrink-0">
                  {t} <span className="text-gold/40 not-italic mx-2">✦</span>
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* ─── CTA ─── */}
      <section id="contact" className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div
            data-reveal
            className="opacity-init relative border border-border p-10 md:p-20 overflow-hidden"
            style={{ animation: "fade-up 0.8s ease-out forwards", animationPlayState: "paused" }}
          >
            {/* BG accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/4 blur-[80px] pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-6 h-px bg-gold" />
                <span className="font-golos text-xs text-gold/80 tracking-[0.25em] uppercase">Начать</span>
              </div>
              <h2 className="font-cormorant font-light text-[clamp(36px,7vw,90px)] leading-tight mb-8 text-foreground">
                Готовы к<br /><em className="text-gold not-italic">большому проекту?</em>
              </h2>
              <p className="font-golos text-foreground/50 text-base max-w-md mb-10 leading-relaxed">
                Расскажите о своей задаче — мы ответим в течение одного рабочего дня и предложим конкретный план.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="font-golos text-sm tracking-widest uppercase bg-gold text-background px-10 py-4 hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_50px_rgba(201,168,76,0.35)]">
                  Написать нам
                </button>
                <a
                  href="tel:+79001234567"
                  className="font-golos text-sm tracking-wide text-foreground/60 hover:text-gold transition-colors flex items-center gap-2 px-4 py-4"
                >
                  <Icon name="Phone" size={15} />
                  +7 (900) 123-45-67
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-lg font-semibold tracking-widest text-gold uppercase">
            Студия
          </span>
          <p className="font-golos text-xs text-foreground/30 tracking-wide">
            © 2024 — Все права защищены
          </p>
          <div className="flex items-center gap-6">
            {["Telegram", "VK"].map((s) => (
              <a
                key={s}
                href="#"
                className="font-golos text-xs text-foreground/40 hover:text-gold transition-colors tracking-wide uppercase"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Marquee keyframe via style tag */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        [data-reveal].revealed {
          animation-play-state: running !important;
        }
      `}</style>
    </div>
  );
};

export default Index;
