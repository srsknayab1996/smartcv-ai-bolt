import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Plus, Trash2, ExternalLink, Github } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useResume } from '../../contexts/ResumeContext';

export const ProjectsForm: React.FC = () => {
  const { currentResume, setCurrentResume } = useResume();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));
  
  const { control, register, watch, setValue } = useForm({
    defaultValues: {
      projects: currentResume?.projects?.length ? currentResume.projects : [{
        id: Date.now().toString(),
        name: '',
        description: '',
        technologies: [],
        link: ''
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects'
  });

  const watchedProjects = watch('projects');

  React.useEffect(() => {
    if (currentResume) {
      setCurrentResume({
        ...currentResume,
        projects: watchedProjects
      });
    }
  }, [watchedProjects, currentResume, setCurrentResume]);

  const addProject = () => {
    const newIndex = fields.length;
    append({
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: ''
    });
    setExpandedItems(prev => new Set([...prev, newIndex]));
  };

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const addTechnology = (projectIndex: number, tech: string) => {
    if (tech.trim()) {
      const currentTech = watchedProjects[projectIndex]?.technologies || [];
      const updatedTech = [...currentTech, tech.trim()];
      setValue(`projects.${projectIndex}.technologies`, updatedTech);
    }
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const currentTech = watchedProjects[projectIndex]?.technologies || [];
    const updatedTech = currentTech.filter((_, i) => i !== techIndex);
    setValue(`projects.${projectIndex}.technologies`, updatedTech);
  };

  const popularTechnologies = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'HTML/CSS',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'AWS', 'Docker', 'Git',
    'Express.js', 'Next.js', 'Vue.js', 'Angular', 'Flutter', 'React Native'
  ];

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="bg-gray-50 rounded-lg border border-gray-200">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => toggleExpanded(index)}
          >
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {watchedProjects[index]?.name || `Project ${index + 1}`}
              </h3>
              {watchedProjects[index]?.technologies?.length > 0 && (
                <p className="text-sm text-gray-600">
                  {watchedProjects[index].technologies.slice(0, 3).join(', ')}
                  {watchedProjects[index].technologies.length > 3 && '...'}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(index);
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <div className={`w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-transform ${
                expandedItems.has(index) ? 'rotate-180' : ''
              }`}>
                <span className="text-xs text-gray-500">▼</span>
              </div>
            </div>
          </div>

          {expandedItems.has(index) && (
            <div className="px-4 pb-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name *
                  </label>
                  <input
                    {...register(`projects.${index}.name`)}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="E-commerce Website"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Link (Optional)
                  </label>
                  <div className="relative">
                    <input
                      {...register(`projects.${index}.link`)}
                      type="url"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="https://github.com/username/project"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {watchedProjects[index]?.link?.includes('github') ? (
                        <Github className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description *
                </label>
                <TextareaAutosize
                  {...register(`projects.${index}.description`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                  placeholder="Describe what the project does, your role, and key features..."
                  minRows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies Used
                </label>
                
                {/* Current technologies */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {(watchedProjects[index]?.technologies || []).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(index, techIndex)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add technology input */}
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add a technology and press Enter"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        addTechnology(index, input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addTechnology(index, input.value);
                      input.value = '';
                    }}
                  >
                    Add
                  </button>
                </div>

                {/* Popular technologies */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Popular technologies:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularTechnologies
                      .filter(tech => !(watchedProjects[index]?.technologies || []).includes(tech))
                      .slice(0, 10)
                      .map(tech => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => addTechnology(index, tech)}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                        >
                          + {tech}
                        </button>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addProject}
        className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Add Project</span>
      </button>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-purple-900 mb-2">🚀 Project Tips</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Include both personal and academic projects</li>
          <li>• Focus on projects that demonstrate relevant skills</li>
          <li>• Mention your specific role and contributions</li>
          <li>• Include live demos or GitHub links when possible</li>
          <li>• Quantify impact (users, performance improvements, etc.)</li>
        </ul>
      </div>
    </div>
  );
};