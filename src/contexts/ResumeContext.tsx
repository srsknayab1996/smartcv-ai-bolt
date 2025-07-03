import React, { createContext, useContext, useState } from 'react';

export interface ResumeData {
  id: string;
  userType?: 'fresher' | 'experienced' | 'career-change' | 'senior';
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills: Array<{
    id: string;
    category: string;
    items: string[];
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }>;
  internships?: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string[];
  }>;
  achievements?: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
  }>;
  templateId: string;
  createdAt: string;
  updatedAt: string;
}

interface ResumeContextType {
  currentResume: ResumeData | null;
  savedResumes: ResumeData[];
  setCurrentResume: (resume: ResumeData | null) => void;
  saveResume: (resume: ResumeData) => void;
  deleteResume: (id: string) => void;
  createNewResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

const createEmptyResume = (): ResumeData => ({
  id: Date.now().toString(),
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  internships: [],
  achievements: [],
  templateId: 'modern',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);
  const [savedResumes, setSavedResumes] = useState<ResumeData[]>([]);

  const saveResume = (resume: ResumeData) => {
    const updatedResume = { ...resume, updatedAt: new Date().toISOString() };
    setSavedResumes(prev => {
      const existingIndex = prev.findIndex(r => r.id === resume.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = updatedResume;
        return updated;
      }
      return [...prev, updatedResume];
    });
    setCurrentResume(updatedResume);
  };

  const deleteResume = (id: string) => {
    setSavedResumes(prev => prev.filter(r => r.id !== id));
    if (currentResume?.id === id) {
      setCurrentResume(null);
    }
  };

  const createNewResume = () => {
    const newResume = createEmptyResume();
    setCurrentResume(newResume);
  };

  return (
    <ResumeContext.Provider value={{
      currentResume,
      savedResumes,
      setCurrentResume,
      saveResume,
      deleteResume,
      createNewResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};