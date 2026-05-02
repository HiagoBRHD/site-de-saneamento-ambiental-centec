import React, { useState, useEffect, Suspense } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SubjectCard } from './components/SubjectCard';
import { Pomodoro } from './components/Pomodoro';
import { StudyProvider, useStudy } from './contexts/StudyContext';
import { curriculumIndex } from './data/curriculum/index';
import { cn } from './utils/cn';
import { Sun, Moon, Search, CheckCircle2, Trophy, Menu, X } from 'lucide-react';

const ProgressView = () => {
  const { checkedTopics } = useStudy();
  const completedCount = Object.keys(checkedTopics).length;
  const totalTopics = curriculumIndex.reduce((acc, sem) => acc + sem.subjects.length * 8, 0);
  const progress = Math.round((completedCount / totalTopics) * 100) || 0;

  return (
    <div className="py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="glass-card p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-200 dark:text-white/5" />
            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={2 * Math.PI * 88} strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)} strokeLinecap="round" className="text-primary transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold font-sora">{progress}%</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Concluído</span>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4 font-sora flex items-center justify-center md:justify-start gap-3">
            <Trophy className="text-amber-500" /> Sua Jornada Acadêmica
          </h2>
          <p className="text-slate-500 text-lg max-w-xl">
            Você já dominou {completedCount} tópicos do currículo de Saneamento Ambiental. 
            Mantenha a consistência para se tornar um profissional de elite.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {curriculumIndex.map(sem => {
           const semCompleted = sem.subjects.filter(s => checkedTopics[s.id]).length;
           const semProgress = Math.round((semCompleted / sem.subjects.length) * 100) || 0;
           return (
             <div key={sem.id} className="glass-card p-6 rounded-3xl">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-lg">{sem.label}</h3>
                 <span className="text-primary font-bold">{semProgress}%</span>
               </div>
               <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full">
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
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle window resize for sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeSemester = curriculumIndex.find(s => s.id === activeTab);

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      {/* Mobile Backdrop */}
      {isSidebarOpen && window.innerWidth <= 1024 && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[45] animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (window.innerWidth <= 1024) setIsSidebarOpen(false);
        }} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main 
        className={cn(
          "flex-1 transition-all duration-300 p-6 md:p-10 w-full",
          isSidebarOpen && window.innerWidth > 1024 ? "ml-72" : "ml-0 lg:ml-20"
        )}
      >
        <header className="flex items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-3 glass-card rounded-2xl text-slate-500 hover:text-primary transition-all cursor-pointer"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-sora">
                {activeTab === 'dashboard' ? 'Início' : 
                 activeTab === 'progress' ? 'Progresso' :
                 activeSemester ? activeSemester.label : 'Ferramentas'}
              </h1>
              <p className="hidden md:block text-slate-500 font-medium mt-1">
                Guia Acadêmico de Saneamento Ambiental
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Pesquisar matérias..."
                className="pl-12 pr-6 py-3 glass-card rounded-2xl outline-none focus:ring-2 focus:ring-primary/30 w-64 transition-all"
              />
            </div>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 glass-card rounded-2xl hover:text-primary transition-all cursor-pointer"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard onNavigate={setActiveTab} />
          )}

          {activeTab === 'progress' && (
            <ProgressView />
          )}

          {activeSemester && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {activeSemester.subjects.map(subject => (
                <div key={subject.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                  <SubjectCard subject={subject} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'pomodoro' && (
            <div className="py-12">
              <h2 className="text-3xl font-bold mb-10 text-center font-sora">Foco & Produtividade</h2>
              <Pomodoro />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <StudyProvider>
      <AppContent />
    </StudyProvider>
  );
}
