import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  GraduationCap, 
  Clock, 
  Calendar,
  LogOut,
  Eye,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Award,
  BookOpen
} from 'lucide-react';

const Parent = () => {
  const [children, setChildren] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching parent data
    setTimeout(() => {
      setChildren([
        { 
          id: 1, 
          name: 'John Doe', 
          grade: '10th Grade', 
          courses: 4, 
          averageGrade: 85, 
          attendance: 92,
          recentAssignments: [
            { title: 'Algebra Quiz', course: 'Mathematics', dueDate: '2024-01-15', status: 'completed' },
            { title: 'Essay on Shakespeare', course: 'English', dueDate: '2024-01-20', status: 'pending' }
          ]
        },
        { 
          id: 2, 
          name: 'Sarah Doe', 
          grade: '8th Grade', 
          courses: 5, 
          averageGrade: 88, 
          attendance: 95,
          recentAssignments: [
            { title: 'Science Project', course: 'Science', dueDate: '2024-01-18', status: 'completed' },
            { title: 'History Report', course: 'History', dueDate: '2024-01-22', status: 'pending' }
          ]
        }
      ]);
      
      setNotifications([
        { id: 1, type: 'assignment', message: 'John has a new assignment due tomorrow', time: '2 hours ago', read: false },
        { id: 2, type: 'grade', message: 'Sarah received an A on her Science project', time: '1 day ago', read: true },
        { id: 3, type: 'attendance', message: 'John was absent from Mathematics class', time: '2 days ago', read: true }
      ]);
      
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
              <Users className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Mrs. Doe!</h2>
          <p className="text-gray-600">Here's how your children are performing in school.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-500 text-white">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Children</p>
                <p className="text-2xl font-bold text-gray-900">{children.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-500 text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{children.reduce((sum, child) => sum + child.courses, 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-500 text-white">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Notifications</p>
                <p className="text-2xl font-bold text-gray-900">{notifications.filter(n => !n.read).length}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-500 text-white">
                <Award className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Grade</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(children.reduce((sum, child) => sum + child.averageGrade, 0) / children.length)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Children Overview */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">My Children</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {children.map((child) => (
                    <div key={child.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900">{child.name}</h4>
                          <p className="text-gray-600">{child.grade}</p>
                        </div>
                        <button className="btn-primary flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Courses</p>
                          <p className="text-2xl font-bold text-gray-900">{child.courses}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Average Grade</p>
                          <p className="text-2xl font-bold text-gray-900">{child.averageGrade}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Attendance</p>
                          <p className="text-2xl font-bold text-gray-900">{child.attendance}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Status</p>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-green-600">Good</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Recent Assignments</h5>
                        <div className="space-y-2">
                          {child.recentAssignments.map((assignment, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">{assignment.title}</p>
                                <p className="text-sm text-gray-600">{assignment.course}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Due: {assignment.dueDate}</span>
                                {assignment.status === 'completed' ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-orange-600" />
                                )}
                              </div>
                            </div>
                          ))}
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
            {/* Notifications */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg border ${
                    notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      {notification.type === 'assignment' && <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />}
                      {notification.type === 'grade' && <Award className="h-4 w-4 text-green-600 mt-0.5" />}
                      {notification.type === 'attendance' && <Clock className="h-4 w-4 text-red-600 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <MessageSquare className="h-5 w-5 text-primary-600" />
                  <span>Contact Teachers</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <span>View Schedule</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <TrendingUp className="h-5 w-5 text-primary-600" />
                  <span>Progress Reports</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <GraduationCap className="h-5 w-5 text-primary-600" />
                  <span>Academic Calendar</span>
                </button>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
              <div className="space-y-4">
                {children.map((child) => (
                  <div key={child.id} className="text-center">
                    <h4 className="font-medium text-gray-900 mb-2">{child.name}</h4>
                    <div className="relative inline-flex items-center justify-center w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="transparent"
                          className="text-gray-200"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="transparent"
                          className="text-primary-600"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - child.averageGrade / 100)}`}
                        />
                      </svg>
                      <span className="absolute text-sm font-bold text-gray-900">{child.averageGrade}%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Average Grade</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parent; 