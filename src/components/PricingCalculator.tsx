'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

interface Service {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  basePrice?: number;
  maxPrice?: number;
  monthlyPrice?: number;
  maxMonthlyPrice?: number;
  hourlyRate?: number;
}

export default function PricingCalculator() {
  const { t } = useLanguage();
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());

  // Service data based on the requirements
  const services: Service[] = [
    {
      id: 'pc-repair',
      title: t.services?.items?.[0]?.title || 'PC Repair',
      description: t.services?.items?.[0]?.description || 'Diagnostic, cleaning and repair',
      priceRange: t.services?.items?.[0]?.price || '$79-$99',
      basePrice: 79,
      maxPrice: 99
    },
    {
      id: 'ai-automation',
      title: t.services?.items?.[1]?.title || 'AI Automation',
      description: t.services?.items?.[1]?.description || 'Automatic workflows with n8n',
      priceRange: t.services?.items?.[1]?.price || 'Desde $350',
      basePrice: 350,
      monthlyPrice: 199,
      maxMonthlyPrice: 249
    },
    {
      id: 'monthly-maintenance',
      title: t.services?.items?.[2]?.title || 'Monthly Maintenance',
      description: t.services?.items?.[2]?.description || 'Monitoring, updates and backups',
      priceRange: t.services?.items?.[2]?.price || '$149/mo',
      monthlyPrice: 149
    },
    {
      id: 'remote-help',
      title: t.services?.items?.[3]?.title || 'Remote Help',
      description: t.services?.items?.[3]?.description || 'Remote tech support',
      priceRange: t.services?.items?.[3]?.price || '$40/hr',
      hourlyRate: 40
    }
  ];

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (!service) return;

      if (service.id === 'pc-repair' && service.basePrice && service.maxPrice) {
        // Average of the range
        total += (service.basePrice + service.maxPrice) / 2;
      } else if (service.id === 'ai-automation' && service.basePrice && service.monthlyPrice && service.maxMonthlyPrice) {
        // Setup fee + average monthly
        total += service.basePrice + ((service.monthlyPrice + service.maxMonthlyPrice) / 2);
      } else if (service.id === 'monthly-maintenance' && service.monthlyPrice) {
        total += service.monthlyPrice;
      } else if (service.id === 'remote-help' && service.hourlyRate) {
        // Assuming 1 hour for calculation
        total += service.hourlyRate;
      }
    });
    return total;
  };

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

  const isSelected = (serviceId: string) => selectedServices.has(serviceId);

  return (
    <section id="pricing" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t.pricing?.title || 'Calculadora de Precios'}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          {t.pricing?.subtitle || 'Selecciona los servicios que necesitas y obtén un presupuesto personalizado'}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: service.id === 'pc-repair' ? 0.1 : service.id === 'ai-automation' ? 0.2 : service.id === 'monthly-maintenance' ? 0.3 : 0.4, duration: 0.6 }}
              className={`group ${isSelected(service.id) ? 'border-2 border-blue-500' : 'border-2 border-transparent'}`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => toggleService(service.id)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      {service.id === 'pc-repair' && '💻'}
                      {service.id === 'ai-automation' && '🤖'}
                      {service.id === 'monthly-maintenance' && '🔧'}
                      {service.id === 'remote-help' && '💬'}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {service.description}
                    </p>
                    <p className="font-medium text-blue-600 dark:text-blue-400">
                      {service.priceRange}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedServices.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12"
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6">
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                {t.pricing?.total || 'Total Estimado'}
              </h3>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                ${calculateTotal().toFixed(2)}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                (estimado)
              </p>
            </div>
          </motion.div>
        )}

        <div className="mt-16 flex justify-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={selectedServices.size > 0 ?
              "w-full max-w-md px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 text-center block" :
              "w-full max-w-md px-6 py-3 bg-gray-400 dark:bg-gray-600 text-white font-medium rounded-lg opacity-50 transition-all duration-200 text-center block pointer-events-none"
            }
          >
            {selectedServices.size === 0 ?
              (t.pricing?.selectServices || 'Selecciona servicios') :
              (t.pricing?.cta || 'Solicitar servicio')}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
