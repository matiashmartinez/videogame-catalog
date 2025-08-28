import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-green-400 font-bold text-xl flex items-center gap-2">
          🎮 GameCatalog
        </Link>

        <div className="flex items-center gap-4 text-white">
          <Link to="/" className={`${location.pathname === '/' ? 'font-bold' : ''}`}>
            Catálogo
          </Link>

          {session ? (
            <>
              <Link to="/dashboard" className={`${location.pathname === '/dashboard' ? 'font-bold' : ''}`}>
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-medium"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/admin" className={`${location.pathname === '/admin' ? 'font-bold' : ''}`}>
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
