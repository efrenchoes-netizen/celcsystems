'use client';

import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    es: {
      quickLinks: 'Enlaces Rápidos',
      services: 'Servicios',
      contact: 'Contacto',
      followUs: 'Síguenos',
      rights: 'Todos los derechos reservados.'
    },
    en: {
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      followUs: 'Follow Us',
      rights: 'All rights reserved.'
    }
  };

  const links = footerLinks[language as keyof typeof footerLinks] || footerLinks.es;

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <span className="text-xl font-bold text-white">CELC Systems</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              {language === 'es'
                ? 'Soluciones tecnológicas profesionales para pequeñas empresas en NYC y Long Island.'
                : 'Professional technology solutions for small businesses in NYC and Long Island.'}
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaFacebook, href: 'https://facebook.com/celcsystems', color: 'hover:bg-blue-600' },
                { icon: FaInstagram, href: 'https://instagram.com/celcsystems', color: 'hover:bg-pink-600' },
                { icon: FaWhatsapp, href: 'https://wa.me/15168007626', color: 'hover:bg-green-600' },
                { icon: FaLinkedin, href: 'https://linkedin.com/company/celcsystems', color: 'hover:bg-blue-700' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-slate-800 ${social.color} rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-6">{links.quickLinks}</h3>
            <ul className="space-y-3">
              {[
                { name: language === 'es' ? 'Inicio' : 'Home', href: '#' },
                { name: language === 'es' ? 'Servicios' : 'Services', href: '#services' },
                { name: language === 'es' ? 'Portafolio' : 'Portfolio', href: '#portfolio' },
                { name: language === 'es' ? 'Precios' : 'Pricing', href: '#pricing' },
                { name: language === 'es' ? 'Contacto' : 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-6">{links.services}</h3>
            <ul className="space-y-3">
              {[
                language === 'es' ? 'Reparación de PC' : 'PC Repair',
                language === 'es' ? 'Automatización IA' : 'AI Automation',
                language === 'es' ? 'Mantenimiento Mensual' : 'Monthly Maintenance',
                language === 'es' ? 'Soporte Remoto' : 'Remote Support',
                language === 'es' ? 'Recuperación de Datos' : 'Data Recovery',
              ].map((service) => (
                <li key={service}>
                  <span className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-6">{links.contact}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 mt-0.5" />
                <span className="text-slate-400">info@celcsystems.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 mt-0.5" />
                <span className="text-slate-400">+1 (516) 800-7626</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 mt-0.5" />
                <span className="text-slate-400">Massapequa, NY<br />NYC & Long Island</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} CELC Systems. {links.rights}
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group"
            >
              <span className="text-sm">{language === 'es' ? 'Volver arriba' : 'Back to top'}</span>
              <div className="w-8 h-8 bg-slate-800 group-hover:bg-cyan-500/20 rounded-lg flex items-center justify-center transition-colors">
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
