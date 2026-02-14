import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.language || !formData.platform) {
      toast.error('Por favor completá los campos obligatorios.');
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
        name: '',
        language: '',
        platform: '',
        url_image: '',
        video_id: '',
        avaible: true,
        price: '',
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Botón Volver */}
        <button 
          onClick={() => navigate('/')}
          className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          &larr; Volver al sitio
        </button>

        <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-2xl">
          <header className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-green-400">Panel de Control</h2>
            <p className="text-gray-400 mt-2">Gestionar catálogo de videojuegos</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Nombre del videojuego *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Elden Ring"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                  required
                />
              </div>

              {/* Idioma */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Idioma *</label>
                <input
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="Español / Inglés"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-green-500 outline-none"
                  required
                />
              </div>

              {/* Plataforma */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Plataforma *</label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-green-500 outline-none cursor-pointer"
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="PS4">PlayStation 4</option>
                  <option value="PS5">PlayStation 5</option>
                </select>
              </div>

              {/* URL Imagen */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">URL Portada</label>
                <input
                  name="url_image"
                  value={formData.url_image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-green-500 outline-none"
                />
              </div>

              {/* YouTube ID */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">YouTube Video ID</label>
                <input
                  name="video_id"
                  value={formData.video_id}
                  onChange={handleChange}
                  placeholder="Ej: dQw4w9WgXcQ"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-green-500 outline-none"
                />
              </div>

              {/* Precio */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Precio (Opcional)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-green-500 outline-none"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Disponibilidad */}
              <div className="flex items-end pb-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="avaible"
                      checked={formData.avaible}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors ${formData.avaible ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.avaible ? 'translate-x-6' : ''}`}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Producto Disponible
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg font-bold text-lg shadow-lg transition-all ${
                loading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600 hover:shadow-green-500/20'
              }`}
            >
              {loading ? 'Guardando...' : 'Publicar Videojuego'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;