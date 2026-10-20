import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateBasico07({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = '#38bdf8'; // Azul brillante original de la plantilla

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
      {/* ================= COLUMNA IZQUIERDA ================= */}
      <div 
        className="w-[300px] h-full flex flex-col justify-between p-6 shrink-0 relative border-r border-gray-200"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="flex flex-col space-y-6 pt-2">
          
          {/* Foto de perfil de 160x160px */}
          {personal?.showPhoto && (
            <div className="flex justify-center pt-2">
              <div 
                className={`bg-gray-100 overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center shrink-0 ${photoShapeClass}`}
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

          {/* Contacto con iconos planos y buen respiro */}
          <div className="text-[12px] space-y-2.5 border-b border-gray-200 pb-5">
            {phonesString && (
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full text-white flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </span>
                <span className="text-gray-700 font-medium break-words">{phonesString}</span>
              </div>
            )}
            {emailsString && (
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full text-white flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </span>
                <span className="text-gray-700 font-medium break-all">{emailsString}</span>
              </div>
            )}
            {locationsString && (
              <div className="flex items-start gap-2.5">
                <span className="w-7 h-7 rounded-full text-white flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: accentColor }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </span>
                <span className="text-gray-700 font-medium break-words">{locationsString}</span>
              </div>
            )}
            {extras?.customLinks && extras.customLinks.map((link, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full text-white flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>🔗</span>
                <span className="text-gray-700 font-medium break-all">{link.label}: {link.url}</span>
              </div>
            ))}
          </div>

          {/* Idiomas */}
          {languages && languages.length > 0 && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1.5 mb-3 text-[12px]" style={{ borderColor: accentColor }}>
                Idiomas
              </h3>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-gray-800 text-[12px]">{lang.name}</span>
                      <span className="text-gray-600 font-bold text-[11px] bg-gray-100 px-2 py-0.5 rounded">{lang.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Habilidades */}
          {skills && skills.length > 0 && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1.5 mb-3 text-[12px]" style={{ borderColor: accentColor }}>
                Habilidades
              </h3>
              <div className="space-y-2 text-[12px] text-gray-700 font-medium">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center bg-gray-50 px-2.5 py-1 rounded border border-gray-200">
                    <span>{skill.name}</span>
                    <span className="font-bold" style={{ color: accentColor }}>●●●●●○</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="text-[10px] text-gray-400 text-center pb-2">
          CVRD.DO
        </div>
      </div>

      {/* ================= COLUMNA DERECHA (Contenido Principal) ================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 bg-white">
        
        <div className="flex flex-col space-y-6">
          
          {/* Encabezado Principal */}
          <div className="border-b-2 pb-5 mt-1" style={{ borderColor: accentColor }}>
            <h1 className="tracking-widest leading-none font-black text-gray-900 uppercase text-3xl flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '42px' }}>
              <span>{firstName}</span> <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] mt-2 text-gray-500">
              {personal?.title || 'DIRECTOR CREATIVO'}
            </p>
          </div>

          {/* Perfil Profesional */}
          {profile && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1.5 mb-2.5 text-[12px]" style={{ borderColor: accentColor }}>
                Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed font-normal text-[12px] text-justify">
                {profile}
              </p>
            </div>
          )}

          {/* Experiencia Laboral */}
          {experience && experience.length > 0 && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1.5 mb-3 text-[12px]" style={{ borderColor: accentColor }}>
                Experiencia Laboral
              </h3>
              
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-12 gap-3">
                    <span className="col-span-3 text-gray-500 font-semibold text-[11px] uppercase">{exp.startDate} - {exp.endDate}</span>
                    <div className="col-span-9 space-y-1">
                      <h4 className="font-bold text-gray-900 text-[12px] uppercase">{exp.role} / <span className="font-semibold text-gray-700">{exp.company}</span></h4>
                      <p className="text-gray-600 text-[12px] leading-relaxed text-justify">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Educación */}
          {education && education.length > 0 && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1.5 mb-3 text-[12px]" style={{ borderColor: accentColor }}>
                Educación
              </h3>
              
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="grid grid-cols-12 gap-3">
                    <span className="col-span-3 text-gray-500 font-semibold text-[11px]">{edu.startDate} - {edu.endDate}</span>
                    <div className="col-span-9 space-y-0.5">
                      <h4 className="font-bold text-gray-900 text-[12px] uppercase">{edu.degree}</h4>
                      <p className="text-gray-600 text-[12px] font-semibold">{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referencias Personales (Diseño en rejilla limpio y plano sin cajitas de bordes redondeados) */}
          {references && references.length > 0 && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1.5 mb-3 text-[12px]" style={{ borderColor: accentColor }}>
                Referencias
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-1">
                    <p className="font-bold text-gray-900 text-[12px]">{ref.name}</p>
                    <p className="text-gray-600 text-[11px]">{ref.position} / {ref.company}</p>
                    <p className="text-gray-500 text-[11px]">Tel: {ref.phone}</p>
                    {ref.email && <p className="text-gray-500 text-[11px]">Correo: {ref.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Pie de página */}
        <div className="text-right text-[10px] text-gray-400 pt-3 border-t border-gray-100">
          CVRD.DO — Extra Standard 06 Template
        </div>
      </div>
    </div>
  );
}