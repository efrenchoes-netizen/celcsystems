'use client';

import React, { createContext, useContext, useState } from 'react';

type Lang = 'es' | 'en';
interface LangCtx { language: Lang; setLanguage: (l: Lang) => void; t: any; }

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
      getStarted: 'Empezar' 
    },
    hero: { 
      badge: '🚀 Tecnología para tu negocio', 
      title: 'Soluciones IT para', 
      words: ['Negocios Hispanos', 'Pequeñas Empresas', 'NYC y Long Island', 'Tu Empresa'], 
      description: 'Reparación de PCs, automatización con IA y mantenimiento mensual para pequeñas empresas en NYC y Long Island.', 
      ctaStart: 'Comenzar ahora', 
      ctaServices: 'Ver servicios',
      videoCta: 'Ver video'
    },
    stats: {
      clients: 'Clientes',
      pcs: 'PCs Reparados',
      satisfaction: 'Satisfacción',
      years: 'Años de Experiencia'
    },
    services: {
      badge: 'Nuestros Servicios',
      title: '¿Qué hacemos?',
      subtitle: 'Soluciones tecnológicas completas para tu negocio',
      items: [
        { title: 'Reparación de PC', description: 'Diagnóstico, limpieza y reparación de computadoras de escritorio y laptops.', price: '$79–$99' },
        { title: 'Automatización IA', description: 'Flujos automáticos con n8n para emails, formularios y tareas repetitivas.', price: 'Desde $350' },
        { title: 'Mantenimiento Mensual', description: 'Monitoreo continuo, actualizaciones y respaldos automáticos cada mes.', price: '$149/mes' },
        { title: 'Ayuda Remota', description: 'Soporte técnico remoto para resolver problemas desde cualquier lugar.', price: '$40/hr' },
      ],
    },
    process: {
      badge: 'Cómo Trabajamos',
      title: 'Nuestro Proceso',
      subtitle: 'Sencillo, rápido y transparente',
      steps: [
        { title: '1. Diagnóstico', description: 'Evaluamos tu problema sin costo' },
        { title: '2. Propuesta', description: 'Te damos un presupuesto claro' },
        { title: '3. Ejecución', description: 'Resolvemos en 24-48 horas' },
        { title: '4. Soporte', description: 'Seguimiento post-servicio' }
      ]
    },
    portfolio: {
      badge: 'Nuestro Trabajo',
      title: 'Proyectos Realizados',
      subtitle: 'Casos de éxito de nuestros clientes'
    },
    pricing: {
      title: 'Calculadora de Precios',
      subtitle: 'Selecciona los servicios que necesitas y obtén un presupuesto personalizado',
      total: 'Total estimado',
      cta: 'Solicitar servicio'
    },
    contact: {
      badge: 'Contáctanos',
      title: '¿Listo para empezar?',
      subtitle: 'Escríbenos y te respondemos en menos de 24 horas',
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono',
      message: 'Mensaje',
      submit: 'Enviar mensaje',
      success: '¡Mensaje enviado! Te contactaremos pronto.',
      location: 'Nueva York - Long Island',
      emailLabel: 'Email',
      phoneLabel: 'Teléfono'
    },
    footer: {
      description: 'Soluciones tecnológicas integrales para pequeñas empresas en NYC y Long Island. PC repair, automatización IA y mantenimiento mensual.',
      quickLinks: 'Enlaces Rápidos',
      services: 'Nuestros Servicios',
      social: 'Síguenos',
      contact: 'Contacto',
      copyright: 'CELC Systems. Todos los derechos reservados.'
    },
    chat: { 
      title: 'Asistente CELC', 
      welcome: '¡Hola! 👋 Soy el asistente de CELC Systems. ¿En qué puedo ayudarte hoy?', 
      placeholder: 'Escribe tu pregunta...' 
    },
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
      getStarted: 'Get Started' 
    },
    hero: { 
      badge: '🚀 Technology for your business', 
      title: 'IT Solutions for', 
      words: ['Hispanic Businesses', 'Small Businesses', 'NYC & Long Island', 'Your Company'], 
      description: 'PC repair, AI automation and monthly maintenance for small businesses in NYC and Long Island.', 
      ctaStart: 'Get started', 
      ctaServices: 'View services',
      videoCta: 'Watch video'
    },
    stats: {
      clients: 'Clients',
      pcs: 'PCs Fixed',
      satisfaction: 'Satisfaction',
      years: 'Years Experience'
    },
    services: {
      badge: 'Our Services',
      title: 'What We Do',
      subtitle: 'Complete tech solutions for your business',
      items: [
        { title: 'PC Repair', description: 'Diagnosis, cleaning and repair of desktop computers and laptops.', price: '$79–$99' },
        { title: 'AI Automation', description: 'Automatic workflows with n8n for emails, forms and repetitive tasks.', price: 'From $350' },
        { title: 'Monthly Maintenance', description: 'Continuous monitoring, updates and automatic backups every month.', price: '$149/mo' },
        { title: 'Remote Help', description: 'Remote tech support to solve problems from anywhere.', price: '$40/hr' },
      ],
    },
    process: {
      badge: 'How We Work',
      title: 'Our Process',
      subtitle: 'Simple, fast and transparent',
      steps: [
        { title: '1. Diagnosis', description: 'We evaluate your problem at no cost' },
        { title: '2. Proposal', description: 'Clear quote provided' },
        { title: '3. Execution', description: 'Resolved in 24-48 hours' },
        { title: '4. Support', description: 'Post-service follow-up' }
      ]
    },
    portfolio: {
      badge: 'Our Work',
      title: 'Completed Projects',
      subtitle: 'Success stories from our clients'
    },
    pricing: {
      title: 'Pricing Calculator',
      subtitle: 'Select the services you need and get a custom quote',
      total: 'Estimated total',
      cta: 'Request service'
    },
    contact: {
      badge: 'Contact Us',
      title: 'Ready to start?',
      subtitle: 'Write us and we will respond in less than 24 hours',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      submit: 'Send message',
      success: 'Message sent! We will contact you soon.',
      location: 'New York - Long Island',
      emailLabel: 'Email',
      phoneLabel: 'Phone'
    },
    footer: {
      description: 'Complete technology solutions for small businesses in NYC and Long Island. PC repair, AI automation and monthly maintenance.',
      quickLinks: 'Quick Links',
      services: 'Our Services',
      social: 'Follow Us',
      contact: 'Contact',
      copyright: 'CELC Systems. All rights reserved.'
    },
    chat: { 
      title: 'CELC Assistant', 
      welcome: "Hi! 👋 I'm the CELC Systems assistant. How can I help you today?", 
      placeholder: 'Type your question...' 
    },
  },
};

const LangContext = createContext<LangCtx>({} as LangCtx);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Lang>('es');
  return (
    <LangContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() { return useContext(LangContext); }
