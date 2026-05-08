"use client";
import { useState } from "react";

const services = [
  { slug: "storydoing",             num: "01", label: "Estrategia &\nStorydoing",     tag: "STRATEGY", accent: "#D3D829",
    desc: "No solo contamos historias — las vivimos. Diseñamos estrategias de comunicación que se convierten en experiencias reales para tu marca.",
    long: "El Storydoing va más allá del Storytelling. Mientras otras agencias cuentan historias, en HAT las ejecutamos. Creamos estrategias donde cada acción de marca refuerza un relato auténtico y coherente que conecta con tu audiencia de manera profunda y duradera." },

  { slug: "branding",               num: "02", label: "Branding &\nIdentidad Visual", tag: "BRAND",    accent: "#45C4B0",
    desc: "Cocreamos marcas imposibles de olvidar. Identidades visuales con propósito, valor y confianza que perduran en el tiempo.",
    long: "Construimos marcas desde su ADN. Desde el naming y posicionamiento hasta el sistema visual completo: logotipo, tipografía, paleta, aplicaciones y manual de marca. Cada elemento tiene un propósito y una razón de ser." },

  { slug: "btl-activaciones",       num: "03", label: "BTL &\nActivaciones",          tag: "BTL",      accent: "#F2A400",
    desc: "Conectamos mediante emociones y experiencias. Activaciones de marca que cautivan, inspiran y generan recordación en tus clientes.",
    long: "Diseñamos y ejecutamos experiencias BTL que van más allá del impacto visual. Desde lanzamientos de producto hasta activaciones en punto de venta, cada experiencia está diseñada para crear conexiones emocionales duraderas con tu audiencia." },

  { slug: "estrategia-digital",     num: "04", label: "Digital\n& RRSS",              tag: "DIGITAL",  accent: "#D3D829",
    desc: "Descubre una nueva forma de conectar con tus clientes. Contenido cautivador y estrategias personalizadas para atraer, convertir y deleitar.",
    long: "Gestionamos tu presencia digital de manera estratégica. Desde el planteamiento de objetivos hasta la creación de contenido, gestión de comunidades y análisis de resultados. Todo orientado a generar valor real para tu negocio." },

  { slug: "produccion-audiovisual", num: "05", label: "Producción\nAudiovisual",      tag: "AV",       accent: "#45C4B0",
    desc: "Potenciamos la estrategia de comunicación de tu empresa a través de la creación de videos, renders 3D y contenido audiovisual de alto impacto.",
    long: "Producimos contenido audiovisual que cuenta tu historia de la manera más poderosa. Videos corporativos, spots publicitarios, renders 3D y post-producción de alto nivel para que tu marca destaque en todos los medios." },

  { slug: "pauta",                  num: "06", label: "Pauta On\n& Off Line",         tag: "MEDIA",    accent: "#F2A400",
    desc: "Estrategia, negociación y compra de medios publicitarios en digital y medios tradicionales. Maximizamos tu inversión publicitaria.",
    long: "Planificamos, negociamos y gestionamos tu inversión publicitaria tanto en medios digitales (Google, Meta, LinkedIn, programática) como en medios tradicionales (TV, radio, prensa, exterior). Todo bajo una estrategia unificada que maximiza tu ROI." },
];

export default function ServicesAccordion() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="px-6 md:px-12 pb-12">
      {services.map((s) => {
        const isOpen = open === s.slug;
        return (
          <div key={s.slug}
            style={{borderBottom: '1px solid rgba(4,41,64,0.1)'}}>
            <button
              onClick={() => setOpen(isOpen ? null : s.slug)}
              className="w-full text-left py-7 flex items-center justify-between gap-4 group"
            >
              {/* Left: number + title */}
              <div className="flex items-center gap-6">
                <span className="mono text-xs font-bold shrink-0"
                  style={{color:'rgba(4,41,64,0.2)'}}>{s.num}</span>

                {/* accent line */}
                <span className="hidden md:block h-0.5 shrink-0 transition-all duration-300"
                  style={{width: isOpen ? '3rem' : '1.5rem', background: s.accent}} />

                <h3 className="font-bold whitespace-pre-line text-left transition-colors duration-200"
                  style={{
                    fontSize: 'clamp(1.4rem,2.2vw,2.2rem)',
                    letterSpacing: '-0.04em',
                    lineHeight: '0.95',
                    color: isOpen ? s.accent : '#042940',
                  }}>
                  {s.label}
                </h3>
              </div>

              {/* Right: tag + chevron */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="mono text-xs px-2 py-1 hidden md:block"
                  style={{border:`1px solid ${isOpen ? s.accent : 'rgba(4,41,64,0.12)'}`, color: isOpen ? s.accent : 'rgba(4,41,64,0.3)'}}>
                  {s.tag}
                </span>
                <span className="mono text-lg font-bold transition-transform duration-300"
                  style={{color: s.accent, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'}}>
                  +
                </span>
              </div>
            </button>

            {/* Expandable content */}
            <div
              className="overflow-hidden transition-all duration-400 ease-in-out"
              style={{maxHeight: isOpen ? '400px' : '0', opacity: isOpen ? 1 : 0, transition: 'max-height 0.4s ease, opacity 0.3s ease'}}>
              <div className="pb-8 pl-0 md:pl-24 grid md:grid-cols-2 gap-8 items-end">
                <div>
                  <p className="text-base leading-relaxed mb-4" style={{color:'rgba(4,41,64,0.6)'}}>
                    {s.desc}
                  </p>
                  <p className="text-sm leading-relaxed" style={{color:'rgba(4,41,64,0.4)'}}>
                    {s.long}
                  </p>
                </div>
                <div className="flex justify-start md:justify-end">
                  <a href="/contacto"
                    className="inline-block mono text-sm font-bold px-6 py-3 transition-all"
                    style={{background: s.accent, color:'#042940', boxShadow:`4px 4px 0 #042940`}}>
                    EMPEZAR PROYECTO →
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
