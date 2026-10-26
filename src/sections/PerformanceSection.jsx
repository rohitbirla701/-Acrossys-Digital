import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data/siteData';

gsap.registerPlugin(ScrollTrigger);

export const PerformanceSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const barsContainerRef = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const [counts, setCounts] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return siteData.performance.metrics.map(m => m.percentage);
    }
    return [0, 0, 0, 0];
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Coordinated entrance for heading
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );

      // ScrollTrigger for metric bars & counter numbers
      ScrollTrigger.create({
        trigger: barsContainerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          setHasTriggered(true);

          siteData.performance.metrics.forEach((metric, index) => {
            const counterObj = { val: 0 };
            gsap.to(counterObj, {
              val: metric.percentage,
              duration: metric.duration / 1000,
              ease: 'power2.out',
              onUpdate: () => {
                setCounts((prev) => {
                  const updated = [...prev];
                  updated[index] = Math.round(counterObj.val);
                  return updated;
                });
              }
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="performance"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#121212] relative overflow-hidden border-t border-white/5"
    >
      {/* Background Ambience Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#e57e25]/5 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Eyebrow and Headline Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#1b1b1b]/80 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#e57e25] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[#e57e25] font-semibold">
              {siteData.performance.eyebrow}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight">
            {siteData.performance.headline}
          </h2>
        </div>

        {/* 4 Horizontal Progress Bars */}
        <div ref={barsContainerRef} className="max-w-4xl mx-auto space-y-8">
          {siteData.performance.metrics.map((metric, idx) => (
            <div
              key={metric.label}
              className="p-6 md:p-8 rounded-2xl border border-white/10 bg-[#171717]/80 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group"
            >
              {/* Title & Animated Percentage */}
              <div className="flex justify-between items-baseline mb-4">
                <h5 className="font-display font-semibold text-white text-lg md:text-xl group-hover:text-[#fb7500] transition-colors">
                  {metric.label}
                </h5>
                <span className="font-display font-bold text-[#fb7500] text-2xl md:text-3xl tracking-tight tabular-nums">
                  {counts[idx]}%
                </span>
              </div>

              {/* Progress Track */}
              <div 
                className="w-full h-3 md:h-3.5 rounded-full bg-[#1e1e1e] border border-white/5 overflow-hidden p-0.5"
                role="progressbar"
                aria-valuenow={counts[idx]}
                aria-valuemin="0"
                aria-valuemax={metric.percentage}
                aria-label={metric.label}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#e57e25] via-[#fb7500] to-[#ffaa40] transition-all ease-out shadow-[0_0_12px_rgba(229,126,37,0.45)]"
                  style={{
                    width: hasTriggered ? `${metric.percentage}%` : '0%',
                    transitionDuration: `${metric.duration}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
