import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, XCircle, ChevronLeft, ChevronRight, Brain } from 'lucide-react';
import { cn } from '../utils/cn';

interface Flashcard {
  question: string;
  answer: string;
}

interface FlashcardsProps {
  cards: Flashcard[];
  onClose: () => void;
}

export const Flashcards: React.FC<FlashcardsProps> = ({ cards, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState<Record<number, boolean>>({});

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const toggleMastered = () => {
    setMastered(prev => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto p-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
          <Brain size={24} />
        </div>
        <h3 className="text-xl font-bold font-sora">Revisão Ativa</h3>
        <span className="text-slate-500 text-sm font-bold ml-4">
          {currentIndex + 1} / {cards.length}
        </span>
      </div>

      {/* Card Container */}
      <div 
        className="w-full aspect-[4/3] relative perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={cn(
          "w-full h-full relative transition-all duration-500 preserve-3d shadow-2xl rounded-[2.5rem]",
          isFlipped && "rotate-y-180"
        )}>
          {/* Front */}
          <div className="absolute inset-0 backface-hidden glass-card p-12 flex flex-col items-center justify-center text-center rounded-[2.5rem] border-2 border-primary/20">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-6">Pergunta</p>
            <h4 className="text-2xl md:text-3xl font-bold font-sora leading-tight">
              {currentCard.question}
            </h4>
            <div className="mt-12 flex items-center gap-2 text-slate-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <RefreshCw size={16} className="animate-spin-slow" /> Clique para virar
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card p-12 flex flex-col items-center justify-center text-center rounded-[2.5rem] border-2 border-secondary/20 bg-primary/5">
            <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-6">Resposta / Explicação</p>
            <p className="text-xl md:text-2xl font-medium leading-relaxed">
              {currentCard.answer}
            </p>
            <div className="mt-12 flex items-center gap-2 text-slate-400 text-sm font-medium">
              <RefreshCw size={16} /> Clique para voltar
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-10 w-full">
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="p-4 glass-card rounded-2xl hover:text-primary transition-all cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex-1 flex gap-4">
          <button 
            onClick={(e) => { e.stopPropagation(); toggleMastered(); }}
            className={cn(
              "flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer",
              mastered[currentIndex] 
                ? "bg-primary text-white" 
                : "bg-slate-500/10 text-slate-500 hover:bg-primary/20"
            )}
          >
            {mastered[currentIndex] ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            {mastered[currentIndex] ? 'Dominado' : 'Marcar como Dominado'}
          </button>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="p-4 glass-card rounded-2xl hover:text-primary transition-all cursor-pointer"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <button 
        onClick={onClose}
        className="mt-8 text-slate-400 hover:text-red-500 transition-colors font-bold text-sm uppercase tracking-widest cursor-pointer"
      >
        Encerrar Revisão
      </button>
    </div>
  );
};

const Circle = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="128" cy="128" r="120" />
  </svg>
);
