import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Star,
  ArrowRight,
  CheckCircle2,
  Trophy,
  ChevronRight
} from 'lucide-react';
import { useStudy } from '../contexts/StudyContext';
import { curriculumIndex } from '../data/curriculum/index';
import { cn } from '../utils/cn';

export const Dashboard: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  const { checkedTopics } = useStudy();
  
  // Calculate stats
  const totalTopics = curriculumIndex.reduce(
    (acc, sem) => acc + sem.subjects.length * 8, // Assuming ~8 topics per subject for estimation
    0
  );
  const completedTopics = Object.keys(checkedTopics).length;
  const progressPercent = Math.round((completedTopics / totalTopics) * 100) || 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 md:p-12 text-white shadow-2xl shadow-primary/20">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sora">
            Bem-vindo ao seu Futuro, Sanitarista.
          </h1>
          <p className="text-white/80 text-lg mb-8 font-medium">
            Você já completou <span className="text-white font-bold">{progressPercent}%</span> da sua jornada. Continue focado para atingir a excelência.
          </p>
          <button 
            onClick={() => onNavigate('sem1')}
            className="px-8 py-3 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-all hover:scale-[1.05] shadow-xl flex items-center gap-2 cursor-pointer"
          >
            Continuar Estudos <ArrowRight size={20} />
          </button>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 hidden lg:block">
          <Trophy size={400} />
        </div>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<TrendingUp className="text-primary" />} 
          label="Progresso Geral" 
          value={`${progressPercent}%`} 
          subtext="do curso concluído"
        />
        <StatCard 
          icon={<BookOpen className="text-secondary" />} 
          label="Tópicos Vistos" 
          value={completedTopics.toString()} 
          subtext="total de 43 matérias"
        />
        <StatCard 
          icon={<Clock className="text-amber-500" />} 
          label="Tempo de Estudo" 
          value="12h" 
          subtext="esta semana"
        />
        <StatCard 
          icon={<Star className="text-purple-500" />} 
          label="Conquistas" 
          value="3" 
          subtext="insígnias ganhas"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Subjects */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Clock size={24} className="text-primary" /> Matérias Recentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curriculumIndex[0].subjects.slice(0, 4).map((sub, i) => (
              <button 
                key={sub.id}
                onClick={() => onNavigate('sem1')}
                className="glass-card p-6 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-all group cursor-pointer text-left w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-500/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">{sub.name}</h3>
                    <p className="text-sm text-slate-500">1º Semestre</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Next */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Meta do Dia</h2>
          <div className="glass-card p-8 rounded-3xl border-2 border-primary/20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-widest">
                Sugestão
              </div>
              <h3 className="text-xl font-bold mb-2">Química Analítica</h3>
              <p className="text-slate-500 mb-6 text-sm">
                Complete os últimos 3 tópicos para fechar o 2º Semestre.
              </p>
              <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full mb-6">
                <div className="bg-primary h-full w-[80%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              </div>
              <button 
                onClick={() => onNavigate('sem2')}
                className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Começar Agora
              </button>
            </div>
            <CheckCircle2 size={120} className="absolute -right-8 -bottom-8 text-primary/5 -rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; subtext: string }> = ({ 
  icon, label, value, subtext 
}) => (
  <div className="glass-card p-6 rounded-3xl hover:border-primary/30 transition-colors group cursor-default">
    <div className="w-12 h-12 rounded-xl bg-slate-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-3xl font-bold mb-1">{value}</h3>
    <p className="text-xs text-slate-400 font-medium">{subtext}</p>
  </div>
);
