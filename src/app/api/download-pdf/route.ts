import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: Request) {
  try {
    const { cvData, templateKey } = await request.json();

    // Iniciar Puppeteer en modo servidor
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Configurar viewport exacto para hoja Carta con escala de nitidez
    await page.setViewport({
      width: 816,
      height: 1056,
      deviceScaleFactor: 3, 
    });

    // Inyectar los datos del CV
    await page.evaluateOnNewDocument((data: any) => {
      localStorage.setItem('cvrd_saved_cv_data', JSON.stringify(data));
    }, cvData);

    // Cargar la página con &unlocked=true para evitar la marca de agua
    const host = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    await page.goto(`${host}/builder?template=${templateKey}&unlocked=true`, {
      waitUntil: 'networkidle0',
    });

    // Esperar a que las fuentes estén listas
    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    // Pausa breve para renderizado completo de vectores y estilos
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // INYECTAR CSS ESTRICTO: Previene la 2ra página en blanco y corrige los iconos SVG
    await page.addStyleTag({
      content: `
        @page {
          size: letter portrait;
          margin: 0;
        }
        body {
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
          -webkit-print-color-adjust: exact;
        }
        body * {
          visibility: hidden !important;
        }
        #cv-print-container, #cv-print-container * {
          visibility: visible !important;
        }
        #cv-print-container {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 816px !important;
          height: 1056px !important;
          max-height: 1056px !important;
          overflow: hidden !important;
          background: #ffffff !important;
          box-shadow: none !important;
        }
        /* Corrección para iconos SVG: evita que se vean como bloques sólidos */
        #cv-print-container svg {
          display: inline-block;
          vertical-align: middle;
          shape-rendering: geometricPrecision;
          text-rendering: geometricPrecision;
        }
      `
    });

    // Generar PDF exacto a 1 sola página sin márgenes extra
    const pdfBuffer = await page.pdf({
      format: 'letter',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    });

    await browser.close();

    // Retornar el archivo limpio y listo
    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="CV_${cvData.personal.fullName ? cvData.personal.fullName.replace(/\s+/g, '_') : 'Curriculum'}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error generando PDF con Puppeteer:', error);
    return NextResponse.json({ error: 'Error al generar el PDF en el servidor' }, { status: 500 });
  }
}