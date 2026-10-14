import { NextResponse } from 'next/server';

// Estructura en memoria para rastrear peticiones por IP
const tracker = new Map<string, { count: number; expiresAt: number }>();

interface RateLimitConfig {
  limit: number;      // Número máximo de intentos permitidos
  windowMs: number;   // Ventana de tiempo en milisegundos
}

export function applyRateLimit(
  req: Request,
  config: RateLimitConfig = { limit: 5, windowMs: 60 * 1000 } // Por defecto: 5 peticiones por minuto
): NextResponse | null {
  // Obtener IP del cliente desde cabeceras de proxy / Vercel / Cloudflare
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || 'anonymous-user';

  const now = Date.now();
  const record = tracker.get(ip);

  // Si no existe registro o la ventana expiró, reinicia el contador
  if (!record || now > record.expiresAt) {
    tracker.set(ip, { count: 1, expiresAt: now + config.windowMs });
    return null; // Permitir petición
  }

  // Si sobrepasa el límite, bloquea la petición
  if (record.count >= config.limit) {
    return NextResponse.json(
      {
        error: 'Has realizado demasiadas solicitudes en poco tiempo. Por favor, espera un minuto e intentalo de nuevo.',
      },
      {
        status: 429, // Too Many Requests
        headers: {
          'Retry-After': Math.ceil((record.expiresAt - now) / 1000).toString(),
        },
      }
    );
  }

  // Incrementar contador
  record.count += 1;
  tracker.set(ip, record);

  return null; // Permitir petición
}