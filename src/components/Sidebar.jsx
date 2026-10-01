import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/haciendas', label: 'Haciendas' },
];

export default function Sidebar() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-green-800 text-white shadow-xl">
      <div className="border-b border-green-700 p-6 text-center text-2xl font-bold tracking-wide">
        CASSA Admin
      </div>

      <nav className="mt-4 flex-1 space-y-2 p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded px-4 py-3 font-medium transition ${
                isActive ? 'bg-green-700' : 'opacity-80 hover:bg-green-700 hover:opacity-100'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-green-700 p-4">
        <button
          onClick={handleLogout}
          className="w-full rounded bg-red-600 px-4 py-2 font-bold text-white transition hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
