import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateBasico02({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#374151';

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
        <div className="border-b-2 pb-5 mb-2" style={{ borderColor: accentColor }}>
          <div className="flex justify-between items-end">
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

            {/* Contacto horizontal en la cabecera */}
            <div className="text-[11px] text-gray-700 space-y-1 text-right pb-1">
              {personal?.phone && <p>📞 {personal.phone}</p>}
              {personal?.email && <p>✉️ {personal.email}</p>}
              {personal?.location && <p>📍 {personal.location}</p>}
            </div>
          </div>
        </div>

        {/* ================= CUERPO PRINCIPAL EN 2 COLUMNAS INVERTIDAS ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1 pt-2">
          
          {/* COLUMNA IZQUIERDA (Contenido Principal: Perfil y Experiencia) */}
          <div className="col-span-8 flex flex-col text-xs space-y-5 pr-2">
            
            {/* Perfil Profesional (REGLA DE ORO 6: Justificado) */}
            {profile && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Perfil Profesional
                </h3>
                <p className="text-gray-700 leading-relaxed font-normal text-[11px] text-justify">{profile}</p>
              </div>
            )}

            {/* Experiencia */}
            {experience && experience.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-3 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Experiencia Laboral
                </h3>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 pl-3" style={{ borderColor: accentColor }}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[11px]">{exp.role} <span className="text-gray-500">en {exp.company}</span></h4>
                        <span className="text-gray-500 font-semibold text-[10px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-[11px] mt-1 text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Idiomas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <div key={lang.id} className="bg-gray-50 p-2 rounded border border-gray-100">
                      <div className="flex justify-between text-[10px] mb-1 font-semibold text-gray-800">
                        <span>{lang.name}</span>
                        <span className="text-gray-500">{lang.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA (Barra Lateral: Foto, Educación, Habilidades) */}
          <div className="col-span-4 bg-gray-50 p-4 rounded-xl flex flex-col space-y-4 text-xs border border-gray-100">
            
            {/* REGLAS DE ORO 3, 5 y 9: Foto con espacio, respiración y tamaño 150px x 150px */}
            {personal?.showPhoto && (
              <div className="flex justify-center my-2">
                <div 
                  className={`bg-gray-200 overflow-hidden border-2 shadow-sm flex items-center justify-center shrink-0 ${photoShapeClass}`}
                  style={{ width: '150px', height: '150px', borderColor: accentColor }}
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
                <div className="space-y-2.5">
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
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between text-[10px] mb-0.5 font-semibold text-gray-700">
                        <span>{skill.name}</span>
                        {skill.level && <span className="text-[9px] text-gray-500">{skill.level}</span>}
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: accentColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= PIE DE PÁGINA ================= */}
        <div className="text-right text-[10px] text-gray-400 pt-3 border-t border-gray-200">
          CVRD.DO — Plantilla Básica Alternativa
        </div>
      </div>
    </div>
  );
}