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
        <div className="flex justify-between items-center border-b-2 pb-5 mb-6" style={{ borderColor: accentColor }}>
          <div className="flex flex-col justify-center">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '48px' }}>
              <span className="font-extrabold text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest mt-2 text-gray-500 pl-0.5">
              {personal?.title}
            </p>
          </div>
          {personal?.showPhoto && (
            <div 
              className={`bg-gray-100 overflow-hidden border-2 shadow-sm flex items-center justify-center shrink-0 ${photoShapeClass}`}
              style={{ width: '130px', height: '130px', borderColor: accentColor }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-400 font-bold">FOTO</span>
              )}
            </div>
          )}
        </div>

        {/* Cuerpo Principal en 2 Columnas (Invertido estilo Corporate: Izq Educación/Experiencia, Der Contacto/Skills) */}
        <div className="grid grid-cols-12 gap-8 flex-1">
          
          {/* Columna Izquierda (Principal: Perfil, Experiencia, Educación) */}
          <div className="col-span-8 flex flex-col text-xs" style={{ gap: '18px' }}>
            {profile && (
              <div>
                <div 
                  className="px-3 py-1 mb-2 font-bold uppercase tracking-wider text-white text-[11px]" 
                  style={{ backgroundColor: accentColor }}
                >
                  Perfil Profesional
                </div>
                <p className="text-gray-700 leading-relaxed font-normal">{profile}</p>
              </div>
            )}

            {experience && experience.length > 0 && (
              <div>
                <div 
                  className="px-3 py-1 mb-2 font-bold uppercase tracking-wider text-white text-[11px]" 
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
                      <p className="font-semibold text-gray-600 mb-1">{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {education && education.length > 0 && (
              <div>
                <div 
                  className="px-3 py-1 mb-2 font-bold uppercase tracking-wider text-white text-[11px]" 
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
          </div>

          {/* Columna Derecha (Lateral: Contacto, Habilidades, Idiomas) */}
          <div className="col-span-4 flex flex-col border-l pl-6 border-gray-200" style={{ gap: '25px' }}>
            
            {/* Contacto */}
            <div className="text-xs">
              <div 
                className="px-3 py-1 mb-2 font-bold uppercase tracking-wider text-white text-[11px]" 
                style={{ backgroundColor: accentColor }}
              >
                Contacto
              </div>
              
              {personal?.phone && (
                <p className="mb-1.5 text-gray-700 break-all">📞 {personal.phone}</p>
              )}
              {personal?.secondaryPhone && (
                <p className="mb-1.5 text-gray-500 break-all">📞 {personal.secondaryPhone}</p>
              )}

              {personal?.email && (
                <p className="mb-1.5 text-gray-700 break-all">✉️ {personal.email}</p>
              )}
              {personal?.secondaryEmail && (
                <p className="mb-1.5 text-gray-500 break-all">✉️ {personal.secondaryEmail}</p>
              )}

              {personal?.location && (
                <p className="mb-1.5 text-gray-700">📍 {personal.location}</p>
              )}
              {personal?.locationLine2 && (
                <p className="mb-1.5 text-gray-500 pl-4">{personal.locationLine2}</p>
              )}

              {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
                (extras.customLinks as CustomLink[]).map((link, idx) => (
                  <div key={idx} className="mb-1.5 text-gray-700 break-all">
                    <span className="font-bold text-gray-900 block">🔗 {link?.label || 'Enlace'}:</span>
                    <span className="block">{link?.url}</span>
                  </div>
                ))
              ) : (
                <>
                  {extras?.linkedin && <p className="mb-1.5 text-gray-700 break-all">🔗 {extras.linkedin}</p>}
                  {extras?.portfolio && <p className="mb-1.5 text-gray-700 break-all">🌐 {extras.portfolio}</p>}
                </>
              )}
            </div>

            {/* Habilidades */}
            {skills && skills.length > 0 && (
              <div className="text-xs">
                <div 
                  className="px-3 py-1 mb-2 font-bold uppercase tracking-wider text-white text-[11px]" 
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
                  className="px-3 py-1 mb-2 font-bold uppercase tracking-wider text-white text-[11px]" 
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