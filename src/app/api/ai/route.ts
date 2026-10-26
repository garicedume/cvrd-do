import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, text } = body;

    if (action === 'improve-profile') {
      const input = (text || 'Profesional motivado').toLowerCase();

      // Banco de múltiples opciones profesionales por área para que vayan rotando
      let opcionesPerfiles: string[] = [];

      if (input.includes('diseño') || input.includes('grafico') || input.includes('disenador') || input.includes('creativo')) {
        opcionesPerfiles = [
          "Diseñador gráfico y visual con sólida trayectoria en desarrollo de identidad de marca, empaques y material publicitario digital y físico. Enfocado en transformar conceptos complejos en piezas visuales atractivas que conectan con las audiencias.",
          "Creativo digital especializado en branding, diseño editorial y dirección de arte. Con destreza en la creación de experiencias visuales memorables que potencian el valor comercial de las empresas y emprendimientos.",
          "Diseñador polivalente enfocado en soluciones gráficas de alto impacto, desde diseño corporativo hasta empaques (DTF/etiquetas). Apasionado por la estética funcional, la precisión tipográfica y la comunicación visual efectiva."
        ];
      } else if (input.includes('sistema') || input.includes('software') || input.includes('desarrollador') || input.includes('programador') || input.includes('it')) {
        opcionesPerfiles = [
          "Ingeniero de Sistemas y Desarrollador de Software con amplia experiencia en el diseño, implementación y optimización de soluciones tecnológicas escalables. Especializado en transformar requerimientos de negocio en arquitecturas digitales eficientes.",
          "Desarrollador Full Stack enfocado en la creación de aplicaciones web modernas, robustas y de alto rendimiento. Con sólida capacidad para resolver problemas complejos y liderar proyectos tecnológicos desde cero hasta producción.",
          "Profesional de TI y desarrollo de software con enfoque en la innovación, calidad de código y optimización de procesos técnicos. Comprometido con la mejora continua y el uso de tecnologías de vanguardia para impulsar el éxito corporativo."
        ];
      } else if (input.includes('ventas') || input.includes('comercial') || input.includes('marketing')) {
        opcionesPerfiles = [
          "Especialista en estrategias comerciales y gestión de ventas con enfoque en la consecución de objetivos y expansión de mercados. Destacado por habilidades de negociación, fidelización de clientes y maximización de rentabilidad.",
          "Experto en marketing y relaciones comerciales, orientado a resultados y al crecimiento corporativo. Capaz de identificar oportunidades de negocio y liderar campañas efectivas de captación y retención.",
          "Profesional del área comercial con fuerte orientación al cliente y cumplimiento de metas financieras. Con experiencia en la optimización de canales de venta y desarrollo de estrategias de posicionamiento."
        ];
      } else {
        opcionesPerfiles = [
          `Especialista en ${input}, con un historial comprobado de ejecución orientada a resultados, eficiencia operativa y mejora continua. Enfocado en aportar valor estratégico, innovación y compromiso en cada proyecto.`,
          `Perfil dinámico en el área de ${input}, destacado por su capacidad analítica, resolución de problemas y adaptabilidad a entornos exigentes. Comprometido con la excelencia y el cumplimiento de metas organizacionales.`,
          `Colaborador orientado al detalle y la productividad en ${input}. Con sólida ética laboral, habilidades comunicativas y una fuerte disposición para liderar y sumar valor en equipos de trabajo multidisciplinarios.`
        ];
      }

      // Seleccionamos una opción de forma aleatoria o rotativa cada vez que den clic
      const perfilAleatorio = opcionesPerfiles[Math.floor(Math.random() * opcionesPerfiles.length)];

      return NextResponse.json({ success: true, result: perfilAleatorio });
    }

    return NextResponse.json({ success: false, error: 'Acción no válida' }, { status: 400 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}