'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const portfolioData = {
  es: [
    {
      id: 1,
      title: 'Tienda Online de Reparación',
      description: 'Plataforma web completa para gestión de reparaciones con sistema de tickets, seguimiento en tiempo real y pagos online.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      technologies: ['Next.js', 'Node.js', 'Stripe', 'PostgreSQL'],
      category: 'Web App'
    },
    {
      id: 2,
      title: 'Automatización Nómina',
      description: 'Sistema automatizado con n8n que procesa nómina, envía reportes y sincroniza con contabilidad.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      technologies: ['n8n', 'Google Sheets', 'Slack', 'MySQL'],
      category: 'Automatización'
    },
    {
      id: 3,
      title: 'Red Empresarial Segura',
      description: 'Diseño e implementación de red empresarial con firewall, VPN y monitoreo 24/7.',
      image: 'https://images.unsplash.com/photo-1558494949-ef526b0969b0?q=80&w=1000&auto=format&fit=crop',
      technologies: ['Cisco', 'pfSense', 'Zabbix', 'WireGuard'],
      category: 'Infraestructura'
    },
    {
      id: 4,
      title: 'Backup en la Nube',
      description: 'Solución de respaldo automático para 50+ endpoints con recuperación ante desastres.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop',
      technologies: ['AWS', 'Veeam', 'Terraform', 'CloudWatch'],
      category: 'Cloud'
    }
  ],
  en: [
    {
      id: 1,
      title: 'Repair Shop Platform',
      description: 'Complete web platform for repair management with ticket system, real-time tracking and online payments.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      technologies: ['Next.js', 'Node.js', 'Stripe', 'PostgreSQL'],
      category: 'Web App'
    },
    {
      id: 2,
      title: 'Payroll Automation',
      description: 'Automated n8n system that processes payroll, sends reports and syncs with accounting.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      technologies: ['n8n', 'Google Sheets', 'Slack', 'MySQL'],
      category: 'Automation'
    },
    {
      id: 3,
      title: 'Secure Business Network',
      description: 'Design and implementation of business network with firewall, VPN and 24/7 monitoring.',
      image: 'https://images.unsplash.com/photo-1558494949-ef526b0969b0?q=80&w=1000&auto=format&fit=crop',
      technologies: ['Cisco', 'pfSense', 'Zabbix', 'WireGuard'],
      category: 'Infrastructure'
    },
    {
      id: 4,
      title: 'Cloud Backup Solution',
      description: 'Automated backup solution for 50+ endpoints with disaster recovery.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop',
      technologies: ['AWS', 'Veeam', 'Terraform', 'CloudWatch'],
      category: 'Cloud'
    }
  ]
};

export default function Portfolio() {
  const { language } = useLanguage();
  const projects = portfolioData[language as keyof typeof portfolioData] || portfolioData.es;

  return (
    <section id="portfolio" className="py-24 bg-[#0f172a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
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
            <Code2 className="w-4 h-4" />
            {language === 'es' ? 'Nuestro Trabajo' : 'Our Work'}
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {language === 'es' ? 'Proyectos ' : 'Projects '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {language === 'es' ? 'Realizados' : 'Completed'}
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Casos de éxito de nuestros clientes en NYC y Long Island'
              : 'Success stories from our clients in NYC and Long Island'}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full text-xs font-medium text-cyan-400">
                    {project.category}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-700/50 rounded-full border border-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
                    {language === 'es' ? 'Ver Detalles' : 'View Details'}
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 mb-6">
            {language === 'es'
              ? '¿Tienes un proyecto en mente?'
              : 'Have a project in mind?'}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1"
          >
            {language === 'es' ? 'Hablemos de tu Proyecto' : "Let's Talk About Your Project"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
