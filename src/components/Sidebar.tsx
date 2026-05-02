import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Settings,
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
        
        {/* Toggle Button for Desktop / Close for Mobile */}
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
          label="Dashboard" 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
          isOpen={isOpen}
        />

        <div className={cn("pt-4 pb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider overflow-hidden", !isOpen && "lg:opacity-0")}>
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

        <div className={cn("pt-4 pb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider overflow-hidden", !isOpen && "lg:opacity-0")}>
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
          label="Progresso" 
          active={activeTab === 'progress'} 
          onClick={() => setActiveTab('progress')}
          isOpen={isOpen}
        />
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <NavItem 
          icon={<Settings size={20} />} 
          label="Configurações" 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
          isOpen={isOpen}
        />
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
      "whitespace-nowrap transition-all duration-300",
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
