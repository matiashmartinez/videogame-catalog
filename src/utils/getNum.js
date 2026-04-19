import { supabase } from '../supabaseClient';

// Número de prueba estático para la demo
const DEMO_WSP_NUMBER = '15550109999'; 

export const getWhatsappNumber = async () => {
  try {
    const { data, error } = await supabase
      .from('config')
      .select('numero_wsp')
      .limit(1);

  
    if (error || !data || data.length === 0 || !data[0].numero_wsp) {
      console.warn('Usando número de demo por defecto. Razón:', error?.message || 'Tabla vacía');
      return DEMO_WSP_NUMBER; 
    }

    return data[0].numero_wsp;
  } catch (err) {
    console.error('Error inesperado:', err.message);
    return DEMO_WSP_NUMBER; 
  }
};