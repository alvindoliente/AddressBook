import React, { createContext, useContext, useState } from 'react';

interface SuccessMessageContextType {
  message: string | null;
  variant: string;
  setMessage: (message: string, variant: string) => void;
  clearMessage: () => void;
}

const SuccessMessageContext = createContext<SuccessMessageContextType | undefined>(undefined);

export const SuccessMessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessageState] = useState<string>("");
  const [variant, setVariant] = useState<string>("success"); // Default variant

  const setMessage = (message: string, variant: string = "success") => {
    setMessageState(message);
    setVariant(variant);
  };

  const clearMessage = () => {
    setMessageState("");
  };

  return (
    <SuccessMessageContext.Provider value={{ message, variant, setMessage, clearMessage }}>
      {children}
    </SuccessMessageContext.Provider>
  );
};

export const useSuccessMessage = () => {
  const context = useContext(SuccessMessageContext);
  if (!context) {
    throw new Error('useSuccessMessage must be used within a SuccessMessageProvider');
  }
  return context;
};
