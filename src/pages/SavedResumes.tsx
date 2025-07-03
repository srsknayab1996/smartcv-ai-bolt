import React, { useState } from 'react';
import { FileText, Download, Edit, Trash2, Copy, Eye, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useResume } from '../contexts/ResumeContext';

export const SavedResumes: React.FC = () => {
  const { savedResumes, deleteResume, setCurrentResume, createNewResume } = useResume();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResumes, setSelectedResumes] = useState<Set<string>>(new Set());

  const filteredResumes = savedResumes.filter(resume => 
    resume.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.experience.some(exp => 
      exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.position.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSelectResume = (id: string) => {
    const newSelected = new Set(selectedResumes);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedResumes(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedResumes.size === filteredResumes.length) {
      setSelectedResumes(new Set());
    } else {
      setSelectedResumes(new Set(filteredResumes.map(r => r.id)));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedResumes.size} resume(s)?`)) {
      selectedResumes.forEach(id => deleteResume(id));
      setSelectedResumes(new Set());
    }
  };

  const duplicateResume = (resume: any) => {
    const duplicated = {
      ...resume,
      id: Date.now().toString(),
      personalInfo: {
        ...resume.personalInfo,
        fullName: `${resume.personalInfo.fullName} (Copy)`
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCurrentResume(duplicated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Resumes</h1>
          <p className="text-gray-600 mt-1">Manage and organize your resume collection</p>
        </div>
        <Link
          to="/resume-builder"
          onClick={createNewResume}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Resume</span>
        </Link>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search resumes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>
        
        {selectedResumes.size > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {selectedResumes.size} selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Resume Grid */}
      {filteredResumes.length > 0 ? (
        <>
          {/* Select All */}
          <div className="flex items-center space-x-2 py-2">
            <input
              type="checkbox"
              checked={selectedResumes.size === filteredResumes.length && filteredResumes.length > 0}
              onChange={handleSelectAll}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Select all ({filteredResumes.length})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume) => (
              <div
                key={resume.id}
                className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-200 hover:shadow-lg ${
                  selectedResumes.has(resume.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                {/* Preview */}
                <div className="p-4 border-b border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-4 min-h-48 relative overflow-hidden">
                    <div className="absolute top-2 left-2">
                      <input
                        type="checkbox"
                        checked={selectedResumes.has(resume.id)}
                        onChange={() => handleSelectResume(resume.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    
                    {/* Mini resume preview */}
                    <div className="mt-6 space-y-2 text-xs">
                      <div className="font-bold text-gray-900">
                        {resume.personalInfo.fullName || 'Untitled Resume'}
                      </div>
                      <div className="text-gray-600">
                        {resume.personalInfo.email}
                      </div>
                      {resume.experience.length > 0 && (
                        <div className="mt-3">
                          <div className="font-medium text-gray-800">
                            {resume.experience[0].position}
                          </div>
                          <div className="text-gray-600">
                            {resume.experience[0].company}
                          </div>
                        </div>
                      )}
                      {resume.summary && (
                        <div className="mt-2 text-gray-500 line-clamp-3">
                          {resume.summary.substring(0, 80)}...
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {resume.personalInfo.fullName || 'Untitled Resume'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Updated {format(new Date(resume.updatedAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {resume.templateId}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Link
                        to="/resume-builder"
                        onClick={() => setCurrentResume(resume)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => duplicateResume(resume)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this resume?')) {
                            deleteResume(resume.id);
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No resumes found' : 'No saved resumes yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms'
              : 'Create your first resume to get started'
            }
          </p>
          {!searchTerm && (
            <Link
              to="/resume-builder"
              onClick={createNewResume}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Resume</span>
            </Link>
          )}
        </div>
      )}

      {/* Tips */}
      {filteredResumes.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Resume Management Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Create different versions of your resume for different job types</li>
            <li>• Keep your resumes updated with your latest achievements</li>
            <li>• Use descriptive names to easily identify each resume</li>
            <li>• Regularly backup your resumes by downloading them</li>
          </ul>
        </div>
      )}
    </div>
  );
};