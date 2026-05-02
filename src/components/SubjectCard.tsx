import React, { useState, memo } from 'react';
import { 
  Download, 
  BookOpen, 
  Loader2,
  FileText
} from 'lucide-react';
import { downloadPDF } from '../utils/download';

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
  };
}

export const SubjectCard = memo(({ subject }: SubjectCardProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDownloading(true);
    await downloadPDF(subject.id, subject.name);
    setIsDownloading(false);
  };

  return (
    <div 
      className="glass-card p-6 rounded-3xl hover:border-primary/50 transition-all group flex flex-col items-center text-center gap-4 border-white/5"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
        <BookOpen size={32} />
      </div>

      <div>
        <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">
          {subject.name}
        </h3>
        <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-bold opacity-60">
          PDF Técnico
        </p>
      </div>

      <button 
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full mt-2 py-3 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
      >
        {isDownloading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <>
            <Download size={18} />
            <span>Download PDF</span>
          </>
        )}
      </button>
    </div>
  );
});
