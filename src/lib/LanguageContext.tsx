'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'es' | 'en';

interface LangCtx {
  language: Lang;
  setLanguage: (l: Lang) => void;
  t: any;
}

const translations = {
  es: {
    nav: {
      services: 'Servicios',
      process: 'Proceso',
      portfolio: 'Portafolio',
      pricing: 'Precios',
      contact: 'Contacto',
      blog: 'Blog',
      home: 'Inicio',
      getStarted: 'Contáctanos'
    },
    hero: {
      badge: 'Servicio Técnico Profesional en NYC',
      title: 'Tu Negocio',
      description: 'Reparación de PC, automatización con IA y mantenimiento mensual para pequeñas empresas en NYC y Long Island.',
      ctaStart: 'Agendar Servicio',
      ctaServices: 'Ver Servicios',
      stats: {
        clients: '+500 clientes',
        rating: '4.8/5 estrellas'
      }
    },
    services: {
      badge: 'Nuestros Servicios',
      title: '¿Qué hacemos?',
      subtitle: 'Soluciones tecnológicas completas para tu negocio'
    },
    process: {
      badge: 'Cómo Trabajamos',
      title: 'Nuestro Proceso',
      steps: [
        { title: '1. Diagnóstico', description: 'Evaluamos tu problema sin costo' },
        { title: '2. Propuesta', description: 'Te damos un presupuesto claro' },
        { title: '3. Ejecución', description: 'Resolvemos en 24-48 horas' },
        { title: '4. Soporte', description: 'Seguimiento post-servicio' }
      ]
    },
    contact: {
      badge: 'Contáctanos',
      title: '¿Listo para empezar?',
      subtitle: 'Escríbenos y te respondemos en menos de 24 horas'
    },
    footer: {
      copyright: 'CELC Systems. Todos los derechos reservados.'
    }
  },
  en: {
    nav: {
      services: 'Services',
      process: 'Process',
      portfolio: 'Portfolio',
      pricing: 'Pricing',
      contact: 'Contact',
      blog: 'Blog',
      home: 'Home',
      getStarted: 'Contact Us'
    },
    hero: {
      badge: 'Professional IT Services in NYC',
      title: 'Your Business',
      description: 'PC repair, AI automation and monthly maintenance for small businesses in NYC and Long Island.',
      ctaStart: 'Schedule Service',
      ctaServices: 'View Services',
      stats: {
        clients: '+500 clients',
        rating: '4.8/5 stars'
      }
    },
    services: {
      badge: 'Our Services',
      title: 'What We Do',
      subtitle: 'Complete technology solutions for your business'
    },
    process: {
      badge: 'How We Work',
      title: 'Our Process',
      steps: [
        { title: '1. Diagnosis', description: 'We evaluate your problem at no cost' },
        { title: '2. Proposal', description: 'Clear quote provided' },
        { title: '3. Execution', description: 'Resolved in 24-48 hours' },
        { title: '4. Support', description: 'Post-service follow-up' }
      ]
    },
    contact: {
      badge: 'Contact Us',
      title: 'Ready to start?',
      subtitle: 'Write us and we will respond in less than 24 hours'
    },
    footer: {
      copyright: 'CELC Systems. All rights reserved.'
    }
  }
};

const LangContext = createContext<LangCtx>({
  language: 'es',
  setLanguage: () => {},
  t: translations.es
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Detect browser language on mount
  const [language, setLanguage] = useState<Lang>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage first
    const savedLang = localStorage.getItem('celc-language') as Lang;
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguage(savedLang);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      const detectedLang: Lang = browserLang.startsWith('en') ? 'en' : 'es';
      setLanguage(detectedLang);
    }
  }, []);

  // Save to localStorage when language changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('celc-language', language);
      // Update HTML lang attribute
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const handleSetLanguage = (lang: Lang) => {
    setLanguage(lang);
  };

  return (
    <LangContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t: translations[language] }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
