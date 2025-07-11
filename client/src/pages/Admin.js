import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Shield, 
  LogOut, 
  Plus,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Settings
} from 'lucide-react';

const Admin = () => {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({});
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('register');

  useEffect(() => {
    if (userType === 'parent') {
      axios.get('api/student', { withCredentials: true })
        .then(res => setStudents(res.data))
        .catch(err => console.error(err));
    }
  }, [userType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'years' ? value.split(',').map(n => parseInt(n)) : value
    }));
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const selectedIds = options.map(o => o.value);
    setFormData(prev => ({ ...prev, children: selectedIds }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      await axios.post(`api/auth/register-${userType}`, formData, {
        withCredentials: true,
      });
      setMessage(`${userType} registered successfully`);
      setFormData({});
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { label: 'Total Students', value: '1,234', icon: GraduationCap, color: 'bg-blue-500' },
    { label: 'Total Teachers', value: '89', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Total Parents', value: '2,156', icon: Users, color: 'bg-purple-500' },
    { label: 'Active Courses', value: '45', icon: Shield, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">User Registration</h2>
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-primary-600" />
                    <span className="text-sm text-gray-600">Add new user</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {/* User Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Register as
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'student', label: 'Student', icon: GraduationCap },
                      { value: 'teacher', label: 'Teacher', icon: BookOpen },
                      { value: 'parent', label: 'Parent', icon: Users }
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setUserType(type.value)}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                          userType === type.value
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Enter username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Enter full name"
                    />
                  </div>

                  {userType === 'student' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year
                      </label>
                      <input
                        type="number"
                        name="year"
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Enter year"
                        min="1"
                        max="12"
                      />
                    </div>
                  )}

                  {userType === 'teacher' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="years"
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="e.g., 2020, 2021, 2022"
                      />
                    </div>
                  )}

                  {userType === 'parent' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Children (Students)
                      </label>
                      <select
                        multiple
                        name="children"
                        onChange={handleMultiSelect}
                        className="input-field"
                        size="4"
                      >
                        {students.map((student) => (
                          <option key={student._id} value={student._id}>
                            {student.name} (Year {student.year})
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Hold Ctrl/Cmd to select multiple students
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Registering...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Register {userType}
                      </>
                    )}
                  </button>
                </form>

                {message && (
                  <div className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
                    message.includes('successfully') 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    {message.includes('successfully') ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <p className={`text-sm ${
                      message.includes('successfully') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Users className="h-5 w-5 text-primary-600" />
                  <span>View All Users</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <BookOpen className="h-5 w-5 text-primary-600" />
                  <span>Manage Courses</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="h-5 w-5 text-primary-600" />
                  <span>System Settings</span>
                </button>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">New student registered</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Course updated</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">Teacher assigned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
