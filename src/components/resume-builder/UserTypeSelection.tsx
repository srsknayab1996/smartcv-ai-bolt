import React from 'react';
import { GraduationCap, Briefcase, Users, TrendingUp } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';

export const UserTypeSelection: React.FC = () => {
  const { currentResume, setCurrentResume } = useResume();

  const userTypes = [
    {
      id: 'fresher',
      title: 'Fresh Graduate / Entry Level',
      description: 'New to the job market or recent graduate',
      icon: GraduationCap,
      color: 'emerald',
      features: [
        'Education-focused templates',
        'Project and internship highlights',
        'Skills-based formatting',
        'Academic achievement emphasis'
      ]
    },
    {
      id: 'experienced',
      title: 'Experienced Professional',
      description: '2+ years of work experience',
      icon: Briefcase,
      color: 'blue',
      features: [
        'Experience-focused templates',
        'Achievement-driven content',
        'Leadership and impact metrics',
        'Career progression highlights'
      ]
    },
    {
      id: 'career-change',
      title: 'Career Changer',
      description: 'Transitioning to a new field or industry',
      icon: TrendingUp,
      color: 'purple',
      features: [
        'Transferable skills focus',
        'Relevant experience highlighting',
        'Industry transition guidance',
        'Skills-to-role mapping'
      ]
    },
    {
      id: 'senior',
      title: 'Senior Executive',
      description: '10+ years with leadership experience',
      icon: Users,
      color: 'orange',
      features: [
        'Executive-level templates',
        'Strategic impact focus',
        'Leadership achievements',
        'Board and stakeholder experience'
      ]
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      emerald: {
        icon: 'bg-emerald-500',
        border: isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300',
        check: 'bg-emerald-500'
      },
      blue: {
        icon: 'bg-blue-500',
        border: isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300',
        check: 'bg-blue-500'
      },
      purple: {
        icon: 'bg-purple-500',
        border: isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300',
        check: 'bg-purple-500'
      },
      orange: {
        icon: 'bg-orange-500',
        border: isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300',
        check: 'bg-orange-500'
      }
    };
    return colors[color as keyof typeof colors];
  };

  const handleUserTypeSelect = (userType: string) => {
    if (currentResume) {
      setCurrentResume({
        ...currentResume,
        userType,
        updatedAt: new Date().toISOString()
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          What best describes your career stage?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          This helps us customize your resume template and provide relevant guidance throughout the process.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = currentResume?.userType === type.id;
          const colorClasses = getColorClasses(type.color, isSelected);
          
          return (
            <div
              key={type.id}
              onClick={() => handleUserTypeSelect(type.id)}
              className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-md ${colorClasses.border}`}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className={`w-4 h-4 ${colorClasses.check} rounded-full flex items-center justify-center`}>
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${colorClasses.icon} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {type.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">What you'll get:</h4>
                    <ul className="space-y-1">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-xs text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {currentResume?.userType && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-sm font-bold">💡</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Personalized Tips for {userTypes.find(t => t.id === currentResume.userType)?.title}
              </h4>
              {currentResume.userType === 'fresher' && (
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• Focus on your education, projects, and internships</p>
                  <p>• Highlight relevant coursework and academic achievements</p>
                  <p>• Emphasize technical skills and certifications</p>
                  <p>• Include volunteer work and extracurricular activities</p>
                </div>
              )}
              {currentResume.userType === 'experienced' && (
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• Lead with your professional experience and achievements</p>
                  <p>• Quantify your impact with specific metrics and numbers</p>
                  <p>• Show career progression and increasing responsibilities</p>
                  <p>• Keep education section brief unless highly relevant</p>
                </div>
              )}
              {currentResume.userType === 'career-change' && (
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• Highlight transferable skills relevant to your target role</p>
                  <p>• Use a functional or hybrid resume format</p>
                  <p>• Include relevant training, certifications, or courses</p>
                  <p>• Write a compelling summary explaining your transition</p>
                </div>
              )}
              {currentResume.userType === 'senior' && (
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• Focus on strategic impact and leadership achievements</p>
                  <p>• Highlight team management and organizational influence</p>
                  <p>• Include board positions, speaking engagements, or publications</p>
                  <p>• Keep technical details high-level and results-focused</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};