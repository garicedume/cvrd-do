import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterPinnacleGrid({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#262626'; 
  const lightGrayBg = '#f2f2f2';

  return (
    <div 
      className="relative shadow-2xl overflow-hidden box-border text-gray-900 flex select-none"
      style={{
        width: '816px',
        height: '1056px',
        backgroundColor: lightGrayBg,
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ========================================================================= */}
      {/* 1. COLUMNA IZQUIERDA (36% ANCHO)                                          */}
      {/* ========================================================================= */}
      <div className="w-[36%] h-full flex flex-col justify-between p-6 pr-4 shrink-0 relative box-border">
        
        <div className="flex flex-col space-y-5">
          
          {/* FOTO CIRCULAR (140px x 140px) */}
          {personal?.showPhoto && (
            <div className="flex justify-start pt-1">
              <div 
                className="rounded-full overflow-hidden shadow-md flex items-center justify-center shrink-0 bg-gray-300 border-2 border-white"
                style={{ width: '140px', height: '140px' }}
              >
                {personal?.photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={personal.photoUrl} 
                    alt="Perfil" 
                    className="w-full h-full object-cover filter grayscale contrast-105" 
                  />
                ) : (
                  <span className="text-[12px] text-gray-500 font-bold tracking-widest">FOTO</span>
                )}
              </div>
            </div>
          )}

          {/* DATOS DE CONTACTO (A 12px) */}
          <div className="space-y-2.5 pt-1 text-[12px] text-gray-800 font-light">
            {personal?.phone && (
              <div className="flex items-center gap-3">
                <span className="font-bold text-[14px] shrink-0" style={{ color: accentColor }}>📞</span>
                <span className="whitespace-nowrap font-medium">{personal.phone}</span>
              </div>
            )}
            {personal?.email && (
              <div className="flex items-center gap-3">
                <span className="font-bold text-[14px] shrink-0" style={{ color: accentColor }}>✉️</span>
                <span className="truncate font-medium" style={{ maxWidth: '190px' }}>{personal.email}</span>
              </div>
            )}
            {extras?.linkedin && (
              <div className="flex items-center gap-3">
                <span className="font-bold text-[14px] shrink-0" style={{ color: accentColor }}>💼</span>
                <span className="truncate font-medium" style={{ maxWidth: '190px' }}>{extras.linkedin}</span>
              </div>
            )}
            {personal?.location && (
              <div className="flex items-center gap-3">
                <span className="font-bold text-[14px] shrink-0" style={{ color: accentColor }}>📍</span>
                <span className="truncate font-medium" style={{ maxWidth: '190px' }}>{personal.location}</span>
              </div>
            )}
          </div>

          <div className="w-full h-px bg-gray-300 my-1"></div>

          {/* EDUCACIÓN */}
          {education && education.length > 0 && (
            <div className="space-y-2.5">
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em]"
                style={{ color: accentColor }}
              >
                Educación
              </h3>
              
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <h4 className="font-bold text-gray-900 text-[12px] leading-tight uppercase">
                      {edu.degree}
                    </h4>
                    <p className="text-[12px] text-gray-600 font-medium">
                      {edu.institution}
                    </p>
                    <p className="text-[11.5px] font-semibold text-gray-500">
                      {edu.startDate} – {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REFERENCIAS */}
          {references && references.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em]"
                style={{ color: accentColor }}
              >
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

        <div className="text-[11px] text-gray-400 tracking-widest uppercase pt-2">
          CVRD.DO — Edición
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA PRINCIPAL (64% ANCHO)                                  */}
      {/* ========================================================================= */}
      <div className="w-[64%] h-full flex flex-col justify-between p-7 pl-6 border-l border-gray-300 box-border">
        
        <div className="flex flex-col space-y-5">
          
          {/* ENCABEZADO */}
          <div className="border-b border-gray-400 pb-3">
            <h1 
              className="tracking-tight leading-none uppercase font-black flex flex-wrap gap-x-3 items-baseline"
              style={{ fontSize: '53px', color: accentColor }}
            >
              <span>{firstName}</span>
              <span className="font-light">{lastName}</span>
            </h1>

            <p className="text-[13px] font-bold uppercase tracking-[0.2em] mt-2 text-gray-700">
              {personal?.title || 'Administradora Bancaria / Ejecutiva'}
            </p>
          </div>

          {/* SOBRE MÍ */}
          {profile && (
            <div className="space-y-1.5 relative pl-4 border-l-2 border-gray-800">
              <span 
                className="absolute top-1.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: accentColor, left: '-5px' }}
              ></span>
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em]"
                style={{ color: accentColor }}
              >
                Sobre Mí
              </h3>
              <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-light">
                {profile}
              </p>
            </div>
          )}

          {/* EXPERIENCIA LABORAL */}
          {experience && experience.length > 0 && (
            <div className="space-y-2.5 relative pl-4 border-l-2 border-gray-800">
              <span 
                className="absolute top-1.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: accentColor, left: '-5px' }}
              ></span>
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em]"
                style={{ color: accentColor }}
              >
                Experiencia Laboral
              </h3>

              <div className="space-y-3 pt-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <span className="text-[11.5px] font-bold text-gray-500">
                      {exp.startDate} – {exp.endDate}
                    </span>
                    <h4 className="font-bold text-gray-900 text-[12px] uppercase tracking-wide">
                      {exp.role} — <span className="font-semibold text-gray-600">{exp.company}</span>
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-light whitespace-pre-line pt-0.5">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IDIOMAS */}
          {languages && languages.length > 0 && (
            <div className="space-y-2.5 relative pl-4 border-l-2 border-gray-800">
              <span 
                className="absolute top-1.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: accentColor, left: '-5px' }}
              ></span>
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em]"
                style={{ color: accentColor }}
              >
                Idiomas
              </h3>

              <div className="space-y-2 text-[12px] pt-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="grid grid-cols-12 items-center gap-2">
                    <span className="col-span-4 font-bold text-gray-800 uppercase tracking-wide">{lang.name}</span>
                    <span className="col-span-8 font-semibold text-gray-600">{lang.level || 'Avanzado'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HABILIDADES CLAVE */}
          {skills && skills.length > 0 && (
            <div className="space-y-2 pt-1">
              <h3 
                className="font-bold text-[13px] uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1"
              >
                Habilidades Clave
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {skills.map((skill) => (
                  <span 
                    key={skill.id}
                    className="px-2.5 py-1 bg-white border border-gray-300 rounded text-[12px] font-medium text-gray-800 shadow-2xs"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* PIE DE PÁGINA */}
        <div className="w-full pt-2 border-t border-gray-300 flex justify-between items-center text-[11px] text-gray-400 tracking-widest uppercase mt-2">
          <span>Template Master Pinnacle Grid</span>
          <span>CVRD.DO — Edición Exclusiva</span>
        </div>

      </div>
    </div>
  );
}