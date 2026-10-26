import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AnimatedText = ({
  text,
  className = '',
  tag = 'h2',
  delay = 0,
  stagger = 0.02,
  splitBy = 'letter'
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const targets = containerRef.current.querySelectorAll('.anim-unit');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          yPercent: 110,
          opacity: 0,
          rotateX: -30
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.75,
          stagger: stagger,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay, stagger, splitBy]);

  const Tag = tag;

  if (splitBy === 'word') {
    return (
      <Tag
        ref={containerRef}
        className={`inline-flex flex-wrap items-baseline ${className}`}
        style={{ perspective: '800px' }}
      >
        {text.split(' ').map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em] align-top">
            <span className="anim-unit inline-block will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      ref={containerRef}
      className={`inline-flex flex-wrap items-baseline ${className}`}
      style={{ perspective: '800px' }}
    >
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden align-top">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="anim-unit inline-block will-change-transform">
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
};
