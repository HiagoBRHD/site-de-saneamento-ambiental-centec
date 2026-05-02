import { memo, useEffect, useState } from "react";

const ScrollProgress = memo(function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (progress === 0) return null;

  return (
    <div
      className="no-print fixed top-0 left-0 w-full z-[100] pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progresso de leitura da página"
    >
      {/* Track */}
      <div className="h-[3px] bg-transparent w-full">
        <div
          className="h-full bg-gradient-to-r from-primary via-amber-400 to-primary relative overflow-hidden transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite linear",
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default ScrollProgress;
