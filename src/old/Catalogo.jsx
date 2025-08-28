import { useState, useEffect, useMemo } from "react";
import { supabase } from "./supabaseClient";
import { handleGameplayButtonClick, handleHideButtonClick } from './UtilGamePlay';
import SearchBar from './SearchBar';  // Importar el componente SearchBar

const Catalogo = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Para el buscador por nombre
  const [filterPlatform, setFilterPlatform] = useState(""); // Para el filtro de plataforma

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

  const filteredGames = useMemo(() => {
    return games
      .filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((game) =>
        filterPlatform ? game.platform === filterPlatform : true
      );
  }, [games, searchTerm, filterPlatform]);

  if (loading) return <p>Cargando...</p>;
  if (error)
    return (
      <p>
        Hubo un problema al cargar los juegos. Por favor, intenta recargar la
        página o vuelve más tarde.
      </p>
    );

  return (
    <div>
      {/* Renderizar el SearchBar y pasar los props */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterPlatform={filterPlatform}
        setFilterPlatform={setFilterPlatform}
      />

      <section className="catalog-container">
        <section className="catalog">
          {filteredGames.map((game) => (
            <div className="card" key={game.id_videogame}>
              <img
                src={game.url_image || "default-image-url.jpg"}
                alt={`Carátula de ${game.name}`}
                className="game-cover"
              />
              <div className="card-content">
                <h3 className="game-title">{game.name}</h3>
                <p className="language">Idioma: {game.language}</p>
                <p className="language">Plataforma: {game.platform}</p>
                <p>Stock: </p>
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
      </section>
    </div>
  );
};

export default Catalogo;
