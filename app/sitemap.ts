import { MetadataRoute } from "next";
import { services, portfolioItems } from "@/lib/services";

const BASE = "https://hatagencia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = [
    "que-es-el-storydoing-y-por-que-transforma-marcas",
    "endomarketing-la-estrategia-que-empieza-en-casa",
    "como-hacer-una-activacion-btl-exitosa",
    "branding-sector-salud-colombia",
  ];

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/servicios`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/portafolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: `${BASE}/servicios/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...portfolioItems.map((p) => ({
      url: `${BASE}/portafolio/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
