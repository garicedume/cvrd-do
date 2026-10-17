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

  // REGLA DE ORO 7 Y 8: Tono gris/negro sofisticado con acentos editables calcados de la muestra
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
      <div className="flex flex-col h-full p-8 box-border justify-between relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. ENCABEZADO SUPERIOR DIVIDIDO                                          */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-6 items-center border-b border-gray-300 pb-5">
          
          {/* NOMBRE Y CARGO (COLUMNA 8) - REGLA DE ORO 1: NOMBRE A EXACTAMENTE 53px */}
          <div className="col-span-8 flex flex-col justify-center">
            <h1 
              className="tracking-tight leading-none uppercase font-black flex flex-wrap gap-x-3 items-baseline" 
              style={{ fontSize: '53px', color: accentColor }}
            >
              <span>{firstName}</span>
              <span className="font-light">{lastName}</span>
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] mt-2 text-gray-600 font-sans">
              {personal?.title || 'Director Global / Diseñador Web'}
            </p>
          </div>

          {/* CONTACTO DERECHO - TEXTO A 12px E ÍCONOS A 14px (REGLA DE ORO 2: 100% ESPAÑOL) */}
          <div className="col-span-4 border-l border-gray-300 pl-4 space-y-1.5 text-[12px] text-gray-700 font-sans font-light">
            {personal?.phone && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px]" style={{ color: accentColor }}>📞</span>
                <span className="whitespace-nowrap">{personal.phone}</span>
              </div>
            )}
            {personal?.email && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px]" style={{ color: accentColor }}>✉️</span>
                <span className="truncate" style={{ maxWidth: '200px' }}>{personal.email}</span>
              </div>
            )}
            {personal?.location && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px]" style={{ color: accentColor }}>📍</span>
                <span className="truncate" style={{ maxWidth: '200px' }}>{personal.location}</span>
              </div>
            )}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. CUERPO PRINCIPAL (2 COLUMNAS)                                         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-6 my-auto pt-4 flex-1 items-stretch">
          
          {/* ================= COLUMNA IZQUIERDA (35% ANCHO CON FONDO GRIS SUAVE) ================= */}
          <div 
            className="col-span-4 p-4 flex flex-col justify-between space-y-5 rounded-sm"
            style={{ backgroundColor: sidebarBg }}
          >
            <div className="space-y-5">
              
              {/* FOTO FLOTANTE CON RESPIRACIÓN - REGLAS DE ORO 3, 5 Y 9 (150px x 150px) */}
              {personal?.showPhoto && (
                <div className="flex justify-center pt-1">
                  <div 
                    className="overflow-hidden shadow-lg flex items-center justify-center shrink-0 bg-white border-4 border-white rounded-sm"
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
                      <span className="text-[10px] text-gray-400 font-bold tracking-widest font-sans">FOTO</span>
                    )}
                  </div>
                </div>
              )}

              {/* SECCIÓN: EDUCACIÓN */}
              {education && education.length > 0 && (
                <div className="space-y-2.5 font-sans">
                  <h3 className="font-bold text-[12px] uppercase tracking-[0.15em] text-gray-900 border-b border-gray-300 pb-1">
                    Educación
                  </h3>
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-0.5">
                        <p className="text-[9.5px] font-bold text-gray-500">{edu.startDate} – {edu.endDate}</p>
                        <p className="font-bold text-gray-900 text-[11px] leading-tight">{edu.degree}</p>
                        <p className="text-[10px] text-gray-600 font-medium">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECCIÓN: REDES / ENLACES */}
              {(extras?.portfolio || extras?.linkedin) && (
                <div className="space-y-2 font-sans pt-1">
                  <h3 className="font-bold text-[12px] uppercase tracking-[0.15em] text-gray-900 border-b border-gray-300 pb-1">
                    Enlaces
                  </h3>
                  <div className="space-y-1 text-[10px] text-gray-700">
                    {extras?.portfolio && <p className="truncate"><span className="font-bold">Web:</span> {extras.portfolio}</p>}
                    {extras?.linkedin && <p className="truncate"><span className="font-bold">LinkedIn:</span> {extras.linkedin}</p>}
                  </div>
                </div>
              )}

              {/* SECCIÓN: REFERENCIAS */}
              {references && references.length > 0 && (
                <div className="space-y-2 font-sans pt-1">
                  <h3 className="font-bold text-[12px] uppercase tracking-[0.15em] text-gray-900 border-b border-gray-300 pb-1">
                    Referencias
                  </h3>
                  <div className="space-y-2 text-[10px]">
                    {references.map((ref) => (
                      <div key={ref.id} className="space-y-0.5">
                        <p className="font-bold text-gray-900 text-[10.5px]">{ref.name}</p>
                        <p className="text-gray-600 text-[9.5px]">{ref.position} {ref.company ? `- ${ref.company}` : ''}</p>
                        {ref.phone && <p className="text-gray-500 text-[9px]">Tel: {ref.phone}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <div className="text-[8.5px] text-gray-400 text-center tracking-widest uppercase font-sans pt-2 border-t border-gray-300">
              Global Edition
            </div>
          </div>

          {/* ================= COLUMNA DERECHA PRINCIPAL (65% ANCHO) ================= */}
          <div className="col-span-8 flex flex-col justify-between space-y-5 pl-2">
            
            <div className="space-y-5">
              
              {/* SECCIÓN: PERFIL PROFESIONAL (REGLA DE ORO 6: JUSTIFICADO) */}
              {profile && (
                <div className="space-y-1.5 font-sans">
                  <p className="text-gray-700 leading-relaxed text-[11px] text-justify font-normal border-b border-gray-200 pb-3">
                    {profile}
                  </p>
                </div>
              )}

              {/* SECCIÓN: EXPERIENCIA LABORAL */}
              {experience && experience.length > 0 && (
                <div className="space-y-3 font-sans">
                  <h3 className="font-bold text-[12px] uppercase tracking-[0.15em] text-gray-900 border-b border-gray-300 pb-1">
                    Experiencia Laboral
                  </h3>
                  
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-bold text-gray-900 text-[11px] uppercase tracking-wide">
                            {exp.role}
                          </h4>
                          <span className="text-[10px] font-bold text-gray-400">
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>
                        <p className="text-[10px] font-bold tracking-wide italic" style={{ color: accentColor }}>
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

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. SECCIÓN INFERIOR DE 3 COLUMNAS (HABILIDADES, IDIOMAS, CONOCIMIENTOS)    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-6 pt-3 border-t border-gray-300 font-sans my-1">
          
          {/* Habilidades (Columna 4) */}
          <div className="col-span-4 space-y-2">
            <h3 className="font-bold text-[11px] uppercase tracking-wider text-gray-900">
              Habilidades
            </h3>
            {skills && skills.length > 0 && (
              <div className="space-y-1.5 text-[9.5px]">
                {skills.slice(0, 3).map((skill) => (
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

          {/* Idiomas (Columna 4) */}
          <div className="col-span-4 space-y-2">
            <h3 className="font-bold text-[11px] uppercase tracking-wider text-gray-900">
              Idiomas
            </h3>
            {languages && languages.length > 0 && (
              <div className="space-y-1.5 text-[9.5px]">
                {languages.map((lang) => (
                  <div key={lang.id} className="space-y-0.5">
                    <div className="flex justify-between text-gray-800">
                      <span className="font-semibold">{lang.name}</span>
                      <span className="text-[8.5px] text-gray-500">{lang.level || 'Avanzado'}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: accentColor }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Software / Conocimientos (Columna 4) */}
          <div className="col-span-4 space-y-2">
            <h3 className="font-bold text-[11px] uppercase tracking-wider text-gray-900">
              Software
            </h3>
            <div className="space-y-1.5 text-[9.5px]">
              <div className="space-y-0.5">
                <span className="font-semibold text-gray-800">Paquete Office & Tools</span>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '95%', backgroundColor: accentColor }}></div>
                </div>
              </div>
              <div className="space-y-0.5">
                <span className="font-semibold text-gray-800">Herramientas de Gestión</span>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. PIE DE PÁGINA MÍNIMO                                                   */}
        {/* ========================================================================= */}
        <div className="w-full pt-2 border-t border-gray-200 flex justify-between items-center text-[9.5px] text-gray-400 tracking-widest uppercase font-sans mt-1">
          <span>Template Master Global Director</span>
          <span>CVRD.DO — Exclusive Edition</span>
        </div>

      </div>
    </div>
  );
}