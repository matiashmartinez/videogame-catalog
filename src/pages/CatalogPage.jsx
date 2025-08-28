import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import CatalogToolbar from '../components/CatalogToolbar';
import GameCard from '../components/GameCard';

const CatalogPage = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('');
  const [viewMode, setViewMode] = useState('card');
  const [activeGameplayId, setActiveGameplayId] = useState(null);
  const [sortOption, setSortOption] = useState('az');

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase.from('videogames').select('*');
      if (!error) setGames(data);
    };
    fetchGames();
  }, []);

  const filteredGames = useMemo(() => {
  let result = [...games];

  // Filtro por búsqueda
  if (searchTerm) {
    result = result.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filtro por plataforma
  if (filterPlatform) {
    result = result.filter((game) => game.platform === filterPlatform);
  }

  // Filtro por disponibilidad
  if (filterAvailability) {
    const isAvailable = filterAvailability === 'true';
    result = result.filter((game) => game.avaible === isAvailable);
  }

  // Ordenamiento
  if (sortOption === 'az') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'za') {
    result.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === 'recent') {
    result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } else if (sortOption === 'oldest') {
    result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }

  return result;
}, [games, searchTerm, filterPlatform, filterAvailability, sortOption]);


  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-6">Catálogo Gamer</h1>
        <CatalogToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedPlatform={filterPlatform}
          setSelectedPlatform={setFilterPlatform}
          selectedAvailability={filterAvailability}
          setSelectedAvailability={setFilterAvailability}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortOption={sortOption}
          setSortOption={setSortOption}
          platforms={[...new Set(games.map((g) => g.platform))]} // genera dinámicamente
        />
        <div className={`grid gap-4 ${viewMode === 'card' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredGames.map((game) => (
            <GameCard
              key={game.id_videogame}
              game={game}
              viewMode={viewMode}
              activeGameplayId={activeGameplayId}
              setActiveGameplayId={setActiveGameplayId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
