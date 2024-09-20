// src/ItemForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const ItemForm = ({ agregarItem, editarItem, editItem }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    idioma: '',
    precio: '',
    estado: '',
    videoId: '',
    cover: '' // Campo para la URL de la imagen
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    } else {
      setFormData({
        titulo: '',
        idioma: '',
        precio: '',
        estado: '',
        videoId: '',
        cover: '' // Inicializar el campo de URL de la imagen
      });
    }
  }, [editItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      editarItem({ ...formData, id: editItem.id }); // Asegúrate de incluir el ID al editar
    } else {
      agregarItem(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="titulo"
        placeholder="Título del videojuego"
        value={formData.titulo}
        onChange={handleChange}
      />
      <input
        type="text"
        name="idioma"
        placeholder="Idioma"
        value={formData.idioma}
        onChange={handleChange}
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={formData.precio}
        onChange={handleChange}
      />
      <input
        type="text"
        name="estado"
        placeholder="Estado (Disponible, Agotado, etc.)"
        value={formData.estado}
        onChange={handleChange}
      />
      <input
        type="text"
        name="videoId"
        placeholder="ID del video (YouTube)"
        value={formData.videoId}
        onChange={handleChange}
      />
      <input
        type="text"
        name="cover"
        placeholder="URL de la carátula"
        value={formData.cover}
        onChange={handleChange}
      />
      {formData.cover && <img src={formData.cover} alt="Carátula del juego" style={{ width: '100px', height: '150px' }} />}
      <button type="submit">{editItem ? 'Guardar Cambios' : 'Agregar'}</button>
    </form>
  );
};

ItemForm.propTypes = {
  agregarItem: PropTypes.func.isRequired,
  editarItem: PropTypes.func.isRequired,
  editItem: PropTypes.object
};

export default ItemForm;
