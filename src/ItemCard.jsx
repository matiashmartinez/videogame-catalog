// src/ItemCard.jsx

import PropTypes from 'prop-types';

const ItemCard = ({ item, setEditItem, eliminarItem }) => {
  return (
    <div className="item-card">
    <h3>{item.titulo}</h3>
    <p>Idioma: {item.idioma}</p>
    <p>Precio: ${item.precio}</p>
    <p>Estado: {item.estado}</p>
    <div className="button-group">
      <button onClick={() => setEditItem(item)}>Editar</button>
      <button onClick={() => eliminarItem(item.id)}>Eliminar</button>
    </div>
  </div>
  
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    idioma: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    estado: PropTypes.string.isRequired
  }).isRequired,
  setEditItem: PropTypes.func.isRequired,
  eliminarItem: PropTypes.func.isRequired
};

export default ItemCard;
