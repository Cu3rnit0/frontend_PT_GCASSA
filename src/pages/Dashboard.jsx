import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const [totalHaciendas, setTotalHaciendas] = useState(0);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/api/dashboard/count')
      .then((res) => res.json())
      .then((data) => setTotalHaciendas(data.total))
      .catch((err) => console.error('Error al obtener el total:', err));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigateToHaciendas = () => {
    navigate('/haciendas');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar de navegación */}
      <aside className="w-64 bg-green-800 text-white flex flex-col shadow-xl">
        <div className="p-6 text-2xl font-bold border-b border-green-700 text-center tracking-wide">
          CASSA Admin
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button className="w-full text-left py-3 px-4 bg-green-700 rounded transition font-medium">
            Dashboard
          </button>
          <button 
            onClick={handleNavigateToHaciendas}
            className="w-full text-left py-3 px-4 hover:bg-green-700 rounded transition font-medium opacity-80 hover:opacity-100"
          >
             Gestión de Haciendas
          </button>
        </nav>
        <div className="p-4 border-t border-green-700">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel Principal</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 max-w-sm transform hover:scale-105 transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Total de Haciendas
              </h3>
              <p className="text-5xl font-bold text-gray-800 mt-2">{totalHaciendas}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-3xl"></span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}