import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Calendar,
  LogOut,
  Plus,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  FileText,
  Award
} from 'lucide-react';

const Teacher = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching teacher data
    setTimeout(() => {
      setCourses([
        { id: 1, title: 'Mathematics 101', students: 24, progress: 75, assignments: 8 },
        { id: 2, title: 'Advanced Calculus', students: 18, progress: 60, assignments: 6 },
        { id: 3, title: 'Statistics', students: 32, progress: 40, assignments: 4 }
      ]);
      
      setStudents([
        { id: 1, name: 'John Doe', course: 'Mathematics 101', grade: 85, attendance: 90 },
        { id: 2, name: 'Jane Smith', course: 'Mathematics 101', grade: 92, attendance: 95 },
        { id: 3, name: 'Mike Johnson', course: 'Advanced Calculus', grade: 78, attendance: 85 },
        { id: 4, name: 'Sarah Wilson', course: 'Statistics', grade: 88, attendance: 92 }
      ]);
      
      setAssignments([
        { id: 1, title: 'Algebra Quiz', course: 'Mathematics 101', dueDate: '2024-01-15', submissions: 18, total: 24 },
        { id: 2, title: 'Calculus Assignment', course: 'Advanced Calculus', dueDate: '2024-01-18', submissions: 12, total: 18 },
        { id: 3, title: 'Statistics Project', course: 'Statistics', dueDate: '2024-01-20', submissions: 25, total: 32 }
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
              <BookOpen className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Dr. Smith!</h2>
          <p className="text-gray-600">Here's an overview of your teaching activities today.</p>
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
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-500 text-white">
                <FileText className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{assignments.filter(a => a.submissions < a.total).length}</p>
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
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">My Courses</h3>
                  <button className="btn-primary flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Course
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{course.title}</h4>
                          <p className="text-sm text-gray-600">{course.students} students enrolled</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="btn-secondary flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            View Students
                          </button>
                          <button className="btn-primary flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Assignment
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Progress</p>
                          <p className="font-semibold text-gray-900">{course.progress}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Assignments</p>
                          <p className="font-semibold text-gray-900">{course.assignments}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Avg. Grade</p>
                          <p className="font-semibold text-gray-900">85%</p>
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
            {/* Recent Assignments */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Assignments</h3>
              <div className="space-y-3">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                        {assignment.course}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Due: {assignment.dueDate}</span>
                      <span className="text-gray-600">
                        {assignment.submissions}/{assignment.total} submitted
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Students */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Students</h3>
              <div className="space-y-3">
                {students.slice(0, 5).map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-700">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{student.grade}%</p>
                      <p className="text-xs text-gray-600">{student.attendance}% attendance</p>
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
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <span>Schedule Class</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <MessageSquare className="h-5 w-5 text-primary-600" />
                  <span>Send Announcement</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <TrendingUp className="h-5 w-5 text-primary-600" />
                  <span>View Analytics</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText className="h-5 w-5 text-primary-600" />
                  <span>Grade Assignments</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher; 