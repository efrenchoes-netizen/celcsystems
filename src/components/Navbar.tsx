'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.lang-dropdown')) {
        setShowLangDropdown(false);
      }
    };
    if (showLangDropdown) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showLangDropdown]);

  const navLinks = [
    { name: t.nav?.services || 'Servicios', href: '#services' },
    { name: t.nav?.process || 'Proceso', href: '#process' },
    { name: t.nav?.portfolio || 'Portafolio', href: '#portfolio' },
    { name: t.nav?.pricing || 'Precios', href: '#pricing' },
    { name: t.nav?.contact || 'Contacto', href: '#contact' },
  ];

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-[#0f172a]/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow">
                C
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg leading-tight">CELC Systems</span>
                <span className="text-xs text-slate-400 hidden sm:block">IT Solutions NYC</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-slate-800/50 transition-all duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="relative lang-dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLangDropdown(!showLangDropdown);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300"
                >
                  <Globe className="w-4 h-4" />
                  <span className="uppercase">{language}</span>
                </button>

                <AnimatePresence>
                  {showLangDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-40 bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as 'es' | 'en');
                            setShowLangDropdown(false);
                          }}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200',
                            language === lang.code
                              ? 'bg-cyan-500/20 text-cyan-400'
                              : 'text-slate-300 hover:bg-slate-700'
                          )}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                {t.nav?.getStarted || 'Contáctanos'}
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 bg-[#0f172a]/98 backdrop-blur-xl border-b border-slate-700/50 lg:hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="block px-4 py-3 text-lg font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-xl transition-all duration-300"
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Language Options Mobile */}
              <div className="pt-4 border-t border-slate-700/50 mt-4">
                <p className="px-4 text-sm text-slate-500 mb-2">{language === 'es' ? 'Idioma' : 'Language'}</p>
                <div className="flex gap-2 px-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as 'es' | 'en');
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                        language === lang.code
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'text-slate-400 hover:bg-slate-800'
                      )}
                    >
                      <span>{lang.flag}</span>
                      <span className="uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-2 mt-6 px-4 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl"
              >
                <Phone className="w-5 h-5" />
                {t.nav?.getStarted || 'Contáctanos'}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
