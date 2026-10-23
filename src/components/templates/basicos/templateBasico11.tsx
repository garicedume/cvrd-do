import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

interface CustomLink {
  label?: string;
  url?: string;
  urlLine2?: string;
}

export default function TemplateCorporateStandard({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#374151'; // Gris corporativo / Neutro elegante

  const phonesString = [personal?.phone, personal?.secondaryPhone].filter(Boolean).join(' / ');
  const emailsString = [personal?.email, personal?.secondaryEmail].filter(Boolean).join(' / ');
  const locationsString = [personal?.location, personal?.locationLine2].filter(Boolean).join(', ');

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div 
        className="absolute box-border flex flex-col justify-between"
        style={{
          top: '48px',
          left: '48px',
          right: '48px',
          bottom: '48px',
        }}
      >
        {/* Encabezado Corporativo */}
        <div className="flex justify-between items-center border-b-2 pb-5 mb-5" style={{ borderColor: accentColor }}>
          <div className="flex flex-col justify-center">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '48px' }}>
              <span className="font-extrabold text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest mt-2 text-gray-500 pl-0.5">
              {personal?.title || 'DISEÑADOR GRÁFICO'}
            </p>
          </div>
          {personal?.showPhoto && (
            <div 
              className={`bg-gray-100 overflow-hidden border-2 shadow-sm flex items-center justify-center shrink-0 ml-4 ${photoShapeClass}`}
              style={{ width: '160px', height: '160px', borderColor: accentColor }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
              ) : (
                <span className="text-xs text-gray-400 font-bold">FOTO</span>
              )}
            </div>
          )}
        </div>

        {/* Cuerpo Principal en 2 Columnas (Estilo Corporate) */}
        <div className="grid grid-cols-12 gap-8 flex-1 items-start">
          
          {/* Columna Izquierda (Principal: Perfil Profesional, Experiencia Laboral, Educación, Referencias) */}
          <div className="col-span-8 flex flex-col text-xs space-y-4">
            
            {/* Perfil Profesional */}
            {profile && (
              <div>
                <div 
                  className="px-3 py-1 mb-1.5 font-bold uppercase tracking-wider text-white text-[11px]" 
                  style={{ backgroundColor: accentColor }}
                >
                  Perfil Profesional
                </div>
                <p className="text-gray-700 leading-relaxed font-normal text-justify">{profile}</p>
              </div>
            )}

            {/* Experiencia Laboral */}
            {experience && experience.length > 0 && (
              <div>
                <div 
                  className="px-3 py-1 mb-1.5 font-bold uppercase tracking-wider text-white text-[11px]" 
                  style={{ backgroundColor: accentColor }}
                >
                  Experiencia Laboral
                </div>
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 pl-3 py-0.5" style={{ borderColor: accentColor }}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-sm">{exp.role}</h4>
                        <span className="text-gray-500 font-semibold">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="font-semibold text-gray-600 mb-0.5">{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Educación */}
            {education && education.length > 0 && (
              <div>
                <div 
                  className="px-3 py-1 mb-1.5 font-bold uppercase tracking-wider text-white text-[11px]" 
                  style={{ backgroundColor: accentColor }}
                >
                  Educación & Formación
                </div>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="font-bold text-gray-900">{edu.degree}</p>
                      <p className="text-gray-600">{edu.institution} <span className="text-gray-400">({edu.startDate} - {edu.endDate})</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referencias (Visibles, editables y ordenadas) */}
            {references && references.length > 0 && (
              <div>
                <div 
                  className="px-3 py-1 mb-1.5 font-bold uppercase tracking-wider text-white text-[11px]" 
                  style={{ backgroundColor: accentColor }}
                >
                  Referencias
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {references.map((ref) => (
                    <div key={ref.id} className="bg-gray-50 p-2.5 rounded border border-gray-100 space-y-0.5">
                      <p className="font-bold text-gray-900">{ref.name}</p>
                      <p className="text-gray-600 text-[11px]">{ref.position} - {ref.company}</p>
                      <p className="text-gray-500 text-[11px]">Tel: {ref.phone}</p>
                      {ref.email && <p className="text-gray-500 text-[11px]">Correo: {ref.email}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Columna Derecha (Lateral: Contacto con iconos planos, Habilidades, Idiomas) */}
          <div className="col-span-4 flex flex-col border-l pl-6 border-gray-200 space-y-5">
            
            {/* Contacto con iconos planos vectoriales */}
            <div className="text-xs">
              <div 
                className="px-3 py-1 mb-2.5 font-bold uppercase tracking-wider text-white text-[11px]" 
                style={{ backgroundColor: accentColor }}
              >
                Contacto
              </div>
              
              <div className="space-y-2.5 text-gray-700 text-[12px]">
                {phonesString && (
                  <p className="flex items-center gap-2">
                    <span className="shrink-0" style={{ color: accentColor }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    </span>
                    <span className="break-all">{phonesString}</span>
                  </p>
                )}
                {emailsString && (
                  <p className="flex items-center gap-2">
                    <span className="shrink-0" style={{ color: accentColor }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </span>
                    <span className="break-all">{emailsString}</span>
                  </p>
                )}
                {locationsString && (
                  <p className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5" style={{ color: accentColor }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </span>
                    <span className="wrap-break-word">{locationsString}</span>
                  </p>
                )}
                {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
                  (extras.customLinks as CustomLink[]).map((link, idx) => (
                    <p key={idx} className="flex items-center gap-2">
                      <span className="shrink-0" style={{ color: accentColor }}>🔗</span>
                      <span className="break-all"><strong className="text-gray-900">{link?.label || 'Enlace'}:</strong> {link?.url}</span>
                    </p>
                  ))
                ) : (
                  <>
                    {extras?.linkedin && (
                      <p className="flex items-center gap-2">
                        <span className="shrink-0" style={{ color: accentColor }}>🔗</span>
                        <span className="break-all">{extras.linkedin}</span>
                      </p>
                    )}
                    {extras?.portfolio && (
                      <p className="flex items-center gap-2">
                        <span className="shrink-0" style={{ color: accentColor }}>🌐</span>
                        <span className="break-all">{extras.portfolio}</span>
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Habilidades */}
            {skills && skills.length > 0 && (
              <div className="text-xs">
                <div 
                  className="px-3 py-1 mb-2.5 font-bold uppercase tracking-wider text-white text-[11px]" 
                  style={{ backgroundColor: accentColor }}
                >
                  Habilidades
                </div>
                <ul className="flex flex-col gap-1.5">
                  {skills.map((skill) => (
                    <li key={skill.id} className="text-gray-800 font-medium flex items-center justify-between">
                      <span>• {skill.name}</span>
                      {skill.level && <span className="text-[10px] text-gray-400">{skill.level}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <div className="text-xs">
                <div 
                  className="px-3 py-1 mb-2.5 font-bold uppercase tracking-wider text-white text-[11px]" 
                  style={{ backgroundColor: accentColor }}
                >
                  Idiomas
                </div>
                <ul className="flex flex-col gap-1.5">
                  {languages.map((lang) => (
                    <li key={lang.id} className="text-gray-800 font-medium flex justify-between">
                      <span>{lang.name}</span>
                      <span className="text-gray-500">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="text-right text-[10px] text-gray-400 pt-2 border-t">
          CVRD.DO — Corporate Standard Template
        </div>
      </div>
    </div>
  );
}