import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
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
      <div className="p-6 flex items-center justify-between">
        <div className={cn("flex items-center gap-3 overflow-hidden", !isOpen && "lg:w-0")}>
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
            <GraduationCap size={24} />
          </div>
          <h2 className="text-xl font-bold whitespace-nowrap">Biblioteca PDF</h2>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-500/10 rounded-lg transition-colors cursor-pointer"
        >
          <div className="lg:hidden"><X size={20} /></div>
          <div className="hidden lg:block">
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </div>
        </button>
      </div>

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
      </nav>

      <div className="p-6 border-t border-white/5">
        <p className={cn("text-[10px] text-slate-500 font-bold uppercase tracking-widest", !isOpen && "opacity-0")}>
          Depósito de Arquivos v2
        </p>
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
    className={cn("nav-item w-full group relative", active && "nav-item-active")}
  >
    <div className="shrink-0">{icon}</div>
    <span className={cn("whitespace-nowrap transition-all duration-300 font-medium", !isOpen ? "lg:opacity-0 lg:w-0" : "opacity-100")}>
      {label}
    </span>
  </button>
);
