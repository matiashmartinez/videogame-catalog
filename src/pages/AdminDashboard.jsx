import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Package, CheckCircle, Store, PlusCircle, LayoutGrid } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        ps4: 0,
        ps5: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            // Traemos solo las columnas necesarias para hacer los cálculos, es más rápido
            const { data, error } = await supabase
                .from('videogames')
                .select('platform, avaible');

            if (error) {
                toast.error('Error al cargar las estadísticas');
                console.error(error);
            } else if (data) {
                setStats({
                    total: data.length,
                    active: data.filter(g => g.avaible).length,
                    ps4: data.filter(g => g.platform === 'PS4').length,
                    ps5: data.filter(g => g.platform === 'PS5').length,
                });
            }
            setLoading(false);
        };

        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Cabecera */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="p-3 bg-green-500/20 rounded-lg">
                            <Store className="w-8 h-8 text-green-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-100">Panel de Administración</h1>
                            <p className="text-gray-400">Resumen de tu inventario actual</p>
                        </div>
                    </div>
                    
                    {/* Botonera Principal */}
                    <div className="flex gap-3 w-full md:w-auto">
                        <button 
                            onClick={() => navigate('/')}
                            className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
                        >
                            <LayoutGrid className="w-4 h-4 mr-2" /> Catálogo
                        </button>
                        <button 
                            onClick={() => navigate('/admin/add')}
                            className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-500 shadow-lg shadow-green-900/20 rounded-lg font-bold transition-all"
                        >
                            <PlusCircle className="w-4 h-4 mr-2" /> Nuevo Juego
                        </button>
                    </div>
                </div>

                {/* Tarjetas de Estadísticas (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col justify-center items-center shadow-lg hover:border-green-500/50 transition-colors">
                        <Package className="w-8 h-8 text-blue-400 mb-3" />
                        <h3 className="text-3xl font-bold text-white">{stats.total}</h3>
                        <p className="text-sm text-gray-400">Juegos Totales</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col justify-center items-center shadow-lg hover:border-green-500/50 transition-colors">
                        <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
                        <h3 className="text-3xl font-bold text-white">{stats.active}</h3>
                        <p className="text-sm text-gray-400">Disponibles a la venta</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col justify-center items-center shadow-lg hover:border-green-500/50 transition-colors">
                        <Gamepad2 className="w-8 h-8 text-indigo-400 mb-3" />
                        <div className="flex gap-4">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white">{stats.ps4}</h3>
                                <p className="text-xs text-gray-400">PS4</p>
                            </div>
                            <div className="w-px bg-gray-600"></div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white">{stats.ps5}</h3>
                                <p className="text-xs text-gray-400">PS5</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;