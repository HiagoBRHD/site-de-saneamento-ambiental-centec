import { memo, useEffect, useState, useCallback } from "react";

const BackToTop = memo(function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setVisible(scrollY > 300);
        setProgress(docH > 0 ? Math.round((scrollY / docH) * 100) : 0);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const circumference = 2 * Math.PI * 16;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label={`Voltar ao topo (${progress}% lido)`}
      className={`
        no-print fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50
        w-12 h-12 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200
        shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]
        flex items-center justify-center cursor-pointer border border-slate-200 dark:border-slate-700
        transition-all duration-300
        hover:shadow-[0_6px_24px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:border-primary/40 hover:text-primary
        active:scale-90
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      {/* Circular progress */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 40 40"
        aria-hidden="true"
      >
        <circle
          cx="20" cy="20" r="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-slate-100 dark:text-slate-700"
        />
        <circle
          cx="20" cy="20" r="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary transition-all duration-300"
        />
      </svg>

      {/* Arrow icon */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
});

export default BackToTop;
