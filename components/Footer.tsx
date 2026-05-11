import Link from "next/link";
import Image from "next/image";

const services = [
  { href: "/#servicios", label: "Estrategia & Storydoing" },
  { href: "/#servicios", label: "Branding & Identidad Visual" },
  { href: "/#servicios", label: "BTL & Activaciones" },
  { href: "/#servicios", label: "Estrategia Digital & RRSS" },
  { href: "/#servicios", label: "Producción Audiovisual" },
  { href: "/#servicios", label: "Pauta On & Off Line" },
];

export default function Footer() {
  return (
    <footer style={{background:'#042940', borderTop:'4px solid #D3D829', position:'relative', zIndex:40}}>
      {/* CTA strip */}
      <div style={{borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="mono text-xs tracking-widest uppercase mb-2" style={{color:'#45C4B0'}}>
            ¿Listo para crear algo extraordinario?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{letterSpacing:'-0.03em'}}>
            Hablemos de tu proyecto.
          </h2>
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Image
            src="/logos/Hat verde.png"
            alt="HAT Agencia"
            height={40}
            width={130}
            style={{ objectFit: "contain", objectPosition: "left", height: "40px", width: "auto", marginBottom: "8px" }}
          />
          <p className="mono text-xs mb-6" style={{color:'rgba(255,255,255,0.3)'}}>AGENCIA DE COMUNICACIONES</p>
          <p className="text-sm leading-relaxed" style={{color:'rgba(255,255,255,0.4)'}}>
            Creamos historias con el sombrero puesto. Colombia.
          </p>
        </div>

        <div>
          <p className="mono text-xs uppercase tracking-widest mb-5" style={{color:'rgba(255,255,255,0.25)'}}>Servicios</p>
          <ul className="space-y-3">
            {services.map(s => (
              <li key={s.label}>
                <Link href={s.href} className="text-sm transition-colors" style={{color:'rgba(255,255,255,0.5)'}}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mono text-xs uppercase tracking-widest mb-5" style={{color:'rgba(255,255,255,0.25)'}}>Empresa</p>
          <ul className="space-y-3">
            {[{href:"/nosotros",label:"Nosotros"},{href:"/servicios",label:"Servicios"},{href:"/contacto",label:"Contacto"}].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm transition-colors" style={{color:'rgba(255,255,255,0.5)'}}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mono text-xs uppercase tracking-widest mb-5" style={{color:'rgba(255,255,255,0.25)'}}>Contacto</p>
          <ul className="space-y-3 text-sm" style={{color:'rgba(255,255,255,0.4)'}}>
            <li>Colombia</li>
            <li><a href="mailto:mpaula.rodriguez@hatagencia.com" className="transition-colors hover:text-white">mpaula.rodriguez@hatagencia.com</a></li>
            <li><a href="https://wa.me/573142410514" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">WhatsApp →</a></li>
          </ul>
        </div>
      </div>

      <div style={{borderTop:'1px solid rgba(255,255,255,0.08)'}}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="mono text-xs" style={{color:'rgba(255,255,255,0.2)'}}>© {new Date().getFullYear()} HAT Agencia de Comunicaciones</p>
          <p className="mono text-xs" style={{color:'rgba(255,255,255,0.2)'}}>Colombia 🇨🇴</p>
        </div>
      </div>
    </footer>
  );
}
