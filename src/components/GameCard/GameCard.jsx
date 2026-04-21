import { useGameCard } from './useGameCard';
import { STYLES } from './GameCard.styles';
import PropTypes from 'prop-types';

import { GameCardImage } from './GameCardImage';
import { GameCardDetails } from './GameCardDetails';
import { GameCardModals } from './GameCardModals';

const GameCard = ({ game, viewMode, activeGameplayId, setActiveGameplayId, onDeleteSimulated }) => {
    
    // 1. El Cerebro (Lógica)
    const { state, setters, context, actions } = useGameCard(game, activeGameplayId, setActiveGameplayId, onDeleteSimulated);

    // 2. La Vista (Componentes encapsulados)
    return (
        <>
            <div className={`${STYLES.cardBase} ${viewMode === 'card' ? 'flex flex-col' : 'flex flex-col md:flex-row'}`}>
                
                <GameCardImage 
                    game={game} 
                    viewMode={viewMode} 
                    state={state} 
                    setters={setters} 
                />

                <GameCardDetails 
                    game={game} 
                    viewMode={viewMode} 
                    state={state} 
                    setters={setters} 
                    actions={actions} 
                    context={context} 
                />

            </div>

            <GameCardModals 
                game={game} 
                state={state} 
                setters={setters} 
                actions={actions} 
                context={context} 
            />
        </>
    );
};

GameCard.propTypes = {
    game: PropTypes.shape({
        id_videogame: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        avaible: PropTypes.bool.isRequired,
        url_image: PropTypes.string,
        language: PropTypes.string,
        platform: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        video_id: PropTypes.string
    }).isRequired,
    viewMode: PropTypes.oneOf(['card', 'list']),
    activeGameplayId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setActiveGameplayId: PropTypes.func.isRequired,
    onDeleteSimulated: PropTypes.func
};

export default GameCard;