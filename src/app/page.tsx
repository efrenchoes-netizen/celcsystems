'use client';

import Reel from '@/components/Reel';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Portfolio from '@/components/Portfolio';
import PricingCalculator from '@/components/PricingCalculator';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
export default function Home() {
  return (
    <main>
      <Navbar onBlogClick={() => window.open('https://blog.celcsystems.com', '_blank')} />
      <Hero />
      <Reel />
      <Stats />
      <Services />
      <Process />
      <Portfolio />
      <PricingCalculator />
      <Contact />
      <Footer />
      <ChatBot />
    </main>
  );
}