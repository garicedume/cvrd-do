import { NextResponse } from 'next/server';

const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
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
  return data.access_token;
}

export async function POST(req: Request) {
  try {
    const { orderID } = await req.json();

    // 🛡️ Validación estricta: si no hay orderID, rechazamos la petición de inmediato
    if (!orderID) {
      return NextResponse.json(
        { success: false, error: 'Falta el ID de la orden de PayPal' }, 
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const captureData = await response.json();

    // 🛡️ Validación de seguridad: Verificar que PayPal completó la transacción con éxito
    if (captureData.status === 'COMPLETED') {
      return NextResponse.json({
        success: true,
        status: 'COMPLETED',
        details: captureData
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'El pago no pudo ser completado o fue rechazado por la pasarela.',
        details: captureData
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Error al capturar la orden:', error);
    return NextResponse.json({ success: false, error: 'No se pudo completar el pago' }, { status: 500 });
  }
}