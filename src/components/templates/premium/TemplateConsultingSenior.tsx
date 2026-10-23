import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateConsultingSenior({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // DINÁMICO: Conectado al selector de color de acento del editor (Pestaña 9)
  const accentColor = styles?.accentColor || '#f59e0b'; 
  const darkSidebar = '#222225';   // Gris carbón oscuro de la referencia

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA IZQUIERDA ================= */}
      <div className="w-75 flex flex-col shrink-0 relative overflow-hidden text-[12px]" style={{ backgroundColor: darkSidebar }}>
        
        {/* BLOQUE SUPERIOR DINÁMICO CON FOTO */}
        <div className="p-6 flex flex-col items-center justify-center relative transition-colors duration-200" style={{ backgroundColor: accentColor, height: '210px' }}>
          {personal?.showPhoto && (
            <div 
              className={`bg-gray-200 overflow-hidden border-4 border-white shadow-xl flex items-center justify-center shrink-0 ${photoShapeClass}`}
              style={{ width: '135px', height: '135px' }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
              ) : (
                <span className="text-[12px] text-gray-600 font-bold">FOTO</span>
              )}
            </div>
          )}
        </div>

        {/* RESTO DE LA BARRA LATERAL OSCURA */}
        <div className="flex-1 p-6 flex flex-col justify-between space-y-6 text-white text-[12px]">
          
          <div className="space-y-6 text-[12px]">
            
            {/* SECCIÓN CONTACTO */}
            <div className="space-y-3 text-[12px]">
              <div className="flex items-center gap-2 border-b border-gray-700 pb-1.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-white">Contacto</h3>
              </div>
              <div className="text-[12px] text-gray-300 space-y-2 pl-2">
                {personal?.phone && (
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }}></span>
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal?.email && (
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }}></span>
                    <span className="break-all">{personal.email}</span>
                  </div>
                )}
                {personal?.location && (
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }}></span>
                    <span>{personal.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* SECCIÓN REFERENCIAS */}
            {references && references.length > 0 && (
              <div className="space-y-3 pt-1 text-[12px]">
                <div className="flex items-center gap-2 border-b border-gray-700 pb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-[12px] font-bold uppercase tracking-wider text-white">Referencias</h3>
                </div>
                <div className="space-y-3 text-[12px] text-gray-300 pl-2">
                  {references.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5 relative pl-3 border-l text-[12px]" style={{ borderColor: `${accentColor}40` }}>
                      <p className="font-bold text-white text-[12px]">{ref.name}</p>
                      <p className="text-gray-400 text-[12px]">{ref.position} - {ref.company}</p>
                      <p className="text-[12px]" style={{ color: accentColor }}>{ref.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-3 pt-1 text-[12px]">
                <div className="flex items-center gap-2 border-b border-gray-700 pb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-[12px] font-bold uppercase tracking-wider text-white">Educación</h3>
                </div>
                <div className="space-y-3 text-[12px] text-gray-300 pl-2">
                  {education.slice(0, 2).map((edu) => (
                    <div key={edu.id} className="space-y-0.5 relative pl-3 border-l text-[12px]" style={{ borderColor: `${accentColor}40` }}>
                      <p className="text-gray-400 text-[12px] font-semibold">{edu.startDate} - {edu.endDate}</p>
                      <p className="font-bold text-white text-[12px]">{edu.degree}</p>
                      <p className="text-gray-300 text-[12px]">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Pie lateral */}
          <div className="p-2 text-[12px] text-gray-500 text-center border-t border-gray-800">
            CVRD.DO — Senior Edition
          </div>

        </div>
      </div>

      {/* ================= COLUMNA DERECHA PRINCIPAL ================= */}
      <div className="flex-1 bg-white p-8 flex flex-col justify-between relative overflow-hidden text-[12px]">
        
        {/* Franja gris superior sutil de fondo para el encabezado */}
        <div className="absolute top-0 right-0 w-full h-24 bg-gray-100/70 pointer-events-none z-0"></div>

        <div className="space-y-6 z-10 text-[12px]">
          
          {/* ENCABEZADO: NOMBRE A EXACTAMENTE 53px (REGLA DE ORO 1) */}
          <div className="border-b border-gray-300 pb-4 relative">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '53px' }}>
              <span className="font-black text-gray-900 uppercase">{firstName}</span>
              <span style={{ color: accentColor }} className="font-black uppercase">{lastName}</span>
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] mt-2 text-gray-600">
              {personal?.title}
            </p>
            {/* Línea decorativa inferior del encabezado dinámica */}
            <div className="absolute -bottom-1 left-0 w-48 h-1" style={{ backgroundColor: accentColor }}></div>
          </div>

          {/* PERFIL PROFESIONAL */}
          {profile && (
            <div className="space-y-1.5 relative pt-2 text-[12px]">
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-normal pl-4">
                {profile}
              </p>
            </div>
          )}

          {/* EXPERIENCIA LABORAL CON LÍNEA DE TIEMPO */}
          {experience && experience.length > 0 && (
            <div className="space-y-3 relative pt-1 text-[12px]">
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                Experiencia Laboral
              </h3>
              
              <div className="space-y-4 pt-1 border-l-2 border-gray-300 pl-4 ml-1 text-[12px]">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative space-y-1 text-[12px]">
                    {/* Punto dinámico en la línea de tiempo */}
                    <span 
                      className="absolute -top-0.5 w-3 h-3 rounded-full border-2 border-white shadow-xs"
                      style={{ backgroundColor: accentColor, left: '-21px' }}
                    ></span>
                    
                    <div className="flex justify-between items-baseline text-[12px]">
                      <h4 className="font-black text-gray-900 text-[12px] uppercase">{exp.role}</h4>
                      <span className="text-gray-500 font-semibold text-[12px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-gray-600 text-[12px] font-semibold italic">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed text-[12px] whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HABILIDADES CON BARRAS DE PROGRESO */}
          <div className="space-y-3 relative pt-1 text-[12px]">
            <h3 className="text-[12px] font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
              Habilidades & Competencias
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-[12px] pt-1 pl-4">
              {skills && skills.length > 0 && (
                <div className="space-y-2 text-[12px]">
                  {skills.slice(0, 4).map((skill) => (
                    <div key={skill.id} className="space-y-0.5 text-[12px]">
                      <div className="flex justify-between font-semibold text-gray-700 text-[12px]">
                        <span>{skill.name}</span>
                        <span className="text-gray-400 text-[12px]">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {languages && languages.length > 0 && (
                <div className="space-y-2 text-[12px]">
                  {languages.slice(0, 3).map((lang) => (
                    <div key={lang.id} className="space-y-0.5 text-[12px]">
                      <div className="flex justify-between font-semibold text-gray-700 text-[12px]">
                        <span>{lang.name}</span>
                        <span className="text-gray-500 text-[12px]">{lang.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gray-800" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Franja inferior dinámica de cierre */}
        <div className="w-full h-3" style={{ backgroundColor: accentColor }}></div>

        {/* Pie derecho */}
        <div className="flex justify-between items-center text-[12px] text-gray-400 pt-2 border-t border-gray-200 z-10">
          <span>Template Consulting Senior</span>
          <span>CVRD.DO — Premium</span>
        </div>

      </div>
    </div>
  );
}