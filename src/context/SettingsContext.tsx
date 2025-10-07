import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface Settings {
  voiceEnabled: boolean;
  signLanguageEnabled: boolean;
}

interface SettingsContextValue extends Settings {
  setVoiceEnabled: (v: boolean) => void;
  setSignLanguageEnabled: (v: boolean) => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

const STORAGE_KEY = 'swu_settings_v1';

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [signLanguageEnabled, setSignLanguageEnabled] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setVoiceEnabled(!!parsed.voiceEnabled);
        setSignLanguageEnabled(!!parsed.signLanguageEnabled);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ voiceEnabled, signLanguageEnabled }));
    } catch {}
  }, [voiceEnabled, signLanguageEnabled]);

  const value = useMemo<SettingsContextValue>(() => ({
    voiceEnabled,
    signLanguageEnabled,
    setVoiceEnabled,
    setSignLanguageEnabled
  }), [voiceEnabled, signLanguageEnabled]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
};


