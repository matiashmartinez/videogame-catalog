// utils/getNum.js
import { supabase } from '../supabaseClient';

export const getWhatsappNumber = async () => {
  try {
    const { data, error } = await supabase
      .from('config')
      .select('numero_wsp')
      .limit(1);

    if (error || !data || data.length === 0) {
      console.warn('No se encontró número de WhatsApp o hubo error:', error?.message);
      return null;
    }

    return data[0].numero_wsp;
  } catch (err) {
    console.error('Error inesperado:', err.message);
    return null;
  }
};
