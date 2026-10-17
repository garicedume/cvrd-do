import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterPrestigeBoutique({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // REGLAS DE ORO 7 Y 8: Tono azul ejecutivo de acento para la derecha y dorado suave para los títulos de la izquierda
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
      {/* 1. COLUMNA IZQUIERDA (36% ANCHO) - FOTO SUPERIOR Y BARRA OSCURA INFERIOR   */}
      {/* ========================================================================= */}
      <div className="w-[36%] h-full flex flex-col justify-between shrink-0 relative box-border bg-white">
        
        {/* FOTO ENMARCADA EN LA CABECERA IZQUIERDA - REGLAS 3, 5 Y 9 (150px x 150px) */}
        <div className="w-full bg-gray-200 flex items-center justify-center py-4 shrink-0 border-b border-gray-300">
          {personal?.showPhoto && (
            <div 
              className="overflow-hidden rounded-md shadow-md bg-gray-700 flex items-center justify-center shrink-0 border-2 border-white"
              style={{ width: '150px', height: '150px' }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src={personal.photoUrl} 
                  alt="Perfil" 
                  className="w-full h-full object-cover filter contrast-105" 
                />
              ) : (
                <span className="text-[10px] text-gray-400 font-bold tracking-widest">FOTO</span>
              )}
            </div>
          )}
        </div>

        {/* BLOQUE OSCURO DE LA BARRA LATERAL (EDUCACIÓN, HABILIDADES, CONTACTO) */}
        <div 
          className="w-full flex-1 p-5 text-white flex flex-col justify-between space-y-4"
          style={{ backgroundColor: darkSidebarBg }}
        >
          <div className="space-y-4">
            
            {/* SECCIÓN: EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-2">
                <h3 
                  className="font-bold text-[11px] uppercase tracking-[0.15em] border-b border-gray-600 pb-1"
                  style={{ color: goldAccent }}
                >
                  Educación
                </h3>
                <div className="space-y-2.5">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <h4 className="font-bold text-white text-[10.5px] uppercase leading-tight">
                        {edu.degree}
                      </h4>
                      <p className="text-[9.5px] text-gray-300 font-medium">{edu.institution}</p>
                      <p className="text-[9px] text-gray-400">{edu.startDate} – {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN: HABILIDADES */}
            {skills && skills.length > 0 && (
              <div className="space-y-2">
                <h3 
                  className="font-bold text-[11px] uppercase tracking-[0.15em] border-b border-gray-600 pb-1"
                  style={{ color: goldAccent }}
                >
                  Habilidades
                </h3>
                <ul className="space-y-1.5 text-[9.5px] text-gray-300">
                  {skills.map((skill) => (
                    <li key={skill.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: goldAccent }}></span>
                      <span className="font-medium">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SECCIÓN: IDIOMAS O REFERENCIAS */}
            {languages && languages.length > 0 && (
              <div className="space-y-2">
                <h3 
                  className="font-bold text-[11px] uppercase tracking-[0.15em] border-b border-gray-600 pb-1"
                  style={{ color: goldAccent }}
                >
                  Idiomas
                </h3>
                <div className="space-y-1 text-[9.5px] text-gray-300">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center">
                      <span className="font-medium text-white">{lang.name}</span>
                      <span className="text-[9px] text-gray-400">{lang.level || 'Avanzado'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REFERENCIAS SI EXISTEN */}
            {references && references.length > 0 && (
              <div className="space-y-2">
                <h3 
                  className="font-bold text-[11px] uppercase tracking-[0.15em] border-b border-gray-600 pb-1"
                  style={{ color: goldAccent }}
                >
                  Referencias
                </h3>
                <div className="space-y-2 text-[9.5px] text-gray-300">
                  {references.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5 border-l-2 pl-2" style={{ borderColor: goldAccent }}>
                      <p className="font-bold text-white">{ref.name}</p>
                      <p className="text-gray-400 text-[9px]">{ref.position} {ref.company ? `- ${ref.company}` : ''}</p>
                      {ref.phone && <p className="text-gray-400 text-[8.5px]">Tel: {ref.phone}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* DATOS DE CONTACTO AL PIE DE LA BARRA LATERAL (TEXTO A 12px E ÍCONOS A 14px) */}
          <div className="space-y-1.5 pt-2 border-t border-gray-600 text-[12px] text-gray-300 font-light">
            {personal?.location && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px] shrink-0" style={{ color: goldAccent }}>📍</span>
                <span className="truncate" style={{ maxWidth: '170px' }}>{personal.location}</span>
              </div>
            )}
            {personal?.phone && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px] shrink-0" style={{ color: goldAccent }}>📞</span>
                <span className="whitespace-nowrap">{personal.phone}</span>
              </div>
            )}
            {personal?.email && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px] shrink-0" style={{ color: goldAccent }}>✉️</span>
                <span className="truncate" style={{ maxWidth: '170px' }}>{personal.email}</span>
              </div>
            )}
            {extras?.portfolio && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px] shrink-0" style={{ color: goldAccent }}>🌐</span>
                <span className="truncate" style={{ maxWidth: '170px' }}>{extras.portfolio}</span>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA PRINCIPAL (64% ANCHO) - NOMBRE, PERFIL Y EXPERIENCIA   */}
      {/* ========================================================================= */}
      <div className="w-[64%] h-full flex flex-col justify-between p-7 bg-white box-border">
        
        <div className="flex flex-col space-y-6">
          
          {/* ENCABEZADO CON NOMBRE Y CARGO */}
          <div className="border-b border-gray-300 pb-4">
            {/* REGLA DE ORO 1: NOMBRE A EXACTAMENTE 53px */}
            <h1 
              className="tracking-tight leading-none uppercase font-extrabold flex flex-col justify-center text-gray-900"
              style={{ fontSize: '53px' }}
            >
              <span className="block leading-none">{firstName}</span>
              {lastName && <span className="block font-light text-gray-700 leading-none mt-1">{lastName}</span>}
            </h1>

            <p className="text-[12px] font-bold uppercase tracking-[0.25em] mt-3 text-gray-600">
              {personal?.title || 'Gerente de Marketing / Director'}
            </p>
          </div>

          {/* SECCIÓN: PERFIL PROFESIONAL (ESTANDARIZADO - REGLA DE ORO 6: JUSTIFICADO) */}
          {profile && (
            <div className="space-y-2">
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em]"
                style={{ color: accentColor }}
              >
                Perfil Profesional
              </h3>
              {/* REGLA DE ORO 6: TEXTO JUSTIFICADO */}
              <p className="text-gray-700 leading-relaxed text-[10.5px] text-justify font-light">
                {profile}
              </p>
            </div>
          )}

          {/* SECCIÓN: EXPERIENCIA LABORAL */}
          {experience && experience.length > 0 && (
            <div className="space-y-3 pt-1">
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em]"
                style={{ color: accentColor }}
              >
                Experiencia Laboral
              </h3>

              <div className="space-y-4 pt-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 space-y-1 border-l-2 border-gray-300">
                    <span 
                      className="absolute top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-xs"
                      style={{ backgroundColor: accentColor, left: '-6px' }}
                    ></span>

                    <span className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wide">
                      {exp.startDate} – {exp.endDate}
                    </span>

                    <h4 className="font-bold text-gray-900 text-[11px] uppercase tracking-wide">
                      {exp.role}
                    </h4>

                    <p className="text-[10px] font-semibold text-gray-600 italic">
                      {exp.company}
                    </p>

                    <p className="text-gray-700 leading-relaxed text-[10px] text-justify font-light whitespace-pre-line pt-0.5">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* PIE DE PÁGINA MÍNIMO */}
        <div className="w-full pt-3 border-t border-gray-200 flex justify-between items-center text-[9.5px] text-gray-400 tracking-widest uppercase">
          <span>Template Master Prestige Boutique</span>
          <span>CVRD.DO — Exclusive Edition</span>
        </div>

      </div>
    </div>
  );
}