import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, BookOpen, Bell } from 'lucide-react';
import { useStudy } from '../contexts/StudyContext';
import { cn } from '../utils/cn';

export const Pomodoro: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const { addStudyTime } = useStudy();

  const totalTime = mode === 'work' ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        if (mode === 'work' && (totalTime - timeLeft) % 60 === 0) {
          addStudyTime(1);
        }
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      setIsActive(false);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(() => console.log("Audio play failed"));
      
      // Auto switch mode
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, addStudyTime, totalTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-500">
      <div className="glass-card p-10 rounded-[2.5rem] text-center relative overflow-hidden">
        {/* Background Glow */}
        <div className={cn(
          "absolute inset-0 opacity-10 transition-colors duration-500",
          mode === 'work' ? "bg-primary" : "bg-secondary"
        )} />

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            {mode === 'work' ? (
              <div className="bg-primary/20 text-primary px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                <BookOpen size={18} /> Modo Foco
              </div>
            ) : (
              <div className="bg-secondary/20 text-secondary px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                <Coffee size={18} /> Pausa Curta
              </div>
            )}
          </div>

          {/* Circular Progress */}
          <div className="relative w-64 h-64 mx-auto mb-10">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-200 dark:text-white/5"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                strokeLinecap="round"
                className={cn(
                  "transition-all duration-1000",
                  mode === 'work' ? "text-primary" : "text-secondary"
                )}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-bold font-sora tracking-tighter">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button 
              onClick={resetTimer}
              className="p-4 bg-slate-500/10 hover:bg-slate-500/20 rounded-2xl transition-all cursor-pointer"
              title="Resetar"
            >
              <RotateCcw size={24} />
            </button>
            
            <button 
              onClick={toggleTimer}
              className={cn(
                "w-20 h-20 rounded-[2rem] flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 shadow-xl cursor-pointer",
                isActive ? "bg-slate-800 dark:bg-white dark:text-slate-900" : "bg-primary"
              )}
            >
              {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>

            <button 
              className="p-4 bg-slate-500/10 hover:bg-slate-500/20 rounded-2xl transition-all cursor-pointer"
              title="Sons"
            >
              <Bell size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Settings */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button 
          onClick={() => { setMode('work'); setTimeLeft(25 * 60); setIsActive(false); }}
          className={cn(
            "p-4 rounded-2xl border transition-all font-bold text-sm cursor-pointer",
            mode === 'work' ? "bg-primary/10 border-primary text-primary" : "glass-card border-transparent text-slate-500"
          )}
        >
          25:00 Foco
        </button>
        <button 
          onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsActive(false); }}
          className={cn(
            "p-4 rounded-2xl border transition-all font-bold text-sm cursor-pointer",
            mode === 'break' ? "bg-secondary/10 border-secondary text-secondary" : "glass-card border-transparent text-slate-500"
          )}
        >
          05:00 Pausa
        </button>
      </div>
    </div>
  );
};
