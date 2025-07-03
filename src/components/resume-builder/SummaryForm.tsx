import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Sparkles, RefreshCw } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useResume } from '../../contexts/ResumeContext';

export const SummaryForm: React.FC = () => {
  const { currentResume, setCurrentResume } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  const { register, watch, setValue } = useForm({
    defaultValues: { summary: currentResume?.summary || '' }
  });

  const watchedSummary = watch('summary');

  React.useEffect(() => {
    if (currentResume) {
      setCurrentResume({
        ...currentResume,
        summary: watchedSummary
      });
    }
  }, [watchedSummary, currentResume, setCurrentResume]);

  const generateAISummary = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiSummary = `Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading cross-functional teams. Passionate about clean code, agile methodologies, and continuous learning. Seeking to leverage technical skills and leadership experience to drive innovation at a forward-thinking technology company.`;
    
    setValue('summary', aiSummary);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Professional Summary
          </label>
          <button
            onClick={generateAISummary}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isGenerating ? 'Generating...' : 'AI Generate'}</span>
          </button>
        </div>
        
        <TextareaAutosize
          {...register('summary')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary that highlights your key achievements, skills, and career objectives..."
          minRows={4}
          maxRows={8}
        />
        
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500">
            Aim for 3-4 sentences that capture your professional essence
          </p>
          <span className="text-xs text-gray-400">
            {watchedSummary?.length || 0} characters
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-900 mb-2">✅ Good Summary</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Quantifies achievements with numbers</li>
            <li>• Mentions relevant skills and technologies</li>
            <li>• Shows career progression and goals</li>
            <li>• Tailored to target role/industry</li>
          </ul>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-red-900 mb-2">❌ Avoid</h4>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Generic, templated language</li>
            <li>• First-person pronouns (I, me, my)</li>
            <li>• Vague statements without evidence</li>
            <li>• Overly long paragraphs</li>
          </ul>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-purple-900 mb-1">AI Suggestions</h4>
            <p className="text-sm text-purple-700">
              Our AI can analyze your experience and education to generate a personalized summary. 
              Click "AI Generate" to create a professional summary tailored to your background.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};