import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const DashboardTemp = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-3xl font-bold text-green-700">¡Bienvenido al Dashboard!</h1>
    <p>Has iniciado sesión correctamente.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />
        
        
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardTemp/>
            </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;