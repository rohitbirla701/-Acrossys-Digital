import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data/siteData';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formCardRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );

      gsap.fromTo(
        formCardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formCardRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateField = (field, value) => {
    let error = '';
    switch (field) {
      case 'name':
        if (!value.trim()) {
          error = 'Please enter your name.';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters.';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Please enter your email.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'phone':
        if (value.trim() && !/^[+0-9\s()-]{7,20}$/.test(value.trim())) {
          error = 'Please enter a valid phone number.';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Please enter your message.';
        } else if (value.trim().length < 8) {
          error = 'Message should be at least 8 characters.';
        }
        break;
      case 'consent':
        if (!value) {
          error = 'You must agree to the privacy policy to submit.';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = {
      name: true,
      email: true,
      phone: true,
      message: true,
      consent: true
    };
    setTouched(allTouched);

    const newErrors = {};
    Object.keys(formData).forEach((k) => {
      const err = validateField(k, formData[k]);
      if (err) newErrors[k] = err;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Focus first error field
      const firstErrorField = Object.keys(newErrors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    // Realistic UI simulation for demo state without faking network data delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setDemoSubmitted(true);
    }, 700);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      consent: false
    });
    setErrors({});
    setTouched({});
    setDemoSubmitted(false);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-36 bg-[#121212] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#e57e25]/5 rounded-full blur-[170px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1620px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#1b1b1b]/80 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#e57e25] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[#e57e25] font-semibold">
              Get in Touch
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight">
            Contact Us
          </h2>
        </div>

        {/* Contact Form Card */}
        <div ref={formCardRef} className="max-w-3xl mx-auto">
          <div className="rounded-3xl p-5 sm:p-8 md:p-12 border border-white/10 bg-[#171717]/90 backdrop-blur-xl shadow-2xl transition-all duration-300">
            
            {demoSubmitted ? (
              <div className="text-center py-10 space-y-5 animate-fadeIn" role="status" aria-live="polite">
                <div className="w-16 h-16 rounded-full bg-[#e57e25]/15 border border-[#e57e25] flex items-center justify-center mx-auto text-[#fb7500] shadow-[0_0_20px_rgba(229,126,37,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Inquiry Validated (Frontend Demo)
                </h3>
                
                <p className="text-[#aaaaaa] max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                  All fields passed client-side validation successfully. This form is integration-ready for your backend API or email service.
                </p>

                {/* Submission Summary Preview */}
                <div className="p-5 rounded-2xl bg-[#1e1e1e] border border-white/10 text-left max-w-lg mx-auto text-xs sm:text-sm text-[#cccccc] space-y-2">
                  <div><strong className="text-white">Name:</strong> {formData.name}</div>
                  <div><strong className="text-white">Email:</strong> {formData.email}</div>
                  {formData.phone && <div><strong className="text-white">Phone:</strong> {formData.phone}</div>}
                  <div className="truncate"><strong className="text-white">Message:</strong> {formData.message}</div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#e57e25] hover:bg-[#fb7500] text-black font-display font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-[#e57e25]/20 hover:scale-105 active:scale-95"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider font-semibold text-white/80 mb-2">
                      Your Name <span className="text-[#fb7500]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`w-full px-5 py-4 rounded-xl bg-[#202020] border text-white placeholder-white/30 text-sm transition-all duration-200 focus:outline-none ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                          : 'border-white/10 hover:border-white/20 focus:border-[#e57e25] focus:ring-1 focus:ring-[#e57e25]/30'
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider font-semibold text-white/80 mb-2">
                      Your Email <span className="text-[#fb7500]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full px-5 py-4 rounded-xl bg-[#202020] border text-white placeholder-white/30 text-sm transition-all duration-200 focus:outline-none ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                          : 'border-white/10 hover:border-white/20 focus:border-[#e57e25] focus:ring-1 focus:ring-[#e57e25]/30'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider font-semibold text-white/80 mb-2">
                    Your Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Enter your number"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={`w-full px-5 py-4 rounded-xl bg-[#202020] border text-white placeholder-white/30 text-sm transition-all duration-200 focus:outline-none ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                        : 'border-white/10 hover:border-white/20 focus:border-[#e57e25] focus:ring-1 focus:ring-[#e57e25]/30'
                    }`}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Row 3: Message */}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider font-semibold text-white/80 mb-2">
                    Your Message <span className="text-[#fb7500]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full px-5 py-4 rounded-xl bg-[#202020] border text-white placeholder-white/30 text-sm transition-all duration-200 focus:outline-none resize-none ${
                      errors.message
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                        : 'border-white/10 hover:border-white/20 focus:border-[#e57e25] focus:ring-1 focus:ring-[#e57e25]/30'
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Row 4: Consent Checkbox */}
                <div>
                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => handleChange('consent', e.target.checked)}
                      onBlur={() => handleBlur('consent')}
                      aria-required="true"
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? 'consent-error' : undefined}
                      className="mt-1 w-4 h-4 rounded border-white/20 text-[#e57e25] focus:ring-[#e57e25] bg-[#222222] cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed cursor-pointer select-none">
                      I agree that my submitted data is being <span className="text-white underline hover:text-[#e57e25]">collected and stored</span>.
                    </label>
                  </div>
                  {errors.consent && (
                    <p id="consent-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.consent}</span>
                    </p>
                  )}
                </div>

                {/* Row 5: Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 rounded-full bg-[#e57e25] hover:bg-[#fb7500] text-black font-display font-semibold text-base tracking-wide transition-all duration-300 disabled:opacity-60 shadow-lg shadow-[#e57e25]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Validating...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>

        {/* Marquee Banner Strip (From reference DOM Container 20 / Contact) */}
        <div className="mt-20 w-full overflow-hidden border-y border-white/10 bg-[#151515] py-4 marquee-container">
          <div className="animate-marquee gap-10 items-center text-sm md:text-base font-display font-medium text-white/70">
            {siteData.contactBanner.concat(siteData.contactBanner).map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-4 whitespace-nowrap">
                <span>{item}</span>
                <span className="w-2 h-2 rounded-full bg-[#e57e25]" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
