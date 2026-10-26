import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ChevronRight, Layers, Cpu, Mail, Palette, Code2, Sparkles, ArrowUpRight } from 'lucide-react';
import { siteData } from '../data/siteData';
import { AnimatedText } from '../components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const pillarIcons = {
  'digital-marketing': Layers,
  'ai-marketing': Cpu,
  'content-email': Mail,
  'managed-design': Palette,
  'web-development': Code2
};

export const GrowthFramework = () => {
  const [activeTab, setActiveTab] = useState(siteData.framework.pillars[0].id);
  const containerRef = useRef(null);
  const contentGridRef = useRef(null);

  const currentPillar =
    siteData.framework.pillars.find((p) => p.id === activeTab) ||
    siteData.framework.pillars[0];

  // Animate tab content change
  useEffect(() => {
    if (!contentGridRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(
      contentGridRef.current.querySelectorAll('.framework-card, .framework-visual'),
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
    );
  }, [activeTab]);

  // Scroll entrance trigger
  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.framework-tab-btn',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.framework-tabs-container',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="framework"
      ref={containerRef}
      className="py-24 md:py-36 bg-[#151515] relative overflow-hidden border-t border-white/5"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#e57e25]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1620px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-[#1b1b1b]/90 backdrop-blur-md mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e57e25] animate-ping" />
            <span className="text-xs uppercase tracking-widest text-[#e57e25] font-semibold">
              {siteData.framework.eyebrow}
            </span>
          </div>

          <AnimatedText
            text={siteData.framework.headline}
            tag="h2"
            splitBy="word"
            className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-tight mb-6 justify-center"
          />

          <p className="text-base sm:text-lg text-[#999999] max-w-2xl leading-relaxed">
            A comprehensive, data-backed execution framework engineered to eliminate guesswork, capture intent, and compound growth across key touchpoints.
          </p>
        </div>

        {/* Pillar Selection Tabs */}
        <div className="framework-tabs-container flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-16 max-w-5xl mx-auto">
          {siteData.framework.pillars.map((pillar) => {
            const Icon = pillarIcons[pillar.id] || Layers;
            const isActive = activeTab === pillar.id;

            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActiveTab(pillar.id)}
                className={`framework-tab-btn flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm md:text-base font-display transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#e57e25] text-black font-semibold shadow-lg shadow-[#e57e25]/30 scale-105'
                    : 'bg-[#1b1b1b] text-white/70 border border-white/10 hover:border-[#e57e25]/60 hover:text-white hover:bg-[#202020]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#e57e25]'}`} />
                <span>{pillar.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Showcase & Cards */}
        <div ref={contentGridRef} className="space-y-10">
          {/* Visual Banner of the Active Pillar */}
          <div className="framework-visual relative rounded-3xl overflow-hidden border border-white/10 bg-[#1b1b1b] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              <div className="p-8 md:p-14 lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e57e25]/15 border border-[#e57e25]/30 text-xs font-semibold text-[#fb7500]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Strategic Pillar: {currentPillar.name}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                  Accelerating Brand Authority with {currentPillar.name}
                </h3>
                <p className="text-[#999999] text-base md:text-lg leading-relaxed">
                  Every stage of our framework is designed around measurable outcomes, compounding value, and converting searchers into loyal advocates.
                </p>
                <div className="pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-[#e57e25] text-white hover:text-black font-display font-medium text-xs sm:text-sm tracking-wide transition-all duration-200"
                  >
                    <span>Deploy This Framework</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto lg:h-[340px] overflow-hidden bg-[#242424]">
                <img
                  src={currentPillar.image}
                  alt={currentPillar.name}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Subsections Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {currentPillar.subsections.map((sub, idx) => (
              <div
                key={sub.title + idx}
                className="framework-card rounded-3xl p-8 border border-white/10 bg-[#1b1b1b]/90 backdrop-blur-sm flex flex-col justify-between hover:border-[#e57e25]/60 hover:-translate-y-1.5 transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-9 h-9 rounded-xl bg-[#222222] border border-white/10 flex items-center justify-center text-xs font-bold font-display text-[#e57e25] group-hover:bg-[#e57e25] group-hover:text-black transition-colors">
                      0{idx + 1}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-display font-semibold text-white group-hover:text-[#fb7500] transition-colors">
                      {sub.title}
                    </h4>
                  </div>

                  <p className="text-[#999999] leading-relaxed text-sm sm:text-base mb-6">
                    {sub.desc}
                  </p>

                  <div className="space-y-3 pt-5 border-t border-white/5">
                    {sub.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#e57e25] flex-shrink-0 mt-1" />
                        <span className="text-xs sm:text-sm text-white/85 leading-snug">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-white/40 group-hover:text-white transition-colors">
                  <span>Learn Strategy</span>
                  <ChevronRight className="w-4 h-4 text-[#e57e25] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
