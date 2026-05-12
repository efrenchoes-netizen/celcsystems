'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Contact() {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', service: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, language }),
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '', service: '' });
    } catch {
      setStatus('error');
    }
  };

  const services = language === 'es'
    ? ['Reparación de PC', 'Automatización IA', 'Mantenimiento Mensual', 'Ayuda Remota', 'Otro']
    : ['PC Repair', 'AI Automation', 'Monthly Maintenance', 'Remote Help', 'Other'];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
            {language === 'es' ? 'Contáctanos' : 'Contact Us'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {language === 'es' ? '¿Listo para empezar?' : 'Ready to get started?'}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {language === 'es' ? 'Respondemos en menos de 24 horas' : 'We respond within 24 hours'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {[
              { icon: <Mail size={20} />, label: 'Email', value: 'info@celcsystems.com' },
              { icon: <Phone size={20} />, label: 'WhatsApp', value: '+1 (516) 800-7626' },
              { icon: <MapPin size={20} />, label: 'Location', value: 'Massapequa, NY' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center text-blue-600">{item.icon}</div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                  <p className="font-medium text-slate-900 dark:text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <CheckCircle size={48} className="text-green-500" />
                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                  {language === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
                </p>
                <p className="text-slate-500">{language === 'es' ? 'Te contactaremos pronto.' : "We'll contact you soon."}</p>
                <button onClick={() => setStatus('idle')} className="px-4 py-2 text-blue-600 underline text-sm">
                  {language === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder={language === 'es' ? 'Tu nombre' : 'Your name'} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white w-full" />
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white w-full" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder={language === 'es' ? 'Teléfono (opcional)' : 'Phone (optional)'} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white w-full" />
                  <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white w-full">
                    <option value="">{language === 'es' ? 'Selecciona un servicio' : 'Select a service'}</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={4} placeholder={language === 'es' ? '¿Cómo podemos ayudarte?' : 'How can we help you?'} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white w-full resize-none" />
                <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60">
                  {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {language === 'es' ? 'Enviar mensaje' : 'Send message'}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}