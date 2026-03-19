import React, { createContext, useState, useContext } from 'react';
import en from '../translations/en';
import ta from '../translations/ta';
import te from '../translations/te';
import ml from '../translations/ml';

const LanguageContext = createContext();

export const translations = {
  English: en,
  Tamil: ta,
  Telugu: te,
  Malayalam: ml,
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');

  const t = (key) => {
    return translations[language][key] || translations['English'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
