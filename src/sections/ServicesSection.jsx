import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search,
  Link2,
  Bot,
  PenTool,
  Cpu,
  MapPin,
  ShieldCheck,
  Share2,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { siteData } from '../data/siteData';
import { AnimatedText } from '../components/AnimatedText';
import { MagneticButton } from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = [
  Search,
  Link2,
  Bot,
  PenTool,
  Cpu,
  MapPin,
  ShieldCheck,
  Share2
];

export const ServicesSection = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  // GSAP ScrollTrigger Stagger Entrance
  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cards = gridRef.current.querySelectorAll('.service-grid-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          y: 45,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-24 md:py-36 bg-[#121212] relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#fb7500]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1620px] mx-auto px-6 md:px-12">
        {/* Top Header Group */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#1b1b1b]/80 mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e57e25]" />
              <span className="text-xs uppercase tracking-widest text-[#e57e25] font-semibold">
                Specialized Capabilities
              </span>
            </div>

            <AnimatedText
              text="Services"
              tag="h2"
              splitBy="letter"
              className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white tracking-tight leading-none mb-6"
            />

            <p className="text-base sm:text-lg text-[#999999] leading-relaxed max-w-2xl">
              Engineered solutions designed to capture search intent, drive high-margin organic pipeline, and establish undeniable brand authority across both traditional and AI search.
            </p>
          </div>

          <div className="flex-shrink-0">
            <MagneticButton href="#contact" variant="outline" className="!text-sm">
              Request Full Service Proposal
              <ArrowUpRight className="w-4 h-4 ml-2 text-[#e57e25]" />
            </MagneticButton>
          </div>
        </div>

        {/* 8 Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {siteData.services.map((service, idx) => {
            const Icon = serviceIcons[idx] || Search;

            return (
              <div
                key={service.title}
                className="service-grid-card group relative rounded-3xl p-7 md:p-8 border border-white/10 bg-[#1b1b1b]/85 backdrop-blur-sm transition-all duration-300 hover:border-[#e57e25] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#e57e25]/15 flex flex-col justify-between"
              >
                <div>
                  {/* Service Icon Box */}
                  <div className="w-13 h-13 rounded-2xl bg-[#222222] border border-white/10 flex items-center justify-center text-[#e57e25] group-hover:bg-[#e57e25] group-hover:text-black transition-all duration-300 mb-6 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-semibold text-white mb-3 group-hover:text-[#fb7500] transition-colors leading-snug">
                    <a href={service.link || "#contact"} className="hover:underline">
                      {service.title}
                    </a>
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#999999] mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Checklist of 4 Bullets */}
                  <ul className="space-y-2.5">
                    {service.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#cccccc] group-hover:text-white transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#e57e25] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer Link */}
                <a
                  href={service.link || "#contact"}
                  className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-white/50 group-hover:text-white transition-colors"
                >
                  <span>Explore Offering</span>
                  <div className="w-7 h-7 rounded-full bg-[#242424] flex items-center justify-center group-hover:bg-[#e57e25] group-hover:text-black transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#e57e25] group-hover:text-black transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
