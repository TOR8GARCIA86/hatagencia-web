"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import LiquidEther from "@/components/LiquidEther";
import ClientsMarquee from "@/components/ClientsMarquee";

export default function ParallaxHero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const stripRef    = useRef<HTMLDivElement>(null);
  const tickerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (headlineRef.current)
          headlineRef.current.style.transform = `translateY(${y * 0.18}px)`;
        if (stripRef.current)
          stripRef.current.style.transform = `translateY(${y * 0.08}px)`;
        if (tickerRef.current)
          tickerRef.current.style.transform = `translateY(${y * 0.04}px)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="min-h-screen flex flex-col overflow-hidden relative" style={{background:'#042940'}}>
      {/* Top ticker */}
      <div ref={tickerRef} className="flex items-center justify-end px-6 py-3"
        style={{borderBottom:'1px solid rgba(255,255,255,0.08)', willChange:'transform'}}>
        <span className="mono text-xs tracking-widest" style={{color:'#45C4B0'}}>STORYDOING AGENCY</span>
      </div>

      {/* Hero headline */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto w-full">
          <div ref={headlineRef} className="grid grid-cols-1 md:grid-cols-12 gap-0 items-end"
            style={{willChange:'transform'}}>
            <div className="md:col-span-10">
              <h1 className="font-bold text-white leading-none"
                style={{fontSize:'clamp(3.5rem,11vw,10rem)', letterSpacing:'-0.04em', lineHeight:'0.92'}}>
                CREAMOS<br />
                <span style={{color:'#D3D829'}}>HISTORIAS</span><br />
                <span style={{color:'rgba(255,255,255,0.15)'}}>CON EL</span><br />
                <span style={{WebkitTextStroke:'2px #45C4B0', color:'transparent'}}>SOMBRERO</span><br />
                PUESTO<span style={{color:'#F2A400'}}>.</span>
              </h1>
            </div>

            <div className="md:col-span-2 flex flex-col justify-end pb-2 mt-8 md:mt-0">
              <div className="pl-4" style={{borderLeft:'2px solid #D3D829'}}>
                <p className="mono text-xs leading-relaxed" style={{color:'rgba(255,255,255,0.35)'}}>
                  Agencia de<br />Comunicaciones<br />Colombia
                </p>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div ref={stripRef}
            className="mt-12 md:mt-16 pt-8"
            style={{borderTop:'1px solid rgba(255,255,255,0.08)', willChange:'transform'}}>
            <p className="text-base md:text-lg max-w-2xl leading-relaxed" style={{color:'rgba(255,255,255,0.4)'}}>
              No contamos historias — las vivimos. Storydoing, branding, BTL y producción audiovisual para marcas que quieren impactar.
            </p>
          </div>
        </div>
      </div>

      {/* Clients marquee */}
      <ClientsMarquee />

      {/* LiquidEther — fluido WebGL con colores de marca */}
      <LiquidEther
        colors={['#D3D829', '#F2A400', '#45C4B0', '#D3D829']}
        autoDemo={true}
        autoSpeed={0.35}
        autoIntensity={3}
        mouseForce={30}
        cursorSize={140}
        resolution={0.5}
        style={{ zIndex: 1, opacity: 0.7 }}
      />

    </section>
  );
}
