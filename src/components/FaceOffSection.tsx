"use client";

import { useEffect, useRef, useState } from "react";


const SpiderLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="w-[0.8em] h-[0.8em] -translate-y-[0.1em] opacity-80"
  >
    <path fill="currentColor" d="M50 15 L58 35 L50 85 L42 35 Z" />
    <path fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" d="M45 35 L20 15 L15 35 M55 35 L80 15 L85 35" />
    <path fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" d="M45 42 L10 40 L5 60 M55 42 L90 40 L95 60" />
    <path fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" d="M46 50 L15 75 L20 95 M54 50 L85 75 L80 95" />
    <path fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" d="M47 65 L40 95 M53 65 L60 95" />
  </svg>
);

export default function FaceOffSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-spider-red halftone-overlay selection:bg-spider-yellow selection:text-spider-black font-mono overflow-hidden py-12 md:py-24 flex items-center justify-center"
    >
      {/* ─── HUD SEPARATOR ─────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 w-full h-16 pointer-events-none z-50 flex flex-col items-center">
        {/* Glowing Thread Line */}

        <div className="w-full h-px bg-linear-to-r from-transparent via-spider-yellow/40 to-transparent shadow-[0_0_12px_rgba(255,214,0,0.3)]" />
        {/* Minimalist Data Tag */}

      </div>
      {/* BACKGROUND DECORATIVE ELEMENTS */}
      <div
        className={`absolute inset-0 pointer-events-none flex items-center justify-center font-bangers text-[60vh] text-spider-white leading-none overflow-hidden select-none z-0 transition-opacity duration-1000 ease-out ${isVisible ? "opacity-[0.05]" : "opacity-0"
          }`}
      >
        VS
      </div>

      {/* INFINITE MARQUEE */}
      <div className="absolute bottom-8 md:bottom-16 left-0 w-full overflow-hidden pointer-events-none z-5 opacity-[0.15]">

        <div className="flex w-max" style={{ animation: "shadowMarquee 40s linear infinite" }}>
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className="flex items-center font-bangers text-3xl md:text-5xl lg:text-[4vw] text-spider-black tracking-widest leading-none whitespace-nowrap">
              <span className="px-4 md:px-6">ANYBODY WHO DARES TO DREAM IS A HERO</span>
              <SpiderLogo />
              <span className="px-4 md:px-6">ANYONE CAN WEAR THE MASK</span>
              <SpiderLogo />
            </div>
          ))}
        </div>
      </div>


      {/* LEFT IMAGE - Spiderman With Mask */}
      <div className="absolute left-0 bottom-0 w-[45vw] lg:w-[40vw] xl:w-[35vw] h-[85vh] lg:h-[95vh] z-10 hidden md:block pointer-events-none overflow-hidden">
        <img
          src="/assets/w-mask-fo.png"
          alt="Masked Spider-Man"
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover object-bottom drop-shadow-[20px_0_35px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-out delay-100 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
            }`}
        />
      </div>
      {/* RIGHT IMAGE - Miles Morales Without Mask */}
      <div className="absolute right-0 bottom-0 w-[45vw] lg:w-[40vw] xl:w-[35vw] h-[85vh] lg:h-[95vh] z-10 hidden md:block pointer-events-none overflow-hidden">
        <img
          src="/assets/wo-mask-fo.png"
          alt="Miles Morales Unmasked"
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover object-bottom drop-shadow-[-20px_0_35px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-out delay-100 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
        />
      </div>

      {/* CENTER CONTENT - Fluid layout to prevent image overlap */}
      <div
        className="relative z-20 w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center mt-4 md:mt-0"
        style={{
          maxWidth: "clamp(20rem, 95vw, 85rem)",
          paddingLeft: "clamp(1rem, 5vw, 4rem)",
          paddingRight: "clamp(1rem, 5vw, 4rem)",
          gap: "clamp(1rem, 6vh, 8rem)"
        }}
      >

        {/* LEFT COLUMN: THE HERO */}
        <div
          className={`flex flex-col items-center md:items-end text-center md:text-right h-full transition-all duration-1000 ease-out delay-300 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
        >
          <div className="space-y-4 md:space-y-8 flex-1 flex flex-col items-center md:items-end">
            <div className="space-y-[-5px] md:space-y-[-10px]">
              <h2
                className="font-bangers tracking-wider text-spider-white leading-none whitespace-nowrap"
                style={{ fontSize: "clamp(2.5rem, 11vw, 4.5rem)" }} // Base font size
              >
                <span className="md:text-[clamp(2rem,5.5vw,6rem)]">THE HERO</span>
              </h2>
              <h3
                className="font-bangers tracking-wide text-spider-black leading-none opacity-80 whitespace-nowrap"
                style={{ fontSize: "clamp(1.8rem, 7vw, 3rem)" }} // Base font size
              >
                <span className="inline md:hidden md:text-[clamp(1.4rem,4vw,4.375rem)]">SPIDER-MAN</span>
                <span className="hidden md:inline md:text-[clamp(1.4rem,4vw,4.375rem)]">SPIDER-MANNN</span>
              </h3>
            </div>

            <div
              className="flex flex-col items-center md:items-end space-y-2 md:space-y-3 font-mono tracking-[0.2em] md:tracking-widest uppercase text-spider-black"
              style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)" }}
            >
              <div className="md:hidden flex flex-col items-center gap-1.5 md:gap-3">
                <span className="font-bold">Bio-Electric Venom Strike</span>
                <span className="font-bold">Wall Crawling</span>
                <span className="font-bold">Camouflage</span>
              </div>
              <div className="hidden md:flex flex-col items-end gap-3 text-[clamp(0.6rem,1vw,1rem)]">
                <span className="font-bold">Bio-Electric Venom Strike</span>
                <span className="font-bold">Wall Crawling</span>
                <span className="font-bold">Camouflage</span>
              </div>

              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-spider-black/20 w-full max-w-[200px] flex justify-center md:justify-end">
                <span className="text-[0.65rem] md:text-xs text-spider-black/50 tracking-[0.2em] font-bold"><span className="">THREAT</span> / MULTIVERSE</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE KID */}
        <div
          className={`flex flex-col items-center md:items-start text-center md:text-left h-full transition-all duration-1000 ease-out delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
        >
          <div className="space-y-4 md:space-y-8 flex-1 flex flex-col items-center md:items-start">
            <div className="space-y-[-5px] md:space-y-[-10px]">
              <h2
                className="font-bangers tracking-wider text-spider-white leading-none whitespace-nowrap"
                style={{ fontSize: "clamp(2.5rem, 11vw, 4.5rem)" }} // Base font size
              >
                <span className="md:text-[clamp(2rem,5.5vw,6rem)]">THE KID</span>
              </h2>
              <h3
                className="font-bangers tracking-wide text-spider-black leading-none opacity-80 whitespace-nowrap"
                style={{ fontSize: "clamp(1.8rem, 7vw, 3rem)" }} // Base font size
              >
                <span className="md:text-[clamp(1.4rem,4vw,4.375rem)]">MILES MORALES</span>
              </h3>
            </div>

            <div
              className="flex flex-col items-center md:items-start space-y-2 md:space-y-3 font-mono tracking-[0.2em] md:tracking-widest uppercase text-spider-black"
              style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)" }}
            >
              <div className="md:hidden flex flex-col items-center gap-1.5 md:gap-3">
                <span className="font-bold">Brooklyn, NY</span>
                <span className="font-bold"><span className="hidden md:inline">Midtown</span> High Student</span>
                <span className="text-spider-yellow font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Artist. Son. Hero.</span>
              </div>
              <div className="hidden md:flex flex-col items-start gap-3 text-[clamp(0.6rem,1vw,1rem)]">
                <span className="font-bold">Brooklyn, NY</span>
                <span className="font-bold">Midtown High Student</span>
                <span className="text-spider-yellow font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Artist. Son. Hero.</span>
              </div>

              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-spider-black/20 w-full max-w-[200px] flex justify-center md:justify-start">
                <span className="text-[0.65rem] md:text-xs text-spider-black/50 tracking-[0.2em] font-bold">STATUS / ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* MOBILE ONLY IMAGES */}
      <div className="md:hidden flex w-full h-[40vh] mt-12 z-10 bottom-0 absolute overflow-hidden pointer-events-none">
        <img
          src="/assets/w-mask-fo.png"
          alt="Masked Spider-Man"
          loading="lazy"
          decoding="async"
          className={`w-1/2 h-full object-cover object-bottom drop-shadow-[5px_0_15px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-out delay-100 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
        />
        <img
          src="/assets/wo-mask-fo.png"
          alt="Miles Morales Unmasked"
          loading="lazy"
          decoding="async"
          className={`w-1/2 h-full object-cover object-bottom drop-shadow-[-5px_0_15px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-out delay-100 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
        />
      </div>
    </section>
  );
}