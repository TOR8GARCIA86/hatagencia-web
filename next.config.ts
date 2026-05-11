import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática para GitHub Pages
  output: "export",

  // Imágenes sin optimización de servidor (requerido para static export)
  images: {
    unoptimized: true,
  },

  // Compresión y optimizaciones de producción
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
