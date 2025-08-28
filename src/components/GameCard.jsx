import React, { useState } from 'react';
import { useWhatsapp } from '../context/WhatsappContext';
import { FaThLarge, FaList } from 'react-icons/fa';

const GameIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

const GameCard = ({ game, viewMode, activeGameplayId, setActiveGameplayId }) => {
    const [imageError, setImageError] = useState(false);
    const whatsapp = useWhatsapp();
    const message = encodeURIComponent(`¡Hola! Estoy interesado en el juego "${game.name}"`);

    const handleVideoToggle = () => {
        setActiveGameplayId(activeGameplayId === game.video_id ? null : game.video_id);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div
            className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden text-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${viewMode === 'card' ? 'flex flex-col' : 'flex flex-col md:flex-row'
                }`}
        >
            {/* Imagen */}
            <div className={`${viewMode === 'card' ? 'w-full' : 'w-full md:w-1/3 min-w-[160px]'} aspect-video bg-gray-700 relative`}>
                <img
                    src={imageError ? '/placeholder-game.jpg' : game.url_image || '/placeholder-game.jpg'}
                    alt={game.name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                    loading="lazy"
                />
                {!game.avaible && (
                    <div className="absolute top-2 right-2 bg-red-700 text-white px-2 py-1 rounded text-xs font-bold shadow-md">
                        AGOTADO
                    </div>
                )}
            </div>

            {/* Contenido */}
            <div className={`p-4 flex flex-col flex-1 ${viewMode !== 'card' ? 'md:ml-4' : ''}`}>
                <div className="space-y-2 mb-4">
                    <h2 className="text-xl font-bold text-white truncate" title={game.name}>
                        {game.name}
                    </h2>

                    {/* Detalles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                        <div className="flex items-center">
                            <span className="mr-1">🌐</span>
                            <span>{game.language || 'No especificado'}</span>
                        </div>
                    </div>

                    {/* Estado y precio */}
                    <div className="flex justify-between items-center mt-3">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${game.avaible ? 'bg-green-900 text-green-300' : 'bg-red-800 text-red-100'
                                }`}
                        >
                            {game.avaible ? 'DISPONIBLE' : 'AGOTADO'}
                        </span>

                        <div className="flex items-center gap-2 text-yellow-300 font-bold text-sm">
                            {game.platform && (
                                <div className="flex items-center bg-gray-700 text-white/80 px-2 py-1 rounded-md text-xs font-medium shadow-sm border border-gray-600">
                                    🎮 <span className="ml-1">{game.platform}</span>
                                </div>
                            )}
                            <span className="text-lg">
                                {game.price ? `$${game.price}` : 'Consultar precio'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className={`flex gap-3 mt-auto ${viewMode !== 'card' ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'}`}>
                    <button
                        onClick={handleVideoToggle}
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg text-sm font-medium transition-colors duration-200 w-full"
                    >
                        <GameIcon />
                        {activeGameplayId === game.video_id ? 'Ocultar Gameplay' : 'Ver Gameplay'}
                    </button>

                    {whatsapp && game.avaible ? (
                        <a
                            href={`https://wa.me/${whatsapp}?text=${message}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Consultar por WhatsApp sobre ${game.name}`}
                            className="flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none rounded-lg text-sm font-medium transition-colors duration-200 w-full"
                        >
                            <WhatsAppIcon />
                            Consultar
                        </a>
                    ) : (
                        <button
                            disabled
                            className="flex items-center justify-center px-4 py-2 bg-gray-600 text-gray-400 rounded-lg text-sm font-medium w-full cursor-not-allowed opacity-75"
                            title={!game.avaible ? "Producto agotado" : "Número no configurado"}
                        >
                            <WhatsAppIcon />
                            Consultar
                        </button>
                    )}
                </div>

                {/* Gameplay */}
                {activeGameplayId === game.video_id && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
                            <iframe
                                src={`https://www.youtube.com/embed/${game.video_id}?autoplay=1`}
                                title={`Gameplay de ${game.name}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full rounded-lg"
                                frameBorder="0"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameCard;
