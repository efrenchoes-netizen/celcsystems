'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Users, Monitor, ThumbsUp, Award } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function Counter({ target, suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const { language } = useLanguage();

  const statsData = [
    {
      value: 500,
      label: language === 'es' ? 'Clientes Satisfechos' : 'Happy Clients',
      suffix: '+',
      icon: Users,
      color: 'cyan'
    },
    {
      value: 1200,
      label: language === 'es' ? 'PCs Reparadas' : 'PCs Fixed',
      suffix: '+',
      icon: Monitor,
      color: 'blue'
    },
    {
      value: 98,
      label: language === 'es' ? 'Satisfacción' : 'Satisfaction',
      suffix: '%',
      icon: ThumbsUp,
      color: 'orange'
    },
    {
      value: 5,
      label: language === 'es' ? 'Años Experiencia' : 'Years Experience',
      suffix: '+',
      icon: Award,
      color: 'cyan'
    }
  ];

  return (
    <section id="stats" className="py-20 bg-[#0f172a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5
                }}
                className="relative group"
              >
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10">
                  {/* Icon */}
                  <div className={`
                    w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center
                    ${stat.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' : ''}
                    ${stat.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : ''}
                    ${stat.color === 'orange' ? 'bg-orange-500/10 text-orange-400' : ''}
                  `}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Counter */}
                  <div className="text-4xl font-bold text-white mb-2">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <p className="text-slate-400 font-medium">
                    {stat.label}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
