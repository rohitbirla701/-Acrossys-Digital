import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const [rotatingWord, setRotatingWord] = useState(0);
  const words = ['Better', 'Bigger', 'Faster'];
  const heroRef = useRef(null);
  const wordRef = useRef(null);
  const wordMobileRef = useRef(null);
  const agencyRef = useRef(null);

  // Rotating Word Interval with 3D vertical swirl flip
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      const targets = [wordRef.current, wordMobileRef.current].filter(Boolean);
      if (targets.length === 0) return;

      // Animate out
      gsap.to(targets, {
        y: -24,
        opacity: 0,
        rotateX: 45,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setRotatingWord((prev) => (prev + 1) % words.length);
          // Animate in
          gsap.fromTo(
            targets,
            { y: 24, opacity: 0, rotateX: -45 },
            { y: 0, opacity: 1, rotateX: 0, duration: 0.45, ease: 'power2.out' }
          );
        }
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  // Entrance animations & Scroll-linked AGENCY scale effect
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!heroRef.current || prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-title-ai',
        { yPercent: 40, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          '.hero-growth-wrapper',
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' },
          '-=0.4'
        )
        .fromTo(
          '.hero-pill-btn',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.035, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          '.hero-badge-container',
          { scale: 0.7, opacity: 0, rotation: -45 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.4)' },
          '-=0.4'
        )
        .fromTo(
          '.hero-headline-text',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.3'
        )
        .fromTo(
          '.hero-divider-line',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.6, transformOrigin: 'center center' },
          '-=0.3'
        )
        .fromTo(
          agencyRef.current,
          { yPercent: 35, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          '.hero-number-box',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.4'
        );

      // Scroll-linked smooth AGENCY scale: slowly grows on scroll down, shrinks on scroll up
      if (agencyRef.current) {
        gsap.to(agencyRef.current, {
          scale: 1.3,
          transformOrigin: 'center center',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const desktopServicePills = [
    'Managed SEO',
    'Link Building',
    'Content Creation',
    'Managed PPC',
    'Web Development',
    'Local SEO',
    'Social Media Marketing'
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[95vh] flex items-center bg-[#121212] bg-center bg-cover bg-no-repeat overflow-hidden select-none"
      style={{ backgroundImage: "url('/Hero-banner-Image.jpg')" }}
    >
      {/* Dark Ambient & Contrast Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-[600px] h-[600px] bg-[#e57e25]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-[600px] h-[600px] bg-[#fb7500]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="w-full max-w-[1620px] mx-auto px-4 sm:px-8 md:px-12 relative z-10 pt-32 sm:pt-40 md:pt-44 lg:pt-48 pb-16 sm:pb-20 md:pb-28">
        
        {/* Top Row: AI-DRIVEN + [ Growth ] (Centered in mobile, side-by-side in desktop) */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-12 lg:mb-16">
          <h1 className="hero-title-ai font-display font-black text-[#e57e25] text-4xl sm:text-6xl md:text-8xl lg:text-[110px] xl:text-[115px] leading-none tracking-tight text-center lg:text-left">
            AI-DRIVEN
          </h1>

          {/* Growth Box with 1.2s Rotating Blue-Orange Border Beam */}
          <div className="hero-growth-wrapper relative p-[2px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
            {/* 1.2s Rotating Conic Beam matching reference (Blue -> Orange -> Amber) */}
            <div
              className="growth-border-beam absolute inset-[-150%] w-[400%] h-[400%] pointer-events-none"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, #2563eb 50deg, #fb7500 100deg, #e57e25 150deg, transparent 200deg)'
              }}
            />
            {/* Inner Dark Background */}
            <div className="relative z-10 px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-3.5 rounded-[14px] md:rounded-[22px] bg-[#2b2b2b] flex items-center justify-center">
              <span className="font-display font-bold text-white text-2xl sm:text-4xl md:text-6xl lg:text-[75px] xl:text-[70px] leading-none tracking-tight">
                Growth
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            MOBILE VIEW ONLY (< lg)
            Matching the User's Mobile Screenshot 100%
            ======================================================== */}
        <div className="flex lg:hidden flex-col items-center text-center w-full max-w-md mx-auto">
          
          {/* Pills Layout: 2-Columns (3 Rows) + 1 Centered Pill on Row 4 */}
          <div className="w-full flex flex-col items-center gap-2.5 sm:gap-3 my-2">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
              <a
                href="#services"
                className="hero-pill-btn px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/20 bg-[#161616]/75 backdrop-blur-md text-xs sm:text-[13px] text-white font-medium hover:border-[#e57e25] hover:text-[#fb7500] hover:bg-black/80 transition-all text-center whitespace-nowrap shadow-sm"
              >
                Managed SEO
              </a>
              <a
                href="#services"
                className="hero-pill-btn px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/20 bg-[#161616]/75 backdrop-blur-md text-xs sm:text-[13px] text-white font-medium hover:border-[#e57e25] hover:text-[#fb7500] hover:bg-black/80 transition-all text-center whitespace-nowrap shadow-sm"
              >
                Link Building
              </a>
              <a
                href="#services"
                className="hero-pill-btn px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/20 bg-[#161616]/75 backdrop-blur-md text-xs sm:text-[13px] text-white font-medium hover:border-[#e57e25] hover:text-[#fb7500] hover:bg-black/80 transition-all text-center whitespace-nowrap shadow-sm"
              >
                Content Creation
              </a>
              <a
                href="#services"
                className="hero-pill-btn px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/20 bg-[#161616]/75 backdrop-blur-md text-xs sm:text-[13px] text-white font-medium hover:border-[#e57e25] hover:text-[#fb7500] hover:bg-black/80 transition-all text-center whitespace-nowrap shadow-sm"
              >
                Managed PPC
              </a>
              <a
                href="#services"
                className="hero-pill-btn px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-[#e57e25] bg-[#161616]/90 backdrop-blur-md text-xs sm:text-[13px] text-[#fb7500] font-semibold hover:bg-black/80 transition-all text-center whitespace-nowrap shadow-sm"
              >
                Web Development
              </a>
              <a
                href="#services"
                className="hero-pill-btn px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/20 bg-[#161616]/75 backdrop-blur-md text-xs sm:text-[13px] text-white font-medium hover:border-[#e57e25] hover:text-[#fb7500] hover:bg-black/80 transition-all text-center whitespace-nowrap shadow-sm"
              >
                Local SEO
              </a>
            </div>

            {/* Row 4: 7th Pill Centered */}
            <a
              href="#services"
              className="hero-pill-btn px-6 py-2 sm:py-2.5 rounded-full border border-white/20 bg-[#161616]/75 backdrop-blur-md text-xs sm:text-[13px] text-white font-medium hover:border-[#e57e25] hover:text-[#fb7500] hover:bg-black/80 transition-all text-center whitespace-nowrap shadow-sm"
            >
              Social Media Marketing
            </a>
          </div>

          {/* Centered Rotating Circular Badge */}
          <div className="py-6 sm:py-8 flex items-center justify-center">
            <div className="hero-badge-container relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
              <img
                src="/Modified-Badge.png"
                alt="Transform Inspire Create Badge"
                decoding="async"
                className="w-full h-full object-contain animate-spin-slow filter drop-shadow-[0_0_25px_rgba(229,126,37,0.4)] select-none pointer-events-none"
              />
            </div>
          </div>

          {/* Centered Headline */}
          <h2 className="hero-headline-text font-display font-bold text-xl sm:text-2xl text-white leading-[1.3] tracking-tight">
            <span className="block">We Rebuild With AI To</span>
            <span className="block">Maximize Your</span>
            <span className="inline-block">Business Growth </span>
            <span className="inline-block overflow-hidden align-top ml-1.5" style={{ perspective: '500px' }}>
              <span
                ref={wordMobileRef}
                className="inline-block text-white font-bold will-change-transform"
              >
                {words[rotatingWord]}
              </span>
            </span>
          </h2>

          {/* Divider Line */}
          <div className="hero-divider-line w-full max-w-xs h-[1px] bg-white/15 my-4 sm:my-6" />

          {/* Centered AGENCY Title */}
          <div className="overflow-visible w-full">
            <h2
              className="hero-title-agency font-display font-black text-[#e57e25] text-5xl sm:text-7xl leading-none tracking-tight uppercase will-change-transform"
            >
              AGENCY
            </h2>
          </div>

        </div>

        {/* ========================================================
            DESKTOP VIEW ONLY (>= lg)
            Single Column Vertical Pills | Badge | 3-Line Headline + AGENCY
            ======================================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          
          {/* Left Column: Vertical Single-Column Service Pills */}
          <div className="lg:col-span-3 xl:col-span-3 flex justify-start">
            <div className="flex flex-col gap-2.5 sm:gap-3 items-start">
              {desktopServicePills.map((pill) => (
                <a
                  key={pill}
                  href="#services"
                  className="hero-pill-btn px-5 py-2 rounded-full border border-white/20 bg-[#161616]/75 backdrop-blur-md text-xs sm:text-[13px] md:text-sm text-white font-medium hover:border-[#e57e25] hover:text-[#fb7500] hover:bg-black/80 hover:scale-105 transition-all cursor-pointer whitespace-nowrap shadow-sm text-center"
                >
                  {pill}
                </a>
              ))}
            </div>
          </div>

          {/* Center Column: Rotating Circular Badge */}
          <div className="lg:col-span-3 xl:col-span-3 flex items-center justify-center py-6 lg:py-0">
            <div className="hero-badge-container relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 flex items-center justify-center">
              <img
                src="/Modified-Badge.png"
                alt="Transform Inspire Create Badge"
                decoding="async"
                className="w-full h-full object-contain animate-spin-slow filter drop-shadow-[0_0_30px_rgba(229,126,37,0.45)] select-none pointer-events-none"
              />
            </div>
          </div>

          {/* Right Column: 3-Line Headline + Divider + AGENCY */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            {/* Animated Headline with exact line breaks */}
            <h2 className="hero-headline-text font-display font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[34px] xl:text-[40px] text-white leading-[1.28] tracking-tight">
              <span className="block">We Rebuild With AI To</span>
              <span className="block">Maximize Your Business</span>
              <span className="inline-block">Growth </span>
              <span className="inline-block overflow-hidden align-top ml-1.5" style={{ perspective: '500px' }}>
                <span
                  ref={wordRef}
                  className="inline-block text-white font-bold will-change-transform"
                >
                  {words[rotatingWord]}
                </span>
              </span>
            </h2>

            {/* Horizontal Divider Line */}
            <div className="hero-divider-line w-full h-[1px] bg-white/15 my-4 sm:my-6 md:my-7" />

            {/* AGENCY Giant Orange Title (Scales smoothly on scroll) */}
            <div className="overflow-visible">
              <h2
                ref={agencyRef}
                className="hero-title-agency font-display font-black text-[#e57e25] text-6xl sm:text-8xl md:text-9xl lg:text-[105px] xl:text-[120px] leading-none tracking-tight uppercase will-change-transform"
              >
                AGENCY
              </h2>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom-Left Section Number Box matching reference 01/13 */}
      <div className="hero-number-box absolute bottom-0 left-0 z-30 bg-white text-black px-4 sm:px-6 py-2 sm:py-3 font-display flex items-center shadow-2xl">
        <span className="font-black text-base sm:text-xl text-black leading-none tracking-tight">01</span>
        <span className="font-semibold text-xs sm:text-sm text-neutral-600 ml-1 leading-none">/ 13</span>
      </div>
    </section>
  );
};
