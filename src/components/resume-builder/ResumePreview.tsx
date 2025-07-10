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
    <div className="bg-white p-8 max-h-[800px] overflow-y-auto" id="resume-preview">
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {resume.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
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
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {resume.summary}
          </p>
        </div>
      )}

      {/* Experience (for experienced users) */}
      {isExperiencedUser && resume.experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description?.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
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
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">
                    {edu.school}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects (important for freshers) */}
      {resume.projects?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Projects
          </h2>
          <div className="space-y-3">
            {resume.projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-base font-semibold text-gray-900">
                  {project.name}
                </h3>
                <p className="text-gray-700 text-sm mb-1">
                  {project.description}
                </p>
                {project.technologies?.length > 0 && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Internships (for freshers) */}
      {isFresher && resume.internships?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Internships
          </h2>
          <div className="space-y-4">
            {resume.internships.map((internship) => (
              <div key={internship.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {internship.position}
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {internship.company}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    {formatDate(internship.startDate)} - {formatDate(internship.endDate)}
                  </div>
                </div>
                {internship.description?.length > 0 && (
                  <div className="text-gray-700 text-sm ml-4">
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
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Work Experience
          </h2>
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description?.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
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
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Skills
          </h2>
          <div className="space-y-3">
            {validSkillCategories.map((skillGroup) => (
              <div key={skillGroup.id} className="flex">
                <span className="font-semibold text-gray-900 min-w-[140px] mr-3">
                  {skillGroup.category}:
                </span>
                <span className="text-gray-700 flex-1 leading-relaxed">
                  {skillGroup.items.join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.certifications?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Certifications
          </h2>
          <div className="space-y-2">
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {cert.name}
                  </h3>
                  <p className="text-gray-700">
                    {cert.issuer}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  {cert.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements (for freshers) */}
      {isFresher && resume.achievements?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Achievements
          </h2>
          <div className="space-y-2">
            {resume.achievements.map((achievement) => (
              <div key={achievement.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {achievement.description}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
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