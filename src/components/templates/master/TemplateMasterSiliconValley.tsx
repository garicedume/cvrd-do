import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterSiliconValley({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // REGLAS DE ORO 7 Y 8: Color oscuro elegante para la columna lateral y acentos dinámicos
  const accentColor = styles?.accentColor || '#363738'; 
  const darkSidebarBg = '#363738';

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
      {/* 1. COLUMNA IZQUIERDA (36% ANCHO) - CABECERA CON FOTO, NOMBRE Y BARRA       */}
      {/* ========================================================================= */}
      <div className="w-[36%] h-full flex flex-col justify-between shrink-0 relative box-border bg-white border-r border-gray-100">
        
        {/* BLOQUE SUPERIOR OSCURO CON FOTO CIRCULAR EMBEBIDA */}
        <div 
          className="w-full relative flex justify-center pb-12 pt-6" 
          style={{ backgroundColor: darkSidebarBg, minHeight: '130px' }}
        >
          {personal?.showPhoto && (
            <div 
              className="absolute rounded-full overflow-hidden border-4 border-white shadow-xl flex items-center justify-center shrink-0 bg-gray-200"
              style={{ width: '150px', height: '150px', top: '35px' }}
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

        {/* NOMBRE Y CARGO (ENTRE FOTO Y BLOQUE OSCURO) */}
        <div className="w-full px-6 text-left space-y-1 bg-white" style={{ paddingTop: '75px', paddingBottom: '20px' }}>
          {/* REGLA DE ORO 1: NOMBRE A EXACTAMENTE 53px */}
          <h1 
            className="tracking-tight leading-none uppercase font-extrabold flex flex-col justify-center text-gray-900"
            style={{ fontSize: '53px' }}
          >
            <span className="block leading-none">{firstName}</span>
            {lastName && <span className="block font-light text-gray-700 leading-none mt-1">{lastName}</span>}
          </h1>

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 pt-2">
            {personal?.title || 'Marketing Digital'}
          </p>
        </div>

        {/* CONTENEDOR INFERIOR OSCURO (CONTACTO, HABILIDADES, IDIOMAS/SOFTWARE) */}
        <div 
          className="w-full p-6 flex-1 text-white flex flex-col justify-between space-y-4"
          style={{ backgroundColor: darkSidebarBg }}
        >
          <div className="space-y-5">
            
            {/* SECCIÓN: CONTACTO - TEXTO A 12px E ÍCONOS A 14px (REGLA DE ORO 2: 100% ESPAÑOL) */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-[12px] uppercase tracking-[0.15em] text-white border-b border-gray-600 pb-1">
                Contacto
              </h3>

              <div className="space-y-2 text-[12px] text-gray-300 font-light pt-1">
                {personal?.phone && (
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-[14px] text-white shrink-0">📞</span>
                    <span className="whitespace-nowrap">{personal.phone}</span>
                  </div>
                )}
                {personal?.email && (
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-[14px] text-white shrink-0">✉️</span>
                    <span className="truncate" style={{ maxWidth: '170px' }}>{personal.email}</span>
                  </div>
                )}
                {extras?.portfolio && (
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-[14px] text-white shrink-0">🌐</span>
                    <span className="truncate" style={{ maxWidth: '170px' }}>{extras.portfolio}</span>
                  </div>
                )}
                {personal?.location && (
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-[14px] text-white shrink-0">📍</span>
                    <span className="truncate" style={{ maxWidth: '170px' }}>{personal.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* SECCIÓN: HABILIDADES */}
            {skills && skills.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-extrabold text-[12px] uppercase tracking-[0.15em] text-white border-b border-gray-600 pb-1">
                  Habilidades
                </h3>

                <ul className="space-y-1.5 text-[10px] text-gray-300 font-medium">
                  {skills.map((skill) => (
                    <li key={skill.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SECCIÓN: IDIOMAS */}
            {languages && languages.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-extrabold text-[12px] uppercase tracking-[0.15em] text-white border-b border-gray-600 pb-1">
                  Idiomas
                </h3>

                <div className="space-y-1.5 text-[10px] text-gray-300">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center">
                      <span className="font-medium text-white">{lang.name}</span>
                      <span className="text-[9px] text-gray-400">{lang.level || 'Avanzado'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="text-[8.5px] text-gray-400 text-center tracking-widest uppercase pt-2 border-t border-gray-600">
            Silicon Valley Edition
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA PRINCIPAL (64% ANCHO) - PERFIL, EXPERIENCIA, EDU, REF  */}
      {/* ========================================================================= */}
      <div className="w-[64%] h-full flex flex-col justify-between p-8 bg-white box-border">
        
        <div className="flex flex-col space-y-6">
          
          {/* SECCIÓN: PERFIL PROFESIONAL (ESTANDARIZADO - REGLA DE ORO 6: JUSTIFICADO) */}
          {profile && (
            <div className="space-y-2">
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em] border-b border-gray-200 pb-1 text-gray-900"
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
            <div className="space-y-3">
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em] border-b border-gray-200 pb-1 text-gray-900"
              >
                Experiencia Laboral
              </h3>

              <div className="space-y-4 pt-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[11.5px] uppercase tracking-wide">
                        {exp.role}
                      </h4>
                      <span className="text-[10px] font-extrabold text-gray-900">
                        {exp.endDate.toLowerCase().includes('pres') ? 'Presente' : exp.endDate}
                      </span>
                    </div>

                    <p className="text-[10px] font-semibold text-gray-500">
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
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em] border-b border-gray-200 pb-1 text-gray-900"
              >
                Educación
              </h3>

              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-gray-900 text-[11px] uppercase leading-tight">
                        {edu.degree}
                      </h4>
                      <p className="text-[10px] text-gray-600 font-medium">
                        {edu.institution}
                      </p>
                    </div>

                    <span className="text-[10px] font-extrabold text-gray-900 shrink-0">
                      {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN: REFERENCIAS */}
          {references && references.length > 0 && (
            <div className="space-y-3">
              <h3 
                className="font-extrabold text-[13px] uppercase tracking-[0.15em] border-b border-gray-200 pb-1 text-gray-900"
              >
                Referencias
              </h3>

              <div className="grid grid-cols-2 gap-4 text-[10px]">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5">
                    <p className="font-bold text-gray-900 uppercase text-[10.5px]">{ref.name}</p>
                    <p className="text-gray-600 text-[9.5px]">{ref.position} {ref.company ? `- ${ref.company}` : ''}</p>
                    {ref.phone && <p className="text-gray-500 text-[9px]">Tel: {ref.phone}</p>}
                    {ref.email && <p className="text-gray-500 text-[9px]">Email: {ref.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* PIE DE PÁGINA MÍNIMO */}
        <div className="w-full pt-3 border-t border-gray-200 flex justify-between items-center text-[9.5px] text-gray-400 tracking-widest uppercase">
          <span>Template Master Silicon Valley</span>
          <span>CVRD.DO — Exclusive Edition</span>
        </div>

      </div>
    </div>
  );
}