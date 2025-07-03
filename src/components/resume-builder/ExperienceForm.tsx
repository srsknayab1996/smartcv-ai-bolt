import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Plus, Trash2, Sparkles, Calendar } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useResume } from '../../contexts/ResumeContext';

interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export const ExperienceForm: React.FC = () => {
  const { currentResume, setCurrentResume } = useResume();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));
  
  const { control, register, watch, setValue } = useForm({
    defaultValues: {
      experience: currentResume?.experience?.length ? currentResume.experience : [{
        id: Date.now().toString(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ['']
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience'
  });

  const watchedExperience = watch('experience');

  React.useEffect(() => {
    if (currentResume) {
      setCurrentResume({
        ...currentResume,
        experience: watchedExperience
      });
    }
  }, [watchedExperience, currentResume, setCurrentResume]);

  const addExperience = () => {
    const newIndex = fields.length;
    append({
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ['']
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

  const addDescriptionPoint = (expIndex: number) => {
    const currentDesc = watchedExperience[expIndex]?.description || [];
    setValue(`experience.${expIndex}.description`, [...currentDesc, '']);
  };

  const removeDescriptionPoint = (expIndex: number, descIndex: number) => {
    const currentDesc = watchedExperience[expIndex]?.description || [];
    const newDesc = currentDesc.filter((_, i) => i !== descIndex);
    setValue(`experience.${expIndex}.description`, newDesc);
  };

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
                {watchedExperience[index]?.position || `Experience ${index + 1}`}
              </h3>
              {watchedExperience[index]?.company && (
                <p className="text-sm text-gray-600">{watchedExperience[index].company}</p>
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
                    Company *
                  </label>
                  <input
                    {...register(`experience.${index}.company`)}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Company Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position *
                  </label>
                  <input
                    {...register(`experience.${index}.position`)}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Job Title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    {...register(`experience.${index}.startDate`)}
                    type="month"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <div className="space-y-2">
                    <input
                      {...register(`experience.${index}.endDate`)}
                      type="month"
                      disabled={watchedExperience[index]?.current}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100 disabled:text-gray-500"
                    />
                    <label className="flex items-center space-x-2">
                      <input
                        {...register(`experience.${index}.current`)}
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Currently working here</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button
                    type="button"
                    className="flex items-center space-x-1 px-2 py-1 bg-purple-600 text-white rounded text-xs font-medium hover:bg-purple-700 transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>AI Enhance</span>
                  </button>
                </div>
                
                <div className="space-y-2">
                  {(watchedExperience[index]?.description || ['']).map((_, descIndex) => (
                    <div key={descIndex} className="flex items-start space-x-2">
                      <span className="text-gray-400 mt-2">•</span>
                      <div className="flex-1">
                        <TextareaAutosize
                          {...register(`experience.${index}.description.${descIndex}`)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                          placeholder="Describe your responsibilities and achievements..."
                          minRows={2}
                        />
                      </div>
                      {(watchedExperience[index]?.description?.length || 0) > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDescriptionPoint(index, descIndex)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors mt-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addDescriptionPoint(index)}
                    className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add bullet point</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Add Another Experience</span>
      </button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Writing Great Job Descriptions</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Start each bullet with a strong action verb (achieved, implemented, led)</li>
          <li>• Include specific numbers and metrics when possible</li>
          <li>• Focus on accomplishments, not just responsibilities</li>
          <li>• Use keywords relevant to your target role</li>
        </ul>
      </div>
    </div>
  );
};