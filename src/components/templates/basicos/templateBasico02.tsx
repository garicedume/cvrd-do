import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMultisectorBase({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const accentColor = styles?.accentColor || '#00b4d8';

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const phonesString = [personal?.phone, personal?.secondaryPhone].filter(Boolean).join(' / ');
  const emailsString = [personal?.email, personal?.secondaryEmail].filter(Boolean).join(' / ');
  const locationsString = [personal?.location, personal?.locationLine2].filter(Boolean).join(', ');

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
          
          {/* Foto de perfil (160px x 160px con separación superior para que no choque) */}
          {personal?.showPhoto && (
            <div className="flex justify-center pt-4">
              <div 
                className={`overflow-hidden border-2 border-white shadow-md flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '160px', height: '160px' }}
              >
                {personal?.photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
                ) : (
                  <span className="text-xs text-gray-400 font-bold">FOTO</span>
                )}
              </div>
            </div>
          )}

          {/* Contacto con Iconos Planos Vectoriales */}
          <div className="text-[12px] space-y-2">
            <div 
              className="px-3 py-1.5 mb-3 font-bold uppercase tracking-wider text-white text-[12px] shadow-sm rounded"
              style={{ backgroundColor: accentColor }}
            >
              Contacto
            </div>
            <div className="space-y-2.5 text-gray-200">
              {phonesString && (
                <p className="flex items-start gap-2 break-all">
                  <span className="shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </span>
                  <span>{phonesString}</span>
                </p>
              )}
              {emailsString && (
                <p className="flex items-start gap-2 break-all">
                  <span className="shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </span>
                  <span>{emailsString}</span>
                </p>
              )}
              {locationsString && (
                <p className="flex items-start gap-2 break-all">
                  <span className="shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </span>
                  <span>{locationsString}</span>
                </p>
              )}
            </div>
          </div>

          {/* Educación */}
          {education && education.length > 0 && (
            <div className="text-[12px] space-y-2">
              <div 
                className="px-3 py-1.5 mb-3 font-bold uppercase tracking-wider text-white text-[12px] shadow-sm rounded"
                style={{ backgroundColor: accentColor }}
              >
                Educación
              </div>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-white text-[12px]">{edu.degree}</p>
                    <p className="text-gray-300 text-[11px]">{edu.startDate} - {edu.endDate} / {edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Habilidades */}
          {skills && skills.length > 0 && (
            <div className="text-[12px] space-y-2">
              <div 
                className="px-3 py-1.5 mb-3 font-bold uppercase tracking-wider text-white text-[12px] shadow-sm rounded"
                style={{ backgroundColor: accentColor }}
              >
                Habilidades
              </div>
              <ul className="space-y-1.5 text-gray-200 text-[12px]">
                {skills.map((skill) => (
                  <li key={skill.id} className="flex items-center">
                    <span className="mr-2 font-bold" style={{ color: accentColor }}>•</span> {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Idiomas */}
          {languages && languages.length > 0 && (
            <div className="text-[12px] space-y-2">
              <div 
                className="px-3 py-1.5 mb-3 font-bold uppercase tracking-wider text-white text-[12px] shadow-sm rounded"
                style={{ backgroundColor: accentColor }}
              >
                Idiomas
              </div>
              <ul className="space-y-1.5 text-gray-200 text-[12px]">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="text-gray-400 text-[11px]">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Enlaces y Extras (Sección 08 Dinámica) */}
          {extras?.customLinks && extras.customLinks.length > 0 && (
            <div className="text-[12px] space-y-2">
              <div 
                className="px-3 py-1.5 mb-3 font-bold uppercase tracking-wider text-white text-[12px] shadow-sm rounded"
                style={{ backgroundColor: accentColor }}
              >
                Enlaces
              </div>
              <div className="space-y-1.5 text-gray-200 text-[12px]">
                {extras.customLinks.map((link, idx) => (
                  <p key={idx} className="truncate">
                    🔗 <span className="font-semibold">{link.label}:</span> {link.url}
                  </p>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="text-[10px] text-gray-400 text-center pt-2">
          CVRD.DO
        </div>
      </div>

      {/* ================= COLUMNA DERECHA (Contenido Principal) ================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 bg-white">
        
        <div className="flex flex-col space-y-6">
          
          {/* Encabezado Principal */}
          <div className="border-b border-gray-200 pb-4">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '53px' }}>
              <span className="font-extrabold text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-widest mt-2" style={{ color: accentColor }}>
              {personal?.title}
            </p>
          </div>

          {/* Perfil Profesional */}
          {profile && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify font-normal text-[12px]">{profile}</p>
            </div>
          )}

          {/* Experiencia */}
          {experience && experience.length > 0 && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                Experiencia Laboral
              </h3>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <p className="text-gray-500 font-semibold text-[11px]">{exp.startDate} - {exp.endDate}</p>
                    <p className="font-semibold text-gray-600 text-[12px]">{exp.company}</p>
                    <h4 className="font-bold text-gray-900 text-[12px] mb-1">{exp.role}</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[12px] text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referencias */}
          {references && references.length > 0 && (
            <div className="text-[12px] pt-2">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                Referencias
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {references.map((ref) => (
                  <div key={ref.id} className="text-[12px] bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1">
                    <p className="font-bold text-gray-900">{ref.name}</p>
                    <p className="text-gray-600 text-[11px]">{ref.position} - {ref.company}</p>
                    <p className="text-gray-500 text-[11px]">Teléfono: {ref.phone}</p>
                    {ref.email && <p className="text-gray-500 text-[11px]">Correo: {ref.email}</p>}
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