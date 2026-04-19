import React, { useState } from 'react';
import { useWhatsapp } from '../context/WhatsappContext';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import toast from 'react-hot-toast';

// --- ICONOS NATIVOS (SVG puros para evitar errores de librerías) ---
const GameIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-red-500 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

// --- COMPONENTE PRINCIPAL ---
const GameCard = ({ game, viewMode, activeGameplayId, setActiveGameplayId, onDeleteSimulated }) => {
    // Estados de UI
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Estados de Modales (NUEVO)
    const [showImageModal, setShowImageModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showWhatsappModal, setShowWhatsappModal] = useState(false);

    const whatsapp = useWhatsapp();
    const { isAdmin } = useAdmin();
    const navigate = useNavigate();

    const message = encodeURIComponent(`¡Hola! Estoy interesado en el juego "${game.name}"`);

    const handleVideoToggle = () => {
        setActiveGameplayId(activeGameplayId === game.video_id ? null : game.video_id);
    };

    // Confirmación final del borrado
    const confirmDelete = () => {
        toast.success('Modo Demo: Juego eliminado correctamente');
        if (onDeleteSimulated) onDeleteSimulated(game.id_videogame);
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className={`group bg-gray-800 rounded-xl shadow-lg overflow-hidden text-white transition-all duration-300 hover:shadow-2xl hover:border-green-500/30 border border-transparent ${viewMode === 'card' ? 'flex flex-col' : 'flex flex-col md:flex-row'
                }`}>

                {/* ========================================== */}
                {/* 1. SECCIÓN DE IMAGEN (Click para ampliar)  */}
                {/* ========================================== */}
                <div
                    onClick={() => setShowImageModal(true)}
                    className={`${viewMode === 'card' ? 'w-full' : 'w-full md:w-1/3 min-w-[200px]'} aspect-video bg-gray-900 relative overflow-hidden cursor-pointer`}
                >
                    <img
                        src={imageError ? '/placeholder-game.jpg' : game.url_image || '/placeholder-game.jpg'}
                        alt={game.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-80"
                        onError={() => setImageError(true)}
                        onLoad={() => setImageLoaded(true)}
                        loading="lazy"
                    />

                    {/* Icono de Lupa que aparece al hacer hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-black/60 rounded-full p-3 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </div>
                    </div>

                    {!game.avaible && (
                        <div className="absolute top-2 right-2 bg-red-600/90 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] uppercase font-black shadow-lg tracking-wider z-10">
                            Agotado
                        </div>
                    )}
                </div>

                {/* ========================================== */}
                {/* 2. SECCIÓN DE CONTENIDO                    */}
                {/* ========================================== */}
                <div className={`p-5 flex flex-col flex-1 ${viewMode !== 'card' ? 'md:ml-2' : ''}`}>
                    <div className="mb-4 space-y-1">
                        <h2 className="text-xl font-bold text-white line-clamp-1 transition-colors" title={game.name}>
                            {game.name}
                        </h2>
                        <div className="flex justify-between items-center text-sm text-gray-400">
                            <span className="flex items-center">🌐 {game.language || 'No especificado'}</span>
                            {game.platform && (
                                <span className="bg-gray-700 text-gray-200 px-2 py-0.5 rounded text-xs font-bold shadow-inner">
                                    {game.platform}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mt-auto mb-4">
                        <span className="text-2xl font-black text-green-400 drop-shadow-sm">
                            {game.price ? `$${game.price}` : 'Consultar'}
                        </span>
                    </div>

                    {/* Botonera */}
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 w-full">
                            <button
                                onClick={handleVideoToggle}
                                className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${activeGameplayId === game.video_id
                                    ? 'bg-blue-600 text-white shadow-inner'
                                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                    }`}
                            >
                                <GameIcon /> {activeGameplayId === game.video_id ? 'Cerrar' : 'Gameplay'}
                            </button>

                            {whatsapp && game.avaible ? (
                                <button
                                    onClick={() => setShowWhatsappModal(true)}
                                    className="flex-1 flex items-center justify-center py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold transition-all duration-200 shadow-md"
                                >
                                    <WhatsAppIcon /> Consultar
                                </button>
                            ) : (
                                <button disabled className="flex-1 flex items-center justify-center py-2.5 bg-gray-700/50 text-gray-500 rounded-lg text-sm font-bold cursor-not-allowed">
                                    <WhatsAppIcon /> Consultar
                                </button>
                            )}
                        </div>

                        {isAdmin && (
                            <div className="flex gap-2 pt-2 border-t border-gray-700/50">
                                <button
                                    onClick={() => navigate(`/edit/${game.id_videogame}`)}
                                    className="flex-1 flex items-center justify-center py-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 rounded-lg text-sm font-bold border border-yellow-500/20 transition-all"
                                >
                                    <EditIcon /> Editar
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(true)} // Abrimos nuestro modal en lugar del confirm nativo
                                    className="w-12 flex items-center justify-center py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg border border-red-500/20 transition-all"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* YouTube Embed */}
                    {activeGameplayId === game.video_id && (
                        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="relative pt-[56.25%] w-full rounded-lg overflow-hidden shadow-inner border border-gray-700 bg-black">
                                <iframe
                                    src={`https://www.youtube.com/embed/${game.video_id}?autoplay=1`}
                                    title="Gameplay"
                                    className="absolute top-0 left-0 w-full h-full"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ========================================== */}
            {/* MODAL 1: AMPLIAR IMAGEN DE PORTADA         */}
            {/* ========================================== */}
            {showImageModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-200"
                    onClick={() => setShowImageModal(false)}
                >
                    <button
                        className="absolute top-4 right-4 md:top-8 md:right-8 text-gray-400 hover:text-white bg-gray-800/80 p-2 rounded-full transition-colors z-[101]"
                        onClick={() => setShowImageModal(false)}
                    >
                        <XIcon />
                    </button>
                    <img
                        src={imageError ? '/placeholder-game.jpg' : game.url_image || '/placeholder-game.jpg'}
                        alt={game.name}
                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic en la foto misma
                    />
                </div>
            )}

            {/* ========================================== */}
            {/* MODAL 2: ALERTA DE ELIMINACIÓN PRO         */}
            {/* ========================================== */}
            {showDeleteModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setShowDeleteModal(false)}
                >
                    <div
                        className="bg-gray-800 rounded-3xl border border-gray-700 shadow-2xl w-full max-w-sm p-8 text-center animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()} // Evita que se cierre si clickeas la tarjeta
                    >
                        <AlertIcon />
                        <h3 className="text-2xl font-bold text-white mb-2">¿Eliminar juego?</h3>
                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                            Estás a punto de eliminar <strong>"{game.name}"</strong> del catálogo de forma permanente. <br />¿Deseas continuar?
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-900/30 active:scale-95"
                            >
                                Sí, eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* ========================================== */}
            {/* MODAL 3: CONFIRMACIÓN DE WHATSAPP (DEMO)   */}
            {/* ========================================== */}
            {showWhatsappModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setShowWhatsappModal(false)}
                >
                    <div
                        className="bg-gray-800 rounded-3xl border border-gray-700 shadow-2xl w-full max-w-sm p-8 text-center animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Icono grande de WhatsApp */}
                        <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">Modo Demo</h3>
                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                            Estás a punto de abrir WhatsApp con un número de prueba para consultar por <strong>"{game.name}"</strong>.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowWhatsappModal(false)}
                                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    setShowWhatsappModal(false);
                                    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
                                }}
                                className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-900/30 active:scale-95"
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GameCard;