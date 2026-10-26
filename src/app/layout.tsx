import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext"; // <--- 1. Importamos el AuthProvider
import { GlobalChatWidget } from "@/components/ui/GlobalChatWidget"; // 🤖 Reclutador Virtual Global

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cvrd.do'),
  title: {
    default: "CVRD.DO — Constructor de CVs Profesionales en República Dominicana",
    template: "%s | CVRD.DO"
  },
  description: "Crea tu currículum profesional, moderno y listo para destacar en menos de 2 minutos. Adaptado al estándar laboral de República Dominicana en formato Carta oficial. Aprobado por filtros ATS.",
  keywords: [
    'crear CV República Dominicana', 
    'currículum vitae Santo Domingo', 
    'plantillas de CV ATS', 
    'hacer currículum online RD', 
    'formato carta CV'
  ],
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    url: 'https://cvrd.do',
    title: 'CVRD.DO — Constructor de CVs Profesionales en RD',
    description: 'Diseñamos el CV que te consigue el empleo en República Dominicana. Descarga inmediata en PDF.',
    siteName: 'CVRD.DO',
    images: [
      {
        url: '/template_executive.jpg',
        width: 1200,
        height: 630,
        alt: 'CVRD - Creador de Currículums Profesionales en RD',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CVRD.DO — Constructor de CVs Profesionales en RD',
    description: 'El estándar laboral de República Dominicana en formato Carta oficial. Aprobado por ATS.',
    images: ['/template_executive.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} font-sans bg-gray-100 text-gray-900 antialiased flex flex-col min-h-screen`}>
        {/* <--- 2. Envolvemos todo dentro del AuthProvider */}
        <AuthProvider>
          {/* El Header conectado globalmente */}
          <Header />
          
          {/* Contenido principal de la página */}
          <main className="flex-1">{children}</main>
          
          {/* El Footer conectado globalmente */}
          <Footer />

          {/* Reclutador Virtual Flotante Global */}
          <GlobalChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}