import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });


        if (error) {
            setErrorMsg('Credenciales inválidas');
        } else {
            navigate('/dashboard');
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <form
                onSubmit={handleLogin}
                className="bg-gray-800 border border-gray-700 p-6 rounded-md w-full max-w-sm shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-4 text-green-400 text-center">Login Admin</h2>
                {errorMsg && <p className="text-red-500 mb-2 text-sm">{errorMsg}</p>}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold"
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
};


export default AdminLogin;