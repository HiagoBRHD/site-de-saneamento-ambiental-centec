import React, { useState, useEffect, Suspense } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SubjectCard } from './components/SubjectCard';
import { Pomodoro } from './components/Pomodoro';
import { StudyProvider, useStudy } from './contexts/StudyContext';
import { curriculumIndex } from './data/curriculum/index';
import { cn } from './utils/cn';
import { Sun, Moon, Search, Trophy, Menu, X, Loader2 } from 'lucide-react';

const ProgressView = () => {
  const { checkedTopics } = useStudy();
  const completedCount = Object.keys(checkedTopics).length;
  const totalTopics = curriculumIndex.reduce((acc, sem) => acc + sem.subjects.length * 8, 0);
  const progress = Math.round((completedCount / totalTopics) * 100) || 0;

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="glass-card p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="50%" cy="50%" r="44%" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-200 dark:text-white/5" />
            <circle cx="50%" cy="50%" r="44%" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="276" strokeDashoffset={276 * (1 - progress / 100)} strokeLinecap="round" className="text-primary transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl md:text-4xl font-bold font-sora">{progress}%</span>
            <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Concluído</span>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 font-sora flex items-center justify-center md:justify-start gap-3">
            <Trophy className="text-amber-500" /> Sua Jornada
          </h2>
          <p className="text-slate-500 text-sm md:text-lg max-w-xl">
            Você já dominou {completedCount} tópicos do currículo. 
            Mantenha o foco para completar sua formação em Saneamento Ambiental.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {curriculumIndex.map(sem => {
           const semCompleted = sem.subjects.filter(s => checkedTopics[s.id]).length;
           const semProgress = Math.round((semCompleted / sem.subjects.length) * 100) || 0;
           return (
             <div key={sem.id} className="glass-card p-5 md:p-6 rounded-2xl md:rounded-3xl border-white/5">
               <div className="flex justify-between items-center mb-3">
                 <h3 className="font-bold text-base md:text-lg">{sem.label}</h3>
                 <span className="text-primary font-bold text-sm">{semProgress}%</span>
               </div>
               <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 md:h-2 rounded-full overflow-hidden">
                 <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${semProgress}%` }}></div>
               </div>
             </div>
           );
        })}
      </div>
    </div>
  );
};

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches || 
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth > 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeSemester = curriculumIndex.find(s => s.id === activeTab);

  return (
    <div className="min-h-screen flex bg-[var(--background)] selection:bg-primary/30">
      {isSidebarOpen && window.innerWidth <= 1024 && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[45] animate-in fade-in duration-300" onClick={() => setIsSidebarOpen(false)} />
      )}

      <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); if (window.innerWidth <= 1024) setIsSidebarOpen(false); }} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className={cn("flex-1 transition-all duration-300 p-4 md:p-10 w-full", isSidebarOpen && window.innerWidth > 1024 ? "ml-72" : "ml-0 lg:ml-20")}>
        <header className="flex items-center justify-between gap-4 mb-8 md:mb-12">
          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2.5 glass-card rounded-xl text-slate-500 hover:text-primary transition-all">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 className="text-xl md:text-3xl font-bold font-sora">
                {activeTab === 'dashboard' ? 'Início' : activeTab === 'progress' ? 'Meu Progresso' : activeSemester?.label || 'Ferramentas'}
              </h1>
              <p className="hidden md:block text-slate-500 font-medium text-sm mt-1">Guia Acadêmico de Saneamento Ambiental</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 glass-card rounded-xl hover:text-primary transition-all">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-primary" size={40} /></div>}>
            {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
            {activeTab === 'progress' && <ProgressView />}
            {activeSemester && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {activeSemester.subjects.map(subject => <SubjectCard key={subject.id} subject={subject} />)}
              </div>
            )}
            {activeTab === 'pomodoro' && <div className="py-8 md:py-12"><h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center font-sora">Foco & Produtividade</h2><Pomodoro /></div>}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return <StudyProvider><AppContent /></StudyProvider>;
}
