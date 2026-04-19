import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-900 text-white px-4 text-center">
            {/* Icono Animado */}
            <div className="relative mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-gray-700 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-7xl font-black text-gray-800/40 select-none -z-10">
                    404
                </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                NIVEL NO ENCONTRADO
            </h1>

            <p className="text-gray-400 max-w-md mx-auto mb-8 text-lg">
                Parece que has intentado saltar un muro invisible o la zona del mapa aún no ha sido cargada.
            </p>

            <Link
                to="/"
                className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-900/30 hover:-translate-y-1 active:scale-95"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Volver al Inicio
            </Link>
        </div>
    );
};

export default Error404;