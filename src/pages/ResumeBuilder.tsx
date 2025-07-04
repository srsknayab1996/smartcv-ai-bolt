import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Save, Eye, Download, Sparkles } from 'lucide-react';
import { UserTypeSelection } from '../components/resume-builder/UserTypeSelection';
import { PersonalInfoForm } from '../components/resume-builder/PersonalInfoForm';
import { SummaryForm } from '../components/resume-builder/SummaryForm';
import { ExperienceForm } from '../components/resume-builder/ExperienceForm';
import { EducationForm } from '../components/resume-builder/EducationForm';
import { SkillsForm } from '../components/resume-builder/SkillsForm';
import { ProjectsForm } from '../components/resume-builder/ProjectsForm';
import { InternshipsForm } from '../components/resume-builder/InternshipsForm';
import { ResumePreview } from '../components/resume-builder/ResumePreview';
import { useResume } from '../contexts/ResumeContext';

const getStepsForUserType = (userType?: string) => {
  const baseSteps = [
    { id: 'userType', title: 'Career Stage', component: UserTypeSelection },
    { id: 'personal', title: 'Personal Info', component: PersonalInfoForm },
  ];

  if (userType === 'fresher') {
    return [
      ...baseSteps,
      { id: 'education', title: 'Education', component: EducationForm },
      { id: 'projects', title: 'Projects', component: ProjectsForm },
      { id: 'internships', title: 'Internships', component: InternshipsForm },
      { id: 'skills', title: 'Skills', component: SkillsForm },
      { id: 'summary', title: 'Summary', component: SummaryForm }, // Moved to last
    ];
  } else if (userType === 'experienced' || userType === 'senior') {
    return [
      ...baseSteps,
      { id: 'experience', title: 'Experience', component: ExperienceForm },
      { id: 'skills', title: 'Skills', component: SkillsForm },
      { id: 'education', title: 'Education', component: EducationForm },
      { id: 'projects', title: 'Projects', component: ProjectsForm },
      { id: 'summary', title: 'Summary', component: SummaryForm }, // Moved to last
    ];
  } else if (userType === 'career-change') {
    return [
      ...baseSteps,
      { id: 'skills', title: 'Skills', component: SkillsForm },
      { id: 'experience', title: 'Experience', component: ExperienceForm },
      { id: 'projects', title: 'Projects', component: ProjectsForm },
      { id: 'education', title: 'Education', component: EducationForm },
      { id: 'summary', title: 'Summary', component: SummaryForm }, // Moved to last
    ];
  }

  // Default flow (no user type selected yet)
  return [
    { id: 'userType', title: 'Career Stage', component: UserTypeSelection },
    { id: 'personal', title: 'Personal Info', component: PersonalInfoForm },
    { id: 'experience', title: 'Experience', component: ExperienceForm },
    { id: 'education', title: 'Education', component: EducationForm },
    { id: 'skills', title: 'Skills', component: SkillsForm },
    { id: 'summary', title: 'Summary', component: SummaryForm }, // Moved to last
  ];
};

export const ResumeBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const { currentResume, saveResume, createNewResume } = useResume();

  React.useEffect(() => {
    if (!currentResume) {
      createNewResume();
    }
  }, [currentResume, createNewResume]);

  const steps = getStepsForUserType(currentResume?.userType);
  const CurrentStepComponent = steps[currentStep]?.component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (currentResume) {
      saveResume(currentResume);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return currentResume?.userType;
    }
    return true;
  };

  const isLastStep = currentStep === steps.length - 1;
  const isSummaryStep = steps[currentStep]?.id === 'summary';

  if (!currentResume) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
        <p className="text-gray-600">Create a professional resume with AI assistance</p>
        {currentResume.userType && (
          <div className="mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {currentResume.userType === 'fresher' && '🎓 Fresh Graduate'}
              {currentResume.userType === 'experienced' && '💼 Experienced Professional'}
              {currentResume.userType === 'career-change' && '🔄 Career Changer'}
              {currentResume.userType === 'senior' && '👔 Senior Executive'}
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-900">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between mt-4 overflow-x-auto">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`flex flex-col items-center cursor-pointer min-w-0 flex-1 ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                index <= currentStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {index + 1}
              </div>
              <span className="text-xs font-medium text-center px-1">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {steps[currentStep]?.title}
              </h2>
              {isSummaryStep && (
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">AI Ready</span>
                </div>
              )}
              {currentStep > 0 && !isSummaryStep && (
                <button className="flex items-center space-x-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Assist</span>
                </button>
              )}
            </div>
            {isSummaryStep && (
              <p className="text-sm text-gray-600 mt-2">
                Now that we have all your details, let's create a compelling professional summary!
              </p>
            )}
          </div>
          
          <div className="p-6">
            {CurrentStepComponent && <CurrentStepComponent />}
          </div>

          {/* Navigation */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>

                {isLastStep ? (
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Complete & Download</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      !canProceed()
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors lg:hidden"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className={`${showPreview ? 'block' : 'hidden lg:block'}`}>
            <ResumePreview resume={currentResume} />
          </div>
        </div>
      </div>
    </div>
  );
};