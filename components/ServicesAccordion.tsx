"use client";
import { useState } from "react";

const services = [
  { slug: "storydoing",             num: "01", label: "Estrategia &\nStorydoing",     formValue: "Estrategia & Storydoing",      tag: "STRATEGY", accent: "#D3D829",
    desc: "No solo contamos historias — las vivimos. Diseñamos estrategias de comunicación que se convierten en experiencias reales para tu marca.",
    long: "El Storydoing va más allá del Storytelling. Mientras otras agencias cuentan historias, en HAT las ejecutamos. Creamos estrategias donde cada acción de marca refuerza un relato auténtico y coherente que conecta con tu audiencia de manera profunda y duradera." },

  { slug: "branding",               num: "02", label: "Branding &\nIdentidad Visual", formValue: "Branding & Identidad Visual",   tag: "BRAND",    accent: "#45C4B0",
    desc: "Cocreamos marcas imposibles de olvidar. Identidades visuales con propósito, valor y confianza que perduran en el tiempo.",
    long: "Construimos marcas desde su ADN. Desde el naming y posicionamiento hasta el sistema visual completo: logotipo, tipografía, paleta, aplicaciones y manual de marca. Cada elemento tiene un propósito y una razón de ser." },

  { slug: "btl-activaciones",       num: "03", label: "BTL &\nActivaciones",          formValue: "BTL & Activaciones",            tag: "BTL",      accent: "#F2A400",
    desc: "Conectamos mediante emociones y experiencias. Activaciones de marca que cautivan, inspiran y generan recordación en tus clientes.",
    long: "Diseñamos y ejecutamos experiencias BTL que van más allá del impacto visual. Desde lanzamientos de producto hasta activaciones en punto de venta, cada experiencia está diseñada para crear conexiones emocionales duraderas con tu audiencia." },

  { slug: "estrategia-digital",     num: "04", label: "Digital\n& RRSS",              formValue: "Estrategia Digital & RRSS",     tag: "DIGITAL",  accent: "#D3D829",
    desc: "Descubre una nueva forma de conectar con tus clientes. Contenido cautivador y estrategias personalizadas para atraer, convertir y deleitar.",
    long: "Gestionamos tu presencia digital de manera estratégica. Desde el planteamiento de objetivos hasta la creación de contenido, gestión de comunidades y análisis de resultados. Todo orientado a generar valor real para tu negocio." },

  { slug: "produccion-audiovisual", num: "05", label: "Producción\nAudiovisual",      formValue: "Producción Audiovisual",        tag: "AV",       accent: "#45C4B0",
    desc: "Potenciamos la estrategia de comunicación de tu empresa a través de la creación de videos, renders 3D y contenido audiovisual de alto impacto.",
    long: "Producimos contenido audiovisual que cuenta tu historia de la manera más poderosa. Videos corporativos, spots publicitarios, renders 3D y post-producción de alto nivel para que tu marca destaque en todos los medios." },

  { slug: "pauta",                  num: "06", label: "Pauta On\n& Off Line",         formValue: "Pauta On & Off Line",           tag: "MEDIA",    accent: "#F2A400",
    desc: "Estrategia, negociación y compra de medios publicitarios en digital y medios tradicionales. Maximizamos tu inversión publicitaria.",
    long: "Planificamos, negociamos y gestionamos tu inversión publicitaria tanto en medios digitales (Google, Meta, LinkedIn, programática) como en medios tradicionales (TV, radio, prensa, exterior). Todo bajo una estrategia unificada que maximiza tu ROI." },
];

function ServiceItem({ s, open, onToggle }: {
  s: typeof services[0];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ borderBottom: '1px solid rgba(4,41,64,0.1)' }}>
      <button
        onClick={onToggle}
        className="w-full text-left py-7 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-5">
          <span className="mono text-xs font-bold shrink-0" style={{ color: 'rgba(4,41,64,0.2)' }}>{s.num}</span>
          <span className="hidden md:block h-0.5 shrink-0 transition-all duration-300"
            style={{ width: open ? '3rem' : '1.5rem', background: s.accent }} />
          <h3 className="font-bold whitespace-pre-line text-left transition-colors duration-200"
            style={{
              fontSize: 'clamp(1.3rem,2vw,2rem)',
              letterSpacing: '-0.04em',
              lineHeight: '0.95',
              color: open ? s.accent : '#042940',
            }}>
            {s.label}
          </h3>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="mono text-xs px-2 py-1 hidden md:block"
            style={{ border: `1px solid ${open ? s.accent : 'rgba(4,41,64,0.12)'}`, color: open ? s.accent : 'rgba(4,41,64,0.3)' }}>
            {s.tag}
          </span>
          <span className="mono text-lg font-bold transition-transform duration-300"
            style={{ color: s.accent, transform: open ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}>
            +
          </span>
        </div>
      </button>

      <div style={{ maxHeight: open ? '360px' : '0', opacity: open ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease, opacity 0.3s ease' }}>
        <div className="pb-8 grid gap-6">
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(4,41,64,0.6)' }}>{s.desc}</p>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(4,41,64,0.4)' }}>{s.long}</p>
          <a href={`/contacto?servicio=${encodeURIComponent(s.formValue)}`}
            className="inline-block mono text-xs font-bold px-5 py-3 self-start transition-all"
            style={{ background: s.accent, color: '#042940', boxShadow: `3px 3px 0 #042940` }}>
            EMPEZAR PROYECTO →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ServicesAccordion() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (slug: string) => setOpen(prev => prev === slug ? null : slug);

  const left  = services.slice(0, 3);
  const right = services.slice(3, 6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: '1px solid rgba(4,41,64,0.08)' }}>
      {/* Columna izquierda */}
      <div className="px-6 md:px-10" style={{ borderRight: '1px solid rgba(4,41,64,0.08)' }}>
        {left.map(s => (
          <ServiceItem key={s.slug} s={s} open={open === s.slug} onToggle={() => toggle(s.slug)} />
        ))}
      </div>
      {/* Columna derecha */}
      <div className="px-6 md:px-10">
        {right.map(s => (
          <ServiceItem key={s.slug} s={s} open={open === s.slug} onToggle={() => toggle(s.slug)} />
        ))}
      </div>
    </div>
  );
}
