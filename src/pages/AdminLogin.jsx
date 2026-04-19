import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isChecking, setIsChecking] = useState(true); 
  
  const navigate = useNavigate();
  const { setIsAdmin } = useAdmin();

  useEffect(() => {
    const checkExistingSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsAdmin(true);
        navigate('/dashboard', { replace: true });
      } else {
        setIsChecking(false);
      }
    };

    checkExistingSession();
  }, [navigate, setIsAdmin]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Aquí eliminamos 'data' porque ESLint decía que no se usaba
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg('Credenciales inválidas');
      toast.error('Credenciales inválidas');
    } else {
      setIsAdmin(true);
      toast.success('Bienvenido Admin');
      navigate('/dashboard');
    }
  };

  // Usamos isChecking para evitar el parpadeo
  if (isChecking) {
    return <div className="min-h-screen bg-gray-900" />; 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 border border-gray-700 p-6 rounded-md w-full max-w-sm shadow-lg animate-in fade-in duration-300"
      >
        <div className="max-w-fit mx-auto my-6 p-4 bg-gray-900 border-l-4 border-green-500 rounded-r-lg shadow-lg font-mono text-sm text-gray-300">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center items-center">
            <span>
              Usuario: <span className="text-green-400 font-bold select-all">admin@catalogvideogame.com</span>
            </span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span>
              Pass: <span className="text-green-400 font-bold select-all">admin</span>
            </span>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-green-400 text-center">Login Admin</h2>

        {errorMsg && <p className="text-red-500 mb-2 text-sm">{errorMsg}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 outline-none focus:ring-1 focus:ring-green-500"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 outline-none focus:ring-1 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold transition-colors"
        >
          Ingresar
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full mt-4 bg-transparent hover:bg-gray-700 text-gray-400 hover:text-white py-2 rounded border border-gray-600 transition-colors"
        >
          Volver al catálogo
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;