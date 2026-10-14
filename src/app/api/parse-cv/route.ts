import { NextResponse } from 'next/server';

// Parche global para prevenir errores de entorno en Node.js al leer PDFs
if (typeof global.DOMMatrix === 'undefined') {
  // @ts-expect-error Manejo preventivo para compatibilidad de DOMMatrix en Node
  global.DOMMatrix = class DOMMatrix {
    constructor() {}
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No se ha proporcionado ningún archivo.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = '';

    const mimeType = file.type;
    const fileName = file.name.toLowerCase();

    // 1. Extracción segura para PDF
    if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdfParse = require('pdf-parse');
        const pdfData = await pdfParse(buffer);
        extractedText = pdfData.text;
      } catch (pdfError) {
        console.error('Error interno en pdf-parse:', pdfError);
        return NextResponse.json(
          { success: false, error: 'No se pudo leer el contenido del PDF. Intenta con formato Word.' },
          { status: 400 }
        );
      }
    } 
    // 2. Extracción para Word (.docx) usando require dinámico
    else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileName.endsWith('.docx')
    ) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const mammoth = require('mammoth');
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value;
      } catch (docError) {
        console.error('Error interno en mammoth:', docError);
        return NextResponse.json(
          { success: false, error: 'No se pudo leer el archivo Word. Asegúrate de que sea un archivo .docx válido.' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, error: 'Formato no soportado. Sube únicamente un archivo PDF o Word (.docx).' },
        { status: 400 }
      );
    }

    if (!extractedText || extractedText.trim().length < 15) {
      return NextResponse.json(
        { success: false, error: 'El archivo parece estar vacío o el texto no se pudo extraer.' },
        { status: 400 }
      );
    }

    // ==========================================
    // ANÁLISIS INTELIGENTE CON GOOGLE GEMINI
    // ==========================================
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'La API Key de Gemini no está configurada en el servidor.' },
        { status: 500 }
      );
    }

    const promptText = `Eres un parser experto de currículums y analista de recursos humanos. Analiza el texto del CV proporcionado y extrae la información de manera precisa. Devuélveme ÚNICAMENTE un objeto JSON válido con la siguiente estructura exacta:
    {
      "contact": {
        "fullName": "string",
        "professionalTitle": "string",
        "phone": "string",
        "email": "string",
        "city": "string",
        "country": "string"
      },
      "summary": "string",
      "experiences": [
        {
          "company": "string",
          "position": "string",
          "startDate": "string",
          "endDate": "string",
          "responsibilities": ["string"]
        }
      ],
      "education": [
        {
          "degree": "string",
          "institution": "string",
          "startDate": "string",
          "endDate": "string"
        }
      ],
      "skills": [
        {
          "name": "string",
          "category": "technical"
        }
      ],
      "languages": [
        {
          "language": "string",
          "proficiency": "Intermedio"
        }
      ]
    }

    Texto del CV:
    ${extractedText.trim()}`;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptText }]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json"
        }
      }),
    });

    const geminiData = await geminiResponse.json();
    
    if (!geminiResponse.ok) {
      throw new Error(geminiData.error?.message || 'Error al comunicarse con la API de Google Gemini.');
    }

    const completionContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    let structuredCV = null;
    if (completionContent) {
      try {
        const cleanJsonText = completionContent.replace(/```json/g, '').replace(/```/g, '').trim();
        structuredCV = JSON.parse(cleanJsonText);
      } catch (parseError) {
        console.error('Error parseando el JSON de Gemini:', parseError);
        throw new Error('Gemini devolvió un formato no válido.');
      }
    }

    return NextResponse.json({
      success: true,
      fileName: file.name,
      parsedData: structuredCV,
    });

  } catch (error: unknown) {
    console.error('Error crítico en el backend:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error al procesar el archivo con Gemini.';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}