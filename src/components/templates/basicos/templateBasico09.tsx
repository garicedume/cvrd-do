import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateBasico09({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#111827';

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
          top: '40px',
          left: '48px',
          right: '48px',
          bottom: '40px',
        }}
      >
        {/* ================= ENCABEZADO SUPERIOR ================= */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-5">
          <div className="flex flex-col justify-center">
            {/* Nombre a 55px imponente */}
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '55px' }}>
              <span className="font-extrabold text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-widest mt-2 text-gray-500" style={{ color: accentColor }}>
              {personal?.title || 'DISEÑADOR GRÁFICO'}
            </p>
          </div>

          {/* Contacto en la cabecera derecha */}
          <div className="text-[12px] text-gray-700 space-y-2 text-right">
            {phonesString && (
              <p className="flex items-center justify-end gap-2">
                <span className="break-words">{phonesString}</span>
                <span className="w-6 h-6 rounded-full text-white flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </span>
              </p>
            )}
            {emailsString && (
              <p className="flex items-center justify-end gap-2">
                <span className="break-all">{emailsString}</span>
                <span className="w-6 h-6 rounded-full text-white flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </span>
              </p>
            )}
            {locationsString && (
              <p className="flex items-center justify-end gap-2">
                <span className="break-words">{locationsString}</span>
                <span className="w-6 h-6 rounded-full text-white flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </span>
              </p>
            )}
            {extras?.customLinks && extras.customLinks.map((link, idx) => (
              <p key={idx} className="flex items-center justify-end gap-2">
                <span className="break-all">{link.label}: {link.url}</span>
                <span className="w-6 h-6 rounded-full text-white flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>🔗</span>
              </p>
            ))}
          </div>
        </div>

        {/* ================= CUERPO PRINCIPAL EN 2 COLUMNAS ================= */}
        <div className="grid grid-cols-12 gap-8 flex-1 pt-4 items-start">
          
          {/* COLUMNA IZQUIERDA (Foto 160x160px, Educación, Habilidades, Idiomas) */}
          <div className="col-span-4 flex flex-col border-r pr-6 border-gray-200 space-y-6">
            
            {/* Foto de perfil (160 x 160px) */}
            {personal?.showPhoto && (
              <div className="flex justify-center my-1">
                <div 
                  className={`bg-gray-100 overflow-hidden border-2 border-gray-300 shadow-sm flex items-center justify-center shrink-0 ${photoShapeClass}`}
                  style={{ width: '160px', height: '160px' }}
                >
                  {personal?.photoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
                  ) : (
                    <span className="text-[12px] text-gray-400 font-bold">FOTO</span>
                  )}
                </div>
              </div>
            )}

            {/* Educación */}
            {education && education.length > 0 && (
              <div className="text-[12px]">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1.5 mb-2.5 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Educación
                </h3>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <p className="font-bold text-gray-900 text-[12px]">{edu.degree}</p>
                      <p className="text-gray-600 text-[11.5px]">{edu.institution}</p>
                      <p className="text-gray-400 text-[11px] font-semibold">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Habilidades con barras */}
            {skills && skills.length > 0 && (
              <div className="text-[12px]">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1.5 mb-2.5 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Habilidades
                </h3>
                <ul className="space-y-2.5">
                  {skills.map((skill) => (
                    <li key={skill.id} className="text-gray-800 text-[12px]">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <div className="text-[12px] pr-2">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1.5 mb-2.5 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Idiomas
                </h3>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                      <span className="font-semibold text-gray-800 text-[12px]">{lang.name}</span>
                      <span className="text-gray-500 text-[11px] italic font-medium">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA (Perfil Profesional, Experiencia Laboral 100% limpia sin puntos, Referencias) */}
          <div className="col-span-8 flex flex-col text-[12px] space-y-6">
            
            {/* Perfil Profesional */}
            {profile && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1.5 mb-2.5 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Perfil Profesional
                </h3>
                <p className="text-gray-700 leading-relaxed font-normal text-[12px] text-justify">{profile}</p>
              </div>
            )}

            {/* Experiencia Laboral (Totalmente limpia y sin ningún punto flotante) */}
            {experience && experience.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1.5 mb-3 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Experiencia Laboral
                </h3>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[12px]">{exp.role}</h4>
                        <span className="text-gray-500 font-semibold text-[11px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="font-semibold text-gray-600 text-[12px]">{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[12px] text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referencias */}
            {references && references.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1.5 mb-3 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Referencias
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {references.map((ref) => (
                    <div key={ref.id} className="space-y-1 border-l-2 pl-3 py-0.5" style={{ borderColor: accentColor }}>
                      <p className="font-bold text-gray-900 text-[12px]">{ref.name}</p>
                      <p className="text-gray-600 text-[11.5px] font-medium">{ref.position} — {ref.company}</p>
                      <p className="text-gray-500 text-[11px]">Tel: {ref.phone}</p>
                      {ref.email && <p className="text-gray-500 text-[11px]">Correo: {ref.email}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= PIE DE PÁGINA ================= */}
        <div className="text-right text-[10px] text-gray-400 pt-3 border-t border-gray-200">
          CVRD.DO — Modern Grid Template
        </div>
      </div>
    </div>
  );
}