'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Rocket, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';

interface NavbarProps { onBlogClick: () => void; }

export default function Navbar({ onBlogClick }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
    if (prefersDark) document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setShowLangDropdown(false);
    if (showLangDropdown) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showLangDropdown]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: t.nav.services, href: '#services' },
    { name: t.nav.process, href: '#process' },
    { name: t.nav.portfolio, href: '#portfolio' },
    { name: t.nav.pricing, href: '#pricing' },
    { name: t.nav.contact, href: '#contact' },
    { name: t.nav.blog, href: '#blog', isBlog: true },
  ];

  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-40 transition-all duration-300', isScrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-700/50' : 'bg-transparent')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">C</div>
            CELC Systems
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => link.isBlog ? (
              <button key={link.name} onClick={onBlogClick} className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">{link.name}</button>
            ) : (
              <a key={link.name} href={link.href} className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">{link.name}</a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setShowLangDropdown(!showLangDropdown); }} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <Globe size={15} /><span className="uppercase">{language}</span>
              </button>
              <AnimatePresence>
                {showLangDropdown && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }} className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => { setLanguage('en'); setShowLangDropdown(false); }} className={cn('w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors', language === 'en' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700')}>🇺🇸 English</button>
                    <button onClick={() => { setLanguage('es'); setShowLangDropdown(false); }} className={cn('w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors', language === 'es' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700')}>🇪🇸 Español</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              <Rocket size={14} />{t.nav.getStarted}
            </a>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" aria-label="Toggle menu">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => link.isBlog ? (
                <button key={link.name} onClick={() => { onBlogClick(); setIsMobileMenuOpen(false); }} className="text-left px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">{link.name}</button>
              ) : (
                <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">{link.name}</a>
              ))}
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                <Rocket size={14} />{t.nav.getStarted}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}