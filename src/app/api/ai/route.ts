import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, text, messages, currentCvData } = body;

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // 1. ACCIÓN: MEJORAR PERFIL PROFESIONAL
    if (action === 'improve-profile') {
      const input = text || 'Profesional motivado buscando nuevas oportunidades';

      if (!apiKey) {
        return NextResponse.json({ 
          success: true, 
          result: `Especialista en ${input}, con un historial comprobado de ejecución orientada a resultados, eficiencia operativa y mejora continua.` 
        });
      }

      const promptText = `Eres un experto redactor de currículums para República Dominicana. Redacta un perfil profesional de alta calidad (3 a 4 líneas) basado en: "${input}". Devuelve únicamente el párrafo.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 8192 }
        })
      });

      const data = await response.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || `Profesional especializado en ${input} con sólida experiencia.`;
      return NextResponse.json({ success: true, result: resultText });
    }

    // 2. ACCIÓN: CHATBOT ASISTENTE QUE COMPILA DATOS EN TIEMPO REAL
    if (action === 'chat-compile') {
      if (!apiKey) {
        return NextResponse.json({
          success: true,
          reply: "¡Hola! Soy tu asistente de CVRD.DO. ¿Cuál es tu nombre completo y en qué trabajas?",
          cvUpdates: null
        });
      }

      const systemInstruction = `Eres el Reclutador Virtual y Asistente oficial de CVRD.DO en República Dominicana.
      Tu trabajo es conversar amablemente con el usuario para armar su currículum paso a paso.
      Estado actual del CV del usuario: ${JSON.stringify(currentCvData || {})}

      INSTRUCCIÓN CRÍTICAMENTE IMPORTANTE:
      En cada turno, debes analizar si el usuario te dio un dato nuevo (como su nombre, teléfono, correo, título, experiencia o habilidad). 
      Devuelve la respuesta ÚNICAMENTE en formato JSON válido con esta estructura exacta (sin bloques markdown \`\`\`json):
      {
        "reply": "Tu mensaje conversacional amigable para el usuario aquí...",
        "cvUpdates": {
          "personal": { "fullName": "...", "phone": "...", "email": "...", "title": "..." },
          "profile": "...",
          "addExperience": { "company": "...", "role": "...", "startDate": "...", "endDate": "...", "description": "..." }
        }
      }
      (Si en el mensaje actual el usuario no dio ningún dato nuevo para el CV, deja "cvUpdates" como null o incluye solo lo que haya actualizado).`;

      const formattedMessages = [
        { role: "user", parts: [{ text: systemInstruction }] },
        ...(messages || []).map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }))
      ];

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: { temperature: 0.7, responseMimeType: "application/json", maxOutputTokens: 8192 }
        })
      });

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      
      let parsedResponse;
      try {
        const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        parsedResponse = JSON.parse(cleanJson);
      } catch (e) {
        parsedResponse = {
          reply: rawText || "¡Entendido! Cuéntame más sobre tu experiencia.",
          cvUpdates: null
        };
      }

      return NextResponse.json({ success: true, ...parsedResponse });
    }

    return NextResponse.json({ success: false, error: 'Acción no válida' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}