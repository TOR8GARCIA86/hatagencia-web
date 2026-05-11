"use client";
import { useSearchParams } from "next/navigation";

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

const inputStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
};

export default function ContactForm() {
  const params = useSearchParams();
  const preSelected = params.get("servicio") ?? "";

  return (
    <form
      action="https://formspree.io/f/REEMPLAZAR-CON-TU-ID"
      method="POST"
      className="p-8 space-y-6"
      style={{ background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.1)" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mono text-xs uppercase tracking-widest mb-2" htmlFor="nombre"
            style={{ color: "rgba(255,255,255,0.4)" }}>Nombre *</label>
          <input id="nombre" name="nombre" type="text" required placeholder="Tu nombre"
            className="w-full px-4 py-3 text-sm outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="block mono text-xs uppercase tracking-widest mb-2" htmlFor="empresa"
            style={{ color: "rgba(255,255,255,0.4)" }}>Empresa</label>
          <input id="empresa" name="empresa" type="text" placeholder="Tu empresa"
            className="w-full px-4 py-3 text-sm outline-none" style={inputStyle} />
        </div>
      </div>

      <div>
        <label className="block mono text-xs uppercase tracking-widest mb-2" htmlFor="email"
          style={{ color: "rgba(255,255,255,0.4)" }}>Email *</label>
        <input id="email" name="email" type="email" required placeholder="tu@email.com"
          className="w-full px-4 py-3 text-sm outline-none" style={inputStyle} />
      </div>

      <div>
        <label className="block mono text-xs uppercase tracking-widest mb-2" htmlFor="servicio"
          style={{ color: "rgba(255,255,255,0.4)" }}>¿Qué servicio necesitas?</label>
        <select id="servicio" name="servicio" defaultValue={preSelected}
          className="w-full px-4 py-3 text-sm outline-none"
          style={{ background: "#042940", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}>
          <option value="">Selecciona un servicio</option>
          {services.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {preSelected && (
          <p className="mono text-xs mt-2" style={{ color: "#45C4B0" }}>
            ✓ Servicio pre-seleccionado: {preSelected}
          </p>
        )}
      </div>

      <div>
        <label className="block mono text-xs uppercase tracking-widest mb-2" htmlFor="mensaje"
          style={{ color: "rgba(255,255,255,0.4)" }}>Cuéntanos sobre tu proyecto *</label>
        <textarea id="mensaje" name="mensaje" required rows={5} placeholder="¿Qué necesita tu marca? Cuéntanos con detalle..."
          className="w-full px-4 py-3 text-sm outline-none resize-none" style={inputStyle} />
      </div>

      <button type="submit"
        className="w-full py-4 font-bold mono text-sm transition-all"
        style={{ background: "#D3D829", color: "#042940", boxShadow: "4px 4px 0 #45C4B0" }}>
        ENVIAR MENSAJE →
      </button>

      <p className="mono text-xs text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
        Respondemos en menos de 24 horas hábiles.
      </p>
    </form>
  );
}
