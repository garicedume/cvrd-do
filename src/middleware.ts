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

  // Filtro estricto únicamente para tráfico anónimo explícito de Cloudflare (Tor/Anonymous Proxies)
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith('/api/')) {
    const isTorOrAnonymized = req.headers.get('cf-ipcountry') === 'T1';
    
    if (isTorOrAnonymized) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Acceso denegado: Red anónima detectada.' 
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