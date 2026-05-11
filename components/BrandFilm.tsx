"use client";
import { useRef, useState, useEffect } from "react";

export default function BrandFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setLoaded(true);
    v.addEventListener("canplaythrough", onCanPlay);
    return () => v.removeEventListener("canplaythrough", onCanPlay);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", background: "#020f18" }}
    >
      {/* ── VIDEO ── */}
      <video
        ref={videoRef}
        src="/video/hat-brand-film.mp4"
        playsInline
        muted={false}
        loop
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease" }}
      />

      {/* ── PLACEHOLDER mientras no hay video ── */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #042940 0%, #020f18 50%, #042940 100%)" }}>
          <div className="text-center">
            <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: '#45C4B0' }}>
              Brand Film
            </p>
            <p className="font-bold text-white" style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', letterSpacing: '-0.03em' }}>
              Video en producción
            </p>
          </div>
        </div>
      )}

      {/* ── OVERLAY degradado ── */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(2,15,24,0.55) 0%, rgba(2,15,24,0.15) 40%, rgba(2,15,24,0.15) 60%, rgba(2,15,24,0.75) 100%)"
      }} />

      {/* ── ETIQUETA superior izquierda ── */}
      <div className="absolute top-8 left-8">
        <p className="mono text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
          NUESTRA HISTORIA
        </p>
      </div>

      {/* ── TEXTO central ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <p className="mono text-xs uppercase tracking-widest mb-6" style={{ color: '#45C4B0' }}>
          HAT Agencia de Comunicaciones
        </p>
        <h2
          className="font-bold text-white leading-none"
          style={{
            fontSize: "clamp(2.8rem,7vw,7rem)",
            letterSpacing: "-0.04em",
            textShadow: "0 4px 32px rgba(0,0,0,0.6)",
          }}
        >
          No contamos<br />
          <span style={{ color: "#D3D829" }}>historias.</span><br />
          Las <span style={{ WebkitTextStroke: "2px #45C4B0", color: "transparent" }}>vivimos.</span>
        </h2>
      </div>

      {/* ── BOTÓN PLAY central ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pausar video" : "Reproducir video"}
          className="group flex items-center justify-center transition-all duration-300"
          style={{
            width: "88px",
            height: "88px",
            border: "2px solid rgba(255,255,255,0.35)",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
            marginTop: "180px",
          }}
        >
          {playing ? (
            /* Ícono pausa */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <rect x="5" y="3" width="4" height="18" rx="1"/>
              <rect x="15" y="3" width="4" height="18" rx="1"/>
            </svg>
          ) : (
            /* Ícono play */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "3px" }}>
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          )}
        </button>
      </div>

      {/* ── FRASE inferior ── */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col md:flex-row items-center justify-between px-8 gap-4">
        <p className="mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          Colombia · 2017–{new Date().getFullYear()}
        </p>
        <p className="mono text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
          Con el sombrero puesto<span style={{ color: "#D3D829" }}>.</span>
        </p>
        <p className="mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          STORYDOING AGENCY
        </p>
      </div>

      {/* ── línea acento inferior ── */}
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "#D3D829" }} />
    </section>
  );
}
