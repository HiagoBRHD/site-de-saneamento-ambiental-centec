import { memo, useEffect, useState, useCallback } from "react";
import { useStudy } from "../contexts/StudyContext";
import { curriculum } from "../data/curriculum";

const PARTICLE_COUNT = 40;
const COLORS = ["#E87722", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"];
const SHAPES = ["circle", "square", "diamond"];

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
  drift: number;
  shape: string;
  duration: number;
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 0.6,
    size: 5 + Math.random() * 8,
    drift: (Math.random() - 0.5) * 120,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    duration: 2.2 + Math.random() * 1.2,
  }));
}

const CompletionCelebration = memo(function CompletionCelebration() {
  const { recentlyCompleted, clearRecentlyCompleted } = useStudy();
  const [show, setShow] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [particles] = useState(generateParticles);

  useEffect(() => {
    if (!recentlyCompleted) return;

    for (const sem of curriculum) {
      for (const sub of sem.subjects) {
        if (sub.id === recentlyCompleted) {
          setSubjectName(sub.name);
          break;
        }
      }
    }

    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      clearRecentlyCompleted();
    }, 4000);

    return () => clearTimeout(timer);
  }, [recentlyCompleted, clearRecentlyCompleted]);

  const handleDismiss = useCallback(() => {
    setShow(false);
    clearRecentlyCompleted();
  }, [clearRecentlyCompleted]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
      role="dialog"
      aria-modal="true"
      aria-label="Disciplina concluída"
    >
      {/* Confetti particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 confetti-particle"
          aria-hidden="true"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.shape === "diamond" ? p.size : p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === "circle" ? "50%" : p.shape === "diamond" ? "2px" : "3px",
            transform: p.shape === "diamond" ? "rotate(45deg)" : undefined,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift" as string]: `${p.drift}px`,
            opacity: 1,
          }}
        />
      ))}

      {/* Toast */}
      <div
        className="pointer-events-auto celebration-toast relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-sm w-[calc(100%-2rem)] mx-4 overflow-hidden border border-slate-100 dark:border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-amber-400 to-emerald-400" />

        <div className="px-6 py-6 text-center">
          {/* Emoji */}
          <div className="text-5xl mb-3 animate-float">🎉</div>

          <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-2 leading-tight">
            Disciplina Concluída!
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
            Você completou todos os tópicos de{" "}
            <strong className="text-primary font-bold">{subjectName}</strong>.{" "}
            Continue assim, você está no caminho certo! 🌿
          </p>

          <button
            onClick={handleDismiss}
            className="w-full py-2.5 px-5 rounded-xl bg-primary text-white text-sm font-bold cursor-pointer border-none hover:bg-primary-hover transition-all duration-200 active:scale-95 shadow-[0_4px_12px_rgba(232,119,34,0.3)]"
          >
            Continuar Estudando 🚀
          </button>
        </div>
      </div>
    </div>
  );
});

export default CompletionCelebration;
