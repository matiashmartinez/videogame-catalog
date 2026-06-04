# 🎮 GameCatalog 

🔗 **Demo en vivo:** [https://videogame-catalog.vercel.app/](https://videogame-catalog.vercel.app/)  
💻 **Repositorio:** [https://github.com/matiashmartinez/videogame-catalog](https://github.com/matiashmartinez/videogame-catalog)

> **⚠️ Nota sobre esta versión (Demo Mode)**  
> Este repositorio y su despliegue en vivo operan como una **versión de demostración**. Para mantener la integridad del proyecto, ciertas funciones de escritura en la base de datos (como agregar, editar o eliminar juegos desde el panel de administrador) están restringidas o utilizan datos simulados. Las funcionalidades de visualización, filtrado y navegación operan al 100%.

## 🚀 Descripción del Proyecto
GameCatalog es una Single Page Application (SPA) diseñada para la gestión, exploración y visualización de un catálogo de videojuegos. El desarrollo se centró en construir una arquitectura cliente robusta, priorizando la separación de responsabilidades, la seguridad en las rutas de administración y una experiencia de usuario (UX) fluida y altamente interactiva.

## 🏗️ Arquitectura y Buenas Prácticas Aplicadas

El proyecto sigue estándares de la industria para el desarrollo con React, garantizando escalabilidad y mantenibilidad:

*   **Separación de Responsabilidades (SoC):** El código está modularizado de forma estricta. Componentes complejos como la vista de tarjetas se dividen en subcomponentes funcionales (`GameCardDetails.jsx`, `GameCardImage.jsx`, `GameCardModals.jsx`) y centralizan su exportación mediante un archivo `index.js`. Además, los estilos se aíslan en archivos dedicados como `GameCard.styles.js`.
*   **Abstracción Lógica (Custom Hooks):** La lógica de negocio y el manejo de efectos secundarios se extraen de la UI hacia hooks personalizados. Se destaca `useGameCard.jsx` para el encapsulamiento del estado de los componentes y `useInactivityTimeout.js` para la gestión segura de las sesiones de usuario.
*   **Gestión del Estado Global:** Se implementó la Context API (`AdminContext.jsx`, `WhatsappContext.jsx`) para manejar el estado de autenticación y configuraciones globales, evitando el *prop drilling* a lo largo del árbol de componentes.
*   **Enrutamiento y Seguridad:** Se utiliza un componente de orden superior (HOC) `ProtectedRoute.jsx` para interceptar y proteger el acceso a las vistas de administración (`AdminDashboard.jsx`, `AddGame.jsx`, `EditGame.jsx`), validando la sesión contra el proveedor de autenticación.
*   **Composición Dinámica de Clases CSS:** Integración de utilidades como `clsx` y `tailwind-merge` para componer clases de Tailwind CSS de manera condicional, garantizando que no haya colisión de estilos en la interfaz gráfica.
*   **Modularización de Utilidades:** Funciones puras y helpers aislados en el directorio `/utils` (como `gameplayHandlers.js` y `getNum.js`) para mantener los componentes limpios y enfocados únicamente en el renderizado.

## 🛠️ Stack Tecnológico

*   **Core:** React 18, Vite (para un empaquetado y HMR ultra rápidos)
*   **Enrutamiento:** React Router DOM v6
*   **Estilos y UI:** Tailwind CSS v4, Lucide React, React Icons, React Hot Toast (para feedback no bloqueante)
*   **Backend & Autenticación:** Supabase (PostgreSQL + GoTrue Auth)