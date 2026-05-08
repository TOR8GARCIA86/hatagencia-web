import Link from "next/link";

const stats = [
  { label: "Total contactos", value: "0", sub: "empleados registrados", color: "bg-blue-50 text-blue-700", href: "/admin/endomarketing/contactos" },
  { label: "Campañas enviadas", value: "0", sub: "este mes", color: "bg-green-50 text-green-700", href: "/admin/endomarketing/campanias" },
  { label: "Tasa de apertura", value: "—", sub: "promedio general", color: "bg-purple-50 text-purple-700", href: "/admin/endomarketing/campanias" },
  { label: "Borradores", value: "0", sub: "campañas pendientes", color: "bg-orange-50 text-orange-700", href: "/admin/endomarketing/campanias" },
];

const tiposCampania = [
  { tipo: "newsletter", label: "Newsletter", desc: "Boletín periódico de noticias internas", icon: "📰" },
  { tipo: "comunicado", label: "Comunicado", desc: "Anuncio oficial de la dirección", icon: "📢" },
  { tipo: "invitacion", label: "Invitación", desc: "Convocatoria a evento o actividad", icon: "🎉" },
  { tipo: "reconocimiento", label: "Reconocimiento", desc: "Felicitación o reconocimiento a colaboradores", icon: "🏆" },
  { tipo: "onboarding", label: "Onboarding", desc: "Bienvenida a nuevos colaboradores", icon: "👋" },
];

export default function EndomarketingDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Dashboard Endomarketing</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestiona tus comunicaciones internas y campañas para colaboradores
          </p>
        </div>
        <Link
          href="/admin/endomarketing/campanias/nueva"
          className="px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-colors"
        >
          + Nueva campaña
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all"
          >
            <p className="text-3xl font-black text-gray-900 mb-1">{s.value}</p>
            <p className="text-sm font-semibold text-gray-700">{s.label}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tipos de campaña */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-black text-lg mb-5">Tipos de campaña disponibles</h2>
          <div className="space-y-3">
            {tiposCampania.map((t) => (
              <Link
                key={t.tipo}
                href={`/admin/endomarketing/campanias/nueva?tipo=${t.tipo}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <span className="text-2xl">{t.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900 group-hover:text-red-600 transition-colors">
                    {t.label}
                  </p>
                  <p className="text-xs text-gray-500">{t.desc}</p>
                </div>
                <span className="text-gray-300 group-hover:text-red-400 transition-colors">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-black text-lg mb-4">Acciones rápidas</h2>
            <div className="space-y-3">
              <Link
                href="/admin/endomarketing/contactos/importar"
                className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all text-sm text-gray-600 hover:text-red-600"
              >
                <span className="text-xl">📥</span>
                <span>Importar contactos desde CSV</span>
              </Link>
              <Link
                href="/admin/endomarketing/contactos/nuevo"
                className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-sm text-gray-600 hover:text-blue-600"
              >
                <span className="text-xl">👤</span>
                <span>Agregar contacto manualmente</span>
              </Link>
              <Link
                href="/admin/endomarketing/campanias"
                className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all text-sm text-gray-600 hover:text-green-600"
              >
                <span className="text-xl">📊</span>
                <span>Ver métricas de campañas</span>
              </Link>
            </div>
          </div>

          {/* Info base de datos */}
          <div className="bg-black rounded-2xl p-6 text-white">
            <p className="text-red-400 text-xs font-semibold uppercase tracking-widest mb-2">Base de datos</p>
            <p className="font-black text-lg mb-2">Supabase conectado</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Todos los contactos y campañas se almacenan de forma segura en tu base de datos PostgreSQL.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-500">
              <span>✓ Contactos</span>
              <span>✓ Campañas</span>
              <span>✓ Segmentos</span>
              <span>✓ Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
