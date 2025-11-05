import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ParallaxHero() {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const offset = window.scrollY * 0.4;
      ref.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[80vh] overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjIzNTg2NzV8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')",
          backgroundAttachment: 'fixed',
        }}
      />
      <div ref={ref} className="absolute inset-0" aria-hidden>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-pink-400/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="uppercase tracking-widest text-indigo-600 font-semibold">New Season • SS25</p>
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Effortless style. Everyday comfort.
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Explore curated essentials: premium tees, relaxed denim, cozy hoodies, and elevated basics
              designed for movement.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gray-900 text-white hover:bg-black transition"
              >
                Shop Collection <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/80 ring-1 ring-gray-300 text-gray-900 hover:bg-white transition"
              >
                View Bestsellers
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
