import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Preloader from "@/components/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hatagencia.com"),
  title: {
    default: "HAT Agencia de Comunicaciones | Storydoing, Branding y BTL Colombia",
    template: "%s | HAT Agencia de Comunicaciones",
  },
  description:
    "Agencia de comunicaciones en Colombia especializada en Storydoing, branding, BTL, endomarketing, producción audiovisual y pauta on/off line. Más de 7 años transformando marcas.",
  keywords: [
    // Servicios principales
    "agencia de comunicaciones colombia",
    "agencia de comunicaciones bogotá",
    "agencia de branding colombia",
    "storydoing colombia",
    "agencia BTL colombia",
    "activaciones de marca colombia",
    "endomarketing colombia",
    "comunicación interna empresas colombia",
    "producción audiovisual colombia",
    "agencia de marketing digital colombia",
    "pauta publicitaria colombia",
    "estrategia de comunicación colombia",
    // Sectores nicho
    "agencia marketing sector salud colombia",
    "agencia comunicaciones B2B colombia",
    "marketing farmacéutico colombia",
    "branding empresas industriales colombia",
    // Long tail
    "cómo hacer una activación de marca exitosa",
    "agencia storydoing bogotá colombia",
    "diseño de identidad visual empresas colombia",
    "experiencias de marca BTL colombia",
    "agencia de publicidad colombia",
    "HAT agencia comunicaciones",
  ],
  authors: [{ name: "HAT Agencia de Comunicaciones", url: "https://hatagencia.com" }],
  creator: "HAT Agencia de Comunicaciones",
  publisher: "HAT Agencia de Comunicaciones",
  category: "Marketing & Comunicaciones",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://hatagencia.com",
    siteName: "HAT Agencia de Comunicaciones",
    title: "HAT Agencia | Storydoing, Branding y BTL Colombia",
    description:
      "Creamos historias con el sombrero puesto. Agencia de comunicaciones con más de 7 años transformando marcas en Colombia a través del Storydoing.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HAT Agencia de Comunicaciones Colombia — Storydoing, Branding y BTL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HAT Agencia | Storydoing, Branding y BTL Colombia",
    description: "Agencia de comunicaciones. Creamos historias con el sombrero puesto.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "REEMPLAZAR-CON-TU-CODIGO-GOOGLE-SEARCH-CONSOLE",
  },
  alternates: {
    canonical: "https://hatagencia.com",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HAT Agencia de Comunicaciones",
  alternateName: "HAT Agencia",
  url: "https://hatagencia.com",
  logo: {
    "@type": "ImageObject",
    url: "https://hatagencia.com/logos/Hat verde.png",
    width: 240,
    height: 80,
  },
  description:
    "Agencia de comunicaciones colombiana especializada en Storydoing, branding, BTL, endomarketing, producción audiovisual y pauta on/off line.",
  foundingDate: "2017",
  numberOfEmployees: { "@type": "QuantitativeValue", value: "10" },
  address: {
    "@type": "PostalAddress",
    addressCountry: "CO",
    addressLocality: "Colombia",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "mpaula.rodriguez@hatagencia.com",
      availableLanguage: "Spanish",
      areaServed: "CO",
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+573142410514",
      contactOption: "TollFree",
      availableLanguage: "Spanish",
    },
  ],
  sameAs: [
    "https://www.instagram.com/hatagencia",
    "https://www.linkedin.com/company/hatagencia",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Comunicación",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Estrategia & Storydoing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding & Identidad Visual" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "BTL & Activaciones" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Estrategia Digital & RRSS" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Producción Audiovisual" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pauta On & Off Line" } },
    ],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://hatagencia.com/#localbusiness",
  name: "HAT Agencia de Comunicaciones",
  image: "https://hatagencia.com/logos/Hat verde.png",
  url: "https://hatagencia.com",
  telephone: "+573142410514",
  email: "mpaula.rodriguez@hatagencia.com",
  priceRange: "$$",
  currenciesAccepted: "COP",
  paymentAccepted: "Transferencia, Cheque",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CO",
    addressLocality: "Colombia",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "4.7110",
    longitude: "-74.0721",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.instagram.com/hatagencia",
    "https://www.linkedin.com/company/hatagencia",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Preloader />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
