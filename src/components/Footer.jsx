import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, MapPin, Mail, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { siteData } from '../data/siteData';

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const hoverContainerRef = useRef(null);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.__lenis) {
      window.__lenis.scrollTo(0, {
        duration: prefersReducedMotion ? 0.01 : 1.2,
        immediate: prefersReducedMotion
      });
    } else {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterStatus(null);
    }, 3500);
  };

  // 3D letter tilt tracking for "NIMAD TECH"
  useEffect(() => {
    const box = hoverContainerRef.current;
    if (!box) return;

    const letters = box.querySelectorAll('.tilt-letter');
    let active = null;

    const onPointerMove = (e) => {
      let hit = null;
      for (const el of letters) {
        const r = el.getBoundingClientRect();
        if (
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom
        ) {
          hit = el;
          break;
        }
      }

      if (hit !== active) {
        if (active) {
          active.style.removeProperty('--rx');
          active.style.removeProperty('--ry');
          active.classList.remove('is-active');
        }
        active = hit;
        if (active) active.classList.add('is-active');
      }

      if (!active) return;

      const r = active.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;

      active.style.setProperty('--rx', `${-y * 36}deg`);
      active.style.setProperty('--ry', `${x * 36}deg`);
    };

    const onPointerLeave = () => {
      if (active) {
        active.style.removeProperty('--rx');
        active.style.removeProperty('--ry');
        active.classList.remove('is-active');
        active = null;
      }
    };

    box.addEventListener('pointermove', onPointerMove, { passive: true });
    box.addEventListener('pointerleave', onPointerLeave);

    return () => {
      box.removeEventListener('pointermove', onPointerMove);
      box.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  const footerBrandLetters = "NIMAD TECH".split('');

  return (
    <footer className="bg-[#0b0b0b] text-[#999999] pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-[#e57e25]/5 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1620px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand & Accreditations (Col 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#hero" className="inline-flex items-center gap-3 group">
              <div className="bg-white/95 px-3 py-1.5 rounded-xl border border-white/20 shadow-md flex items-center group-hover:scale-105 transition-transform">
                <img
                  src={siteData.brand.brandSvg}
                  alt={siteData.brand.name}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>
            </a>

            <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#fb7500] font-display font-semibold text-xs tracking-wider uppercase">
                <Award className="w-4 h-4 flex-shrink-0" />
                <span>Our Agency Accreditations</span>
              </div>
              <p className="text-xs text-[#cccccc] leading-relaxed">
                {siteData.brand.accreditations}
              </p>
            </div>

            {/* Reference Newsletter Subscription Form */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/50 block">
                Stay Updated
              </span>
              <form onSubmit={handleNewsletterSubmit} className="relative flex items-center">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#e57e25] pr-12 transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 p-2 rounded-lg bg-[#e57e25] hover:bg-[#fb7500] text-black transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {/* Reference SVG Arrow */}
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 100 100">
                    <path d="M7.4,99c-1.6,0-3.3-0.6-4.5-1.9c-2.5-2.5-2.5-6.6,0-9.1L88,2.9c2.5-2.5,6.6-2.5,9.1,0c2.5,2.5,2.5,6.6,0,9.1 L12,97.1C10.7,98.4,9.1,99,7.4,99z" />
                    <path d="M92.5,82.4c-3.5,0-6.4-2.9-6.4-6.4V13.9H24c-3.5,0-6.4-2.9-6.4-6.4c0-3.5,2.9-6.4,6.4-6.4h68.5 c3.5,0,6.4,2.9,6.4,6.4V76C98.9,79.5,96,82.4,92.5,82.4L92.5,82.4z" />
                  </svg>
                </button>
              </form>
              {newsletterStatus === 'success' && (
                <p className="text-xs text-green-400 flex items-center gap-1 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed successfully!</span>
                </p>
              )}
              {newsletterStatus === 'error' && (
                <p className="text-xs text-red-400 animate-fadeIn">
                  Please enter a valid email address.
                </p>
              )}
            </div>
          </div>

          {/* Column 2: Address & Contact (Col 5-7) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider">
              Address
            </h4>
            
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e57e25] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-display text-xs uppercase tracking-wider mb-0.5">
                    United Kingdom :
                  </strong>
                  <span className="text-[#aaaaaa]">{siteData.brand.addresses.uk}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e57e25] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-display text-xs uppercase tracking-wider mb-0.5">
                    India :
                  </strong>
                  <span className="text-[#aaaaaa]">{siteData.brand.addresses.india}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider mb-2">
                Contact Us
              </h4>
              <a
                href={`mailto:${siteData.brand.contactEmail}`}
                className="text-white hover:text-[#fb7500] font-display text-sm inline-flex items-center gap-2 transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#e57e25] group-hover:scale-110 transition-transform" />
                <span>{siteData.brand.contactEmail}</span>
              </a>
            </div>
          </div>

          {/* Column 3: Verified Services Links (Col 8-10) */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {siteData.footerServices.map((s) => (
                <li key={s.title}>
                  <a
                    href={s.href}
                    className="hover:text-[#fb7500] transition-colors flex items-center justify-between group"
                  >
                    <span>{s.title}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#e57e25] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Explore & Legal Links (Col 11-12) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider mb-4">
                Explore
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {siteData.footerExplore.map((item) => (
                  <li key={item.title}>
                    <a href={item.href} className="hover:text-[#fb7500] transition-colors">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider mb-3">
                Legal
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {siteData.footerLegal.map((item) => (
                  <li key={item.title}>
                    <a href={item.href} className="hover:text-[#fb7500] transition-colors">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Massive 3D Interactive Typography (NIMAD TECH) */}
        <div
          ref={hoverContainerRef}
          className="nimad-hover-box py-14 sm:py-20 md:py-24 text-center select-none overflow-visible"
          style={{ perspective: '800px' }}
        >
          <div className="flex justify-center items-center flex-nowrap font-display font-black text-[clamp(28px,8.5vw,160px)] leading-none tracking-tight text-white">
            {footerBrandLetters.map((char, idx) => (
              <span
                key={idx}
                className="tilt-letter inline-block cursor-pointer transition-transform duration-200 ease-out will-change-transform"
                style={{
                  transform: 'translate3d(0,0,0)',
                  backfaceVisibility: 'hidden'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials, Scroll to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          
          <p className="text-[#888888]">
            © {siteData.brand.year} Nimad Tech. All Rights Reserved.
          </p>

          {/* Social Icons List matching Reference */}
          <div className="flex items-center gap-3">
            {siteData.brand.socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit Nimad Tech on ${s.name}`}
                className="w-8 h-8 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-[#aaaaaa] hover:text-[#fb7500] hover:border-[#e57e25] transition-all hover:scale-110 active:scale-95"
              >
                {s.name === 'Facebook' && (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 448 512">
                    <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
                  </svg>
                )}
                {s.name === 'Instagram' && (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 448 512">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                )}
                {s.name === 'LinkedIn' && (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 448 512">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                )}
                {s.name === 'X' && (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 512 512">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                )}
                {s.name === 'Pinterest' && (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 496 512">
                    <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z" />
                  </svg>
                )}
              </a>
            ))}
          </div>

          {/* Scroll to Top Action */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="flex items-center gap-2.5 text-[#aaaaaa] hover:text-[#fb7500] transition-colors cursor-pointer group"
          >
            <span className="font-medium">Scroll to Top</span>
            <div className="w-8 h-8 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center group-hover:border-[#e57e25] group-hover:bg-[#202020] transition-all">
              <ArrowUp className="w-3.5 h-3.5 text-[#e57e25] group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>

        </div>

      </div>
    </footer>
  );
};
