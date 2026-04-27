// src/components/GameCard/GameCardImage.jsx
import { STYLES } from './GameCard.styles';
import PropTypes from 'prop-types';

export const GameCardImage = ({ game, viewMode, state, setters }) => {
    return (
        <div
            onClick={() => setters.setShowImageModal(true)}
            className={`${STYLES.imageSection} ${viewMode === 'card' ? 'w-full' : 'w-full md:w-1/3 min-w-[200px]'}`}
        >
            <img
                src={state.imageError ? '/placeholder-game.jpg' : game.url_image || '/placeholder-game.jpg'}
                alt={game.name}
                className={`w-full h-full object-cover transition-all duration-500 ${!game.avaible ? 'grayscale opacity-40 contrast-125' : 'group-hover:scale-110 group-hover:opacity-80'}`}
                onError={() => setters.setImageError(true)}
                onLoad={() => setters.setImageLoaded(true)}
            />
            {!game.avaible && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-black tracking-tighter shadow-2xl border-2 border-red-500 rotate-[-12deg] animate-pulse">
                        SIN STOCK
                    </div>
                </div>
            )}
        </div>
    );
};

GameCardImage.propTypes = {
    game: PropTypes.object.isRequired,
    viewMode: PropTypes.oneOf(['card', 'list']),
    state: PropTypes.object.isRequired,
    setters: PropTypes.object.isRequired
};