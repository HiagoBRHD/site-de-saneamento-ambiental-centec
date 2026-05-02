import React, { createContext, useContext, useState, useEffect } from 'react';

interface StudyContextType {
  checkedTopics: Record<string, boolean>;
  toggleTopic: (topicId: string) => void;
  notes: Record<string, string>;
  updateNote: (subjectId: string, note: string) => void;
  studyTime: number; // In minutes
  addStudyTime: (minutes: number) => void;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checkedTopics, setCheckedTopics] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('sa-study-progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('sa-study-notes');
    return saved ? JSON.parse(saved) : {};
  });

  const [studyTime, setStudyTime] = useState(() => {
    const saved = localStorage.getItem('sa-study-time');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('sa-study-progress', JSON.stringify(checkedTopics));
  }, [checkedTopics]);

  useEffect(() => {
    localStorage.setItem('sa-study-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('sa-study-time', studyTime.toString());
  }, [studyTime]);

  const toggleTopic = (topicId: string) => {
    setCheckedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const updateNote = (subjectId: string, note: string) => {
    setNotes(prev => ({
      ...prev,
      [subjectId]: note
    }));
  };

  const addStudyTime = (minutes: number) => {
    setStudyTime(prev => prev + minutes);
  };

  return (
    <StudyContext.Provider value={{ 
      checkedTopics, 
      toggleTopic, 
      notes, 
      updateNote,
      studyTime,
      addStudyTime
    }}>
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
