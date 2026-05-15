'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Zap, Shield, Headphones, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const serviceImages = {
  repair: 'https://images.unsplash.com/photo-1591799264318-7e6f9b8365b6?q=80&w=800&auto=format&fit=crop',
  automation: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  maintenance: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=800&auto=format&fit=crop',
  remote: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
};

const servicesData = {
  es: [
    {
      id: 'repair',
      title: 'Reparación de PC',
      description: 'Diagnóstico completo, limpieza profunda, reemplazo de componentes y optimización del sistema operativo.',
      price: '$79–$99',
      features: ['Diagnóstico gratuito', 'Garantía 30 días', 'A domicilio'],
      image: serviceImages.repair,
      icon: Monitor,
    },
    {
      id: 'automation',
      title: 'Automatización IA',
      description: 'Configuración de flujos automáticos con n8n: emails, formularios, CRMs y tareas repetitivas.',
      price: 'Desde $350',
      features: ['Setup inicial', 'Integración apps', 'Mantenimiento'],
      image: serviceImages.automation,
      icon: Zap,
    },
    {
      id: 'maintenance',
      title: 'Mantenimiento Mensual',
      description: 'Monitoreo continuo 24/7, actualizaciones de seguridad, respaldos automáticos y soporte prioritario.',
      price: '$149/mes',
      features: ['Monitoreo 24/7', 'Respaldos cloud', 'Soporte prioritario'],
      image: serviceImages.maintenance,
      icon: Shield,
    },
    {
      id: 'remote',
      title: 'Ayuda Remota',
      description: 'Soporte técnico remoto inmediato para resolver problemas desde cualquier lugar sin desplazamiento.',
      price: '$40/hr',
      features: ['Respuesta inmediata', 'Sin desplazamiento', 'Horario flexible'],
      image: serviceImages.remote,
      icon: Headphones,
    },
  ],
  en: [
    {
      id: 'repair',
      title: 'PC Repair',
      description: 'Complete diagnosis, deep cleaning, component replacement, and OS optimization.',
      price: '$79–$99',
      features: ['Free diagnosis', '30-day warranty', 'On-site service'],
      image: serviceImages.repair,
      icon: Monitor,
    },
    {
      id: 'automation',
      title: 'AI Automation',
      description: 'n8n workflow automation setup: emails, forms, CRMs, and repetitive tasks.',
      price: 'From $350',
      features: ['Initial setup', 'App integration', 'Maintenance'],
      image: serviceImages.automation,
      icon: Zap,
    },
    {
      id: 'maintenance',
      title: 'Monthly Maintenance',
      description: '24/7 continuous monitoring, security updates, automatic backups, and priority support.',
      price: '$149/mo',
      features: ['24/7 monitoring', 'Cloud backups', 'Priority support'],
      image: serviceImages.maintenance,
      icon: Shield,
    },
    {
      id: 'remote',
      title: 'Remote Support',
      description: 'Immediate remote technical support to solve problems from anywhere without travel.',
      price: '$40/hr',
      features: ['Immediate response', 'No travel needed', 'Flexible hours'],
      image: serviceImages.remote,
      icon: Headphones,
    },
  ],
};

export default function Services() {
  const { language } = useLanguage();
  const services = servicesData[language as keyof typeof servicesData] || servicesData.es;

  return (
    <section id="services" className="py-24 bg-[#0f172a] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            {language === 'es' ? 'Nuestros Servicios' : 'Our Services'}
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {language === 'es' ? 'Soluciones Tecnológicas ' : 'Technology Solutions '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {language === 'es' ? 'Completas' : 'Complete'}
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Desde reparaciones básicas hasta automatización avanzada con IA'
              : 'From basic repairs to advanced AI automation'}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="lg:w-2/5 h-48 lg:h-auto relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-transparent lg:bg-gradient-to-t" />

                    {/* Icon overlay */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-cyan-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-cyan-500/30">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {service.title}
                        </h3>
                        <span className="text-xl font-bold text-orange-400">
                          {service.price}
                        </span>
                      </div>

                      <p className="text-slate-400 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.features.map((feature, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors group/link"
                    >
                      {language === 'es' ? 'Más información' : 'Learn more'}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 mb-6">
            {language === 'es'
              ? '¿No encuentras lo que buscas? Contáctanos para soluciones personalizadas'
              : "Don't find what you need? Contact us for custom solutions"}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1"
          >
            {language === 'es' ? 'Consulta Gratuita' : 'Free Consultation'}
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
