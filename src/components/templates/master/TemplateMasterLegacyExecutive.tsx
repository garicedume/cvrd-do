import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterLegacyExecutive({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // REGLA DE ORO 7 Y 8: Tono naranja vibrante de acento y fondo superior carbón/azulado oscuro de la muestra
  const accentColor = styles?.accentColor || '#f05a24'; 
  const headerBg = '#1e2029';

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-800 flex flex-col justify-between select-none"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ========================================================================= */}
      {/* 1. CABECERA SUPERIOR OSCURA CON BORDES REDONDEADOS INFERIORES             */}
      {/* ========================================================================= */}
      <div 
        className="w-full text-white p-7 px-8 flex items-center gap-6 `rounded-b-4xl` shrink-0 relative shadow-md"
        style={{ backgroundColor: headerBg, minHeight: '220px' }}
      >
        {/* FOTO CIRCULAR (150px x 150px) - REGLAS DE ORO 3, 5 Y 9 */}
        {personal?.showPhoto && (
          <div className="shrink-0 flex items-center justify-center">
            <div 
              className="rounded-full overflow-hidden border-2 border-white/20 shadow-lg flex items-center justify-center bg-gray-700"
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
          </div>
        )}

        {/* NOMBRE, CARGO Y EXTRACTO */}
        <div className="flex flex-col justify-center space-y-1.5 flex-1 pl-2">
          {/* REGLA DE ORO 1: NOMBRE A EXACTAMENTE 53px */}
          <h1 
            className="tracking-tight leading-none uppercase font-extrabold flex flex-wrap gap-x-3 items-baseline text-white" 
            style={{ fontSize: '53px' }}
          >
            <span>{firstName}</span>
            <span className="font-light text-gray-200">{lastName}</span>
          </h1>

          <p 
            className="text-[13px] font-bold uppercase tracking-[0.2em]" 
            style={{ color: accentColor }}
          >
            {personal?.title || 'Diseñador UX / Ejecutivo'}
          </p>

          <p className="text-[10px] text-gray-300 leading-relaxed font-light text-justify pt-1 pr-4 line-clamp-3">
            {profile || 'Profesional multidisciplinario con enfoque estratégico en diseño, desarrollo y liderazgo. Apasionado por la creación de soluciones innovadoras y la optimización de procesos corporativos.'}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CUERPO PRINCIPAL (DOS COLUMNAS)                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-12 gap-8 px-8 my-auto pt-6 flex-1 items-stretch">
        
        {/* ================= COLUMNA IZQUIERDA (45% ANCHO) ================= */}
        <div className="col-span-5 flex flex-col space-y-6 pr-2">
          
          {/* SECCIÓN: PERFIL PROFESIONAL (COMPLETO) */}
          {profile && (
            <div className="space-y-2">
              <h3 className="font-extrabold text-[13px] uppercase tracking-[0.15em] text-gray-900 border-b border-gray-200 pb-1">
                Perfil
              </h3>
              {/* REGLA DE ORO 6: TEXTO JUSTIFICADO */}
              <p className="text-[10px] text-gray-600 leading-relaxed text-justify font-light">
                {profile}
              </p>
            </div>
          )}

          {/* SECCIÓN: EXPERIENCIA LABORAL */}
          {experience && experience.length > 0 && (
            <div className="space-y-3.5 flex-1">
              <h3 className="font-extrabold text-[13px] uppercase tracking-[0.15em] text-gray-900 border-b border-gray-200 pb-1">
                Experiencia
              </h3>

              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[11px] uppercase tracking-wide">
                        {exp.role}
                      </h4>
                      <span className="text-[10px] font-bold shrink-0 ml-2" style={{ color: accentColor }}>
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>

                    <p className="text-[9.5px] font-semibold text-gray-500">
                      {exp.company}
                    </p>

                    <p className="text-gray-600 leading-relaxed text-[10px] text-justify font-light whitespace-pre-line pt-0.5">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ================= COLUMNA DERECHA (55% ANCHO) ================= */}
        <div className="col-span-7 flex flex-col justify-between space-y-6 pl-2 relative">
          
          <div className="space-y-6">
            
            {/* SECCIÓN: EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-extrabold text-[13px] uppercase tracking-[0.15em] text-gray-900 border-b border-gray-200 pb-1">
                  Educación
                </h3>

                <div className="space-y-3.5">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <p className="text-[9.5px] font-bold text-gray-400">
                        {edu.startDate} – {edu.endDate}
                      </p>
                      <h4 className="font-bold text-[11px] uppercase" style={{ color: accentColor }}>
                        {edu.degree}
                      </h4>
                      <p className="text-[10px] text-gray-600 font-medium">
                        {edu.institution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN DE DOS SUBCOLUMNAS: HABILIDADES Y CONTACTO */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              
              {/* HABILIDADES / EXPERTISE */}
              {skills && skills.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-extrabold text-[13px] uppercase tracking-[0.15em] text-gray-900 border-b border-gray-200 pb-1">
                    Habilidades
                  </h3>

                  <div className="space-y-2.5 text-[10px]">
                    {skills.map((skill) => (
                      <div key={skill.id} className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: accentColor }}></span>
                          <span className="font-bold text-gray-800">{skill.name}</span>
                        </div>
                        <p className="text-[9px] text-gray-500 pl-3.5 font-light">
                          Dominio profesional avanzado
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CONTACTO */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-[13px] uppercase tracking-[0.15em] text-gray-900 border-b border-gray-200 pb-1">
                  Contacto
                </h3>

                <div className="space-y-2.5 text-[11px] text-gray-700 font-light">
                  {personal?.location && (
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] text-white" style={{ backgroundColor: accentColor }}>📍</span>
                      <span className="truncate" style={{ maxWidth: '140px' }}>{personal.location}</span>
                    </div>
                  )}
                  {personal?.phone && (
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] text-white" style={{ backgroundColor: accentColor }}>📞</span>
                      <span className="whitespace-nowrap">{personal.phone}</span>
                    </div>
                  )}
                  {personal?.email && (
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] text-white" style={{ backgroundColor: accentColor }}>✉️</span>
                      <span className="truncate" style={{ maxWidth: '140px' }}>{personal.email}</span>
                    </div>
                  )}
                  {extras?.portfolio && (
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] text-white" style={{ backgroundColor: accentColor }}>🌐</span>
                      <span className="truncate" style={{ maxWidth: '140px' }}>{extras.portfolio}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* IDIOMAS Y REFERENCIAS (SI EXISTEN) */}
            {(languages || references) && (
              <div className="grid grid-cols-2 gap-4 pt-1">
                {languages && languages.length > 0 && (
                  <div className="space-y-1 text-[10px]">
                    <p className="font-bold text-gray-900 uppercase border-b border-gray-200 pb-0.5">Idiomas</p>
                    {languages.map((lang) => (
                      <div key={lang.id} className="flex justify-between text-gray-600">
                        <span>{lang.name}</span>
                        <span className="font-semibold" style={{ color: accentColor }}>{lang.level || 'Avanzado'}</span>
                      </div>
                    ))}
                  </div>
                )}

                {references && references.length > 0 && (
                  <div className="space-y-1 text-[10px]">
                    <p className="font-bold text-gray-900 uppercase border-b border-gray-200 pb-0.5">Referencias</p>
                    {references.slice(0, 1).map((ref) => (
                      <div key={ref.id} className="text-gray-600">
                        <p className="font-semibold text-gray-800">{ref.name}</p>
                        <p className="text-[9px]">{ref.position} - Tel: {ref.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* MATRIZ DE PUNTOS DECORATIVA EN ESQUINA INFERIOR DERECHA (FIEL A LA MUESTRA) */}
          <div className="flex justify-end pt-4 pb-2 pr-2">
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 24 }).map((_, i) => (
                <span 
                  key={i} 
                  className="w-1.5 h-1.5 rounded-full inline-block" 
                  style={{ backgroundColor: accentColor }}
                />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. PIE DE PÁGINA MÍNIMO Y LÍNEA DE ACENTO                                 */}
      {/* ========================================================================= */}
      <div className="w-full">
        <div className="h-1.5 w-full" style={{ backgroundColor: accentColor }}></div>
        <div className="p-2 px-8 flex justify-between items-center text-[9px] text-gray-400 tracking-widest uppercase bg-white">
          <span>Template Master Legacy Executive</span>
          <span>CVRD.DO — Exclusive Edition</span>
        </div>
      </div>

    </div>
  );
}