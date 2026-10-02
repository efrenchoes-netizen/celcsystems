'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickReplies = {
  es: ['¿Cuánto cuesta reparar una PC?', '¿Qué incluye el mantenimiento?', '¿Cómo funciona n8n?', '¿Atienden en Long Island?'],
  en: ['How much is PC repair?', 'What does maintenance include?', 'How does n8n work?', 'Do you serve Long Island?']
};

const initialMessages = {
  es: '¡Hola! 👋 Soy el asistente virtual de CELC Systems. ¿En qué puedo ayudarte hoy?',
  en: "Hi! 👋 I'm CELC Systems' virtual assistant. How can I help you today?"
};

const responses: Record<string, { es: string; en: string }> = {
  precio: {
    es: '💻 La reparación de PC cuesta entre **$79 y $99 USD**. El diagnóstico es gratuito y todas las reparaciones incluyen garantía de 30 días.',
    en: '💻 PC repair costs between **$79 and $99 USD**. Diagnosis is free and all repairs include a 30-day warranty.'
  },
  mantenimiento: {
    es: '🛡️ El mantenimiento mensual ($149/mes) incluye: monitoreo 24/7, actualizaciones de seguridad, respaldos automáticos y soporte prioritario.',
    en: '🛡️ Monthly maintenance ($149/mo) includes: 24/7 monitoring, security updates, automatic backups and priority support.'
  },
  n8n: {
    es: '⚙️ n8n es una plataforma de automatización que conecta tus apps favoritas. Desde $350 configuramos flujos automáticos para emails, formularios, CRM y más.',
    en: '⚙️ n8n is an automation platform that connects your favorite apps. From $350 we set up automatic workflows for emails, forms, CRM and more.'
  },
  ubicacion: {
    es: '📍 Servimos todo NYC (Queens, Brooklyn, Bronx, Manhattan) y Long Island (Nassau y Suffolk County). Ofrecemos servicio a domicilio.',
    en: '📍 We serve all NYC (Queens, Brooklyn, Bronx, Manhattan) and Long Island (Nassau and Suffolk County). We offer on-site service.'
  },
  default: {
    es: 'Gracias por tu mensaje. Para darte la mejor asistencia, te sugiero contactarnos directamente por WhatsApp o usando el formulario de contacto.',
    en: 'Thank you for your message. To provide you with the best assistance, I suggest contacting us directly via WhatsApp or using the contact form.'
  }
};

function getResponse(msg: string, lang: 'es' | 'en'): string {
  const lower = msg.toLowerCase();
  if (lower.includes('precio') || lower.includes('cost') || lower.includes('cuesta') || lower.includes('repair')) return responses.precio[lang];
  if (lower.includes('mantenimiento') || lower.includes('maintenance')) return responses.mantenimiento[lang];
  if (lower.includes('n8n') || lower.includes('automatiza')) return responses.n8n[lang];
  if (lower.includes('ubicacion') || lower.includes('location') || lower.includes('long island') || lower.includes('area')) return responses.ubicacion[lang];
  return responses.default[lang];
}

export default function ChatBot() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: initialMessages[lang] }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    // Update initial message when language changes
    if (messages.length === 1) {
      setMessages([{ role: 'assistant', content: initialMessages[lang] }]);
    }
  }, [lang]);

  const handleSend = async (messageOverride?: string) => {
    const userMessage = (messageOverride || input).trim();
    if (!userMessage || isTyping) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = getResponse(userMessage, lang);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-[350px] sm:w-[400px] h-[500px] bg-slate-900 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden border border-slate-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-cyan-500 to-blue-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">CELC Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-cyan-100">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-cyan-500 text-white rounded-tr-sm'
                      : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'
                  }`}
                    dangerouslySetInnerHTML={{
                      __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-400">$1</strong>')
                    }}
                  />
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="bg-slate-800 px-4 py-2.5 rounded-2xl rounded-tl-sm border border-slate-700">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Replies */}
              {messages.length <= 2 && !isTyping && (
                <div className="flex flex-col gap-2 mt-4">
                  <p className="text-xs text-slate-500 text-center">
                    {lang === 'es' ? 'Preguntas frecuentes:' : 'Quick questions:'}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickReplies[lang].map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(reply)}
                        className="text-left text-xs px-4 py-2.5 rounded-xl bg-slate-800/50 text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors border border-slate-700 hover:border-cyan-500/30"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-800 bg-slate-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={lang === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 text-sm"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="w-11 h-11 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl shadow-2xl shadow-cyan-500/30 flex items-center justify-center hover:shadow-cyan-500/50 transition-shadow relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
