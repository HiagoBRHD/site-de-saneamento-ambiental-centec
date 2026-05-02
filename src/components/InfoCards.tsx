import { memo, useRef, useEffect, useState } from "react";
import { useStudy } from "../contexts/StudyContext";
import { curriculum } from "../data/curriculum";

const InfoCards = memo(function InfoCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { getOverallProgress, completedSubjects, notes } = useStudy();

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
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const overall = getOverallProgress();
  const totalSubjects = curriculum.reduce((acc, s) => acc + s.subjects.length, 0);
  const noteCount = Object.keys(notes).length;

  const cards = [
    {
      icon: "📊",
      color: "orange",
      title: "Seu Progresso",
      highlight: overall.percent > 0,
      value: overall.percent > 0 ? `${overall.percent}%` : null,
      desc:
        overall.percent > 0
          ? `${overall.checked} de ${overall.total} tópicos · ${completedSubjects.size} de ${totalSubjects} disciplinas completas`
          : "Marque os tópicos nas disciplinas para acompanhar seu progresso aqui.",
    },
    {
      icon: "📝",
      color: "yellow",
      title: "Anotações",
      highlight: noteCount > 0,
      value: noteCount > 0 ? `${noteCount}` : null,
      desc:
        noteCount > 0
          ? `disciplina${noteCount !== 1 ? "s" : ""} com anotações. Abra qualquer disciplina e clique em "Minhas Anotações" para editar.`
          : 'Adicione notas pessoais em cada disciplina. Clique em "Minhas Anotações" dentro de qualquer card.',
    },
    {
      icon: "📶",
      color: "blue",
      title: "Funciona Offline",
      highlight: false,
      value: null,
      desc: "Salve o arquivo HTML no seu dispositivo. Funciona sem internet — seu progresso fica salvo no navegador.",
    },
    {
      icon: "📚",
      color: "green",
      title: "Grade Curricular",
      highlight: false,
      value: `${totalSubjects}`,
      desc: `disciplinas em 7 semestres + optativas. Conteúdo completo com mais de ${overall.total || 340} tópicos.`,
    },
  ] as const;

  const colorMap: Record<string, string> = {
    orange: "bg-orange-50 dark:bg-orange-950/30 text-orange-500",
    yellow: "bg-amber-50 dark:bg-amber-950/30 text-amber-500",
    blue:   "bg-blue-50 dark:bg-blue-950/30 text-blue-500",
    green:  "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500",
  };

  const borderMap: Record<string, string> = {
    orange: "border-orange-100 dark:border-orange-900/40",
    yellow: "border-amber-100 dark:border-amber-900/40",
    blue:   "border-blue-100 dark:border-blue-900/40",
    green:  "border-emerald-100 dark:border-emerald-900/40",
  };

  return (
    <div
      ref={ref}
      className="no-print grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-10"
      aria-label="Informações e dicas de uso"
    >
      {cards.map((card, i) => (
        <div
          key={card.title}
          className={`
            rounded-2xl p-4 sm:p-5 border transition-all duration-500
            bg-white dark:bg-slate-800
            ${card.highlight ? borderMap[card.color] : "border-slate-200 dark:border-slate-700"}
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
        >
          <div className="flex items-start gap-3.5">
            {/* Icon box */}
            <div
              className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl ${colorMap[card.color]}`}
              aria-hidden="true"
            >
              {card.icon}
            </div>

            {/* Text */}
            <div className="min-w-0">
              {/* Título do card: Sora — hierarquia clara */}
              <h4
                className="font-heading font-bold text-slate-800 dark:text-slate-100 mb-1"
                style={{ fontSize: "var(--text-sm)", letterSpacing: "-0.01em" }}
              >
                {card.title}
              </h4>
              {/* Descrição: Plus Jakarta Sans — confortável para leitura */}
              <p
                className="font-body text-slate-500 dark:text-slate-400"
                style={{ fontSize: "var(--text-xs)", lineHeight: "1.65" }}
              >
                {card.value !== null ? (
                  <>
                    <span
                      className="font-heading font-bold text-slate-700 dark:text-slate-200"
                      style={{ fontSize: "var(--text-sm)" }}
                    >
                      {card.value}{" "}
                    </span>
                    {card.desc}
                  </>
                ) : (
                  card.desc
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default InfoCards;
