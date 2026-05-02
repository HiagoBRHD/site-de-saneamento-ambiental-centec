import { memo, useRef, useEffect, useState, useCallback } from "react";
import { useStudy } from "../contexts/StudyContext";

const Footer = memo(function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { getOverallProgress, completedSubjects } = useStudy();
  const overall = getOverallProgress();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleReset = useCallback(() => {
    if (
      window.confirm(
        "⚠️ Tem certeza que deseja apagar todo o seu progresso e anotações?\n\nEssa ação não pode ser desfeita."
      )
    ) {
      try {
        localStorage.removeItem("sa-study-progress");
        localStorage.removeItem("sa-study-notes");
        window.location.reload();
      } catch {}
    }
  }, []);

  const isComplete = overall.percent === 100;

  return (
    <div
      ref={ref}
      className={`no-print mt-10 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Main footer card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white">
        {/* BG decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #E87722 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative px-6 py-10 sm:py-12 text-center max-w-2xl mx-auto">
          {/* Icon */}
          <div className="text-4xl sm:text-5xl mb-4">
            {isComplete ? "🏆" : "🌿"}
          </div>

          {/* Heading: Sora — impacto máximo, CTA emocional */}
          <h3
            className="font-heading font-extrabold mb-3"
            style={{ fontSize: "var(--text-3xl)", lineHeight: "1.2", letterSpacing: "-0.03em" }}
          >
            {isComplete
              ? "Parabéns! Você completou todo o guia!"
              : overall.percent > 0
              ? "Continue assim! Você está indo muito bem 🚀"
              : "Bons Estudos!"}
          </h3>

          {/* Progress bar (if any progress) */}
          {overall.percent > 0 && (
            <div className="max-w-xs mx-auto mb-4">
              <div className="h-2 rounded-full bg-white/15 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isComplete
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-300"
                      : "bg-gradient-to-r from-primary to-amber-400"
                  }`}
                  style={{ width: `${overall.percent}%` }}
                />
              </div>
              <p className="font-body text-slate-400 mt-1.5 text-center" style={{ fontSize: "var(--text-xs)" }}>
                {overall.checked} de {overall.total} tópicos · {completedSubjects.size} disciplinas completas
              </p>
            </div>
          )}

          {/* Descrição: Plus Jakarta Sans — confortável, legível */}
          <p className="font-body text-slate-300 max-w-md mx-auto mb-6" style={{ fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)" }}>
            {isComplete
              ? "Você estudou todos os tópicos de todas as disciplinas. Você é incrível! 🏅"
              : overall.percent > 0
              ? `${overall.percent}% do conteúdo concluído. Cada tópico estudado faz diferença na sua formação.`
              : "Este guia foi criado para auxiliar no aprendizado ao longo de toda a formação em Tecnologia em Saneamento Ambiental."}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/guia-saneamento-centec.html"
              download="guia-saneamento-centec.html"
              className="font-heading inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-primary text-white hover:bg-primary-hover transition-all duration-200 active:scale-95 shadow-[0_4px_14px_rgba(232,119,34,0.4)] hover:shadow-[0_6px_20px_rgba(232,119,34,0.5)]"
              style={{ fontSize: "var(--text-sm)", letterSpacing: "-0.01em" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Baixar versão HTML offline
            </a>

            {overall.percent > 0 && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 bg-transparent border border-slate-600/50 cursor-pointer hover:border-red-500/60 hover:text-red-400 transition-all duration-200 active:scale-95"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                </svg>
                Resetar progresso
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Legal footer */}
      <div className="text-center py-6 text-[11px] text-slate-400 dark:text-slate-500">
        <p>
          Guia de Estudos · Tecnologia em Saneamento Ambiental · CENTEC
        </p>
        <p className="mt-1">
          Conteúdo baseado na grade curricular oficial do curso. Para fins acadêmicos.
        </p>
      </div>
    </div>
  );
});

export default Footer;
