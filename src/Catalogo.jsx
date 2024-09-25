import { useState, useEffect } from "react";

import { supabase } from "./supabaseClient";

const Catalogo = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getGames() {
    try {
      const { data, error } = await supabase.from("videogames").select("*");
      if (error) {
        setError("Hubo un problema al cargar los juegos. Intenta nuevamente.");
      }
      setGames(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getGames();
  }, []);

  const handleGameplayButtonClick = (videoId, event) => {
    const container = event.target.parentElement.querySelector(
      ".gameplay-container"
    );
    const iframe = container.querySelector("iframe");
    const hideButton = event.target.nextElementSibling;

    container.style.display = "block";
    event.target.style.display = "none";
    hideButton.style.display = "inline-block";
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&modestbranding=1`;
  };

  const handleHideButtonClick = (event) => {
    const container = event.target.parentElement.querySelector(
      ".gameplay-container"
    );
    const showButton = event.target.previousElementSibling;
    const iframe = container.querySelector("iframe");

    container.style.display = "none";
    event.target.style.display = "none";
    showButton.style.display = "inline-block";
    iframe.src = "";
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="catalog">
    
      {games.map((game) => (
        <div className="card" key={game.id_videogame}>
          <img
            src={game.url_image || "default-image-url.jpg"}
            alt={`Carátula de ${game.name}`}
            className="game-cover"
          />
          <div className="card-content">
            <h3 className="game-title">{game.name}</h3>
            <p className="language">Idioma: {game.language}</p>

            <div
              className={`status ${game.avaible ? "avaible" : "out-of-stock"}`}
            >
              {game.avaible ? "Disponible" : "Agotado"}
            </div>
            <button
              className="btn-gameplay"
              data-video={game.video_id}
              onClick={(e) => {
                if (game.video_id) {
                  handleGameplayButtonClick(game.video_id, e);
                } else {
                  console.warn(`No hay video para ${game.name}`);
                }
              }}
            >
              Ver Gameplay
            </button>
            <button
              className="btn-hide-gameplay"
              style={{ display: "none" }}
              onClick={handleHideButtonClick}
            >
              Ocultar Gameplay
            </button>
            <div className="gameplay-container" style={{ display: "none" }}>
              <iframe
                className="gameplay-video"
                src=""
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      ))}
      
      
    </section>
    
    
    
  );
  
};

export default Catalogo;
