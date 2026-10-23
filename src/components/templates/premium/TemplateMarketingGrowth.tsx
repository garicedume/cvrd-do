import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateMarketingGrowth({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, styles, extras } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // DINÁMICO: Conectado al selector de color de acento del editor (Pestaña 9)
  const accentColor = styles?.accentColor || '#0d9488'; 
  const lightBg = '#f8fafc'; // Fondo sutil muy limpio

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex flex-col justify-between text-[12px]"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= FRANJA SUPERIOR DINÁMICA ================= */}
      <div className="w-full h-4 transition-colors duration-200" style={{ backgroundColor: accentColor }}></div>

      <div className="flex flex-col h-full px-8 py-4 box-border justify-between text-[12px]">
        
        {/* ================= CABECERA (FOTO + NOMBRE) ================= */}
        <div className="grid grid-cols-12 gap-6 items-center pb-4 border-b border-gray-200">
          
          {/* FOTO CON RESPIRACIÓN ADECUADA (IZQUIERDA) */}
          {personal?.showPhoto && (
            <div className="col-span-4 flex justify-center">
              <div 
                className={`overflow-hidden border-4 shadow-md flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '130px', height: '130px', borderColor: accentColor }}
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

          {/* NOMBRE A EXACTAMENTE 53px EN UNA SOLA FILA + TÍTULO (DERECHA) */}
          <div className={`${personal?.showPhoto ? 'col-span-8' : 'col-span-12'} flex flex-col justify-center bg-gray-50/80 p-4 rounded-xl border border-gray-100`}>
            <h1 className="tracking-tight leading-none flex items-baseline gap-3 uppercase whitespace-nowrap overflow-hidden" style={{ fontSize: '53px' }}>
              <span className="font-black text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] mt-2 text-gray-600">
              {personal?.title || 'PROFESIONAL EN MARKETING & CRECIMIENTO'}
            </p>
          </div>

        </div>

        {/* ================= CUERPO PRINCIPAL EN 2 COLUMNAS ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1 pt-4 text-[12px]">
          
          {/* ================= COLUMNA IZQUIERDA (CONTACTO, REDES, IDIOMAS, HABILIDADES) ================= */}
          <div className="col-span-4 flex flex-col space-y-4 pr-4 border-r border-gray-200 text-[12px]" style={{ backgroundColor: lightBg, margin: '-1rem 0 -1rem -2rem', padding: '1rem 1rem 1rem 2rem' }}>
            
            {/* CONTACTO */}
            <div className="space-y-2 text-[12px]">
              <h3 className="text-[12px] font-black uppercase tracking-wider text-gray-900 border-b pb-1" style={{ borderColor: accentColor }}>
                Contacto
              </h3>
              <div className="text-[12px] text-gray-700 space-y-1.5">
                {personal?.phone && (
                  <div className="flex items-center gap-2 text-[12px]">
                    <span style={{ color: accentColor }}>📞</span>
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal?.email && (
                  <div className="flex items-center gap-2 text-[12px]">
                    <span style={{ color: accentColor }}>✉️</span>
                    <span className="break-all">{personal.email}</span>
                  </div>
                )}
                {personal?.location && (
                  <div className="flex items-center gap-2 text-[12px]">
                    <span style={{ color: accentColor }}>📍</span>
                    <span>{personal.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* REDES SOCIALES */}
            <div className="space-y-2 text-[12px]">
              <h3 className="text-[12px] font-black uppercase tracking-wider text-gray-900 border-b pb-1" style={{ borderColor: accentColor }}>
                Redes Sociales
              </h3>
              <div className="text-[12px] text-gray-700 space-y-1 font-semibold">
                {extras?.linkedin ? <p className="break-all text-[12px]">💼 {extras.linkedin}</p> : <p className="text-[12px]">👥 linkedin.com/in/usuario</p>}
                {extras?.portfolio ? <p className="break-all text-[12px]">🌐 {extras.portfolio}</p> : <p className="text-[12px]">🌐 portafolio.com</p>}
              </div>
            </div>

            {/* IDIOMAS */}
            {languages && languages.length > 0 && (
              <div className="space-y-2 text-[12px]">
                <h3 className="text-[12px] font-black uppercase tracking-wider text-gray-900 border-b pb-1" style={{ borderColor: accentColor }}>
                  Idiomas
                </h3>
                <div className="space-y-1.5 text-[12px]">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center font-bold text-[12px]">
                      <span className="text-gray-800 uppercase">{lang.name}</span>
                      <span className="text-[12px] px-2 py-0.5 rounded text-white" style={{ backgroundColor: accentColor }}>{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HABILIDADES */}
            {skills && skills.length > 0 && (
              <div className="space-y-2 text-[12px]">
                <h3 className="text-[12px] font-black uppercase tracking-wider text-gray-900 border-b pb-1" style={{ borderColor: accentColor }}>
                  Habilidades
                </h3>
                <div className="space-y-2 text-[12px]">
                  {skills.slice(0, 5).map((skill) => (
                    <div key={skill.id} className="space-y-0.5 text-[12px]">
                      <div className="flex justify-between font-bold text-gray-800 uppercase text-[12px]">
                        <span>{skill.name}</span>
                      </div>
                      <div className="w-full bg-gray-300 h-1.5 rounded-full overflow-hidden flex">
                        <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ================= COLUMNA DERECHA (PERFIL, EXPERIENCIA, EDUCACIÓN) ================= */}
          <div className="col-span-8 flex flex-col space-y-4 pl-2 text-[12px]">
            
            {/* PERFIL PROFESIONAL */}
            {profile && (
              <div className="space-y-1.5 text-[12px]">
                <h3 className="text-[12px] font-black uppercase tracking-wider text-gray-900 border-b pb-1" style={{ borderColor: accentColor }}>
                  Perfil Profesional
                </h3>
                <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-normal">
                  {profile}
                </p>
              </div>
            )}

            {/* EXPERIENCIA LABORAL */}
            {experience && experience.length > 0 && (
              <div className="space-y-2 text-[12px]">
                <h3 className="text-[12px] font-black uppercase tracking-wider text-gray-900 border-b pb-1" style={{ borderColor: accentColor }}>
                  Experiencia Laboral
                </h3>
                
                <div className="space-y-3 pl-2 text-[12px]">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative space-y-1 border-l-2 pl-3 text-[12px]" style={{ borderColor: accentColor }}>
                      <div className="flex justify-between items-baseline text-[12px]">
                        <h4 className="font-black text-gray-900 text-[12px] uppercase">{exp.role}</h4>
                        <span className="font-semibold text-[12px] px-2 py-0.5 rounded text-white" style={{ backgroundColor: accentColor }}>
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-gray-600 text-[12px] font-bold">{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed text-[12px] whitespace-pre-line text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-2 text-[12px]">
                <h3 className="text-[12px] font-black uppercase tracking-wider text-gray-900 border-b pb-1" style={{ borderColor: accentColor }}>
                  Educación
                </h3>
                
                <div className="space-y-2.5 pl-2 text-[12px]">
                  {education.slice(0, 2).map((edu) => (
                    <div key={edu.id} className="relative space-y-0.5 border-l-2 pl-3 text-[12px]" style={{ borderColor: accentColor }}>
                      <div className="flex justify-between items-baseline text-[12px]">
                        <h4 className="font-black text-gray-900 text-[12px] uppercase">{edu.degree}</h4>
                        <span className="font-semibold text-[12px] px-2 py-0.5 rounded text-white" style={{ backgroundColor: accentColor }}>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      <p className="text-gray-600 text-[12px] font-semibold">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= PIE DE PÁGINA INFERIOR ================= */}
        <div className="pt-3 border-t border-gray-200 mt-2 flex justify-between items-center text-[12px] text-gray-400">
          <span>Template Marketing Growth</span>
          <span>CVRD.DO — Premium Edition</span>
        </div>

      </div>

      {/* ================= FRANJA INFERIOR DINÁMICA ================= */}
      <div className="w-full h-3 transition-colors duration-200" style={{ backgroundColor: accentColor }}></div>
    </div>
  );
}