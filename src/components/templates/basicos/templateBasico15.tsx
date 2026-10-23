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

export default function TechDeveloperTemplate({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

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
        <div className="flex justify-between items-start border-b border-gray-300 pb-5">
          <div className="flex flex-col justify-center">
            <h1 className="tracking-tight leading-none uppercase flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '46px' }}>
              <span className="font-extrabold text-gray-900">{firstName}</span>
              <span className="font-normal text-gray-500">{lastName}</span>
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-widest mt-2 text-gray-600">
              {personal?.title || 'WEB DESIGNER & DEVELOPER'}
            </p>
          </div>

          {/* Contacto derecho en una sola línea con iconos planos */}
          <div className="text-[12px] text-gray-700 space-y-1.5 text-right pt-1 whitespace-nowrap">
            {personal?.phone && (
              <p className="flex items-center justify-end gap-2">
                <span>{personal.phone}</span>
                <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </span>
              </p>
            )}
            {personal?.secondaryPhone && (
              <p className="flex items-center justify-end gap-2 text-gray-500">
                <span>{personal.secondaryPhone}</span>
                <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center shrink-0">📞</span>
              </p>
            )}

            {personal?.email && (
              <p className="flex items-center justify-end gap-2">
                <span>{personal.email}</span>
                <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </span>
              </p>
            )}
            {personal?.secondaryEmail && (
              <p className="flex items-center justify-end gap-2 text-gray-500">
                <span>{personal.secondaryEmail}</span>
                <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center shrink-0">✉️</span>
              </p>
            )}

            {personal?.location && (
              <p className="flex items-center justify-end gap-2">
                <span>{personal.location}</span>
                <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </span>
              </p>
            )}
            {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
              (extras.customLinks as CustomLink[]).map((link, idx) => (
                <p key={idx} className="flex items-center justify-end gap-2">
                  <span>{link?.label || 'Enlace'}: {link?.url}</span>
                  <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center shrink-0">🔗</span>
                </p>
              ))
            ) : (
              extras?.linkedin && (
                <p className="flex items-center justify-end gap-2">
                  <span>{extras.linkedin}</span>
                  <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center shrink-0">🔗</span>
                </p>
              )
            )}
          </div>
        </div>

        {/* ================= CUERPO CENTRAL (2 Columnas) ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1 pt-4">
          
          {/* COLUMNA IZQUIERDA (Fondo gris suave) */}
          <div className="col-span-4 bg-gray-100/70 p-4 rounded-xl flex flex-col space-y-4 text-[12px] border border-gray-200">
            
            {/* Foto de perfil tamaño exacto 160x160px */}
            {personal?.showPhoto && (
              <div className="flex justify-center my-1">
                <div 
                  className={`bg-gray-200 overflow-hidden border border-gray-300 shadow-sm flex items-center justify-center shrink-0 ${photoShapeClass}`}
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

            {/* Idiomas (Movidos arriba de las referencias) */}
            {languages && languages.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[12px]">
                  Idiomas
                </h3>
                <div className="space-y-1.5 text-[12px] text-gray-700">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between font-medium">
                      <span>{lang.name}</span>
                      <span className="text-gray-500 font-bold">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referencias Personales (Movidas debajo de los idiomas) */}
            <div>
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[12px]">
                Referencias
              </h3>
              {references && references.length > 0 ? (
                <div className="space-y-2 text-[12px] text-gray-700">
                  {references.map((ref) => (
                    <div key={ref.id} className="space-y-0.5">
                      <p className="font-bold text-gray-900 uppercase">{ref.name}</p>
                      <p>{ref.position} - {ref.company}</p>
                      <p className="text-gray-500">Tel: {ref.phone}</p>
                      {ref.email && <p className="text-gray-500">Correo: {ref.email}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[12px] text-gray-700 space-y-0.5">
                  <p className="font-bold uppercase">LUIS GARCIA</p>
                  <p className="text-gray-600">Company Name</p>
                  <p className="text-gray-500">info@companyemail.com</p>
                </div>
              )}
            </div>

          </div>

          {/* COLUMNA DERECHA (Contenido Principal) */}
          <div className="col-span-8 flex flex-col text-[12px] space-y-4 pl-2">
            
            {/* Perfil Profesional */}
            {profile && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-1.5 text-gray-900 text-[12px]">
                  Perfil Profesional
                </h3>
                <p className="text-gray-700 leading-relaxed font-normal text-[12px] text-justify">
                  {profile}
                </p>
              </div>
            )}

            {/* Educación */}
            {education && education.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2.5 text-gray-900 text-[12px]">
                  Educación
                </h3>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[12px]">{edu.degree}</h4>
                        <span className="text-gray-500 font-semibold text-[11px]">{edu.startDate} - {edu.endDate}</span>
                      </div>
                      <p className="text-gray-700 text-[12px]">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experiencia Laboral */}
            <div>
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[12px]">
                Experiencia Laboral
              </h3>
              <div className="space-y-3">
                {experience && experience.length > 0 ? (
                  experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[12px]">{exp.role} en {exp.company}</h4>
                        <span className="text-gray-500 font-semibold text-[11px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-[12px] text-justify whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[12px]">Head of Design ABC Company</h4>
                      <span className="text-gray-500 font-semibold text-[11px]">2018 - 2020</span>
                    </div>
                    <p className="text-gray-700 text-[12px] mt-0.5 mb-1 text-justify">
                      Sedut perspiatis unde omnis iste natus error sit voluptatem accusan tiumyu dolor emque laudantium.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* ================= FRANJA INFERIOR (Solo Habilidades dinámicas) ================= */}
        {skills && skills.length > 0 && (
          <div className="pt-3 border-t border-gray-300 mt-2 text-[12px]">
            <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[12px]">
              Habilidades
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-0.5"><span className="font-semibold text-gray-800 text-[12px]">{skill.name}</span></div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gray-700" style={{ width: '90%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pie de página */}
        <div className="text-right text-[9px] text-gray-400 pt-2 border-t border-gray-200">
          CVRD.DO — Tech & Code Developer Template
        </div>
      </div>
    </div>
  );
}