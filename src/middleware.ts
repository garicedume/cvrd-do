import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  
  // Encabezados de Seguridad de Nivel Bancario (Security Headers)
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Bloqueo estricto de VPN/Proxy en endpoints de pagos o acciones críticas de usuarios
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith('/api/')) {
    const isVpnOrProxy = 
      req.headers.get('x-vercel-proxied-for') || 
      req.headers.get('x-vpn-detected') ||
      req.headers.get('cf-ipcountry') === 'T1'; // Detección de Tor/Proxy genérico en CDNs
    
    if (isVpnOrProxy) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Acceso denegado: Por políticas de seguridad bancaria, no se permiten conexiones VPN, Proxies o redes anónimas para procesar operaciones.' 
        }),
        { status: 403, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};