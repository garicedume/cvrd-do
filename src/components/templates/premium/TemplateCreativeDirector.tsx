import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateCreativeDirector({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // DINÁMICO: Conectado al selector de color de acento del editor (Pestaña 9)
  const accentColor = styles?.accentColor || '#facc15'; 
  const sidebarBg = '#f3f4f6'; // Gris muy claro elegante de la barra lateral

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex text-[12px]"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA IZQUIERDA CLARA CON FOTO EN CÚPULA DINÁMICA ================= */}
      <div 
        className="w-75 flex flex-col justify-between relative shrink-0 overflow-hidden border-r border-gray-200 text-[12px]"
        style={{ backgroundColor: sidebarBg }}
      >
        
        {/* Contenedor Superior con el fondo dinámico en arco para la foto */}
        <div 
          className="w-full flex flex-col items-center pt-8 pb-6 relative transition-colors duration-200"
          style={{ backgroundColor: accentColor }}
        >
          {personal?.showPhoto && (
            <div 
              className={`bg-gray-300 overflow-hidden border-4 border-white shadow-md flex items-center justify-center shrink-0 ${photoShapeClass}`}
              style={{ width: '160px', height: '160px' }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
              ) : (
                <span className="text-[12px] text-gray-500 font-bold">FOTO 160x160</span>
              )}
            </div>
          )}
        </div>

        {/* CONTENIDO DE LA BARRA LATERAL */}
        <div className="flex-1 p-6 space-y-6 flex flex-col justify-between text-[12px]">
          
          <div className="space-y-6 text-[12px]">
            
            {/* CONTACTO */}
            <div className="space-y-2.5 text-[12px]">
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-300 pb-1 flex items-center gap-2">
                <span>Contacto</span>
              </h3>
              <div className="text-[12px] text-gray-700 space-y-2">
                {personal?.phone && (
                  <div className="flex items-start gap-2 text-[12px]">
                    <span className="font-bold mt-0.5" style={{ color: accentColor === '#facc15' ? '#d97706' : accentColor }}>📞</span>
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal?.email && (
                  <div className="flex items-start gap-2 text-[12px]">
                    <span className="font-bold mt-0.5" style={{ color: accentColor === '#facc15' ? '#d97706' : accentColor }}>✉️</span>
                    <span className="break-all">{personal.email}</span>
                  </div>
                )}
                {personal?.location && (
                  <div className="flex items-start gap-2 text-[12px]">
                    <span className="font-bold mt-0.5" style={{ color: accentColor === '#facc15' ? '#d97706' : accentColor }}>📍</span>
                    <span>{personal.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-2.5 text-[12px]">
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-300 pb-1 flex items-center gap-2">
                  <span>Educación</span>
                </h3>
                <div className="space-y-3 text-[12px] text-gray-700">
                  {education.slice(0, 2).map((edu) => (
                    <div key={edu.id} className="space-y-0.5 text-[12px]">
                      <p className="font-bold text-gray-900 text-[12px]">{edu.degree}</p>
                      <p className="text-gray-600 text-[12px]">{edu.institution}</p>
                      <p className="text-gray-500 text-[12px] font-semibold">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REFERENCIAS */}
            {references && references.length > 0 && (
              <div className="space-y-2.5 text-[12px]">
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-300 pb-1 flex items-center gap-2">
                  <span>Referencias</span>
                </h3>
                <div className="space-y-3 text-[12px] text-gray-700">
                  {references.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5 relative pl-2 border-l-2 text-[12px]" style={{ borderColor: accentColor }}>
                      <p className="font-bold text-gray-900 text-[12px]">{ref.name}</p>
                      <p className="text-gray-600 text-[12px]">{ref.position} - {ref.company}</p>
                      <p className="text-gray-500 text-[12px]">{ref.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Pie de barra lateral */}
          <div className="text-[12px] text-gray-400 text-center pt-2 border-t border-gray-200">
            CVRD.DO — Creative Director
          </div>

        </div>
      </div>

      {/* ================= COLUMNA DERECHA PRINCIPAL ================= */}
      <div className="flex-1 bg-white p-8 flex flex-col justify-between relative text-[12px]">
        
        <div className="space-y-6 text-[12px]">
          
          {/* ENCABEZADO: NOMBRE A EXACTAMENTE 53px (REGLA DE ORO 1) */}
          <div className="border-b-2 pb-5" style={{ borderColor: `${accentColor}80` }}>
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '53px' }}>
              <span className="font-black text-gray-900 uppercase">{firstName}</span>
              <span className="font-normal text-gray-600 uppercase">{lastName}</span>
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] mt-2" style={{ color: accentColor === '#facc15' ? '#d97706' : accentColor }}>
              {personal?.title}
            </p>
          </div>

          {/* PERFIL PROFESIONAL */}
          {profile && (
            <div className="space-y-2 text-[12px]">
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1">
                Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-normal">
                {profile}
              </p>
            </div>
          )}

          {/* EXPERIENCIA LABORAL CON ACENTOS DINÁMICOS */}
          {experience && experience.length > 0 && (
            <div className="space-y-3 text-[12px]">
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1">
                Experiencia Laboral
              </h3>
              
              <div className="space-y-4 text-[12px]">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2 space-y-1 text-[12px]" style={{ borderColor: accentColor }}>
                    <div className="flex justify-between items-baseline text-[12px]">
                      <h4 className="font-black text-gray-900 text-[12px] uppercase">{exp.role}</h4>
                      <span className="text-gray-500 font-semibold text-[12px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-gray-600 text-[12px] font-semibold">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed text-[12px] whitespace-pre-line text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HABILIDADES & COMPETENCIAS */}
          <div className="space-y-3 text-[12px]">
            <h3 className="text-[12px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1">
              Habilidades & Competencias
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-[12px]">
              {skills && skills.length > 0 && (
                <div className="space-y-2 text-[12px]">
                  {skills.slice(0, 4).map((skill) => (
                    <div key={skill.id} className="space-y-0.5 text-[12px]">
                      <div className="flex justify-between font-semibold text-gray-700 text-[12px]">
                        <span>{skill.name}</span>
                        <span style={{ color: accentColor === '#facc15' ? '#d97706' : accentColor }}>★★★★★</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: accentColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {languages && languages.length > 0 && (
                <div className="space-y-2 text-[12px]">
                  {languages.slice(0, 3).map((lang) => (
                    <div key={lang.id} className="space-y-0.5 text-[12px]">
                      <div className="flex justify-between font-semibold text-gray-700 text-[12px]">
                        <span>{lang.name}</span>
                        <span className="text-gray-500">{lang.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gray-800" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* INTERESES */}
          <div className="space-y-2 text-[12px]">
            <h3 className="text-[12px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1">
              Intereses
            </h3>
            <div className="flex flex-wrap gap-2 text-[12px] font-semibold text-gray-700 pt-1">
              <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md text-[12px]">▪ Innovación Digital</span>
              <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md text-[12px]">▪ Dirección de Arte</span>
              <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md text-[12px]">▪ Desarrollo Web</span>
              <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md text-[12px]">▪ Fotografía</span>
            </div>
          </div>

        </div>

        {/* Pie derecho */}
        <div className="flex justify-between items-center text-[12px] text-gray-400 pt-3 border-t border-gray-200">
          <span>Template Creative Director</span>
          <span>CVRD.DO — Premium</span>
        </div>

      </div>
    </div>
  );
}