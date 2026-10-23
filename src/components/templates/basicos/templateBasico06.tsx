import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateBasico06({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = '#c29b68'; // Color original de la plantilla respetado al 100%
  const sidebarBg = '#f4f2ee'; // Fondo gris/crema original

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
      {/* ================= COLUMNA IZQUIERDA (Fondo Gris Suave) ================= */}
      <div 
        className="w-75 h-full flex flex-col justify-between p-6 shrink-0 relative border-r border-gray-200"
        style={{ backgroundColor: sidebarBg }}
      >
        <div className="flex flex-col space-y-5 pt-2">
          
          {/* Foto de perfil de 160x160px con borde curvado original */}
          {personal?.showPhoto && (
            <div className="flex justify-center pt-2">
              <div 
                className="bg-white overflow-hidden shadow-md flex items-center justify-center shrink-0 border border-gray-200"
                style={{ width: '160px', height: '160px', borderTopLeftRadius: '80px', borderTopRightRadius: '80px', borderBottomLeftRadius: '80px' }}
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

          {/* Perfil Profesional */}
          {profile && (
            <div className="text-[12px] pt-2">
              <div className="inline-block px-3.5 py-1 rounded-full text-white font-bold uppercase text-[11px] tracking-wider mb-2.5 shadow-xs" style={{ backgroundColor: accentColor }}>
                Perfil Profesional
              </div>
              <p className="text-gray-700 leading-relaxed text-[12px] text-justify">
                {profile}
              </p>
            </div>
          )}

          {/* Contacto e Iconos Planos (Incluye Sección 08 / Enlaces editables) */}
          <div className="text-[12px]">
            <div className="inline-block px-3.5 py-1 rounded-full text-white font-bold uppercase text-[11px] tracking-wider mb-2.5 shadow-xs" style={{ backgroundColor: accentColor }}>
              Contacto
            </div>
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
              {locationsString && (
                <p className="flex items-start gap-2">
                  <span className="shrink-0 mt-0.5" style={{ color: accentColor }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </span>
                  <span className="wrap-break-word">{locationsString}</span>
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

          {/* Educación */}
          {education && education.length > 0 && (
            <div className="text-[12px]">
              <div className="inline-block px-3.5 py-1 rounded-full text-white font-bold uppercase text-[11px] tracking-wider mb-2.5 shadow-xs" style={{ backgroundColor: accentColor }}>
                Educación
              </div>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <p className="font-bold text-gray-900 text-[12px] uppercase">{edu.degree}</p>
                    <p className="text-gray-600 text-[11.5px]">{edu.institution} — {edu.startDate} - {edu.endDate}</p>
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
      <div className="flex-1 h-full flex flex-col justify-between p-8 bg-white relative">
        
        <div className="flex flex-col space-y-6">
          
          {/* Encabezado Principal */}
          <div className="border-b border-gray-200 pb-6 relative mt-1">
            <h1 className="tracking-tight leading-none text-4xl flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '48px' }}>
              <span className="font-extrabold" style={{ color: accentColor }}>{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-[12px] font-semibold text-gray-600 mt-3 whitespace-pre-line leading-relaxed uppercase tracking-wider">
              {personal?.title || "Diseñador Gráfico / Diseñador Interactivo"}
            </p>

            {/* Iconos redes sociales derecha */}
            <div className="absolute right-0 top-6 flex gap-2 text-gray-400 text-xs">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold">f</span>
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold">in</span>
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold">t</span>
            </div>
          </div>

          {/* Experiencia Laboral */}
          {experience && experience.length > 0 && (
            <div className="text-[12px] relative pl-5 border-l-2" style={{ borderColor: accentColor }}>
              <div className="absolute -left-1.75 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
              <h3 className="font-bold uppercase tracking-wider mb-3 text-[12px]" style={{ color: accentColor }}>
                Experiencia Laboral
              </h3>
              
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <h4 className="font-bold text-gray-900 text-[12px]">{exp.role}</h4>
                    <p className="text-gray-500 text-[11px] font-semibold">{exp.company} / {exp.startDate} - {exp.endDate}</p>
                    <p className="text-gray-700 text-[12px] leading-relaxed text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas */}
          {languages && languages.length > 0 && (
            <div className="text-[12px] relative pl-5 border-l-2" style={{ borderColor: accentColor }}>
              <div className="absolute -left-1.75 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
              <h3 className="font-bold uppercase tracking-wider mb-3 text-[12px]" style={{ color: accentColor }}>
                Idiomas
              </h3>
              <div className="space-y-2.5 pr-4">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="text-gray-800 font-semibold text-[12px]">{lang.name}</span>
                    <span className="text-gray-600 bg-gray-100 px-3 py-0.5 rounded text-[11px] font-bold">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Habilidades */}
          {skills && skills.length > 0 && (
            <div className="text-[12px] relative pl-5 border-l-2" style={{ borderColor: accentColor }}>
              <div className="absolute -left-1.75 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
              <h3 className="font-bold uppercase tracking-wider mb-3 text-[12px]" style={{ color: accentColor }}>
                Habilidades
              </h3>
              <div className="space-y-2 pr-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center text-[12px]">
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                    <span className="tracking-widest font-bold" style={{ color: accentColor }}>●●●●●○</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referencias (Añadidas e integradas correctamente) */}
          {references && references.length > 0 && (
            <div className="text-[12px] relative pl-5 border-l-2" style={{ borderColor: accentColor }}>
              <div className="absolute -left-1.75 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
              <h3 className="font-bold uppercase tracking-wider mb-3 text-[12px]" style={{ color: accentColor }}>
                Referencias
              </h3>
              <div className="grid grid-cols-2 gap-4 pr-4">
                {references.map((ref) => (
                  <div key={ref.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-0.5">
                    <p className="font-bold text-gray-900">{ref.name}</p>
                    <p className="text-gray-600 text-[11px]">{ref.position} - {ref.company}</p>
                    <p className="text-gray-500 text-[11px]">Tel: {ref.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Pie de página */}
        <div className="text-right text-[10px] text-gray-400 pt-3 border-t border-gray-100">
          CVRD.DO — Extra Standard 05 Template
        </div>
      </div>
    </div>
  );
}