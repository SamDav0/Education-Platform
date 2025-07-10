import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('api/auth/login', form, {
        withCredentials: true,
      });
      alert('Login successful');
      // Redirect based on role
      switch (form.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'teacher':
          navigate('/create-course');
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
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        >
          <option value="student">Student</option>
          <option value="parent">Parent</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
