import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateBasico01({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const accentColor = styles?.accentColor || '#374151';

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Combinación elegante de teléfonos y correos
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
        <div className="flex justify-between items-end border-b border-gray-300 pb-5">
          {/* Nombre y Cargo Alineados Correctamente */}
          <div className="flex flex-col justify-end">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '53px' }}>
              <span className="font-extrabold text-gray-900 uppercase">{firstName}</span>
              <span className="font-light text-gray-500 uppercase">{lastName}</span>
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-widest mt-1.5" style={{ color: accentColor }}>
              {personal?.title || 'Título Profesional'}
            </p>
          </div>

          {/* Contacto unificado con iconos vectoriales en círculo */}
          <div className="text-[12px] text-gray-700 space-y-2 text-right font-medium">
            {phonesString && (
              <p className="flex items-center justify-end gap-2">
                <span>{phonesString}</span>
                <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: accentColor, color: accentColor }}>
                  {/* Icono Teléfono */}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </span>
              </p>
            )}
            {emailsString && (
              <p className="flex items-center justify-end gap-2">
                <span>{emailsString}</span>
                <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: accentColor, color: accentColor }}>
                  {/* Icono Sobre / Correo */}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </span>
              </p>
            )}
            {locationsString && (
              <p className="flex items-center justify-end gap-2">
                <span>{locationsString}</span>
                <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: accentColor, color: accentColor }}>
                  {/* Icono Ubicación Pin */}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </span>
              </p>
            )}
          </div>
        </div>

        {/* ================= CUERPO PRINCIPAL EN 2 COLUMNAS ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1 pt-4 items-start">
          
          {/* COLUMNA IZQUIERDA (Fondo gris suave con buen espaciado interno) */}
          <div className="col-span-4 bg-gray-50 p-5 rounded-2xl flex flex-col space-y-4 text-[12px] border border-gray-200">
            
            {/* FOTOGRAFÍA ADAPTABLE (140px x 140px exacta) */}
            {personal?.showPhoto && (
              <div className="flex justify-center my-1">
                <div 
                  className={`bg-gray-200 overflow-hidden border border-gray-300 shadow-sm flex items-center justify-center shrink-0 ${photoShapeClass}`}
                  style={{ width: '140px', height: '140px' }}
                >
                  {personal?.photoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={personal.photoUrl} 
                      alt="Perfil" 
                      className="w-full h-full object-cover object-center" 
                    />
                  ) : (
                    <span className="text-[12px] text-gray-400 font-bold">FOTO</span>
                  )}
                </div>
              </div>
            )}

            {/* Educación (Con un margen superior extra para separar de la foto) */}
            {education && education.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Educación
                </h3>
                <div className="space-y-2.5">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="text-gray-500 text-[11px] font-semibold">{edu.startDate} - {edu.endDate}</p>
                      <p className="font-bold text-gray-900 text-[12px]">{edu.degree}</p>
                      <p className="text-gray-600 text-[12px]">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Habilidades */}
            {skills && skills.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Habilidades
                </h3>
                <ul className="space-y-1.5 text-gray-700 text-[12px]">
                  {skills.map((skill) => (
                    <li key={skill.id} className="flex items-center font-medium">
                      <span className="mr-1.5 font-bold" style={{ color: accentColor }}>•</span> {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Idiomas
                </h3>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id}>
                      <div className="flex justify-between text-[12px] mb-0.5">
                        <span className="font-semibold text-gray-800">{lang.name}</span>
                        <span className="text-gray-500 text-[11px]">{lang.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enlaces y Extras */}
            {extras?.customLinks && extras.customLinks.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Enlaces
                </h3>
                <div className="space-y-1 text-[12px] text-gray-700">
                  {extras.customLinks.map((link, i) => (
                    <p key={i} className="truncate">🔗 <span className="font-semibold">{link.label}:</span> {link.url}</p>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA (Contenido Principal) */}
          <div className="col-span-8 flex flex-col text-[12px] space-y-5 pl-2">
            
            {/* Perfil Profesional */}
            {profile && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Perfil Profesional
                </h3>
                <p className="text-gray-700 leading-relaxed font-normal text-[12px] text-justify">{profile}</p>
              </div>
            )}

            {/* Experiencia */}
            {experience && experience.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Experiencia Laboral
                </h3>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[12px]">{exp.role} — <span className="font-semibold text-gray-700">{exp.company}</span></h4>
                        <span className="text-gray-500 font-semibold text-[11px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-[12px] mt-1 text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referencias Personales */}
            {references && references.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[12px]" style={{ color: accentColor }}>
                  Referencias
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {references.map((ref) => (
                    <div key={ref.id} className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
                      <p className="font-bold text-gray-900 text-[12px]">{ref.name}</p>
                      <p className="text-gray-600 text-[11px]">{ref.position} en {ref.company}</p>
                      <p className="text-gray-500 text-[11px] flex items-center gap-1.5 pt-1">
                        <span style={{ color: accentColor }}>📞</span> {ref.phone}
                      </p>
                      {ref.email && (
                        <p className="text-gray-500 text-[11px] flex items-center gap-1.5">
                          <span style={{ color: accentColor }}>✉️</span> {ref.email}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= PIE DE PÁGINA ================= */}
        <div className="text-right text-[10px] text-gray-400 pt-3 border-t border-gray-200">
          CVRD.DO — Plantilla Básica 01
        </div>
      </div>
    </div>
  );
}