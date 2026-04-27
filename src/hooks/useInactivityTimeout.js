// control de inactividad - a X minutos cierra sesión

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAdmin } from '../context/AdminContext';

export const useInactivityTimeout = (minutes = 10) => {
  const { isAdmin, setIsAdmin } = useAdmin();
  const navigate = useNavigate();
  const MS_TIMEOUT = minutes * 60 * 1000;

  useEffect(() => {
    if (!isAdmin) return;

    let timer;

    const logout = async () => {
      try {
        // Chequeamos si la sesión sigue viva antes de pedir cerrar
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await supabase.auth.signOut();
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("Aviso: Error al intentar cerrar la sesión en Supabase.", error);
        }
      } finally {

        localStorage.removeItem('lastActivity');
        setIsAdmin(false);
        navigate('/admin');
      }
    };

    const resetTimer = () => {
      const now = Date.now();
      localStorage.setItem('lastActivity', now.toString());

      if (timer) clearTimeout(timer);
      timer = setTimeout(logout, MS_TIMEOUT);
    };

    const checkPersistedInactivity = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      if (!lastActivity) return;

      const now = Date.now();
      const elapsedMs = now - parseInt(lastActivity, 10);
      const elapsedMinutes = (elapsedMs / 1000 / 60).toFixed(2);

      // LOG DE DIAGNÓSTICO
      console.log(`[Seguridad] Han pasado ${elapsedMinutes} minutos desde la última acción.`);

      if (elapsedMs >= MS_TIMEOUT) {
        console.error("Inactividad detectada: Cerrando sesión.");
        logout();
      }
    };

    // 1. Verificamos apenas vuelve a entrar a la App
    checkPersistedInactivity();

    // 2. Escuchar eventos mientras la pestaña está abierta
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    // 3. Verificamos también cuando la pestaña vuelve a ganar foco
    window.addEventListener('focus', checkPersistedInactivity);

    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      window.removeEventListener('focus', checkPersistedInactivity);
      if (timer) clearTimeout(timer);
    };
  }, [isAdmin, navigate, setIsAdmin, MS_TIMEOUT]);
};