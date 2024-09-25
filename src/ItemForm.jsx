// src/ItemForm.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const ItemForm = ({ agregarItem, editarItem, editItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    language: '',
    detail: '',
    price: '',
    url_image: '',
    video_id: '',
    avaible: '',
    platform: ''
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    } else {
      setFormData({
        name: '',
        language: '',
        detail: '',
        price: '',
        url_image: '',
        video_id: '',
        avaible: '',
        platform: ''
      });
    }
  }, [editItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      editarItem({ ...formData, id_videogame: editItem.id_videogame }); // Incluir el ID del videojuego al editar
    } else {
      agregarItem(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre del videojuego"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="language"
        placeholder="Idioma"
        value={formData.language}
        onChange={handleChange}
      />
      <textarea
        name="detail"
        placeholder="Detalles del videojuego"
        value={formData.detail}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="url_image"
        placeholder="URL de la carátula"
        value={formData.url_image}
        onChange={handleChange}
      />
      {formData.url_image && (
        <img
          src={formData.url_image}
          alt="Carátula del juego"
          style={{ width: '100px', height: '150px' }}
        />
      )}
      <input
        type="text"
        name="video_id"
        placeholder="ID del video (YouTube)"
        value={formData.video_id}
        onChange={handleChange}
      />
      <select
        name="avaible"
        value={formData.avaible}
        onChange={handleChange}
      >
        <option value="">Selecciona disponibilidad</option>
        <option value="Disponible">Disponible</option>
        <option value="Agotado">Agotado</option>
      </select>
      <input
        type="text"
        name="platform"
        placeholder="Plataforma (ej. PS4, Xbox)"
        value={formData.platform}
        onChange={handleChange}
      />
      <button type="submit">
        {editItem ? 'Guardar Cambios' : 'Agregar'}
      </button>
    </form>
  );
};

ItemForm.propTypes = {
  agregarItem: PropTypes.func.isRequired,
  editarItem: PropTypes.func.isRequired,
  editItem: PropTypes.object
};

export default ItemForm;
