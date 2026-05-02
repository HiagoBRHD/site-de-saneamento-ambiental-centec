import { memo, useState, useEffect } from "react";

interface HowToBarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const HowToBar = memo(function HowToBar({ isDark, onToggleTheme }: HowToBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`no-print sticky top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 glass sticky-shadow"
          : "bg-white dark:bg-slate-900"
      } border-b border-slate-200/80 dark:border-slate-800 animate-fade-in`}
      style={{ animationDelay: "0.6s" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-3">
        {/* Logo + instrução */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-sm">
            🌿
          </div>
          <p className="font-body truncate" style={{ fontSize: "var(--text-sm)" }}>
            {/* Título da barra: Sora para dar identidade */}
            <span className="font-heading hidden sm:inline font-semibold text-slate-700 dark:text-slate-200"
              style={{ fontSize: "var(--text-sm)", letterSpacing: "-0.01em" }}>
              Saneamento Ambiental{" "}
            </span>
            {/* Instrução: Plus Jakarta Sans, leve, funcional */}
            <span className="font-body text-slate-500 dark:text-slate-400">
              <span className="hidden sm:inline">— </span>Selecione um semestre e explore as disciplinas
            </span>
          </p>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleTheme}
            className="font-body flex items-center gap-1.5 h-9 px-3 rounded-xl border transition-all duration-200 cursor-pointer whitespace-nowrap
              bg-slate-50 dark:bg-slate-800
              border-slate-200 dark:border-slate-700
              text-slate-600 dark:text-slate-300
              hover:border-primary/50 hover:text-primary dark:hover:text-primary
              active:scale-95"
            style={{ fontSize: "var(--text-xs)", fontWeight: 600 }}
            aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            <span className="text-sm" aria-hidden="true">
              {isDark ? "☀️" : "🌙"}
            </span>
            <span className="hidden sm:inline">{isDark ? "Claro" : "Escuro"}</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default HowToBar;
