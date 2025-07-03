import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Target, 
  Mail, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Download,
  Users,
  Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useResume } from '../contexts/ResumeContext';

const quickActions = [
  {
    title: 'Create New Resume',
    description: 'Build a professional resume with AI assistance',
    icon: FileText,
    href: '/resume-builder',
    color: 'from-blue-500 to-blue-600',
    textColor: 'text-blue-700'
  },
  {
    title: 'Analyze Resume',
    description: 'Check ATS compatibility and get improvement tips',
    icon: Target,
    href: '/ats-analyzer',
    color: 'from-emerald-500 to-emerald-600',
    textColor: 'text-emerald-700'
  },
  {
    title: 'Generate Cover Letter',
    description: 'Create personalized cover letters instantly',
    icon: Mail,
    href: '/cover-letter',
    color: 'from-purple-500 to-purple-600',
    textColor: 'text-purple-700'
  },
  {
    title: 'Track Applications',
    description: 'Manage your job applications effectively',
    icon: Briefcase,
    href: '/job-tracker',
    color: 'from-orange-500 to-orange-600',
    textColor: 'text-orange-700'
  }
];

const stats = [
  { name: 'Resumes Created', value: '12', icon: FileText, change: '+2 this week' },
  { name: 'Applications Sent', value: '28', icon: Briefcase, change: '+5 this week' },
  { name: 'Response Rate', value: '24%', icon: TrendingUp, change: '+3% improvement' },
  { name: 'Avg. ATS Score', value: '89%', icon: Target, change: '+12% improvement' }
];

const recentActivity = [
  {
    id: 1,
    type: 'resume',
    title: 'Software Engineer Resume',
    action: 'Updated',
    time: '2 hours ago',
    icon: FileText
  },
  {
    id: 2,
    type: 'application',
    title: 'Frontend Developer at TechCorp',
    action: 'Applied',
    time: '5 hours ago',
    icon: Briefcase
  },
  {
    id: 3,
    type: 'analysis',
    title: 'ATS Analysis Completed',
    action: 'Score: 92%',
    time: '1 day ago',
    icon: Target
  },
  {
    id: 4,
    type: 'cover-letter',
    title: 'Cover Letter Generated',
    action: 'For Data Scientist role',
    time: '2 days ago',
    icon: Mail
  }
];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { savedResumes } = useResume();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋
            </h1>
            <p className="text-blue-100 text-lg mb-6">
              Ready to take your career to the next level? Let's build something amazing together.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                to="/resume-builder"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Building</span>
              </Link>
              <Link
                to="/ats-analyzer"
                className="bg-blue-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500/30 transition-colors flex items-center space-x-2"
              >
                <Target className="w-4 h-4" />
                <span>Analyze Resume</span>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-16 h-16 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.name}</h3>
              <p className="text-xs text-green-600 font-medium">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              to={action.href}
              className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-800">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{action.description}</p>
              <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                <span>Get started</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <Link 
              to="/saved-resumes" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Tips */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">AI Career Tips</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-purple-100">
              <h3 className="text-sm font-medium text-gray-900 mb-2">💡 Resume Optimization</h3>
              <p className="text-xs text-gray-600">
                Use action verbs like "achieved," "implemented," and "optimized" to make your experience more impactful.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-purple-100">
              <h3 className="text-sm font-medium text-gray-900 mb-2">🎯 ATS Compatibility</h3>
              <p className="text-xs text-gray-600">
                Include relevant keywords from job descriptions to improve your ATS score by 15-20%.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-purple-100">
              <h3 className="text-sm font-medium text-gray-900 mb-2">📈 Application Strategy</h3>
              <p className="text-xs text-gray-600">
                Follow up on applications after 1-2 weeks to show continued interest and professionalism.
              </p>
            </div>
          </div>
          
          <button className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            Get More Tips
          </button>
        </div>
      </div>
    </div>
  );
};