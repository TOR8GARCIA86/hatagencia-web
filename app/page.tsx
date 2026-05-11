import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxHero from "@/components/ParallaxHero";
import GradualBlur from "@/components/GradualBlur";
import ServicesAccordion from "@/components/ServicesAccordion";

export default function Home() {
  return (
    <>
      {/* GradualBlur fijo — solo borde inferior, visible en todo el scroll */}
      <GradualBlur target="page" position="bottom" strength={3} height="8rem" divCount={8} curve="ease-out" zIndex={30} />

      <Navbar />
      <main className="pt-20">

        {/* ── HERO (parallax) ── */}
        <ParallaxHero />

        {/* ── SERVICIOS ── */}
        <section id="servicios" style={{background:'#F5F5F2', borderBottom:'4px solid #042940'}}>
          <div className="px-6 md:px-12 py-8 flex items-end justify-between" style={{borderBottom:'1px solid rgba(4,41,64,0.08)'}}>
            <div>
              <p className="mono text-xs tracking-widest uppercase mb-2" style={{color:'#45C4B0'}}>LO QUE HACEMOS</p>
              <h2 className="font-bold text-4xl md:text-5xl" style={{color:'#042940', letterSpacing:'-0.03em'}}>Servicios</h2>
            </div>
          </div>
          <ServicesAccordion />
        </section>

        {/* ── STORYDOING ── */}
        <section className="py-24 px-6 md:px-12" style={{background:'#042940'}}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="mono text-xs tracking-widest uppercase mb-6" style={{color:'#45C4B0'}}>NUESTRO DIFERENCIAL</p>
              <h2 className="font-bold text-white leading-none mb-8"
                style={{fontSize:'clamp(2.5rem,6vw,5rem)', letterSpacing:'-0.03em'}}>
                Storydoing:<br />
                <span style={{color:'#D3D829'}}>no narramos,</span><br />
                ejecutamos.
              </h2>
              <p className="text-lg leading-relaxed max-w-md mb-8" style={{color:'rgba(255,255,255,0.55)'}}>
                Mientras otras agencias cuentan historias, en HAT las vivimos. Cada campaña, cada activación es parte de un relato auténtico que tu marca protagoniza.
              </p>
              <Link href="/servicios/storydoing"
                className="mono text-sm font-bold pb-0.5 transition-colors"
                style={{color:'#D3D829', borderBottom:'2px solid #D3D829'}}>
                CONOCE EL STORYDOING →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                {n:"7+",    l:"Años de\nexperiencia",    accent:'#D3D829'},
                {n:"50+",   l:"Marcas\ntransformadas",   accent:'#45C4B0'},
                {n:"100%",  l:"Proyectos\na la medida",  accent:'#F2A400'},
                {n:"360°",  l:"Visión de\ncomunicación", accent:'#D3D829'},
              ].map(s => (
                <div key={s.l} className="p-6 transition-all group"
                  style={{border:'2px solid rgba(255,255,255,0.1)'}}>
                  <p className="font-bold text-4xl mb-1 transition-colors"
                    style={{color: s.accent, letterSpacing:'-0.04em'}}>
                    {s.n}
                  </p>
                  <p className="mono text-xs whitespace-pre-line" style={{color:'rgba(255,255,255,0.4)'}}>
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-24 px-6 md:px-12" style={{background:'#D3D829', borderBottom:'4px solid #042940'}}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <h2 className="font-bold leading-none" style={{
              fontSize:'clamp(3rem,8vw,7rem)',
              letterSpacing:'-0.04em',
              color:'#042940',
            }}>
              ¿LISTA TU<br />
              <span style={{WebkitTextStroke:'2px #042940', color:'transparent'}}>PRÓXIMA</span><br />
              HISTORIA<span style={{color:'#45C4B0'}}>?</span>
            </h2>
            <div className="flex flex-col gap-4 shrink-0">
              <Link href="/contacto"
                className="px-10 py-5 font-bold text-base mono transition-all"
                style={{background:'#042940', color:'#D3D829', boxShadow:'5px 5px 0 #45C4B0'}}>
                EMPEZAR PROYECTO →
              </Link>
              <Link href="/servicios"
                className="px-10 py-5 font-bold text-base mono text-center transition-all"
                style={{border:'2px solid #042940', color:'#042940'}}>
                VER SERVICIOS
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
