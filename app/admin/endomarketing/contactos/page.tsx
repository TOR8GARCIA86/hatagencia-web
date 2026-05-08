"use client";
import { useState } from "react";
import Link from "next/link";

type Contacto = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  cargo: string;
  departamento: string;
  empresa: string;
  activo: boolean;
  etiquetas: string[];
};

// Datos de demo — se reemplazan con datos reales de Supabase
const contactosDemo: Contacto[] = [
  { id: "1", nombre: "María", apellido: "González", email: "maria@empresa.com", cargo: "Directora de Marketing", departamento: "Marketing", empresa: "Empresa Demo", activo: true, etiquetas: ["lider"] },
  { id: "2", nombre: "Carlos", apellido: "Ramírez", email: "carlos@empresa.com", cargo: "Diseñador Senior", departamento: "Diseño", empresa: "Empresa Demo", activo: true, etiquetas: ["creativo"] },
  { id: "3", nombre: "Ana", apellido: "Torres", email: "ana@empresa.com", cargo: "Ejecutiva Comercial", departamento: "Comercial", empresa: "Empresa Demo", activo: true, etiquetas: ["ventas"] },
];

export default function ContactosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [contactos] = useState<Contacto[]>(contactosDemo);

  const filtrados = contactos.filter(
    (c) =>
      `${c.nombre} ${c.apellido} ${c.email} ${c.cargo}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Contactos</h1>
          <p className="text-gray-500 text-sm mt-1">{contactos.length} colaboradores registrados</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/endomarketing/contactos/importar"
            className="px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-gray-400 transition-colors"
          >
            📥 Importar CSV
          </Link>
          <Link
            href="/admin/endomarketing/contactos/nuevo"
            className="px-4 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-colors"
          >
            + Agregar contacto
          </Link>
        </div>
      </div>

      {/* Buscador */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre, email o cargo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400"
        />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contacto</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cargo</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Departamento</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-gray-400 text-sm">
                  <p className="text-3xl mb-3">👥</p>
                  <p className="font-medium">No hay contactos aún</p>
                  <p className="mt-1">Agrega colaboradores o importa un CSV</p>
                </td>
              </tr>
            ) : (
              filtrados.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                        {c.nombre[0]}{c.apellido[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{c.nombre} {c.apellido}</p>
                        <p className="text-xs text-gray-400">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.cargo}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                      {c.departamento}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${c.activo ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                      {c.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-xs text-gray-500 hover:text-blue-600 font-medium transition-colors">Editar</button>
                      <button className="text-xs text-gray-500 hover:text-red-600 font-medium transition-colors">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
