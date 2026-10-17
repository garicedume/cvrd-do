import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMasterQuantumData({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // REGLAS DE ORO 7 Y 8: Rojo/Rojo vino vibrante como acento primario y fondo oscuro carbón
  const accentColor = styles?.accentColor || '#ce181e';
  const darkHeaderBg = '#181717';
  const darkSidebarBg = '#121212';
  const headerRedBg = '#8b0000';

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
      {/* 1. COLUMNA IZQUIERDA (36% ANCHO) - FOTO, CONTACTO, EDUCACIÓN, HABILIDADES */}
      {/* ========================================================================= */}
      <div className="w-[36%] h-full flex flex-col justify-between shrink-0 relative box-border bg-gray-200">
        
        {/* ESQUINA SUPERIOR IZQUIERDA CON LÍNEAS DIAGONALES ROJAS */}
        <div className="w-full h-36 bg-gray-300 relative overflow-hidden flex items-center justify-center border-b border-gray-400">
          <div 
            className="absolute -top-10 -left-10 w-28 h-28 transform -rotate-45"
            style={{ backgroundColor: accentColor }}
          />
          <div 
            className="absolute -top-12 -left-4 w-28 h-8 transform -rotate-45 bg-white opacity-80"
          />

          {/* FOTO CIRCULAR O LOGO/FOTO SI ESTÁ ACTIVA (REGLAS 3, 5 Y 9: 150px x 150px) */}
          {personal?.showPhoto && (
            <div 
              className="rounded-full overflow-hidden border-4 border-white shadow-md z-10 bg-gray-700 flex items-center justify-center shrink-0"
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

        {/* BLOQUES OSCUROS DE INFORMACIÓN CON CABECERAS ROJAS */}
        <div 
          className="w-full flex-1 text-white flex flex-col justify-between space-y-3"
          style={{ backgroundColor: darkSidebarBg }}
        >
          <div className="space-y-3">
            
            {/* SECCIÓN: CONTACTO */}
            <div className="space-y-2">
              <div 
                className="w-full py-1.5 px-4 text-center font-bold text-[12px] uppercase tracking-widest text-white shadow-xs"
                style={{ backgroundColor: headerRedBg }}
              >
                Contacto
              </div>

              <div className="p-3 px-4 space-y-2 text-[12px] font-light text-gray-300">
                {personal?.phone && (
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-white shrink-0" style={{ backgroundColor: accentColor }}>📞</span>
                    <span className="whitespace-nowrap">{personal.phone}</span>
                  </div>
                )}
                {personal?.email && (
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-white shrink-0" style={{ backgroundColor: accentColor }}>✉️</span>
                    <span className="truncate" style={{ maxWidth: '170px' }}>{personal.email}</span>
                  </div>
                )}
                {personal?.location && (
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-white shrink-0" style={{ backgroundColor: accentColor }}>📍</span>
                    <span className="truncate" style={{ maxWidth: '170px' }}>{personal.location}</span>
                  </div>
                )}
                {extras?.portfolio && (
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-white shrink-0" style={{ backgroundColor: accentColor }}>🌐</span>
                    <span className="truncate" style={{ maxWidth: '170px' }}>{extras.portfolio}</span>
                  </div>
                )}
              </div>
            </div>

            {/* SECCIÓN: EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-2">
                <div 
                  className="w-full py-1.5 px-4 text-center font-bold text-[12px] uppercase tracking-widest text-white shadow-xs"
                  style={{ backgroundColor: headerRedBg }}
                >
                  Educación
                </div>

                <div className="p-3 px-4 space-y-2.5 text-[10px]">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <h4 className="font-bold text-white text-[10.5px] uppercase leading-tight">
                        {edu.degree}
                      </h4>
                      <p className="text-gray-300 font-medium text-[9.5px]">
                        {edu.institution}
                      </p>
                      <p className="text-gray-400 font-semibold text-[9px]">
                        ({edu.startDate} - {edu.endDate})
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN: HABILIDADES CON PUNTOS DE NIVEL ROJOS */}
            {skills && skills.length > 0 && (
              <div className="space-y-2">
                <div 
                  className="w-full py-1.5 px-4 text-center font-bold text-[12px] uppercase tracking-widest text-white shadow-xs"
                  style={{ backgroundColor: headerRedBg }}
                >
                  Habilidades
                </div>

                <div className="p-3 px-4 space-y-2 text-[9.5px]">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex justify-between items-center">
                      <span className="font-semibold text-gray-200 uppercase">{skill.name}</span>
                      <div className="flex gap-1">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <span 
                            key={i} 
                            className="w-1.5 h-1.5 rounded-full inline-block"
                            style={{ backgroundColor: i < 6 ? accentColor : '#4b5563' }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="p-3 text-[8.5px] text-gray-500 text-center tracking-widest uppercase border-t border-gray-800">
            CVRD.DO — Edition
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA PRINCIPAL (64% ANCHO) - NOMBRE, PERFIL Y EXPERIENCIA   */}
      {/* ========================================================================= */}
      <div className="w-[64%] h-full flex flex-col justify-between bg-white box-border relative">
        
        {/* BLOQUE SUPERIOR OSCURO DE ENCABEZADO CON NOMBRE A 53px Y PERFIL PROFESIONAL */}
        <div 
          className="w-full p-7 text-white space-y-3 relative shrink-0"
          style={{ backgroundColor: darkHeaderBg }}
        >
          {/* REGLA DE ORO 1: NOMBRE A EXACTAMENTE 53px */}
          <h1 
            className="tracking-tight leading-none uppercase font-black flex flex-wrap gap-x-3 items-baseline text-white"
            style={{ fontSize: '53px' }}
          >
            <span>{firstName}</span>
            <span style={{ color: accentColor }}>{lastName}</span>
          </h1>

          {/* CARGO ENMARCADO EN CAJA ROJA */}
          <div className="inline-block border border-red-600 px-3 py-1 bg-red-950/30">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              {personal?.title || 'Diseñador Gráfico / Director Creativo'}
            </p>
          </div>

          {/* SECCIÓN: PERFIL PROFESIONAL (REGLA DE ORO 6: ESTRICTAMENTE JUSTIFICADO) */}
          {profile && (
            <div className="space-y-1 pt-2">
              <h3 className="font-bold text-[11px] uppercase tracking-wider text-gray-300 border-b border-gray-700 pb-0.5">
                Perfil Profesional
              </h3>
              <p className="text-gray-300 leading-relaxed text-[10px] text-justify font-light">
                {profile}
              </p>
            </div>
          )}
        </div>

        {/* CONTENIDO DERECHO CON ENCABEZADOS EN CAJAS BORDEDAS */}
        <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
          
          {/* SECCIÓN: EXPERIENCIA LABORAL */}
          {experience && experience.length > 0 && (
            <div className="space-y-3">
              <div 
                className="w-full py-1.5 px-4 text-center font-extrabold text-[13px] uppercase tracking-[0.2em] text-gray-900 border-2"
                style={{ borderColor: headerRedBg }}
              >
                Experiencia Laboral
              </div>

              <div className="space-y-4 pt-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[11.5px] uppercase tracking-wide">
                        {exp.role}
                      </h4>
                      <span className="text-[9.5px] font-bold text-gray-400">
                        ({exp.startDate} - {exp.endDate})
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

          {/* SECCIÓN: REFERENCIAS */}
          {references && references.length > 0 && (
            <div className="space-y-3">
              <div 
                className="w-full py-1.5 px-4 text-center font-extrabold text-[13px] uppercase tracking-[0.2em] text-gray-900 border-2"
                style={{ borderColor: headerRedBg }}
              >
                Referencias
              </div>

              <div className="grid grid-cols-2 gap-4 text-[10px]">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5 border-l-2 pl-2.5" style={{ borderColor: accentColor }}>
                    <p className="font-bold text-gray-900 text-[10.5px]">{ref.name}</p>
                    <p className="text-gray-600 text-[9.5px]">{ref.position} {ref.company ? `- ${ref.company}` : ''}</p>
                    {ref.phone && <p className="text-gray-500 text-[9px]">Tel: {ref.phone}</p>}
                    {ref.email && <p className="text-gray-500 text-[9px]">Email: {ref.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IDIOMAS SI EXISTEN */}
          {languages && languages.length > 0 && (
            <div className="space-y-2 border-t border-gray-200 pt-2">
              <h3 className="font-bold text-[11px] uppercase text-gray-900">Idiomas</h3>
              <div className="grid grid-cols-2 gap-3 text-[10px] text-gray-700">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between border-b border-gray-100 pb-0.5">
                    <span className="font-semibold">{lang.name}</span>
                    <span className="text-gray-500">{lang.level || 'Avanzado'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ESQUINA INFERIOR DERECHA CON LÍNEAS DIAGONALES ROJAS DE LA MUESTRA */}
        <div className="absolute bottom-0 right-0 w-28 h-28 overflow-hidden pointer-events-none">
          <div 
            className="absolute -bottom-10 -right-10 w-28 h-28 transform -rotate-45"
            style={{ backgroundColor: accentColor }}
          />
          <div 
            className="absolute -bottom-12 -right-4 w-28 h-8 transform -rotate-45 bg-white opacity-80"
          />
        </div>

        {/* PIE DE PÁGINA MÍNIMO DERECHO */}
        <div className="p-3 px-7 border-t border-gray-200 flex justify-between items-center text-[9.5px] text-gray-400 tracking-widest uppercase bg-white relative z-10">
          <span>Template Master Quantum Data</span>
          <span>CVRD.DO — Exclusive Edition</span>
        </div>

      </div>
    </div>
  );
}