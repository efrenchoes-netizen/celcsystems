'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Contact() {
  const { language } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', service: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setForm({ name: '', email: '', phone: '', message: '', service: '' });
  };

  const services = language === 'es'
    ? ['Reparación de PC', 'Automatización IA', 'Mantenimiento Mensual', 'Ayuda Remota', 'Otro']
    : ['PC Repair', 'AI Automation', 'Monthly Maintenance', 'Remote Help', 'Other'];

  const contactInfo = [
    { icon: Mail, label: language === 'es' ? 'Email' : 'Email', value: 'info@celcsystems.com', href: 'mailto:info@celcsystems.com' },
    { icon: Phone, label: 'WhatsApp', value: '+1 (516) 800-7626', href: 'https://wa.me/15168007626' },
    { icon: MapPin, label: language === 'es' ? 'Ubicación' : 'Location', value: 'Massapequa, NY', href: '#' },
    { icon: Clock, label: language === 'es' ? 'Horario' : 'Hours', value: language === 'es' ? 'Lun-Vie: 9AM-6PM' : 'Mon-Fri: 9AM-6PM', href: '#' },
  ];

  return (
    <section id="contact" className="py-24 bg-[#0f172a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
            <Mail className="w-4 h-4" />
            {language === 'es' ? 'Contáctanos' : 'Contact Us'}
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {language === 'es' ? '¿Listo para ' : 'Ready to '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {language === 'es' ? 'Empezar?' : 'Start?'}
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Escríbenos y te respondemos en menos de 24 horas'
              : 'Write us and we will respond in less than 24 hours'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="font-medium text-white group-hover:text-cyan-400 transition-colors">{item.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Map placeholder */}
            <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl">
              <p className="text-sm text-slate-400 mb-3">
                {language === 'es' ? 'Área de servicio:' : 'Service area:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {['NYC', 'Queens', 'Brooklyn', 'Bronx', 'Long Island'].map(area => (
                  <span key={area} className="px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {language === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
                  </p>
                  <p className="text-slate-400 text-center">
                    {language === 'es'
                      ? 'Te contactaremos pronto. ¡Gracias por confiar en CELC Systems!'
                      : "We'll contact you soon. Thanks for trusting CELC Systems!"}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-6 py-3 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    {language === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        {language === 'es' ? 'Nombre' : 'Name'} *
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="email@ejemplo.com"
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        {language === 'es' ? 'Teléfono' : 'Phone'}
                      </label>
                      <input
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        {language === 'es' ? 'Servicio' : 'Service'}
                      </label>
                      <select
                        value={form.service}
                        onChange={e => setForm({ ...form, service: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                      >
                        <option value="">{language === 'es' ? 'Selecciona un servicio' : 'Select a service'}</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      {language === 'es' ? 'Mensaje' : 'Message'} *
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      placeholder={language === 'es' ? '¿Cómo podemos ayudarte? Describe tu problema...' : 'How can we help you? Describe your issue...'}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {language === 'es' ? 'Enviando...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {language === 'es' ? 'Enviar mensaje' : 'Send message'}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
