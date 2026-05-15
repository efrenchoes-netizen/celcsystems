'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calculator, Monitor, Zap, Shield, Headphones, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: any;
  features: string[];
}

const servicesData = {
  es: [
    {
      id: 'repair',
      title: 'Reparación de PC',
      description: 'Diagnóstico y reparación completa',
      price: '$79–$99',
      icon: Monitor,
      features: ['Diagnóstico gratuito', 'Limpieza incluida', 'Garantía 30 días']
    },
    {
      id: 'automation',
      title: 'Automatización IA',
      description: 'Flujos automáticos con n8n',
      price: 'Desde $350',
      icon: Zap,
      features: ['Setup inicial incluido', 'Integraciones ilimitadas', 'Soporte 24/7']
    },
    {
      id: 'maintenance',
      title: 'Mantenimiento Mensual',
      description: 'Monitoreo y soporte continuo',
      price: '$149/mes',
      icon: Shield,
      features: ['Monitoreo 24/7', 'Respaldos automáticos', 'Soporte prioritario']
    },
    {
      id: 'remote',
      title: 'Soporte Remoto',
      description: 'Ayuda inmediata a distancia',
      price: '$40/hr',
      icon: Headphones,
      features: ['Respuesta inmediata', 'Sin desplazamiento', 'Facturación por minuto']
    }
  ],
  en: [
    {
      id: 'repair',
      title: 'PC Repair',
      description: 'Complete diagnosis and repair',
      price: '$79–$99',
      icon: Monitor,
      features: ['Free diagnosis', 'Cleaning included', '30-day warranty']
    },
    {
      id: 'automation',
      title: 'AI Automation',
      description: 'Automated workflows with n8n',
      price: 'From $350',
      icon: Zap,
      features: ['Initial setup included', 'Unlimited integrations', '24/7 support']
    },
    {
      id: 'maintenance',
      title: 'Monthly Maintenance',
      description: 'Continuous monitoring and support',
      price: '$149/mo',
      icon: Shield,
      features: ['24/7 monitoring', 'Automatic backups', 'Priority support']
    },
    {
      id: 'remote',
      title: 'Remote Support',
      description: 'Immediate remote assistance',
      price: '$40/hr',
      icon: Headphones,
      features: ['Immediate response', 'No travel needed', 'Per-minute billing']
    }
  ]
};

export default function PricingCalculator() {
  const { language } = useLanguage();
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());

  const services = servicesData[language as keyof typeof servicesData] || servicesData.es;

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (!service) return;

      switch (serviceId) {
        case 'repair':
          total += 89; // Average price
          break;
        case 'automation':
          total += 350; // Base setup
          break;
        case 'maintenance':
          total += 149;
          break;
        case 'remote':
          total += 40; // 1 hour
          break;
      }
    });
    return total;
  };

  return (
    <section id="pricing" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
            <Calculator className="w-4 h-4" />
            {language === 'es' ? 'Calculadora de Precios' : 'Pricing Calculator'}
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {language === 'es' ? 'Calcula tu ' : 'Calculate Your '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {language === 'es' ? 'Presupuesto' : 'Quote'}
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Selecciona los servicios que necesitas y obtén un estimado instantáneo'
              : 'Select the services you need and get an instant estimate'}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isSelected = selectedServices.has(service.id);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleService(service.id)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  {/* Selection indicator */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-4 transition-colors ${
                    isSelected ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600'
                  }`}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700/50 text-slate-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
                  <p className="text-slate-400 text-sm mb-3">{service.description}</p>
                  <p className={`text-xl font-bold ${isSelected ? 'text-cyan-400' : 'text-orange-400'}`}>
                    {service.price}
                  </p>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Services Summary */}
        <AnimatePresence>
          {selectedServices.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-slate-400 mb-1">
                    {language === 'es' ? 'Servicios seleccionados:' : 'Selected services:'}
                    <span className="text-white font-medium ml-2">{selectedServices.size}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Array.from(selectedServices).map(serviceId => {
                      const service = services.find(s => s.id === serviceId);
                      return service ? (
                        <span
                          key={serviceId}
                          className="px-3 py-1 text-sm text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/30"
                        >
                          {service.title}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-slate-400 text-sm mb-1">
                    {language === 'es' ? 'Estimado total:' : 'Estimated total:'}
                  </p>
                  <p className="text-4xl font-bold text-white">
                    ${calculateTotal()}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  {language === 'es' ? 'Solicitar Presupuesto Detallado' : 'Request Detailed Quote'}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          {language === 'es'
            ? '* Los precios son estimados. El costo final puede variar según el diagnóstico específico.'
            : '* Prices are estimates. Final cost may vary based on specific diagnosis.'}
        </motion.p>
      </div>
    </section>
  );
}
