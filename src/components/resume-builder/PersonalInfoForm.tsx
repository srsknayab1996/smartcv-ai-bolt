import React from 'react';
import { useForm } from 'react-hook-form';
import { useResume } from '../../contexts/ResumeContext';

export const PersonalInfoForm: React.FC = () => {
  const { currentResume, setCurrentResume } = useResume();
  const { register, watch } = useForm({
    defaultValues: currentResume?.personalInfo || {}
  });

  const watchedValues = watch();

  React.useEffect(() => {
    if (currentResume) {
      setCurrentResume({
        ...currentResume,
        personalInfo: { ...currentResume.personalInfo, ...watchedValues }
      });
    }
  }, [watchedValues, currentResume, setCurrentResume]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            {...register('fullName')}
            type="text"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 hover:border-gray-300"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 hover:border-gray-300"
            placeholder="john.smith@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 hover:border-gray-300"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            {...register('location')}
            type="text"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 hover:border-gray-300"
            placeholder="New York, NY"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            {...register('website')}
            type="url"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 hover:border-gray-300"
            placeholder="https://johndoe.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn
          </label>
          <input
            {...register('linkedin')}
            type="url"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 hover:border-gray-300"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 shadow-sm">
            <span className="text-blue-600 text-sm font-bold">💡</span>
          </div>
          <div>
            <h4 className="text-base font-bold text-blue-900 mb-2">Pro Tip</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              Use a professional email address and ensure your phone number includes the country code for international applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};