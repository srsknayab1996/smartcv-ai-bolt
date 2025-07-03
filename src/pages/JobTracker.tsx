import React, { useState } from 'react';
import { Plus, MoreVertical, Calendar, Building, MapPin } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { format } from 'date-fns';

interface JobApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  appliedDate: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  salary?: string;
  notes?: string;
}

const columns = [
  { id: 'applied', title: 'Applied', color: 'bg-blue-100 text-blue-800' },
  { id: 'interview', title: 'Interview', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'offer', title: 'Offer', color: 'bg-green-100 text-green-800' },
  { id: 'rejected', title: 'Rejected', color: 'bg-red-100 text-red-800' }
];

const sampleApplications: JobApplication[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    appliedDate: '2024-01-15',
    status: 'interview',
    salary: '$120,000 - $150,000',
    notes: 'Great team culture, remote-friendly'
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    appliedDate: '2024-01-10',
    status: 'applied',
    salary: '$100,000 - $130,000'
  },
  {
    id: '3',
    title: 'Software Engineer',
    company: 'BigTech Inc',
    location: 'Seattle, WA',
    appliedDate: '2024-01-05',
    status: 'offer',
    salary: '$140,000 - $180,000',
    notes: 'Excellent benefits package'
  }
];

const JobCard: React.FC<{ job: JobApplication; onUpdate: (id: string, updates: Partial<JobApplication>) => void }> = ({ job, onUpdate }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'job',
    item: { id: job.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-gray-900 text-sm leading-tight">{job.title}</h3>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <Building className="w-3 h-3 mr-1.5" />
          {job.company}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-3 h-3 mr-1.5" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-3 h-3 mr-1.5" />
          {format(new Date(job.appliedDate), 'MMM d, yyyy')}
        </div>
      </div>
      
      {job.salary && (
        <div className="text-sm font-medium text-green-600 mb-2">
          {job.salary}
        </div>
      )}
      
      {job.notes && (
        <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
          {job.notes}
        </div>
      )}
    </div>
  );
};

const Column: React.FC<{ 
  column: typeof columns[0]; 
  jobs: JobApplication[]; 
  onJobMove: (jobId: string, newStatus: string) => void;
  onUpdate: (id: string, updates: Partial<JobApplication>) => void;
}> = ({ column, jobs, onJobMove, onUpdate }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'job',
    drop: (item: { id: string }) => {
      onJobMove(item.id, column.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <div className="flex-1 min-w-72">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">{column.title}</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${column.color}`}>
            {jobs.length}
          </span>
        </div>
      </div>
      
      <div
        ref={drop}
        className={`min-h-96 p-3 rounded-lg border-2 border-dashed space-y-3 transition-colors ${
          isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'
        }`}
      >
        {jobs.map(job => (
          <JobCard key={job.id} job={job} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
};

export const JobTracker: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>(sampleApplications);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    notes: ''
  });

  const handleJobMove = (jobId: string, newStatus: string) => {
    setApplications(prev => 
      prev.map(job => 
        job.id === jobId 
          ? { ...job, status: newStatus as JobApplication['status'] }
          : job
      )
    );
  };

  const handleJobUpdate = (id: string, updates: Partial<JobApplication>) => {
    setApplications(prev =>
      prev.map(job => (job.id === id ? { ...job, ...updates } : job))
    );
  };

  const addNewJob = () => {
    if (!newJob.title || !newJob.company) return;
    
    const job: JobApplication = {
      id: Date.now().toString(),
      title: newJob.title,
      company: newJob.company,
      location: newJob.location,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'applied',
      salary: newJob.salary || undefined,
      notes: newJob.notes || undefined
    };
    
    setApplications(prev => [...prev, job]);
    setNewJob({ title: '', company: '', location: '', salary: '', notes: '' });
    setShowAddForm(false);
  };

  const stats = {
    total: applications.length,
    applied: applications.filter(j => j.status === 'applied').length,
    interview: applications.filter(j => j.status === 'interview').length,
    offer: applications.filter(j => j.status === 'offer').length,
    rejected: applications.filter(j => j.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Application Tracker</h1>
          <p className="text-gray-600 mt-1">Manage and track your job applications</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Applications</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
          <div className="text-sm text-gray-600">Applied</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{stats.interview}</div>
          <div className="text-sm text-gray-600">Interviews</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{stats.offer}</div>
          <div className="text-sm text-gray-600">Offers</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex gap-6 overflow-x-auto">
          {columns.map(column => (
            <Column
              key={column.id}
              column={column}
              jobs={applications.filter(job => job.status === column.id)}
              onJobMove={handleJobMove}
              onUpdate={handleJobUpdate}
            />
          ))}
        </div>
      </div>

      {/* Add Job Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Application</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  value={newJob.title}
                  onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                <input
                  type="text"
                  value={newJob.company}
                  onChange={(e) => setNewJob(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., TechCorp Inc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newJob.location}
                  onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <input
                  type="text"
                  value={newJob.salary}
                  onChange={(e) => setNewJob(prev => ({ ...prev, salary: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., $120,000 - $150,000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newJob.notes}
                  onChange={(e) => setNewJob(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  rows={3}
                  placeholder="Any additional notes..."
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addNewJob}
                disabled={!newJob.title || !newJob.company}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};