import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* You can add role-specific routes later */}
        <Route
        path="/admin"
        element={
        <ProtectedRoute allowedRoles={['admin']}>
        <h2>Welcome Admin</h2>
        </ProtectedRoute>
    }
  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
