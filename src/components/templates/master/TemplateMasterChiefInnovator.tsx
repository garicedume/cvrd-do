import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterChiefInnovator({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // DINÁMICO: Conectado al selector de color del editor. Por defecto el amarillo/dorado de la muestra
  const accentColor = styles?.accentColor || '#f5a623'; 
  const darkSidebarBg = '#1c1b36'; // Azul marino oscuro profundo de la muestra de referencia

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
      {/* COLUMNA IZQUIERDA (BARRA LATERAL AZUL NOCHE CON BORDE DE ACENTO)          */}
      {/* ========================================================================= */}
      <div 
        className="w-[36%] h-full flex flex-col justify-between p-5 text-white shrink-0 relative overflow-hidden"
        style={{ 
          backgroundColor: darkSidebarBg,
          borderRight: `5px solid ${accentColor}`
        }}
      >
        <div className="flex flex-col space-y-5">
          
          {/* REGLAS DE ORO 3 & 5: FOTO DE 160px x 160px CON ANILLO DE ACENTO */}
          {personal?.showPhoto && (
            <div className="flex justify-center pt-2 pb-1">
              <div 
                className="rounded-full p-1 flex items-center justify-center shrink-0 shadow-xl"
                style={{ backgroundColor: accentColor }}
              >
                <div 
                  className="rounded-full overflow-hidden border-2 border-[#1c1b36] bg-gray-700 flex items-center justify-center shrink-0"
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

          {/* SECCIÓN: CONTACTO CON PÍLDORA DE ENCABEZADO */}
          <div className="space-y-3">
            <div 
              className="py-1 px-3 rounded-full text-center shadow-sm"
              style={{ backgroundColor: accentColor }}
            >
              <h3 className="font-bold text-[11px] uppercase tracking-wider text-[#1c1b36]">
                Contacto
              </h3>
            </div>
            <div className="space-y-2.5 text-[9.5px] pl-1 text-gray-200">
              {personal?.location && (
                <div className="space-y-0.5">
                  <p className="font-bold text-white uppercase text-[9px]">Ubicación</p>
                  <p className="wrap-break-word leading-tight font-light text-gray-300">{personal.location}</p>
                </div>
              )}
              {personal?.phone && (
                <div className="space-y-0.5">
                  <p className="font-bold text-white uppercase text-[9px]">Teléfono</p>
                  <p className="font-light text-gray-300">{personal.phone}</p>
                </div>
              )}
              {personal?.email && (
                <div className="space-y-0.5">
                  <p className="font-bold text-white uppercase text-[9px]">Correo Electrónico</p>
                  <p className="break-all font-light text-gray-300">{personal.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* SECCIÓN: HABILIDADES */}
          {skills && skills.length > 0 && (
            <div className="space-y-3">
              <div 
                className="py-1 px-3 rounded-full text-center shadow-sm"
                style={{ backgroundColor: accentColor }}
              >
                <h3 className="font-bold text-[11px] uppercase tracking-wider text-[#1c1b36]">
                  Habilidades
                </h3>
              </div>
              <div className="space-y-2 text-[9.5px] pl-1">
                {skills.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between items-center pr-1">
                      <span className="font-semibold text-white tracking-wide uppercase text-[9px]">{skill.name}</span>
                    </div>
                    {/* Barra de progreso de dos tonos */}
                    <div className="w-full bg-gray-600 h-1.5 rounded-full overflow-hidden flex">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: '85%', backgroundColor: accentColor }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN: IDIOMAS */}
          {languages && languages.length > 0 && (
            <div className="space-y-3">
              <div 
                className="py-1 px-3 rounded-full text-center shadow-sm"
                style={{ backgroundColor: accentColor }}
              >
                <h3 className="font-bold text-[11px] uppercase tracking-wider text-[#1c1b36]">
                  Idiomas
                </h3>
              </div>
              <div className="space-y-2 text-[9.5px] pl-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="space-y-1">
                    <div className="flex justify-between items-center pr-1">
                      <span className="font-semibold text-white uppercase text-[9px]">{lang.name}</span>
                      <span className="text-[8.5px] text-gray-300">{lang.level || 'Avanzado'}</span>
                    </div>
                    <div className="w-full bg-gray-600 h-1.5 rounded-full overflow-hidden flex">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: '90%', backgroundColor: accentColor }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* PIE DE PÁGINA COLUMNA IZQUIERDA */}
        <div className="text-[9px] text-gray-400 text-center border-t border-gray-700/60 pt-2 tracking-widest uppercase">
          CVRD.DO — Premium
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COLUMNA DERECHA (CONTENIDO PRINCIPAL - 64% ANCHO)                          */}
      {/* ========================================================================= */}
      <div className="w-[64%] h-full flex flex-col justify-between p-7 bg-white">
        
        <div className="flex flex-col space-y-5">
          
          {/* ENCABEZADO PRINCIPAL (REGLA DE ORO 1: NOMBRE A 53px) */}
          <div className="border-b border-gray-200 pb-3">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '53px' }}>
              <span className="font-black text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] mt-2 text-gray-700">
              {personal?.title || 'Jefe de Innovación / Diseñador'}
            </p>
          </div>

          {/* SECCIÓN: PERFIL PROFESIONAL (REGLA DE ORO 6: JUSTIFICADO) */}
          {profile && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
                <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </span>
                <h3 className="font-bold text-[12px] uppercase tracking-wider text-gray-800">
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
              <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
                <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </span>
                <h3 className="font-bold text-[12px] uppercase tracking-wider text-gray-800">
                  Experiencia Laboral
                </h3>
              </div>
              
              <div className="space-y-3.5">
                {experience.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-12 gap-3 items-start">
                    <div className="col-span-4 text-[9.5px] font-semibold text-gray-500 space-y-0.5">
                      <p className="text-gray-900 font-bold">{exp.startDate} – {exp.endDate}</p>
                      <p className="text-gray-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="col-span-8 space-y-1">
                      <h4 className="font-bold text-gray-900 text-[11px] uppercase tracking-wide">
                        {exp.role}
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-[10px] text-justify whitespace-pre-line font-light">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN: EDUCACIÓN */}
          {education && education.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
                <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </span>
                <h3 className="font-bold text-[12px] uppercase tracking-wider text-gray-800">
                  Educación
                </h3>
              </div>
              
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="grid grid-cols-12 gap-3 items-start">
                    <div className="col-span-4 text-[9.5px] font-semibold text-gray-500 space-y-0.5">
                      <p className="text-gray-900 font-bold">{edu.startDate} – {edu.endDate}</p>
                      <p className="text-gray-600 font-medium">{edu.institution}</p>
                    </div>
                    <div className="col-span-8">
                      <h4 className="font-bold text-gray-900 text-[10.5px]">
                        {edu.degree}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN: REFERENCIAS */}
          {references && references.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
                <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </span>
                <h3 className="font-bold text-[12px] uppercase tracking-wider text-gray-800">
                  Referencias
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5 border-l-2 border-gray-200" style={{ paddingLeft: '10px' }}>
                    <p className="font-bold text-gray-900 text-[10.5px]">{ref.name}</p>
                    <p className="text-gray-600 text-[10px]">{ref.position} {ref.company ? `- ${ref.company}` : ''}</p>
                    {ref.phone && <p className="text-gray-500 text-[9.5px]">Tel: {ref.phone}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* PIE DE PÁGINA COLUMNA DERECHA */}
        <div className="text-right text-[9.5px] text-gray-400 pt-2 border-t border-gray-200 tracking-widest uppercase">
          Template Master Chief Innovator — CVRD.DO
        </div>

      </div>
    </div>
  );
}