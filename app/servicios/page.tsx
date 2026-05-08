import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Servicios de Comunicación y Marketing en Colombia",
  description:
    "Storydoing, branding, BTL, endomarketing, estrategia digital, producción audiovisual y pauta on/off line. Soluciones de comunicación a la medida para tu empresa en Colombia.",
  alternates: { canonical: "https://hatagencia.com/servicios" },
  openGraph: {
    title: "Servicios | HAT Agencia de Comunicaciones Colombia",
    description: "Soluciones integrales de comunicación y marketing para tu marca.",
    url: "https://hatagencia.com/servicios",
  },
};

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-black text-white py-24">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-red-500 text-sm font-semibold uppercase tracking-widest mb-4">Servicios</p>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Todo lo que tu marca necesita, en un solo lugar.
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl">
              Desde la estrategia hasta la ejecución. Somos tu aliado integral de comunicaciones en Colombia.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="group flex gap-6 p-8 border border-gray-100 rounded-2xl hover:border-red-200 hover:shadow-lg transition-all"
                >
                  <div>
                    <span className="text-4xl block mb-4">{s.icon}</span>
                    <span className="text-xs text-gray-400 font-mono">0{i + 1}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-black mb-3 group-hover:text-red-600 transition-colors">
                      {s.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.description}</p>
                    <span className="text-sm font-semibold text-red-600">Ver detalle →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-red-600 text-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black mb-4">¿No encuentras lo que buscas?</h2>
            <p className="text-red-100 text-lg mb-8">
              Cada proyecto es único. Cuéntanos tu necesidad y creamos una solución a la medida.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-black rounded-full hover:bg-red-50 transition-colors"
            >
              Hablar con un experto →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
