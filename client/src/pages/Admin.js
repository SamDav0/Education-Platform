import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({});
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');

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
    window.location.href = '/'; // or use navigate('/') if using react-router
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

    try {
      await axios.post(`api/auth/register-${userType}`, formData, {
        withCredentials: true,
      });
      setMessage(`${userType} registered successfully`);
      setFormData({});
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={handleLogout} style={{ float: 'right', marginBottom: '1rem' }}>
          Logout
      </button>
      <h2>Admin Panel</h2>

      <select value={userType} onChange={(e) => setUserType(e.target.value)} style={{ marginBottom: '1rem' }}>
        <option value="student">Register Student</option>
        <option value="parent">Register Parent</option>
        <option value="teacher">Register Teacher</option>
      </select>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required /><br />

        {userType === 'student' && (
          <input type="number" name="year" placeholder="Year" onChange={handleChange} required />
        )}

        {userType === 'teacher' && (
          <input type="text" name="years" placeholder="Years (comma-separated)" onChange={handleChange} required />
        )}

        {userType === 'parent' && (
          <div>
            <label>Children (students):</label><br />
            <select multiple name="children" onChange={handleMultiSelect}>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} (Year {student.year})
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" style={{ marginTop: '1rem' }}>Register {userType}</button>
      </form>

      {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default Admin;
