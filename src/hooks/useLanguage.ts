import { useState, useEffect } from 'react';

export type Language = 'en' | 'es';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language || 'en';
    setLanguage(savedLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    // Force re-render by updating the state immediately
    window.location.reload();
  };

  return { language, toggleLanguage };
};