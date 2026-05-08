import Link from "next/link";

const services = [
  { href: "/servicios/storydoing",             label: "Estrategia & Storydoing" },
  { href: "/servicios/branding",               label: "Branding & Identidad Visual" },
  { href: "/servicios/btl-activaciones",       label: "BTL & Activaciones" },
  { href: "/servicios/estrategia-digital",     label: "Estrategia Digital & RRSS" },
  { href: "/servicios/produccion-audiovisual", label: "Producción Audiovisual" },
  { href: "/servicios/pauta",                  label: "Pauta On & Off Line" },
];

export default function Footer() {
  return (
    <footer style={{background:'#042940', borderTop:'4px solid #D3D829'}}>
      {/* CTA strip */}
      <div style={{borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="mono text-xs tracking-widest uppercase mb-2" style={{color:'#45C4B0'}}>
              ¿Listo para crear algo extraordinario?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{letterSpacing:'-0.03em'}}>
              Hablemos de tu proyecto.
            </h2>
          </div>
          <Link href="/contacto"
            className="shrink-0 px-8 py-4 font-bold text-sm mono transition-all"
            style={{background:'#D3D829', color:'#042940', boxShadow:'4px 4px 0 #45C4B0'}}>
            EMPEZAR PROYECTO →
          </Link>
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <p className="font-bold text-2xl text-white mb-1" style={{fontFamily:"'Space Grotesk',sans-serif", letterSpacing:'-0.03em'}}>
            HaT<span style={{color:'#D3D829'}}>_</span>
          </p>
          <p className="mono text-xs mb-6" style={{color:'rgba(255,255,255,0.3)'}}>AGENCIA DE COMUNICACIONES</p>
          <p className="text-sm leading-relaxed" style={{color:'rgba(255,255,255,0.4)'}}>
            Creamos historias con el sombrero puesto. Colombia.
          </p>
          <div className="flex gap-4 mt-6">
            {["Instagram","LinkedIn","YouTube"].map(r => (
              <a key={r} href="#" className="mono text-xs transition-colors" style={{color:'rgba(255,255,255,0.25)'}}>{r}</a>
            ))}
          </div>
        </div>

        <div>
          <p className="mono text-xs uppercase tracking-widest mb-5" style={{color:'rgba(255,255,255,0.25)'}}>Servicios</p>
          <ul className="space-y-3">
            {services.map(s => (
              <li key={s.href}>
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
            <li><a href="mailto:hola@hatagencia.com" className="transition-colors hover:text-white">hola@hatagencia.com</a></li>
            <li><a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">WhatsApp →</a></li>
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
