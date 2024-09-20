// src/Catalogo.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

const Catalogo = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Cargar datos de localStorage al montar el componente
    const storedGames = JSON.parse(localStorage.getItem('games')) || [
      { id: 1, title: 'God of War', language: 'Español', videoId: '8yAHt0v7laI', cover: './assets/god-of-war.png' },
      { id: 2, title: 'Spider-Man', language: 'Español Latino', videoId: 'dNYaEmIr_gs', cover: './assets/spiderman-1.png' },
      { id: 3, title: 'The Last of Us', language: 'Español', videoId: '3jR3JdXHz1I', cover: './assets/the-last-of-us.png' },
      { id: 4, title: 'Red Dead Redemption 2', language: 'Inglés', videoId: '8pE0o2t5_OQ', cover: './assets/red-dead-redemption-2.png' },
      { id: 5, title: 'Horizon Zero Dawn', language: 'Español', videoId: 'ph7pJ9dYyz4', cover: './assets/horizon-zero-dawn.png' },
      { id: 6, title: 'Uncharted 4', language: 'Español', videoId: 'x1s5PfjINa0', cover: './assets/uncharted-4.png' },
      { id: 7, title: 'Bloodborne', language: 'Inglés', videoId: 'EAevwR6mCKQ', cover: './assets/bloodborne.png' },
      { id: 8, title: 'Death Stranding', language: 'Español', videoId: '1h6XKm9xwYY', cover: './assets/death-stranding.png' }
    ];
    setGames(storedGames);
  }, []);

  const handleGameplayButtonClick = (videoId, event) => {
    const container = event.target.parentElement.querySelector('.gameplay-container');
    const iframe = container.querySelector('iframe');
    const hideButton = event.target.nextElementSibling;

    container.style.display = 'block';
    event.target.style.display = 'none';
    hideButton.style.display = 'inline-block';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  const handleHideButtonClick = (event) => {
    const container = event.target.parentElement.querySelector('.gameplay-container');
    const showButton = event.target.previousElementSibling;
    const iframe = container.querySelector('iframe');

    container.style.display = 'none';
    event.target.style.display = 'none';
    showButton.style.display = 'inline-block';
    iframe.src = '';
  };

  return (
    <section className="catalog">
      {games.map(game => (
        <div className="card" key={game.id}>
          <img src={game.cover} alt={`carátula ${game.title}`} className="game-cover" />
          <div className="card-content">
            <h3 className="game-title">{game.title}</h3>
            <p className="language">Idioma: {game.language}</p>
            <div className="status available">Disponible</div>
            <button 
              className="btn-gameplay"
              data-video={game.videoId}
              onClick={(e) => handleGameplayButtonClick(game.videoId, e)}
            >
              Ver Gameplay
            </button>
            <button 
              className="btn-hide-gameplay"
              style={{ display: 'none' }}
              onClick={handleHideButtonClick}
            >
              Ocultar Gameplay
            </button>
            <div className="gameplay-container" style={{ display: 'none' }}>
              <iframe className="gameplay-video" src="" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Catalogo;
