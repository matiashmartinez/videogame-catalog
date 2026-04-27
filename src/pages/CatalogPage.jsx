/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import CatalogToolbar from '../components/CatalogToolbar';
import GameCard from '../components/GameCard';
import toast from 'react-hot-toast';
import { SearchX } from 'lucide-react';


const GameCardSkeleton = ({ viewMode }) => (
    <div className={`bg-gray-800 rounded-2xl overflow-hidden animate-pulse border border-gray-700 ${viewMode === 'card' ? 'flex flex-col' : 'flex flex-col md:flex-row'
        }`}>
        <div className={`${viewMode === 'card' ? 'w-full aspect-video' : 'w-full md:w-72 aspect-video md:aspect-square'} bg-gray-700`}></div>
        <div className="p-5 flex-1 space-y-4">
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3"></div>
            <div className="mt-auto pt-6 flex justify-between items-end">
                <div className="h-8 bg-gray-700 rounded w-24"></div>
            </div>
            <div className="flex gap-2 pt-2">
                <div className="h-10 bg-gray-700 rounded flex-1"></div>
                <div className="h-10 bg-gray-700 rounded flex-1"></div>
            </div>
        </div>
    </div>
);


const CatalogPage = () => {
   
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPlatform, setFilterPlatform] = useState('');
    const [filterAvailability, setFilterAvailability] = useState('');
    const [viewMode, setViewMode] = useState('card');
    const [activeGameplayId, setActiveGameplayId] = useState(null);
    const [sortOption, setSortOption] = useState('az');
    const [isLoading, setIsLoading] = useState(true);

   
    useEffect(() => {
        const fetchGames = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('videogames')
                    .select('*');

                if (error) throw error;
               
                setGames(data || []);
            } catch (error) {
                console.error('Error cargando juegos:', error);
                toast.error('Error al conectar con la base de datos');
            } finally {
                setIsLoading(false);
            }
        };
        fetchGames();
    }, []);

    
    const handleDeleteSimulated = (id) => {
       
        setGames(prevGames => prevGames.filter(game => game.id_videogame !== id));
    };


    const filteredGames = useMemo(() => {
        const filtered = games.filter(game => {
           
            if (searchTerm && !game.name?.toLowerCase().includes(searchTerm.toLowerCase()))
                return false;
          
            if (filterPlatform && game.platform !== filterPlatform)
                return false;
            
            if (filterAvailability && game.avaible !== (filterAvailability === 'true'))
                return false;
            return true;
        });

       
        const sortMethods = {
            az: (a, b) => (a.name || '').localeCompare(b.name || ''),
            za: (a, b) => (b.name || '').localeCompare(a.name || ''),
            recent: (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0),
            oldest: (a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0),
        };
        return filtered.sort(sortMethods[sortOption] || sortMethods.az);
    }, [games, searchTerm, filterPlatform, filterAvailability, sortOption]);


    const uniquePlatforms = [...new Set(games.map((g) =>
        g.platform))].filter(Boolean);


    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
            <div className="max-w-6xl mx-auto space-y-8">

                
                <div className="text-center space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                        CATÁLOGO GAMER
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base uppercase tracking-widest font-medium">
                        Explora los mejores títulos disponibles
                    </p>
                </div>

                
                <div className="sticky top-4 z-30 transition-all">
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
                        platforms={uniquePlatforms}
                    />
                </div>

              
                <div className={`grid gap-6 transition-all duration-500 ${viewMode === 'card' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                    }`}>

                    {isLoading ? (

                        /* A) MIENTRAS CARGA: Mostramos 6 tarjetas fantasma */
                        [...Array(6)].map((_, i) => (
                            <GameCardSkeleton key={i} viewMode={viewMode} />
                        ))

                    ) : filteredGames.length > 0 ? (

                        /* B) CARGA EXITOSA: Mostramos los juegos reales */
                        filteredGames.map((game) => (
                            <GameCard
                                key={game.id_videogame}
                                game={game}
                                viewMode={viewMode}
                                activeGameplayId={activeGameplayId}
                                setActiveGameplayId={setActiveGameplayId}
                                onDeleteSimulated={handleDeleteSimulated} // <--- Pasamos la función al hijo
                            />
                        ))

                    ) : (

                     
                        <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4 bg-gray-800/30 rounded-3xl border border-dashed border-gray-700">
                            <div className="p-4 bg-gray-800 rounded-full text-gray-500">
                                <SearchX className="w-12 h-12" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-300">No encontramos resultados</h3>
                                <p className="text-gray-500">Intenta ajustar los filtros o la búsqueda</p>
                            </div>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilterPlatform('');
                                    setFilterAvailability('');
                                }}
                                className="text-green-500 hover:text-green-400 font-semibold text-sm transition-colors mt-2"
                            >
                                Limpiar todos los filtros
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CatalogPage;