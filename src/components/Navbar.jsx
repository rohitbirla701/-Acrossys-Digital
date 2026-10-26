import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { siteData } from '../data/siteData';
import { MagneticButton } from './MagneticButton';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openMobileSub, setOpenMobileSub] = useState({});
  const [logoError, setLogoError] = useState(false);

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const dropdownRef = useRef(null);

  // Scroll listener for sticky background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animation for Mobile Menu opening/closing
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const ctx = gsap.context(() => {
      if (mobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll('.mobile-item'),
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
        );
      }
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [mobileMenuOpen]);

  // Dropdown hover animation for Services / Tools
  useEffect(() => {
    if (!dropdownRef.current) return;

    const ctx = gsap.context(() => {
      if (activeDropdown) {
        gsap.fromTo(
          dropdownRef.current,
          { opacity: 0, y: 15, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' }
        );
      }
    }, dropdownRef);

    return () => ctx.revert();
  }, [activeDropdown]);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#121212]/92 backdrop-blur-md py-3.5 border-b border-white/10 shadow-2xl'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-[1620px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group focus:outline-none">
          {!logoError ? (
            <img
              src={siteData.brand.brandSvg}
              alt={siteData.brand.name}
              onError={() => setLogoError(true)}
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#e57e25] to-[#fb7500] flex items-center justify-center shadow-lg shadow-[#e57e25]/30">
                <span className="font-display font-black text-black text-sm">A</span>
              </div>
              <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-white group-hover:text-[#fb7500] transition-colors">
                ACROSSYS<span className="text-[#e57e25]">.</span>
              </span>
            </div>
          )}
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {siteData.navLinks.map((link, idx) => {
            const hasSub = !!link.subItems && link.subItems.length > 0;
            const isDropdownOpen = activeDropdown === link.label;

            if (hasSub) {
              const isLargeGrid = link.subItems.length > 8;

              return (
                <div
                  key={link.label}
                  className="relative group py-2"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#cccccc] hover:text-[#fb7500] transition-colors relative"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-white/50 transition-transform duration-200 group-hover:text-[#fb7500] ${
                        isDropdownOpen ? 'rotate-180 text-[#fb7500]' : ''
                      }`}
                    />
                  </a>

                  {/* Mega Panel Dropdown */}
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#181818]/98 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 transform-gpu ${
                        isLargeGrid
                          ? 'w-[780px] max-h-[500px] overflow-y-auto p-5 grid grid-cols-2 md:grid-cols-3 gap-2.5'
                          : 'w-[580px] p-6 grid grid-cols-2 gap-3'
                      }`}
                    >
                      {link.subItems.map((sub) => (
                        <a
                          key={sub.title}
                          href={sub.href}
                          target={sub.href.startsWith('http') ? '_blank' : '_self'}
                          rel={sub.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          onClick={() => setActiveDropdown(null)}
                          className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#e57e25]/50 hover:bg-white/[0.05] transition-all duration-200 group/item flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between mb-1 gap-1">
                            <span className="font-display font-semibold text-xs md:text-sm text-white group-hover/item:text-[#fb7500] transition-colors line-clamp-1">
                              {sub.title}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#e57e25] opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0" />
                          </div>
                          {sub.desc && (
                            <p className="text-[11px] text-[#999999] leading-relaxed line-clamp-2">
                              {sub.desc}
                            </p>
                          )}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Divider */}
                  {idx < siteData.navLinks.length - 1 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-3.5 bg-white/20 pointer-events-none" />
                  )}
                </div>
              );
            }

            return (
              <div key={link.label} className="relative flex items-center py-2">
                <a
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium text-[#cccccc] hover:text-[#fb7500] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#e57e25] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-250" />
                </a>

                {/* Divider bar matching reference CSS .main-header-menu > li:not(:last-child)::after */}
                {idx < siteData.navLinks.length - 1 && (
                  <span className="w-[1px] h-3.5 bg-white/20 pointer-events-none mx-0.5" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <MagneticButton
            href="#contact"
            variant="outline"
            className="!px-6 !py-2.5 !text-sm border-white/20 hover:border-[#e57e25] text-white hover:text-black hover:bg-[#e57e25]"
          >
            Contact Us
            <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#e57e25] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-[#e57e25] focus:outline-none transition-colors rounded-lg border border-white/10 bg-[#1b1b1b]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#fb7500]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden fixed inset-x-0 top-[65px] bg-[#121212]/98 backdrop-blur-2xl border-b border-white/10 max-h-[calc(100vh-65px)] overflow-y-auto px-6 py-6 shadow-2xl"
        >
          <nav className="flex flex-col gap-3">
            {siteData.navLinks.map((link) => {
              if (link.subItems && link.subItems.length > 0) {
                const isMobileOpen = !!openMobileSub[link.label];
                const isLargeList = link.subItems.length > 8;

                return (
                  <div key={link.label} className="mobile-item border-b border-white/5 pb-2">
                    <button
                      type="button"
                      onClick={() => setOpenMobileSub(prev => ({ ...prev, [link.label]: !prev[link.label] }))}
                      className="w-full flex items-center justify-between py-2.5 text-base font-display font-medium text-white hover:text-[#fb7500] text-left"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#e57e25] transition-transform duration-200 ${
                          isMobileOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isMobileOpen && (
                      <div className={`pl-3 pr-1 py-2 space-y-2 border-l border-white/10 my-2 ${isLargeList ? 'max-h-[380px] overflow-y-auto' : ''}`}>
                        {link.subItems.map((sub) => (
                          <a
                            key={sub.title}
                            href={sub.href}
                            target={sub.href.startsWith('http') ? '_blank' : '_self'}
                            rel={sub.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1.5 text-sm text-[#999999] hover:text-[#fb7500] transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-white/90 block line-clamp-1">{sub.title}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#e57e25] opacity-60 flex-shrink-0 ml-1" />
                            </div>
                            {sub.desc && <span className="text-xs text-white/50 block line-clamp-1">{sub.desc}</span>}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-item text-base font-display font-medium text-white/90 hover:text-[#fb7500] py-2.5 border-b border-white/5 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#e57e25]" />
                </a>
              );
            })}

            {/* Mobile Contact Button */}
            <div className="mobile-item pt-4">
              <MagneticButton
                href="#contact"
                variant="primary"
                className="w-full !py-3.5 text-center justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </MagneticButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
