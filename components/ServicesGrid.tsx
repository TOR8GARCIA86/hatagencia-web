"use client";
import Link from "next/link";

interface Service {
  slug: string;
  icon: string;
  title: string;
  description: string;
}

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {services.map((s, i) => (
        <Link
          key={s.slug}
          href={`/servicios/${s.slug}`}
          className="group flex gap-6 p-8 transition-all"
          style={{ background: '#fff', border: '2px solid rgba(4,41,64,0.1)' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = '#D3D829';
            (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0 #45C4B0';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(4,41,64,0.1)';
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          <div>
            <span className="text-4xl block mb-4">{s.icon}</span>
            <span className="mono text-xs font-bold" style={{ color: '#D3D829' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#042940' }}>
              {s.title}
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(4,41,64,0.55)' }}>
              {s.description}
            </p>
            <span className="mono text-xs font-bold" style={{ color: '#45C4B0' }}>
              Ver detalle →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
