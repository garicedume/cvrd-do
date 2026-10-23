import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

interface CustomLink {
  label?: string;
  url?: string;
  urlLine2?: string;
}

export default function TemplateMasterPrestigeBoutique({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#2b59c3'; 
  const goldAccent = '#d4a373';
  const darkSidebarBg = '#2c2c2c';

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
      {/* 1. COLUMNA IZQUIERDA (36% ANCHO)                                          */}
      {/* ========================================================================= */}
      <div className="w-[36%] h-full flex flex-col justify-between shrink-0 relative box-border bg-white">
        
        {/* FOTO EXACTA DE 160px x 160px */}
        <div className="w-full bg-gray-200 flex items-center justify-center py-4 shrink-0 border-b border-gray-300">
          {personal?.showPhoto && (
            <div 
              className="overflow-hidden rounded-md shadow-md bg-gray-700 flex items-center justify-center shrink-0 border-2 border-white"
              style={{ width: '160px', height: '160px' }}
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

        {/* BLOQUE OSCURO DE LA BARRA LATERAL */}
        <div 
          className="w-full flex-1 p-5 text-white flex flex-col justify-between space-y-4 overflow-y-auto"
          style={{ backgroundColor: darkSidebarBg }}
        >
          <div className="space-y-4">
            
            {/* CONTACTO & ENLACES DINÁMICOS (ESTRUCTURA DE PLANTILLA 10) */}
            <div className="space-y-2">
              <h3 
                className="font-bold text-[13px] uppercase tracking-[0.15em] border-b border-gray-600 pb-1"
                style={{ color: goldAccent }}
              >
                Contacto
              </h3>
              <div className="space-y-1.5 text-[12px] text-gray-300 font-light">
                {personal?.phone && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] shrink-0" style={{ color: goldAccent }}>📞</span>
                    <span className="whitespace-nowrap font-medium">{personal.phone}</span>
                  </div>
                )}
                {personal?.secondaryPhone && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] shrink-0" style={{ color: goldAccent }}>📞</span>
                    <span className="whitespace-nowrap font-medium text-gray-400">{personal.secondaryPhone}</span>
                  </div>
                )}

                {personal?.email && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] shrink-0" style={{ color: goldAccent }}>✉️</span>
                    <span className="truncate font-medium" style={{ maxWidth: '190px' }}>{personal.email}</span>
                  </div>
                )}
                {personal?.secondaryEmail && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] shrink-0" style={{ color: goldAccent }}>✉️</span>
                    <span className="truncate font-medium text-gray-400" style={{ maxWidth: '190px' }}>{personal.secondaryEmail}</span>
                  </div>
                )}

                {personal?.location && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] shrink-0" style={{ color: goldAccent }}>📍</span>
                    <span className="truncate font-medium" style={{ maxWidth: '190px' }}>{personal.location}</span>
                  </div>
                )}
                {personal?.locationLine2 && (
                  <div className="flex items-center gap-2 pl-5">
                    <span className="truncate font-medium text-gray-400" style={{ maxWidth: '175px' }}>{personal.locationLine2}</span>
                  </div>
                )}

                {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
                  (extras.customLinks as CustomLink[]).map((link, idx) => (
                    <div key={idx} className="mt-1 text-gray-300 break-all">
                      <span className="font-bold text-white block">🔗 {link?.label || 'Enlace'}:</span>
                      <span className="block">{link?.url}</span>
                      {link?.urlLine2 && <span className="text-gray-400 block">{link.urlLine2}</span>}
                    </div>
                  ))
                ) : (
                  <>
                    {extras?.linkedin && (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] shrink-0" style={{ color: goldAccent }}>🔗</span>
                        <span className="truncate font-medium" style={{ maxWidth: '190px' }}>{extras.linkedin}</span>
                      </div>
                    )}
                    {extras?.portfolio && (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] shrink-0" style={{ color: goldAccent }}>🌐</span>
                        <span className="truncate font-medium" style={{ maxWidth: '190px' }}>{extras.portfolio}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* HABILIDADES */}
            {skills && skills.length > 0 && (
              <div className="space-y-2">
                <h3 
                  className="font-bold text-[13px] uppercase tracking-[0.15em] border-b border-gray-600 pb-1"
                  style={{ color: goldAccent }}
                >
                  Habilidades
                </h3>
                <ul className="space-y-2 text-[12px] text-gray-300">
                  {skills.map((skill) => (
                    <li key={skill.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: goldAccent }}></span>
                      <span className="font-medium">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* IDIOMAS */}
            {languages && languages.length > 0 && (
              <div className="space-y-2">
                <h3 
                  className="font-bold text-[13px] uppercase tracking-[0.15em] border-b border-gray-600 pb-1"
                  style={{ color: goldAccent }}
                >
                  Idiomas
                </h3>
                <div className="space-y-1.5 text-[12px] text-gray-300">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center">
                      <span className="font-medium text-white">{lang.name}</span>
                      <span className="text-[11.5px] text-gray-400">{lang.level || 'Avanzado'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="text-[11px] text-gray-400 text-center tracking-widest uppercase pt-2 border-t border-gray-600">
            Edición Exclusiva
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA PRINCIPAL (64% ANCHO)                                  */}
      {/* ========================================================================= */}
      <div className="w-[64%] h-full flex flex-col justify-between p-6 bg-white box-border">
        
        <div className="flex flex-col space-y-5">
          
          {/* ENCABEZADO CON NOMBRE EN UNA SOLA FILA */}
          <div className="border-b border-gray-300 pb-3">
            <h1 
              className="tracking-tight leading-none uppercase font-extrabold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ fontSize: '38px' }}
            >
              <span>{firstName}</span> <span className="font-light text-gray-700">{lastName}</span>
            </h1>

            <p className="text-[13px] font-bold uppercase tracking-[0.2em] mt-2 text-gray-600">
              {personal?.title || 'Gerente de Marketing / Director'}
            </p>
          </div>

          {/* PERFIL PROFESIONAL */}
          {profile && (
            <div className="space-y-1.5">
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em]"
                style={{ color: accentColor }}
              >
                Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-normal">
                {profile}
              </p>
            </div>
          )}

          {/* EXPERIENCIA LABORAL */}
          {experience && experience.length > 0 && (
            <div className="space-y-2.5">
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em]"
                style={{ color: accentColor }}
              >
                Experiencia Laboral
              </h3>

              <div className="space-y-3 pt-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 space-y-1 border-l-2 border-gray-300">
                    <span 
                      className="absolute top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-xs"
                      style={{ backgroundColor: accentColor, left: '-6px' }}
                    ></span>

                    <span className="text-[11.5px] font-bold text-gray-500 uppercase tracking-wide">
                      {exp.startDate} – {exp.endDate}
                    </span>

                    <h4 className="font-bold text-gray-900 text-[12px] uppercase tracking-wide">
                      {exp.role}
                    </h4>

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

          {/* EDUCACIÓN (POR DEBAJO DE EXPERIENCIA) */}
          {education && education.length > 0 && (
            <div className="space-y-2">
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em]"
                style={{ color: accentColor }}
              >
                Educación
              </h3>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-4 space-y-0.5 border-l-2 border-gray-300">
                    <span 
                      className="absolute top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-xs"
                      style={{ backgroundColor: accentColor, left: '-6px' }}
                    ></span>
                    <span className="text-[11.5px] font-bold text-gray-500 uppercase tracking-wide">
                      {edu.startDate} – {edu.endDate}
                    </span>
                    <h4 className="font-bold text-gray-900 text-[12px] uppercase leading-tight">
                      {edu.degree}
                    </h4>
                    <p className="text-[12px] text-gray-600 font-semibold">{edu.institution}</p>
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

              <div className="grid grid-cols-2 gap-3 text-[12px]">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5 border-l-2 pl-2.5" style={{ borderColor: accentColor }}>
                    <p className="font-bold text-gray-900 text-[12px]">{ref.name}</p>
                    <p className="text-gray-600 text-[12px]">{ref.position} {ref.company ? `- ${ref.company}` : ''}</p>
                    {ref.phone && <p className="text-gray-500 text-[11.5px]">Tel: {ref.phone}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* PIE DE PÁGINA */}
        <div className="w-full pt-2 border-t border-gray-200 flex justify-between items-center text-[11px] text-gray-400 tracking-widest uppercase mt-2">
          <span>Template Master Prestige Boutique</span>
          <span>CVRD.DO — Edición Exclusiva</span>
        </div>

      </div>
    </div>
  );
}