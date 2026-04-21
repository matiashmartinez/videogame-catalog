// src/components/GameCard/useGameCard.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWhatsapp } from '../../context/WhatsappContext';
import { useAdmin } from '../../context/AdminContext';
import toast from 'react-hot-toast';

export const useGameCard = (game, activeGameplayId, setActiveGameplayId, onDeleteSimulated) => {
    // 1. Estados
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showWhatsappModal, setShowWhatsappModal] = useState(false);

    // 2. Contextos y Hooks de React Router
    const whatsapp = useWhatsapp();
    const { isAdmin } = useAdmin();
    const navigate = useNavigate();

    // 3. Variables derivadas
    const message = encodeURIComponent(`¡Hola! Estoy interesado en el juego "${game.name}"`);
    const isVideoActive = activeGameplayId === game.video_id;

    // 4. Funciones (Acciones)
    const handleVideoToggle = () => {
        setActiveGameplayId(isVideoActive ? null : game.video_id);
    };

    const confirmDelete = () => {
        toast.success('Modo Demo: Juego eliminado correctamente');
        if (onDeleteSimulated) onDeleteSimulated(game.id_videogame);
        setShowDeleteModal(false);
    };

    const handleEdit = () => {
        navigate(`/edit/${game.id_videogame}`);
    };

    const openWhatsapp = () => {
        setShowWhatsappModal(false);
        window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
    };

    // 5. Retornamos todo ordenado
    return {
        state: { imageError, imageLoaded, showImageModal, showDeleteModal, showWhatsappModal, isVideoActive },
        setters: { setImageError, setImageLoaded, setShowImageModal, setShowDeleteModal, setShowWhatsappModal },
        context: { whatsapp, isAdmin },
        actions: { handleVideoToggle, confirmDelete, handleEdit, openWhatsapp }
    };
};