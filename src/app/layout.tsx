import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "CVRD.DO — Constructor de CVs",
  description: "Crea tu currículum profesional con precisión perfecta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} font-sans bg-gray-100 text-gray-900 antialiased flex flex-col min-h-screen`}>
        {/* El Header conectado globalmente */}
        <Header />
        
        {/* Aquí es donde Next.js inyecta el contenido de tu page.tsx de inicio */}
        <main className="flex-1">{children}</main>
        
        {/* El Footer conectado globalmente */}
        <Footer />
      </body>
    </html>
  );
}