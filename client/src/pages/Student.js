import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Calendar,
  LogOut,
  Play,
  CheckCircle,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';

const Student = () => {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching student data
    setTimeout(() => {
      setCourses([
        { id: 1, title: 'Mathematics 101', teacher: 'Dr. Smith', progress: 75, totalLessons: 12, completedLessons: 9 },
        { id: 2, title: 'English Literature', teacher: 'Prof. Johnson', progress: 60, totalLessons: 15, completedLessons: 9 },
        { id: 3, title: 'Physics Fundamentals', teacher: 'Dr. Brown', progress: 40, totalLessons: 20, completedLessons: 8 },
        { id: 4, title: 'Computer Science', teacher: 'Prof. Davis', progress: 90, totalLessons: 10, completedLessons: 9 }
      ]);
      
      setAssignments([
        { id: 1, title: 'Algebra Quiz', course: 'Mathematics 101', dueDate: '2024-01-15', status: 'pending' },
        { id: 2, title: 'Essay on Shakespeare', course: 'English Literature', dueDate: '2024-01-20', status: 'completed' },
        { id: 3, title: 'Physics Lab Report', course: 'Physics Fundamentals', dueDate: '2024-01-18', status: 'pending' }
      ]);
      
      setProgress({
        overall: 68,
        mathematics: 75,
        english: 60,
        physics: 40,
        computerScience: 90
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
          <p className="text-gray-600">Here's what's happening with your studies today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-500 text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-500 text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.progress === 100).length}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-500 text-white">
                <Clock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Due Soon</p>
                <p className="text-2xl font-bold text-gray-900">{assignments.filter(a => a.status === 'pending').length}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-500 text-white">
                <Award className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">My Courses</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{course.title}</h4>
                          <p className="text-sm text-gray-600">by {course.teacher}</p>
                        </div>
                        <button className="btn-primary flex items-center gap-2">
                          <Play className="h-4 w-4" />
                          Continue
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{course.completedLessons} of {course.totalLessons} lessons completed</span>
                          <span>{course.totalLessons - course.completedLessons} remaining</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Assignments */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assignments</h3>
              <div className="space-y-3">
                {assignments.filter(a => a.status === 'pending').map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{assignment.title}</p>
                      <p className="text-sm text-gray-600">{assignment.course}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-orange-600">Due {assignment.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Overview */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-20 h-20">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-primary-600"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress.overall / 100)}`}
                      />
                    </svg>
                    <span className="absolute text-lg font-bold text-gray-900">{progress.overall}%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Overall Progress</p>
                </div>
                
                <div className="space-y-2">
                  {Object.entries(progress).filter(([key]) => key !== 'overall').map(([subject, percentage]) => (
                    <div key={subject} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 capitalize">{subject}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <span>View Schedule</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Users className="h-5 w-5 text-primary-600" />
                  <span>Study Groups</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <TrendingUp className="h-5 w-5 text-primary-600" />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student; 