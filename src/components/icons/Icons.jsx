/* eslint-disable react/prop-types */
// Icons.jsx
const S = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-14 w-14"
};

//ICONOS GAMECARD
export const GameIcon = ({ size = S.sm }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${size} mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const WhatsAppIcon = ({ size = S.sm }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${size} mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

export const EditIcon = ({ size = S.sm }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${size} mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

// 2. Iconos que suelen ir SOLOS (Sin margen lateral)
export const TrashIcon = ({ size = S.sm }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

//ICONO CERRAR
export const XIcon = ({ size = S.md }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);



// 3. Icono especial ALERTA (Grande y Centrado) 
export const AlertIcon = ({ size = S.lg }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${size} text-red-500 mb-4 mx-auto`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

