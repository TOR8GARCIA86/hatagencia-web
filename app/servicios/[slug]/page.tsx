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

      <main className="pt-20">
        {/* Hero del servicio */}
        <section className="py-24 md:py-32" style={{ background: '#042940' }}>
          <div className="max-w-5xl mx-auto px-6">
            <Link href="/servicios" className="mono text-xs uppercase tracking-widest mb-10 inline-block transition-colors"
              style={{ color: 'rgba(255,255,255,0.35)' }}>
              ← TODOS LOS SERVICIOS
            </Link>
            <span className="text-5xl block mb-6">{service.icon}</span>
            <h1 className="font-bold leading-none mb-8 text-white"
              style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)', letterSpacing: '-0.04em' }}>
              {service.title}
            </h1>
            <p className="text-xl max-w-2xl leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {service.longDescription}
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center px-8 py-4 font-bold mono text-sm transition-all"
              style={{ background: '#D3D829', color: '#042940', boxShadow: '4px 4px 0 #45C4B0' }}
            >
              SOLICITAR COTIZACIÓN →
            </Link>
          </div>
        </section>

        {/* ¿Por qué HAT? */}
        <section className="py-20" style={{ background: '#F5F5F2' }}>
          <div className="max-w-5xl mx-auto px-6">
            <p className="mono text-xs uppercase tracking-widest mb-3" style={{ color: '#45C4B0' }}>POR QUÉ ELEGIRNOS</p>
            <h2 className="font-bold text-3xl md:text-4xl mb-12" style={{ color: '#042940', letterSpacing: '-0.03em' }}>
              ¿Por qué elegir HAT para {service.shortTitle}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              ].map((item, i) => (
                <div key={item.title} className="p-6" style={{ border: '2px solid #042940' }}>
                  <p className="font-bold text-2xl mb-4" style={{ color: '#D3D829' }}>{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-bold text-lg mb-3" style={{ color: '#042940' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(4,41,64,0.6)' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="py-20" style={{ background: '#042940' }}>
          <div className="max-w-5xl mx-auto px-6">
            <p className="mono text-xs uppercase tracking-widest mb-3" style={{ color: '#45C4B0' }}>CÓMO TRABAJAMOS</p>
            <h2 className="font-bold text-3xl md:text-4xl mb-12 text-white" style={{ letterSpacing: '-0.03em' }}>
              Nuestro proceso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Diagnóstico", desc: "Analizamos tu marca, competencia y audiencia a profundidad." },
                { step: "02", title: "Estrategia", desc: "Diseñamos el plan de acción basado en datos e insights." },
                { step: "03", title: "Ejecución", desc: "Implementamos con excelencia y atención al detalle." },
                { step: "04", title: "Medición", desc: "Analizamos resultados y optimizamos continuamente." },
              ].map((p) => (
                <div key={p.step} className="p-5" style={{ borderLeft: '3px solid #D3D829' }}>
                  <span className="font-bold text-5xl block mb-2" style={{ color: '#D3D829', letterSpacing: '-0.04em' }}>{p.step}</span>
                  <h3 className="font-bold text-lg mb-2 text-white">{p.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios relacionados */}
        <section className="py-20" style={{ background: '#F5F5F2' }}>
          <div className="max-w-5xl mx-auto px-6">
            <p className="mono text-xs uppercase tracking-widest mb-3" style={{ color: '#45C4B0' }}>TAMBIÉN PODRÍA INTERESARTE</p>
            <h2 className="font-bold text-3xl md:text-4xl mb-10" style={{ color: '#042940', letterSpacing: '-0.03em' }}>
              Otros servicios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="group p-6 transition-all"
                  style={{ border: '2px solid rgba(4,41,64,0.15)', background: '#fff' }}
                >
                  <span className="text-2xl mb-3 block">{s.icon}</span>
                  <h3 className="font-bold mb-2" style={{ color: '#042940' }}>{s.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(4,41,64,0.55)' }}>{s.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ background: '#D3D829', borderBottom: '4px solid #042940' }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-bold text-4xl md:text-5xl mb-4" style={{ color: '#042940', letterSpacing: '-0.03em' }}>
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-lg mb-10" style={{ color: 'rgba(4,41,64,0.65)' }}>
              Cuéntanos sobre tu marca y diseñamos juntos la estrategia perfecta.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center px-10 py-5 font-bold mono text-sm transition-all"
              style={{ background: '#042940', color: '#D3D829', boxShadow: '5px 5px 0 #45C4B0' }}
            >
              CONTACTAR A HAT →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
