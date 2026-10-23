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

export default function TemplateLaura({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

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
        {/* ================= ENCABEZADO ================= */}
        <div className="flex justify-between items-center border-b pb-5 mb-3 border-gray-300">
          <div className="flex flex-col justify-center">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '55px' }}>
              <span className="font-bold text-gray-900">{firstName}</span>
              <span className="font-normal text-gray-700">{lastName}</span>
            </h1>
            <p className="font-semibold uppercase tracking-widest mt-2 text-gray-600 pl-0.5 text-[13px]">
              {personal?.title}
            </p>
          </div>
          {personal?.showPhoto && (
            <div 
              className={`bg-gray-200 overflow-hidden border-2 border-gray-200 flex items-center justify-center shadow-inner shrink-0 ${photoShapeClass}`}
              style={{ width: '140px', height: '140px' }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
              ) : (
                <span className="text-[12px] text-gray-500 font-bold">FOTO</span>
              )}
            </div>
          )}
        </div>

        {/* ================= CUERPO PRINCIPAL EN 2 COLUMNAS ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1 pt-2">
          
          {/* COLUMNA IZQUIERDA (Contacto, Habilidades e Idiomas) */}
          <div className="col-span-4 flex flex-col border-r pr-5 border-gray-200 space-y-5">
            
            {/* Contacto */}
            <div className="text-[12px]">
              <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[13px]" style={{ borderColor: accentColor }}>
                Contacto
              </h3>
              
              <div className="space-y-1.5 text-gray-700">
                {personal?.phone && (
                  <p className="flex items-center gap-2 break-all"><span>📞</span><span>{personal.phone}</span></p>
                )}
                {personal?.secondaryPhone && (
                  <p className="flex items-center gap-2 break-all text-gray-500"><span>📞</span><span>{personal.secondaryPhone}</span></p>
                )}
                {personal?.email && (
                  <p className="flex items-center gap-2 break-all"><span>✉️</span><span>{personal.email}</span></p>
                )}
                {personal?.secondaryEmail && (
                  <p className="flex items-center gap-2 break-all text-gray-500"><span>✉️</span><span>{personal.secondaryEmail}</span></p>
                )}
                {personal?.location && (
                  <p className="flex items-center gap-2"><span>📍</span><span>{personal.location}</span></p>
                )}
                {personal?.locationLine2 && (
                  <p className="text-gray-500 pl-5">{personal.locationLine2}</p>
                )}

                {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
                  (extras.customLinks as CustomLink[]).map((link, idx) => (
                    <div key={idx} className="break-all pt-1">
                      <span className="font-bold text-gray-900 block">🔗 {link?.label || 'Enlace'}:</span>
                      <span className="block">{link?.url}</span>
                      {link?.urlLine2 && <span className="text-gray-500 block">{link.urlLine2}</span>}
                    </div>
                  ))
                ) : (
                  <>
                    {extras?.linkedin && <p className="break-all pt-1">🔗 {extras.linkedin}</p>}
                    {extras?.portfolio && <p className="break-all pt-1">🌐 {extras.portfolio}</p>}
                  </>
                )}
              </div>
            </div>

            {/* Habilidades */}
            {skills && skills.length > 0 && (
              <div className="text-[12px]">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[13px]" style={{ borderColor: accentColor }}>
                  Habilidades
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {skills.map((skill) => (
                    <li key={skill.id} className="text-gray-800 font-medium">• {skill.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <div className="text-[12px]">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[13px]" style={{ borderColor: accentColor }}>
                  Idiomas
                </h3>
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

          {/* COLUMNA DERECHA (Perfil, Educación, Experiencia y Referencias) */}
          <div className="col-span-8 flex flex-col text-[12px] space-y-4">
            
            {/* Perfil Profesional (Diseño limpio, amplio y sin verse apretado) */}
            {profile && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[13px]" style={{ borderColor: accentColor }}>
                  Perfil Profesional
                </h3>
                <p className="text-gray-700 leading-relaxed font-normal text-justify bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {profile}
                </p>
              </div>
            )}

            {/* Educación */}
            {education && education.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[13px]" style={{ borderColor: accentColor }}>
                  Educación
                </h3>
                <div className="space-y-2.5">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <p className="font-bold text-gray-900 text-[12px]">{edu.degree}</p>
                      <p className="text-gray-600">{edu.institution} <span className="text-gray-400">({edu.startDate} - {edu.endDate})</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experiencia */}
            {experience && experience.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[13px]" style={{ borderColor: accentColor }}>
                  Experiencia
                </h3>
                <div className="space-y-3.5">
                  {experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[13px]">{exp.role}</h4>
                        <span className="text-gray-500 font-semibold text-[12px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="font-bold mb-1 text-[12px]" style={{ color: accentColor }}>{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referencias */}
            {references && references.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[13px]" style={{ borderColor: accentColor }}>
                  Referencias
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {references.map((ref) => (
                    <div key={ref.id} className="space-y-0.5 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <p className="font-bold text-gray-900">{ref.name}</p>
                      <p className="text-gray-600">{ref.position} - {ref.company}</p>
                      <p className="text-gray-500 font-medium">Tel: {ref.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= PIE DE PÁGINA ================= */}
        <div className="text-right text-[10px] text-gray-400 pt-3 border-t border-gray-200 mt-2">
          CVRD.DO — Plantilla Profesional
        </div>
      </div>
    </div>
  );
}