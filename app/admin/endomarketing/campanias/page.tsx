"use client";
import { useState } from "react";
import Link from "next/link";

type Campania = {
  id: string;
  titulo: string;
  asunto: string;
  tipo: string;
  estado: "borrador" | "programada" | "enviada" | "cancelada";
  total_destinatarios: number;
  total_enviados: number;
  total_abiertos: number;
  created_at: string;
  enviada_en: string | null;
};

const estadoColor = {
  borrador: "bg-gray-100 text-gray-600",
  programada: "bg-blue-50 text-blue-700",
  enviada: "bg-green-50 text-green-700",
  cancelada: "bg-red-50 text-red-600",
};

const tipoLabel: Record<string, string> = {
  newsletter: "Newsletter",
  comunicado: "Comunicado",
  invitacion: "Invitación",
  reconocimiento: "Reconocimiento",
  onboarding: "Onboarding",
};

const campaniaDemo: Campania[] = [
  {
    id: "1",
    titulo: "Bienvenida Q2 2025",
    asunto: "¡Arrancamos el segundo trimestre con todo!",
    tipo: "newsletter",
    estado: "enviada",
    total_destinatarios: 45,
    total_enviados: 45,
    total_abiertos: 38,
    created_at: "2025-04-01",
    enviada_en: "2025-04-01",
  },
  {
    id: "2",
    titulo: "Capacitación Storydoing",
    asunto: "Te invitamos al taller de Storydoing",
    tipo: "invitacion",
    estado: "borrador",
    total_destinatarios: 0,
    total_enviados: 0,
    total_abiertos: 0,
    created_at: "2025-04-20",
    enviada_en: null,
  },
];

export default function CampaniasPage() {
  const [campanias] = useState<Campania[]>(campaniaDemo);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Campañas</h1>
          <p className="text-gray-500 text-sm mt-1">{campanias.length} campañas creadas</p>
        </div>
        <Link
          href="/admin/endomarketing/campanias/nueva"
          className="px-4 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-colors"
        >
          + Nueva campaña
        </Link>
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total enviadas", value: campanias.filter(c => c.estado === "enviada").length },
          { label: "Borradores", value: campanias.filter(c => c.estado === "borrador").length },
          { label: "Programadas", value: campanias.filter(c => c.estado === "programada").length },
          { label: "Emails enviados", value: campanias.reduce((a, c) => a + c.total_enviados, 0) },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-3xl font-black text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Lista de campañas */}
      <div className="space-y-3">
        {campanias.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-5 hover:shadow-md transition-all"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${estadoColor[c.estado]}`}>
                  {c.estado.charAt(0).toUpperCase() + c.estado.slice(1)}
                </span>
                <span className="text-xs text-gray-400">{tipoLabel[c.tipo]}</span>
              </div>
              <h3 className="font-black text-gray-900 truncate">{c.titulo}</h3>
              <p className="text-sm text-gray-500 truncate mt-0.5">{c.asunto}</p>
            </div>

            {c.estado === "enviada" && (
              <div className="hidden md:flex gap-6 text-center shrink-0">
                <div>
                  <p className="text-lg font-black text-gray-900">{c.total_enviados}</p>
                  <p className="text-xs text-gray-400">Enviados</p>
                </div>
                <div>
                  <p className="text-lg font-black text-green-600">{c.total_abiertos}</p>
                  <p className="text-xs text-gray-400">Abiertos</p>
                </div>
                <div>
                  <p className="text-lg font-black text-blue-600">
                    {c.total_enviados ? Math.round((c.total_abiertos / c.total_enviados) * 100) : 0}%
                  </p>
                  <p className="text-xs text-gray-400">Apertura</p>
                </div>
              </div>
            )}

            <div className="flex gap-2 shrink-0">
              {c.estado === "borrador" && (
                <Link
                  href={`/admin/endomarketing/campanias/${c.id}/editar`}
                  className="px-3 py-1.5 bg-black text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors"
                >
                  Editar
                </Link>
              )}
              <Link
                href={`/admin/endomarketing/campanias/${c.id}`}
                className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:border-gray-400 transition-colors"
              >
                Ver detalle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
