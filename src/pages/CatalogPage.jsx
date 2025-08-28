
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ViewToggle from '../components/ViewToggle';
import GameCard from '../components/GameCard';


const CatalogPage = () => {
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPlatform, setFilterPlatform] = useState('');
    const [filterAvailability, setFilterAvailability] = useState('');
    const [viewMode, setViewMode] = useState('card');
    const [activeGameplayId, setActiveGameplayId] = useState(null);


    useEffect(() => {
        const fetchGames = async () => {
            const { data, error } = await supabase.from('videogames').select('*');
            if (!error) setGames(data);
        };
        fetchGames();
    }, []);


    const filteredGames = useMemo(() => {
        return games.filter((game) =>
            game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterPlatform ? game.platform === filterPlatform : true) &&
            (filterAvailability ? game.avaible === (filterAvailability === 'available') : true)
        );
    }, [games, searchTerm, filterPlatform, filterAvailability]);


    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Catálogo Gamer</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <FilterBar
                filterPlatform={filterPlatform}
                setFilterPlatform={setFilterPlatform}
                filterAvailability={filterAvailability}
                setFilterAvailability={setFilterAvailability}
            />
            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />


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
    );
};


export default CatalogPage;