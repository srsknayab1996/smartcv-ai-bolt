import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  Mail, 
  Briefcase, 
  FolderOpen, 
  User,
  X,
  Sparkles,
  Crown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Resume Builder', href: '/resume-builder', icon: FileText },
  { name: 'ATS Analyzer', href: '/ats-analyzer', icon: Target },
  { name: 'Cover Letter', href: '/cover-letter', icon: Mail },
  { name: 'Job Tracker', href: '/job-tracker', icon: Briefcase },
  { name: 'Saved Resumes', href: '/saved-resumes', icon: FolderOpen },
  { name: 'Profile', href: '/profile', icon: User },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-white shadow-xl transform transition-all duration-300 ease-in-out
        lg:translate-x-0 lg:z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}
        w-72
      `}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0 ${
            isCollapsed ? 'lg:justify-center lg:px-4' : ''
          }`}>
            <div className={`flex items-center space-x-2 ${isCollapsed ? 'lg:hidden' : ''}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SmartCV AI</span>
            </div>
            
            {/* Collapsed logo */}
            {isCollapsed && (
              <div className="hidden lg:block w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            )}
            
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          {!isCollapsed && (
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.name || 'User'}
                  </p>
                  <div className="flex items-center space-x-1">
                    {user?.plan === 'premium' && (
                      <Crown className="w-3 h-3 text-yellow-500" />
                    )}
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.plan || 'Free'} Plan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Collapsed User Avatar */}
          {isCollapsed && (
            <div className="hidden lg:flex p-4 border-b border-gray-200 flex-shrink-0 justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className={`flex-1 py-6 space-y-2 overflow-y-auto ${
            isCollapsed ? 'px-4' : 'px-6'
          }`}>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    group flex items-center text-sm font-medium rounded-lg transition-all duration-200
                    ${isCollapsed ? 'lg:justify-center lg:px-3 lg:py-3' : 'px-3 py-2.5'}
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className={`
                    h-5 w-5 transition-colors flex-shrink-0
                    ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
                    ${isCollapsed ? '' : 'mr-3'}
                  `} />
                  <span className={isCollapsed ? 'lg:hidden' : ''}>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          {!isCollapsed && (
            <div className="p-6 border-t border-gray-200 flex-shrink-0">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-900">AI Assistant</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Get personalized resume tips and career advice
                </p>
                <button className="w-full bg-blue-600 text-white text-xs font-medium py-2 px-3 rounded-md hover:bg-blue-700 transition-colors">
                  Chat with AI
                </button>
              </div>
            </div>
          )}

          {/* Collapsed Footer */}
          {isCollapsed && (
            <div className="hidden lg:flex p-4 border-t border-gray-200 flex-shrink-0 justify-center">
              <button 
                className="w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                title="AI Assistant"
              >
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};