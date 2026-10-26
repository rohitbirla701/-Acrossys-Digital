import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    }
    return false;
  });
  const rafId = useRef(null);

  useEffect(() => {
    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      });
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const checkHover = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;
      const isInteractive = target.closest('a, button, input, textarea, select, label, .cursor-pointer, [role="button"]');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousemove', checkHover, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', checkHover);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central Pointer Dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#fb7500] rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-[0_0_10px_#fb7500]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isHovered ? 0 : 1})`,
        }}
        aria-hidden="true"
      />
      
      {/* Outer Follower Ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 border border-[#fb7500]/70 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${pos.x - 14}px, ${pos.y - 14}px, 0) scale(${isHovered ? 1.7 : 1})`,
          backgroundColor: isHovered ? 'rgba(251, 117, 0, 0.18)' : 'transparent',
          backdropFilter: isHovered ? 'blur(1px)' : 'none'
        }}
        aria-hidden="true"
      />
    </>
  );
};
