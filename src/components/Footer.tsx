'use client';

import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Logo y descripción */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <motion.div
              className="flex items-center mb-4"
            >
              <span className="text-xl font-bold text-blue-400 mr-2">
                CELC Systems
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm max-w-xs"
            >
              {t.footer?.description || 'Soluciones tecnológicas integrales para pequeñas empresas en NYC y Long Island. PC repair, automatización IA y mantenimiento mensual.'}
            </motion.p>
          </motion.div>

          {/* Enlaces de navegación */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-white mb-4">
              {t.footer?.quickLinks || 'Enlaces Rápidos'}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white transition-colors duration-200">
                  {t.nav?.home || 'Inicio'}
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-white transition-colors duration-200">
                  {t.nav?.services || 'Servicios'}
                </a>
              </li>
              <li>
                <a href="/#portfolio" className="hover:text-white transition-colors duration-200">
                  {t.nav?.portfolio || 'Portafolio'}
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-white transition-colors duration-200">
                  {t.nav?.contact || 'Contacto'}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Servicios */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-white mb-4">
              {t.footer?.services || 'Nuestros Servicios'}
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white transition-colors duration-200">
                  {t.services?.items?.[0]?.title || 'Reparación de PC'}
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors duration-200">
                  {t.services?.items?.[1]?.title || 'Automatización IA'}
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors duration-200">
                  {t.services?.items?.[2]?.title || 'Mantenimiento Mensual'}
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors duration-200">
                  {t.services?.items?.[3]?.title || 'Ayuda Remota'}
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Redes sociales */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-white mb-4">
              {t.footer?.social || 'Síguenos'}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/celcsystems"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-blue-600 rounded-full transition-colors duration-200"
              >
                <FaFacebook className="text-xl text-gray-300 hover:text-white" />
              </a>
              <a
                href="https://instagram.com/celcsystems"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-pink-600 rounded-full transition-colors duration-200"
              >
                <FaInstagram className="text-xl text-gray-300 hover:text-white" />
              </a>
              <a
                href="https://wa.me/19291234567"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactanos por WhatsApp"
                className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-green-600 rounded-full transition-colors duration-200"
              >
                <FaWhatsapp className="text-xl text-gray-300 hover:text-white" />
              </a>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-white mb-2 text-sm">{t.footer?.contact || 'Contacto'}</h4>
              <p className="text-sm text-gray-400">info@celcsystems.com</p>
              <p className="text-sm text-gray-400">NYC - Long Island</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <motion.p
            variants={itemVariants}
            className="text-center text-sm text-gray-500"
          >
            © {new Date().getFullYear()} {t.footer?.copyright || 'CELC Systems. Todos los derechos reservados.'}
          </motion.p>
        </div>
      </motion.div>
    </footer>
  );
}
