import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type LanguageCode = 'en' | 'sn' | 'nd';

type Dictionary = Record<string, Record<LanguageCode, string>>;

const dictionary: Dictionary = {
  search_placeholder: {
    en: 'Search for anything on Swumarket...',
    sn: 'Tsvaga chero chinhu paSwumarket...',
    nd: 'Sesha loba yini kuSwumarket...'
  },
  compare_prices: {
    en: 'Compare prices',
    sn: 'Enzanisa mitengo',
    nd: 'Qhathanisa intengo'
  },
  contact: {
    en: 'Contact',
    sn: 'Bata',
    nd: 'Xhumana'
  }
};

interface I18nContextValue {
  lang: LanguageCode;
  setLang: (l: LanguageCode) => void;
  t: (key: keyof typeof dictionary) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<LanguageCode>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('swu_lang_v1');
      if (saved) setLang(saved as LanguageCode);
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('swu_lang_v1', lang); } catch {}
  }, [lang]);
  const value = useMemo<I18nContextValue>(() => ({
    lang,
    setLang,
    t: (key) => dictionary[key]?.[lang] ?? String(key)
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};


