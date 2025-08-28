import { useWhatsapp } from './context/WhatsappContext';

function TestWhatsapp() {
  const whatsapp = useWhatsapp();
  return <p>WhatsApp: {whatsapp || 'Cargando...'}</p>;
}

export default TestWhatsapp;