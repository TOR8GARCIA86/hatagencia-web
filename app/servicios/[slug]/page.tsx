import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { services } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.title} en Colombia`,
    description: service.longDescription,
    keywords: service.keywords,
    openGraph: {
      title: `${service.title} | HAT Agencia de Comunicaciones`,
      description: service.longDescription,
      url: `https://hatagencia.com/servicios/${slug}`,
    },
    alternates: {
      canonical: `https://hatagencia.com/servicios/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.longDescription,
    provider: {
      "@type": "Organization",
      name: "HAT Agencia de Comunicaciones",
      url: "https://hatagencia.com",
    },
    areaServed: "Colombia",
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <main className="pt-16">
        {/* Hero del servicio */}
        <section className="bg-black text-white py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <Link href="/servicios" className="text-gray-500 text-sm hover:text-white transition-colors mb-8 inline-block">
              ← Todos los servicios
            </Link>
            <span className="text-5xl block mb-6">{service.icon}</span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
              {service.longDescription}
            </p>
            <Link
              href="/contacto"
              className="mt-10 inline-flex items-center px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors"
            >
              Solicitar cotización →
            </Link>
          </div>
        </section>

        {/* ¿Por qué HAT? */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-black mb-12">
              ¿Por qué elegir HAT para {service.shortTitle}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Experiencia comprobada",
                  body: "Hemos trabajado con marcas líderes en Colombia en múltiples sectores. Cada proyecto nos ha dado aprendizajes que ponemos al servicio de tu marca.",
                },
                {
                  title: "Proyectos a la medida",
                  body: "No existe una solución única. Entendemos tus necesidades específicas y diseñamos estrategias personalizadas que se adaptan a tu marca y objetivos.",
                },
                {
                  title: "Equipo multidisciplinario",
                  body: "Estrategas, diseñadores, creativos y productores trabajando juntos bajo el enfoque Storydoing para garantizar resultados extraordinarios.",
                },
              ].map((item) => (
                <div key={item.title} className="p-6 bg-gray-50 rounded-2xl">
                  <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-black mb-12">Nuestro proceso</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Diagnóstico", desc: "Analizamos tu marca, competencia y audiencia a profundidad." },
                { step: "02", title: "Estrategia", desc: "Diseñamos el plan de acción basado en datos e insights." },
                { step: "03", title: "Ejecución", desc: "Implementamos con excelencia y atención al detalle." },
                { step: "04", title: "Medición", desc: "Analizamos resultados y optimizamos continuamente." },
              ].map((p) => (
                <div key={p.step} className="relative">
                  <span className="text-6xl font-black text-gray-100">{p.step}</span>
                  <h3 className="font-bold text-lg -mt-6 mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios relacionados */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-black mb-10">También podría interesarte</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="group p-6 border border-gray-100 rounded-2xl hover:border-red-200 hover:shadow-md transition-all"
                >
                  <span className="text-2xl mb-3 block">{s.icon}</span>
                  <h3 className="font-bold mb-2 group-hover:text-red-600 transition-colors">{s.title}</h3>
                  <p className="text-gray-500 text-sm">{s.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black mb-4">¿Tienes un proyecto en mente?</h2>
            <p className="text-gray-400 text-lg mb-8">
              Cuéntanos sobre tu marca y diseñamos juntos la estrategia perfecta.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors"
            >
              Contactar a HAT →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
