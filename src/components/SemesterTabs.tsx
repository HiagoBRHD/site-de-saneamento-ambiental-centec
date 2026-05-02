import { memo, useRef, useEffect } from "react";
import type { Semester } from "../data/curriculum";
import { useStudy } from "../contexts/StudyContext";

interface SemesterTabsProps {
  semesters: Semester[];
  activeSem: string;
  onSwitch: (id: string) => void;
  isSearchActive: boolean;
  isAllExpanded: boolean;
  onToggleAll: () => void;
}

const SemesterTabs = memo(function SemesterTabs({
  semesters,
  activeSem,
  onSwitch,
  isSearchActive,
  isAllExpanded,
  onToggleAll,
}: SemesterTabsProps) {
  const { getSemesterProgress } = useStudy();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchActive || !scrollRef.current) return;
    const active = scrollRef.current.querySelector('[aria-selected="true"]');
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeSem, isSearchActive]);

  return (
    <div className="no-print mb-6">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3 gap-2">
        {/* Título da seção: Sora para dar identidade */}
        <div
          className="font-heading flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100 min-w-0"
          style={{ fontSize: "var(--text-base)", letterSpacing: "-0.01em" }}
        >
          <svg
            className="text-primary w-4 h-4 sm:w-5 sm:h-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          </svg>
          <span className="truncate">
            {isSearchActive ? "Resultados da Busca" : "Selecione o Semestre"}
          </span>
        </div>

        {/* Botão expandir: Plus Jakarta Sans funcional */}
        <button
          onClick={onToggleAll}
          className="font-body shrink-0 flex items-center gap-1.5 h-9 px-3 rounded-xl font-semibold border cursor-pointer transition-all duration-200 whitespace-nowrap text-primary border-primary/30 bg-primary/5 dark:bg-primary/10 hover:bg-primary/15 active:scale-95"
          style={{ fontSize: "var(--text-xs)" }}
          aria-label={isAllExpanded ? "Recolher todas as disciplinas" : "Expandir todas as disciplinas"}
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${isAllExpanded ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          {isAllExpanded ? "Recolher Tudo" : "Expandir Tudo"}
        </button>
      </div>

      {/* Tabs: Sora para rótulos das abas */}
      {!isSearchActive && (
        <div
          ref={scrollRef}
          role="tablist"
          aria-label="Semestres do curso"
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {semesters.map((s) => {
            const isActive = s.id === activeSem;
            const progress = getSemesterProgress(s.id);
            const isComplete = progress.percent === 100;
            const hasProgress = progress.percent > 0;

            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onSwitch(s.id)}
                style={{ scrollSnapAlign: "start", fontSize: "var(--text-sm)" }}
                className={`
                  font-heading relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold
                  cursor-pointer border transition-all duration-200 whitespace-nowrap shrink-0
                  min-h-[44px] select-none
                  ${isActive
                    ? isComplete
                      ? "bg-emerald-500 text-white border-transparent shadow-[0_4px_14px_rgba(16,185,129,0.35)] shadow-emerald-500/30"
                      : "bg-primary text-white border-transparent shadow-[0_4px_14px_rgba(232,119,34,0.35)]"
                    : `border-slate-200 dark:border-slate-700
                       text-slate-600 dark:text-slate-400
                       bg-white dark:bg-slate-800
                       hover:border-slate-300 dark:hover:border-slate-600
                       hover:text-slate-800 dark:hover:text-slate-200
                       hover:-translate-y-px active:scale-95
                       ${isComplete ? "border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400" : ""}
                       ${hasProgress && !isComplete ? "border-primary/20 dark:border-primary/20" : ""}`
                  }
                `}
              >
                {isComplete && (
                  <span className={`text-[10px] ${isActive ? "text-white" : "text-emerald-500"}`} aria-hidden="true">
                    ✓
                  </span>
                )}
                <span>{s.label}</span>
                {hasProgress && !isComplete && (
                  <span
                    className={`font-body text-[10px] font-black rounded-full px-1.5 py-0.5 leading-none ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-primary/12 dark:bg-primary/20 text-primary"
                    }`}
                    aria-label={`${progress.percent}% concluído`}
                  >
                    {progress.percent}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default SemesterTabs;
