import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { clients } from "@/lib/services";

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
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-black text-white py-24">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-red-500 text-sm font-semibold uppercase tracking-widest mb-4">Nosotros</p>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Somos HAT. <br />
              <span className="text-gray-500">Y creamos con propósito.</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
              HAT Agencia de Comunicaciones nació con una misión clara: transformar la manera en que
              las marcas se comunican en Colombia. No a través de fórmulas genéricas, sino a través
              del <strong className="text-white">Storydoing</strong> — vivir las historias que contamos.
            </p>
          </div>
        </section>

        {/* Misión / Visión / Valores */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Nuestra misión",
                  body: "Satisfacer las necesidades de comunicación de nuestros clientes a través de proyectos especiales a la medida, con un equipo altamente calificado que garantiza calidad, cumplimiento y servicio.",
                },
                {
                  title: "Nuestra visión",
                  body: "Ser la agencia de comunicaciones referente en Colombia por nuestra metodología Storydoing, innovando continuamente para crear experiencias de marca que transformen industrias.",
                },
                {
                  title: "Nuestros valores",
                  body: "Creatividad sin límites, compromiso con resultados, trabajo colaborativo, innovación constante y una profunda honestidad en cada relación con nuestros clientes.",
                },
              ].map((item) => (
                <div key={item.title} className="p-8 bg-gray-50 rounded-2xl">
                  <h2 className="font-black text-xl mb-4">{item.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metodología Storydoing */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-red-500 text-sm font-semibold uppercase tracking-widest mb-4">
                  Metodología
                </p>
                <h2 className="text-4xl font-black mb-6 leading-tight">
                  El Storydoing como filosofía de trabajo
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Mientras otras agencias se enfocan en contar historias (Storytelling), en HAT
                  creemos que las marcas más poderosas son las que <em>viven</em> sus historias.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Cada campaña, cada activación, cada pieza de comunicación que diseñamos es parte
                  de un relato coherente y auténtico que conecta emocionalmente con las audiencias y
                  genera resultados medibles para el negocio.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🎯", label: "Estrategia basada en datos" },
                  { icon: "✨", label: "Creatividad con propósito" },
                  { icon: "⚡", label: "Ejecución impecable" },
                  { icon: "📊", label: "Resultados medibles" },
                ].map((item) => (
                  <div key={item.label} className="p-6 border border-white/10 rounded-2xl text-center">
                    <span className="text-3xl block mb-2">{item.icon}</span>
                    <p className="text-sm text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Clientes */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-red-600 text-sm font-semibold uppercase tracking-widest mb-4">
              Nuestros clientes
            </p>
            <h2 className="text-4xl font-black mb-12">
              Marcas que confían en HAT
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {clients.map((c) => (
                <div
                  key={c}
                  className="p-4 bg-white border border-gray-100 rounded-xl text-center text-sm font-semibold text-gray-700"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-red-600 text-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black mb-4">Únete a las marcas que eligen HAT</h2>
            <p className="text-red-100 text-lg mb-8">
              Cuéntanos tu proyecto y diseñamos juntos la estrategia perfecta.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-black rounded-full hover:bg-red-50 transition-colors"
            >
              Empezar ahora →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
