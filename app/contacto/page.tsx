import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

      <main className="pt-16">
        <section className="min-h-screen bg-black text-white py-24">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <div>
              <p className="text-red-500 text-sm font-semibold uppercase tracking-widest mb-4">
                Contacto
              </p>
              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
                Hablemos de tu <span className="text-red-500">proyecto.</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-md">
                Cuéntanos qué necesita tu marca y nuestro equipo diseñará la estrategia perfecta
                para ti. Sin compromisos.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Email</p>
                  <a
                    href="mailto:hola@hatagencia.com"
                    className="text-white hover:text-red-400 transition-colors font-medium"
                  >
                    hola@hatagencia.com
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">WhatsApp</p>
                  <a
                    href="https://wa.me/573000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-400 transition-colors font-medium"
                  >
                    Escribirnos por WhatsApp →
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Redes</p>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/hatagencia" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition-colors text-sm">Instagram</a>
                    <a href="https://www.linkedin.com/company/hatagencia" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition-colors text-sm">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <form
              action="https://formspree.io/f/REEMPLAZAR-CON-TU-ID"
              method="POST"
              className="bg-white text-black rounded-2xl p-8 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" htmlFor="nombre">
                    Nombre *
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" htmlFor="empresa">
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 transition-colors"
                    placeholder="Tu empresa"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="email">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="servicio">
                  ¿Qué servicio necesitas?
                </label>
                <select
                  id="servicio"
                  name="servicio"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 transition-colors bg-white"
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="mensaje">
                  Cuéntanos sobre tu proyecto *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 transition-colors resize-none"
                  placeholder="¿Qué necesita tu marca? Cuéntanos con detalle..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-red-600 transition-colors text-base"
              >
                Enviar mensaje →
              </button>

              <p className="text-xs text-gray-400 text-center">
                Respondemos en menos de 24 horas hábiles.
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
