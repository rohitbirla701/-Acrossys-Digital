import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { siteData } from '../data/siteData';
import { MagneticButton } from '../components/MagneticButton';

export const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const heroRef = useRef(null);
  const rotatingWordRef = useRef(null);

  // Rotating Word Interval with 3D vertical swirl flip
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      if (!rotatingWordRef.current) return;

      // Animate out
      gsap.to(rotatingWordRef.current, {
        y: -30,
        opacity: 0,
        rotateX: 45,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setWordIndex((prev) => (prev + 1) % siteData.hero.rotatingWords.length);
          // Animate in
          gsap.fromTo(
            rotatingWordRef.current,
            { y: 30, opacity: 0, rotateX: -45 },
            { y: 0, opacity: 1, rotateX: 0, duration: 0.45, ease: 'power2.out' }
          );
        }
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Coordinated GSAP Entrance Animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!heroRef.current || prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Ticker fade in
      tl.fromTo('.hero-ticker', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6 })
        // 2. Letters of "AI-Driven" reveal from bottom clipping mask
        .fromTo(
          '.ai-driven-char',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.7 },
          '-=0.3'
        )
        // 3. Growth highlight badge pops in
        .fromTo(
          '.growth-highlight-box',
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' },
          '-=0.4'
        )
        // 4. Headline words staggered reveal
        .fromTo(
          '.headline-word',
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.035, duration: 0.8 },
          '-=0.4'
        )
        // 5. Rotating badge scale in
        .fromTo(
          '.hero-rotate-badge',
          { scale: 0.7, opacity: 0, rotation: -45 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.4)' },
          '-=0.5'
        )
        // 6. Pill tags stagger in
        .fromTo(
          '.hero-pill-item',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.04, duration: 0.5 },
          '-=0.5'
        )
        // 7. Subtitle and CTAs
        .fromTo(
          '.hero-subtext, .hero-cta-group',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
          '-=0.4'
        )
        // 8. Showcase cards with subtle parallax depth
        .fromTo(
          '.hero-showcase-card',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 },
          '-=0.4'
        );

      // Scroll-linked subtle parallax on showcase cards
      gsap.to('.hero-showcase-card', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-showcase-card',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Spotlight mouse tracking for feature pills
  const handlePillMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  const aiDrivenLetters = "AI-Driven".split('');

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative pt-28 pb-16 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#121212] via-[#141414] to-[#121212]"
    >
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#e57e25]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-4 w-[450px] h-[450px] bg-[#fb7500]/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Top Floating SEO & AI Tools Marquee Ticker */}
      <div id="tools" className="hero-ticker w-full overflow-hidden border-y border-white/5 bg-[#171717]/60 py-3 mb-10 md:mb-14 marquee-container scroll-mt-28">
        <div className="animate-marquee gap-8 items-center text-xs tracking-wider uppercase text-white/50 font-medium">
          {siteData.toolsTicker.concat(siteData.toolsTicker).map((tool, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-3 whitespace-nowrap hover:text-[#fb7500] transition-colors cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#e57e25]" />
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1620px] mx-auto px-6 md:px-12">
        {/* Hero Top Group: "AI-Driven" Big Heading + "Growth" Highlight Box */}
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
          {/* Eyebrow Banner Block */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6">
            {/* Animated "AI-Driven" Text with clipping mask */}
            <div className="overflow-hidden flex items-center">
              <h2 className="font-display font-semibold text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[110px] text-white tracking-tight leading-none">
                {aiDrivenLetters.map((char, i) => (
                  <span
                    key={i}
                    className="ai-driven-char inline-block will-change-transform"
                  >
                    {char}
                  </span>
                ))}
              </h2>
            </div>

            {/* "Growth" Highlight Box reproducing reference .hero-banner-highlight-box */}
            <div className="growth-highlight-box px-4 py-2 sm:px-6 sm:py-3 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#e57e25]/20 via-[#fb7500]/25 to-[#e57e25]/20 border border-[#e57e25]/50 backdrop-blur-md shadow-lg shadow-[#e57e25]/20 flex items-center justify-center">
              <span className="font-display font-medium text-2xl sm:text-4xl md:text-6xl lg:text-[75px] text-[#fb7500] tracking-tight leading-none">
                Growth
              </span>
            </div>
          </div>

          {/* Core Feature Pills with Radial Gradient Spotlight Cursor Effect */}
          <div className="hero-features-list flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-6 max-w-4xl">
            {siteData.hero.pillTags.map((tag) => (
              <a
                key={tag}
                href="#services"
                onMouseMove={handlePillMouseMove}
                className="hero-pill-item relative overflow-hidden px-4 py-2 text-xs sm:text-sm rounded-full bg-[#1b1b1b] border border-white/10 text-white/80 hover:border-[#e57e25] hover:text-[#fb7500] transition-colors duration-200 select-none group"
                style={{
                  background:
                    'radial-gradient(120px circle at var(--x, 50%) var(--y, 50%), rgba(255, 117, 0, 0.28), #1b1b1b 75%)'
                }}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#e57e25] group-hover:scale-150 transition-transform" />
                  {tag}
                </span>
              </a>
            ))}
          </div>

          {/* Main Headline with Dynamic Rotating Word and Layout Balance */}
          <div className="relative mt-4 mb-8 max-w-5xl">
            <h1 className="font-display font-semibold text-2xl sm:text-4xl md:text-5xl lg:text-[46px] text-white tracking-tight leading-[1.25]">
              {"We Rebuild With AI To Maximize Your Business Growth"
                .split(' ')
                .map((word, wIdx) => (
                  <span
                    key={wIdx}
                    className="inline-block overflow-hidden mr-[0.25em] align-top"
                  >
                    <span className="headline-word inline-block will-change-transform">
                      {word}
                    </span>
                  </span>
                ))}
              <span className="inline-block overflow-hidden align-top ml-1" style={{ perspective: '600px' }}>
                <span
                  ref={rotatingWordRef}
                  className="inline-block font-bold text-[#fb7500] underline decoration-[#e57e25]/60 decoration-wavy underline-offset-8 will-change-transform"
                >
                  {siteData.hero.rotatingWords[wordIndex]}
                </span>
              </span>
            </h1>
          </div>

          {/* Supporting Subtext */}
          <p className="hero-subtext text-base sm:text-lg md:text-xl text-[#999999] max-w-3xl leading-relaxed mb-10">
            We blend SEO, answer engine optimization (AEO), AI brand visibility, and bespoke web platforms to turn digital attention into measurable, lasting business growth.
          </p>

          {/* Action CTAs */}
          <div className="hero-cta-group flex flex-col sm:flex-row items-center justify-center gap-5 mb-14">
            <MagneticButton
              href="#contact"
              variant="primary"
              className="!px-9 !py-4 text-base font-semibold shadow-xl shadow-[#e57e25]/25"
            >
              Get Started
              <ArrowUpRight className="w-5 h-5 ml-1.5" />
            </MagneticButton>

            <MagneticButton
              href="#services"
              variant="outline"
              className="!px-8 !py-4 text-base"
            >
              Explore Services
              <ChevronRight className="w-5 h-5 ml-1 text-[#e57e25]" />
            </MagneticButton>
          </div>
        </div>

        {/* Hero Visual Composition: Rotating Badge + Showcase Cards */}
        <div className="relative mt-4 max-w-6xl mx-auto">
          {/* Rotating Circular Badge reproducing reference .rotate-image */}
          <div className="hero-rotate-badge absolute -top-12 -right-2 sm:-top-16 sm:right-6 md:right-10 z-20 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 pointer-events-none">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={siteData.hero.circularBadge}
                alt="AI Driven Growth Badge"
                decoding="async"
                className="w-full h-full object-contain animate-spin-slow filter drop-shadow-[0_0_15px_rgba(229,126,37,0.4)]"
              />
            </div>
          </div>

          {/* 3 Interactive Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteData.hero.floatingCards.map((card) => (
              <div
                key={card.title}
                className="hero-showcase-card group relative rounded-2xl overflow-hidden border border-white/10 bg-[#1b1b1b] p-3 transition-all duration-500 hover:border-[#e57e25]/70 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#e57e25]/15"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#242424]">
                  <img
                    src={card.img}
                    alt={card.title}
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#e57e25] text-black mb-2 shadow-md">
                      {card.tag}
                    </span>
                    <h3 className="text-lg md:text-xl font-display font-semibold text-white group-hover:text-[#fb7500] transition-colors">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Rolling Marquee Bar (Bottom of Hero) */}
      <div className="w-full overflow-hidden border-t border-white/10 bg-[#151515] py-4 mt-20 marquee-container">
        <div className="animate-marquee-reverse gap-10 items-center text-sm font-display text-white/75">
          {siteData.servicesTicker.concat(siteData.servicesTicker).map((s, idx) => (
            <div key={idx} className="inline-flex items-center gap-3.5 whitespace-nowrap">
              <span className="font-bold text-white hover:text-[#fb7500] transition-colors">
                {s.title}
              </span>
              <span className="text-[#999999] text-xs font-body">
                — {s.desc}
              </span>
              <span className="text-[#e57e25] mx-1 text-xs">★</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
