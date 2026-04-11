'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Stats() {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    clients: 0,
    pcs: 0,
    satisfaction: 0,
    years: 0
  });

  useEffect(() => {
    // Animate numbers when component mounts
    const animateNumbers = () => {
      setStats({
        clients: 50,
        pcs: 200,
        satisfaction: 99,
        years: 5
      });
    };

    // Add a small delay to ensure proper mounting
    const timer = setTimeout(animateNumbers, 100);
    return () => clearTimeout(timer);
  }, []);

  const statsData = [
    {
      value: stats.clients,
      label: t.stats?.clients || 'Clientes',
      suffix: '+',
      icon: '👥'
    },
    {
      value: stats.pcs,
      label: t.stats?.pcs || 'PCs Reparadas',
      suffix: '+',
      icon: '💻'
    },
    {
      value: stats.satisfaction,
      label: t.stats?.satisfaction || 'Satisfacción',
      suffix: '%',
      icon: '😊'
    },
    {
      value: stats.years,
      label: t.stats?.years || 'Años de Experiencia',
      suffix: '',
      icon: '⭐'
    }
  ];

  return (
    <section id="stats" className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: stat.label === t.stats?.clients ? 0.1 :
                       stat.label === t.stats?.pcs ? 0.2 :
                       stat.label === t.stats?.satisfaction ? 0.3 : 0.4,
                duration: 0.8
              }}
              className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="inline-block bg-blue-50 dark:bg-blue-900/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2"
              >
                {stat.value}{stat.suffix}
              </motion.span>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}