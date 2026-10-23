import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterEliteArchitect({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#222222';

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
        {/* 1. CABECERA SUPERIOR CON FOTO ENMARCADA Y DATOS DE CONTACTO               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-6 items-center border-b border-gray-200 pb-5">
          
          {/* FOTO CON RECORTE Y RESPIRACIÓN (140px x 140px) */}
          <div className="col-span-4 flex justify-start items-center relative">
            <div 
              className="absolute -top-4 -left-4 w-12 h-10 z-0"
              style={{ backgroundColor: accentColor }}
            />
            
            {personal?.showPhoto && (
              <div className="relative z-10 pt-1 pl-1">
                <div 
                  className="overflow-hidden shadow-md flex items-center justify-center shrink-0 bg-gray-100 rounded-tr-[35px] rounded-bl-[35px]"
                  style={{ width: '140px', height: '140px', border: `2px solid ${accentColor}` }}
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
            )}
          </div>

          {/* NOMBRE, CARGO Y DATOS DE CONTACTO */}
          <div className="col-span-8 flex flex-col justify-center space-y-3">
            <div>
              <h1 
                className="tracking-tight leading-none uppercase font-bold flex flex-wrap gap-x-3 items-baseline" 
                style={{ fontSize: '53px', color: accentColor }}
              >
                <span className="font-light">{firstName}</span>
                <span className="font-extrabold">{lastName}</span>
              </h1>
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] mt-2 text-gray-600">
                {personal?.title || 'Arquitecto & Diseñador'}
              </p>
              <div className="w-16 h-1 mt-2" style={{ backgroundColor: accentColor }}></div>
            </div>

            {/* DATOS DE CONTACTO A 12px */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-gray-700 font-light items-center pt-1">
              {personal?.phone && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-[14px]" style={{ color: accentColor }}>📞</span>
                  <span className="whitespace-nowrap font-medium">{personal.phone}</span>
                </div>
              )}
              {personal?.email && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-[14px]" style={{ color: accentColor }}>✉️</span>
                  <span className="truncate font-medium" style={{ maxWidth: '210px' }}>{personal.email}</span>
                </div>
              )}
              {personal?.location && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-[14px]" style={{ color: accentColor }}>📍</span>
                  <span className="truncate font-medium" style={{ maxWidth: '190px' }}>{personal.location}</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CUERPO PRINCIPAL DIVIDIDO EN DOS COLUMNAS (OPTIMIZADO)                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-6 my-auto pt-4 pb-2 flex-1 items-stretch">
          
          {/* ================= COLUMNA IZQUIERDA (35% ANCHO) ================= */}
          <div className="col-span-4 flex flex-col space-y-5 pr-2 border-r border-gray-200">
            
            {/* EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-900">
                    Educación
                  </h3>
                </div>
                
                <div className="space-y-3 pl-3 border-l-2 border-gray-200">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <h4 className="font-bold text-gray-900 text-[12px] leading-tight">
                        {edu.degree}
                      </h4>
                      <p className="text-[12px] text-gray-600 font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-[11.5px] font-semibold text-gray-400">
                        {edu.startDate} – {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HABILIDADES */}
            {skills && skills.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-900">
                    Habilidades
                  </h3>
                </div>
                
                <ul className="space-y-2 text-[12px] text-gray-700 pl-3">
                  {skills.map((skill) => (
                    <li key={skill.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }}></span>
                      <span className="font-medium">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* REDES & ENLACES */}
            {(extras?.portfolio || extras?.linkedin) && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-900">
                    Redes & Enlaces
                  </h3>
                </div>
                <div className="space-y-2 text-[12px] text-gray-700 pl-3">
                  {extras?.portfolio && (
                    <div className="space-y-0.5">
                      <p className="font-bold text-gray-900 text-[11.5px]">Portafolio / Web</p>
                      <p className="text-gray-600 truncate font-medium">{extras.portfolio}</p>
                    </div>
                  )}
                  {extras?.linkedin && (
                    <div className="space-y-0.5">
                      <p className="font-bold text-gray-900 text-[11.5px]">LinkedIn</p>
                      <p className="text-gray-600 truncate font-medium">{extras.linkedin}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* IDIOMAS */}
            {languages && languages.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-900">
                    Idiomas
                  </h3>
                </div>
                <div className="space-y-2 text-[12px] text-gray-700 pl-3">
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

          {/* ================= COLUMNA DERECHA PRINCIPAL (65% ANCHO) ================= */}
          <div className="col-span-8 flex flex-col space-y-5 pl-2">
            
            {/* PERFIL PROFESIONAL */}
            {profile && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-bold" style={{ backgroundColor: accentColor }}>
                    👤
                  </span>
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-900">
                    Perfil Profesional
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-normal tracking-wide">
                  {profile}
                </p>
              </div>
            )}

            {/* EXPERIENCIA LABORAL */}
            {experience && experience.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-bold" style={{ backgroundColor: accentColor }}>
                    💼
                  </span>
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-900">
                    Experiencia Laboral
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="space-y-1 relative pl-4 border-l-2 border-gray-200">
                      <span 
                        className="absolute top-1.5 w-2 h-2 rounded-full"
                        style={{ backgroundColor: accentColor, left: '-5px' }}
                      ></span>
                      
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[12px] uppercase tracking-wide">
                          {exp.role}
                        </h4>
                        <span className="text-[11.5px] font-bold text-gray-400">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>
                      
                      <p className="text-[12px] font-semibold text-gray-600 italic">
                        {exp.company}
                      </p>
                      
                      <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-light whitespace-pre-line pt-0.5">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REFERENCIAS */}
            {references && references.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-bold" style={{ backgroundColor: accentColor }}>
                    📜
                  </span>
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-900">
                    Referencias
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {references.map((ref) => (
                    <div key={ref.id} className="space-y-0.5 p-2.5 rounded bg-gray-50 border border-gray-100">
                      <p className="font-bold text-gray-900 text-[12px]">{ref.name}</p>
                      <p className="text-gray-600 text-[12px]">{ref.position} {ref.company ? `- ${ref.company}` : ''}</p>
                      {ref.phone && <p className="text-gray-500 text-[11.5px]">Tel: {ref.phone}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. PIE DE PÁGINA MÍNIMO Y ELEGANTE                                         */}
        {/* ========================================================================= */}
        <div className="w-full pt-3 border-t border-gray-200 flex justify-between items-center text-[11px] text-gray-400 tracking-widest uppercase mt-2">
          <span>Template Master Elite Architect</span>
          <span>CVRD.DO — Edición Exclusiva</span>
        </div>

      </div>
    </div>
  );
}