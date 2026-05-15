'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Play, Cpu, Shield, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const services = {
  es: [
    'Reparación Profesional de PC',
    'Automatización con IA (n8n)',
    'Mantenimiento IT Mensual',
    'Soporte Técnico 24/7'
  ],
  en: [
    'Professional PC Repair',
    'AI Automation (n8n)',
    'Monthly IT Maintenance',
    '24/7 Technical Support'
  ]
};

export default function Hero() {
  const { t, language } = useLanguage();
  const [currentService, setCurrentService] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const currentServices = services[language as keyof typeof services] || services.es;

  // Typing effect
  useEffect(() => {
    const currentWord = currentServices[currentService];
    const typingSpeed = isDeleting ? 30 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          setCurrentService((prev) => (prev + 1) % currentServices.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentService, currentServices]);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0f172a]">
      {/* Background with Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/95 to-[#0f172a]/70" />

        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-[15%] opacity-20"
        >
          <Cpu className="w-16 h-16 text-cyan-400" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-[25%] opacity-15"
        >
          <Shield className="w-12 h-12 text-orange-400" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-1/3 right-[10%] opacity-10"
        >
          <Zap className="w-20 h-20 text-cyan-500" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                {language === 'es' ? 'Servicio Técnico Profesional en NYC' : 'Professional IT Services in NYC'}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="text-white">
                  {language === 'es' ? 'Tu Negocio' : 'Your Business'}
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-orange-400 bg-clip-text text-transparent min-h-[1.2em] inline-block">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>

              <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
                {language === 'es'
                  ? 'Reparación de PC desde '
                  : 'PC Repair from '}
                <span className="text-cyan-400 font-semibold">$79</span>,
                {language === 'es'
                  ? ' automatización con IA desde '
                  : ', AI automation from '}
                <span className="text-orange-400 font-semibold">$350</span>.
                <br />
                {language === 'es'
                  ? 'Servicio confiable para pequeñas empresas hispanas en '
                  : 'Reliable service for Hispanic small businesses in '}
                <span className="text-white font-medium">NYC {language === 'es' ? 'y' : 'and'} Long Island</span>.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1"
              >
                {language === 'es' ? 'Agendar Servicio' : 'Schedule Service'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={scrollToServices}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-800/80 border border-slate-600 text-white font-semibold rounded-xl hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300"
              >
                <Play className="w-5 h-5 text-cyan-400" />
                {language === 'es' ? 'Ver Servicios' : 'View Services'}
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-slate-900"
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-400">
                  {language === 'es' ? '+500 clientes' : '+500 clients'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <span className="text-sm text-slate-400">4.8/5</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Main Image Card */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop"
                  alt={language === 'es' ? 'Técnico profesional reparando computadora' : 'Professional technician repairing computer'}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

                {/* Stats Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: '500+', label: language === 'es' ? 'PCs Reparadas' : 'PCs Fixed' },
                      { value: '127', label: language === 'es' ? 'Clientes Felices' : 'Happy Clients' },
                      { value: '5+', label: language === 'es' ? 'Años Experiencia' : 'Years Experience' }
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-slate-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {language === 'es' ? 'Diagnóstico Gratis' : 'Free Diagnosis'}
                    </div>
                    <div className="text-xs text-slate-400">
                      {language === 'es' ? 'En todos los servicios' : 'On all services'}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {language === 'es' ? 'Garantía 30 Días' : '30-Day Warranty'}
                    </div>
                    <div className="text-xs text-slate-400">
                      {language === 'es' ? 'En todas las reparaciones' : 'On all repairs'}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-sm">
            {language === 'es' ? 'Desplaza para ver más' : 'Scroll to see more'}
          </span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
