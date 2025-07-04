import React from 'react';
import { GraduationCap, Briefcase, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';

export const UserTypeSelection: React.FC = () => {
  const { currentResume, setCurrentResume } = useResume();

  const userTypes = [
    {
      id: 'fresher',
      title: 'Fresh Graduate',
      subtitle: 'Entry Level',
      description: 'New to the job market or recent graduate',
      icon: GraduationCap,
      gradient: 'from-emerald-400 via-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      hoverBorderColor: 'hover:border-emerald-300',
      selectedBorderColor: 'border-emerald-500',
      selectedBgColor: 'bg-emerald-50',
      features: [
        'Education-focused templates',
        'Project and internship highlights',
        'Skills-based formatting',
        'Academic achievement emphasis'
      ]
    },
    {
      id: 'experienced',
      title: 'Experienced',
      subtitle: 'Professional',
      description: '2+ years of work experience',
      icon: Briefcase,
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      hoverBorderColor: 'hover:border-blue-300',
      selectedBorderColor: 'border-blue-500',
      selectedBgColor: 'bg-blue-50',
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
      subtitle: 'Transitioning',
      description: 'Switching to a new field or industry',
      icon: TrendingUp,
      gradient: 'from-purple-400 via-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      hoverBorderColor: 'hover:border-purple-300',
      selectedBorderColor: 'border-purple-500',
      selectedBgColor: 'bg-purple-50',
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
      subtitle: 'Leadership',
      description: '10+ years with leadership experience',
      icon: Users,
      gradient: 'from-orange-400 via-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      hoverBorderColor: 'hover:border-orange-300',
      selectedBorderColor: 'border-orange-500',
      selectedBgColor: 'bg-orange-50',
      features: [
        'Executive-level templates',
        'Strategic impact focus',
        'Leadership achievements',
        'Board and stakeholder experience'
      ]
    }
  ];

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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What best describes your career stage?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          This helps us customize your resume template and provide relevant guidance throughout the process.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = currentResume?.userType === type.id;
          
          return (
            <div
              key={type.id}
              onClick={() => handleUserTypeSelect(type.id)}
              className={`group relative cursor-pointer rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl ${
                isSelected 
                  ? `${type.selectedBorderColor} ${type.selectedBgColor} shadow-lg scale-[1.02]` 
                  : `${type.borderColor} bg-white ${type.hoverBorderColor} hover:shadow-lg`
              }`}
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${type.bgGradient} opacity-0 group-hover:opacity-30 ${isSelected ? 'opacity-20' : ''} rounded-2xl transition-opacity duration-300`} />
              
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}

              <div className="relative p-8">
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${type.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors">
                        {type.title}
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-3 py-1 bg-gradient-to-r ${type.gradient} text-white text-sm font-medium rounded-full`}>
                          {type.subtitle}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                        <span className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mr-2" />
                        What you'll get:
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {type.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                            <div className={`w-1.5 h-1.5 bg-gradient-to-r ${type.gradient} rounded-full mr-3 flex-shrink-0`} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${type.gradient} opacity-0 group-hover:opacity-10 ${isSelected ? 'opacity-5' : ''} transition-opacity duration-300 pointer-events-none`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Type Info */}
      {currentResume?.userType && (
        <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 border border-indigo-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white text-lg font-bold">✨</span>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Personalized Tips for {userTypes.find(t => t.id === currentResume.userType)?.title}
              </h4>
              {currentResume.userType === 'fresher' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="space-y-2">
                    <p className="flex items-center"><span className="text-emerald-500 mr-2">•</span> Focus on your education, projects, and internships</p>
                    <p className="flex items-center"><span className="text-emerald-500 mr-2">•</span> Highlight relevant coursework and academic achievements</p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center"><span className="text-emerald-500 mr-2">•</span> Emphasize technical skills and certifications</p>
                    <p className="flex items-center"><span className="text-emerald-500 mr-2">•</span> Include volunteer work and extracurricular activities</p>
                  </div>
                </div>
              )}
              {currentResume.userType === 'experienced' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="space-y-2">
                    <p className="flex items-center"><span className="text-blue-500 mr-2">•</span> Lead with your professional experience and achievements</p>
                    <p className="flex items-center"><span className="text-blue-500 mr-2">•</span> Quantify your impact with specific metrics and numbers</p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center"><span className="text-blue-500 mr-2">•</span> Show career progression and increasing responsibilities</p>
                    <p className="flex items-center"><span className="text-blue-500 mr-2">•</span> Keep education section brief unless highly relevant</p>
                  </div>
                </div>
              )}
              {currentResume.userType === 'career-change' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="space-y-2">
                    <p className="flex items-center"><span className="text-purple-500 mr-2">•</span> Highlight transferable skills relevant to your target role</p>
                    <p className="flex items-center"><span className="text-purple-500 mr-2">•</span> Use a functional or hybrid resume format</p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center"><span className="text-purple-500 mr-2">•</span> Include relevant training, certifications, or courses</p>
                    <p className="flex items-center"><span className="text-purple-500 mr-2">•</span> Write a compelling summary explaining your transition</p>
                  </div>
                </div>
              )}
              {currentResume.userType === 'senior' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="space-y-2">
                    <p className="flex items-center"><span className="text-orange-500 mr-2">•</span> Focus on strategic impact and leadership achievements</p>
                    <p className="flex items-center"><span className="text-orange-500 mr-2">•</span> Highlight team management and organizational influence</p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center"><span className="text-orange-500 mr-2">•</span> Include board positions, speaking engagements, or publications</p>
                    <p className="flex items-center"><span className="text-orange-500 mr-2">•</span> Keep technical details high-level and results-focused</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};