import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterApexExecutive({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // DINÁMICO: Conectado al selector de color del editor / builder
  const accentColor = styles?.accentColor || '#38bdf8'; 
  const darkSidebarBg = '#272d37'; // Gris carbón / azul noche corporativo

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex select-none"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ========================================================================= */}
      {/* COLUMNA IZQUIERDA (BARRA LATERAL OSCURA - 36% ANCHO)                       */}
      {/* ========================================================================= */}
      <div 
        className="w-[36%] h-full flex flex-col justify-between p-5 text-white shrink-0 relative overflow-hidden"
        style={{ backgroundColor: darkSidebarBg }}
      >
        <div className="flex flex-col space-y-4">
          
          {/* REGLAS DE ORO 3 & 5: FOTO EXACTA DE 160px x 160px CON RESPIRACIÓN */}
          {personal?.showPhoto && (
            <div className="flex justify-center pt-1 pb-1">
              <div 
                className="rounded-full p-1 flex items-center justify-center shrink-0 shadow-md"
                style={{ backgroundColor: accentColor }}
              >
                <div 
                  className="rounded-full overflow-hidden border-2 border-[#272d37] bg-gray-600 flex items-center justify-center shrink-0"
                  style={{ width: '160px', height: '160px' }}
                >
                  {personal?.photoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={personal.photoUrl} 
                      alt="Perfil" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span className="text-[10px] text-gray-300 font-bold tracking-widest">FOTO</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN: EDUCACIÓN */}
          {education && education.length > 0 && (
            <div className="space-y-2">
              <div className="border-b-2 pb-1" style={{ borderColor: accentColor }}>
                <h3 className="font-bold text-[11px] uppercase tracking-wider" style={{ color: accentColor }}>
                  Educación
                </h3>
              </div>
              <div className="space-y-2.5 pl-1">
                {education.map((edu) => (
                  <div key={edu.id} className="relative space-y-0.5" style={{ paddingLeft: '14px' }}>
                    {/* Círculo indicador de línea de tiempo */}
                    <span 
                      className="absolute top-1 w-2 h-2 rounded-full border border-white"
                      style={{ backgroundColor: accentColor, left: '0px' }}
                    ></span>
                    <p className="font-bold text-[10.5px] leading-tight text-white">
                      {edu.degree}
                    </p>
                    <p className="text-[9.5px] font-semibold text-gray-200">
                      {edu.institution}
                    </p>
                    <p className="text-[9px] text-gray-300 font-medium">
                      {edu.startDate} – {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN: CONTACTO */}
          <div className="space-y-2">
            <div className="border-b-2 pb-1" style={{ borderColor: accentColor }}>
              <h3 className="font-bold text-[11px] uppercase tracking-wider" style={{ color: accentColor }}>
                Contacto
              </h3>
            </div>
            <div className="space-y-2 text-[9.5px] pl-1">
              {personal?.location && (
                <div className="relative space-y-0.5" style={{ paddingLeft: '14px' }}>
                  <span 
                    className="absolute top-1 w-2 h-2 rounded-full border border-white"
                    style={{ backgroundColor: accentColor, left: '0px' }}
                  ></span>
                  <p className="font-bold text-white uppercase text-[9px]">Dirección</p>
                  <p className="text-gray-300 wrap-break-word leading-tight font-light">{personal.location}</p>
                </div>
              )}
              {personal?.phone && (
                <div className="relative space-y-0.5" style={{ paddingLeft: '14px' }}>
                  <span 
                    className="absolute top-1 w-2 h-2 rounded-full border border-white"
                    style={{ backgroundColor: accentColor, left: '0px' }}
                  ></span>
                  <p className="font-bold text-white uppercase text-[9px]">Teléfono</p>
                  <p className="text-gray-300 font-light">{personal.phone}</p>
                </div>
              )}
              {personal?.email && (
                <div className="relative space-y-0.5" style={{ paddingLeft: '14px' }}>
                  <span 
                    className="absolute top-1 w-2 h-2 rounded-full border border-white"
                    style={{ backgroundColor: accentColor, left: '0px' }}
                  ></span>
                  <p className="font-bold text-white uppercase text-[9px]">Correo Electrónico</p>
                  <p className="text-gray-300 break-all font-light">{personal.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* SECCIÓN: HABILIDADES */}
          {skills && skills.length > 0 && (
            <div className="space-y-2">
              <div className="border-b-2 pb-1" style={{ borderColor: accentColor }}>
                <h3 className="font-bold text-[11px] uppercase tracking-wider" style={{ color: accentColor }}>
                  Habilidades
                </h3>
              </div>
              <div className="space-y-2 text-[9.5px] pl-1">
                {skills.map((skill) => (
                  <div key={skill.id} className="relative space-y-1" style={{ paddingLeft: '14px' }}>
                    <span 
                      className="absolute top-1.5 w-2 h-2 rounded-full border border-white"
                      style={{ backgroundColor: accentColor, left: '0px' }}
                    ></span>
                    <div className="flex justify-between items-center pr-1">
                      <span className="font-semibold text-white tracking-wide">{skill.name}</span>
                    </div>
                    {/* Barra deslizadora de nivel */}
                    <div className="relative w-full bg-gray-600 h-1 rounded-full overflow-visible flex items-center">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: '80%', backgroundColor: accentColor }}
                      ></div>
                      <div 
                        className="absolute w-2 h-2 rounded-full border border-white shadow-xs"
                        style={{ left: '78%', backgroundColor: accentColor }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* PIE DE PÁGINA COLUMNA IZQUIERDA */}
        <div className="text-[9px] text-gray-400 text-center border-t border-gray-600/50 pt-2 tracking-widest uppercase">
          CVRD.DO — Premium
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COLUMNA DERECHA (CONTENIDO PRINCIPAL - 64% ANCHO)                          */}
      {/* ========================================================================= */}
      <div className="w-[64%] h-full flex flex-col justify-between p-7 bg-white">
        
        <div className="flex flex-col space-y-5">
          
          {/* ENCABEZADO PRINCIPAL */}
          {/* REGLA DE ORO 1: NOMBRE A 53px EXACTAMENTE */}
          <div className="border-b-2 border-gray-700 pb-3">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '53px' }}>
              <span className="font-black" style={{ color: accentColor }}>{firstName}</span>
              <span className="font-bold text-gray-800">{lastName}</span>
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] mt-2 text-gray-700">
              {personal?.title || 'Perfil Profesional'}
            </p>
          </div>

          {/* SECCIÓN: PERFIL PROFESIONAL */}
          {/* REGLA DE ORO 6: TEXTO JUSTIFICADO */}
          {profile && (
            <div className="space-y-1.5">
              <div className="border-b-2 border-gray-700 pb-1">
                <h3 className="font-bold text-[12px] uppercase tracking-wider" style={{ color: accentColor }}>
                  Perfil Profesional
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-[10.5px] text-justify font-normal">
                {profile}
              </p>
            </div>
          )}

          {/* SECCIÓN: EXPERIENCIA LABORAL */}
          {experience && experience.length > 0 && (
            <div className="space-y-2.5">
              <div className="border-b-2 border-gray-700 pb-1">
                <h3 className="font-bold text-[12px] uppercase tracking-wider" style={{ color: accentColor }}>
                  Experiencia Laboral
                </h3>
              </div>
              
              <div className="space-y-3.5">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative space-y-1 border-l-2 border-gray-200 ml-1" style={{ paddingLeft: '16px' }}>
                    {/* Círculo indicador de línea de tiempo */}
                    <span 
                      className="absolute top-1 w-2.5 h-2.5 rounded-full border-2 border-white shadow-xs"
                      style={{ backgroundColor: accentColor, left: '-6px' }}
                    ></span>
                    
                    <div className="flex flex-col">
                      <h4 className="font-bold text-gray-900 text-[11px] tracking-wide uppercase">
                        {exp.role}
                      </h4>
                      <div className="flex justify-between items-center text-[10px] text-gray-600 font-semibold">
                        <span>{exp.company}</span>
                        <span className="text-gray-500 font-medium">{exp.startDate} – {exp.endDate}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed text-[10px] text-justify whitespace-pre-line font-light">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN: REFERENCIAS */}
          {references && references.length > 0 && (
            <div className="space-y-2.5">
              <div className="border-b-2 border-gray-700 pb-1">
                <h3 className="font-bold text-[12px] uppercase tracking-wider" style={{ color: accentColor }}>
                  Referencias
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {references.map((ref) => (
                  <div key={ref.id} className="relative space-y-0.5 border-l-2 border-gray-200" style={{ paddingLeft: '14px' }}>
                    <span 
                      className="absolute top-1 w-2 h-2 rounded-full border border-white"
                      style={{ backgroundColor: accentColor, left: '-5px' }}
                    ></span>
                    <p className="font-bold text-gray-900 text-[10.5px]">{ref.name}</p>
                    <p className="text-gray-600 text-[10px]">{ref.position} {ref.company ? `- ${ref.company}` : ''}</p>
                    {ref.phone && <p className="text-gray-500 text-[9.5px]">Tel: {ref.phone}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN: IDIOMAS */}
          {languages && languages.length > 0 && (
            <div className="space-y-2.5">
              <div className="border-b-2 border-gray-700 pb-1">
                <h3 className="font-bold text-[12px] uppercase tracking-wider" style={{ color: accentColor }}>
                  Idiomas
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                {languages.map((lang) => (
                  <div key={lang.id} className="relative flex justify-between items-center text-[10px]" style={{ paddingLeft: '14px' }}>
                    <span 
                      className="absolute top-1.5 w-2 h-2 rounded-full border border-white"
                      style={{ backgroundColor: accentColor, left: '0px' }}
                    ></span>
                    <span className="font-bold text-gray-800">{lang.name}</span>
                    <span className="text-gray-500 text-[9.5px] font-medium">{lang.level || 'Nativo / Fluido'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* PIE DE PÁGINA COLUMNA DERECHA */}
        <div className="text-right text-[9.5px] text-gray-400 pt-2 border-t border-gray-200 tracking-widest uppercase">
          Template Master Apex Executive — CVRD.DO
        </div>

      </div>
    </div>
  );
}