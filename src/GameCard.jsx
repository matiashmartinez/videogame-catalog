import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './app.css'; // Asegúrate de que los estilos estén incluidos

const GameCard = ({ game }) => {
  const [showGameplay, setShowGameplay] = useState(false);

  const toggleGameplay = () => {
    setShowGameplay(!showGameplay);
  };

  return (
    <div className="card">
      <img src={game.cover} alt={`Carátula ${game.title}`} className="game-cover" />
      <div className="card-content">
        <h3>{game.title}</h3>
        <p>Plataforma: {game.platform}</p>
        <p>Idioma: {game.language}</p>
        <p>Precio: ${game.price}</p>
        <p className={`status ${game.status.toLowerCase()}`}>{game.status}</p>
        <button 
          className="btn-gameplay"
          onClick={toggleGameplay}
          data-video={game.videoId}
          style={{ display: showGameplay ? 'none' : 'inline-block' }}
        >
          Ver Gameplay
        </button>
        <button 
          className="btn-hide-gameplay"
          onClick={toggleGameplay}
          style={{ display: showGameplay ? 'inline-block' : 'none' }}
        >
          Ocultar Gameplay
        </button>
        {showGameplay && (
          <div className="gameplay-container">
            <iframe
              title={game.title}
              className="gameplay-video"
              src={`https://www.youtube.com/embed/${game.videoId}?autoplay=1`}
              frameBorder="0"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    videoId: PropTypes.string
  }).isRequired
};

export default GameCard;
