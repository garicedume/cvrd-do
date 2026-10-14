import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Desactiva los mapas de código en producción para proteger tu código fuente de ingeniería inversa
  productionBrowserSourceMaps: false,
  // Oculta la cabecera 'X-Powered-By: Next.js' para mayor seguridad por oscuridad
  poweredByHeader: false,
  reactStrictMode: true,

  // Cabeceras de seguridad estrictas (Nivel Banco)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // Evita ataques de Clickjacking (que carguen tu web dentro de un iframe falso)
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Bloquea la suplantación de tipos MIME
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // Protege el origen de tus peticiones
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()", // Desactiva acceso no autorizado a hardware
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block", // Filtro contra ataques Cross-Site Scripting
          },
        ],
      },
    ];
  },
};

export default nextConfig;