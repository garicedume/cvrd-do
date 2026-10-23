import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterCsuiteSignature({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#b2965a'; 
  const darkFooterBg = '#222224';

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex flex-col justify-between select-none"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div className="flex flex-col h-full p-6 box-border justify-between relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. ENCABEZADO SUPERIOR PERFECTAMENTE ALINEADO Y ESTRUCTURADO              */}
        {/* ========================================================================= */}
        <div 
          className="w-full border-2 p-4 px-6 grid grid-cols-12 gap-4 items-center rounded-sm relative box-border"
          style={{ borderColor: accentColor, minHeight: '170px' }}
        >
          {/* FOTO CIRCULAR (140px x 140px) */}
          <div className="col-span-3 flex justify-start items-center">
            {personal?.showPhoto && (
              <div 
                className="rounded-full overflow-hidden border-2 shadow-sm flex items-center justify-center shrink-0 bg-gray-100"
                style={{ width: '140px', height: '140px', borderColor: accentColor }}
              >
                {personal?.photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={personal.photoUrl} 
                    alt="Perfil" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <span className="text-[12px] text-gray-400 font-bold tracking-widest">FOTO</span>
                )}
              </div>
            )}
          </div>

          {/* NOMBRE Y CARGO */}
          <div className="col-span-5 flex flex-col justify-center pl-2">
            <h1 
              className="tracking-tight leading-none uppercase font-bold flex flex-col justify-center" 
              style={{ fontSize: '53px', color: accentColor }}
            >
              <span className="block leading-none">{firstName}</span>
              {lastName && <span className="block font-light leading-none mt-1">{lastName}</span>}
            </h1>
            <p className="text-[13px] font-bold uppercase tracking-[0.2em] mt-2 text-gray-600">
              {personal?.title || 'Ejecutivo C-Suite'}
            </p>
          </div>

          {/* CONTACTO RÁPIDO */}
          <div className="col-span-4 flex flex-col justify-center items-end space-y-1.5 text-[12px] text-gray-600 font-light pl-2">
            {personal?.phone && (
              <div className="flex items-center justify-end gap-2 w-full">
                <span className="whitespace-nowrap font-medium">{personal.phone}</span>
                <span className="font-bold text-[14px] shrink-0" style={{ color: accentColor }}>📞</span>
              </div>
            )}
            {personal?.email && (
              <div className="flex items-center justify-end gap-2 w-full">
                <span className="truncate text-right font-medium" style={{ maxWidth: '210px' }}>{personal.email}</span>
                <span className="font-bold text-[14px] shrink-0" style={{ color: accentColor }}>✉️</span>
              </div>
            )}
            {personal?.location && (
              <div className="flex items-center justify-end gap-2 w-full">
                <span className="truncate text-right font-medium" style={{ maxWidth: '210px' }}>{personal.location}</span>
                <span className="font-bold text-[14px] shrink-0" style={{ color: accentColor }}>📍</span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CUERPO PRINCIPAL DIVIDIDO EN DOS COLUMNAS (OPTIMIZADO)                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-6 my-auto pt-3 pb-2 flex-1 items-stretch">
          
          {/* ================= COLUMNA IZQUIERDA (60% ANCHO) ================= */}
          <div className="col-span-7 flex flex-col space-y-4 pr-1">
            
            {/* EXPERIENCIA LABORAL */}
            {experience && experience.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-800 border-b border-gray-200 pb-1">
                  Experiencia Laboral
                </h3>
                
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div key={exp.id} className="grid grid-cols-12 gap-3 items-start">
                      <div className="col-span-4 text-[12px] font-semibold text-gray-500 pt-0.5">
                        {exp.startDate} – {exp.endDate}
                      </div>

                      <div className="col-span-8 relative space-y-0.5 border-l border-gray-200 pl-3">
                        <span 
                          className="absolute top-1.5 w-2 h-2 rounded-full border border-white shadow-xs"
                          style={{ backgroundColor: accentColor, left: '-4.5px' }}
                        ></span>
                        <h4 className="font-bold text-gray-800 text-[12px] uppercase tracking-wide">
                          {exp.role}
                        </h4>
                        <p className="text-[12px] font-bold tracking-wide" style={{ color: accentColor }}>
                          {exp.company}
                        </p>
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
              <div className="space-y-2">
                <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-800 border-b border-gray-200 pb-1">
                  Educación
                </h3>
                
                <div className="space-y-2.5">
                  {education.map((edu) => (
                    <div key={edu.id} className="grid grid-cols-12 gap-3 items-start">
                      <div className="col-span-4 text-[12px] font-semibold text-gray-500 pt-0.5">
                        {edu.startDate} – {edu.endDate}
                      </div>
                      <div className="col-span-8 relative space-y-0.5 border-l border-gray-200 pl-3">
                        <span 
                          className="absolute top-1.5 w-2 h-2 rounded-full border border-white shadow-xs"
                          style={{ backgroundColor: accentColor, left: '-4.5px' }}
                        ></span>
                        <h4 className="font-bold text-gray-800 text-[12px]">
                          {edu.degree}
                        </h4>
                        <p className="text-[12px] font-bold" style={{ color: accentColor }}>
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IDIOMAS */}
            {languages && languages.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-800 border-b border-gray-200 pb-1">
                  Idiomas
                </h3>
                <div className="grid grid-cols-2 gap-3 text-[12px] text-gray-700">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center border-b border-gray-100 pb-1">
                      <span className="font-bold text-gray-800">{lang.name}</span>
                      <span className="text-[12px] text-gray-500">{lang.level || 'Avanzado'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ================= COLUMNA DERECHA (40% ANCHO) ================= */}
          <div 
            className="col-span-5 p-5 text-white flex flex-col justify-between rounded-sm shadow-md space-y-4"
            style={{ backgroundColor: accentColor }}
          >
            <div className="space-y-4">
              
              {/* SOBRE MÍ */}
              {profile && (
                <div className="space-y-1.5">
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-white border-b border-white/40 pb-1">
                    Sobre Mí
                  </h3>
                  <p className="text-white/95 leading-relaxed text-[12px] text-justify font-normal tracking-wide">
                    {profile}
                  </p>
                </div>
              )}

              {/* HABILIDADES */}
              {skills && skills.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-white border-b border-white/40 pb-1">
                    Habilidades
                  </h3>
                  <div className="space-y-2 text-[12px]">
                    {skills.map((skill) => (
                      <div key={skill.id} className="space-y-1">
                        <div className="flex justify-between items-center font-semibold text-white text-[12px]">
                          <span>{skill.name}</span>
                        </div>
                        <div className="w-full bg-black/20 h-2 rounded-full p-0.5 overflow-hidden border border-black/30">
                          <div 
                            className="h-full bg-black/80 rounded-full shadow-inner"
                            style={{ width: '85%' }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REFERENCIAS */}
              {references && references.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-white border-b border-white/40 pb-1">
                    Referencias
                  </h3>
                  <div className="space-y-2.5 text-[12px] text-white/90">
                    {references.map((ref) => (
                      <div key={ref.id} className="space-y-0.5 border-l-2 border-white/50 pl-2.5">
                        <p className="font-bold text-white text-[12px]">{ref.name}</p>
                        <p className="text-white/80 text-[12px]">{ref.position} {ref.company ? `- ${ref.company}` : ''}</p>
                        {ref.phone && <p className="text-white/90 text-[11.5px]">Tel: {ref.phone}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <div className="text-[10px] text-white/70 text-center tracking-widest uppercase pt-2 border-t border-white/20">
              Ejecutivo C-Suite
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. BLOQUE PIE DE PÁGINA OSCURO                                             */}
        {/* ========================================================================= */}
        <div 
          className="w-full rounded-sm p-3 px-5 text-white flex justify-between items-center text-[11px] mt-2"
          style={{ backgroundColor: darkFooterBg }}
        >
          <div className="flex items-center gap-4 font-light text-gray-300">
            {personal?.location && (
              <span className="flex items-center gap-1">
                <span style={{ color: accentColor }}>📍</span> {personal.location}
              </span>
            )}
            {extras?.portfolio && (
              <span className="flex items-center gap-1">
                <span style={{ color: accentColor }}>🌐</span> {extras.portfolio}
              </span>
            )}
          </div>

          <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
            Template Master C-Suite Signature — CVRD.DO
          </div>
        </div>

      </div>
    </div>
  );
}