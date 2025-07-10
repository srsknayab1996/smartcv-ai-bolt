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
      { id: 'summary', title: 'Summary', component: SummaryForm },
    ];
  } else if (userType === 'experienced' || userType === 'senior') {
    return [
      ...baseSteps,
      { id: 'experience', title: 'Experience', component: ExperienceForm },
      { id: 'skills', title: 'Skills', component: SkillsForm },
      { id: 'education', title: 'Education', component: EducationForm },
      { id: 'projects', title: 'Projects', component: ProjectsForm },
      { id: 'summary', title: 'Summary', component: SummaryForm },
    ];
  } else if (userType === 'career-change') {
    return [
      ...baseSteps,
      { id: 'skills', title: 'Skills', component: SkillsForm },
      { id: 'experience', title: 'Experience', component: ExperienceForm },
      { id: 'projects', title: 'Projects', component: ProjectsForm },
      { id: 'education', title: 'Education', component: EducationForm },
      { id: 'summary', title: 'Summary', component: SummaryForm },
    ];
  }

  // Default flow (no user type selected yet)
  return [
    { id: 'userType', title: 'Career Stage', component: UserTypeSelection },
    { id: 'personal', title: 'Personal Info', component: PersonalInfoForm },
    { id: 'experience', title: 'Experience', component: ExperienceForm },
    { id: 'education', title: 'Education', component: EducationForm },
    { id: 'skills', title: 'Skills', component: SkillsForm },
    { id: 'summary', title: 'Summary', component: SummaryForm },
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
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none">
      {/* Header */}
      <div className="mb-6">
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
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-gray-900">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between mt-6 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`flex flex-col items-center cursor-pointer min-w-0 flex-1 transition-all duration-300 ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-3 transition-all duration-300 ${
                index <= currentStep 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-110' 
                  : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
              }`}>
                {index + 1}
              </div>
              <span className="text-sm font-medium text-center px-2 leading-tight">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 min-h-fit">
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {steps[currentStep]?.title}
              </h2>
              {isSummaryStep && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl shadow-sm">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-bold text-purple-700">AI Ready</span>
                </div>
              )}
              {currentStep > 0 && !isSummaryStep && (
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-sm font-bold hover:bg-purple-100 transition-all duration-300 shadow-sm hover:shadow-md">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Assist</span>
                </button>
              )}
            </div>
            {isSummaryStep && (
              <p className="text-base text-gray-600 mt-3 leading-relaxed">
                Now that we have all your details, let's create a compelling professional summary!
              </p>
            )}
          </div>
          
          <div className="p-8">
            {CurrentStepComponent && <CurrentStepComponent />}
          </div>

          {/* Navigation */}
          <div className="p-8 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-md'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-bold hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>

                {isLastStep ? (
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>Complete & Download</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                      !canProceed()
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
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
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 min-h-fit">
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all duration-300 lg:hidden shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-sm font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
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