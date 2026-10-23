import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterCreativeVision({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // DINÁMICO: Conectado directamente al selector de color del editor/builder
  const accentColor = styles?.accentColor || '#e63946'; 
  const darkBg = '#18181b'; // Negro carbón elegante

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex flex-col select-none"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ========================================================================= */}
      {/* 1. ENCABEZADO SUPERIOR DIVIDIDO                                          */}
      {/* ========================================================================= */}
      <div className="flex w-full bg-white shrink-0" style={{ height: '130px' }}>
        
        {/* Lado Izquierdo Oscuro (Soporte para info superior / web / linkedin) */}
        <div 
          className="w-[32%] h-full p-4 flex flex-col justify-center space-y-1.5 border-r border-gray-800 text-white"
          style={{ backgroundColor: darkBg }}
        >
          {extras?.portfolio && (
            <p className="text-[11px] text-gray-300 font-light truncate">
              <span className="font-bold text-white">Web: </span>{extras.portfolio}
            </p>
          )}
          {extras?.linkedin && (
            <p className="text-[11px] text-gray-300 font-light truncate">
              <span className="font-bold text-white">LinkedIn: </span>{extras.linkedin}
            </p>
          )}
        </div>

        {/* Lado Derecho Blanco: NOMBRE (53px) Y CARGO */}
        <div className="w-[68%] h-full pl-8 pr-6 flex flex-col justify-center bg-white border-b border-gray-200">
          <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline uppercase" style={{ fontSize: '53px' }}>
            <span className="font-black text-gray-900">{firstName}</span>
            <span className="font-bold" style={{ color: accentColor }}>{lastName}</span>
          </h1>
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] mt-2 text-gray-600">
            {personal?.title || 'Director de Arte & Diseñador Gráfico'}
          </p>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. CUERPO PRINCIPAL EN DOS COLUMNAS                                       */}
      {/* ========================================================================= */}
      <div className="flex w-full flex-1 overflow-hidden">
        
        {/* ================= COLUMNA IZQUIERDA OSCURA (32% ANCHO) ================= */}
        <div 
          className="w-[32%] h-full flex flex-col justify-between p-5 text-white shrink-0 relative overflow-hidden"
          style={{ backgroundColor: darkBg }}
        >
          <div className="flex flex-col space-y-5">
            
            {/* FOTO DE PERFIL CON RESPIRACIÓN */}
            {personal?.showPhoto && (
              <div className="flex justify-center pt-1 pb-1">
                <div 
                  className="p-1 flex items-center justify-center shrink-0 shadow-xl"
                  style={{ backgroundColor: accentColor, width: '152px', height: '152px' }}
                >
                  <div 
                    className="overflow-hidden bg-gray-700 flex items-center justify-center shrink-0"
                    style={{ width: '144px', height: '144px' }}
                  >
                    {personal?.photoUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img 
                        src={personal.photoUrl} 
                        alt="Perfil" 
                        className="w-full h-full object-cover filter contrast-105" 
                      />
                    ) : (
                      <span className="text-[12px] text-gray-400 font-bold tracking-widest">FOTO</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN: CONTACTO */}
            <div className="space-y-2">
              <div className="border-b pb-1" style={{ borderColor: accentColor }}>
                <h3 className="font-bold text-[12px] uppercase tracking-wider text-white">
                  Contacto
                </h3>
              </div>
              <div className="space-y-2 text-[12px] text-gray-300 font-light">
                {personal?.location && (
                  <div className="space-y-0.5">
                    <p className="font-bold text-white uppercase text-[11px]">Ubicación</p>
                    <p className="wrap-break-word leading-tight">{personal.location}</p>
                  </div>
                )}
                {personal?.phone && (
                  <div className="space-y-0.5">
                    <p className="font-bold text-white uppercase text-[11px]">Teléfono</p>
                    <p>{personal.phone}</p>
                  </div>
                )}
                {personal?.email && (
                  <div className="space-y-0.5">
                    <p className="font-bold text-white uppercase text-[11px]">Correo Electrónico</p>
                    <p className="break-all">{personal.email}</p>
                  </div>
                )}
              </div>
            </div>

            {/* SECCIÓN: HABILIDADES */}
            {skills && skills.length > 0 && (
              <div className="space-y-2">
                <div className="border-b pb-1" style={{ borderColor: accentColor }}>
                  <h3 className="font-bold text-[12px] uppercase tracking-wider text-white">
                    Habilidades
                  </h3>
                </div>
                <div className="space-y-2 text-[12px]">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex justify-between items-center text-gray-300 font-light border-b border-gray-800/60 pb-1">
                      <span className="uppercase text-[12px] tracking-wide font-medium text-white">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN: IDIOMAS */}
            {languages && languages.length > 0 && (
              <div className="space-y-2">
                <div className="border-b pb-1" style={{ borderColor: accentColor }}>
                  <h3 className="font-bold text-[12px] uppercase tracking-wider text-white">
                    Idiomas
                  </h3>
                </div>
                <div className="space-y-2 text-[12px]">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center text-gray-300 font-light">
                      <span className="uppercase text-[12px] font-semibold text-white">{lang.name}</span>
                      <span className="text-[11.5px]" style={{ color: accentColor }}>{lang.level || 'Fluido'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* PIE DE PÁGINA COLUMNA IZQUIERDA */}
          <div className="text-[11px] text-gray-500 text-center border-t border-gray-800 pt-2 tracking-widest uppercase">
            CVRD.DO — Edición Global
          </div>
        </div>

        {/* ================= COLUMNA DERECHA BLANCA (68% ANCHO) ================= */}
        <div className="w-[68%] h-full flex flex-col justify-between p-6 bg-white overflow-y-auto">
          
          <div className="flex flex-col space-y-4">
            
            {/* SECCIÓN: PERFIL PROFESIONAL */}
            {profile && (
              <div className="space-y-1">
                <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-normal border-b border-gray-200 pb-3">
                  {profile}
                </p>
              </div>
            )}

            {/* SECCIÓN: EXPERIENCIA LABORAL */}
            {experience && experience.length > 0 && (
              <div className="space-y-2">
                <div className="border-b-2 border-gray-900 pb-1">
                  <h3 className="font-bold text-[13px] uppercase tracking-wider text-gray-900">
                    Experiencia Laboral
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative space-y-1" style={{ paddingLeft: '16px' }}>
                      <span 
                        className="absolute top-0 bottom-0 border-l-2 border-dotted border-gray-300"
                        style={{ left: '3px' }}
                      ></span>
                      <span 
                        className="absolute top-1 w-2.5 h-2.5 rounded-full border-2 border-white shadow-xs"
                        style={{ backgroundColor: accentColor, left: '-2px' }}
                      ></span>
                      
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-gray-500">{exp.startDate} – {exp.endDate}</span>
                        <h4 className="font-bold text-gray-900 text-[12px] tracking-wide uppercase">
                          {exp.role}
                        </h4>
                        <p className="text-[12px] font-semibold text-gray-600">{exp.company}</p>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed text-[12px] text-justify whitespace-pre-line font-light pt-0.5">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN: EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-2">
                <div className="border-b-2 border-gray-900 pb-1">
                  <h3 className="font-bold text-[13px] uppercase tracking-wider text-gray-900">
                    Educación
                  </h3>
                </div>
                
                <div className="space-y-2.5">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative space-y-0.5" style={{ paddingLeft: '16px' }}>
                      <span 
                        className="absolute top-0 bottom-0 border-l-2 border-dotted border-gray-300"
                        style={{ left: '3px' }}
                      ></span>
                      <span 
                        className="absolute top-1 w-2.5 h-2.5 rounded-full border-2 border-white shadow-xs"
                        style={{ backgroundColor: accentColor, left: '-2px' }}
                      ></span>

                      <span className="text-[11px] font-bold text-gray-500">{edu.startDate} – {edu.endDate}</span>
                      <h4 className="font-bold text-gray-900 text-[12px] uppercase">
                        {edu.degree}
                      </h4>
                      <p className="text-gray-600 text-[12px] font-medium">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN: REFERENCIAS */}
            {references && references.length > 0 && (
              <div className="space-y-2">
                <div className="border-b-2 border-gray-900 pb-1">
                  <h3 className="font-bold text-[13px] uppercase tracking-wider text-gray-900">
                    Referencias
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {references.map((ref) => (
                    <div key={ref.id} className="space-y-0.5 border-l-2 border-gray-200" style={{ paddingLeft: '10px' }}>
                      <p className="font-bold text-gray-900 text-[12px]">{ref.name}</p>
                      <p className="text-gray-600 text-[12px]">{ref.position} {ref.company ? `- ${ref.company}` : ''}</p>
                      {ref.phone && <p className="text-gray-500 text-[11.5px]">Tel: {ref.phone}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* PIE DE PÁGINA COLUMNA DERECHA */}
          <div className="text-right text-[11px] text-gray-400 pt-2 border-t border-gray-200 tracking-widest uppercase">
            Template Master Creative Vision — CVRD.DO
          </div>

        </div>

      </div>
    </div>
  );
}