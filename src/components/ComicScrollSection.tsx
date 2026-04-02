"use client";

import { useEffect, useRef, useState } from "react";

const BEATS = [
  {
    heading: "THE KID FROM\nBROOKLYN",
    story: "Miles Morales. Fourteen. Brooklyn born. Scholarship kid caught between two worlds — the streets he grew up on and the school that wants to change him.",
    img: "/assets/comic-1.png",
    rotate: -3,
    // Zigzag positions (vw / vh offsets from canvas center)
    x: 0, y: 0,
  },
  {
    heading: "ONE SPIDER.\nONE SECOND.",
    story: "A radioactive bite in an abandoned subway tunnel. He didn't know it yet — but that was the last normal night of his life.",
    img: "/assets/comic-2.png",
    rotate: 4,
    x: 40, y: 85,
  },
  {
    heading: "BROOKLYN NEEDED\nA HERO.",
    story: "The city was cracking. Crime. Chaos. A Spider-Man who couldn't hold it together anymore. Miles wasn't ready. But ready doesn't get to decide.",
    img: "/assets/comic-3.png",
    rotate: -2,
    x: -25, y: 170,
  },
  {
    heading: "HE CHOSE\nTHE MASK.",
    story: "He could've walked away. Nobody would've blamed him. Instead he picked it up — and put the weight of an entire city on his shoulders.",
    img: "/assets/comic-4.png",
    rotate: 5,
    x: 35, y: 255,
  },
  {
    heading: "ANYONE CAN\nWEAR IT.",
    story: "That's what Miles proved. The mask doesn't belong to one person, one city, or one universe. It belongs to whoever is brave enough to put it on.",
    img: "/assets/comic.jpeg",
    rotate: -1,
    x: 0, y: 340,
  },
];

const BG_TEXTS = ["BROOKLYN.", "ONE BITE.", "THE WEIGHT.", "THE MASK.", "THE LEAP."];

export default function ComicScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [activeBeat, setActiveBeat] = useState(0);
  const latestBeat = useRef(0);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const wh = window.innerHeight;
      const scrollable = Math.max(rect.height - wh, 1);
      targetProgress.current = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const animate = () => {
      currentProgress.current = lerp(currentProgress.current, targetProgress.current, 0.1);
      const p = currentProgress.current;

      // Determine which two beats we are between
      const float = p * (BEATS.length - 1);
      const idx = Math.min(Math.floor(float), BEATS.length - 2);
      const next = idx + 1;
      const t = easeInOutCubic(float - idx);

      // Update active beat on cross-over
      const currentClosestBeat = Math.round(float);
      if (currentClosestBeat !== latestBeat.current) {
        latestBeat.current = currentClosestBeat;
        setActiveBeat(currentClosestBeat);
      }

      // Interpolated camera target
      const camX = lerp(BEATS[idx].x, BEATS[next].x, t);
      const camY = lerp(BEATS[idx].y, BEATS[next].y, t);

      if (canvasRef.current) {
        // Translate so that (camX, camY) ends up at the viewport center.
        // The canvas origin is already placed at viewport center via CSS (top-1/2 left-1/2).
        // So we just need to offset by -cam.
        canvasRef.current.style.transform = `translate(${-camX}vw, ${-camY}vh)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ height: "600vh" }}
      className="relative bg-spider-red halftone-overlay selection:bg-spider-yellow selection:text-spider-black"
    >
      {/* Sticky viewport — pinned to screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Cinematic Background Story Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          {BG_TEXTS.map((text, i) => (
            <h2
              key={i}
              className={`absolute font-bangers text-[24vw] leading-none text-spider-black select-none whitespace-nowrap transition-all duration-1000 ease-out ${i === activeBeat ? 'opacity-[0.08] scale-100 blur-0' : 'opacity-0 scale-[0.8] blur-md'
                }`}
            >
              {text}
            </h2>
          ))}
        </div>


        {/* Scroll Direction Indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-spider-black/40 font-mono text-[0.6rem] md:text-[0.7rem] font-bold tracking-[0.4em] pointer-events-none z-0">
          <span>SCROLL</span>
          <div className="w-[2px] h-10 md:h-16 bg-linear-to-b from-spider-black/40 to-transparent" />
        </div>

        {/* Page / Timeline indicator */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 z-100 flex flex-col items-end gap-3 pointer-events-none">
          {/* Section Heroic Context Title */}
          <div className="flex flex-col items-end mb-1 text-right">
            <h4 className="font-bangers text-2xl md:text-3xl text-spider-white tracking-widest drop-shadow-md leading-none mb-1">
              THE SPIDER-VERSE FILES
            </h4>
            <p className="font-mono text-[9px] md:text-[10px] text-spider-yellow uppercase font-bold tracking-[0.3em] drop-shadow-sm">
              HOW A HERO IS BORN
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="font-mono text-[12px] text-spider-white font-bold tracking-widest drop-shadow-md">
              {String(activeBeat + 1).padStart(2, '0')} / {String(BEATS.length).padStart(2, '0')}
            </div>
            <div className="flex items-center gap-1.5 drop-shadow-sm">
              {BEATS.map((_, i) => (
                <div
                  key={i}
                  className={`h-[3px] rounded-full transition-all duration-300 ease-out ${i === activeBeat ? 'w-5 bg-spider-yellow opacity-100' : 'w-2.5 bg-spider-white opacity-30'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 
          The "canvas" — a massive div that holds all panels.
          Anchored at the viewport center. We translate it so the 
          current beat's (x, y) lands exactly at screen center.
          Explicit dimensions ensure the browser allocates paint area.
        */}
        <div
          ref={canvasRef}
          className="absolute top-1/2 left-1/2 will-change-transform z-10"
          style={{ width: "200vw", height: "500vh", marginLeft: "-100vw", marginTop: "-250vh" }}
        >
          {/* All panels live inside this canvas at their zigzag coords */}
          {BEATS.map((beat, i) => {
            const isActive = i === activeBeat;
            return (
              <div
                key={i}
                className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'z-50' : 'z-10'}`}
                style={{
                  // Position relative to canvas center (100vw, 250vh)
                  left: `calc(100vw + ${beat.x}vw)`,
                  top: `calc(250vh + ${beat.y}vh)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Depth of field / Slam wrapper */}
                <div
                  className={`relative transition-all ${isActive
                    ? 'duration-200 ease-[cubic-bezier(0.2,0,0.1,1)] scale-100 translate-y-0 opacity-100 grayscale-0 blur-0'
                    : 'duration-100 ease-out scale-[1.08] -translate-y-[10px] opacity-50 grayscale-[0.6] blur-[2px]'
                    }`}
                >
                  {/* Comic panel frame */}
                  <div
                    className="relative shadow-[12px_12px_0px_#0A0A0A] border-4 border-spider-black bg-spider-yellow overflow-hidden z-10"
                    style={{
                      width: "clamp(260px, 38vw, 500px)",
                      height: "clamp(250px, 55vh, 580px)",
                      transform: `rotate(${beat.rotate}deg)`,
                    }}
                  >
                    <div className="absolute inset-0 z-10 pointer-events-none border border-spider-white/30 m-[3px] mix-blend-overlay" />
                    <img
                      src={beat.img}
                      alt={`Panel ${i + 1}`}
                      className="w-full h-full object-cover filter contrast-[1.15] saturate-[1.2]"
                    />
                  </div>

                  {/* Caption box */}
                  <div
                    className="absolute z-20 bg-spider-white border-[3px] border-spider-black shadow-[6px_6px_0px_#E8272A] p-4 md:p-5 flex flex-col gap-2"
                    style={{
                      width: "clamp(140px, 24vw, 340px)",
                      bottom: "-5vh",
                      ...(i % 2 === 0
                        ? { right: "-8vw" }
                        : { left: "-8vw" }),
                      transform: `rotate(${-beat.rotate * 0.5}deg)`,
                    }}
                  >
                    <h3 className="font-bangers text-xl md:text-3xl lg:text-4xl leading-[0.9] text-spider-black tracking-wide">
                      {beat.heading.split("\n").map((line, li) => (
                        <span key={li}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </h3>
                    <div className="w-6 md:w-8 h-1 bg-spider-yellow" />
                    <p className="font-mono text-[0.55rem] md:text-xs font-bold text-spider-black/90 leading-tight">
                      {beat.story}
                    </p>
                    <div className="absolute -bottom-3 -right-3 bg-spider-black text-spider-yellow font-mono text-[0.4rem] md:text-[0.5rem] tracking-widest px-2 py-0.5 font-bold uppercase rotate-[-5deg]">
                      EARTH-1610
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}