import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Inicializar Supabase del servidor
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, contacto, mensaje, tipo, transaccion } = body;

    // 1. Guardar en la tabla unificada 'mensajes_contacto' en Supabase
    const { error: dbError } = await supabase
      .from('mensajes_contacto')
      .insert([
        { 
          nombre: nombre || 'Anónimo', 
          contacto: contacto, 
          mensaje: mensaje || 'Sin mensaje adicional', 
          tipo_formulario: tipo || 'General',
          transaccion: transaccion || null,
          creado_en: new Date().toISOString()
        }
      ]);

    if (dbError) {
      console.error('Error al guardar en base de datos:', dbError);
    }

    // 2. Inicializar Resend justo aquí dentro para evitar errores de compilación estática
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      
      await resend.emails.send({
        from: 'CVRD Notificaciones <onboarding@resend.dev>',
        to: ['nubellstore@gmail.com'],
        subject: `📢 Nuevo mensaje de [${tipo || 'Soporte/Contacto'}] - CVRD.DO`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #f26a2c; border-bottom: 2px solid #f26a2c; padding-bottom: 10px;">Nuevo mensaje en CVRD.DO</h2>
            <p><strong>Origen / Tipo:</strong> <span style="background: #eee; padding: 3px 8px; border-radius: 4px;">${tipo || 'Formulario General'}</span></p>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Contacto (Correo/Teléfono):</strong> ${contacto}</p>
            ${transaccion ? `<p><strong>ID de Transacción PayPal:</strong> ${transaccion}</p>` : ''}
            <p><strong>Mensaje / Solicitud:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #f26a2c; border-radius: 4px; margin-top: 5px;">
              ${mensaje || 'No se ingresó texto adicional.'}
            </div>
            <p style="font-size: 11px; color: #888; margin-top: 20px; text-align: center;">Este correo fue generado automáticamente desde tu plataforma CVRD.DO</p>
          </div>
        `,
      });
    } else {
      console.warn('RESEND_API_KEY no está configurada. El mensaje se guardó en Supabase pero no se envió por correo.');
    }

    return NextResponse.json({ success: true, message: 'Mensaje procesado correctamente.' });
  } catch (error) {
    console.error('Error general en la API de contacto:', error);
    return NextResponse.json({ error: 'Ocurrió un error al procesar tu solicitud.' }, { status: 500 });
  }
}