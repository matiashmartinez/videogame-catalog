// src/hooks/useInactivityTimeout.js
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAdmin } from '../context/AdminContext';

/**
 * Hook para cierre de sesión automático por inactividad.
 * Solo se activa cuando el usuario es administrador (isAdmin = true).
 *
 * @param {number} minutes - Minutos de inactividad permitidos antes de cerrar sesión (default: 10).
 */
export const useInactivityTimeout = (minutes = 10) => {
  const { isAdmin, setIsAdmin } = useAdmin();
  const navigate = useNavigate();
  const timeoutMs = minutes * 60 * 1000;

  // Referencia persistente para el timer (evita pérdidas entre renders)
  const timerRef = useRef(null);

  useEffect(() => {
    // Si no hay sesión activa de admin, limpiamos y salimos
    if (!isAdmin) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Cierre de sesión
    const logout = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) await supabase.auth.signOut();
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('[useInactivityTimeout] Error al cerrar sesión:', error);
        }
      } finally {
        localStorage.removeItem('lastActivity');
        setIsAdmin(false);
        navigate('/admin'); // Ruta de login
      }
    };

    // Reinicia el timer: guarda actividad y programa nuevo logout
    const resetTimer = () => {
      const now = Date.now();
      const lastSavedRaw = localStorage.getItem('lastActivity');
      const lastSaved = lastSavedRaw ? parseInt(lastSavedRaw, 10) : 0;

      // OPTIMIZACIÓN: Escribimos en LocalStorage máximo cada 10 segundos
      if (now - lastSaved > 10000) {
        localStorage.setItem('lastActivity', now.toString());
      }

      // El reloj en memoria (RAM) SIEMPRE se reinicia al milisegundo exacto
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(logout, timeoutMs);
    };

    // Verifica inactividad acumulada (útil al recuperar el foco o recargar)
    const checkPersistedInactivity = () => {
      const lastActivityRaw = localStorage.getItem('lastActivity');
      if (!lastActivityRaw) {
        // Primera vez: inicializar
        resetTimer();
        return;
      }

      const elapsed = Date.now() - parseInt(lastActivityRaw, 10);
      if (elapsed >= timeoutMs) {
        logout();
      } else {
        
        resetTimer();
      }
    };

    // Eventos que indican actividad del usuario
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    // Configuración inicial
    checkPersistedInactivity();

    // Suscripción a eventos
    activityEvents.forEach(event => window.addEventListener(event, resetTimer));
    window.addEventListener('focus', checkPersistedInactivity);

    // Limpieza al desmontar o cuando cambien las dependencias
    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, resetTimer));
      window.removeEventListener('focus', checkPersistedInactivity);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isAdmin, navigate, setIsAdmin, timeoutMs]);
};