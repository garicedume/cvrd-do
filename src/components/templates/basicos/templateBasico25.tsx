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

export default function TemplateMinimalistLine({ data }: Props) {
  const { personal, profile, experience, education, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#111827';

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
        {/* ================= ENCABEZADO (Solo Nombre y Título) ================= */}
        <div className="border-b border-gray-300 pb-5">
          <div className="flex flex-col justify-center">
            <h1 className="tracking-tight leading-none uppercase flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '42px' }}>
              <span className="font-extrabold text-gray-900">{firstName}</span>
              <span className="font-normal text-gray-600">{lastName}</span>
            </h1>
            <p className="font-bold uppercase tracking-widest mt-2 text-gray-500 text-[12px]">
              {personal?.title || 'PROFESIONAL'}
            </p>
          </div>
        </div>

        {/* ================= CUERPO PRINCIPAL EN 2 COLUMNAS (Textos a 12px) ================= */}
        <div className="grid grid-cols-12 gap-8 flex-1 pt-4 text-[12px]">
          
          {/* COLUMNA IZQUIERDA (Foto de 160x160px, Contacto debajo a 6px en una sola línea, e Idiomas) */}
          <div className="col-span-4 flex flex-col border-r pr-6 border-gray-200 space-y-5">
            
            {/* Foto de perfil tamaño exacto 160x160px */}
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
                    <span className="text-[12px] text-gray-400 font-bold">FOTO 160x160</span>
                  )}
                </div>
              </div>
            )}

            {/* Datos de contacto debajo de la foto a unos 6px (mt-1.5) y estrictamente en una sola línea */}
            <div className="text-[12px] text-gray-700 space-y-1.5 pt-1.5 whitespace-nowrap">
              <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                Contacto
              </h3>
              {personal?.phone && (
                <p className="flex items-center gap-2">
                  <span className="shrink-0 text-gray-800">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </span>
                  <span>{personal.phone}</span>
                </p>
              )}
              {personal?.secondaryPhone && (
                <p className="flex items-center gap-2 text-gray-500">
                  <span className="shrink-0">📞</span>
                  <span>{personal.secondaryPhone}</span>
                </p>
              )}
              {personal?.email && (
                <p className="flex items-center gap-2">
                  <span className="shrink-0 text-gray-800">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </span>
                  <span>{personal.email}</span>
                </p>
              )}
              {personal?.secondaryEmail && (
                <p className="flex items-center gap-2 text-gray-500">
                  <span className="shrink-0">✉️</span>
                  <span>{personal.secondaryEmail}</span>
                </p>
              )}
              {personal?.location && (
                <p className="flex items-center gap-2">
                  <span className="shrink-0 text-gray-800">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </span>
                  <span>{personal.location}</span>
                </p>
              )}
              {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
                (extras.customLinks as CustomLink[]).map((link, idx) => (
                  <p key={idx} className="flex items-center gap-2">
                    <span className="shrink-0">🔗</span>
                    <span>{link?.label || 'Enlace'}: {link?.url}</span>
                  </p>
                ))
              ) : (
                extras?.linkedin && (
                  <p className="flex items-center gap-2">
                    <span className="shrink-0">🔗</span>
                    <span>{extras.linkedin}</span>
                  </p>
                )
              )}
            </div>

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <div className="text-[12px] pt-2">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2.5 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Idiomas
                </h3>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="text-gray-800 text-[12px] flex justify-between font-medium">
                      <span>{lang.name}</span>
                      <span className="text-gray-500 font-bold">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA (Perfil Profesional, Educación horizontal, Experiencia y Referencias) */}
          <div className="col-span-8 flex flex-col text-[12px] space-y-5">
            
            {/* Perfil Profesional */}
            {profile && (
              <div className="text-[12px]">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Perfil Profesional
                </h3>
                <p className="text-gray-700 leading-relaxed font-normal text-[12px] text-justify">{profile}</p>
              </div>
            )}

            {/* Educación (Movida antes de la experiencia, estilo horizontal) */}
            {education && education.length > 0 && (
              <div className="text-[12px]">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2.5 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Educación
                </h3>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[12px]">{edu.degree}</h4>
                        <span className="text-gray-500 font-semibold text-[12px]">{edu.startDate} - {edu.endDate}</span>
                      </div>
                      <p className="text-gray-600 text-[12px]">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experiencia Profesional */}
            {experience && experience.length > 0 && (
              <div className="text-[12px]">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-3 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Experiencia Profesional
                </h3>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[12px]">{exp.role}</h4>
                        <span className="text-gray-500 font-semibold text-[12px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="font-bold text-gray-600 text-[12px] mb-1">{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[12px] text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referencias Personales (Completas y visibles) */}
            {references && references.length > 0 && (
              <div className="text-[12px]">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Referencias
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {references.map((ref) => (
                    <div key={ref.id} className="space-y-0.5 text-[12px] border-l-2 border-gray-300 pl-2">
                      <p className="font-bold text-gray-900">{ref.name}</p>
                      <p className="text-gray-600 text-[12px]">{ref.position} - {ref.company}</p>
                      <p className="text-gray-500 text-[12px]">Tel: {ref.phone}</p>
                      {ref.email && <p className="text-gray-500 text-[12px]">Correo: {ref.email}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= PIE DE PÁGINA ================= */}
        <div className="text-right text-[10px] text-gray-400 pt-2 border-t">
          CVRD.DO — Plantilla Minimalista
        </div>
      </div>
    </div>
  );
}