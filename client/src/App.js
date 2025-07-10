import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Admin />
          </ProtectedRoute>
        }
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
