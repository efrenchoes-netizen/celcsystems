'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, PlayCircle, Mail, Bot, CheckCircle, Monitor } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const words = t.hero?.words || ['Negocios', 'Empresas', 'PCs', 'Tu Negocio'];

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              className="text-center lg:text-left"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 0.2 }} 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6"
              >
                <Rocket size={14} />
                {t.hero?.badge || 'Tecnología para tu negocio'}
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                {t.hero?.title || 'Soluciones IT para'}<br />
                <span className="text-blue-600 dark:text-blue-400 min-h-[1.2em] inline-block">
                  {text}<span className="animate-pulse">|</span>
                </span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0">
                {t.hero?.description || 'Reparación de PCs, automatización con IA y mantenimiento mensual para pequeñas empresas en NYC y Long Island.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
                >
                  <Rocket size={18} />{t.hero?.ctaStart || 'Comenzar ahora'}
                </a>
                <a 
                  href="#services" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <PlayCircle size={18} />{t.hero?.ctaServices || 'Ver servicios'}
                </a>
              </div>

              {/* Video CTA */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setShowVideoModal(true)}
                className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <PlayCircle size={20} />
                </div>
                {t.hero?.videoCta || 'Ver video: Cuidado de tu PC'}
              </motion.button>
            </motion.div>

            {/* Right content - Workflow cards */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }} 
              className="hidden lg:flex flex-col gap-4"
            >
              {[
                { icon: <Mail size={20} className="text-blue-600" />, title: 'Nueva Consulta', desc: 'Cliente envía mensaje', color: 'bg-blue-500/10' },
                { icon: <Bot size={20} className="text-orange-600" />, title: 'IA Categoriza', desc: 'Automáticamente clasificado', color: 'bg-orange-500/10' },
                { icon: <CheckCircle size={20} className="text-purple-600" />, title: 'Respuesta Inmediata', desc: 'El cliente recibe respuesta', color: 'bg-purple-500/10' },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 0.4 + i * 0.15 }} 
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>{item.icon}</div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{item.title}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">{item.desc}</p>
                  </div>
                  {i < 2 && <div className="ml-auto w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"><CheckCircle size={12} className="text-green-600" /></div>}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-4xl w-full aspect-video bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <video 
              controls 
              autoPlay 
              className="w-full h-full"
              poster="/celc-poster.jpg"
            >
              <source src="/celc-video-pro.mp4" type="video/mp4" />
              Tu navegador no soporta el tag de video.
            </video>
            <button 
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
