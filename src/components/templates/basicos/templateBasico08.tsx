import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateBasico08({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = '#00b4d8'; // Azul cian brillante original respetado al 100%
  const darkSidebarBg = '#33383d'; // Gris carbón original de la barra lateral

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
      <div className="flex flex-col h-full p-6 box-border justify-between">
        
        {/* ================= PARTE SUPERIOR (2 Columnas) ================= */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* COLUMNA IZQUIERDA (Gris Oscuro con acento azul) */}
          <div 
            className="col-span-4 p-4 rounded-2xl flex flex-col space-y-4 text-white relative overflow-hidden text-[12px]"
            style={{ backgroundColor: darkSidebarBg }}
          >
            {/* Franja decorativa azul izquierda */}
            <div className="absolute left-0 top-0 bottom-0 w-3" style={{ backgroundColor: accentColor }}></div>

            {/* Foto de perfil de 160x160px con buen respiro */}
            {personal?.showPhoto && (
              <div className="flex justify-center pl-2 pt-2">
                <div 
                  className={`bg-gray-200 overflow-hidden border-2 border-white shadow-md flex items-center justify-center shrink-0 ${photoShapeClass}`}
                  style={{ width: '160px', height: '160px' }}
                >
                  {personal?.photoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
                  ) : (
                    <span className="text-[12px] text-gray-600 font-bold">FOTO</span>
                  )}
                </div>
              </div>
            )}

            {/* Contacto con iconos planos y separación adecuada */}
            <div className="pl-3 space-y-2 pt-1">
              <div className="inline-block px-3.5 py-1 rounded-full text-white font-bold uppercase text-[11px] tracking-wider mb-2 shadow-xs" style={{ backgroundColor: accentColor }}>
                Contacto
              </div>
              <div className="space-y-2.5 text-gray-300 text-[12px]">
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
                    <span className="break-all">{locationsString}</span>
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

            {/* Idiomas (Aprovechado correctamente para eliminar el warning de variable no usada) */}
            {languages && languages.length > 0 && (
              <div className="pl-3 space-y-2 pt-1">
                <div className="inline-block px-3.5 py-1 rounded-full text-white font-bold uppercase text-[11px] tracking-wider mb-2 shadow-xs" style={{ backgroundColor: accentColor }}>
                  Idiomas
                </div>
                <div className="space-y-1.5 text-gray-300 text-[12px]">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center pr-2">
                      <span>{lang.name}</span>
                      <span className="text-gray-400 text-[11px] font-semibold">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referencias Personales visibles y editables */}
            {references && references.length > 0 && (
              <div className="pl-3 space-y-2 pt-1 pb-2">
                <h3 className="font-bold uppercase tracking-wider mb-2 text-[12px]" style={{ color: accentColor }}>
                  Referencias
                </h3>
                <div className="space-y-2.5 text-gray-300 text-[12px]">
                  {references.map((ref) => (
                    <div key={ref.id} className="space-y-0.5">
                      <p className="font-bold text-white uppercase text-[12px]">{ref.name}</p>
                      <p className="text-[11.5px] text-gray-400">{ref.position} - {ref.company}</p>
                      <p className="text-[11.5px] text-gray-400">Tel: {ref.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA (Nombre, Perfil Profesional, Experiencia Laboral) */}
          <div className="col-span-8 flex flex-col space-y-4 pt-1">
            
            {/* Encabezado Principal */}
            <div className="border-b border-gray-200 pb-4 mt-1">
              <h1 className="tracking-tight leading-none uppercase text-3xl flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '42px' }}>
                <span className="font-extrabold" style={{ color: accentColor }}>{firstName}</span>
                <span className="font-light text-gray-700">{lastName}</span>
              </h1>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] mt-2 text-gray-600">
                {personal?.title || 'DISEÑADOR GRÁFICO Y WEB'}
              </p>
            </div>

            {/* Perfil Profesional */}
            {profile && (
              <div className="text-[12px]">
                <div className="inline-block px-4 py-1 rounded-full text-white font-bold uppercase text-[11px] tracking-wider mb-2 shadow-xs" style={{ backgroundColor: accentColor }}>
                  Perfil Profesional
                </div>
                <p className="text-gray-700 leading-relaxed font-normal text-[12px] text-justify">
                  {profile}
                </p>
              </div>
            )}

            {/* Experiencia Laboral */}
            {experience && experience.length > 0 && (
              <div className="text-[12px]">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-3 h-3 rounded-full bg-gray-800"></span>
                  <h3 className="font-bold uppercase tracking-wider text-[12px]" style={{ color: accentColor }}>
                    Experiencia Laboral
                  </h3>
                </div>
                
                <div className="space-y-3.5 relative pl-4 border-l-2 ml-1" style={{ borderColor: accentColor }}>
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative space-y-1">
                      <div className="absolute -left-5.25 top-1 w-2.5 h-2.5 rounded-full bg-gray-800 border-2 border-white"></div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[12px] uppercase">{exp.role}</h4>
                        <span className="font-bold text-[11px]" style={{ color: accentColor }}>{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-gray-600 text-[12px] font-semibold">{exp.company}</p>
                      <p className="text-gray-700 text-[12px] mt-0.5 text-justify leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= FRANJA CENTRAL (Educación) ================= */}
        {education && education.length > 0 && (
          <div className="bg-gray-800 text-white p-4 rounded-2xl my-3 text-center relative text-[12px]">
            <div className="inline-block px-6 py-1 rounded-full text-white font-bold uppercase text-[11px] tracking-wider mb-3 shadow-xs" style={{ backgroundColor: accentColor }}>
              Educación
            </div>
            <div className="grid grid-cols-3 gap-4 text-center text-[12px]">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5 px-2">
                  <p className="font-bold uppercase text-[12px]" style={{ color: accentColor }}>{edu.degree}</p>
                  <p className="text-gray-300 font-semibold text-[11.5px]">{edu.institution}</p>
                  <p className="font-bold text-[11px] mt-1" style={{ color: accentColor }}>{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= FRANJA INFERIOR (Habilidades y Pasatiempos) ================= */}
        <div className="grid grid-cols-12 gap-6 pt-1 text-[12px]">
          
          {/* Habilidades */}
          {skills && skills.length > 0 && (
            <div className="col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="font-black uppercase tracking-widest text-[12px]" style={{ color: accentColor }}>HABILIDADES</span>
              </div>
              <div className="space-y-2.5">
                {skills.map((skill) => (
                  <div key={skill.id} className="grid grid-cols-12 items-center gap-3">
                    <span className="col-span-5 font-semibold text-gray-800 text-[12px] truncate">{skill.name}</span>
                    <div className="col-span-7 flex items-center">
                      <div className="flex-1 bg-gray-200 h-2 rounded-full relative overflow-hidden">
                        <div className="absolute h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pasatiempos / Hobbies */}
          <div className="col-span-5 flex flex-col justify-center border-l border-gray-200 pl-6">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="font-black uppercase tracking-widest text-[12px]" style={{ color: accentColor }}>PASATIEMPOS</span>
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-gray-700 font-medium text-[12px]">
              <p>• Redacción</p>
              <p>• Lectura</p>
              <p>• Fútbol</p>
              <p>• Fotografía</p>
              <p>• Viajes</p>
            </div>
          </div>

        </div>

        {/* Pie de página */}
        <div className="text-right text-[10px] text-gray-400 pt-2 border-t border-gray-100">
          CVRD.DO — Extra Standard 07 Template
        </div>
      </div>
    </div>
  );
}