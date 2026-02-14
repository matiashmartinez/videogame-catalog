import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext'; // Importar el contexto para manejar el estado
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { setIsAdmin } = useAdmin(); // Usamos el contexto para limpiar el estado al salir
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    language: '',
    platform: '',
    url_image: '',
    video_id: '',
    avaible: true,
    price: '',
  });

  // Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Función para CERRAR SESIÓN
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error al cerrar sesión');
    } else {
      setIsAdmin(false); // Actualizamos el contexto
      toast.success('Sesión cerrada correctamente');
      navigate('/'); // Redirigir al inicio
    }
  };

  // Función para GUARDAR el juego
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.language || !formData.platform) {
      toast.error('Completá los campos obligatorios (*)');
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('videogames')
      .insert([{
        ...formData,
        price: formData.price === '' ? null : parseFloat(formData.price)
      }]);

    if (insertError) {
      console.error(insertError);
      toast.error('Error al guardar el juego.');
    } else {
      toast.success('¡Juego guardado exitosamente!');
      setFormData({
        name: '', language: '', platform: '', url_image: '',
        video_id: '', avaible: true, price: '',
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* BARRA DE NAVEGACIÓN SUPERIOR */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-xl font-bold text-green-400 uppercase tracking-wider">
            Panel de Admin
          </h2>
          
          <div className="flex gap-4">
            {/* Botón Volver al Catálogo */}
            <button 
              onClick={() => navigate('/')}
              className="text-sm font-semibold text-gray-300 hover:text-white transition-colors border border-gray-600 px-4 py-2 rounded-md hover:bg-gray-700"
            >
              &larr; Ver Catálogo
            </button>

            {/* Botón CERRAR SESIÓN */}
            <button 
              onClick={handleLogout}
              className="text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-md shadow-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* FORMULARIO DE CARGA */}
        <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-2xl">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">Agregar Nuevo Videojuego</h3>
            <p className="text-gray-400 text-sm">Completa los datos para actualizar la tienda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Nombre */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre del Juego *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: God of War Ragnarok"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                  required
                />
              </div>

              {/* Idioma */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Idioma *</label>
                <input
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="Español / Inglés"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 focus:border-green-500 outline-none"
                  required
                />
              </div>

              {/* Plataforma */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Plataforma *</label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 focus:border-green-500 outline-none"
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="PS4">PlayStation 4</option>
                  <option value="PS5">PlayStation 5</option>
                  <option value="Xbox">Xbox</option>
                  <option value="PC">PC</option>
                </select>
              </div>

              {/* URL Imagen */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">URL Portada</label>
                <input
                  name="url_image"
                  value={formData.url_image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 focus:border-green-500 outline-none"
                />
              </div>

              {/* Video ID */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">YouTube Video ID</label>
                <input
                  name="video_id"
                  value={formData.video_id}
                  onChange={handleChange}
                  placeholder="Ej: dQw4w9WgXcQ"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 focus:border-green-500 outline-none"
                />
              </div>

              {/* Precio */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Precio</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-600 focus:border-green-500 outline-none"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Switch de Disponibilidad */}
              <div className="flex items-center pt-6">
                 <label className="flex items-center gap-3 cursor-pointer select-none">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="avaible"
                        checked={formData.avaible}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${formData.avaible ? 'bg-green-600' : 'bg-gray-600'}`}></div>
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${formData.avaible ? 'translate-x-6' : ''}`}></div>
                    </div>
                    <span className={`font-bold text-sm ${formData.avaible ? 'text-green-400' : 'text-gray-500'}`}>
                      {formData.avaible ? 'DISPONIBLE' : 'SIN STOCK'}
                    </span>
                 </label>
              </div>
            </div>
            
            {/* Vista Previa de Imagen (Opcional) */}
            {formData.url_image && (
              <div className="flex justify-center py-2">
                <img src={formData.url_image} alt="Vista previa" className="h-32 rounded border border-gray-600 opacity-80 hover:opacity-100 transition-opacity" onError={(e) => e.target.style.display='none'} />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-lg shadow-lg transition-all ${
                loading 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30'
              }`}
            >
              {loading ? 'Guardando...' : 'GUARDAR JUEGO'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;