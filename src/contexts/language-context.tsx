'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Language, LocaleMessages, Translations } from '@/types';

import enMessages from '@/locales/en.json';
import ruMessages from '@/locales/ru.json';
import uzMessages from '@/locales/uz.json';

const messages: LocaleMessages = {
  en: enMessages as Translations,
  ru: ruMessages as Translations,
  uz: uzMessages as Translations,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string, replacements?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('linguaCart-language') as Language | null;
    if (storedLang && messages[storedLang]) {
      setLanguageState(storedLang);
    }
    // Add logic here to get suggested language if needed on initial load,
    // or handle it in a separate component.
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    if (messages[lang]) {
      setLanguageState(lang);
      localStorage.setItem('linguaCart-language', lang);
    } else {
      console.warn(`Language ${lang} not supported. Falling back to English.`);
      setLanguageState('en');
      localStorage.setItem('linguaCart-language', 'en');
    }
  }, []);

  const translate = useCallback(
    (key: string, replacements?: Record<string, string>): string => {
      const keys = key.split('.');
      let current: string | Translations | undefined = messages[language];

      for (const k of keys) {
        if (typeof current === 'object' && current !== null && k in current) {
          current = current[k] as string | Translations;
        } else {
          current = undefined;
          break;
        }
      }
      
      let result = typeof current === 'string' ? current : key;

      if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
          result = result.replace(`{${placeholder}}`, replacements[placeholder]);
        });
      }
      
      return result;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
