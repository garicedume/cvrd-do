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

export default function TemplateModernSidebar({ data }: Props) {
  const { personal, profile, experience, education, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal?.photoShape === 'circle' ? 'rounded-full' :
    personal?.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#1e293b'; // Fondo oscuro moderno para la barra lateral

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-950 flex"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA IZQUIERDA (Barra Lateral Oscura Estilo Referencia) ================= */}
      <div 
        className="w-[300px] h-full flex flex-col justify-between p-6 shrink-0 text-white overflow-hidden"
        style={{ backgroundColor: accentColor }}
      >
        <div className="flex flex-col space-y-5 pt-2">
          
          {/* Foto de perfil tamaño exacto 160x160px con respiro */}
          {personal?.showPhoto && (
            <div className="flex justify-center pt-2">
              <div 
                className={`bg-gray-700 overflow-hidden border-2 border-white/30 shadow-md flex items-center justify-center shrink-0 ${photoShapeClass}`}
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

          {/* Nombre y Título en la barra lateral superior */}
          <div className="space-y-1 text-center border-b border-white/15 pb-4">
            <h1 className="tracking-tight leading-none uppercase flex flex-col items-center" style={{ fontSize: '28px' }}>
              <span className="font-extrabold text-white">{firstName}</span>
              <span className="font-light text-gray-300">{lastName}</span>
            </h1>
            <p className="font-bold uppercase tracking-widest text-amber-400 pt-1.5 text-[12px]">
              {personal?.title || 'ARQUITECTO'}
            </p>
          </div>

          {/* Contacto en una sola línea con iconos planos */}
          <div className="text-[12px] space-y-2 text-gray-200">
            <h3 className="font-black uppercase tracking-wider text-white border-b border-white/15 pb-1 text-[12px]">
              Contacto
            </h3>
            <div className="space-y-1.5 whitespace-nowrap">
              {personal?.phone && (
                <p className="flex items-center gap-2">
                  <span className="shrink-0 text-amber-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </span>
                  <span>{personal.phone}</span>
                </p>
              )}
              {personal?.secondaryPhone && (
                <p className="flex items-center gap-2 text-gray-400">
                  <span className="shrink-0">📞</span>
                  <span>{personal.secondaryPhone}</span>
                </p>
              )}
              {personal?.email && (
                <p className="flex items-center gap-2">
                  <span className="shrink-0 text-amber-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </span>
                  <span>{personal.email}</span>
                </p>
              )}
              {personal?.secondaryEmail && (
                <p className="flex items-center gap-2 text-gray-400">
                  <span className="shrink-0">✉️</span>
                  <span>{personal.secondaryEmail}</span>
                </p>
              )}
              {personal?.location && (
                <p className="flex items-center gap-2">
                  <span className="shrink-0 text-amber-400">
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
          </div>

          {/* Perfil Profesional */}
          {profile && (
            <div className="text-[12px] space-y-1.5">
              <h3 className="font-black uppercase tracking-wider text-white border-b border-white/15 pb-1 text-[12px]">
                Perfil Profesional
              </h3>
              <p className="text-gray-300 leading-relaxed text-[12px] text-justify">{profile}</p>
            </div>
          )}

          {/* Idiomas */}
          {languages && languages.length > 0 && (
            <div className="text-[12px] space-y-2">
              <h3 className="font-black uppercase tracking-wider text-white border-b border-white/15 pb-1 text-[12px]">
                Idiomas
              </h3>
              <div className="space-y-1.5 text-gray-200">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between font-medium">
                    <span>{lang.name}</span>
                    <span className="text-amber-400 font-bold">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="text-[10px] text-gray-400 text-center pb-2">
          CVRD.DO — Modern Sidebar
        </div>
      </div>

      {/* ================= COLUMNA DERECHA (Contenido Principal) ================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 bg-white overflow-hidden text-[12px]">
        <div className="flex flex-col space-y-6">
          
          {/* Educación (Estilo horizontal, antes de experiencia) */}
          {education && education.length > 0 && (
            <div className="space-y-2 text-[12px]">
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b-2 border-gray-900 pb-1 text-[12px]">
                Educación
              </h3>
              <div className="space-y-3 pt-1">
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
            <div className="space-y-2 text-[12px]">
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b-2 border-gray-900 pb-1 text-[12px]">
                Experiencia Laboral
              </h3>
              <div className="space-y-4 pt-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
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

          {/* Referencias Personales (Completas y visibles) */}
          {references && references.length > 0 && (
            <div className="space-y-2 text-[12px]">
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b-2 border-gray-900 pb-1 text-[12px]">
                Referencias
              </h3>
              <div className="grid grid-cols-2 gap-3 pt-1">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5 text-[12px] border-l-2 border-gray-900 pl-2.5">
                    <p className="font-bold text-gray-900">{ref.name}</p>
                    <p className="text-gray-600">{ref.position} - {ref.company}</p>
                    <p className="text-gray-500">Tel: {ref.phone}</p>
                    {ref.email && <p className="text-gray-500">Correo: {ref.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Pie de página */}
        <div className="text-right text-[10px] text-gray-400 pt-2 border-t border-gray-200">
          Página 1 de 1
        </div>
      </div>
    </div>
  );
}