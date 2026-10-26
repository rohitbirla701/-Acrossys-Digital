import React, { useRef, useState } from 'react';

export const MagneticButton = ({ children, href, className = '', variant = 'outline', onClick }) => {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) * 0.25;
    const deltaY = (e.clientY - centerY) * 0.25;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative inline-flex items-center justify-center font-display font-medium text-sm md:text-base tracking-wider rounded-full transition-all duration-300 ease-out cursor-pointer overflow-hidden group select-none";
  
  const variants = {
    outline: "border border-white/20 text-white bg-transparent hover:border-[#e57e25] hover:text-black hover:bg-[#e57e25] px-7 py-3.5 md:px-9 md:py-4 shadow-sm",
    primary: "border border-[#e57e25] text-black bg-[#e57e25] hover:bg-[#fb7500] hover:border-[#fb7500] px-7 py-3.5 md:px-9 md:py-4 shadow-lg shadow-[#e57e25]/20",
    pill: "border border-white/15 text-white/90 bg-[#1b1b1b]/80 hover:border-[#e57e25] hover:text-[#fb7500] px-5 py-2 text-xs md:text-sm"
  };

  const combinedClass = `${baseStyles} ${variants[variant] || variants.outline} ${className}`;

  const content = (
    <span
      className="inline-flex items-center gap-2 transition-transform duration-200 ease-out"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={combinedClass}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={combinedClass}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
