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

export default function TemplateCharcoalCompact({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal?.photoShape === 'circle' ? 'rounded-full' :
    personal?.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#374151';

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-950 flex justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA DERECHA (Contenido Principal: Nombre, Contacto, Perfil, Educación, Experiencia) ================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 overflow-hidden bg-white">
        <div className="space-y-5">
          {/* Encabezado Principal (Nombre 10% más grande horizontal: Bold + Regular) y Contacto en una sola línea */}
          <div className="border-b border-gray-300 pb-3 flex justify-between items-start">
            <div>
              <h1 className="tracking-tight leading-none uppercase flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '38px' }}>
                <span className="font-extrabold text-gray-900">{firstName}</span>
                <span className="font-normal text-gray-700">{lastName}</span>
              </h1>
              <p className="font-bold uppercase tracking-widest text-gray-600 mt-1 text-[12px]">
                {personal?.title || 'DISEÑADOR GRÁFICO'}
              </p>
            </div>

            {/* Contacto en una sola línea con iconos planos */}
            <div className="text-[12px] text-gray-700 space-y-1 text-right pt-0.5 whitespace-nowrap">
              {personal?.phone && (
                <p className="flex items-center justify-end gap-2">
                  <span>{personal.phone}</span>
                  <span className="shrink-0 text-gray-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </span>
                </p>
              )}
              {personal?.secondaryPhone && (
                <p className="flex items-center justify-end gap-2 text-gray-500">
                  <span>{personal.secondaryPhone}</span>
                  <span className="shrink-0">📞</span>
                </p>
              )}
              {personal?.email && (
                <p className="flex items-center justify-end gap-2">
                  <span>{personal.email}</span>
                  <span className="shrink-0 text-gray-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </span>
                </p>
              )}
              {personal?.secondaryEmail && (
                <p className="flex items-center justify-end gap-2 text-gray-500">
                  <span>{personal.secondaryEmail}</span>
                  <span className="shrink-0">✉️</span>
                </p>
              )}
              {personal?.location && (
                <p className="flex items-center justify-end gap-2">
                  <span>{personal.location}</span>
                  <span className="shrink-0 text-gray-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </span>
                </p>
              )}
              {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
                (extras.customLinks as CustomLink[]).map((link, idx) => (
                  <p key={idx} className="flex items-center justify-end gap-2">
                    <span>{link?.label || 'Enlace'}: {link?.url}</span>
                    <span className="shrink-0">🔗</span>
                  </p>
                ))
              ) : (
                extras?.linkedin && (
                  <p className="flex items-center justify-end gap-2">
                    <span>{extras.linkedin}</span>
                    <span className="shrink-0">🔗</span>
                  </p>
                )
              )}
            </div>
          </div>

          {/* Perfil Profesional (Texto a 12px) */}
          {profile && (
            <div className="space-y-1 text-[12px]">
              <h3 className="font-black uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 text-[12px]">
                Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed font-normal text-[12px] text-justify">{profile}</p>
            </div>
          )}

          {/* Educación (Movida antes de experiencia, con estilo horizontal a 12px) */}
          {education && education.length > 0 && (
            <div className="space-y-2 text-[12px]">
              <h3 className="font-black uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 text-[12px]">
                Educación
              </h3>
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[12px]">{edu.degree}</h4>
                      <span className="text-gray-500 font-semibold text-[12px]">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <p className="text-gray-700 text-[12px]">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experiencia Profesional (Texto a 12px) */}
          {experience && experience.length > 0 && (
            <div className="space-y-2 text-[12px]">
              <h3 className="font-black uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 text-[12px]">
                Experiencia Profesional
              </h3>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[12px]">{exp.role}</h4>
                      <span className="text-gray-500 font-semibold text-[12px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="font-bold text-gray-700 text-[12px]">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[12px] text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-gray-400 pt-3 border-t border-gray-200 text-[12px]">
          CVRD.DO — Charcoal Compact
        </div>
      </div>

      {/* ================= COLUMNA IZQUIERDA (Barra lateral oscura: Foto 160x160px, Habilidades, Idiomas, Referencias) ================= */}
      <div 
        className="w-72 h-full flex flex-col justify-between p-6 text-white shrink-0 box-border shadow-lg"
        style={{ backgroundColor: accentColor }}
      >
        <div className="space-y-5">
          {/* Foto de perfil tamaño exacto 160x160px */}
          {personal?.showPhoto && (
            <div className="flex justify-center pt-1">
              <div 
                className={`bg-gray-700 overflow-hidden border-2 border-white/20 flex items-center justify-center shadow-md shrink-0 ${photoShapeClass}`}
                style={{ width: '160px', height: '160px' }}
              >
                {personal?.photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
                ) : (
                  <span className="text-gray-300 font-bold text-[12px]">FOTO 160x160</span>
                )}
              </div>
            </div>
          )}

          {/* Habilidades (Texto a 12px) */}
          {skills && skills.length > 0 && (
            <div className="space-y-2 text-[12px]">
              <h3 className="font-black uppercase tracking-wider border-b border-white/20 pb-1 text-amber-400 text-[12px]">
                Habilidades
              </h3>
              <ul className="space-y-1">
                {skills.map((skill) => (
                  <li key={skill.id} className="text-gray-200 font-medium text-[12px]">
                    • {skill.name} {skill.level && <span className="text-gray-400">({skill.level})</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Idiomas (Texto a 12px) */}
          {languages && languages.length > 0 && (
            <div className="space-y-2 text-[12px]">
              <h3 className="font-black uppercase tracking-wider border-b border-white/20 pb-1 text-amber-400 text-[12px]">
                Idiomas
              </h3>
              <ul className="space-y-1.5">
                {languages.map((lang) => (
                  <li key={lang.id} className="text-gray-200 font-medium flex justify-between text-[12px]">
                    <span>{lang.name}</span>
                    <span className="text-gray-400">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Referencias Personales (Visibles, completas y a 12px) */}
          {references && references.length > 0 && (
            <div className="space-y-2 text-[12px]">
              <h3 className="font-black uppercase tracking-wider border-b border-white/20 pb-1 text-amber-400 text-[12px]">
                Referencias
              </h3>
              <div className="space-y-3">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5 text-[12px]">
                    <p className="font-bold text-white">{ref.name}</p>
                    <p className="text-gray-300">{ref.position} - {ref.company}</p>
                    <p className="text-gray-400">Tel: {ref.phone}</p>
                    {ref.email && <p className="text-gray-400">Correo: {ref.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-gray-400 text-center pt-2 border-t border-white/10 text-[12px]">
          CVRD.DO
        </div>
      </div>
    </div>
  );
}