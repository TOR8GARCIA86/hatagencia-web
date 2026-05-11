"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "gone">("visible");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("leaving"), 4600);
    const t2 = setTimeout(() => setPhase("gone"), 6400);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "gone") return null;

  const leaving = phase === "leaving";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#020d1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: leaving ? 0 : 1,
        transition: leaving ? "opacity 1.8s cubic-bezier(0.4,0,0.2,1)" : "none",
      }}
    >
      {/* ── Glow de fondo ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 38% at 50% 50%, rgba(69,196,176,0.10) 0%, transparent 70%)",
          animation: "glowPulse 4.5s cubic-bezier(0.16,1,0.3,1) forwards",
          pointerEvents: "none",
        }}
      />

      {/* ── Contenedor del logo — 80% del área ── */}
      <div
        style={{
          position: "relative",
          width: "80%",
          height: "80%",
          maxWidth: "700px",
          animation: !leaving
            ? "revealLogo 4s cubic-bezier(0.16,1,0.3,1) forwards"
            : "none",
          filter: leaving
            ? "blur(48px) brightness(5) saturate(0)"
            : undefined,
          transform: leaving ? "scale(1.14) translateY(-18px)" : undefined,
          transition: leaving
            ? "filter 1.8s cubic-bezier(0.4,0,1,1), transform 1.8s cubic-bezier(0.4,0,1,1)"
            : "none",
        }}
      >
        <Image
          src="/logos/HAt intro .png"
          alt="HAT Agencia"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      <style>{`
        @keyframes revealLogo {
          0% {
            opacity: 0;
            filter: blur(64px) brightness(10) saturate(0);
            transform: scale(1.18) translateY(28px);
          }
          100% {
            opacity: 1;
            filter: blur(0px) brightness(1) saturate(1);
            transform: scale(1) translateY(0px);
          }
        }

        @keyframes glowPulse {
          0%   { opacity: 0; }
          30%  { opacity: 1; }
          100% { opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}
