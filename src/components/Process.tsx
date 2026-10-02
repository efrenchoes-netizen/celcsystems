'use client';

import { motion } from 'framer-motion';
import { Search, FileText, Wrench, CheckCircle, Rocket, Headphones } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const processSteps = {
  es: [
    { id: 1, title: 'Diagnóstico', description: 'Evaluamos tu problema de forma gratuita', icon: Search, color: 'cyan' },
    { id: 2, title: 'Presupuesto', description: 'Te damos un precio claro sin sorpresas', icon: FileText, color: 'blue' },
    { id: 3, title: 'Reparación', description: 'Resolvemos el problema en 24-48 horas', icon: Wrench, color: 'orange' },
    { id: 4, title: 'Pruebas', description: 'Verificamos que todo funcione perfectamente', icon: CheckCircle, color: 'cyan' },
    { id: 5, title: 'Entrega', description: 'Tu equipo listo con garantía incluida', icon: Rocket, color: 'blue' },
    { id: 6, title: 'Soporte', description: 'Seguimiento post-servicio continuo', icon: Headphones, color: 'orange' },
  ],
  en: [
    { id: 1, title: 'Diagnosis', description: 'We evaluate your problem for free', icon: Search, color: 'cyan' },
    { id: 2, title: 'Quote', description: 'Clear pricing with no surprises', icon: FileText, color: 'blue' },
    { id: 3, title: 'Repair', description: 'Problem solved in 24-48 hours', icon: Wrench, color: 'orange' },
    { id: 4, title: 'Testing', description: 'We verify everything works perfectly', icon: CheckCircle, color: 'cyan' },
    { id: 5, title: 'Delivery', description: 'Your equipment ready with warranty', icon: Rocket, color: 'blue' },
    { id: 6, title: 'Support', description: 'Continuous post-service follow-up', icon: Headphones, color: 'orange' },
  ],
};

export default function Process() {
  const { language } = useLanguage();
  const steps = processSteps[language as keyof typeof processSteps] || processSteps.es;

  return (
    <section id="process" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl" />
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
            <CheckCircle className="w-4 h-4" />
            {language === 'es' ? 'Cómo Trabajamos' : 'How We Work'}
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {language === 'es' ? 'Nuestro Proceso ' : 'Our Process '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {language === 'es' ? 'Sencillo' : 'Simple'}
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {language === 'es'
              ? '6 pasos claros desde el diagnóstico hasta el soporte continuo'
              : '6 clear steps from diagnosis to continuous support'}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold z-10">
                  {step.id}
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 pt-8 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    step.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                    step.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-orange-500/10 text-orange-400'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>

                {/* Connector Line (except last item in row) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-3 w-6 h-[2px] bg-slate-700" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1"
          >
            {language === 'es' ? 'Iniciar Proceso' : 'Start Process'}
            <Rocket className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
