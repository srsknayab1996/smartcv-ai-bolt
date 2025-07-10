import React from 'react';
import { format } from 'date-fns';
import { ResumeData } from '../../contexts/ResumeContext';

interface ResumePreviewProps {
  resume: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString + '-01');
      return format(date, 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  const isExperiencedUser = resume.userType === 'experienced' || resume.userType === 'senior';
  const isFresher = resume.userType === 'fresher';

  // Filter out empty skill categories
  const validSkillCategories = resume.skills?.filter(skillGroup => 
    skillGroup.category && skillGroup.items && skillGroup.items.length > 0
  ) || [];

  return (
    <div className="bg-white p-8 max-h-[800px] overflow-y-auto shadow-inner" id="resume-preview" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="border-b-3 border-gray-900 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          {resume.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-base text-gray-700 font-medium">
          {resume.personalInfo.email && (
            <span>{resume.personalInfo.email}</span>
          )}
          {resume.personalInfo.phone && (
            <span>{resume.personalInfo.phone}</span>
          )}
          {resume.personalInfo.location && (
            <span>{resume.personalInfo.location}</span>
          )}
          {resume.personalInfo.website && (
            <span>{resume.personalInfo.website}</span>
          )}
          {resume.personalInfo.linkedin && (
            <span>LinkedIn</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
            Professional Summary
          </h2>
          <p className="text-gray-800 leading-relaxed text-base">
            {resume.summary}
          </p>
        </div>
      )}

      {/* Experience (for experienced users) */}
      {isExperiencedUser && resume.experience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-800 font-semibold text-base">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-base text-gray-600 text-right font-medium">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description?.length > 0 && (
                  <ul className="list-disc list-inside space-y-2 text-gray-800 text-base ml-4">
                    {exp.description.map((item, index) => (
                      item && <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education (prioritized for freshers) */}
      {resume.education?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start border-l-4 border-green-500 pl-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-800 font-medium">
                    {edu.school}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
                <div className="text-base text-gray-600 font-medium">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects (important for freshers) */}
      {resume.projects?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
            Projects
          </h2>
          <div className="space-y-4">
            {resume.projects.map((project) => (
              <div key={project.id} className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {project.name}
                </h3>
                <p className="text-gray-800 text-base mb-2 leading-relaxed">
                  {project.description}
                </p>
                {project.technologies?.length > 0 && (
                  <p className="text-gray-700 text-base">
                    <span className="font-bold">Technologies:</span> {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Internships (for freshers) */}
      {isFresher && resume.internships?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
            Internships
          </h2>
          <div className="space-y-6">
            {resume.internships.map((internship) => (
              <div key={internship.id} className="border-l-4 border-orange-500 pl-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {internship.position}
                    </h3>
                    <p className="text-gray-800 font-semibold">
                      {internship.company}
                    </p>
                  </div>
                  <div className="text-base text-gray-600 text-right font-medium">
                    {formatDate(internship.startDate)} - {formatDate(internship.endDate)}
                  </div>
                </div>
                {internship.description?.length > 0 && (
                  <div className="text-gray-800 text-base ml-4 space-y-1">
                    {internship.description.map((item, index) => (
                      item && <p key={index}>• {item}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience (for freshers - after education and projects) */}
      {isFresher && resume.experience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
            Work Experience
          </h2>
          <div className="space-y-6">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-800 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-base text-gray-600 text-right font-medium">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description?.length > 0 && (
                  <ul className="list-disc list-inside space-y-2 text-gray-800 text-base ml-4">
                    {exp.description.map((item, index) => (
                      item && <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills - Now properly organized by category */}
      {validSkillCategories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
            Skills
          </h2>
          <div className="space-y-4">
            {validSkillCategories.map((skillGroup) => (
              <div key={skillGroup.id} className="flex border-l-4 border-indigo-500 pl-4">
                <span className="font-bold text-gray-900 min-w-[160px] mr-4 text-base">
                  {skillGroup.category}:
                </span>
                <span className="text-gray-800 flex-1 leading-relaxed text-base font-medium">
                  {skillGroup.items.join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.certifications?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
            Certifications
          </h2>
          <div className="space-y-4">
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start border-l-4 border-yellow-500 pl-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {cert.name}
                  </h3>
                  <p className="text-gray-800 font-medium">
                    {cert.issuer}
                  </p>
                </div>
                <div className="text-base text-gray-600 font-medium">
                  {cert.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements (for freshers) */}
      {isFresher && resume.achievements?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
            Achievements
          </h2>
          <div className="space-y-4">
            {resume.achievements.map((achievement) => (
              <div key={achievement.id} className="flex justify-between items-start border-l-4 border-red-500 pl-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-800 text-base">
                    {achievement.description}
                  </p>
                </div>
                <div className="text-base text-gray-600 font-medium">
                  {achievement.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};