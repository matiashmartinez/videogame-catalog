import { createContext, useContext, useEffect, useState } from 'react';
import { getWhatsappNumber } from '../utils/getNum';

const WhatsappContext = createContext(null);

export const WhatsappProvider = ({ children }) => {
  const [whatsapp, setWhatsapp] = useState(null);

  useEffect(() => {
    const fetchNumber = async () => {
      const number = await getWhatsappNumber();
      setWhatsapp(number);
    };
    fetchNumber();
  }, []);

  return (
    <WhatsappContext.Provider value={whatsapp}>
      {children}
    </WhatsappContext.Provider>
  );
};

export const useWhatsapp = () => {
  return useContext(WhatsappContext); // ya puede ser null al inicio, y es normal
};
