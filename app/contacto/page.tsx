import { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | HAT Agencia de Comunicaciones Colombia",
  description:
    "Contáctanos para hablar sobre tu proyecto de branding, BTL, endomarketing, producción audiovisual o estrategia digital. Estamos en Colombia.",
  alternates: { canonical: "https://hatagencia.com/contacto" },
  openGraph: {
    title: "Contacto | HAT Agencia de Comunicaciones",
    description: "Cuéntanos tu proyecto y creamos juntos algo extraordinario.",
    url: "https://hatagencia.com/contacto",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto HAT Agencia de Comunicaciones",
  url: "https://hatagencia.com/contacto",
  description: "Página de contacto de HAT Agencia de Comunicaciones",
};

const services = [
  "Estrategia & Storydoing",
  "Branding & Identidad Visual",
  "Endomarketing",
  "BTL & Activaciones",
  "Estrategia Digital & RRSS",
  "Producción Audiovisual",
  "Pauta On & Off Line",
  "Otro",
];

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <main className="pt-20">
        <section className="min-h-screen py-24" style={{ background: '#042940', color: '#fff' }}>
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <div>
              <p className="mono text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#45C4B0' }}>
                Contacto
              </p>
              <h1 className="font-bold leading-none mb-6" style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', letterSpacing: '-0.03em', color: '#fff' }}>
                Hablemos de tu{' '}
                <span style={{ color: '#D3D829' }}>proyecto.</span>
              </h1>
              <p className="text-lg leading-relaxed mb-12 max-w-md" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Cuéntanos qué necesita tu marca y nuestro equipo diseñará la estrategia perfecta
                para ti. Sin compromisos.
              </p>

              <div className="space-y-8">
                <div>
                  <p className="mono text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Email</p>
                  <a
                    href="mailto:mpaula.rodriguez@hatagencia.com"
                    className="font-medium transition-colors"
                    style={{ color: '#D3D829' }}
                  >
                    mpaula.rodriguez@hatagencia.com
                  </a>
                </div>
                <div>
                  <p className="mono text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>WhatsApp</p>
                  <a
                    href="https://wa.me/573142410514"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium transition-colors"
                    style={{ color: '#D3D829' }}
                  >
                    Escribirnos por WhatsApp →
                  </a>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <Suspense fallback={<div style={{ color: 'rgba(255,255,255,0.3)' }} className="mono text-xs">Cargando formulario...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
