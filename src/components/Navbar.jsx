import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, setIsAdmin } = useAdmin();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });

    return () => listener?.subscription.unsubscribe();
  }, [setIsAdmin]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    setIsAdmin(false);
    toast.success('Sesión cerrada');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-green-400 font-bold text-xl flex items-center gap-2">
          🎮 GameCatalog
        </Link>

        <div className="flex items-center gap-4 text-white text-sm">
          <Link
            to="/"
            className={`${location.pathname === '/' ? 'font-bold text-green-400' : 'hover:text-green-300'}`}
          >
            Catálogo
          </Link>

          {isAdmin ? (
            <>
              <Link
                to="/dashboard"
                className={`${location.pathname === '/dashboard' ? 'font-bold text-green-400' : 'hover:text-green-300'}`}
              >
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-medium"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              to="/admin"
              className={`${location.pathname === '/admin' ? 'font-bold text-green-400' : 'hover:text-green-300'}`}
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
