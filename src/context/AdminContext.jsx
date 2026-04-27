/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (!error) {
        setIsAdmin(!!session);
      }
      
      setIsLoading(false); 
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
      setIsLoading(false); 
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    //  Exportamos isLoading para rutas
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, isLoading }}> 
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);