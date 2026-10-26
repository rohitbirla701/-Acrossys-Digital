import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.__lenis) {
      window.__lenis.scrollTo(0, {
        duration: prefersReducedMotion ? 0.01 : 1.2,
        immediate: prefersReducedMotion
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-[#1b1b1b]/90 border border-white/15 backdrop-blur-md text-white hover:text-[#fb7500] hover:border-[#e57e25] transition-all duration-300 flex items-center justify-center shadow-xl shadow-black/50 hover:scale-110 active:scale-95 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#e57e25]"
    >
      {/* Circular Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="21"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="2.5"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r="21"
          stroke="#e57e25"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="132"
          strokeDashoffset={132 - (132 * scrollProgress) / 100}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>

      <ArrowUp className="w-5 h-5 text-white group-hover:text-[#fb7500] group-hover:-translate-y-0.5 transition-all" />
    </button>
  );
};
