import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptBR from './locales/pt-BR.json';
import enUS from './locales/en-US.json';
import es from './locales/es.json';

// In Cloudflare Workers each request may get a fresh module evaluation,
// so we cannot rely on isInitialized. We call init() every time but
// i18next is idempotent — if already initialized it returns immediately.
i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': { translation: ptBR },
    'en-US': { translation: enUS },
    es:      { translation: es },
  },
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',
  supportedLngs: ['pt-BR', 'en-US', 'es'],
  interpolation: { escapeValue: false },
});

export default i18n;