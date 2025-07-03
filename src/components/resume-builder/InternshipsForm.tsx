import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useResume } from '../../contexts/ResumeContext';

export const InternshipsForm: React.FC = () => {
  const { currentResume, setCurrentResume } = useResume();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));
  
  const { control, register, watch } = useForm({
    defaultValues: {
      internships: currentResume?.internships?.length ? currentResume.internships : [{
        id: Date.now().toString(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ['']
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'internships'
  });

  const watchedInternships = watch('internships');

  React.useEffect(() => {
    if (currentResume) {
      setCurrentResume({
        ...currentResume,
        internships: watchedInternships
      });
    }
  }, [watchedInternships, currentResume, setCurrentResume]);

  const addInternship = () => {
    const newIndex = fields.length;
    append({
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
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
                {watchedInternships[index]?.position || `Internship ${index + 1}`}
              </h3>
              {watchedInternships[index]?.company && (
                <p className="text-sm text-gray-600">{watchedInternships[index].company}</p>
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
                    {...register(`internships.${index}.company`)}
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
                    {...register(`internships.${index}.position`)}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Intern Title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    {...register(`internships.${index}.startDate`)}
                    type="month"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    {...register(`internships.${index}.endDate`)}
                    type="month"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <button
                    type="button"
                    className="flex items-center space-x-1 px-2 py-1 bg-purple-600 text-white rounded text-xs font-medium hover:bg-purple-700 transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>AI Enhance</span>
                  </button>
                </div>
                
                <TextareaAutosize
                  {...register(`internships.${index}.description.0`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                  placeholder="Describe your internship responsibilities, projects, and achievements..."
                  minRows={3}
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addInternship}
        className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Add Internship</span>
      </button>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-orange-900 mb-2">🎯 Internship Tips</h4>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• Include all relevant internships, even short-term ones</li>
          <li>• Focus on specific projects and technologies you worked with</li>
          <li>• Mention any full-time offer or positive feedback received</li>
          <li>• Highlight skills gained and how they apply to your target role</li>
        </ul>
      </div>
    </div>
  );
};