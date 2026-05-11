import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nosotros | HAT Agencia de Comunicaciones Colombia",
  description:
    "Somos HAT Agencia de Comunicaciones. Un equipo creativo especializado en Storydoing, branding, BTL y producción audiovisual. Conoce nuestra historia y metodología.",
  alternates: { canonical: "https://hatagencia.com/nosotros" },
  openGraph: {
    title: "Nosotros | HAT Agencia de Comunicaciones",
    description: "Conoce al equipo que crea historias con el sombrero puesto.",
    url: "https://hatagencia.com/nosotros",
  },
};

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24" style={{ background: '#042940' }}>
          <div className="max-w-5xl mx-auto px-6">
            <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: '#45C4B0' }}>Nosotros</p>
            <h1 className="font-bold leading-none mb-8 text-white"
              style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)', letterSpacing: '-0.04em' }}>
              Somos HAT.<br />
              <span style={{ color: '#D3D829' }}>Y creamos con propósito.</span>
            </h1>
            <p className="text-xl max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              HAT Agencia de Comunicaciones nació con una misión clara: transformar la manera en que
              las marcas se comunican en Colombia. No a través de fórmulas genéricas, sino a través
              del <strong className="text-white">Storydoing</strong> — vivir las historias que contamos.
            </p>
          </div>
        </section>

        {/* Misión / Visión / Valores */}
        <section className="py-20" style={{ background: '#F5F5F2' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  num: "01",
                  title: "Nuestra misión",
                  body: "Satisfacer las necesidades de comunicación de nuestros clientes a través de proyectos especiales a la medida, con un equipo altamente calificado que garantiza calidad, cumplimiento y servicio.",
                },
                {
                  num: "02",
                  title: "Nuestra visión",
                  body: "Ser la agencia de comunicaciones referente en Colombia por nuestra metodología Storydoing, innovando continuamente para crear experiencias de marca que transformen industrias.",
                },
                {
                  num: "03",
                  title: "Nuestros valores",
                  body: "Creatividad sin límites, compromiso con resultados, trabajo colaborativo, innovación constante y una profunda honestidad en cada relación con nuestros clientes.",
                },
              ].map((item) => (
                <div key={item.title} className="p-8" style={{ border: '2px solid #042940' }}>
                  <p className="font-bold text-2xl mb-4" style={{ color: '#D3D829' }}>{item.num}</p>
                  <h2 className="font-bold text-xl mb-4" style={{ color: '#042940' }}>{item.title}</h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(4,41,64,0.6)' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metodología Storydoing */}
        <section className="py-20" style={{ background: '#042940' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: '#45C4B0' }}>
                  Metodología
                </p>
                <h2 className="font-bold text-4xl mb-6 leading-tight text-white" style={{ letterSpacing: '-0.03em' }}>
                  El Storydoing como filosofía de trabajo
                </h2>
                <p className="leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Mientras otras agencias se enfocan en contar historias (Storytelling), en HAT
                  creemos que las marcas más poderosas son las que <em>viven</em> sus historias.
                </p>
                <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Cada campaña, cada activación, cada pieza de comunicación que diseñamos es parte
                  de un relato coherente y auténtico que conecta emocionalmente con las audiencias y
                  genera resultados medibles para el negocio.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    color: '#D3D829',
                    label: "Estrategia basada en datos",
                    svg: (
                      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mx-auto mb-3">
                        <circle cx="16" cy="16" r="13"/>
                        <circle cx="16" cy="16" r="7"/>
                        <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none"/>
                        <line x1="24" y1="8" x2="28" y2="4"/>
                      </svg>
                    ),
                  },
                  {
                    color: '#45C4B0',
                    label: "Creatividad con propósito",
                    svg: (
                      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mx-auto mb-3">
                        <path d="M16 3 L19 13 L29 13 L21 19 L24 29 L16 23 L8 29 L11 19 L3 13 L13 13 Z"/>
                      </svg>
                    ),
                  },
                  {
                    color: '#F2A400',
                    label: "Ejecución impecable",
                    svg: (
                      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mx-auto mb-3">
                        <polygon points="13,3 19,3 29,16 19,29 13,29 3,16" fill="none"/>
                        <line x1="16" y1="10" x2="16" y2="17"/>
                        <circle cx="16" cy="21" r="1.2" fill="currentColor" stroke="none"/>
                      </svg>
                    ),
                  },
                  {
                    color: '#D3D829',
                    label: "Resultados medibles",
                    svg: (
                      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mx-auto mb-3">
                        <rect x="4" y="18" width="5" height="10" rx="1"/>
                        <rect x="13" y="12" width="5" height="16" rx="1"/>
                        <rect x="22" y="5" width="5" height="23" rx="1"/>
                        <polyline points="4,14 13,9 22,4"/>
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <div key={item.label} className="p-6 text-center" style={{ border: `2px solid ${item.color}33`, color: item.color }}>
                    {item.svg}
                    <p className="text-xs mono" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ background: '#D3D829', borderBottom: '4px solid #042940' }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-bold text-4xl md:text-5xl mb-4" style={{ color: '#042940', letterSpacing: '-0.03em' }}>
              Únete a las marcas que eligen HAT
            </h2>
            <p className="text-lg mb-10" style={{ color: 'rgba(4,41,64,0.65)' }}>
              Cuéntanos tu proyecto y diseñamos juntos la estrategia perfecta.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center px-10 py-5 font-bold mono text-sm transition-all"
              style={{ background: '#042940', color: '#D3D829', boxShadow: '5px 5px 0 #45C4B0' }}
            >
              EMPEZAR AHORA →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
