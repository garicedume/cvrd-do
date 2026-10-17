import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateBasico01({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex flex-col justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div className="flex flex-col h-full p-8 box-border justify-between">
        
        {/* ================= ENCABEZADO SUPERIOR ================= */}
        <div className="flex justify-between items-start border-b border-gray-300 pb-5">
          <div className="flex flex-col justify-center">
            {/* REGLA DE ORO 1: Tamaño exacto de 53px */}
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '53px' }}>
              <span className="font-extrabold text-gray-900 uppercase">{firstName}</span>
              <span className="font-light text-gray-500 uppercase">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest mt-2 text-gray-600">
              {personal?.title}
            </p>
          </div>

          {/* Contacto en la cabecera derecha */}
          <div className="text-[11px] text-gray-700 space-y-1.5 text-right">
            {personal?.phone && (
              <p className="flex items-center justify-end gap-2">
                <span>{personal.phone}</span>
                <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-[10px]">📞</span>
              </p>
            )}
            {personal?.email && (
              <p className="flex items-center justify-end gap-2">
                <span>{personal.email}</span>
                <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-[10px]">✉️</span>
              </p>
            )}
            {personal?.location && (
              <p className="flex items-center justify-end gap-2">
                <span>{personal.location}</span>
                <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-[10px]">📍</span>
              </p>
            )}
          </div>
        </div>

        {/* ================= CUERPO PRINCIPAL EN 2 COLUMNAS ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1 pt-4">
          
          {/* COLUMNA IZQUIERDA (Fondo gris suave) */}
          <div className="col-span-4 bg-gray-50 p-4 rounded-xl flex flex-col space-y-4 text-xs border border-gray-100">
            
            {/* REGLAS DE ORO 3 y 5: Foto con espacio y respiración adecuada */}
            {personal?.showPhoto && (
              <div className="flex justify-center my-3">
                <div 
                  className={`bg-gray-200 overflow-hidden border border-gray-300 shadow-sm flex items-center justify-center shrink-0 ${photoShapeClass}`}
                  style={{ width: '130px', height: '140px' }}
                >
                  {personal?.photoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-gray-400 font-bold">FOTO</span>
                  )}
                </div>
              </div>
            )}

            {/* Educación */}
            {education && education.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[11px]">
                  Educación
                </h3>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="text-gray-500 text-[9px] font-semibold">{edu.startDate} - {edu.endDate}</p>
                      <p className="font-bold text-gray-900 text-[11px]">{edu.degree}</p>
                      <p className="text-gray-600 text-[10px]">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Habilidades */}
            {skills && skills.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[11px]">
                  Habilidades
                </h3>
                <ul className="space-y-1.5 text-gray-700 text-[10px]">
                  {skills.map((skill) => (
                    <li key={skill.id} className="flex items-center font-medium uppercase">
                      <span className="mr-1.5 text-gray-400">•</span> {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Software con barras */}
            <div>
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[11px]">
                Software
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5 font-semibold text-gray-700">
                    <span>AI (Illustrator)</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: '#374151' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5 font-semibold text-gray-700">
                    <span>Ps (Photoshop)</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '80%', backgroundColor: '#374151' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5 font-semibold text-gray-700">
                    <span>Id (InDesign)</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '70%', backgroundColor: '#374151' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA (Contenido Principal) */}
          <div className="col-span-8 flex flex-col text-xs space-y-5 pl-2">
            
            {/* Perfil Profesional (REGLA DE ORO 6: Justificado) */}
            {profile && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[12px]">
                  Perfil Profesional
                </h3>
                <p className="text-gray-700 leading-relaxed font-normal text-[11px] text-justify">{profile}</p>
              </div>
            )}

            {/* Experiencia */}
            {experience && experience.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-900 text-[12px]">
                  Experiencia Laboral
                </h3>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[11px]">{exp.role} en {exp.company}</h4>
                        <span className="text-gray-500 font-semibold text-[10px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-[11px] mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Idiomas y Conocimientos Inferiores */}
            <div className="grid grid-cols-2 gap-6 pt-2 border-t border-gray-200 mt-auto">
              
              {/* Idiomas */}
              {languages && languages.length > 0 && (
                <div>
                  <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[11px]">
                    Idiomas
                  </h3>
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <div key={lang.id}>
                        <div className="flex justify-between text-[10px] mb-0.5">
                          <span className="font-semibold text-gray-800">{lang.name}</span>
                          <span className="text-gray-500">{lang.level}</span>
                        </div>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: '#374151' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conocimientos */}
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[11px]">
                  Conocimientos
                </h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="font-semibold text-gray-800">Diseño Web</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: '#374151' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="font-semibold text-gray-800">Diseño Gráfico</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: '#374151' }}></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ================= PIE DE PÁGINA ================= */}
        <div className="text-right text-[10px] text-gray-400 pt-3 border-t border-gray-200">
          CVRD.DO — Plantilla Básica 01
        </div>
      </div>
    </div>
  );
}