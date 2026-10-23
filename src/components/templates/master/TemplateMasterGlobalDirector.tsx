import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterGlobalDirector({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#333333';
  const sidebarBg = '#f1f3f5';

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex flex-col justify-between select-none"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Playfair Display, Georgia, serif'
      }}
    >
      <div className="flex flex-col h-full p-6 box-border justify-between relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. ENCABEZADO SUPERIOR DIVIDIDO                                          */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-6 items-center border-b border-gray-300 pb-4">
          
          <div className="col-span-8 flex flex-col justify-center">
            <h1 
              className="tracking-tight leading-none uppercase font-black flex flex-wrap gap-x-3 items-baseline" 
              style={{ fontSize: '53px', color: accentColor }}
            >
              <span>{firstName}</span>
              <span className="font-light">{lastName}</span>
            </h1>
            <p className="text-[13px] font-bold uppercase tracking-[0.2em] mt-2 text-gray-600 font-sans">
              {personal?.title || 'Director Global / Diseñador Web'}
            </p>
          </div>

          <div className="col-span-4 border-l border-gray-300 pl-4 space-y-1.5 text-[12px] text-gray-700 font-sans font-light">
            {personal?.phone && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px]" style={{ color: accentColor }}>📞</span>
                <span className="whitespace-nowrap font-medium">{personal.phone}</span>
              </div>
            )}
            {personal?.email && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px]" style={{ color: accentColor }}>✉️</span>
                <span className="truncate font-medium" style={{ maxWidth: '210px' }}>{personal.email}</span>
              </div>
            )}
            {personal?.location && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px]" style={{ color: accentColor }}>📍</span>
                <span className="truncate font-medium" style={{ maxWidth: '210px' }}>{personal.location}</span>
              </div>
            )}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. CUERPO PRINCIPAL (2 COLUMNAS OPTIMIZADO)                              */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-6 my-auto pt-3 pb-2 flex-1 items-stretch">
          
          {/* ================= COLUMNA IZQUIERDA (35% ANCHO) ================= */}
          <div 
            className="col-span-4 p-4 flex flex-col justify-between space-y-4 rounded-sm"
            style={{ backgroundColor: sidebarBg }}
          >
            <div className="space-y-4">
              
              {/* FOTO FLOTANTE (140px x 140px) */}
              {personal?.showPhoto && (
                <div className="flex justify-center pt-1">
                  <div 
                    className="overflow-hidden shadow-lg flex items-center justify-center shrink-0 bg-white border-4 border-white rounded-sm"
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
                      <span className="text-[12px] text-gray-400 font-bold tracking-widest font-sans">FOTO</span>
                    )}
                  </div>
                </div>
              )}

              {/* EDUCACIÓN */}
              {education && education.length > 0 && (
                <div className="space-y-2 font-sans">
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-900 border-b border-gray-300 pb-1">
                    Educación
                  </h3>
                  <div className="space-y-2.5">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-0.5">
                        <p className="text-[11px] font-bold text-gray-500">{edu.startDate} – {edu.endDate}</p>
                        <p className="font-bold text-gray-900 text-[12px] leading-tight">{edu.degree}</p>
                        <p className="text-[12px] text-gray-600 font-medium">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ENLACES */}
              {(extras?.portfolio || extras?.linkedin) && (
                <div className="space-y-2 font-sans pt-1">
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-900 border-b border-gray-300 pb-1">
                    Enlaces
                  </h3>
                  <div className="space-y-1 text-[12px] text-gray-700">
                    {extras?.portfolio && <p className="truncate font-medium"><span className="font-bold">Web:</span> {extras.portfolio}</p>}
                    {extras?.linkedin && <p className="truncate font-medium"><span className="font-bold">LinkedIn:</span> {extras.linkedin}</p>}
                  </div>
                </div>
              )}

              {/* REFERENCIAS */}
              {references && references.length > 0 && (
                <div className="space-y-2 font-sans pt-1">
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-900 border-b border-gray-300 pb-1">
                    Referencias
                  </h3>
                  <div className="space-y-2 text-[12px]">
                    {references.map((ref) => (
                      <div key={ref.id} className="space-y-0.5">
                        <p className="font-bold text-gray-900 text-[12px]">{ref.name}</p>
                        <p className="text-gray-600 text-[12px]">{ref.position} {ref.company ? `- ${ref.company}` : ''}</p>
                        {ref.phone && <p className="text-gray-500 text-[11.5px]">Tel: {ref.phone}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <div className="text-[10px] text-gray-400 text-center tracking-widest uppercase font-sans pt-2 border-t border-gray-300">
              Edición Global
            </div>
          </div>

          {/* ================= COLUMNA DERECHA PRINCIPAL (65% ANCHO) ================= */}
          <div className="col-span-8 flex flex-col justify-between space-y-4 pl-2">
            
            <div className="space-y-4">
              
              {/* PERFIL PROFESIONAL */}
              {profile && (
                <div className="space-y-1.5 font-sans">
                  <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-normal border-b border-gray-200 pb-3">
                    {profile}
                  </p>
                </div>
              )}

              {/* EXPERIENCIA LABORAL */}
              {experience && experience.length > 0 && (
                <div className="space-y-3 font-sans">
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.15em] text-gray-900 border-b border-gray-300 pb-1">
                    Experiencia Laboral
                  </h3>
                  
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-bold text-gray-900 text-[12px] uppercase tracking-wide">
                            {exp.role}
                          </h4>
                          <span className="text-[11.5px] font-bold text-gray-400">
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>
                        <p className="text-[12px] font-bold tracking-wide italic" style={{ color: accentColor }}>
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

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. SECCIÓN INFERIOR DE 2 COLUMNAS (HABILIDADES E IDIOMAS A 12px)          */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 gap-6 pt-3 border-t border-gray-300 font-sans my-1">
          
          {/* Habilidades */}
          <div className="space-y-2">
            <h3 className="font-bold text-[13px] uppercase tracking-wider text-gray-900">
              Habilidades
            </h3>
            {skills && skills.length > 0 && (
              <div className="space-y-2 text-[12px]">
                {skills.slice(0, 4).map((skill) => (
                  <div key={skill.id} className="space-y-0.5">
                    <span className="font-semibold text-gray-800">{skill.name}</span>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Idiomas */}
          <div className="space-y-2">
            <h3 className="font-bold text-[13px] uppercase tracking-wider text-gray-900">
              Idiomas
            </h3>
            {languages && languages.length > 0 && (
              <div className="space-y-2 text-[12px]">
                {languages.map((lang) => (
                  <div key={lang.id} className="space-y-0.5">
                    <div className="flex justify-between text-gray-800">
                      <span className="font-semibold">{lang.name}</span>
                      <span className="text-[11.5px] text-gray-500">{lang.level || 'Avanzado'}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: accentColor }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. PIE DE PÁGINA MÍNIMO                                                   */}
        {/* ========================================================================= */}
        <div className="w-full pt-2 border-t border-gray-200 flex justify-between items-center text-[11px] text-gray-400 tracking-widest uppercase font-sans mt-1">
          <span>Template Master Global Director</span>
          <span>CVRD.DO — Edición Exclusiva</span>
        </div>

      </div>
    </div>
  );
}