import React, { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data/siteData';
import { MagneticButton } from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const BlogSection = () => {
  const sectionRef = useRef(null);
  const bannerRef = useRef(null);
  const floatingImageRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Coordinated entrance for blog cards
      gsap.fromTo(
        '.blog-card-item',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blog-grid',
            start: 'top 85%',
            once: true
          }
        }
      );

      // Parallax / subtle tilt for Develop image in transition banner
      if (floatingImageRef.current && bannerRef.current) {
        gsap.to(floatingImageRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#151515] relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-[1620px] mx-auto px-6 md:px-12">
        
        {/* Section Heading & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#1b1b1b]/80 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#e57e25] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#e57e25] font-semibold">
                Insights & Updates
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight">
              Blogs
            </h2>
          </div>

          <MagneticButton
            href="#blog"
            variant="outline"
            className="!text-sm flex-shrink-0"
          >
            <span>View All Articles</span>
            <ArrowUpRight className="w-4 h-4 ml-2 text-[#e57e25]" />
          </MagneticButton>
        </div>

        {/* 3-Column Blog Cards Grid (Matching reference layout) */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.blogs.map((blog) => (
            <article
              key={blog.title}
              className="blog-card-item group rounded-2xl border border-white/10 bg-[#1b1b1b] overflow-hidden hover:border-[#e57e25] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Media Holder with Date Boxed Badge */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#242424]">
                  <a href={blog.link || "#blog"} className="block w-full h-full">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </a>

                  {/* Reference Date-Boxed Badge */}
                  <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/15 text-white font-display text-xs font-semibold tracking-wide">
                    {blog.date}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 md:p-8">
                  {/* Category Pills */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {blog.categories.map((cat, i) => (
                      <React.Fragment key={cat}>
                        <span className="text-xs uppercase tracking-wider font-semibold text-[#fb7500]">
                          {cat}
                        </span>
                        {i < blog.categories.length - 1 && (
                          <span className="text-white/30 text-xs">•</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Title */}
                  <h4 className="font-display font-semibold text-lg sm:text-xl text-white group-hover:text-[#fb7500] transition-colors leading-snug">
                    <a
                      href={blog.link || "#blog"}
                      className="hover:underline focus:outline-none"
                    >
                      {blog.title}
                    </a>
                  </h4>
                </div>
              </div>

              {/* Bottom Read More Action */}
              <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
                <a
                  href={blog.link || "#blog"}
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#e57e25] group-hover:text-white transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Container 20: Design • Develop • Launch Transition Banner */}
        <div
          ref={bannerRef}
          className="mt-28 md:mt-36 rounded-3xl p-8 sm:p-12 md:p-20 border border-white/10 bg-gradient-to-b from-[#1c1c1c] via-[#171717] to-[#121212] relative overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#e57e25]/10 rounded-full blur-[160px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            
            {/* Massive Typographic Headline with Visual Separators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-10">
              <span className="hover:text-[#e57e25] transition-colors">
                {siteData.designDevelopLaunch.title1}
              </span>
              
              <div className="w-12 h-[2px] sm:w-16 sm:h-[3px] bg-gradient-to-r from-[#e57e25] to-[#fb7500] rounded-full" />
              
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e57e25] to-[#fb7500]">
                {siteData.designDevelopLaunch.title2}
              </span>
              
              <div className="w-12 h-[2px] sm:w-16 sm:h-[3px] bg-gradient-to-r from-[#fb7500] to-[#e57e25] rounded-full" />
              
              <span className="hover:text-[#e57e25] transition-colors">
                {siteData.designDevelopLaunch.title3}
              </span>
            </div>

            {/* Featured Showcase Floating Image */}
            <div className="max-w-xl mx-auto mb-10 relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
              <div ref={floatingImageRef} className="will-change-transform">
                <img
                  src={siteData.designDevelopLaunch.image}
                  alt="Develop Nimad Tech"
                  decoding="async"
                  className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#aaaaaa] leading-relaxed mb-10">
              From strategic concept design to enterprise web engineering and precision launch execution, we deliver cohesive digital systems built for measurable longevity.
            </p>

            <div className="flex justify-center">
              <MagneticButton
                href={siteData.designDevelopLaunch.ctaLink}
                variant="primary"
                className="!px-8 !py-4 !text-base"
              >
                <span>{siteData.designDevelopLaunch.ctaText}</span>
                <ArrowUpRight className="w-5 h-5 ml-2" />
              </MagneticButton>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
