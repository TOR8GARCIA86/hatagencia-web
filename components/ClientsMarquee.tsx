"use client";
import Image from "next/image";

const clients = [
  { name: "Alcon",             file: "/logos/Alcon.png",              height: 32 },
  { name: "Alcatel",          file: "/logos/Alcatel.png",            height: 32 },
  { name: "Chaneme",          file: "/logos/Chaneme.png",            height: 208 },
  { name: "Cafam",            file: "/logos/Cafam.png",              height: 64 },
  { name: "Merck",            file: "/logos/Merck.png",              height: 32 },
  { name: "Calma",            file: "/logos/CALMA.png",              height: 32 },
  { name: "Clínica de Ojos", file: "/logos/CLinica de Ojos.png",    height: 64 },
  { name: "Avery Dennison",  file: "/logos/avery dennison.png",      height: 52 },
];

const Separator = () => (
  <span className="shrink-0 mx-6" style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.6rem" }}>✦</span>
);

export default function ClientsMarquee() {
  const items = [...clients, ...clients, ...clients];

  return (
    <div
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Label arriba */}
      <div className="px-6 pt-4 pb-2">
        <span
          className="mono text-xs uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Clientes
        </span>
      </div>

      {/* Fade izquierda */}
      <div className="absolute left-0 bottom-0 z-10 pointer-events-none"
        style={{ top: "2rem", width: "4rem", background: "linear-gradient(to right, #042940, transparent)" }} />
      {/* Fade derecha */}
      <div className="absolute right-0 bottom-0 z-10 pointer-events-none"
        style={{ top: "2rem", width: "4rem", background: "linear-gradient(to left, #042940, transparent)" }} />

      {/* Track animado */}
      <div
        className="flex items-center pb-4"
        style={{ animation: "marquee 30s linear infinite", width: "max-content" }}
      >
        {items.map((c, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="relative shrink-0 flex items-center justify-center px-6" style={{ height: "220px" }}>
              <Image
                src={c.file}
                alt={c.name}
                height={c.height}
                width={200}
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                  filter: "grayscale(1) brightness(10)",
                  opacity: 0.5,
                  height: `${c.height}px`,
                  width: "auto",
                  maxWidth: "160px",
                }}
              />
            </span>
            <Separator />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
