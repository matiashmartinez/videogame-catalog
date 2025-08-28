import GameplayEmbed from './GameplayEmbed';


const GameCard = ({ game, viewMode, activeGameplayId, setActiveGameplayId }) => {
const isActive = activeGameplayId === game.id_videogame;


return (
<div className="bg-gray-800 rounded-xl p-4 shadow-md border border-gray-700">
<img src={game.url_image || 'default.jpg'} alt={game.name} className="w-full h-48 object-cover rounded" />
<div className="mt-4">
<h3 className="text-xl font-semibold">{game.name}</h3>
<p className="text-sm">Idioma: {game.language || 'No especificado'}</p>
<p className="text-sm">Plataforma: {game.platform}</p>
<p className="text-sm">Stock: <span className={game.avaible ? 'text-green-400' : 'text-red-500'}>{game.avaible ? 'Disponible' : 'Agotado'}</span></p>


{isActive ? (
<>
<button
onClick={() => setActiveGameplayId(null)}
className="mt-2 bg-red-600 hover:bg-red-700 px-3 py-1 text-sm rounded"
>
Ocultar Gameplay
</button>
<GameplayEmbed videoId={game.video_id} />
</>
) : (
game.video_id && (
<button
onClick={() => setActiveGameplayId(game.id_videogame)}
className="mt-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 text-sm rounded"
>
Ver Gameplay
</button>
)
)}
</div>
</div>
);
};


export default GameCard;