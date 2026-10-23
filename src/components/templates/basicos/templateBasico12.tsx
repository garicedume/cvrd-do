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

export default function HospitalityTourismTemplate({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA IZQUIERDA (Fondo Gris) ================= */}
      <div 
        className="w-75 h-full flex flex-col justify-between p-6 shrink-0 relative border-r border-gray-300 z-0"
        style={{ backgroundColor: '#e5e7eb' }}
      >
        <div className="flex flex-col space-y-6 pt-4">
          
          {/* Foto de perfil de 160x160px colocada ordenadamente arriba sin invadir textos */}
          {personal?.showPhoto && (
            <div className="flex justify-center pt-2">
              <div 
                className={`bg-white overflow-hidden border-4 border-white shadow-md flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '160px', height: '160px' }}
              >
                {personal?.photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
                ) : (
                  <span className="text-[12px] text-gray-400 font-bold">FOTO 160x160</span>
                )}
              </div>
            </div>
          )}

          <h2 className="text-lg font-black uppercase tracking-widest text-gray-800 pb-1 border-b border-gray-400">
            Resumen
          </h2>

          {/* Contacto con iconos planos y tamaño 12px */}
          <div className="text-[12px]">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2.5 text-[12px]">
              Contacto
            </h3>
            <div className="space-y-2.5 text-gray-700 text-[12px]">
              {personal?.phone && (
                <p className="flex items-center gap-2 leading-tight">
                  <span className="shrink-0 text-gray-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </span>
                  <span className="break-all">{personal.phone}</span>
                </p>
              )}
              {personal?.secondaryPhone && (
                <p className="flex items-center gap-2 leading-tight text-gray-500">
                  <span className="shrink-0">📞</span>
                  <span className="break-all">{personal.secondaryPhone}</span>
                </p>
              )}

              {personal?.email && (
                <p className="flex items-center gap-2 leading-tight">
                  <span className="shrink-0 text-gray-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </span>
                  <span className="break-all">{personal.email}</span>
                </p>
              )}
              {personal?.secondaryEmail && (
                <p className="flex items-center gap-2 leading-tight text-gray-500">
                  <span className="shrink-0">✉️</span>
                  <span className="break-all">{personal.secondaryEmail}</span>
                </p>
              )}

              {personal?.location && (
                <p className="flex items-start gap-2 leading-tight">
                  <span className="shrink-0 text-gray-800 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </span>
                  <span>{personal.location}</span>
                </p>
              )}
              {personal?.locationLine2 && (
                <p className="pl-6 text-gray-500">{personal.locationLine2}</p>
              )}

              {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
                (extras.customLinks as CustomLink[]).map((link, idx) => (
                  <div key={idx} className="leading-tight break-all pt-1">
                    <span className="font-bold text-gray-900 block">🔗 {link?.label || 'Enlace'}:</span>
                    <span>{link?.url}</span>
                    {link?.urlLine2 && <span className="block text-gray-500">{link.urlLine2}</span>}
                  </div>
                ))
              ) : (
                <>
                  {extras?.linkedin && <p className="leading-tight break-all">🔗 {extras.linkedin}</p>}
                  {extras?.portfolio && <p className="leading-tight break-all">🌐 {extras.portfolio}</p>}
                </>
              )}
            </div>
          </div>

          {/* Educación a 12px con línea de tiempo */}
          {education && education.length > 0 && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-3 text-[12px]">
                Educación
              </h3>
              <div className="space-y-3 relative border-l border-gray-400 ml-2 pl-3">
                {education.map((edu) => (
                  <div key={edu.id} className="relative">
                    <div className="absolute -left-4.25 top-1 w-2 h-2 rounded-full bg-gray-600 border border-gray-200"></div>
                    <p className="text-gray-600 font-semibold text-[11px]">{edu.startDate} - {edu.endDate}</p>
                    <p className="font-bold text-gray-900 text-[12px]">{edu.degree}</p>
                    <p className="text-gray-700 text-[12px]">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas a 12px */}
          {languages && languages.length > 0 && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2.5 text-[12px]">
                Idiomas
              </h3>
              <ul className="space-y-2 text-[12px] text-gray-700">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex justify-between font-medium">
                    <span>{lang.name}</span>
                    <span className="text-gray-500 font-bold">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        <div className="text-[10px] text-gray-500 text-center pb-2">
          CVRD.DO
        </div>
      </div>

      {/* ================= COLUMNA DERECHA (Contenido Principal) ================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 bg-white relative">
        
        <div className="flex flex-col space-y-6 pt-2">
          
          {/* Encabezado Principal (Nombre imponente) */}
          <div className="border-b border-gray-300 pb-5">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '42px' }}>
              <span className="font-black text-gray-900 uppercase">{firstName}</span>
              <span className="font-light text-gray-500 uppercase">{lastName}</span>
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-widest mt-2 text-gray-600">
              {personal?.title || 'DISEÑADOR GRÁFICO'}
            </p>
          </div>

          {/* Perfil Profesional (Texto a 12px) */}
          {profile && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[12px]">
                Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed font-normal text-[12px] text-justify">{profile}</p>
            </div>
          )}

          {/* Experiencia Laboral (Texto a 12px) */}
          {experience && experience.length > 0 && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-900 text-[12px]">
                Experiencia Laboral
              </h3>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[12px]">• {exp.role} en {exp.company}</h4>
                      <span className="text-gray-500 font-semibold text-[11px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-[12px] pl-3 text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Habilidades (Texto a 12px) */}
          {skills && skills.length > 0 && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-900 text-[12px]">
                Habilidades
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-gray-50 p-2.5 rounded border border-gray-100">
                    <p className="text-[12px] font-semibold text-gray-800 mb-1.5">{skill.name}</p>
                    <div className="flex gap-1">
                      <div className="h-2 w-8 bg-gray-800 rounded-sm"></div>
                      <div className="h-2 w-8 bg-gray-800 rounded-sm"></div>
                      <div className="h-2 w-8 bg-gray-800 rounded-sm"></div>
                      <div className="h-2 w-8 bg-gray-300 rounded-sm"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referencias Personales (Visibles y a 12px) */}
          {references && references.length > 0 && (
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-900 text-[12px]">
                Referencias
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {references.map((ref) => (
                  <div key={ref.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1">
                    <p className="font-bold text-gray-900 text-[12px]">{ref.name}</p>
                    <p className="text-gray-600 text-[11.5px]">{ref.position} - {ref.company}</p>
                    <p className="text-gray-500 text-[11.5px]">Tel: {ref.phone}</p>
                    {ref.email && <p className="text-gray-500 text-[11.5px]">Correo: {ref.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Pie de página */}
        <div className="text-right text-[10px] text-gray-400 pt-3 border-t border-gray-100">
          CVRD.DO — Hospitality & Tourism Template
        </div>
      </div>
    </div>
  );
}