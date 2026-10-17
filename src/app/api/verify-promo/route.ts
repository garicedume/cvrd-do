import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    
    // El código secreto vive en el servidor (variables de entorno privadas, SIN NEXT_PUBLIC_)
    const secretPromoCode = process.env.PROMO_CODE || 'CVRD2026VIP';

    if (code && code.trim().toUpperCase() === secretPromoCode.toUpperCase()) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Código inválido' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Error del servidor' }, { status: 500 });
  }
}