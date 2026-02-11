import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  
  useEffect(() => {
    // Detectar idioma del navegador
    const browserLang = navigator.language.split('-')[0];
    const storedLang = localStorage.getItem('VeriSource-hub-language');
    
    if (storedLang && translations[storedLang]) {
      setCurrentLanguage(storedLang);
    } else if (translations[browserLang]) {
      setCurrentLanguage(browserLang);
    } else {
      setCurrentLanguage('es'); // fallback a español
    }
  }, []);
  
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setCurrentLanguage(lang);
      localStorage.setItem('VeriSource-hub-language', lang);
      
      // Actualizar el HTML lang attribute
      document.documentElement.lang = lang;
    }
  };
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    // Fallback a inglés si no existe la traducción
    if (!value) {
      let fallbackValue = translations['en'];
      for (const k of keys) {
        fallbackValue = fallbackValue?.[k];
      }
      return fallbackValue || key;
    }
    
    return value;
  };
  
  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};