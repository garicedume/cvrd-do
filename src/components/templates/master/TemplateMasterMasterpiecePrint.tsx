import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterMasterpiecePrint({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // REGLA DE ORO 7 Y 8: Tono carbón oscuro para bloques flotantes y acentos editables
  const accentColor = styles?.accentColor || '#1a1a1a';
  const sidebarBg = '#e8ebed'; // Gris claro flotante de la columna izquierda

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-800 flex select-none"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ========================================================================= */}
      {/* 1. COLUMNA IZQUIERDA (36% ANCHO) CON TARJETA FLOTANTE Y FONDO GRIS         */}
      {/* ========================================================================= */}
      <div className="w-[36%] h-full flex flex-col justify-between p-5 shrink-0 relative overflow-hidden bg-white">
        
        {/* FONDO GRIS SUAVE REDONDEADO INFERIOR QUE ENVUELVE LA COLUMNA */}
        <div 
          className="absolute inset-x-3 top-3 bottom-3 rounded-2xl z-0"
          style={{ backgroundColor: sidebarBg }}
        />

        <div className="relative z-10 flex flex-col space-y-5 p-2">
          
          {/* TARJETA FLOTANTE NEGRA / OSCURA CON FOTO, NOMBRE Y CONTACTO */}
          <div 
            className="w-full rounded-3xl p-4 text-white flex flex-col items-center shadow-xl space-y-4 relative overflow-hidden"
            style={{ backgroundColor: accentColor }}
          >
            {/* FOTO CON RECORTE Y RESPIRACIÓN - REGLAS DE ORO 3, 5 Y 9 (150px x 150px) */}
            {personal?.showPhoto && (
              <div 
                className="rounded-2xl overflow-hidden border-2 border-white/20 shadow-md flex items-center justify-center shrink-0 bg-gray-700 mt-1"
                style={{ width: '150px', height: '150px' }}
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

            {/* NOMBRE (REGLA DE ORO 1: EXACTAMENTE 53px) Y TÍTULO */}
            <div className="text-center space-y-1 w-full border-b border-white/20 pb-3">
              <h1 
                className="tracking-tight leading-none uppercase font-extrabold flex flex-col items-center justify-center text-white"
                style={{ fontSize: '53px' }}
              >
                <span className="block leading-none">{firstName}</span>
                {lastName && <span className="block font-light text-gray-300 leading-none mt-1">{lastName}</span>}
              </h1>

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 pt-1">
                {personal?.title || 'Analista de Datos / Ejecutivo'}
              </p>
            </div>

            {/* CÁPSULA PÍLDORA DE CONTACTO Y DATOS - TEXTO A 12px E ÍCONOS A 14px */}
            <div className="w-full space-y-2.5 text-center">
              <div className="bg-white text-gray-900 rounded-full py-1 px-3 text-center shadow-xs">
                <span className="font-extrabold text-[11px] uppercase tracking-wider">Contacto</span>
              </div>

              <div className="space-y-2 text-[12px] text-gray-200 font-light text-left pl-1">
                {personal?.phone && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] shrink-0">📞</span>
                    <span className="whitespace-nowrap">{personal.phone}</span>
                  </div>
                )}
                {personal?.email && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] shrink-0">✉️</span>
                    <span className="truncate" style={{ maxWidth: '170px' }}>{personal.email}</span>
                  </div>
                )}
                {personal?.location && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] shrink-0">📍</span>
                    <span className="truncate" style={{ maxWidth: '170px' }}>{personal.location}</span>
                  </div>
                )}
                {extras?.portfolio && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] shrink-0">🌐</span>
                    <span className="truncate" style={{ maxWidth: '170px' }}>{extras.portfolio}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECCIÓN: HABILIDADES CON PÍLDORA DE ENCABEZADO Y BARRAS OSCURAS */}
          {skills && skills.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <div 
                className="w-full py-1 px-3 rounded-md text-center text-white shadow-xs"
                style={{ backgroundColor: accentColor }}
              >
                <h3 className="font-bold text-[11px] uppercase tracking-wider">
                  Habilidades
                </h3>
              </div>

              <div className="space-y-2 text-[10px]">
                {skills.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between items-center font-semibold text-gray-800 uppercase">
                      <span>{skill.name}</span>
                    </div>
                    <div className="w-full bg-gray-300 h-1.5 rounded-full overflow-hidden">
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

          {/* SECCIÓN: IDIOMAS O PASATIEMPOS CON PÍLDORA */}
          {languages && languages.length > 0 && (
            <div className="space-y-2 pt-1">
              <div 
                className="w-full py-1 px-3 rounded-md text-center text-white shadow-xs"
                style={{ backgroundColor: accentColor }}
              >
                <h3 className="font-bold text-[11px] uppercase tracking-wider">
                  Idiomas
                </h3>
              </div>

              <div className="space-y-1.5 text-[10px] text-gray-700">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center border-b border-gray-300/60 pb-1">
                    <span className="font-bold text-gray-800 uppercase">{lang.name}</span>
                    <span className="text-[9.5px] text-gray-600">{lang.level || 'Avanzado'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* MARCA DE AGUA EN COLUMNA IZQUIERDA */}
        <div className="relative z-10 text-[8.5px] text-gray-400 text-center tracking-widest uppercase pb-2">
          Masterpiece Edition
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA PRINCIPAL (64% ANCHO) CON PÍLDORAS NEGRAS DE TÍTULOS   */}
      {/* ========================================================================= */}
      <div className="w-[64%] h-full flex flex-col justify-between p-7 bg-white">
        
        <div className="flex flex-col space-y-6">
          
          {/* SECCIÓN: PERFIL PROFESIONAL */}
          {profile && (
            <div className="space-y-2.5">
              <div 
                className="w-full py-1.5 px-4 rounded-md text-center text-white shadow-xs"
                style={{ backgroundColor: accentColor }}
              >
                <h3 className="font-bold text-[12px] uppercase tracking-[0.2em]">
                  Perfil Profesional
                </h3>
              </div>
              
              {/* REGLA DE ORO 6: TEXTO JUSTIFICADO */}
              <p className="text-gray-700 leading-relaxed text-[11px] text-justify font-normal tracking-wide px-1">
                {profile}
              </p>
            </div>
          )}

          {/* SECCIÓN: EXPERIENCIA LABORAL */}
          {experience && experience.length > 0 && (
            <div className="space-y-3">
              <div 
                className="w-full py-1.5 px-4 rounded-md text-center text-white shadow-xs"
                style={{ backgroundColor: accentColor }}
              >
                <h3 className="font-bold text-[12px] uppercase tracking-[0.2em]">
                  Experiencia Laboral
                </h3>
              </div>
              
              <div className="space-y-4 px-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[11.5px] uppercase tracking-wide">
                        {exp.role}
                      </h4>
                      <span className="text-[10px] font-bold text-gray-400 shrink-0">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>

                    <p className="text-[10px] font-bold text-gray-600 italic">
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

          {/* SECCIÓN: EDUCACIÓN */}
          {education && education.length > 0 && (
            <div className="space-y-3">
              <div 
                className="w-full py-1.5 px-4 rounded-md text-center text-white shadow-xs"
                style={{ backgroundColor: accentColor }}
              >
                <h3 className="font-bold text-[12px] uppercase tracking-[0.2em]">
                  Educación
                </h3>
              </div>

              <div className="space-y-3 px-1">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[11px] uppercase">{edu.degree}</h4>
                      <span className="text-[9.5px] font-bold text-gray-400">{edu.startDate} – {edu.endDate}</span>
                    </div>
                    <p className="text-[10px] text-gray-600 font-medium">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN: REFERENCIAS */}
          {references && references.length > 0 && (
            <div className="space-y-3">
              <div 
                className="w-full py-1.5 px-4 rounded-md text-center text-white shadow-xs"
                style={{ backgroundColor: accentColor }}
              >
                <h3 className="font-bold text-[12px] uppercase tracking-[0.2em]">
                  Referencias
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 px-1 text-[10px]">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5 border-l-2 border-gray-200 pl-2.5">
                    <p className="font-bold text-gray-900 text-[10.5px]">{ref.name}</p>
                    <p className="text-gray-600 text-[9.5px]">{ref.position} {ref.company ? `- ${ref.company}` : ''}</p>
                    {ref.phone && <p className="text-gray-500 text-[9px]">Tel: {ref.phone}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* PIE DE PÁGINA MÍNIMO */}
        <div className="w-full pt-3 border-t border-gray-200 flex justify-between items-center text-[9.5px] text-gray-400 tracking-widest uppercase mt-2">
          <span>Template Master Masterpiece Print</span>
          <span>CVRD.DO — Exclusive Edition</span>
        </div>

      </div>
    </div>
  );
}