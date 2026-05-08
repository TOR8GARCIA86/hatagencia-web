import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

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
    "Agencia de comunicaciones especializada en Storydoing, branding, BTL, endomarketing, producción audiovisual y pauta on/off line en Colombia. Creamos historias con el sombrero puesto.",
  keywords: [
    "agencia de comunicaciones colombia",
    "agencia de branding colombia",
    "storydoing colombia",
    "BTL colombia",
    "activaciones de marca colombia",
    "endomarketing colombia",
    "producción audiovisual colombia",
    "agencia de marketing bogotá",
    "diseño gráfico colombia",
    "experiencias de marca colombia",
  ],
  authors: [{ name: "HAT Agencia de Comunicaciones" }],
  creator: "HAT Agencia de Comunicaciones",
  publisher: "HAT Agencia de Comunicaciones",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://hatagencia.com",
    siteName: "HAT Agencia de Comunicaciones",
    title: "HAT Agencia | Storydoing, Branding y BTL Colombia",
    description:
      "Creamos historias con el sombrero puesto. Storydoing, branding, BTL, endomarketing y producción audiovisual en Colombia.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HAT Agencia de Comunicaciones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HAT Agencia | Storydoing, Branding y BTL Colombia",
    description: "Creamos historias con el sombrero puesto.",
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
  url: "https://hatagencia.com",
  logo: "https://hatagencia.com/logo.png",
  description:
    "Agencia de comunicaciones especializada en Storydoing, branding, BTL, endomarketing y producción audiovisual en Colombia.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CO",
  },
  sameAs: [
    "https://www.instagram.com/hatagencia",
    "https://www.linkedin.com/company/hatagencia",
    "https://www.youtube.com/@hatagencia",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
