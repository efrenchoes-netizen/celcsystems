'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useLanguage } from '@/lib/LanguageContext';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'model';
  content: string;
}

const quickReplies = {
  es: ['¿Cuánto cuesta la reparación de PC?', '¿Qué incluye el mantenimiento mensual?', '¿Cómo funciona la automatización?', '¿Cómo los contacto?'],
  en: ['How much does PC repair cost?', 'What does monthly maintenance include?', 'How does automation work?', 'How can I contact you?'],
};

const faqAnswers: Record<string, { es: string; en: string }> = {
  precio_reparacion: {
    es: '💻 La reparación de PC tiene un costo de **$79–$99 USD** dependiendo del tipo de problema. Incluye diagnóstico, limpieza y solución del problema.',
    en: '💻 PC repair costs **$79–$99 USD** depending on the issue. Includes diagnosis, cleaning, and problem resolution.',
  },
  mantenimiento: {
    es: '🛡️ El **Mantenimiento Mensual** cuesta **$149/mes** e incluye: monitoreo continuo, actualizaciones de seguridad, respaldos automáticos y soporte prioritario.',
    en: '🛡️ **Monthly Maintenance** costs **$149/mo** and includes: continuous monitoring, security updates, automatic backups, and priority support.',
  },
  automatizacion: {
    es: '⚙️ La **Automatización con n8n** tiene un costo de **$350–$500** de configuración más **$199–$249/mes**.',
    en: '⚙️ **n8n Automation** has a setup cost of **$350–$500** plus **$199–$249/mo**.',
  },
  contacto: {
    es: '📞 Puedes contactarnos por **WhatsApp** o usando el formulario de Contacto en esta página. ¡Respondemos en menos de 24 horas!',
    en: '📞 You can reach us via **WhatsApp** or using the Contact form on this page. We respond within 24 hours!',
  },
};

function getFaqAnswer(msg: string, lang: 'es' | 'en'): string | null {
  const lower = msg.toLowerCase();
  if (lower.includes('repair') || lower.includes('reparaci') || lower.includes('cuesta') || lower.includes('precio') || lower.includes('pc')) return faqAnswers.precio_reparacion[lang];
  if (lower.includes('mantenimiento') || lower.includes('maintenance') || lower.includes('mensual') || lower.includes('monthly')) return faqAnswers.mantenimiento[lang];
  if (lower.includes('automatiz') || lower.includes('automation') || lower.includes('n8n')) return faqAnswers.automatizacion[lang];
  if (lower.includes('contact') || lower.includes('whatsapp') || lower.includes('llamar')) return faqAnswers.contacto[lang];
  return null;
}

export default function ChatBot() {
  const { t, language } = useLanguage();
  const lang = language as 'es' | 'en';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'model', content: t.chat.welcome }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (messageOverride?: string) => {
    const userMessage = (messageOverride || input).trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setShowQuickReplies(false);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const faqAnswer = getFaqAnswer(userMessage, lang);
    if (faqAnswer) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'model', content: faqAnswer }]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const systemInstruction = `You are the CELC Systems Assistant. You help small Hispanic businesses in NYC and Long Island.
Services: PC Repair $79–$99, n8n Automation $350–$500 setup + $199–$249/mo, Monthly Maintenance $149/mo, Remote Help $40/hr.
Contact: WhatsApp or contact form. Response within 24 hours.
Answer in ${lang === 'es' ? 'Spanish' : 'English'}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: userMessage }] },
        ],
        config: { systemInstruction },
      });

      if (!response.text) throw new Error('Empty response');
      setMessages(prev => [...prev, { role: 'model', content: response.text! }]);
    } catch (error) {
      const errMsg = lang === 'es' ? 'Lo siento, hubo un error. Contáctanos por WhatsApp. 📞' : 'Sorry, there was an error. Contact us via WhatsApp. 📞';
      setMessages(prev => [...prev, { role: 'model', content: errMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ duration: 0.2 }} className="w-[350px] sm:w-[380px] h-[520px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Bot size={18} /></div>
                <div>
                  <p className="font-semibold text-sm">{t.chat.title}</p>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-blue-100">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" aria-label="Close chat"><X size={18} /></button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs ${m.role === 'user' ? 'bg-blue-600' : 'bg-slate-600'}`}>
                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'}`}
                    dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded-full bg-slate-600 flex items-center justify-center"><Bot size={14} className="text-white" /></div>
                  <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl"><Loader2 size={16} className="animate-spin text-blue-600" /></div>
                </div>
              )}
              {showQuickReplies && messages.length <= 1 && (
                <div className="flex flex-col gap-2 mt-2">
                  <p className="text-xs text-slate-400 text-center">{lang === 'es' ? 'Preguntas frecuentes:' : 'Frequently asked:'}</p>
                  {quickReplies[lang].map((reply, i) => (
                    <button key={i} onClick={() => handleSend(reply)} className="text-left text-xs px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors border border-blue-200 dark:border-blue-800">{reply}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-slate-700">
              <div className="flex gap-2 items-center">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={t.chat.placeholder} className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm" disabled={isLoading} />
                <button onClick={() => handleSend()} disabled={!input.trim() || isLoading} className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Send">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button onClick={() => setIsOpen(!isOpen)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-colors relative" aria-label="Open chat">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={22} /></motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><MessageSquare size={22} /></motion.div>
          )}
        </AnimatePresence>
        {!isOpen && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />}
      </motion.button>
    </div>
  );
}