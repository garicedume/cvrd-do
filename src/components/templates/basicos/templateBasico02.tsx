import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMultisectorBase({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#00b4d8'; // Azul brillante dinámico

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA IZQUIERDA (Fondo Oscuro) ================= */}
      <div 
        className="w-70 h-full flex flex-col justify-between p-6 text-white shrink-0 relative overflow-hidden"
        style={{ backgroundColor: '#2d3748' }}
      >
        <div className="flex flex-col space-y-6">
          
          {/* Foto de perfil */}
          {personal?.showPhoto && (
            <div className="flex justify-center pt-2">
              <div 
                className={`overflow-hidden border-2 border-white shadow-md flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '110px', height: '110px' }}
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

          {/* Contacto */}
          <div className="text-xs">
            <div 
              className="px-3 py-1.5 mb-3 font-bold uppercase tracking-wider text-white text-[11px] shadow-sm"
              style={{ backgroundColor: accentColor }}
            >
              Contacto
            </div>
            <div className="space-y-2 text-gray-200 text-[11px]">
              {personal?.phone && <p className="break-all">📞 {personal.phone}</p>}
              {personal?.email && <p className="break-all">✉️ {personal.email}</p>}
              {extras?.portfolio && <p className="break-all">🌐 {extras.portfolio}</p>}
              {personal?.location && <p className="break-all">📍 {personal.location}</p>}
            </div>
          </div>

          {/* Educación */}
          {education && education.length > 0 && (
            <div className="text-xs">
              <div 
                className="px-3 py-1.5 mb-3 font-bold uppercase tracking-wider text-white text-[11px] shadow-sm"
                style={{ backgroundColor: accentColor }}
              >
                Educación
              </div>
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-white text-[11px]">{edu.degree}</p>
                    <p className="text-gray-300 text-[10px]">{edu.startDate} - {edu.endDate} / {edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Habilidades */}
          {skills && skills.length > 0 && (
            <div className="text-xs">
              <div 
                className="px-3 py-1.5 mb-3 font-bold uppercase tracking-wider text-white text-[11px] shadow-sm"
                style={{ backgroundColor: accentColor }}
              >
                Habilidades
              </div>
              <ul className="space-y-1.5 text-gray-200 text-[11px]">
                {skills.map((skill) => (
                  <li key={skill.id} className="flex items-center">
                    <span className="mr-1.5">•</span> {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Idiomas */}
          {languages && languages.length > 0 && (
            <div className="text-xs">
              <div 
                className="px-3 py-1.5 mb-3 font-bold uppercase tracking-wider text-white text-[11px] shadow-sm"
                style={{ backgroundColor: accentColor }}
              >
                Idiomas
              </div>
              <ul className="space-y-1 text-gray-200 text-[11px]">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="text-gray-400">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        <div className="text-[9px] text-gray-400 text-center pt-2">
          CVRD.DO
        </div>
      </div>

      {/* ================= COLUMNA DERECHA (Contenido Principal) ================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 bg-white">
        
        <div className="flex flex-col space-y-6">
          
          {/* Encabezado Principal: REGLA DE ORO 1 (Nombre a 53px) */}
          <div className="border-b border-gray-200 pb-4">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '53px' }}>
              <span className="font-extrabold text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest mt-1.5 text-gray-500">
              {personal?.title}
            </p>
          </div>

          {/* Perfil Profesional: REGLA DE ORO 6 (Texto Justificado) */}
          {profile && (
            <div className="text-xs">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[12px]">
                Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify font-normal text-[11px]">{profile}</p>
            </div>
          )}

          {/* Experiencia */}
          {experience && experience.length > 0 && (
            <div className="text-xs">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-900 text-[12px]">
                Experiencia Laboral
              </h3>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <p className="text-gray-500 font-semibold text-[10px]">{exp.startDate} - {exp.endDate}</p>
                    <p className="font-semibold text-gray-600 text-[11px]">{exp.company}</p>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{exp.role}</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[11px] text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referencias */}
          {references && references.length > 0 && (
            <div className="text-xs pt-2">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[12px]">
                Referencias
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {references.map((ref) => (
                  <div key={ref.id} className="text-[11px]">
                    <p className="font-bold text-gray-900">{ref.name}</p>
                    <p className="text-gray-600 text-[10px]">{ref.position} - {ref.company}</p>
                    <p className="text-gray-500 text-[10px]">Teléfono: {ref.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Pie de página */}
        <div className="text-right text-[10px] text-gray-400 pt-2 border-t border-gray-100">
          CVRD.DO — Plantilla Multisector Base
        </div>
      </div>
    </div>
  );
}