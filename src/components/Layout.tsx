import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    const titles: Record<string, string> = {
      '/': 'Dashboard',
      '/resume-builder': 'Resume Builder',
      '/ats-analyzer': 'ATS Analyzer',
      '/cover-letter': 'Cover Letter Generator',
      '/job-tracker': 'Job Tracker',
      '/saved-resumes': 'Saved Resumes',
      '/profile': 'Profile & Settings'
    };
    return titles[path] || 'SmartCV AI';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-72">
        <Header 
          title={getPageTitle()}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};