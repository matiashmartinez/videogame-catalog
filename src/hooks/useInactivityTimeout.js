import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAdmin } from '../context/AdminContext';

export const useInactivityTimeout = (minutes = 10) => {
  const { isAdmin, setIsAdmin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
   
    if (!isAdmin) return;

    let timer;

    const logout = async () => {
      console.log("Sesión expirada por inactividad");  
      await supabase.auth.signOut();
      setIsAdmin(false);  
      navigate('/admin');
    };

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(logout, minutes * 60 * 1000);
    };

    // Eventos que reinician el contador
    const events = [
      'mousedown', 
      'mousemove', 
      'keydown', 
      'scroll', 
      'touchstart'
    ];


    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    
    resetTimer();

    // Limpieza al desmontar o si deja de ser admin
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      if (timer) clearTimeout(timer);
    };
  }, [isAdmin, minutes, navigate, setIsAdmin]);
};