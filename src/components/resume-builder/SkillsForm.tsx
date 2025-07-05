import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Plus, Trash2, Tag } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';

export const SkillsForm: React.FC = () => {
  const { currentResume, setCurrentResume } = useResume();
  
  const { control, register, watch, setValue, getValues } = useForm({
    defaultValues: {
      skills: currentResume?.skills?.length ? currentResume.skills : [{
        id: Date.now().toString(),
        category: 'Technical Skills',
        items: []
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills'
  });

  const watchedSkills = watch('skills');

  React.useEffect(() => {
    if (currentResume) {
      setCurrentResume({
        ...currentResume,
        skills: watchedSkills
      });
    }
  }, [watchedSkills, currentResume, setCurrentResume]);

  const addSkillCategory = () => {
    append({
      id: Date.now().toString(),
      category: '',
      items: []
    });
  };

  const addSkillToCategory = (categoryIndex: number, skill: string) => {
    if (skill.trim()) {
      const currentSkills = getValues('skills');
      const currentItems = currentSkills[categoryIndex]?.items || [];
      const updatedItems = [...currentItems, skill.trim()];
      
      setValue(`skills.${categoryIndex}.items`, updatedItems, { shouldDirty: true });
    }
  };

  const removeSkillFromCategory = (categoryIndex: number, skillIndex: number) => {
    const currentSkills = getValues('skills');
    const currentItems = currentSkills[categoryIndex]?.items || [];
    const updatedItems = currentItems.filter((_, i) => i !== skillIndex);
    
    setValue(`skills.${categoryIndex}.items`, updatedItems, { shouldDirty: true });
  };

  const popularSkills = {
    'Technical Skills': [
      'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'SQL', 'Git',
      'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'GraphQL'
    ],
    'Programming Languages': [
      'JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'PHP', 'Ruby',
      'Go', 'Rust', 'Swift', 'Kotlin', 'Scala', 'R'
    ],
    'Frameworks & Libraries': [
      'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Django', 'Flask',
      'Spring Boot', 'Laravel', 'Ruby on Rails', 'Next.js', 'Nuxt.js'
    ],
    'Tools & Technologies': [
      'Git', 'Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Azure', 'GCP',
      'Terraform', 'Ansible', 'Webpack', 'Babel', 'ESLint'
    ],
    'Soft Skills': [
      'Leadership', 'Communication', 'Problem Solving', 'Team Collaboration',
      'Project Management', 'Critical Thinking', 'Adaptability', 'Time Management',
      'Mentoring', 'Public Speaking', 'Negotiation', 'Conflict Resolution'
    ],
    'Languages': [
      'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
      'Portuguese', 'Italian', 'Russian', 'Arabic', 'Hindi', 'Korean'
    ]
  };

  return (
    <div className="space-y-6">
      {fields.map((field, categoryIndex) => (
        <div key={field.id} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill Category
              </label>
              <select
                {...register(`skills.${categoryIndex}.category`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              >
                <option value="">Select Category</option>
                <option value="Technical Skills">Technical Skills</option>
                <option value="Programming Languages">Programming Languages</option>
                <option value="Frameworks & Libraries">Frameworks & Libraries</option>
                <option value="Tools & Technologies">Tools & Technologies</option>
                <option value="Soft Skills">Soft Skills</option>
                <option value="Languages">Languages</option>
                <option value="Certifications">Certifications</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(categoryIndex)}
                className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            
            {/* Current skills */}
            <div className="flex flex-wrap gap-2 mb-3 min-h-[2rem]">
              {(watchedSkills[categoryIndex]?.items || []).map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkillFromCategory(categoryIndex, skillIndex)}
                    className="ml-2 text-blue-600 hover:text-blue-800 text-lg leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
              {(!watchedSkills[categoryIndex]?.items || watchedSkills[categoryIndex]?.items.length === 0) && (
                <span className="text-gray-400 text-sm italic">No skills added yet</span>
              )}
            </div>

            {/* Add skill input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add a skill and press Enter"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    if (input.value.trim()) {
                      addSkillToCategory(categoryIndex, input.value);
                      input.value = '';
                    }
                  }
                }}
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input.value.trim()) {
                    addSkillToCategory(categoryIndex, input.value);
                    input.value = '';
                  }
                }}
              >
                Add
              </button>
            </div>

            {/* Popular skills suggestions */}
            {watchedSkills[categoryIndex]?.category && popularSkills[watchedSkills[categoryIndex].category as keyof typeof popularSkills] && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Popular skills for this category:</p>
                <div className="flex flex-wrap gap-2">
                  {popularSkills[watchedSkills[categoryIndex].category as keyof typeof popularSkills]
                    .filter(skill => !(watchedSkills[categoryIndex]?.items || []).includes(skill))
                    .slice(0, 8)
                    .map(skill => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => addSkillToCategory(categoryIndex, skill)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      >
                        + {skill}
                      </button>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addSkillCategory}
        className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Add Skill Category</span>
      </button>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-green-900 mb-2">🎯 Skills Best Practices</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Include both hard and soft skills relevant to your target role</li>
          <li>• Be specific (e.g., "React.js" instead of just "JavaScript frameworks")</li>
          <li>• Order skills by proficiency level (most skilled first)</li>
          <li>• Include years of experience or proficiency level when relevant</li>
          <li>• Match skills mentioned in job descriptions you're targeting</li>
        </ul>
      </div>
    </div>
  );
};