import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterEnterpriseLead({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // REGLA DE ORO 7 Y 8: Tono verde menta/salvia pastel suave de la muestra
  const accentColor = styles?.accentColor || '#a3c1ad'; 
  const darkText = '#2b2b2b';

  return (
    <div 
      className="relative bg-[#f4f5f6] shadow-2xl overflow-hidden box-border text-gray-800 flex flex-col justify-between select-none"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div className="flex flex-col h-full p-8 box-border justify-between relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. ENCABEZADO SUPERIOR (NOMBRE A 53px Y FOTO A 150px)                     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-6 items-center pb-3 border-b border-gray-300/60">
          
          {/* NOMBRE Y TÍTULO (COLUMNA 8) - REGLA DE ORO 1: NOMBRE A 53px */}
          <div className="col-span-8 flex flex-col justify-center space-y-2 pr-4">
            <h1 
              className="tracking-tight leading-none uppercase font-extrabold flex flex-wrap gap-x-3 items-baseline" 
              style={{ fontSize: '53px', color: darkText }}
            >
              <span>{firstName}</span>
              <span className="font-light">{lastName}</span>
            </h1>
            
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-gray-500">
              {personal?.title || 'Líder Empresarial / Directiva'}
            </p>

            {/* PÍLDORA DE REDES / PORTAFOLIO SI EXISTE */}
            {(extras?.portfolio || extras?.linkedin) && (
              <div 
                className="inline-flex items-center gap-3 px-3 py-1 rounded text-[10px] text-gray-700 font-medium w-max mt-1"
                style={{ backgroundColor: accentColor }}
              >
                {extras?.portfolio && <span>🌐 {extras.portfolio}</span>}
                {extras?.linkedin && <span>💼 {extras.linkedin}</span>}
              </div>
            )}
          </div>

          {/* FOTO CIRCULAR (COLUMNA 4) - REGLA DE ORO 3, 5 Y 9: 150px x 150px */}
          <div className="col-span-4 flex justify-end items-center">
            {personal?.showPhoto && (
              <div 
                className="rounded-full overflow-hidden border-4 shadow-md flex items-center justify-center shrink-0 bg-white"
                style={{ width: '150px', height: '150px', borderColor: accentColor }}
              >
                {personal?.photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={personal.photoUrl} 
                    alt="Perfil" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <span className="text-[10px] text-gray-400 font-bold tracking-widest">FOTO</span>
                )}
              </div>
            )}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. PERFIL PROFESIONAL & DATOS DE CONTACTO EN BLOQUE TIPO "STATEMENT"       */}
        {/* ========================================================================= */}
        <div className="flex border border-gray-200 bg-white rounded-sm shadow-xs overflow-hidden my-1.5">
          
          {/* Etiqueta Lateral Vertical */}
          <div 
            className="w-12 shrink-0 flex items-center justify-center font-bold text-[11px] uppercase tracking-[0.25em] text-gray-800"
            style={{ backgroundColor: accentColor, writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
          >
            Perfil
          </div>

          <div className="grid grid-cols-12 gap-4 p-3.5 flex-1 items-center">
            
            {/* Texto del perfil (REGLA DE ORO 6: JUSTIFICADO) */}
            <div className="col-span-7 border-r border-gray-200 pr-4">
              <p className="text-gray-700 leading-relaxed text-[10.5px] text-justify font-normal">
                {profile || 'Profesional altamente enfocada en resultados, con sólida trayectoria en la dirección estratégica, gestión de equipos multidisciplinarios y optimización de procesos clave dentro del sector corporativo.'}
              </p>
            </div>

            {/* Datos de contacto (TEXTO A 12px E ÍCONOS A 14px - REGLA DE ORO 2: EN ESPAÑOL) */}
            <div className="col-span-5 pl-2 space-y-1.5 text-[12px] text-gray-700 font-light">
              {personal?.location && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] shrink-0" style={{ color: darkText }}>📍</span>
                  <span className="truncate" style={{ maxWidth: '200px' }}>{personal.location}</span>
                </div>
              )}
              {personal?.email && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] shrink-0" style={{ color: darkText }}>✉️</span>
                  <span className="truncate" style={{ maxWidth: '200px' }}>{personal.email}</span>
                </div>
              )}
              {personal?.phone && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] shrink-0" style={{ color: darkText }}>📞</span>
                  <span className="whitespace-nowrap">{personal.phone}</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. EXPERIENCIA LABORAL                                                    */}
        {/* ========================================================================= */}
        {experience && experience.length > 0 && (
          <div className="flex border border-gray-200 bg-white rounded-sm shadow-xs overflow-hidden my-1.5 flex-1">
            
            {/* Etiqueta Lateral Vertical */}
            <div 
              className="w-12 shrink-0 flex items-center justify-center font-bold text-[11px] uppercase tracking-[0.25em] text-gray-800"
              style={{ backgroundColor: accentColor, writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
            >
              Experiencia
            </div>

            <div className="p-3.5 flex-1 space-y-3 overflow-hidden">
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-12 gap-4 items-start border-b border-gray-100 pb-2.5 last:border-0 last:pb-0">
                  
                  {/* Empresa y Fecha a la izquierda */}
                  <div className="col-span-4 space-y-0.5">
                    <p className="font-bold text-gray-900 text-[11px] uppercase">{exp.company}</p>
                    <p className="text-[9.5px] font-semibold text-gray-400">{exp.startDate} – {exp.endDate}</p>
                  </div>

                  {/* Detalle del Cargo y Descripción */}
                  <div className="col-span-8 space-y-1 relative pl-3 border-l-2 border-gray-200">
                    <span 
                      className="absolute top-1.5 w-2 h-2 rounded-full"
                      style={{ backgroundColor: darkText, left: '-5px' }}
                    ></span>
                    <h4 className="font-bold text-gray-900 text-[11px] uppercase tracking-wide">
                      {exp.role}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-[10px] text-justify font-light whitespace-pre-line pt-0.5">
                      {exp.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. EDUCACIÓN EN BLOQUE                                                    */}
        {/* ========================================================================= */}
        {education && education.length > 0 && (
          <div className="flex border border-gray-200 bg-white rounded-sm shadow-xs overflow-hidden my-1.5">
            
            {/* Etiqueta Lateral Vertical */}
            <div 
              className="w-12 shrink-0 flex items-center justify-center font-bold text-[11px] uppercase tracking-[0.25em] text-gray-800"
              style={{ backgroundColor: accentColor, writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
            >
              Educación
            </div>

            <div className="p-3.5 flex-1 grid grid-cols-2 gap-4 items-start">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5 border-l-2 border-gray-200 pl-3 relative">
                  <span 
                    className="absolute top-1.5 w-2 h-2 rounded-full"
                    style={{ backgroundColor: darkText, left: '-5px' }}
                  ></span>
                  <p className="font-bold text-gray-900 text-[11px] uppercase">{edu.degree}</p>
                  <p className="text-[10px] text-gray-600 font-medium">{edu.institution}</p>
                  <p className="text-[9.5px] font-semibold text-gray-400">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. HABILIDADES, IDIOMAS Y REFERENCIAS                                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-3 my-1.5">
          
          {/* Habilidades (Columna 7) */}
          {skills && skills.length > 0 && (
            <div className="col-span-7 flex border border-gray-200 bg-white rounded-sm shadow-xs overflow-hidden">
              <div 
                className="w-10 shrink-0 flex items-center justify-center font-bold text-[10px] uppercase tracking-[0.2em] text-gray-800"
                style={{ backgroundColor: accentColor, writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
              >
                Habilidades
              </div>
              <div className="p-3 flex-1 grid grid-cols-1 gap-1.5">
                {skills.slice(0, 3).map((skill) => (
                  <div key={skill.id} className="space-y-0.5">
                    <div className="flex justify-between items-center text-[9.5px] font-bold text-gray-800 uppercase">
                      <span>{skill.name}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden flex">
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

          {/* Idiomas & Referencias (Columna 5) */}
          <div className="col-span-5 flex border border-gray-200 bg-white rounded-sm shadow-xs overflow-hidden">
            <div 
              className="w-10 shrink-0 flex items-center justify-center font-bold text-[10px] uppercase tracking-[0.2em] text-gray-800"
              style={{ backgroundColor: accentColor, writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
            >
              Extras
            </div>
            <div className="p-3 flex-1 flex flex-col justify-center space-y-2 text-[9.5px]">
              {languages && languages.length > 0 && (
                <div>
                  <p className="font-bold text-gray-900 uppercase border-b border-gray-100 pb-0.5 mb-1">Idiomas</p>
                  <div className="space-y-0.5 text-gray-600">
                    {languages.map((lang) => (
                      <div key={lang.id} className="flex justify-between">
                        <span>{lang.name}</span>
                        <span className="font-semibold" style={{ color: darkText }}>{lang.level || 'Avanzado'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {references && references.length > 0 && (
                <div>
                  <p className="font-bold text-gray-900 uppercase border-b border-gray-100 pb-0.5 mb-1">Referencias</p>
                  <div className="space-y-0.5 text-gray-600">
                    {references.slice(0, 1).map((ref) => (
                      <div key={ref.id}>
                        <p className="font-semibold text-gray-800">{ref.name}</p>
                        <p className="text-[9px]">{ref.position} - Tel: {ref.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 6. PIE DE PÁGINA MÍNIMO                                                   */}
        {/* ========================================================================= */}
        <div className="w-full pt-2 border-t border-gray-300/60 flex justify-between items-center text-[9.5px] text-gray-400 tracking-widest uppercase mt-1">
          <span>Template Master Enterprise Lead</span>
          <span>CVRD.DO — Exclusive Edition</span>
        </div>

      </div>
    </div>
  );
}