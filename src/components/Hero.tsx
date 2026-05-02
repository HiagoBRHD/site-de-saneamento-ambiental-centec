import { memo } from "react";
import { useStudy } from "../contexts/StudyContext";

const Hero = memo(function Hero() {
  const { getOverallProgress } = useStudy();
  const overall = getOverallProgress();

  const stats = [
    { val: "7", lbl: "Semestres", icon: "📅" },
    { val: "43", lbl: "Disciplinas", icon: "📚" },
    { val: "350+", lbl: "Tópicos", icon: "📖" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white no-print">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #E87722 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 right-0 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute top-12 left-6 sm:left-16 w-20 h-20 rounded-full border border-white/10 animate-float opacity-40" style={{ animationDelay: "0s" }} />
        <div className="absolute top-24 left-10 sm:left-24 w-8 h-8 rounded-full border border-primary/30 animate-float opacity-60" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-8 right-8 sm:right-20 w-16 h-16 rounded-full border border-white/10 animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Conteúdo */}
      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-12 pb-10 sm:pt-16 sm:pb-14 text-center">

        {/* Eyebrow badge */}
        <div
          className="animate-fade-down inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/15 mb-5"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {/* Eyebrow usa Plus Jakarta Sans: label, funcional */}
          <span className="eyebrow text-amber-300">🌿 Guia Completo · CENTEC</span>
        </div>

        {/* Título principal — Sora: impactante, criativa, hierarquia clara */}
        <h1
          className="font-heading animate-fade-up mb-4"
          style={{
            fontSize: "clamp(1.75rem, 6vw, 3.25rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            animationDelay: "0.15s",
          }}
        >
          Tecnologia em{" "}
          <span className="text-gradient block sm:inline">
            Saneamento Ambiental
          </span>
        </h1>

        {/* Subtítulo — Plus Jakarta Sans: legível, suave, guia o olhar */}
        <p
          className="animate-fade-up lead text-slate-300 max-w-xl mx-auto mb-8"
          style={{ animationDelay: "0.28s" }}
        >
          Um curso que transforma conhecimento em impacto real — na saúde das
          comunidades, na qualidade da água e no futuro do meio ambiente.
        </p>

        {/* Stats */}
        <div
          className="animate-fade-up flex items-center justify-center gap-3 sm:gap-6 flex-wrap mb-8"
          style={{ animationDelay: "0.4s" }}
        >
          {stats.map((s) => (
            <div
              key={s.lbl}
              className="group text-center bg-white/8 hover:bg-white/14 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/10 transition-all duration-200 cursor-default min-w-[80px] sm:min-w-[96px]"
            >
              <div className="text-base mb-0.5">{s.icon}</div>
              {/* Valor: Sora bold — impacto visual máximo */}
              <div
                className="font-heading text-white leading-none"
                style={{ fontSize: "clamp(1.5rem, 4vw, 1.875rem)", fontWeight: 800 }}
              >
                {s.val}
              </div>
              {/* Label: Plus Jakarta Sans — legível, discreta */}
              <div className="eyebrow text-slate-400 mt-1">
                {s.lbl}
              </div>
            </div>
          ))}

          {/* Progresso */}
          <div
            className={`text-center backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border transition-all duration-200 cursor-default min-w-[80px] sm:min-w-[96px] ${
              overall.percent > 0
                ? overall.percent === 100
                  ? "bg-emerald-500/20 border-emerald-400/30"
                  : "bg-primary/20 border-primary/30"
                : "bg-white/8 border-white/10"
            }`}
          >
            <div className="text-base mb-0.5">📊</div>
            <div
              className={`font-heading leading-none ${
                overall.percent === 100
                  ? "text-emerald-400"
                  : overall.percent > 0
                  ? "text-primary"
                  : "text-white"
              }`}
              style={{ fontSize: "clamp(1.5rem, 4vw, 1.875rem)", fontWeight: 800 }}
            >
              {overall.percent}%
            </div>
            <div className="eyebrow text-slate-400 mt-1">Progresso</div>
          </div>
        </div>

        {/* Barra de progresso geral */}
        {overall.percent > 0 && (
          <div
            className="animate-fade-up max-w-sm mx-auto"
            style={{ animationDelay: "0.55s" }}
          >
            <div className="flex items-center justify-between mb-1.5">
              {/* Plus Jakarta Sans no rótulo da barra */}
              <span className="font-body text-slate-400" style={{ fontSize: "var(--text-xs)" }}>
                Tópicos concluídos
              </span>
              <span className="font-body font-bold text-white" style={{ fontSize: "var(--text-xs)" }}>
                {overall.checked} / {overall.total}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden ${
                  overall.percent === 100
                    ? "bg-gradient-to-r from-emerald-400 to-emerald-300"
                    : "bg-gradient-to-r from-primary to-amber-400"
                }`}
                style={{ width: `${overall.percent}%` }}
              >
                <div className="absolute inset-0 progress-shimmer" />
              </div>
            </div>
            {overall.percent === 100 && (
              <p className="font-heading text-emerald-400 mt-2" style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>
                🏆 Parabéns! Você completou todo o guia!
              </p>
            )}
          </div>
        )}
      </div>

      {/* Wave divider */}
      <div className="relative h-10 overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1440 40"
          className="absolute bottom-0 w-full text-slate-50 dark:text-slate-900"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C240,10 480,0 720,10 C960,20 1200,40 1440,30 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </section>
  );
});

export default Hero;
