import React from 'react';
import { AnimatedText } from './AnimatedText';

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const alignClass = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start',
    right: 'text-right items-end'
  }[align] || 'text-center mx-auto items-center';

  return (
    <div className={`flex flex-col mb-12 md:mb-16 max-w-4xl ${alignClass} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#1b1b1b]/80 backdrop-blur-sm mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e57e25] animate-ping" />
          <span className="text-xs uppercase tracking-widest text-[#e57e25] font-semibold">
            {eyebrow}
          </span>
        </div>
      )}

      {title && (
        <AnimatedText
          text={title}
          tag="h2"
          className="text-3xl md:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tight leading-[1.15]"
        />
      )}

      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-[#999999] leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
