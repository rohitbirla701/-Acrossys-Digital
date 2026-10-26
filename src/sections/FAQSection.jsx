import React, { useState, useRef } from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';
import { siteData } from '../data/siteData';
import { MagneticButton } from '../components/MagneticButton';

export const FAQSection = () => {
  // Allow toggling items, default first item open
  const [openIndices, setOpenIndices] = useState([0]);
  const buttonRefs = useRef([]);

  const toggle = (idx) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % siteData.faq.items.length;
      buttonRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + siteData.faq.items.length) % siteData.faq.items.length;
      buttonRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <section id="faq" className="py-24 md:py-36 bg-[#121212] relative overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div
        className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#fb7500]/5 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1620px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & CTA (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#1b1b1b]/80 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#e57e25] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#e57e25] font-semibold">
                Common Questions
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight mb-6">
              {siteData.faq.headline}
            </h2>

            <p className="text-base md:text-lg text-[#aaaaaa] leading-relaxed mb-8">
              {siteData.faq.subtitle}
            </p>

            <MagneticButton href={siteData.faq.ctaLink} variant="primary">
              <span>{siteData.faq.ctaText}</span>
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </MagneticButton>
          </div>

          {/* Right Column: Accessible FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4" role="region" aria-label="Frequently Asked Questions">
            {siteData.faq.items.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);
              const questionId = `faq-question-${idx}`;
              const answerId = `faq-answer-${idx}`;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-[#e57e25] bg-[#1a1a1a] shadow-[0_4px_24px_rgba(229,126,37,0.08)]'
                      : 'border-white/10 bg-[#161616]/80 hover:border-white/25'
                  }`}
                >
                  <button
                    ref={(el) => (buttonRefs.current[idx] = el)}
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggle(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="w-full p-5 sm:p-6 md:p-8 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e57e25] group"
                  >
                    <span className="font-display font-semibold text-white text-base md:text-lg lg:text-xl group-hover:text-[#fb7500] transition-colors leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#e57e25] text-black rotate-45 shadow-[0_0_12px_rgba(229,126,37,0.5)]'
                          : 'bg-[#222222] text-white/70 group-hover:bg-[#2a2a2a] group-hover:text-white'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accessible Collapsible Container using CSS Grid rows */}
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-8 pt-0 text-sm md:text-base text-[#aaaaaa] leading-relaxed border-t border-white/5">
                        <p className="pt-4">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
