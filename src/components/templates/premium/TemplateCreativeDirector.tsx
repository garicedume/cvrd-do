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
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA IZQUIERDA CLARA CON FOTO EN CÚPULA DINÁMICA ================= */}
      <div 
        className="w-75 flex flex-col justify-between relative shrink-0 overflow-hidden border-r border-gray-200"
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
              style={{ width: '135px', height: '145px' }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-500 font-bold">FOTO</span>
              )}
            </div>
          )}
        </div>

        {/* CONTENIDO DE LA BARRA LATERAL */}
        <div className="flex-1 p-6 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* CONTACTO */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-300 pb-1 flex items-center gap-2">
                <span>Contacto</span>
              </h3>
              <div className="text-[10px] text-gray-700 space-y-2">
                {personal?.phone && (
                  <div className="flex items-start gap-2">
                    <span className="font-bold mt-0.5" style={{ color: accentColor === '#facc15' ? '#d97706' : accentColor }}>📞</span>
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal?.email && (
                  <div className="flex items-start gap-2">
                    <span className="font-bold mt-0.5" style={{ color: accentColor === '#facc15' ? '#d97706' : accentColor }}>✉️</span>
                    <span className="break-all">{personal.email}</span>
                  </div>
                )}
                {personal?.location && (
                  <div className="flex items-start gap-2">
                    <span className="font-bold mt-0.5" style={{ color: accentColor === '#facc15' ? '#d97706' : accentColor }}>📍</span>
                    <span>{personal.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-300 pb-1 flex items-center gap-2">
                  <span>Educación</span>
                </h3>
                <div className="space-y-3 text-[10px] text-gray-700">
                  {education.slice(0, 2).map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <p className="font-bold text-gray-900 text-[11px]">{edu.degree}</p>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-gray-500 text-[9px] font-semibold">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REFERENCIAS */}
            {references && references.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-300 pb-1 flex items-center gap-2">
                  <span>Referencias</span>
                </h3>
                <div className="space-y-3 text-[10px] text-gray-700">
                  {references.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5 relative pl-2 border-l-2" style={{ borderColor: accentColor }}>
                      <p className="font-bold text-gray-900 text-[11px]">{ref.name}</p>
                      <p className="text-gray-600">{ref.position} - {ref.company}</p>
                      <p className="text-gray-500">{ref.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Pie de barra lateral */}
          <div className="text-[9px] text-gray-400 text-center pt-2 border-t border-gray-200">
            CVRD.DO — Creative Director
          </div>

        </div>
      </div>

      {/* ================= COLUMNA DERECHA PRINCIPAL ================= */}
      <div className="flex-1 bg-white p-8 flex flex-col justify-between relative">
        
        <div className="space-y-6">
          
          {/* ENCABEZADO: NOMBRE A EXACTAMENTE 53px (REGLA DE ORO 1) */}
          <div className="border-b-2 pb-5" style={{ borderColor: `${accentColor}80` }}>
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '53px' }}>
              <span className="font-black text-gray-900 uppercase">{firstName}</span>
              <span className="font-light text-gray-600 uppercase">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mt-2" style={{ color: accentColor === '#facc15' ? '#d97706' : accentColor }}>
              {personal?.title}
            </p>
          </div>

          {/* PERFIL PROFESIONAL (REGLA DE ORO 6: JUSTIFICADO) */}
          {profile && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1">
                Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed text-[11px] text-justify font-normal">
                {profile}
              </p>
            </div>
          )}

          {/* EXPERIENCIA LABORAL CON ACENTOS DINÁMICOS */}
          {experience && experience.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1">
                Experiencia Laboral
              </h3>
              
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2 space-y-1" style={{ borderColor: accentColor }}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-black text-gray-900 text-[11px] uppercase">{exp.role}</h4>
                      <span className="text-gray-500 font-semibold text-[10px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-gray-600 text-[10px] font-semibold">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed text-[10px] whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HABILIDADES & COMPETENCIAS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1">
              Habilidades & Competencias
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-[10px]">
              {skills && skills.length > 0 && (
                <div className="space-y-2">
                  {skills.slice(0, 4).map((skill) => (
                    <div key={skill.id} className="space-y-0.5">
                      <div className="flex justify-between font-semibold text-gray-700">
                        <span>{skill.name}</span>
                        <span style={{ color: accentColor === '#facc15' ? '#d97706' : accentColor }}>★★★★★</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: accentColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {languages && languages.length > 0 && (
                <div className="space-y-2">
                  {languages.slice(0, 3).map((lang) => (
                    <div key={lang.id} className="space-y-0.5">
                      <div className="flex justify-between font-semibold text-gray-700">
                        <span>{lang.name}</span>
                        <span className="text-gray-500">{lang.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gray-800" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* INTERESES */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1">
              Intereses
            </h3>
            <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-gray-700 pt-1">
              <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md">▪ Innovación Digital</span>
              <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md">▪ Dirección de Arte</span>
              <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md">▪ Desarrollo Web</span>
              <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md">▪ Fotografía</span>
            </div>
          </div>

        </div>

        {/* Pie derecho */}
        <div className="flex justify-between items-center text-[10px] text-gray-400 pt-3 border-t border-gray-200">
          <span>Template Creative Director</span>
          <span>CVRD.DO — Premium</span>
        </div>

      </div>
    </div>
  );
}