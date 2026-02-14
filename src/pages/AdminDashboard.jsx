import { useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    language: '',
    platform: '',
    url_image: '',
    video_id: '',
    avaible: true,
    price: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // validación rápida
    if (!formData.name || !formData.language || !formData.platform) {
      setError('Por favor completá todos los campos obligatorios.');
      return;
    }

    const { error: insertError } = await supabase
      .from('videogames')
      .insert([{
        name: formData.name,
        language: formData.language,
        platform: formData.platform,
        url_image: formData.url_image,
        video_id: formData.video_id,
        avaible: formData.avaible,
        price: formData.price === '' ? null : parseFloat(formData.price)
      }]);

    if (insertError) {
      console.error(insertError);
      setError('Hubo un error al guardar el juego.');
    } else {
      setMessage('Juego guardado exitosamente.');
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
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-2xl mx-auto bg-gray-800 border border-gray-700 p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-400 text-center">Agregar nuevo videojuego</h2>

        {message && <p className="text-green-400 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del juego *"
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            required
          />

          <input
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="Idioma *"
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            required
          />

          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            required
          >
            <option value="">Seleccionar plataforma *</option>
            <option value="PS4">PS4</option>
            <option value="PS5">PS5</option>
          </select>

          <input
            name="url_image"
            value={formData.url_image}
            onChange={handleChange}
            placeholder="URL de la imagen"
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
          />

          <input
            name="video_id"
            value={formData.video_id}
            onChange={handleChange}
            placeholder="ID del video de YouTube"
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Precio"
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            min="0"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="avaible"
              checked={formData.avaible}
              onChange={handleChange}
              className="accent-green-500"
            />
            Disponible
          </label>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold"
          >
            Guardar juego
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
