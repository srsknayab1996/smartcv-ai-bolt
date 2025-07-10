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
        border: isSelected ? 'border-emerald-500 bg-emerald-50 shadow-emerald-100' : 'border-gray-200 hover:border-emerald-300 hover:shadow-emerald-50',
        check: 'bg-emerald-500',
        ring: 'ring-emerald-200'
      },
      blue: {
        icon: 'bg-blue-500',
        border: isSelected ? 'border-blue-500 bg-blue-50 shadow-blue-100' : 'border-gray-200 hover:border-blue-300 hover:shadow-blue-50',
        check: 'bg-blue-500',
        ring: 'ring-blue-200'
      },
      purple: {
        icon: 'bg-purple-500',
        border: isSelected ? 'border-purple-500 bg-purple-50 shadow-purple-100' : 'border-gray-200 hover:border-purple-300 hover:shadow-purple-50',
        check: 'bg-purple-500',
        ring: 'ring-purple-200'
      },
      orange: {
        icon: 'bg-orange-500',
        border: isSelected ? 'border-orange-500 bg-orange-50 shadow-orange-100' : 'border-gray-200 hover:border-orange-300 hover:shadow-orange-50',
        check: 'bg-orange-500',
        ring: 'ring-orange-200'
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
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What best describes your career stage?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          This helps us customize your resume template and provide relevant guidance throughout the process.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {userTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = currentResume?.userType === type.id;
          const colorClasses = getColorClasses(type.color, isSelected);
          
          return (
            <div
              key={type.id}
              onClick={() => handleUserTypeSelect(type.id)}
              className={`relative cursor-pointer rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${colorClasses.border} ${isSelected ? `ring-4 ${colorClasses.ring} shadow-2xl` : 'shadow-lg hover:shadow-xl'}`}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center animate-pulse">
                  <div className={`w-7 h-7 ${colorClasses.check} rounded-full flex items-center justify-center`}>
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Icon and Title */}
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 ${colorClasses.icon} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transform transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                      {type.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-gray-900">What you'll get:</h4>
                  <ul className="space-y-3">
                    {type.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <div className={`w-2 h-2 ${colorClasses.icon} rounded-full mr-3 mt-2 flex-shrink-0`} />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {currentResume?.userType && (
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 shadow-xl">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white text-2xl">💡</span>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-blue-900 mb-4">
                Personalized Tips for {userTypes.find(t => t.id === currentResume.userType)?.title}
              </h4>
              {currentResume.userType === 'fresher' && (
                <div className="text-base text-blue-800 space-y-3 leading-relaxed">
                  <p>• Focus on your education, projects, and internships</p>
                  <p>• Highlight relevant coursework and academic achievements</p>
                  <p>• Emphasize technical skills and certifications</p>
                  <p>• Include volunteer work and extracurricular activities</p>
                </div>
              )}
              {currentResume.userType === 'experienced' && (
                <div className="text-base text-blue-800 space-y-3 leading-relaxed">
                  <p>• Lead with your professional experience and achievements</p>
                  <p>• Quantify your impact with specific metrics and numbers</p>
                  <p>• Show career progression and increasing responsibilities</p>
                  <p>• Keep education section brief unless highly relevant</p>
                </div>
              )}
              {currentResume.userType === 'career-change' && (
                <div className="text-base text-blue-800 space-y-3 leading-relaxed">
                  <p>• Highlight transferable skills relevant to your target role</p>
                  <p>• Use a functional or hybrid resume format</p>
                  <p>• Include relevant training, certifications, or courses</p>
                  <p>• Write a compelling summary explaining your transition</p>
                </div>
              )}
              {currentResume.userType === 'senior' && (
                <div className="text-base text-blue-800 space-y-3 leading-relaxed">
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