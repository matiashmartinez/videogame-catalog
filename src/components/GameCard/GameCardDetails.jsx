// src/components/GameCard/GameCardDetails.jsx
import { STYLES } from './GameCard.styles';
import { GameIcon, WhatsAppIcon, EditIcon, TrashIcon } from '../icons/Icons';
import PropTypes from 'prop-types';

export const GameCardDetails = ({ game, viewMode, state, setters, actions, context }) => {
    return (
        <div className={`${STYLES.contentSection} ${viewMode !== 'card' ? 'md:ml-2' : ''}`}>
            
            {/* Cabecera */}
            <div className="mb-4 space-y-1">
                <h2 className={STYLES.title} title={game.name}>{game.name}</h2>
                <div className="flex justify-between items-center text-sm text-gray-400">
                    <span className="flex items-center">🌐 {game.language || 'N/A'}</span>
                    {game.platform && <span className={STYLES.badge}>{game.platform}</span>}
                </div>
            </div>

            {/* Precio */}
            <div className="mt-auto mb-4">
                <span className={STYLES.price}>{game.price ? `$${game.price}` : '$'}</span>
            </div>

            {/* Botonera */}
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 w-full">
                    <button onClick={actions.handleVideoToggle} className={`${STYLES.btnBase} ${state.isVideoActive ? STYLES.btnGameplayActive : STYLES.btnGameplayInactive}`}>
                        <GameIcon /> {state.isVideoActive ? 'Cerrar' : 'Gameplay'}
                    </button>

                    <button
                        onClick={() => setters.setShowWhatsappModal(true)}
                        disabled={!context.whatsapp || !game.avaible}
                        className={`${STYLES.btnBase} ${context.whatsapp && game.avaible ? STYLES.btnWsspActive : STYLES.btnWsspDisabled}`}
                    >
                        <WhatsAppIcon /> Consultar
                    </button>
                </div>

                {/* Botonera Admin */}
                {context.isAdmin && (
                    <div className={STYLES.adminBar}>
                        <button onClick={actions.handleEdit} className={STYLES.btnEdit}><EditIcon /> Editar</button>
                        <button onClick={() => setters.setShowDeleteModal(true)} className={STYLES.btnDelete}><TrashIcon /></button>
                    </div>
                )}
            </div>

            {/* YouTube Embed */}
            {state.isVideoActive && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="relative pt-[56.25%] w-full rounded-lg overflow-hidden bg-black">
                        <iframe src={`https://www.youtube.com/embed/${game.video_id}?autoplay=1`} className="absolute top-0 left-0 w-full h-full" allowFullScreen />
                    </div>
                </div>
            )}
        </div>
    );
};

GameCardDetails.propTypes = {
    game: PropTypes.object.isRequired,
    viewMode: PropTypes.oneOf(['card', 'list']),
    state: PropTypes.object.isRequired,
    setters: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired
};