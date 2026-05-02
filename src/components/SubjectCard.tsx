import React, { useState, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Download, 
  BookOpen, 
  FileText,
  ChevronRight,
  Maximize2,
  Brain,
  Loader2
} from 'lucide-react';
import { Flashcards } from './Flashcards';
import { useStudy } from '../contexts/StudyContext';
import { bundledContent } from '../data/curriculum/index';
import { downloadPDF } from '../utils/download';
import { cn } from '../utils/cn';

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
  };
}

export const SubjectCard = memo(({ subject }: SubjectCardProps) => {
  const { notes, updateNote } = useStudy();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const content = bundledContent[subject.id] || "Conteúdo não disponível.";

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDownloading(true);
    await downloadPDF(subject.id, subject.name);
    setIsDownloading(false);
  };

  return (
    <>
      <div 
        className="glass-card p-6 rounded-3xl hover:border-primary/50 transition-all group relative overflow-hidden flex flex-col h-full cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <BookOpen size={24} />
          </div>
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer disabled:opacity-50"
          >
            {isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
          </button>
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {subject.name}
        </h3>
        
        <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1">
          Explore os tópicos, bibliografias e faça suas anotações pessoais.
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-500/10 mt-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <FileText size={14} /> Ver Detalhes
          </span>
          <div className="flex items-center gap-1 text-primary">
             <ChevronRight size={18} />
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" 
            onClick={() => setIsExpanded(false)}
          />
          <div className="relative glass-card w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-sora">{subject.name}</h2>
                  <p className="text-slate-400 text-sm">Saneamento Ambiental</p>
                </div>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-3 hover:bg-white/10 rounded-2xl transition-colors cursor-pointer"
              >
                <Maximize2 size={24} className="rotate-45" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <section className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </section>
                </div>

                <div className="space-y-8">
                  <button 
                    onClick={() => setIsReviewMode(true)}
                    className="w-full py-4 bg-slate-800 dark:bg-white/10 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    <Brain size={20} className="text-primary" /> Iniciar Revisão (Flashcards)
                  </button>

                  <section className="glass-card p-6 rounded-2xl border-primary/20">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <FileText size={20} className="text-primary" /> Suas Anotações
                    </h3>
                    <textarea 
                      className="w-full h-64 bg-transparent border border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none font-jakarta"
                      placeholder="Escreva suas observações aqui..."
                      value={notes[subject.id] || ''}
                      onChange={(e) => updateNote(subject.id, e.target.value)}
                    />
                  </section>

                  <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-50"
                  >
                    {isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />} Baixar Guia PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isReviewMode && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950 animate-in fade-in duration-500">
          <Flashcards 
            cards={[
              { question: `O que é o conceito principal de ${subject.name}?`, answer: `De acordo com a ementa: ${content.slice(0, 200)}...` },
              { question: "Qual a importância desta matéria no Saneamento?", answer: "Esta matéria fornece as bases fundamentais para a compreensão técnica dos processos ambientais." },
            ]}
            onClose={() => setIsReviewMode(false)}
          />
        </div>
      )}
    </>
  );
});
