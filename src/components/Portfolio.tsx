'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Portfolio() {
  const { t } = useLanguage();

  // Sample portfolio data - in a real app this would come from a CMS or API
  const portfolioData = [
    {
      id: 1,
      title: t.portfolio?.project1?.title || 'Tienda Online Hispana',
      description: t.portfolio?.project1?.description || 'E-commerce completo con integración de pagos y gestión de inventario',
      image: '/placeholder.svg?height=300&width=400&text=Tienda+Online',
      technologies: ['React', 'Next.js', 'Stripe', 'Tailwind CSS']
    },
    {
      id: 2,
      title: t.portfolio?.project2?.title || 'Sistema de Citas Médicas',
      description: t.portfolio?.project2?.description || 'Plataforma para gestión de citas con recordatorios automáticos',
      image: '/placeholder.svg?height=300&width=400&text=Sistema+Citas',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React']
    },
    {
      id: 3,
      title: t.portfolio?.project3?.title || 'Dashboard Analítico IA',
      description: t.portfolio?.project3?.description || 'Panel de control con gráficos en tiempo real y predicciones',
      image: '/placeholder.svg?height=300&width=400&text=Dashboard+IA',
      technologies: ['Python', 'TensorFlow', 'React', 'Chart.js']
    },
    {
      id: 4,
      title: t.portfolio?.project4?.title || 'App Móvil de Servicios',
      description: t.portfolio?.project4?.description || 'Aplicación móvil para solicitud y seguimiento de servicios técnicos',
      image: '/placeholder.svg?height=300&width=400&text=App+Móvil',
      technologies: ['React Native', 'Firebase', 'Expo', 'Redux']
    }
  ];

  return (
    <section id="portfolio" className="py-16 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t.portfolio?.title || 'Nuestro Portafolio'}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioData.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: project.id * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="bg-gray-800 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white dark:text-gray-100">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-600 dark:bg-blue-500 text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md font-medium transition-all duration-200"
                  >
                    {t.portfolio?.viewDetails || 'Ver Detalles'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}