import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  // 1. Agregamos el estado de carga inicializado en true
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (!error) {
        setIsAdmin(!!session);
      }
      // 2. Ya obtuvimos respuesta, dejamos de cargar
      setIsLoading(false); 
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
      setIsLoading(false); // Por si el cambio de estado ocurre de repente
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    // 3. Exportamos isLoading para que las rutas puedan leerlo
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, isLoading }}> 
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);