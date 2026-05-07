import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';
import en from '../translations/en';
import ta from '../translations/ta';
import te from '../translations/te';
import ml from '../translations/ml';
import { theme as themePalette } from '../theme/colors';

const SettingsContext = createContext();

export const translations = {
  English: en,
  Tamil: ta,
  Telugu: te,
  Malayalam: ml,
};

export const SettingsProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');
  const [themeMode, setThemeMode] = useState('system'); // 'light', 'dark', 'system'
  const [currentColors, setCurrentColors] = useState(themePalette.dark);
  const [shakeToScan, setShakeToScan] = useState(true);

  useEffect(() => {
    const updateColors = () => {
      if (themeMode === 'system') {
        const colorScheme = Appearance.getColorScheme();
        setCurrentColors(colorScheme === 'light' ? themePalette.light : themePalette.dark);
      } else {
        setCurrentColors(themePalette[themeMode]);
      }
    };

    updateColors();
    const subscription = Appearance.addChangeListener(updateColors);
    return () => subscription.remove();
  }, [themeMode]);

  const t = (key) => {
    return translations[language][key] || translations['English'][key] || key;
  };

  return (
    <SettingsContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      themeMode, 
      setThemeMode, 
      colors: currentColors,
      isDark: currentColors === themePalette.dark,
      shakeToScan,
      setShakeToScan
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Aliases for backward compatibility
export const LanguageProvider = SettingsProvider;

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const useLanguage = useSettings;
