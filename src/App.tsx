import React, { useState, useEffect, Suspense } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SubjectCard } from './components/SubjectCard';
import { curriculumIndex } from './data/curriculum/index';
import { cn } from './utils/cn';
import { Sun, Moon, Library, Menu, X, Loader2 } from 'lucide-react';

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
                {activeTab === 'dashboard' ? 'Biblioteca Central' : activeSemester?.label || 'Arquivos'}
              </h1>
              <p className="hidden md:block text-slate-500 font-medium text-sm mt-1">Repositório Técnico de Saneamento Ambiental</p>
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
            {activeSemester && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {activeSemester.subjects.map(subject => <SubjectCard key={subject.id} subject={subject} />)}
              </div>
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
