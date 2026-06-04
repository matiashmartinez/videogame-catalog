import { createClient } from '@supabase/supabase-js';

export default async function handler(request, response) {
  // Verificamos que la petición venga realmente del Cron de Vercel por seguridad
  const authHeader = request.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return response.status(401).json({ error: 'No autorizado' });
  }

  // Inicializamos Supabase con las variables que ya tenés en Vercel
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
  );

  try {
    // Hacemos una consulta ultra liviana solo para generar actividad
    // Cambiá 'games' por el nombre real de tu tabla si es distinto
    const { data, error } = await supabase.from('games').select('id').limit(1);

    if (error) throw error;

    return response.status(200).json({ 
      success: true, 
      message: 'Supabase pingeado exitosamente' 
    });
    
  } catch (error) {
    return response.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}