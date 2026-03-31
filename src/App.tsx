//src/App.tsx

import { useState, useEffect, useRef } from "react";
import logo from "./assets/MR.png";

// ---------- Types ----------
type SectionId = "divisa" | "ideais" | "pacto" | "hino" | "igreja";

// ---------- Data ----------
const ideais = [
  { icon: "🙏", text: "Viverei em Cristo pela Oração" },
  { icon: "📖", text: "Crescerei em sabedoria pelo estudo da Bíblia" },
  { icon: "⚖️", text: "Reconhecerei minha mordomia" },
  { icon: "🌸", text: "Enfeitar-me-ei com boas obras" },
  { icon: "✝️", text: "Aceitarei a responsabilidade da grande comissão" },
];

const hinoVerses = [
  {
    number: 1,
    lines: [
      "Às nações contaremos a história,",
      "Que é capaz de livrá-las do mal;",
      "Revela a verdade e a vida",
      "E dá uma paz real,",
      "E dá uma paz real.",
    ],
  },
  {
    number: 2,
    lines: [
      "Às nações cantaremos um hino,",
      "Pra atrair corações ao Senhor;",
      "Dissipa a tristeza e a mágoa,",
      "Difunde no mundo amor,",
      "Difunde no mundo amor.",
    ],
  },
  {
    number: 3,
    lines: [
      "Às nações mostraremos o Cristo,",
      "Pois só Ele conduz para os céus;",
      "Que assim por Jesus todos venham",
      "Hu - mildes servir a Deus,",
      "Humildes servir a Deus.",
    ],
  },
  {
    number: 4,
    lines: [
      "Às nações pregaremos a nova,",
      "Que Jesus outra vez há de vir;",
      "E salva por fé todo aquele",
      "Que sua palavra ouvir,",
      "Que sua palavra ouvir.",
    ],
  },
];

const refraoLines = [
  "Raiará novo dia de glória,",
  "Quando Cristo Jesus retornar,",
  "E as nações pelo mundo inteiro",
  "Diante dEle vão se curvar.",
];

// ---------- Hooks ----------
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ---------- Sub-components ----------

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { label: string; id: SectionId }[] = [
    { label: "Divisa", id: "divisa" },
    { label: "Ideais", id: "ideais" },
    { label: "Pacto", id: "pacto" },
    { label: "Hino", id: "hino" },
    { label: "Igreja", id: "igreja" },
  ];

  const scrollTo = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(15, 68, 32, 0.97)"
          : "linear-gradient(180deg, rgba(15,68,32,0.85) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.25)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            <img src={logo} alt="logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="font-bold text-white leading-tight" style={{ fontFamily: "Cinzel, serif", fontSize: "0.95rem" }}>
              Mensageiras
            </p>
            <p style={{ fontFamily: "Cinzel, serif", fontSize: "0.7rem", color: "#f0c030", letterSpacing: "0.1em" }}>
              DO REI
            </p>
          </div>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                className="text-white font-semibold text-sm tracking-widest uppercase transition-colors duration-200 hover:text-yellow-300"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4" style={{ background: "rgba(15, 68, 32, 0.98)" }}>
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="block w-full text-left py-3 text-white font-semibold text-sm border-b border-green-700 tracking-widest uppercase hover:text-yellow-300 transition-colors"
              style={{ fontFamily: "Open Sans, sans-serif" }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0a3318 0%, #1a5c2e 40%, #0f4420 70%, #082910 100%)",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-[-120px] right-[-120px] w-96 h-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #f0c030, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #f0c030, transparent 70%)" }}
      />

      {/* Animated stars/particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              background: "#f0c030",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${Math.random() * 4 + 2}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Crown icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #b8860b, #d4a017, #f0c030, #d4a017)",
              boxShadow: "0 0 60px rgba(240,192,48,0.5), 0 0 120px rgba(240,192,48,0.2)",
            }}
          >
            <span className="text-5xl">👑</span>
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-white mb-2 leading-tight"
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(2.2rem, 7vw, 4.5rem)",
            fontWeight: 900,
            textShadow: "0 2px 30px rgba(0,0,0,0.5)",
            letterSpacing: "0.05em",
          }}
        >
          Mensageiras
        </h1>
        <h2
          className="mb-6"
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
            fontWeight: 600,
            color: "#f0c030",
            letterSpacing: "0.3em",
            textShadow: "0 0 30px rgba(240,192,48,0.6)",
          }}
        >
          DO REI
        </h2>

        {/* Dividing ornament */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, #f0c030)" }} />
          <span style={{ color: "#f0c030", fontSize: "1.2rem" }}>✦</span>
          <div className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, #f0c030)" }} />
        </div>

        {/* Verse */}
        <blockquote
          className="text-white italic text-lg md:text-xl mb-10 px-4"
          style={{ fontFamily: "Lora, serif", lineHeight: 1.8 }}
        >
          "Levanta-te, resplandece, porque já vem a tua luz."
          <span className="block mt-2 text-sm not-italic font-semibold" style={{ color: "#f0c030", letterSpacing: "0.1em" }}>
            — Isaías 60.1a
          </span>
        </blockquote>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          {(["divisa", "ideais", "pacto", "hino"] as SectionId[]).map((id) => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="capitalize px-7 py-3 rounded-full font-bold tracking-widest text-sm transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "Open Sans, sans-serif",
                background: "linear-gradient(135deg, #d4a017, #f0c030)",
                color: "#0a3318",
                boxShadow: "0 4px 20px rgba(240,192,48,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 30px rgba(240,192,48,0.7)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(240,192,48,0.4)";
              }}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs tracking-widest uppercase" style={{ color: "#f0c030", fontFamily: "Open Sans, sans-serif" }}>
          Explorar
        </span>
        <span style={{ color: "#f0c030", fontSize: "1.4rem" }}>↓</span>
      </div>

      <style>{`
        @keyframes twinkle {
          from { opacity: 0.1; transform: scale(1); }
          to   { opacity: 0.6; transform: scale(1.5); }
        }
      `}</style>
    </section>
  );
}

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <h2
        className="inline-block relative"
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
          fontWeight: 700,
          color: "#0a3318",
          letterSpacing: "0.06em",
        }}
      >
        {children}
        <span
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 rounded-full"
          style={{ width: "60%", background: "linear-gradient(to right, #d4a017, #f0c030, #d4a017)" }}
        />
      </h2>
      {subtitle && (
        <p className="mt-6 text-gray-500 text-sm tracking-widest uppercase" style={{ fontFamily: "Open Sans, sans-serif" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function DivisaSection() {
  const { ref, inView } = useInView();
  return (
    <section id="divisa" className="py-24 px-4" style={{ background: "#ffffff" }}>
      <div
        ref={ref}
        className="max-w-4xl mx-auto transition-all duration-1000"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)" }}
      >
        <SectionTitle subtitle="Nossa inspiração">Divisa</SectionTitle>

        <div
          className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #0a3318 0%, #1a5c2e 50%, #0f4420 100%)",
          }}
        >
          {/* Corner ornaments */}
          <span className="absolute top-4 left-4 text-2xl" style={{ color: "#f0c030", opacity: 0.5 }}>✦</span>
          <span className="absolute top-4 right-4 text-2xl" style={{ color: "#f0c030", opacity: 0.5 }}>✦</span>
          <span className="absolute bottom-4 left-4 text-2xl" style={{ color: "#f0c030", opacity: 0.5 }}>✦</span>
          <span className="absolute bottom-4 right-4 text-2xl" style={{ color: "#f0c030", opacity: 0.5 }}>✦</span>

          {/* Quote marks */}
          <div className="text-7xl leading-none mb-4" style={{ color: "#f0c030", opacity: 0.4, fontFamily: "Georgia, serif" }}>
            "
          </div>

          <blockquote
            className="text-white text-2xl md:text-3xl font-semibold italic leading-relaxed mb-6"
            style={{ fontFamily: "Lora, serif" }}
          >
            Levanta-te, resplandece, porque já vem a tua luz.
          </blockquote>

          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-16" style={{ background: "#f0c030" }} />
            <span className="text-2xl">✨</span>
            <div className="h-px w-16" style={{ background: "#f0c030" }} />
          </div>

          <p
            className="font-bold tracking-widest text-sm uppercase mt-4"
            style={{ color: "#f0c030", fontFamily: "Open Sans, sans-serif" }}
          >
            Isaías 60.1a
          </p>

          <div className="mt-8 flex justify-center">
            <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
          </div>        </div>
      </div>
    </section>
  );
}

function IdeaisSection() {
  const { ref, inView } = useInView();
  return (
    <section
      id="ideais"
      className="py-24 px-4"
      style={{ background: "linear-gradient(180deg, #f9f7f0 0%, #fff9e6 100%)" }}
    >
      <div
        ref={ref}
        className="max-w-5xl mx-auto transition-all duration-1000"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)" }}
      >
        <SectionTitle subtitle="Compromissos de vida">Ideais</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideais.map((ideal, index) => (
            <div
              key={index}
              className="group relative rounded-2xl p-7 shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-1 overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1px solid #e8f5ec",
                transitionDelay: `${index * 80}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.7s ease ${index * 100}ms`,
              }}
            >
              {/* Accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: "linear-gradient(to right, #0a3318, #f0c030)" }}
              />

              {/* Number badge */}
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "linear-gradient(135deg, #d4a017, #f0c030)", color: "#0a3318" }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 shadow-md group-hover:scale-110 transition-transform duration-300"
                style={{ background: "linear-gradient(135deg, #0a3318, #1a5c2e)" }}
              >
                {ideal.icon}
              </div>

              <p
                className="text-gray-700 font-medium leading-relaxed"
                style={{ fontFamily: "Lora, serif", fontSize: "1rem" }}
              >
                {ideal.text}
              </p>
            </div>
          ))}

          {/* Last card: decorative */}
          <div
            className="rounded-2xl p-7 flex flex-col items-center justify-center text-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #0a3318, #1a5c2e)",
              opacity: inView ? 1 : 0,
              transition: `all 0.7s ease ${ideais.length * 100}ms`,
            }}
          >
            <div className="text-5xl mb-3">🌟</div>
            <p
              className="text-white font-semibold italic text-lg"
              style={{ fontFamily: "Lora, serif" }}
            >
              "Assim brilhe a vossa luz diante dos homens"
            </p>
            <p className="mt-3 text-xs font-bold tracking-widest uppercase" style={{ color: "#f0c030" }}>
              Mateus 5.16
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PactoSection() {
  const { ref, inView } = useInView();

  const pactoText =
    "Reconhecendo as necessidades do mundo perdido nas trevas do pecado e desejando atender ao mandamento do Mestre, prometo esforçar-me para:";

  const pactoItems = [
    "Ser fiel ao serviço de Cristo, cooperando com as atividades da igreja e da denominação.",
    "Contribuir e orar pelo trabalho de missões no Brasil e no mundo.",
    "Lutar por conservar a mente pura, o corpo limpo e pronto para o serviço.",
    "Falar sempre a verdade e não tomar o nome de Deus em vão.",
    "Reconhecer e corrigir os meus erros.",
  ];

  const pactoClosing =
    "Só assim crescerei espiritualmente na presença do meu Rei.";

  return (
    <section id="pacto" className="py-24 px-4" style={{ background: "#ffffff" }}>
      <div
        ref={ref}
        className="max-w-4xl mx-auto transition-all duration-1000"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)" }}
      >
        <SectionTitle subtitle="Nossa promessa">Pacto</SectionTitle>

        <div
          className="relative rounded-3xl p-10 md:p-14 shadow-2xl overflow-hidden"
          style={{ background: "linear-gradient(160deg, #f9f7f0 0%, #fff9e6 100%)", border: "2px solid #d4a01740" }}
        >
          {/* Top ornament */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #d4a017)" }} />
            <span className="text-3xl">✦</span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #d4a017)" }} />
          </div>

          {/* Scroll icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg"
              style={{ background: "linear-gradient(135deg, #0a3318, #1a5c2e)" }}
            >
              📜
            </div>
          </div>

          {/* Intro text */}
          <p
            className="text-gray-600 text-center mb-8 italic text-lg leading-relaxed"
            style={{ fontFamily: "Lora, serif" }}
          >
            {pactoText}
          </p>

          {/* List */}
          <ul className="space-y-4 mb-8">
            {pactoItems.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:shadow-md"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e8f5ec",
                  opacity: inView ? 1 : 0,
                  transition: `all 0.6s ease ${i * 120}ms`,
                  transform: inView ? "translateX(0)" : "translateX(-20px)",
                }}
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{ background: "linear-gradient(135deg, #d4a017, #f0c030)", color: "#0a3318" }}
                >
                  {i + 1}
                </span>
                <p className="text-gray-700 font-medium leading-relaxed" style={{ fontFamily: "Lora, serif" }}>
                  {item}
                </p>
              </li>
            ))}
          </ul>

          {/* Closing */}
          <div
            className="text-center p-6 rounded-2xl"
            style={{ background: "linear-gradient(135deg, #0a3318, #1a5c2e)" }}
          >
            <p
              className="text-white font-bold text-xl italic"
              style={{ fontFamily: "Lora, serif" }}
            >
              "{pactoClosing}"
            </p>
            <div className="mt-4 flex justify-center">
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            </div>
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #d4a017)" }} />
            <span className="text-3xl">✦</span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #d4a017)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HinoSection() {
  const { ref, inView } = useInView();
  const [activeVerse, setActiveVerse] = useState<number | null>(null);

  return (
    <section
      id="hino"
      className="py-24 px-4"
      style={{ background: "linear-gradient(160deg, #0a3318 0%, #1a5c2e 50%, #0f4420 100%)" }}
    >
      <div
        ref={ref}
        className="max-w-5xl mx-auto transition-all duration-1000"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)" }}
      >
        {/* Title */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4">
            <span className="text-5xl">🎵</span>
          </div>
          <h2
            className="inline-block relative"
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "0.06em",
            }}
          >
            Hino
            <span
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 rounded-full"
              style={{ width: "60%", background: "linear-gradient(to right, #d4a017, #f0c030, #d4a017)" }}
            />
          </h2>
          <p
            className="mt-8 text-sm tracking-widest uppercase"
            style={{ color: "#f0c030", fontFamily: "Open Sans, sans-serif" }}
          >
            Contaremos a História
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {hinoVerses.map((verse, idx) => (
            <div
              key={verse.number}
              className="rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{
                background: activeVerse === idx ? "rgba(240,192,48,0.18)" : "rgba(255,255,255,0.07)",
                border: activeVerse === idx ? "2px solid #f0c030" : "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                opacity: inView ? 1 : 0,
                transition: `all 0.7s ease ${idx * 120}ms`,
              }}
              onClick={() => setActiveVerse(activeVerse === idx ? null : idx)}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #d4a017, #f0c030)", color: "#0a3318" }}
                >
                  {verse.number}
                </span>
                <div className="h-px flex-1" style={{ background: "rgba(240,192,48,0.3)" }} />
                <span style={{ color: "#f0c030" }}>🎶</span>
              </div>
              {verse.lines.map((line, li) => (
                <p
                  key={li}
                  className="leading-relaxed"
                  style={{
                    fontFamily: "Lora, serif",
                    color: li >= verse.lines.length - 2 ? "#f0c030" : "#e8f5ec",
                    fontStyle: li >= verse.lines.length - 2 ? "italic" : "normal",
                    fontSize: "0.97rem",
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Refrão */}
        <div
          className="rounded-3xl p-10 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(212,160,23,0.25), rgba(240,192,48,0.15))",
            border: "2px solid rgba(240,192,48,0.5)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="absolute top-4 left-6 text-5xl opacity-20" style={{ color: "#f0c030" }}>
            ♪
          </div>
          <div className="absolute bottom-4 right-6 text-5xl opacity-20" style={{ color: "#f0c030" }}>
            ♪
          </div>

          <p
            className="font-bold tracking-widest text-xs uppercase mb-6"
            style={{ color: "#f0c030", fontFamily: "Open Sans, sans-serif" }}
          >
            ✦ Refrão ✦
          </p>

          {refraoLines.map((line, i) => (
            <p
              key={i}
              className="text-white text-lg md:text-xl leading-relaxed font-semibold"
              style={{ fontFamily: "Lora, serif" }}
            >
              {line}
            </p>
          ))}

          <div className="mt-6 flex justify-center gap-2">
            <span className="text-2xl">🕊️</span>
            <span className="text-2xl">✨</span>
            <span className="text-2xl">🕊️</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function IgrejaSection() {
  const { ref, inView } = useInView();

  return (
    <section id="igreja" className="py-24 px-4 bg-white">
      <div
        ref={ref}
        className="max-w-4xl mx-auto text-center transition-all duration-1000"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
        }}
      >
        <SectionTitle subtitle="Nossa comunidade">Igreja Local</SectionTitle>

        <p className="text-gray-600 mb-8">
          Conheça nossa igreja e entre em contato conosco.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/5575999450485"
            target="_blank"
            className="px-6 py-3 rounded-full font-bold text-white"
            style={{
              background: "#25D366",
            }}
          >
            WhatsApp
          </a>

          {/* Site MCM */}
          <a
            href="https://www.mulheresbatistas.org.br/"
            target="_blank"
            className="px-6 py-3 rounded-full font-bold"
            style={{
              background: "#f0c030",
              color: "#0a3318",
            }}
          >
            Site MCM
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-12 px-4 text-center"
      style={{ background: "#061d0e", borderTop: "2px solid rgba(212,160,23,0.3)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-xl overflow-hidden">
            <img src={logo} alt="logo" className="w-full h-full object-contain" />
          </div>
          <h3
            className="text-white font-bold text-xl"
            style={{ fontFamily: "Cinzel, serif", letterSpacing: "0.1em" }}
          >
            Mensageiras do Rei
          </h3>
        </div>

        {/* Verse */}
        <p
          className="italic mb-6 text-sm leading-relaxed max-w-md mx-auto"
          style={{ color: "#a0c8a8", fontFamily: "Lora, serif" }}
        >
          "Levanta-te, resplandece, porque já vem a tua luz."
          <br />
          <span className="not-italic font-bold" style={{ color: "#f0c030" }}>
            — Isaías 60.1a
          </span>
        </p>

        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, #d4a017)" }} />
          <span style={{ color: "#f0c030" }}>✦</span>
          <div className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, #d4a017)" }} />
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {["Divisa", "Ideais", "Pacto", "Hino"].map((item) => (
            <button
              key={item}
              onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm font-semibold tracking-widest uppercase transition-colors hover:text-yellow-300"
              style={{ color: "#a0c8a8", fontFamily: "Open Sans, sans-serif" }}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="text-xs" style={{ color: "#4a7a5a", fontFamily: "Open Sans, sans-serif" }}>
          © {new Date().getFullYear()} Mensageiras do Rei — Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}

// ---------- Main App ----------
export default function App() {
  return (
    <div className="font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <DivisaSection />
      <IdeaisSection />
      <PactoSection />
      <HinoSection />
      <IgrejaSection />
      <Footer />
    </div>
  );
}
