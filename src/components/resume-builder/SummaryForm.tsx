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
    if (!currentResume) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation with actual user data
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Analyze user's data to create personalized summary
    const personalInfo = currentResume.personalInfo;
    const experience = currentResume.experience || [];
    const education = currentResume.education || [];
    const skills = currentResume.skills || [];
    const projects = currentResume.projects || [];
    const userType = currentResume.userType;

    let summary = '';

    if (userType === 'fresher') {
      // Fresh graduate summary
      const degree = education[0]?.degree || 'degree';
      const field = education[0]?.field || 'studies';
      const school = education[0]?.school || 'university';
      
      const technicalSkills = skills.find(s => 
        s.category.toLowerCase().includes('technical') || 
        s.category.toLowerCase().includes('programming')
      )?.items || [];
      
      const projectCount = projects.length;
      const internshipCount = currentResume.internships?.length || 0;

      summary = `Recent ${degree} graduate in ${field} from ${school} with ${
        technicalSkills.length > 0 ? `strong technical skills in ${technicalSkills.slice(0, 3).join(', ')}` : 'a solid foundation in technology'
      }. ${
        projectCount > 0 ? `Demonstrated practical experience through ${projectCount} hands-on project${projectCount > 1 ? 's' : ''}, ` : ''
      }${
        internshipCount > 0 ? `${internshipCount} internship${internshipCount > 1 ? 's' : ''}, ` : ''
      }showcasing problem-solving abilities and eagerness to learn. ${
        experience.length > 0 ? `Gained valuable experience in ${experience[0].position} role, ` : ''
      }seeking to leverage academic knowledge and practical skills to contribute to innovative projects and grow professionally in a dynamic technology environment.`;

    } else if (userType === 'experienced' || userType === 'senior') {
      // Experienced professional summary
      const totalYears = experience.length > 0 ? Math.max(2, experience.length * 2) : '5+';
      const currentRole = experience[0]?.position || 'professional';
      const currentCompany = experience[0]?.company || 'leading organization';
      const industry = experience.length > 1 ? 'multiple industries' : 'the industry';
      
      const technicalSkills = skills.find(s => 
        s.category.toLowerCase().includes('technical') || 
        s.category.toLowerCase().includes('programming')
      )?.items || [];
      
      const softSkills = skills.find(s => 
        s.category.toLowerCase().includes('soft') || 
        s.category.toLowerCase().includes('leadership')
      )?.items || [];

      summary = `${userType === 'senior' ? 'Senior' : 'Experienced'} ${currentRole} with ${totalYears} years of expertise in ${
        technicalSkills.length > 0 ? technicalSkills.slice(0, 3).join(', ') : 'technology solutions'
      }. ${
        userType === 'senior' ? 'Proven track record of leading cross-functional teams and driving strategic initiatives' : 'Demonstrated ability to deliver high-quality solutions and collaborate effectively with diverse teams'
      } across ${industry}. ${
        softSkills.length > 0 ? `Strong ${softSkills.slice(0, 2).join(' and ')} skills, ` : ''
      }with a focus on ${
        projects.length > 0 ? 'innovative project development and ' : ''
      }continuous improvement. Seeking to leverage extensive experience and technical expertise to drive innovation and mentor emerging talent in a challenging ${userType === 'senior' ? 'leadership' : 'senior'} role.`;

    } else if (userType === 'career-change') {
      // Career changer summary
      const previousField = experience[0]?.position || 'previous role';
      const targetSkills = skills.find(s => 
        s.category.toLowerCase().includes('technical') || 
        s.category.toLowerCase().includes('programming')
      )?.items || [];
      
      const transferableSkills = skills.find(s => 
        s.category.toLowerCase().includes('soft') || 
        s.category.toLowerCase().includes('leadership')
      )?.items || [];

      summary = `Motivated professional transitioning from ${previousField} to technology, bringing ${
        transferableSkills.length > 0 ? `strong ${transferableSkills.slice(0, 2).join(' and ')} skills` : 'valuable transferable skills'
      } and a fresh perspective. ${
        targetSkills.length > 0 ? `Developed proficiency in ${targetSkills.slice(0, 3).join(', ')} through ` : 'Gained technical knowledge through '
      }${
        education.length > 0 ? 'formal education, ' : ''
      }${
        projects.length > 0 ? `hands-on projects, ` : ''
      }and continuous learning. ${
        experience.length > 0 ? `Previous experience in ${experience[0].company} provided strong foundation in problem-solving and client relations. ` : ''
      }Eager to apply diverse background and newly acquired technical skills to contribute meaningfully to innovative technology solutions.`;

    } else {
      // Default summary
      const role = experience[0]?.position || 'professional';
      const skills_list = skills.flatMap(s => s.items).slice(0, 4).join(', ') || 'various technologies';
      
      summary = `Dedicated ${role} with expertise in ${skills_list}. ${
        experience.length > 0 ? `Proven track record at ${experience[0].company} ` : ''
      }${
        education.length > 0 ? `with ${education[0].degree} in ${education[0].field}. ` : '. '
      }${
        projects.length > 0 ? `Demonstrated technical abilities through ${projects.length} project${projects.length > 1 ? 's' : ''}, ` : ''
      }seeking to leverage skills and experience to drive innovation and contribute to organizational success in a challenging role.`;
    }

    setValue('summary', summary);
    setIsGenerating(false);
  };

  const hasUserData = () => {
    if (!currentResume) return false;
    
    const hasBasicInfo = currentResume.personalInfo?.fullName;
    const hasExperience = currentResume.experience?.length > 0;
    const hasEducation = currentResume.education?.length > 0;
    const hasSkills = currentResume.skills?.some(s => s.items?.length > 0);
    
    return hasBasicInfo && (hasExperience || hasEducation || hasSkills);
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
            disabled={isGenerating || !hasUserData()}
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
            <h4 className="text-sm font-medium text-purple-900 mb-1">AI Summary Generation</h4>
            {hasUserData() ? (
              <p className="text-sm text-purple-700">
                Our AI will analyze your experience, education, skills, and projects to generate a personalized summary. 
                Click "AI Generate" to create a professional summary tailored to your background and career stage.
              </p>
            ) : (
              <p className="text-sm text-purple-700">
                Complete the previous steps (Personal Info, Experience/Education, Skills) to enable AI summary generation. 
                The AI needs your information to create a personalized summary.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};