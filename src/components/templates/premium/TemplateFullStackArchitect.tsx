import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateFullStackArchitect({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // DINÁMICO: Conectado al selector de color de acento del editor (Pestaña 9)
  const accentColor = styles?.accentColor || '#0d9488'; 
  const darkFooterBg = '#373041'; // Gris oscuro elegante de las píldoras de contacto inferiores

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex flex-col justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div className="flex flex-col h-full p-6 box-border justify-between">
        
        {/* ================= CABECERA SUPERIOR (NOMBRE EN UNA SOLA FILA + FOTO) ================= */}
        <div className="grid grid-cols-12 gap-4 items-center pb-3">
          
          {/* Lado Izquierdo: Nombre en una sola fila a 53px y Puesto */}
          <div className="col-span-8 flex flex-col justify-center">
            {/* REGLA DE ORO 1: Nombre exactamente a 53px en una sola línea horizontal */}
            <h1 className="tracking-tight leading-none flex items-baseline gap-3 uppercase whitespace-nowrap overflow-hidden" style={{ fontSize: '53px' }}>
              <span className="font-black text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mt-2 text-gray-500 border-b border-gray-300 pb-1 inline-block">
              {personal?.title || 'DESARROLLADOR WEB & UI'}
            </p>
          </div>

          {/* Lado Derecho: Foto con respiración */}
          {personal?.showPhoto && (
            <div className="col-span-4 flex justify-end">
              <div 
                className={`bg-gray-200 overflow-hidden border-2 border-white shadow-xl flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '130px', height: '140px' }}
              >
                {personal?.photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-gray-400 font-bold">FOTO</span>
                )}
              </div>
            </div>
          )}

        </div>

        {/* BLOQUE DE PERFIL PROFESIONAL / RESUMEN AJUSTADO (NO LARGO) */}
        <div className="p-3 rounded-xl text-white my-1 shadow-sm transition-colors duration-200" style={{ backgroundColor: accentColor }}>
          <p className="text-[10px] leading-relaxed text-justify font-medium">
            {profile || 'Ingeniero de Sistemas y Arquitecto de Software con amplia trayectoria en el diseño, desarrollo y optimización de soluciones digitales de alto impacto para corporaciones globales.'}
          </p>
        </div>

        {/* ================= CUERPO PRINCIPAL EN 2 COLUMNAS ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1 pt-1">
          
          {/* COLUMNA IZQUIERDA (EDUCACIÓN Y EXPERIENCIA) */}
          <div className="col-span-7 flex flex-col space-y-3 pr-3 border-r border-gray-200">
            
            {/* EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 border-b border-gray-300 pb-1">
                  <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Educación</h3>
                </div>
                <div className="space-y-2 pl-3">
                  {education.slice(0, 2).map((edu) => (
                    <div key={edu.id} className="relative space-y-0.5 border-l-2 pl-3" style={{ borderColor: accentColor }}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-black text-gray-900 text-[11px] uppercase">{edu.degree}</h4>
                        <span className="text-gray-500 font-semibold text-[9px]">{edu.startDate} - {edu.endDate}</span>
                      </div>
                      <p className="text-gray-600 text-[10px] font-semibold">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EXPERIENCIA LABORAL */}
            {experience && experience.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 border-b border-gray-300 pb-1">
                  <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Experiencia Laboral</h3>
                </div>
                
                <div className="space-y-2.5 pl-3">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative space-y-1 border-l-2 pl-3" style={{ borderColor: accentColor }}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-black text-gray-900 text-[11px] uppercase">{exp.role}</h4>
                        <span className="text-gray-500 font-semibold text-[9px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-gray-600 text-[10px] font-bold">{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed text-[10px] whitespace-pre-line text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA (HABILIDADES, IDIOMAS Y REFERENCIAS) */}
          <div className="col-span-5 flex flex-col space-y-3 pl-1">
            
            {/* HABILIDADES / SKILLS */}
            {skills && skills.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 border-b border-gray-300 pb-1">
                  <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Habilidades</h3>
                </div>
                <div className="space-y-1.5 text-[10px]">
                  {skills.slice(0, 5).map((skill) => (
                    <div key={skill.id} className="space-y-0.5">
                      <div className="flex justify-between font-bold text-gray-800">
                        <span>{skill.name}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden flex">
                        <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IDIOMAS */}
            {languages && languages.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 border-b border-gray-300 pb-1">
                  <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Idiomas</h3>
                </div>
                <div className="flex justify-around pt-0.5">
                  {languages.slice(0, 3).map((lang, idx) => (
                    <div key={lang.id} className="flex flex-col items-center">
                      <div 
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-[9px]"
                        style={{ borderColor: accentColor, color: accentColor }}
                      >
                        {idx === 0 ? '95%' : idx === 1 ? '60%' : '45%'}
                      </div>
                      <span className="text-[9px] font-bold text-gray-700 mt-0.5 uppercase">{lang.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REFERENCIAS */}
            {references && references.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 border-b border-gray-300 pb-1">
                  <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Referencias</h3>
                </div>
                <div className="space-y-1.5 text-[10px]">
                  {references.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5 bg-gray-50 p-2 rounded-lg border border-gray-200">
                      <p className="font-black text-gray-900 text-[11px]">{ref.name}</p>
                      <p className="text-gray-600 font-medium">{ref.position} - {ref.company}</p>
                      <p className="font-bold text-gray-800">Tel: {ref.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= PIE DE PÁGINA CON PÍLDORAS DE CONTACTO SIMÉTRICAS ================= */}
        <div className="pt-2 border-t border-gray-200 mt-1">
          <div className="flex justify-center items-center gap-3 text-white text-[10px] font-semibold">
            {personal?.phone && (
              <div className="px-3 py-1 rounded-full flex items-center gap-2 shadow-xs" style={{ backgroundColor: darkFooterBg }}>
                <span>📞</span>
                <span>{personal.phone}</span>
              </div>
            )}
            {personal?.email && (
              <div className="px-3 py-1 rounded-full flex items-center gap-2 shadow-xs" style={{ backgroundColor: darkFooterBg }}>
                <span>✉️</span>
                <span className="break-all">{personal.email}</span>
              </div>
            )}
            {personal?.location && (
              <div className="px-3 py-1 rounded-full flex items-center gap-2 shadow-xs" style={{ backgroundColor: darkFooterBg }}>
                <span>📍</span>
                <span>{personal.location}</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}