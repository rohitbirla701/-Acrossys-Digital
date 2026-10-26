import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { siteData } from '../data/siteData';
import { AnimatedText } from '../components/AnimatedText';
import { MagneticButton } from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const CaseStudiesSection = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // GSAP ScrollTrigger Entrance for the Case Study Cards
  useEffect(() => {
    if (!gridRef.current || !containerRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cards = gridRef.current.querySelectorAll('.case-study-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          y: 60,
          opacity: 0,
          scale: 0.96
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
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

  // Cursor-following info badge tracking (recreating qodef-item-layout--info-follow)
  const handleMouseMove = (e, index) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
    if (hoveredCard !== index) setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section
      id="case-studies"
      ref={containerRef}
      className="py-24 md:py-36 bg-[#151515] relative overflow-hidden border-t border-white/5"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#e57e25]/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1620px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#1b1b1b]/80 mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e57e25]" />
              <span className="text-xs uppercase tracking-widest text-[#e57e25] font-semibold">
                Featured Work & Portfolio
              </span>
            </div>

            <AnimatedText
              text="Case Studies"
              tag="h2"
              splitBy="letter"
              className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white tracking-tight leading-none mb-4"
            />

            <p className="text-base sm:text-lg text-[#999999] max-w-xl leading-relaxed">
              Explore how our AI-driven search models, organic architectures, and data engineering deliver verified exponential client scale.
            </p>
          </div>

          <div className="flex-shrink-0">
            <MagneticButton
              href="#case-studies"
              variant="outline"
              className="!text-sm"
            >
              View All Projects
              <ArrowUpRight className="w-4 h-4 ml-2 text-[#e57e25]" />
            </MagneticButton>
          </div>
        </div>

        {/* Case Studies Grid (recreating qodef-col-num--3 layout) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {siteData.caseStudies.map((project, idx) => {
            const isHovered = hoveredCard === idx;

            return (
              <article
                key={project.id}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={handleMouseLeave}
                className="case-study-card group relative rounded-3xl overflow-hidden border border-white/10 bg-[#161616] aspect-[5/6] transition-all duration-500 hover:border-[#e57e25]/80 hover:shadow-2xl hover:shadow-[#e57e25]/25 cursor-pointer"
              >
                {/* Full-Bleed Image: Black & White by default, Real Color on Hover */}
                <img
                  src={project.image}
                  alt={project.title}
                  decoding="async"
                  className="w-full h-full object-cover grayscale contrast-110 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-108 will-change-transform"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay: Hidden by default, visible on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Category Tags: Hidden by default, slides down on hover */}
                <div className="absolute top-5 left-5 right-5 flex flex-wrap gap-2 z-10 pointer-events-none opacity-0 -translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1 text-xs font-semibold rounded-full bg-black/80 backdrop-blur-md border border-[#e57e25]/50 text-white/95 shadow-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Cursor-Following Floating Info Badge (info-follow effect) on desktop */}
                {isHovered && (
                  <div
                    className="hidden lg:flex absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
                    style={{
                      left: `${cursorPos.x}px`,
                      top: `${cursorPos.y}px`
                    }}
                  >
                    <div className="px-4 py-2 rounded-full bg-black/90 backdrop-blur-xl border border-[#e57e25] text-white text-xs font-display font-semibold shadow-2xl flex items-center gap-2 whitespace-nowrap">
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#fb7500]" />
                    </div>
                  </div>
                )}

                {/* Bottom Content Area: Hidden by default, slides up on hover */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col justify-end opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none group-hover:pointer-events-auto">
                  {/* Metric Ribbon */}
                  {project.metrics && (
                    <div className="mb-3">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 text-white text-xs font-semibold shadow-md">
                        <TrendingUp className="w-3.5 h-3.5 text-[#fb7500]" />
                        <span>{project.metrics}</span>
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-white group-hover:text-[#fb7500] transition-colors leading-tight mb-2.5">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  {/* CTA link row */}
                  <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
                    <span>Read Full Case Study</span>
                    <div className="w-8 h-8 rounded-full bg-[#242424] border border-white/10 flex items-center justify-center group-hover:bg-[#e57e25] group-hover:border-[#e57e25] transition-all">
                      <ArrowUpRight className="w-4 h-4 text-[#e57e25] group-hover:text-black transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Clickable Full-Card Link (stays internal) */}
                <a
                  href={project.link || "#case-studies"}
                  className="absolute inset-0 z-10 focus:outline-none"
                  aria-label={`View Case Study: ${project.title}`}
                />
              </article>
            );
          })}
        </div>

        {/* Bottom Centered CTA */}
        <div className="text-center mt-16 pt-8 border-t border-white/5">
          <p className="text-xs uppercase tracking-widest text-[#999999] font-medium mb-6">
            Looking for tailored metrics in your vertical?
          </p>
          <MagneticButton
            href="#contact"
            variant="primary"
            className="!px-10 !py-4 font-semibold text-sm sm:text-base shadow-xl shadow-[#e57e25]/20"
          >
            Start Your Case Study
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
