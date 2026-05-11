import type { NextConfig } from "next";

const securityHeaders = [
  // Evita que la página sea embebida en iframes (clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Evita que el navegador adivine el tipo de contenido
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Controla qué información de referencia se envía
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Fuerza HTTPS por 2 años
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Restringe acceso a APIs sensibles del navegador
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Content Security Policy — permite recursos propios + Google Fonts + Formspree
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // unsafe-eval necesario para Next.js dev
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self' https://formspree.io https://wa.me",
      "frame-ancestors 'none'",
      "form-action 'self' https://formspree.io",
      "base-uri 'self'",
    ].join("; "),
  },
  // Evita exponer la tecnología usada
  { key: "X-Powered-By", value: "" },
];

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  // Cabeceras de seguridad en todas las rutas
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Redireccion permanente de www a non-www
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.hatagencia.com" }],
        destination: "https://hatagencia.com/:path*",
        permanent: true,
      },
    ];
  },

  // Compresión y optimizaciones de producción
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
