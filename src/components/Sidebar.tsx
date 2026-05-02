import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  X 
} from 'lucide-react';
import { cn } from '../utils/cn';
import { curriculumIndex } from '../data/curriculum/index';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar = React.memo(({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen 
}: SidebarProps) => {
  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen glass-card transition-all duration-300 z-[50] flex flex-col",
        isOpen ? "w-72 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"
      )}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className={cn("flex items-center gap-3 overflow-hidden", !isOpen && "lg:w-0")}>
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
            <GraduationCap size={24} />
          </div>
          <h2 className="text-xl font-bold whitespace-nowrap">Saneamento</h2>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-500/10 rounded-lg transition-colors cursor-pointer"
        >
          <div className="lg:hidden">
            <X size={20} />
          </div>
          <div className="hidden lg:block">
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </div>
        </button>
      </div>

      {/* Nav Section */}
      <nav className="flex-1 px-3 space-y-2 overflow-y-auto mt-4 scrollbar-hide">
        <NavItem 
          icon={<LayoutDashboard size={20} />} 
          label="Início" 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
          isOpen={isOpen}
        />

        <div className={cn("pt-6 pb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider overflow-hidden", !isOpen && "lg:opacity-0")}>
          Semestres
        </div>

        {curriculumIndex.map((sem) => (
          <NavItem 
            key={sem.id}
            icon={<BookOpen size={20} />} 
            label={sem.label} 
            active={activeTab === sem.id} 
            onClick={() => setActiveTab(sem.id)}
            isOpen={isOpen}
          />
        ))}

        <div className={cn("pt-6 pb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider overflow-hidden", !isOpen && "lg:opacity-0")}>
          Ferramentas
        </div>

        <NavItem 
          icon={<Clock size={20} />} 
          label="Pomodoro" 
          active={activeTab === 'pomodoro'} 
          onClick={() => setActiveTab('pomodoro')}
          isOpen={isOpen}
        />
        <NavItem 
          icon={<CheckCircle2 size={20} />} 
          label="Meu Progresso" 
          active={activeTab === 'progress'} 
          onClick={() => setActiveTab('progress')}
          isOpen={isOpen}
        />
      </nav>

      <div className="p-4 mt-auto">
        <div className={cn("p-4 rounded-2xl bg-primary/5 border border-primary/10 transition-opacity duration-300", !isOpen && "opacity-0")}>
           <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Status</p>
           <p className="text-xs font-medium text-slate-500">Versão 2.0 Otimizada</p>
        </div>
      </div>
    </aside>
  );
});

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  isOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick, isOpen }) => (
  <button 
    onClick={onClick}
    className={cn(
      "nav-item w-full group relative",
      active && "nav-item-active"
    )}
  >
    <div className="shrink-0">{icon}</div>
    <span className={cn(
      "whitespace-nowrap transition-all duration-300 font-medium",
      !isOpen ? "lg:opacity-0 lg:w-0" : "opacity-100"
    )}>
      {label}
    </span>
    {!isOpen && (
      <div className="hidden lg:block absolute left-20 px-3 py-2 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[60]">
        {label}
      </div>
    )}
  </button>
);
