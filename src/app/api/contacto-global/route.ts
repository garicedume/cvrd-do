import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Inicializar Supabase del servidor
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Inicializar Resend para el envío de correos (requiere poner tu RESEND_API_KEY en Vercel)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, contacto, mensaje, tipo, transaccion } = body;

    // 1. Guardar de forma centralizada en Supabase en una tabla unificada 'mensajes_contacto'
    const { error: dbError } = await supabase
      .from('mensajes_contacto')
      .insert([
        { 
          nombre: nombre || 'Anónimo', 
          contacto: contacto, 
          mensaje: mensaje || 'Sin mensaje', 
          tipo_formulario: tipo || 'General',
          transaccion: transaccion || null,
          creado_en: new Date().toISOString()
        }
      ]);

    if (dbError) {
      console.error('Error al guardar en base de datos:', dbError);
    }

    // 2. Disparar el correo electrónico hacia tu bandeja personal
    await resend.emails.send({
      from: 'CVRD Notificaciones <onboarding@resend.dev>',
      to: ['tu-correo-personal@gmail.com'], // <-- CAMBIA ESTO POR TU CORREO PERSONAL REAL
      subject: `📢 Nuevo mensaje de [${tipo || 'Soporte/Contacto'}] - CVRD.DO`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #f26a2c;">Has recibido un nuevo mensaje en CVRD.DO</h2>
          <p><strong>Origen / Tipo:</strong> ${tipo || 'Formulario General'}</p>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Contacto (Correo/Teléfono):</strong> ${contacto}</p>
          ${transaccion ? `<p><strong>ID de Transacción PayPal:</strong> ${transaccion}</p>` : ''}
          <p><strong>Mensaje / Solicitud:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #f26a2c;">
            ${mensaje || 'No se ingresó texto adicional.'}
          </blockquote>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Mensaje procesado y enviado correctamente.' });
  } catch (error) {
    console.error('Error general en la API de contacto:', error);
    return NextResponse.json({ error: 'Ocurrió un error al procesar tu solicitud.' }, { status: 500 });
  }
}