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

export default function TemplateOperationsDirector({ data }: Props) {
  const { personal, profile, experience, education, skills, references, languages, styles, extras } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // DINÁMICO: Conectado al selector de color de acento del editor (Pestaña 9)
  const accentColor = styles?.accentColor || '#1e40af'; 
  const lightBg = '#f8fafc'; // Fondo sutil muy limpio

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
      <div className="w-75 flex flex-col shrink-0 relative overflow-hidden" style={{ backgroundColor: lightBg }}>
        
        {/* FOTO CON TAMAÑO EXACTO 150x150 px */}
        {personal?.showPhoto && (
          <div className="p-6 pb-2 flex justify-center">
            <div 
              className={`bg-gray-300 overflow-hidden border-2 border-white shadow-lg flex items-center justify-center shrink-0 ${photoShapeClass}`}
              style={{ width: '150px', height: '150px' }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
              ) : (
                <span className="text-[12px] text-gray-500 font-bold">FOTO 150x150</span>
              )}
            </div>
          </div>
        )}

        {/* BLOQUE INFERIOR DE LA BARRA LATERAL CON FONDO AZUL DINÁMICO */}
        <div className="flex-1 p-6 flex flex-col justify-between text-white mt-2 space-y-4" style={{ backgroundColor: accentColor }}>
          
          <div className="space-y-5 text-[12px]">
            
            {/* INFORMACIÓN DE CONTACTO (Con funciones completas de Plantilla 10) */}
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-widest border-b border-white/30 pb-1 text-[13px]">
                Contacto
              </h3>
              <div className="space-y-2 opacity-95 font-medium text-[12px]">
                {personal?.phone && (
                  <div>
                    <span className="block font-bold text-[10px] uppercase opacity-75">Teléfono Principal</span>
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal?.secondaryPhone && (
                  <div>
                    <span className="block font-bold text-[10px] uppercase opacity-75">Teléfono Secundario</span>
                    <span>{personal.secondaryPhone}</span>
                  </div>
                )}
                {personal?.email && (
                  <div>
                    <span className="block font-bold text-[10px] uppercase opacity-75">Correo Principal</span>
                    <span className="break-all">{personal.email}</span>
                  </div>
                )}
                {personal?.secondaryEmail && (
                  <div>
                    <span className="block font-bold text-[10px] uppercase opacity-75">Correo Secundario</span>
                    <span className="break-all">{personal.secondaryEmail}</span>
                  </div>
                )}
                {personal?.location && (
                  <div>
                    <span className="block font-bold text-[10px] uppercase opacity-75">Dirección</span>
                    <span>{personal.location}</span>
                  </div>
                )}
                {personal?.locationLine2 && (
                  <div className="text-white/80 pl-2">
                    <span>{personal.locationLine2}</span>
                  </div>
                )}

                {/* Enlaces personalizados avanzados / Redes */}
                {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
                  (extras.customLinks as CustomLink[]).map((link, idx) => (
                    <div key={idx} className="break-all pt-1">
                      <span className="block font-bold text-[10px] uppercase opacity-75">{link?.label || 'Enlace'}</span>
                      <span>{link?.url}</span>
                      {link?.urlLine2 && <span className="block text-white/80">{link.urlLine2}</span>}
                    </div>
                  ))
                ) : (
                  <>
                    {extras?.portfolio && (
                      <div>
                        <span className="block font-bold text-[10px] uppercase opacity-75">Sitio Web</span>
                        <span className="break-all">{extras.portfolio}</span>
                      </div>
                    )}
                    {extras?.linkedin && (
                      <div>
                        <span className="block font-bold text-[10px] uppercase opacity-75">LinkedIn</span>
                        <span className="break-all">{extras.linkedin}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* HABILIDADES / SKILLS */}
            {skills && skills.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-black uppercase tracking-widest border-b border-white/30 pb-1 text-[13px]">
                  Habilidades
                </h3>
                <div className="space-y-2 text-[12px]">
                  {skills.slice(0, 6).map((skill) => (
                    <div key={skill.id} className="space-y-1">
                      <div className="flex justify-between font-bold">
                        <span>{skill.name}</span>
                      </div>
                      <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden flex">
                        <div className="h-full rounded-full bg-white" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IDIOMAS (Función de plantilla 10 añadida) */}
            {languages && languages.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-black uppercase tracking-widest border-b border-white/30 pb-1 text-[13px]">
                  Idiomas
                </h3>
                <div className="space-y-1.5 text-[12px]">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center font-medium">
                      <span>{lang.name}</span>
                      <span className="opacity-75">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Pie lateral */}
          <div className="text-[10px] text-white/70 text-center pt-2 border-t border-white/20">
            CVRD.DO — Operations Director
          </div>

        </div>
      </div>

      {/* ================= COLUMNA DERECHA PRINCIPAL ================= */}
      <div className="flex-1 bg-white p-8 flex flex-col justify-between relative text-[12px]">
        
        <div className="space-y-4">
          
          {/* ENCABEZADO: NOMBRE INTACTO EN TAMAÑO 53px */}
          <div className="border-b border-gray-200 pb-3">
            <h1 className="tracking-tight leading-none uppercase" style={{ fontSize: '53px' }}>
              <span className="font-black text-gray-900 block">{firstName}</span>
              <span className="font-light text-gray-600 block mt-1">{lastName}</span>
            </h1>
            
            {/* ETIQUETA DE PUESTO DINÁMICA */}
            <div className="mt-2.5 inline-block px-3.5 py-1 text-white font-black text-[12px] uppercase tracking-widest shadow-sm" style={{ backgroundColor: accentColor }}>
              {personal?.title || 'DIRECTOR DE OPERACIONES'}
            </div>
          </div>

          {/* PERFIL PROFESIONAL (Corregido con respiro, caja limpia y justificado) */}
          {profile && (
            <div className="space-y-1.5">
              <h3 className="font-black uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1 text-[13px]">
                Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-normal bg-gray-50 p-3 rounded-lg border border-gray-100">
                {profile}
              </p>
            </div>
          )}

          {/* EXPERIENCIA LABORAL */}
          {experience && experience.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1 text-[13px]">
                Experiencia Laboral
              </h3>
              
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-black text-gray-900 text-[13px] uppercase">{exp.company}</h4>
                      <span className="text-gray-500 font-semibold text-[12px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="font-bold text-[12px]" style={{ color: accentColor }}>{exp.role}</p>
                    <p className="text-gray-700 leading-relaxed text-[12px] whitespace-pre-line text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCACIÓN */}
          {education && education.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1 text-[13px]">
                Educación
              </h3>
              
              <div className="space-y-2">
                {education.slice(0, 2).map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-black text-gray-900 text-[13px] uppercase">{edu.institution}</h4>
                      <span className="text-gray-500 font-semibold text-[12px]">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <p className="font-bold text-[12px]" style={{ color: accentColor }}>{edu.degree}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REFERENCIAS */}
          {references && references.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1 text-[13px]">
                Referencias
              </h3>
              
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                {references.slice(0, 2).map((ref) => (
                  <div key={ref.id} className="space-y-0.5 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                    <p className="font-black text-gray-900 text-[12px]">{ref.name}</p>
                    <p className="text-gray-600 font-medium text-[12px]">{ref.position} - {ref.company}</p>
                    <p className="font-bold text-gray-800 text-[12px]">Tel: {ref.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Pie derecho */}
        <div className="flex justify-between items-center text-[12px] text-gray-400 pt-3 border-t border-gray-200">
          <span>Template Operations Director</span>
          <span>CVRD.DO — Premium</span>
        </div>

      </div>
    </div>
  );
}