import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateDataScienceElite({ data }: Props) {
  const { personal, profile, experience, education, skills, references, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // DINÁMICO: Conectado al selector de color de acento del editor (Pestaña 9)
  const accentColor = styles?.accentColor || '#fbbf24'; 
  const darkSidebar = '#1e1e22';   // Gris carbón oscuro superior
  const lightSidebar = '#f3f4f6';  // Gris claro inferior de la barra

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex text-[12px]"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA IZQUIERDA ================= */}
      <div className="w-75 flex flex-col shrink-0 relative overflow-hidden border-r border-gray-200 text-[12px]">
        
        {/* PARTE SUPERIOR OSCURA CON FOTO Y ETIQUETA DINÁMICA */}
        <div className="p-6 pb-5 flex flex-col items-center relative text-[12px]" style={{ backgroundColor: darkSidebar }}>
          {personal?.showPhoto && (
            <div className="my-2">
              <div 
                className={`bg-gray-700 overflow-hidden shadow-2xl flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '160px', height: '160px' }}
              >
                {personal?.photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center grayscale" />
                ) : (
                  <span className="text-[12px] text-gray-400 font-bold">FOTO 160x160</span>
                )}
              </div>
            </div>
          )}

          {/* Etiqueta de Puesto Dinámica */}
          <div className="mt-4 px-4 py-1.5 font-black text-[12px] uppercase tracking-wider text-gray-900 shadow-md text-center" style={{ backgroundColor: accentColor }}>
            {personal?.title || 'UI DESIGNER'}
          </div>
        </div>

        {/* PARTE INFERIOR CLARA DE LA BARRA LATERAL */}
        <div className="flex-1 p-6 flex flex-col justify-between space-y-6 text-[12px]" style={{ backgroundColor: lightSidebar }}>
          
          <div className="space-y-6 text-[12px]">
            
            {/* EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-3 text-[12px]">
                <div className="flex items-center gap-2 border-b border-gray-300 pb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-[12px] font-black uppercase tracking-wider text-gray-900">Educación</h3>
                </div>
                <div className="space-y-3 text-[12px] text-gray-700 pl-2">
                  {education.slice(0, 2).map((edu) => (
                    <div key={edu.id} className="space-y-0.5 relative pl-2 border-l-2 text-[12px]" style={{ borderColor: accentColor }}>
                      <p className="font-black text-gray-900 text-[12px] uppercase">{edu.degree}</p>
                      <p className="text-gray-600 text-[12px]">{edu.institution}</p>
                      <p className="text-gray-500 font-semibold text-[12px]">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EXPERTISE / HABILIDADES */}
            {skills && skills.length > 0 && (
              <div className="space-y-3 text-[12px]">
                <div className="flex items-center gap-2 border-b border-gray-300 pb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-[12px] font-black uppercase tracking-wider text-gray-900">Expertise</h3>
                </div>
                <div className="space-y-2.5 text-[12px] pl-2">
                  {skills.slice(0, 5).map((skill) => (
                    <div key={skill.id} className="space-y-1 text-[12px]">
                      <div className="flex justify-between font-bold text-gray-800 text-[12px]">
                        <span>{skill.name}</span>
                      </div>
                      <div className="w-full bg-gray-300 h-1.5 rounded-full overflow-hidden flex">
                        <div className="h-full" style={{ width: '80%', backgroundColor: accentColor }}></div>
                        <div className="h-full bg-gray-400 flex-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* BLOQUE INFERIOR DE CONTACTO CON COLOR DINÁMICO */}
          <div className="p-4 rounded-xl space-y-2.5 shadow-sm text-[12px]" style={{ backgroundColor: accentColor }}>
            <div className="text-[12px] text-gray-900 space-y-2 font-medium">
              {personal?.phone && (
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="text-[12px]">📞</span>
                  <span className="font-bold">{personal.phone}</span>
                </div>
              )}
              {personal?.email && (
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="text-[12px]">✉️</span>
                  <span className="font-bold break-all">{personal.email}</span>
                </div>
              )}
              {personal?.location && (
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="text-[12px]">📍</span>
                  <span className="font-bold">{personal.location}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ================= COLUMNA DERECHA PRINCIPAL ================= */}
      <div className="flex-1 bg-white p-8 flex flex-col justify-between relative overflow-hidden text-[12px]">
        
        {/* Franja gris superior sutil de fondo para el encabezado */}
        <div className="absolute top-0 right-0 w-full h-32 bg-gray-100 pointer-events-none z-0"></div>

        <div className="space-y-6 z-10 text-[12px]">
          
          {/* ENCABEZADO: NOMBRE A EXACTAMENTE 53px (REGLA DE ORO 1) */}
          <div className="border-b border-gray-300 pb-5 relative">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '53px' }}>
              <span className="font-black text-gray-900 uppercase">{firstName}</span>
              <span className="font-normal text-gray-600 uppercase">{lastName}</span>
            </h1>
            <div className="mt-2 inline-block px-3 py-1 font-black text-[12px] uppercase tracking-widest text-gray-900" style={{ backgroundColor: accentColor }}>
              {personal?.title || 'UI DESIGNER'}
            </div>
          </div>

          {/* PERFIL PROFESIONAL */}
          {profile && (
            <div className="space-y-1.5 relative pt-1 text-[12px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                <h3 className="text-[12px] font-black uppercase tracking-wider text-gray-900">Perfil Profesional</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-normal pl-4">
                {profile}
              </p>
            </div>
          )}

          {/* EXPERIENCIA LABORAL */}
          {experience && experience.length > 0 && (
            <div className="space-y-3 relative pt-1 text-[12px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                <h3 className="text-[12px] font-black uppercase tracking-wider text-gray-900">Experiencia Laboral</h3>
              </div>
              
              <div className="space-y-4 pl-4 pt-1 text-[12px]">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative space-y-1.5 text-[12px]">
                    <div className="flex justify-between items-center text-[12px]">
                      <h4 className="font-black text-gray-900 text-[12px] uppercase">{exp.role}</h4>
                      <span className="px-2.5 py-0.5 rounded text-[12px] font-black text-gray-900 uppercase shadow-2xs" style={{ backgroundColor: accentColor }}>
                        {exp.endDate.toLowerCase() === 'presente' ? 'Presente' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-600 text-[12px] font-bold">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed text-[12px] whitespace-pre-line text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REFERENCIAS */}
          {references && references.length > 0 && (
            <div className="space-y-3 relative pt-1 text-[12px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                <h3 className="text-[12px] font-black uppercase tracking-wider text-gray-900">Referencias</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-[12px] pl-4 pt-1">
                {references.slice(0, 2).map((ref) => (
                  <div key={ref.id} className="space-y-0.5 text-[12px]">
                    <p className="font-black text-gray-900 text-[12px]">{ref.name}</p>
                    <p className="text-gray-600 font-medium text-[12px]">{ref.position} - {ref.company}</p>
                    <p className="font-bold text-gray-800 text-[12px]">Teléfono: {ref.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INTERESES */}
          <div className="space-y-2 relative pt-1 text-[12px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
              <h3 className="text-[12px] font-black uppercase tracking-wider text-gray-900">Intereses</h3>
            </div>
            <div className="flex gap-6 text-[12px] font-bold text-gray-700 pl-4 pt-1">
              <span className="flex items-center gap-1.5">✈️ Viajes</span>
              <span className="flex items-center gap-1.5">🎵 Música</span>
              <span className="flex items-center gap-1.5">✍️ Escritura</span>
              <span className="flex items-center gap-1.5">♟️ Ajedrez</span>
            </div>
          </div>

        </div>

        {/* Pie derecho */}
        <div className="flex justify-between items-center text-[12px] text-gray-400 pt-3 border-t border-gray-200 z-10">
          <span>Template Data Science Elite</span>
          <span>CVRD.DO — Premium</span>
        </div>

      </div>
    </div>
  );
}