// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    minify: 'terser', // Activamos Terser como el minificador oficial
    terserOptions: {
      compress: {
        // Esto elimina TODOS los console.log de tu código al compilar
        drop_console: true, 
        // Esto elimina los console.warn (como el que pusimos en el catch)
        drop_debugger: true,
      },
    },
  },
});
