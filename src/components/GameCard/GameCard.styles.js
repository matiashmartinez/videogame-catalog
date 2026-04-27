// src/components/GameCard/GameCard.styles.js

export const STYLES = {
    // Contenedores Principales
    cardBase: "group bg-gray-800 rounded-xl shadow-lg overflow-hidden text-white transition-all duration-300 hover:shadow-2xl hover:border-green-500/30 border border-transparent",
    imageSection: "aspect-video bg-gray-900 relative overflow-hidden cursor-pointer group",
    contentSection: "p-5 flex flex-col flex-1",

    // Textos y Badges
    title: "text-xl font-bold text-white line-clamp-1 transition-colors",
    badge: "bg-gray-700 text-gray-200 px-2 py-0.5 rounded text-xs font-bold shadow-inner",
    price: "text-2xl font-black text-green-400 drop-shadow-sm",

    // Botones
    btnBase: "flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-bold transition-all duration-200",
    btnGameplayActive: "bg-blue-600 text-white shadow-inner",
    btnGameplayInactive: "bg-gray-700 text-gray-200 hover:bg-gray-600",
    btnWsspActive: "bg-green-600 hover:bg-green-500 text-white shadow-md",
    btnWsspDisabled: "bg-gray-700/50 text-gray-500 cursor-not-allowed",

    // Admin
    adminBar: "flex gap-2 pt-2 border-t border-gray-700/50",
    btnEdit: "flex-1 flex items-center justify-center py-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 rounded-lg text-sm font-bold border border-yellow-500/20 transition-all",
    btnDelete: "w-12 flex items-center justify-center py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg border border-red-500/20 transition-all",

    // Modales Generales
    modalOverlay: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200",
    modalBox: "bg-gray-800 rounded-3xl border border-gray-700 shadow-2xl w-full max-w-sm p-8 text-center animate-in zoom-in-95 duration-300"
};