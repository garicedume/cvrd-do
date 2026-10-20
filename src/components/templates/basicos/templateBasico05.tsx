import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateBasico05({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#4a5568';
  const sidebarBg = '#f3f4f6';

  const phonesString = [personal?.phone, personal?.secondaryPhone].filter(Boolean).join(' / ');
  const emailsString = [personal?.email, personal?.secondaryEmail].filter(Boolean).join(' / ');

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
        
        {/* ================= CABECERA SUPERIOR ================= */}
        <div className="grid grid-cols-12 gap-6 pb-4 relative items-center">
          
          {/* Izquierda: Nombre a 50px en línea horizontal */}
          <div className="col-span-7 flex flex-col justify-center">
            <h1 className="tracking-tight leading-tight uppercase text-gray-900 font-extrabold flex flex-wrap gap-x-2.5 items-baseline" style={{ fontSize: '50px' }}>
              <span className="font-extrabold text-gray-900">{firstName}</span>
              <span className="font-light text-gray-500">{lastName}</span>
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-widest mt-1" style={{ color: accentColor }}>
              {personal?.title || 'DISEÑADOR GRÁFICO'}
            </p>
            {profile && (
              <p className="text-gray-700 text-[12px] mt-1.5 leading-relaxed text-justify pr-4">
                {profile}
              </p>
            )}
          </div>

          {/* Derecha: Foto de perfil 160x160px */}
          <div 
            className="col-span-5 flex items-center justify-center p-3 rounded-3xl relative"
            style={{ backgroundColor: sidebarBg }}
          >
            {personal?.showPhoto && (
              <div 
                className={`overflow-hidden border-4 border-white shadow-md flex items-center justify-center shrink-0 ${photoShapeClass}`}
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
          </div>

        </div>

        {/* Línea divisoria */}
        <div className="w-full h-0.5 bg-gray-300 my-2"></div>

        {/* ================= CUERPO PRINCIPAL (2 Columnas) ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1 items-start pt-1">
          
          {/* COLUMNA IZQUIERDA (Educación, Habilidades, Experiencia) */}
          <div className="col-span-7 flex flex-col space-y-4 pr-4 text-[12px]">
            
            {/* Educación (Diseño en 2 filas: Título/Fecha arriba, Institución abajo) */}
            {education && education.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Educación
                </h3>
                <div className="space-y-2.5">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <div className="flex justify-between items-baseline">
                        <p className="font-bold text-gray-900 text-[12px]">{edu.degree}</p>
                        <p className="text-gray-500 font-semibold text-[11px]">{edu.startDate} - {edu.endDate}</p>
                      </div>
                      <p className="text-gray-600 text-[11.5px]">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Habilidades */}
            {skills && skills.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Habilidades
                </h3>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between text-[12px] mb-0.5 font-semibold text-gray-800">
                        <span>{skill.name}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experiencia Laboral (También alineada en 2 filas limpias) */}
            {experience && experience.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Experiencia Laboral
                </h3>
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div key={exp.id} className="space-y-0.5">
                      <div className="flex justify-between items-baseline">
                        <p className="font-bold text-gray-900 text-[12px]">{exp.role} — <span className="font-semibold text-gray-700">{exp.company}</span></p>
                        <p className="text-gray-500 font-semibold text-[11px]">{exp.startDate} - {exp.endDate}</p>
                      </div>
                      <p className="text-gray-700 text-[12px] leading-relaxed text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA (Contacto, Idiomas, Referencias) */}
          <div 
            className="col-span-5 p-4 rounded-2xl flex flex-col space-y-4 text-[12px] border border-gray-200"
            style={{ backgroundColor: sidebarBg }}
          >
            
            {/* Contacto */}
            <div>
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                Contacto
              </h3>
              <div className="space-y-2.5 text-gray-700 text-[12px]">
                {phonesString && (
                  <p className="flex items-center gap-2">
                    <span className="shrink-0" style={{ color: accentColor }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    </span>
                    <span className="wrap-break-word">{phonesString}</span>
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
                {personal?.location && (
                  <p className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5" style={{ color: accentColor }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </span>
                    <span className="leading-tight wrap-break-word">{personal.location}</span>
                  </p>
                )}
                {personal?.locationLine2 && (
                  <p className="flex items-start gap-2 pl-6">
                    <span className="leading-tight wrap-break-word text-gray-600">{personal.locationLine2}</span>
                  </p>
                )}
                {extras?.customLinks && extras.customLinks.map((link, idx) => (
                  <p key={idx} className="flex items-center gap-2">
                    <span className="shrink-0" style={{ color: accentColor }}>🔗</span>
                    <span className="break-all">{link.label}: {link.url}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Idiomas
                </h3>
                <div className="space-y-1.5 text-[12px]">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center bg-white px-3 py-1 rounded-lg border border-gray-200">
                      <span className="font-semibold text-gray-800">{lang.name}</span>
                      <span className="text-gray-600 font-bold tracking-wider text-[11px] bg-gray-100 px-2 py-0.5 rounded">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referencias */}
            {references && references.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Referencias
                </h3>
                <div className="space-y-2.5 pr-1">
                  {references.map((ref) => (
                    <div key={ref.id} className="bg-white p-3 rounded-lg border border-gray-200 space-y-0.5 shadow-2xs">
                      <p className="font-bold text-gray-900">{ref.name}</p>
                      <p className="text-gray-600 text-[11px]">{ref.position} - {ref.company}</p>
                      <p className="text-gray-500 text-[11px]">Tel: {ref.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= PIE DE PÁGINA ================= */}
        <div className="text-right text-[10px] text-gray-400 pt-2 border-t border-gray-200">
          CVRD.DO — Extra Standard 04 Template
        </div>
      </div>
    </div>
  );
}