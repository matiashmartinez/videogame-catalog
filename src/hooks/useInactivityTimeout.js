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
      await supabase.auth.signOut();
      localStorage.removeItem('lastActivity'); // Limpiamos rastro
      setIsAdmin(false);
      navigate('/admin');
    };

    const resetTimer = () => {
      const now = Date.now();
      localStorage.setItem('lastActivity', now.toString());
      
      if (timer) clearTimeout(timer);
      timer = setTimeout(logout, MS_TIMEOUT);
    };

    const checkPersistedInactivity = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      if (lastActivity) {
        const elapsed = Date.now() - parseInt(lastActivity, 10);
        if (elapsed >= MS_TIMEOUT) {
          logout(); // Si pasó más tiempo del debido mientras el navegador estaba cerrado
        }
      }
    };

    // 1. Verificamos apenas vuelve a entrar a la App
    checkPersistedInactivity();

    // 2. Escuchar eventos mientras la pestaña está abierta
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    // 3. Verificamos también cuando la pestaña vuelve a ganar foco (por si estaba minimizada)
    window.addEventListener('focus', checkPersistedInactivity);

    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      window.removeEventListener('focus', checkPersistedInactivity);
      if (timer) clearTimeout(timer);
    };
  }, [isAdmin, navigate, setIsAdmin, MS_TIMEOUT]);
};