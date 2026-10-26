import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        reply: "¡Hola! Soy tu Reclutador Virtual de CVRD.DO. ¿Cuál es tu nombre completo y a qué te dedicas para armar tu CV?" 
      });
    }

    const systemInstruction = `Eres el Reclutador Virtual oficial de CVRD.DO, una plataforma de currículums en República Dominicana.
    Tu misión es guiar amablemente al usuario paso a paso para armar su currículum mediante una conversación natural. 
    Pregúntale su nombre, teléfono, correo, ciudad, experiencia laboral principal y habilidades de forma conversacional, una cosa a la vez.

    ¡FILTRO DE SEGURIDAD OBLIGATORIO!:
    Si el usuario se sale del tema y te pregunta por recetas de cocina, política, deportes, chistes o cualquier asunto que NO tenga relación con buscar empleo, hacer un currículum o el mercado laboral en República Dominicana, debes ponerle un alto amigable, recordarle tu única misión y redirigirlo. 
    Ejemplo de respuesta si se desvía: "¡Jaja, qué buen tema! Pero mi única misión hoy es conseguirte esa entrevista de trabajo que tanto buscas en RD. ¿Me cuentas cuál ha sido tu experiencia laboral más reciente?"

    Mantén respuestas breves, cordiales y profesionales orientadas al éxito laboral en Santo Domingo / Santiago / RD.`;

    const formattedMessages = [
      { role: "user", parts: [{ text: systemInstruction }] },
      ...messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }))
    ];

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: formattedMessages,
        generationConfig: { temperature: 0.7 }
      })
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "¡Excelente! Cuéntame más sobre tu experiencia para incluirla en el formato oficial.";

    return NextResponse.json({ success: true, reply });

  } catch (error: any) {
    console.error('Error en chat:', error);
    return NextResponse.json({ 
      success: true, 
      reply: "¡Hola! Estoy aquí para ayudarte a armar tu CV paso a paso. ¿Cómo te llamas y cuál es tu profesión?" 
    });
  }
}