"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const tiposCampania = [
  { value: "newsletter", label: "Newsletter", icon: "📰" },
  { value: "comunicado", label: "Comunicado", icon: "📢" },
  { value: "invitacion", label: "Invitación", icon: "🎉" },
  { value: "reconocimiento", label: "Reconocimiento", icon: "🏆" },
  { value: "onboarding", label: "Onboarding", icon: "👋" },
];

const plantillas = [
  {
    id: "bienvenida",
    label: "Bienvenida",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
  <div style="background: #000; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: #ffffff; font-size: 28px; margin: 0;">HAT<span style="color: #e63946;">.</span></h1>
  </div>
  <div style="padding: 40px 0;">
    <h2 style="color: #0a0a0a; font-size: 24px;">¡Hola {{nombre}}! 👋</h2>
    <p style="color: #555; line-height: 1.8; font-size: 16px;">Escribe aquí el mensaje principal de tu campaña. Puedes personalizar este contenido con el editor.</p>
    <div style="margin: 32px 0;">
      <a href="#" style="background: #e63946; color: white; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 16px;">Ver más →</a>
    </div>
  </div>
  <div style="border-top: 1px solid #eee; padding-top: 24px; text-align: center;">
    <p style="color: #999; font-size: 12px;">HAT Agencia de Comunicaciones · Colombia</p>
    <a href="{{unsubscribe_url}}" style="color: #999; font-size: 11px;">Cancelar suscripción</a>
  </div>
</div>`,
  },
  {
    id: "reconocimiento",
    label: "Reconocimiento",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #fffbeb;">
  <div style="text-align: center; padding: 32px 0;">
    <span style="font-size: 64px;">🏆</span>
    <h1 style="color: #0a0a0a; font-size: 32px; margin: 16px 0 8px;">¡Felicitaciones, {{nombre}}!</h1>
    <p style="color: #555; font-size: 18px;">Queremos reconocer tu excelente trabajo</p>
  </div>
  <div style="background: #fff; border-radius: 12px; padding: 32px; margin: 24px 0;">
    <p style="color: #333; line-height: 1.8; font-size: 16px;">Escribe aquí el mensaje de reconocimiento personalizado para este colaborador.</p>
  </div>
  <div style="text-align: center;">
    <p style="color: #999; font-size: 12px;">HAT Agencia de Comunicaciones</p>
  </div>
</div>`,
  },
];

export default function NuevaCampaniaPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    asunto: "",
    tipo: "newsletter",
    contenido_html: plantillas[0].html,
    programada_para: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    try {
      const res = await fetch("/api/endomarketing/campanias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/admin/endomarketing/campanias");
    } catch (err) {
      console.error(err);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Nueva campaña</h1>
        <div className="flex items-center gap-2 mt-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${paso >= n ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}>
                {n}
              </div>
              <span className={`text-sm ${paso >= n ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                {n === 1 ? "Detalles" : n === 2 ? "Contenido" : "Enviar"}
              </span>
              {n < 3 && <span className="text-gray-200 mx-1">→</span>}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Paso 1: Detalles */}
        {paso === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2">Tipo de campaña</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {tiposCampania.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setForm({ ...form, tipo: t.value })}
                      className={`p-3 rounded-xl border text-center transition-all ${form.tipo === t.value ? "border-black bg-black text-white" : "border-gray-200 hover:border-gray-400"}`}
                    >
                      <span className="text-2xl block mb-1">{t.icon}</span>
                      <span className="text-xs font-medium">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="titulo">Título interno</label>
                <input
                  id="titulo"
                  type="text"
                  required
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                  placeholder="Ej: Newsletter Abril 2025"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="asunto">Asunto del email *</label>
                <input
                  id="asunto"
                  type="text"
                  required
                  value={form.asunto}
                  onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                  placeholder="Ej: ¡Noticias importantes de este mes! 🎉"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400"
                />
                <p className="text-xs text-gray-400 mt-1">{form.asunto.length}/80 caracteres recomendados</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setPaso(2)}
                disabled={!form.titulo || !form.asunto}
                className="px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: Contenido */}
        {paso === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-3">Plantilla base</label>
                <div className="flex gap-3">
                  {plantillas.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setForm({ ...form, contenido_html: p.html })}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-black transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Contenido HTML
                  <span className="text-gray-400 font-normal ml-2">— usa {"{{nombre}}"} para personalizar</span>
                </label>
                <textarea
                  value={form.contenido_html}
                  onChange={(e) => setForm({ ...form, contenido_html: e.target.value })}
                  rows={16}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-mono focus:outline-none focus:border-gray-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="programada">
                  Programar envío (opcional)
                </label>
                <input
                  id="programada"
                  type="datetime-local"
                  value={form.programada_para}
                  onChange={(e) => setForm({ ...form, programada_para: e.target.value })}
                  className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setPaso(1)} className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-colors">
                ← Atrás
              </button>
              <button type="button" onClick={() => setPaso(3)} className="px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-red-600 transition-colors">
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Confirmar y enviar */}
        {paso === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-black text-lg mb-5">Resumen de la campaña</h2>
              <dl className="space-y-4">
                {[
                  { label: "Título", value: form.titulo },
                  { label: "Tipo", value: form.tipo },
                  { label: "Asunto", value: form.asunto },
                  { label: "Programación", value: form.programada_para || "Guardar como borrador" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <dt className="text-sm font-semibold text-gray-500 w-28 shrink-0">{item.label}</dt>
                    <dd className="text-sm text-gray-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <p className="text-sm font-semibold text-amber-800 mb-1">⚠️ Antes de enviar</p>
              <p className="text-sm text-amber-700">
                La campaña se guardará como <strong>borrador</strong>. Desde el listado de campañas podrás seleccionar los destinatarios y enviar cuando estés listo.
              </p>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setPaso(2)} className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-colors">
                ← Atrás
              </button>
              <button
                type="submit"
                disabled={enviando}
                className="px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {enviando ? "Guardando..." : "✓ Guardar campaña"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
