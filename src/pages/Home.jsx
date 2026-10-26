import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { AgencySection } from '../sections/AgencySection';
import { GrowthFramework } from '../sections/GrowthFramework';
import { ServicesSection } from '../sections/ServicesSection';
import { CaseStudiesSection } from '../sections/CaseStudiesSection';
import { PerformanceSection } from '../sections/PerformanceSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { FAQSection } from '../sections/FAQSection';
import { BlogSection } from '../sections/BlogSection';
import { ContactSection } from '../sections/ContactSection';

export const Home = () => {
  return (
    <main className="w-full overflow-hidden">
      <HeroSection />
      <AgencySection />
      <GrowthFramework />
      <ServicesSection />
      <CaseStudiesSection />
      <PerformanceSection />
      <TestimonialsSection />
      <FAQSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
};
