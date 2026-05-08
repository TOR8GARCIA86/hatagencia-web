import Link from "next/link";

const navItems = [
  { href: "/admin/endomarketing", label: "Dashboard", icon: "◈" },
  { href: "/admin/endomarketing/contactos", label: "Contactos", icon: "◎" },
  { href: "/admin/endomarketing/campanias", label: "Campañas", icon: "✦" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="block">
            <p className="font-black text-xl">HAT<span className="text-red-500">.</span></p>
            <p className="text-gray-500 text-xs mt-1">Panel de Endomarketing</p>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-white text-xs transition-colors"
          >
            ← Volver al sitio
          </Link>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
