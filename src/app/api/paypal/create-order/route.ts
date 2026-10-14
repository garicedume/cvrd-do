import { NextResponse } from 'next/server';
import { applyRateLimit } from '@/lib/rateLimit';

const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_CLIENT_SECRET;

const isLive = process.env.PAYPAL_MODE === 'live';
const PAYPAL_BASE_URL = isLive
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
  if (!PAYPAL_CLIENT || !PAYPAL_SECRET) {
    throw new Error('Faltan las credenciales de PayPal en .env.local');
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`).toString('base64');
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'x-www-form-urlencoded',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Error obteniendo token de PayPal:', data);
    throw new Error(data.error_description || data.error || 'Error de autenticación con PayPal');
  }

  return data.access_token;
}

export async function POST(req: Request) {
  // 🛡️ APLICAR RATE LIMITING (Máximo 5 peticiones por minuto por dirección IP)
  const rateLimitResponse = applyRateLimit(req, { limit: 5, windowMs: 60 * 1000 });
  if (rateLimitResponse) {
    return rateLimitResponse; // Devuelve un estado 429 si se abusa del endpoint
  }

  try {
    const { templateId } = await req.json();

    const lowerKey = (templateId || '').toLowerCase();
    let amount = '3.00';
    let planName = 'Plantilla Básica';

    if (lowerKey.includes('master') || lowerKey.includes('executivegold')) {
      amount = '10.00';
      planName = 'Plantilla Master';
    } else if (lowerKey.includes('premium') || lowerKey.includes('corporatearch')) {
      amount = '5.00';
      planName = 'Plantilla Premium';
    }

    const accessToken = await getAccessToken();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount,
            },
            description: `CVRD.DO - ${planName} (${templateId})`,
          },
        ],
        application_context: {
          return_url: `${baseUrl}/builder?template=${templateId}&payment=success`,
          cancel_url: `${baseUrl}/builder?template=${templateId}&payment=cancelled`,
        },
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      console.error('Error al crear la orden en PayPal:', order);
      return NextResponse.json(
        { error: order.message || 'Error al generar la orden en PayPal' },
        { status: response.status }
      );
    }

    return NextResponse.json(order);
  } catch (error: unknown) {
    console.error('Error en el servidor API PayPal:', error);
    const errorMessage = error instanceof Error ? error.message : 'No se pudo procesar el pago';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}