import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Users, Shield } from 'lucide-react';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await axios.post('api/auth/login', form, {
        withCredentials: true,
      });
      
      // Redirect based on role
      switch (form.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'student':
          navigate('/student');
          break;
        case 'parent':
          navigate('/parent');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const roleIcons = {
    student: <GraduationCap className="w-5 h-5" />,
    teacher: <BookOpen className="w-5 h-5" />,
    parent: <Users className="w-5 h-5" />,
    admin: <Shield className="w-5 h-5" />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your education platform</p>
        </div>

        {/* Login Form */}
        <div className="card p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter your password"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries({
                  student: 'Student',
                  teacher: 'Teacher',
                  parent: 'Parent',
                  admin: 'Admin'
                }).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm({ ...form, role: value })}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                      form.role === value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    {roleIcons[value]}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <span className="text-primary-600 hover:text-primary-700 cursor-pointer font-medium">
                Contact your administrator
              </span>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-2">
              <BookOpen className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Interactive Learning</h3>
            <p className="text-xs text-gray-500">Engage with dynamic content</p>
          </div>
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Collaborative</h3>
            <p className="text-xs text-gray-500">Work together seamlessly</p>
          </div>
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-2">
              <Shield className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Secure</h3>
            <p className="text-xs text-gray-500">Your data is protected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
