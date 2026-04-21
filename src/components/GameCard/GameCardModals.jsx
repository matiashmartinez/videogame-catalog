// src/components/GameCard/GameCardModals.jsx
import { STYLES } from './GameCard.styles';
import { WhatsAppIcon, XIcon, AlertIcon } from '../icons/Icons';
import PropTypes from 'prop-types';

export const GameCardModals = ({ game, state, setters, actions }) => {
    return (
        <>
            {/* Modal 1: Ampliar Imagen */}
            {state.showImageModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
                    onClick={() => setters.setShowImageModal(false)}
                >
                    <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800/80 p-2 rounded-full"
                        onClick={() => setters.setShowImageModal(false)}
                    >
                        <XIcon />
                    </button>
                    <img
                        src={state.imageError ? '/placeholder-game.jpg' : game.url_image || '/placeholder-game.jpg'}
                        alt={game.name}
                        className="max-w-full max-h-full object-contain rounded-xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* Modal 2: Confirmar Borrado */}
            {state.showDeleteModal && (
                <div className={STYLES.modalOverlay} onClick={() => setters.setShowDeleteModal(false)}>
                    <div className={STYLES.modalBox} onClick={(e) => e.stopPropagation()}>
                        <AlertIcon />
                        <h3 className="text-2xl font-bold text-white mb-2">¿Eliminar juego?</h3>
                        <p className="text-gray-400 text-sm mb-8">
                            Estás a punto de eliminar <strong>{game.name}</strong>.<br />¿Deseas continuar?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setters.setShowDeleteModal(false)}
                                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={actions.confirmDelete}
                                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold"
                            >
                                Sí, eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 3: Confirmación WhatsApp */}
            {state.showWhatsappModal && (
                <div className={STYLES.modalOverlay} onClick={() => setters.setShowWhatsappModal(false)}>
                    <div className={STYLES.modalBox} onClick={(e) => e.stopPropagation()}>
                        <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                            <WhatsAppIcon size="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Modo Demo</h3>
                        <p className="text-gray-400 text-sm mb-8">
                            Estás a punto de consultar por <strong>&ldquo;{game.name}&rdquo;</strong>.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setters.setShowWhatsappModal(false)}
                                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={actions.openWhatsapp}
                                className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold"
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

// Validaciones de nivel Senior
GameCardModals.propTypes = {
    game: PropTypes.object.isRequired,
    state: PropTypes.shape({
        showImageModal: PropTypes.bool.isRequired,
        showDeleteModal: PropTypes.bool.isRequired,
        showWhatsappModal: PropTypes.bool.isRequired,
        imageError: PropTypes.bool.isRequired
    }).isRequired,
    setters: PropTypes.shape({
        setShowImageModal: PropTypes.func.isRequired,
        setShowDeleteModal: PropTypes.func.isRequired,
        setShowWhatsappModal: PropTypes.func.isRequired
    }).isRequired,
    actions: PropTypes.shape({
        confirmDelete: PropTypes.func.isRequired,
        openWhatsapp: PropTypes.func.isRequired
    }).isRequired,
    context: PropTypes.object
};