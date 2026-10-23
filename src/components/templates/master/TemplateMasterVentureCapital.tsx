import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterVentureCapital({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const photoShapeClass = 
    personal?.photoShape === 'circle' ? 'rounded-full' :
    personal?.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-none';

  const accentColor = styles?.accentColor || '#b0bcc6'; 
  const darkTextColor = '#2d3748';
  const pageBg = '#f4f6f8';

  return (
    <div 
      className="relative shadow-2xl overflow-hidden box-border text-gray-800 flex flex-col justify-between select-none"
      style={{
        width: '816px',
        height: '1056px',
        backgroundColor: pageBg,
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div className="flex flex-col h-full p-6 box-border justify-between relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. ENCABEZADO SUPERIOR                                                    */}
        {/* ========================================================================= */}
        <div className="w-full grid grid-cols-12 gap-6 items-center pt-1 pb-4 px-3">
          
          <div className="col-span-7 flex flex-col justify-center pr-4">
            <h1 
              className="tracking-tight leading-none uppercase font-extrabold flex flex-wrap gap-x-3 items-baseline" 
              style={{ fontSize: '53px', color: darkTextColor }}
            >
              <span>{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>

            <p className="text-[13px] font-bold uppercase tracking-[0.2em] mt-2 text-gray-500">
              {personal?.title || 'Diseñador Visual / Director Creativo'}
            </p>

            <div 
              className="w-20 h-1 mt-2 rounded-full" 
              style={{ backgroundColor: accentColor }}
            />
          </div>

          <div className="col-span-5 flex justify-end items-center pl-2">
            {personal?.showPhoto && (
              <div 
                className={`overflow-hidden border-4 border-white shadow-lg flex items-center justify-center shrink-0 bg-gray-200 ${photoShapeClass}`}
                style={{ width: '140px', height: '140px' }}
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
            )}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. CUERPO PRINCIPAL EN TARJETA BLANCA                                     */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200/80 p-5 flex-1 flex flex-col justify-between my-auto">
          
          <div className="grid grid-cols-12 gap-6 flex-1 items-stretch">
            
            {/* ================= COLUMNA IZQUIERDA (60% ANCHO) ================= */}
            <div className="col-span-7 flex flex-col space-y-4 pr-2 border-r border-gray-100">
              
              {/* PERFIL PROFESIONAL */}
              {profile && (
                <div className="space-y-1.5">
                  <div 
                    className="inline-block px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-gray-800 rounded-xs shadow-2xs"
                    style={{ backgroundColor: accentColor }}
                  >
                    Perfil Profesional
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-normal">
                    {profile}
                  </p>
                </div>
              )}

              {/* EXPERIENCIA LABORAL */}
              {experience && experience.length > 0 && (
                <div className="space-y-2.5">
                  <div 
                    className="inline-block px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-gray-800 rounded-xs shadow-2xs"
                    style={{ backgroundColor: accentColor }}
                  >
                    Experiencia Laboral
                  </div>

                  <div className="space-y-3 pt-1">
                    {experience.map((exp) => (
                      <div key={exp.id} className="grid grid-cols-12 gap-3 items-start">
                        
                        <div className="col-span-4 space-y-0.5">
                          <p className="text-[11px] font-bold text-gray-800">
                            {exp.startDate} – {exp.endDate}
                          </p>
                          <p className="text-[11.5px] font-bold text-gray-600 truncate">
                            {exp.company}
                          </p>
                        </div>

                        <div className="col-span-8 space-y-1 border-l-2 border-gray-200 pl-3">
                          <h4 className="font-bold text-gray-900 text-[12px] uppercase tracking-wide">
                            {exp.role}
                          </h4>
                          <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-light whitespace-pre-line pt-0.5">
                            {exp.description}
                          </p>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EDUCACIÓN */}
              {education && education.length > 0 && (
                <div className="space-y-2.5">
                  <div 
                    className="inline-block px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-gray-800 rounded-xs shadow-2xs"
                    style={{ backgroundColor: accentColor }}
                  >
                    Educación
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {education.map((edu) => (
                      <div key={edu.id} className="grid grid-cols-12 gap-3 items-start">
                        
                        <div className="col-span-4 space-y-0.5">
                          <p className="text-[11px] font-bold text-gray-800">
                            {edu.startDate} – {edu.endDate}
                          </p>
                          <p className="text-[11.5px] text-gray-600 font-medium truncate">
                            {edu.institution}
                          </p>
                        </div>

                        <div className="col-span-8 space-y-0.5 border-l-2 border-gray-200 pl-3">
                          <h4 className="font-bold text-gray-900 text-[12px] uppercase leading-tight">
                            {edu.degree}
                          </h4>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* ================= COLUMNA DERECHA (40% ANCHO) ================= */}
            <div className="col-span-5 flex flex-col justify-between space-y-4 pl-2">
              
              <div className="space-y-4">
                
                {/* CONTACTO (A 12px) */}
                <div className="space-y-2">
                  <div 
                    className="inline-block px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-gray-800 rounded-xs shadow-2xs"
                    style={{ backgroundColor: accentColor }}
                  >
                    Contacto
                  </div>

                  <div className="space-y-2 text-[12px] text-gray-700 font-light pt-1">
                    {personal?.location && (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] shrink-0" style={{ color: darkTextColor }}>📍</span>
                        <span className="truncate font-medium" style={{ maxWidth: '180px' }}>{personal.location}</span>
                      </div>
                    )}
                    {personal?.phone && (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] shrink-0" style={{ color: darkTextColor }}>📞</span>
                        <span className="whitespace-nowrap font-medium">{personal.phone}</span>
                      </div>
                    )}
                    {personal?.email && (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] shrink-0" style={{ color: darkTextColor }}>✉️</span>
                        <span className="truncate font-medium" style={{ maxWidth: '180px' }}>{personal.email}</span>
                      </div>
                    )}
                    {extras?.portfolio && (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] shrink-0" style={{ color: darkTextColor }}>🌐</span>
                        <span className="truncate font-medium" style={{ maxWidth: '180px' }}>{extras.portfolio}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* HABILIDADES */}
                {skills && skills.length > 0 && (
                  <div className="space-y-2">
                    <div 
                      className="inline-block px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-gray-800 rounded-xs shadow-2xs"
                      style={{ backgroundColor: accentColor }}
                    >
                      Habilidades
                    </div>

                    <div className="space-y-2 text-[12px]">
                      {skills.map((skill) => (
                        <div key={skill.id} className="space-y-1">
                          <div className="flex justify-between font-bold text-gray-800 uppercase text-[12px]">
                            <span>{skill.name}</span>
                          </div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-xs overflow-hidden border border-gray-200">
                            <div 
                              className="h-full rounded-xs" 
                              style={{ width: '85%', backgroundColor: accentColor }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* IDIOMAS */}
                {languages && languages.length > 0 && (
                  <div className="space-y-2">
                    <div 
                      className="inline-block px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-gray-800 rounded-xs shadow-2xs"
                      style={{ backgroundColor: accentColor }}
                    >
                      Idiomas
                    </div>

                    <div className="space-y-1.5 text-[12px] text-gray-700">
                      {languages.map((lang) => (
                        <div key={lang.id} className="flex justify-between items-center border-b border-gray-100 pb-0.5">
                          <span className="font-bold text-gray-800 uppercase">{lang.name}</span>
                          <span className="text-[11.5px] text-gray-500">{lang.level || 'Avanzado'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* REFERENCIAS */}
                {references && references.length > 0 && (
                  <div className="space-y-2">
                    <div 
                      className="inline-block px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-gray-800 rounded-xs shadow-2xs"
                      style={{ backgroundColor: accentColor }}
                    >
                      Referencias
                    </div>

                    <div className="space-y-2 text-[12px]">
                      {references.slice(0, 2).map((ref) => (
                        <div key={ref.id} className="space-y-0.5 border-l-2 pl-2" style={{ borderColor: accentColor }}>
                          <p className="font-bold text-gray-900">{ref.name}</p>
                          <p className="text-gray-600">{ref.position} {ref.company ? `- ${ref.company}` : ''}</p>
                          {ref.phone && <p className="text-gray-500 text-[11.5px]">Tel: {ref.phone}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {extras?.linkedin && (
                <div className="pt-2 border-t border-gray-200 text-[12px]">
                  <p className="font-bold text-gray-800">
                    LinkedIn: <span className="font-normal text-gray-600 truncate">{extras.linkedin}</span>
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. PIE DE PÁGINA MÍNIMO                                                   */}
        {/* ========================================================================= */}
        <div className="w-full pt-2 border-t border-gray-200 flex justify-between items-center text-[11px] text-gray-400 tracking-widest uppercase mt-1">
          <span>Template Master Venture Capital</span>
          <span>CVRD.DO — Edición Exclusiva</span>
        </div>

      </div>
    </div>
  );
}