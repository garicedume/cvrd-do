import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateBasico03({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const accentColor = styles?.accentColor || '#1f2937';

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const phonesString = [personal?.phone, personal?.secondaryPhone].filter(Boolean).join(' / ');
  const emailsString = [personal?.email, personal?.secondaryEmail].filter(Boolean).join(' / ');
  const locationsString = [personal?.location, personal?.locationLine2].filter(Boolean).join(', ');

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
        <div className="flex justify-between items-center border-b-2 border-gray-800 pb-5">
          <div className="flex flex-col justify-center">
            {/* Nombre llevado a 60px impactante */}
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '60px' }}>
              <span className="font-extrabold text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            
            {/* Elemento de diseño elegante llenando el espacio vacío */}
            <div className="flex items-center gap-2.5 mt-3">
              <span 
                className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-white shadow-xs"
                style={{ backgroundColor: accentColor }}
              >
                {personal?.title || 'PROFESIONAL DE ADMINISTRACIÓN'}
              </span>
              <div className="h-0.5 w-16 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Foto de perfil 160px x 160px */}
          {personal?.showPhoto && (
            <div 
              className={`bg-gray-200 overflow-hidden border border-gray-300 shadow-inner flex items-center justify-center shrink-0 ${photoShapeClass}`}
              style={{ width: '160px', height: '160px' }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
              ) : (
                <span className="text-[12px] text-gray-500 font-bold">FOTO</span>
              )}
            </div>
          )}
        </div>

        {/* ================= DATOS DE CONTACTO HORIZONTALES (Con respiro interior amplio) ================= */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-gray-50 px-6 py-4 rounded-xl border border-gray-200 text-[12px] text-gray-700 my-4 shadow-xs">
          {phonesString && (
            <p className="flex items-center gap-2 font-medium truncate">
              <span className="shrink-0" style={{ color: accentColor }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </span>
              <span className="truncate">{phonesString}</span>
            </p>
          )}
          {emailsString && (
            <p className="flex items-center gap-2 font-medium truncate">
              <span className="shrink-0" style={{ color: accentColor }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </span>
              <span className="truncate">{emailsString}</span>
            </p>
          )}
          {locationsString && (
            <p className="flex items-center gap-2 font-medium truncate">
              <span className="shrink-0" style={{ color: accentColor }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </span>
              <span className="truncate">{locationsString}</span>
            </p>
          )}
          {extras?.customLinks && extras.customLinks.map((link, idx) => (
            <p key={idx} className="flex items-center gap-2 font-medium truncate">
              <span className="shrink-0" style={{ color: accentColor }}>🔗</span>
              <span className="truncate">{link.label}: {link.url}</span>
            </p>
          ))}
        </div>

        {/* ================= CUERPO PRINCIPAL (2 Columnas con respiro) ================= */}
        <div className="grid grid-cols-12 gap-8 flex-1 pt-2 items-start">
          
          {/* COLUMNA IZQUIERDA (Habilidades, Idiomas, Educación) */}
          <div className="col-span-4 flex flex-col space-y-6 border-r border-gray-200 pr-5">
            
            {/* Habilidades */}
            {skills && skills.length > 0 && (
              <div className="text-[12px]">
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2.5 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Habilidades
                </h3>
                <ul className="space-y-2">
                  {skills.map((skill) => (
                    <li key={skill.id} className="text-gray-800 font-medium flex items-center">
                      <span className="mr-2 font-bold" style={{ color: accentColor }}>•</span> {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <div className="text-[12px]">
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2.5 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Idiomas
                </h3>
                <ul className="space-y-2.5">
                  {languages.map((lang) => (
                    <li key={lang.id} className="text-gray-800 font-medium flex justify-between items-center pr-2">
                      <span>{lang.name}</span>
                      <span className="text-gray-500 font-semibold bg-gray-100 px-2 py-0.5 rounded text-[11px]">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Educación */}
            {education && education.length > 0 && (
              <div className="text-[12px]">
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2.5 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Educación
                </h3>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <p className="font-bold text-gray-900 text-[12px]">{edu.degree}</p>
                      <p className="text-gray-600 text-[12px]">{edu.institution}</p>
                      <p className="text-gray-500 text-[11px] font-semibold">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA (Perfil, Experiencia y Referencias) */}
          <div className="col-span-8 flex flex-col text-[12px] space-y-6">
            
            {/* Perfil Profesional */}
            {profile && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Perfil Profesional
                </h3>
                <p className="text-gray-700 leading-relaxed font-normal text-[12px] text-justify">{profile}</p>
              </div>
            )}

            {/* Experiencia Laboral */}
            {experience && experience.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Experiencia Laboral
                </h3>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[12px]">{exp.role}</h4>
                        <span className="text-gray-500 font-semibold text-[11px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="font-bold text-gray-700 text-[12px]">{exp.company}</p>
                      <p className="text-gray-600 leading-relaxed text-[12px] whitespace-pre-line text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referencias */}
            {references && references.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Referencias
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {references.map((ref) => (
                    <div key={ref.id} className="text-[12px] bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
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

        </div>

        {/* Pie de página */}
        <div className="text-right text-[10px] text-gray-400 pt-3 border-t border-gray-200">
          CVRD.DO — Standard Clean Line Template
        </div>
      </div>
    </div>
  );
}