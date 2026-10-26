import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data/siteData';

gsap.registerPlugin(ScrollTrigger);

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const timerRef = useRef(null);

  const testimonials = siteData.testimonials.items;
  const total = testimonials.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance timer
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isPaused || prefersReducedMotion) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Smooth slide transition effect
  useEffect(() => {
    if (!contentRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [currentIndex]);

  const currentItem = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#151515] relative overflow-hidden border-t border-white/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Background radial accent */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#e57e25]/5 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1620px] mx-auto px-6 md:px-12">
        {/* Main Testimonial 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Subtitle & Featured Image */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Subtitle Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#1b1b1b]/80 backdrop-blur-md mb-8 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#e57e25] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#e57e25] font-semibold">
                {siteData.testimonials.eyebrow}
              </span>
            </div>

            {/* Featured Image Card with Soft Shadow */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-2xl group">
              <img
                src={siteData.testimonials.featuredImage}
                alt="Client Experience"
                decoding="async"
                className="w-full h-[400px] sm:h-[480px] lg:h-[540px] object-cover object-center filter grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#999999] uppercase tracking-wider block">Real Partnership</span>
                  <span className="font-display font-semibold text-white text-sm sm:text-base">Results-Driven Collaboration</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#e57e25] shadow-[0_0_8px_#e57e25]" />
              </div>
            </div>
          </div>

          {/* Right Column: Carousel Slide Card */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[500px]">
            <div
              ref={contentRef}
              className="p-8 md:p-12 lg:p-14 rounded-3xl border border-white/10 bg-[#1b1b1b]/90 backdrop-blur-md shadow-2xl flex flex-col justify-between"
              aria-live="polite"
            >
              <div>
                {/* Reference SVG Quote Icon */}
                <div className="mb-8">
                  <svg
                    className="w-12 h-10 text-[#e57e25] fill-current opacity-80"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 190.5 148"
                    aria-hidden="true"
                  >
                    <path d="M37.7,146.3L2.1,124.6C19.3,100,28.2,74.1,28.8,46.7V2.3H90v38.8c0,19.3-5,38.8-15.1,58.4C64.9,119,52.5,134.6,37.7,146.3z M133.7,146.3l-35.6-21.7c17.2-24.5,26.2-50.5,26.8-77.9V2.3h61.2v38.8c0,19.3-5,38.8-15.1,58.4C160.9,119,148.5,134.6,133.7,146.3z" />
                  </svg>
                </div>

                {/* Service Tag / Title */}
                <h4 className="font-display font-bold text-2xl sm:text-3xl text-white mb-6 tracking-tight">
                  {currentItem.service}
                </h4>

                {/* Testimonial Quote Text with Minimum Height to Avoid Layout Jumping */}
                <div className="min-h-[140px] md:min-h-[160px]">
                  <p className="text-base sm:text-lg md:text-xl text-[#cccccc] font-normal leading-relaxed">
                    "{currentItem.quote}"
                  </p>
                </div>
              </div>

              {/* Bottom Info: Author & Navigation Controls */}
              <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={currentItem.avatar}
                    alt={currentItem.name}
                    decoding="async"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#e57e25] shadow-md flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <h5 className="font-display font-semibold text-white text-base sm:text-lg">
                      {currentItem.name}
                    </h5>
                    <span className="text-xs sm:text-sm text-[#999999] font-medium block">
                      {currentItem.role}
                    </span>
                  </div>
                </div>

                {/* Navigation Controls: Dots + Arrows Grouped on Right */}
                <div className="flex items-center gap-4 self-end sm:self-auto">
                  {/* Dots Indicator */}
                  <div className="flex items-center gap-1.5 mr-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`Go to slide ${idx + 1}`}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentIndex === idx
                            ? 'w-6 bg-[#e57e25]'
                            : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Arrow Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous Testimonial"
                      onClick={prevSlide}
                      className="w-11 h-11 rounded-full border border-white/15 bg-[#222222] flex items-center justify-center text-white hover:border-[#e57e25] hover:text-[#fb7500] hover:bg-[#282828] transition-all duration-200 active:scale-95"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next Testimonial"
                      onClick={nextSlide}
                      className="w-11 h-11 rounded-full border border-white/15 bg-[#222222] flex items-center justify-center text-white hover:border-[#e57e25] hover:text-[#fb7500] hover:bg-[#282828] transition-all duration-200 active:scale-95"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Client Logos Marquee (Container 17) */}
        <div className="mt-24 pt-16 border-t border-white/10 marquee-container">
          <p className="text-center text-xs uppercase tracking-widest text-[#999999] font-semibold mb-10">
            Trusted by Ambitious Brands Worldwide
          </p>
          <div className="animate-marquee gap-16 md:gap-24 items-center opacity-70 hover:opacity-100 transition-opacity">
            {siteData.clientLogos.concat(siteData.clientLogos).map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt={`Partner Brand Logo ${(idx % 8) + 1}`}
                decoding="async"
                className="h-9 md:h-11 w-auto max-w-[140px] md:max-w-[160px] object-contain filter grayscale hover:grayscale-0 transition-all brightness-150 duration-300"
                loading="lazy"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
