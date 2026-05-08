"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{background:'#042940', borderBottom:'2px solid #D3D829'}}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-1">
          <span className="font-bold text-lg tracking-tight text-white" style={{fontFamily:"'Space Grotesk',sans-serif", letterSpacing:'-0.04em'}}>
            HaT
          </span>
          <span style={{color:'#D3D829', fontFamily:"'Space Mono',monospace", fontSize:'20px', lineHeight:1}}>_</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="px-4 py-1.5 text-sm font-medium transition-colors mono"
                style={{color:'rgba(255,255,255,0.5)', fontFamily:"'Space Mono',monospace"}}
                onMouseEnter={e=>(e.currentTarget.style.color='#45C4B0')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.5)')}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contacto"
          className="hidden md:inline-flex items-center px-5 py-2 text-sm font-bold transition-all mono"
          style={{background:'#D3D829', color:'#042940', fontFamily:"'Space Mono',monospace", boxShadow:'3px 3px 0 #45C4B0'}}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#45C4B0';(e.currentTarget as HTMLElement).style.boxShadow='3px 3px 0 #D3D829'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#D3D829';(e.currentTarget as HTMLElement).style.boxShadow='3px 3px 0 #45C4B0'}}>
          HABLEMOS →
        </Link>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menú">
          <span className="block w-5 h-0.5 mb-1.5" style={{background:'#fff'}} />
          <span className="block w-5 h-0.5 mb-1.5" style={{background:'#D3D829'}} />
          <span className="block w-3 h-0.5" style={{background:'#45C4B0'}} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-6 py-5 flex flex-col gap-3" style={{background:'#042940', borderTop:'1px solid rgba(255,255,255,0.1)'}}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="mono text-base font-medium" style={{color:'rgba(255,255,255,0.6)'}} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/contacto" className="mt-3 inline-flex justify-center px-5 py-3 font-bold text-sm mono" style={{background:'#D3D829', color:'#042940'}} onClick={() => setOpen(false)}>
            HABLEMOS →
          </Link>
        </div>
      )}
    </header>
  );
}
