import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  Type, Gamepad2, Languages, Image as ImageIcon, Video, 
  DollarSign, CheckCircle, Eraser, Save, ArrowLeft 
} from 'lucide-react';

const AddGame = () => {
    const navigate = useNavigate();

    const initialState = {
        name: '',
        language: 'Español', // Valor por defecto lógico
        platform: '',
        url_image: '',
        video_id: '',
        avaible: true,
        price: '',
    };

    const [game, setGame] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setGame((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Limpiamos el error si el usuario empieza a escribir
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleClear = () => {
        setGame(initialState);
        setErrors({});
        toast('Formulario reiniciado', { icon: '🧹' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!game.name.trim()) newErrors.name = "El nombre es obligatorio";
        if (!game.platform) newErrors.platform = "Selecciona una plataforma";
        if (!game.price || game.price <= 0) newErrors.price = "Ingresa un precio válido";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Por favor, completa los campos obligatorios");
            return;
        }

        // ==========================================
        // 🛡️ MODO DEMO (Protección de Portfolio)
        // ==========================================
        const isDemoUser = true; // <-- Cambia a 'false' para insertar de verdad
        if (isDemoUser) {
            toast.success('Modo Demo: Juego "agregado" exitosamente.');
            navigate('/admin'); // Volvemos al dashboard
            return; 
        }

        // ==========================================
        // 💾 INSERCIÓN REAL EN SUPABASE
        // ==========================================
        const { error: insertError } = await supabase
            .from('videogames')
            .insert([{
                name: game.name,
                language: game.language,
                platform: game.platform,
                url_image: game.url_image,
                video_id: game.video_id,
                avaible: game.avaible,
                price: game.price === '' ? null : parseFloat(game.price)
            }]);

        if (insertError) {
            toast.error('Hubo un error al guardar el juego.');
            console.error(insertError);
        } else {
            toast.success('¡Juego guardado exitosamente!');
            navigate('/admin'); // Redirigir al dashboard tras el éxito
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-6 text-gray-100">
            <button 
                onClick={() => navigate('/')}
                className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Panel
            </button>

            <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
                    <h2 className="text-2xl font-bold">Agregar Nuevo Juego</h2>
                    <p className="text-blue-100 text-sm opacity-80">Completa los datos para el catálogo</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Nombre */}
                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-gray-300">
                            <Type className="w-4 h-4 mr-2 text-blue-400" /> Nombre del Juego *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={game.name}
                            onChange={handleChange}
                            className={`w-full p-3 bg-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Plataforma */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-300">
                                <Gamepad2 className="w-4 h-4 mr-2 text-blue-400" /> Plataforma *
                            </label>
                            <select
                                name="platform"
                                value={game.platform}
                                onChange={handleChange}
                                className={`w-full p-3 bg-gray-900 border ${errors.platform ? 'border-red-500' : 'border-gray-700'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer`}
                            >
                                <option value="">Seleccionar...</option>
                                <option value="PS4">PlayStation 4</option>
                                <option value="PS5">PlayStation 5</option>
                            </select>
                            {errors.platform && <p className="text-red-500 text-xs mt-1">{errors.platform}</p>}
                        </div>

                        {/* Idioma */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-300">
                                <Languages className="w-4 h-4 mr-2 text-blue-400" /> Idioma Principal
                            </label>
                            <select
                                name="language"
                                value={game.language}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                            >
                                <option value="Español">Español</option>
                                <option value="Inglés">Inglés</option>
                                <option value="Otro">Otro / Multi</option>
                            </select>
                        </div>
                    </div>

                    {/* Imagen URL con Preview */}
                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-gray-300">
                            <ImageIcon className="w-4 h-4 mr-2 text-blue-400" /> URL de Portada
                        </label>
                        <div className="flex gap-4 items-center bg-gray-900 p-3 rounded-xl border border-gray-700">
                            <div className="w-12 h-12 rounded-lg bg-gray-800 border border-gray-700 overflow-hidden shrink-0">
                                {game.url_image ? <img src={game.url_image} alt="prev" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-600">N/A</div>}
                            </div>
                            <input
                                type="text"
                                name="url_image"
                                value={game.url_image}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full bg-transparent outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Video ID */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-300">
                                <Video className="w-4 h-4 mr-2 text-blue-400" /> ID Video YouTube
                            </label>
                            <input
                                type="text"
                                name="video_id"
                                value={game.video_id}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* Precio */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-300">
                                <DollarSign className="w-4 h-4 mr-2 text-blue-400" /> Precio (ARS) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={game.price}
                                onChange={handleChange}
                                className={`w-full p-3 bg-gray-900 border ${errors.price ? 'border-red-500' : 'border-gray-700'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none`}
                            />
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                        </div>
                    </div>

                    {/* Disponibilidad */}
                    <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700 flex items-center justify-between">
                        <div className="flex items-center">
                            <CheckCircle className={`w-5 h-5 mr-3 ${game.avaible ? 'text-blue-400' : 'text-gray-600'}`} />
                            <div>
                                <p className="text-sm font-medium">Estado de Disponibilidad</p>
                                <p className="text-xs text-gray-500">{game.avaible ? 'Se publicará inmediatamente' : 'Se guardará como borrador oculto'}</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            name="avaible"
                            checked={game.avaible}
                            onChange={handleChange}
                            className="w-6 h-6 rounded border-gray-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                    </div>

                    {/* Botonera */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={handleClear}
                            className="flex-1 flex items-center justify-center py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold transition-all"
                        >
                            <Eraser className="w-4 h-4 mr-2" /> Limpiar
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] flex items-center justify-center py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all transform active:scale-95"
                        >
                            <Save className="w-4 h-4 mr-2" /> Guardar Nuevo Juego
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddGame;