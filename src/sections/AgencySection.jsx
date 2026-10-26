import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Bot, Cpu, Eye, Link as LinkIcon, ArrowUpRight } from 'lucide-react';
import { siteData } from '../data/siteData';
import { AnimatedText } from '../components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const forceIcons = [Search, Bot, Cpu, Eye, LinkIcon];

export const AgencySection = () => {
  const containerRef = useRef(null);
  const scrollSectionRef = useRef(null);
  const frameRef = useRef(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = siteData.agency.showcaseImages;

  // ScrollTrigger for the Pinned Sticky Frame Showcase
  useEffect(() => {
    if (!scrollSectionRef.current || !frameRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Pin and animate the expanding frame
      ScrollTrigger.create({
        trigger: scrollSectionRef.current,
        start: 'top top',
        end: isMobile ? '+=110%' : '+=180%',
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;

          // Expand frame width, height, and soften border radius
          const w = window.innerWidth;
          const startW = w < 768 ? Math.min(320, w * 0.88) : 850;
          const endW = w < 768 ? w * 0.94 : Math.min(1500, w * 0.92);

          const startH = w < 768 ? 340 : 540;
          const endH = w < 768 ? 420 : 660;

          const startRadius = w < 768 ? 50 : 250;
          const endRadius = 20;

          const currentW = startW + (endW - startW) * progress;
          const currentH = startH + (endH - startH) * progress;
          const currentR = startRadius + (endRadius - startRadius) * progress;

          if (frameRef.current) {
            frameRef.current.style.width = `${currentW}px`;
            frameRef.current.style.height = `${currentH}px`;
            frameRef.current.style.borderRadius = `${currentR}px`;
          }

          // Cycle through showcase images based on scroll progress
          const imageProgress = Math.min(1, progress * 1.5);
          const rawIdx = imageProgress * (images.length - 1);
          const targetIdx = Math.min(images.length - 1, Math.floor(rawIdx));
          setActiveImgIndex(targetIdx);
        }
      });

      // Stagger entrance for the Five Forces cards
      gsap.fromTo(
        '.agency-force-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.agency-forces-grid',
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [images.length]);

  return (
    <section
      id="agency"
      ref={containerRef}
      className="relative bg-[#121212] pt-24 pb-28 md:pt-36 md:pb-40 overflow-hidden border-t border-white/5"
    >
      {/* Background Ambient Lights */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#e57e25]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-[#fb7500]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1620px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="overflow-hidden mb-3">
            <span className="font-display font-semibold text-5xl sm:text-7xl md:text-8xl lg:text-[100px] text-white/20 tracking-tighter uppercase block">
              {siteData.agency.tag}
            </span>
          </div>

          <AnimatedText
            text={siteData.agency.headline}
            tag="h2"
            splitBy="word"
            className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.12] mb-6 justify-center"
          />

          <p className="text-base sm:text-lg md:text-xl text-[#999999] leading-relaxed max-w-2xl">
            {siteData.agency.description}
          </p>
        </div>
      </div>

      {/* Pinned Sticky Scroll-Frame Project Showcase */}
      <div
        ref={scrollSectionRef}
        className="w-full flex items-center justify-center my-8 md:my-16 overflow-hidden min-h-[580px] md:min-h-[720px]"
      >
        <div
          ref={frameRef}
          className="relative overflow-hidden bg-[#181818] border border-white/15 shadow-2xl transition-all duration-75 ease-out flex items-center justify-center will-change-[width,height,border-radius]"
          style={{
            width: '850px',
            height: '540px',
            borderRadius: '250px'
          }}
        >
          {images.map((src, i) => (
            <img
              key={src + i}
              src={src}
              alt={`Showcase Project ${i + 1}`}
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
                activeImgIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              loading="lazy"
            />
          ))}

          {/* Overlay Gradient with Frame Tag */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute bottom-6 left-8 md:left-12 flex items-center gap-3 pointer-events-none z-10">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#e57e25] text-black shadow-lg">
              Featured Work
            </span>
            <span className="text-xs md:text-sm text-white/80 font-medium">
              Frame {activeImgIndex + 1} of {images.length}
            </span>
          </div>
        </div>
      </div>

      {/* The Five Forces Cards Grid */}
      <div className="max-w-[1620px] mx-auto px-6 md:px-12 mt-16 md:mt-24">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#e57e25] font-semibold block mb-2">
            The Digital Engine
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-white">
            Five Pillars of Unfair Advantage
          </h3>
        </div>

        <div className="agency-forces-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {siteData.agency.forces.map((force, index) => {
            const Icon = forceIcons[index] || Search;
            const isWide = index === 3 || index === 4;

            return (
              <div
                key={force.number}
                className={`agency-force-card group relative rounded-3xl p-8 md:p-10 border border-white/10 bg-[#1b1b1b]/90 backdrop-blur-sm transition-all duration-300 hover:border-[#e57e25] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#e57e25]/15 flex flex-col justify-between ${
                  isWide ? 'lg:col-span-1.5' : ''
                }`}
              >
                <div>
                  {/* Card Top: Number & Glowing Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl md:text-5xl font-display font-bold text-white/20 group-hover:text-[#e57e25] transition-colors">
                      {force.number}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-[#222222] border border-white/10 flex items-center justify-center text-[#e57e25] group-hover:bg-[#e57e25] group-hover:text-black transition-all duration-300 shadow-md">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Force Title */}
                  <h4 className="text-xl sm:text-2xl font-display font-semibold text-white mb-4 group-hover:text-[#fb7500] transition-colors leading-snug">
                    {force.title}
                  </h4>

                  {/* Force Description */}
                  <p className="text-[#999999] leading-relaxed text-sm sm:text-base">
                    {force.description}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-white/50 group-hover:text-white transition-colors">
                  <span>Explore Force Details</span>
                  <div className="w-8 h-8 rounded-full bg-[#242424] flex items-center justify-center group-hover:bg-[#e57e25] group-hover:text-black transition-all">
                    <ArrowUpRight className="w-4 h-4 text-[#e57e25] group-hover:text-black transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
