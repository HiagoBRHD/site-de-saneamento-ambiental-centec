import React from 'react';
import { 
  BookOpen, 
  ArrowRight,
  Library
} from 'lucide-react';
import { curriculumIndex } from '../data/curriculum/index';

export const Dashboard: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Simple Header */}
      <div className="text-center md:text-left py-10 md:py-16">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 mx-auto md:mx-0">
          <Library size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sora">
          Biblioteca Técnica
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl">
          Acesse os materiais didáticos e livros de referência de todo o curso de Saneamento Ambiental. Selecione um semestre abaixo para ver os PDFs.
        </p>
      </div>

      {/* Semester Grid - Simple Folders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {curriculumIndex.map((sem) => (
          <button 
            key={sem.id}
            onClick={() => onNavigate(sem.id)}
            className="glass-card p-8 rounded-3xl flex items-center justify-between hover:border-primary/40 hover:scale-[1.02] transition-all group cursor-pointer text-left w-full border-white/5"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-500/5 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <BookOpen size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {sem.label}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  {sem.subjects.length} Matérias
                </p>
              </div>
            </div>
            <ArrowRight size={24} className="text-slate-300 group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
          </button>
        ))}
      </div>

      {/* Footer Info */}
      <div className="pt-12 border-t border-white/5 text-center md:text-left">
        <p className="text-slate-500 text-sm font-medium">
          Total de 42 livros técnicos integrados.
        </p>
      </div>
    </div>
  );
};
