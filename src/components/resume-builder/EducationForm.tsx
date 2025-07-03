import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';

export const EducationForm: React.FC = () => {
  const { currentResume, setCurrentResume } = useResume();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));
  
  const { control, register, watch } = useForm({
    defaultValues: {
      education: currentResume?.education?.length ? currentResume.education : [{
        id: Date.now().toString(),
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education'
  });

  const watchedEducation = watch('education');

  React.useEffect(() => {
    if (currentResume) {
      setCurrentResume({
        ...currentResume,
        education: watchedEducation
      });
    }
  }, [watchedEducation, currentResume, setCurrentResume]);

  const addEducation = () => {
    const newIndex = fields.length;
    append({
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
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
                {watchedEducation[index]?.degree || `Education ${index + 1}`}
              </h3>
              {watchedEducation[index]?.school && (
                <p className="text-sm text-gray-600">{watchedEducation[index].school}</p>
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
                    School/University *
                  </label>
                  <input
                    {...register(`education.${index}.school`)}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="University Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree *
                  </label>
                  <select
                    {...register(`education.${index}.degree`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  >
                    <option value="">Select Degree</option>
                    <option value="High School Diploma">High School Diploma</option>
                    <option value="Associate Degree">Associate Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctoral Degree">Doctoral Degree</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study *
                  </label>
                  <input
                    {...register(`education.${index}.field`)}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA (Optional)
                  </label>
                  <input
                    {...register(`education.${index}.gpa`)}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="3.8/4.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    {...register(`education.${index}.startDate`)}
                    type="month"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    {...register(`education.${index}.endDate`)}
                    type="month"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Add Education</span>
      </button>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-yellow-900 mb-2">📚 Education Tips</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• List your most recent education first</li>
          <li>• Only include GPA if it's 3.5 or higher</li>
          <li>• Include relevant coursework, honors, or activities if space allows</li>
          <li>• For professionals with 5+ years experience, keep education brief</li>
        </ul>
      </div>
    </div>
  );
};