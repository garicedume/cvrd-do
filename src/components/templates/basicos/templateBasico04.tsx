import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateBasico04({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#1a1a1a';
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
      {/* ================= COLUMNA IZQUIERDA (Barra Lateral) ================= */}
      <div className="w-75 h-full flex flex-col shrink-0 relative border-r border-gray-200">
        
        {/* Parte Superior (Fondo Blanco) */}
        <div className="p-6 bg-white flex flex-col items-center text-center border-b border-gray-200">
          {personal?.showPhoto && (
            <div 
              className={`bg-gray-100 overflow-hidden border border-gray-300 shadow-sm flex items-center justify-center shrink-0 mb-4 ${photoShapeClass}`}
              style={{ width: '160px', height: '160px' }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
              ) : (
                <span className="text-[12px] text-gray-400 font-bold">FOTO</span>
              )}
            </div>
          )}

          {/* Nombre en BOLD y Apellido en LIGHT (Estilo corporativo unificado) */}
          <h1 className="tracking-tight leading-tight uppercase text-left w-full wrap-break-word" style={{ fontSize: fullNameStr.length > 15 ? '22px' : '26px' }}>
            <span className="font-extrabold text-gray-900">{firstName}</span>{' '}
            <span className="font-light text-gray-500">{lastName}</span>
          </h1>
          <div className="w-full h-0.5 bg-gray-900 my-3"></div>
          <p className="text-[12px] font-bold uppercase tracking-widest text-gray-600 text-left w-full" style={{ color: accentColor }}>
            {personal?.title || 'DISEÑADOR UI / UX'}
          </p>
        </div>

        {/* Parte Inferior (Fondo Oscuro) */}
        <div 
          className="flex-1 p-6 flex flex-col justify-between text-white"
          style={{ backgroundColor: '#1a1a1a' }}
        >
          <div className="space-y-6">
            
            {/* Perfil */}
            {profile && (
              <div>
                <h3 className="font-bold uppercase tracking-wider text-[12px] border-b border-gray-700 pb-1.5 mb-2.5 text-white">
                  Perfil
                </h3>
                <p className="text-gray-300 leading-relaxed text-[12px] text-justify">
                  {profile}
                </p>
              </div>
            )}

            {/* Contacto */}
            <div>
              <h3 className="font-bold uppercase tracking-wider text-[12px] border-b border-gray-700 pb-1.5 mb-2.5 text-white">
                Contacto
              </h3>
              <div className="space-y-3 text-[12px] text-gray-300 pt-1">
                {phonesString && (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-gray-400 shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    </span>
                    <div>
                      <span className="font-bold text-gray-400 block text-[10px] uppercase">Teléfono</span>
                      <span>{phonesString}</span>
                    </div>
                  </div>
                )}
                {emailsString && (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-gray-400 shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </span>
                    <div>
                      <span className="font-bold text-gray-400 block text-[10px] uppercase">Correo</span>
                      <span className="break-all">{emailsString}</span>
                    </div>
                  </div>
                )}
                {locationsString && (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-gray-400 shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </span>
                    <div>
                      <span className="font-bold text-gray-400 block text-[10px] uppercase">Ubicación</span>
                      <span>{locationsString}</span>
                    </div>
                  </div>
                )}
                {extras?.customLinks && extras.customLinks.map((link, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="mt-0.5 text-gray-400 shrink-0">🔗</span>
                    <div>
                      <span className="font-bold text-gray-400 block text-[10px] uppercase">{link.label}</span>
                      <span className="break-all">{link.url}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider text-[12px] border-b border-gray-700 pb-1.5 mb-2.5 text-white">
                  Idiomas
                </h3>
                <div className="space-y-2 text-[12px]">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center text-gray-300">
                      <span>{lang.name}</span>
                      <span className="text-gray-400 bg-gray-800 px-2 py-0.5 rounded text-[11px] font-semibold">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="text-[10px] text-gray-500 text-center pt-4">
            CVRD.DO
          </div>
        </div>

      </div>

      {/* ================= COLUMNA DERECHA (Contenido Principal) ================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 bg-white">
        
        <div className="flex flex-col space-y-6">
          
          {/* Experiencia Laboral */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1.5 mb-4 text-[13px]">
              Experiencia Laboral
            </h3>
            
            <div className="space-y-4">
              {experience && experience.length > 0 ? (
                experience.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-12 gap-3 text-[12px]">
                    <div className="col-span-4 text-gray-500 text-[11px]">
                      <p className="font-bold text-gray-800">{exp.company}</p>
                      <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <div className="col-span-8 space-y-1">
                      <h4 className="font-bold text-gray-900 text-[12px]">{exp.role}</h4>
                      <p className="text-gray-700 text-[12px] mt-0.5 text-justify leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400">No hay experiencia registrada.</p>
              )}
            </div>
          </div>

          {/* Habilidades */}
          {skills && skills.length > 0 && (
            <div>
              <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1.5 mb-3 text-[13px]">
                Habilidades
              </h3>
              <div className="space-y-2.5 text-[12px]">
                {skills.map((skill) => (
                  <div key={skill.id} className="grid grid-cols-12 items-center gap-3">
                    <span className="col-span-4 text-gray-800 font-medium truncate">{skill.name}</span>
                    <div className="col-span-8 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gray-900 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Educación */}
          {education && education.length > 0 && (
            <div>
              <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1.5 mb-3 text-[13px]">
                Educación
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="grid grid-cols-12 gap-3 text-[12px]">
                    <div className="col-span-4 text-gray-500 text-[11px]">
                      <p className="font-bold text-gray-800">{edu.institution}</p>
                      <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    <div className="col-span-8">
                      <h4 className="font-bold text-gray-900 text-[12px]">{edu.degree}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referencias */}
          {references && references.length > 0 && (
            <div>
              <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1.5 mb-3 text-[13px]">
                Referencias
              </h3>
              <div className="grid grid-cols-2 gap-4 text-[12px]">
                {references.map((ref) => (
                  <div key={ref.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1">
                    <p className="font-bold text-gray-900">{ref.name}</p>
                    <p className="text-gray-600 text-[11px]">{ref.position} - {ref.company}</p>
                    <p className="text-gray-700 text-[11px]">Tel: {ref.phone}</p>
                    {ref.email && <p className="text-gray-700 text-[11px]">Correo: {ref.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Pie de página */}
        <div className="text-right text-[10px] text-gray-400 pt-3 border-t border-gray-100">
          CVRD.DO — Template Tech Focused
        </div>
      </div>
    </div>
  );
}