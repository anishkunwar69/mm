"use client";

import { useEffect, useRef } from "react";

/* Pure math helpers — outside component for stable references */
const mapRange = (val: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  outMin + (outMax - outMin) * Math.min(Math.max((val - inMin) / (inMax - inMin), 0), 1);

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

export default function OriginSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const videoInnerAlignerRef = useRef<HTMLDivElement>(null);
  const quoteLine1Ref = useRef<HTMLDivElement>(null);
  const quoteLine2Ref = useRef<HTMLDivElement>(null);
  const quoteLine3Ref = useRef<HTMLDivElement>(null);
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingWhiteRef = useRef<HTMLHeadingElement>(null);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);



  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollableDistance = rect.height - windowHeight;
      // Clamp between 0 and 1
      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);

      targetProgress.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();

    const animate = () => {
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      // Smooth lerp - increased to 0.12 for faster responsiveness
      currentProgress.current = lerp(currentProgress.current, targetProgress.current, 0.12);
      const p = currentProgress.current;

      if (videoWrapperRef.current && videoInnerAlignerRef.current) {
        // From left: 50% to left: 0%
        // From width: 50% to width: 100%
        const currentLeft = 50 * (1 - p);
        const currentWidth = 50 + (50 * p);

        videoWrapperRef.current.style.left = `${currentLeft}%`;
        videoWrapperRef.current.style.width = `${currentWidth}%`;

        // Offset the inner aligner by the negative of currentLeft so its 0 matches the screen's 0
        videoInnerAlignerRef.current.style.transform = `translateX(-${currentLeft}vw)`;
      }

      if (headingRef.current && headingWhiteRef.current) {
        // Fade out heading almost immediately as requested (first 10% of scroll)
        const headingProgress = Math.min(p / 0.1, 1);
        const opacity = (1 - headingProgress).toString();
        const transform = `translate(-50%, -50%) scale(${1 + headingProgress * 0.1})`;

        headingRef.current.style.opacity = opacity;
        headingRef.current.style.transform = transform;

        headingWhiteRef.current.style.opacity = opacity;
        headingWhiteRef.current.style.transform = transform;
      }

      // Parallax for decorative background text
      if (bgTextRef.current) {
        bgTextRef.current.style.transform = `translateY(-${p * 15}vh)`;
      }

      // Fast, snappy staggered sequences with smooth quartic easing
      if (quoteLine1Ref.current) {
        const q1Prog = mapRange(p, 0.15, 0.35, 0, 1);
        const ease1 = 1 - Math.pow(1 - q1Prog, 4);
        const scale1 = 1 + 1.5 * (1 - ease1);
        const blur1 = 15 * (1 - ease1);
        quoteLine1Ref.current.style.opacity = ease1.toString();
        quoteLine1Ref.current.style.transform = `scale(${scale1}) rotate(-2deg)`;
        quoteLine1Ref.current.style.filter = `blur(${blur1}px)`;
      }

      if (quoteLine2Ref.current) {
        const q2Prog = mapRange(p, 0.25, 0.45, 0, 1);
        const ease2 = 1 - Math.pow(1 - q2Prog, 4);
        const x2 = -80 * (1 - ease2);
        quoteLine2Ref.current.style.opacity = ease2.toString();
        quoteLine2Ref.current.style.transform = `translateX(${x2}vw) rotate(1.5deg)`;
      }

      if (quoteLine3Ref.current) {
        const q3Prog = mapRange(p, 0.35, 0.55, 0, 1);
        const ease3 = 1 - Math.pow(1 - q3Prog, 4);
        const rotX = 90 * (1 - ease3);
        quoteLine3Ref.current.style.opacity = ease3.toString();
        quoteLine3Ref.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotate(-1deg)`;
      }

      // Fade out all quotes for video-only experience at the end
      if (quoteContainerRef.current) {
        const fadeOutProg = mapRange(p, 0.65, 0.85, 0, 1);
        // Smooth easing for the fade out
        const fadeOutEase = fadeOutProg * fadeOutProg * (3 - 2 * fadeOutProg);

        quoteContainerRef.current.style.opacity = (1 - fadeOutEase).toString();
        quoteContainerRef.current.style.transform = `scale(${1 + fadeOutEase * 0.05})`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* Pause animation loop when section is off-screen */
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-spider-red halftone-overlay selection:bg-spider-yellow selection:text-spider-black font-mono"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* SUBTLE DECORATIVE LEFT SIDE ELEMENTS - Minimal list of aesthetic details */}
        <div className="absolute inset-y-0 left-0 w-1/2 pointer-events-none z-0 overflow-hidden">
          {/* Extremely Faint Background Watermark Parallax */}
          <div
            ref={bgTextRef}
            className="absolute top-[30%] -left-[5%] font-bangers text-[35vw] text-spider-black opacity-[0.02] leading-none"
          >
            1610
          </div>

          {/* Minimal structural line */}
          <div className="absolute top-0 bottom-0 left-[6%] md:left-[8%] w-px bg-spider-black/10"></div>

          {/* Subtle Chapter Marker */}
          <div className="absolute top-[15%] left-[6%] md:left-[8%] -translate-x-1/2 flex flex-col items-center gap-6 mix-blend-overlay">
            <div className="w-1.5 h-1.5 rounded-full bg-spider-yellow opacity-60"></div>
            <div
              className="font-mono text-spider-black/40 text-[0.65rem] md:text-xs tracking-[0.5em] font-bold"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              SEC_01 // ORIGIN
            </div>
            <div className="w-px h-16 bg-spider-black/20"></div>
          </div>
        </div>

        {/* BLACK TEXT (Visible primarily on the left side) */}
        <h2
          ref={headingRef}
          className="absolute top-1/2 left-1/2 w-full z-10 font-bangers leading-[0.85] text-spider-black text-center pointer-events-none px-4 drop-shadow-sm"
          style={{ transform: "translate(-50%, -50%)", fontSize: "clamp(1.75rem, 8vw, 6rem)" }}
        >
          WITH GREAT POWER COMES<br />GREAT RESPONSIBILITY
        </h2>

        {/* RIGHT SIDE (Initially half width) */}
        <div
          ref={videoWrapperRef}
          className="absolute top-0 h-full overflow-hidden z-20"
          style={{ left: "50%", width: "50%" }}
        >
          <div className="relative w-full h-full bg-spider-black">
            {/* VIDEO */}
            <video
              src="https://res.cloudinary.com/dmq5tx0bd/video/upload/v1774669383/2nd-sec_3_qj5slf.mov"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] contrast-125"
            />

            {/* HALFTONE OVERLAY TO MATCH THEME */}
            <div className="halftone-overlay mix-blend-overlay z-10 pointer-events-none"></div>

            {/* FIXED OVERLAY FOR PERFECTLY ALIGNED SCREEN-RELATIVE ITEMS */}
            <div
              ref={videoInnerAlignerRef}
              className="absolute top-0 h-full w-screen z-20 pointer-events-none"
              style={{ transform: "translateX(-50vw)" }}
            >
              {/* WHITE TEXT (Perfect duplicate of the black text, overlapping exactly) */}
              <h2
                ref={headingWhiteRef}
                className="absolute top-1/2 left-1/2 w-full font-bangers leading-[0.85] text-spider-white text-center px-4 drop-shadow-md"
                style={{ transform: "translate(-50%, -50%)", fontSize: "clamp(1.75rem, 8vw, 6rem)" }}
              >
                WITH GREAT POWER COMES<br />GREAT RESPONSIBILITY
              </h2>
            </div>

            {/* CINEMATIC STAGGERED REVEAL QUOTE (Centered relative to the video wrapper) */}
            <div
              ref={quoteContainerRef}
              className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none p-3 sm:p-5"
            >

              <div className="mb-4">
                <span
                  ref={quoteLine1Ref}
                  className="inline-block font-bangers text-spider-white tracking-widest uppercase bg-spider-black border-l-[6px] border-spider-red opacity-0"
                  style={{ fontSize: "clamp(1rem, 4vw, 4.375rem)", padding: "clamp(0.25rem, 1vw, 0.5rem) clamp(0.75rem, 2.5vw, 1.5rem)" }}
                >
                  My name is Miles Morales
                </span>
              </div>

              <div className="mb-4">
                <span
                  ref={quoteLine2Ref}
                  className="inline-block font-bangers text-spider-black tracking-widest uppercase bg-spider-yellow opacity-0"
                  style={{ fontSize: "clamp(0.875rem, 3.5vw, 3.75rem)", padding: "clamp(0.25rem, 1vw, 0.5rem) clamp(0.75rem, 2.5vw, 1.5rem)", boxShadow: "clamp(3px, 0.5vw, 6px) clamp(3px, 0.5vw, 6px) 0px #E8272A" }}
                >
                  I was bitten by a radioactive spider
                </span>
              </div>

              <div className="mt-4">
                <span
                  ref={quoteLine3Ref}
                  className="inline-block font-mono font-bold text-spider-white tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,1)] bg-spider-black/40 backdrop-blur-sm opacity-0"
                  style={{ fontSize: "clamp(0.75rem, 2.5vw, 2.25rem)", padding: "clamp(0.25rem, 0.8vw, 0.5rem) clamp(0.5rem, 1.5vw, 1rem)" }}
                >
                  I&apos;m pretty sure you know the rest...
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
