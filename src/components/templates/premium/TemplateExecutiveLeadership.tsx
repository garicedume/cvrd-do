import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateExecutiveLeadership({ data }: Props) {
  const { personal, experience, education, skills, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // DINÁMICO: Conectado al selector de color de acento del editor (Pestaña 9)
  const accentColor = styles?.accentColor || '#334155'; 
  const darkSidebar = '#1e2022';   // Gris carbón oscuro superior de la barra lateral
  const lightSidebar = '#f1f3f5';  // Gris claro inferior de la barra lateral

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
      <div className="w-75 flex flex-col shrink-0 relative overflow-hidden border-r border-gray-200">
        
        {/* PARTE SUPERIOR OSCURA CON FOTO */}
        <div className="p-6 pb-8 flex flex-col items-center relative text-white" style={{ backgroundColor: darkSidebar }}>
          {personal?.showPhoto && (
            <div className="my-3">
              <div 
                className={`bg-gray-700 overflow-hidden border-4 border-white/20 shadow-2xl flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '145px', height: '145px' }}
              >
                {personal?.photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-gray-400 font-bold">FOTO</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* FRANJA MEDIA CON TÍTULO DE CONTACTO */}
        <div className="px-6 py-3 bg-white border-b border-gray-200">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
            Contacto
          </h3>
        </div>

        {/* PARTE INFERIOR CLARA DE LA BARRA LATERAL */}
        <div className="flex-1 p-6 flex flex-col justify-between space-y-6" style={{ backgroundColor: lightSidebar }}>
          
          <div className="space-y-6">
            
            {/* DATOS DE CONTACTO */}
            <div className="text-[10px] text-gray-700 space-y-3">
              {personal?.location && (
                <div className="flex items-start gap-2.5">
                  <span className="text-xs mt-0.5">📍</span>
                  <span className="font-semibold">{personal.location}</span>
                </div>
              )}
              {personal?.phone && (
                <div className="flex items-start gap-2.5">
                  <span className="text-xs mt-0.5">📞</span>
                  <span className="font-semibold">{personal.phone}</span>
                </div>
              )}
              {personal?.email && (
                <div className="flex items-start gap-2.5">
                  <span className="text-xs mt-0.5">✉️</span>
                  <span className="font-semibold break-all">{personal.email}</span>
                </div>
              )}
            </div>

            {/* HABILIDADES / PRO SKILLS */}
            {skills && skills.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-300 pb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Habilidades</h3>
                </div>
                <div className="space-y-2.5 text-[10px]">
                  {skills.slice(0, 5).map((skill) => (
                    <div key={skill.id} className="space-y-1">
                      <div className="flex justify-between font-bold text-gray-800">
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

            {/* REDES / Sigueme */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-300 pb-1.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Enlaces</h3>
              </div>
              <div className="text-[10px] text-gray-700 space-y-1.5 font-semibold">
                {extras?.linkedin && <p className="break-all">🔗 {extras.linkedin}</p>}
                {extras?.portfolio && <p className="break-all">🌐 {extras.portfolio}</p>}
                <p>💼 github.com/carlosmendoza</p>
              </div>
            </div>

          </div>

          {/* Pie lateral */}
          <div className="text-[9px] text-gray-400 text-center pt-2 border-t border-gray-300">
            CVRD.DO — Executive Edition
          </div>

        </div>
      </div>

      {/* ================= COLUMNA DERECHA PRINCIPAL ================= */}
      <div className="flex-1 bg-white p-8 flex flex-col justify-between relative overflow-hidden">
        
        {/* Franja gris superior sutil de fondo para el encabezado */}
        <div className="absolute top-0 right-0 w-full h-32 bg-gray-100/80 pointer-events-none z-0"></div>

        <div className="space-y-5 z-10">
          
          {/* ENCABEZADO: NOMBRE A EXACTAMENTE 53px (REGLA DE ORO 1) CON CONTROL DE ANCHO */}
          <div className="border-b border-gray-300 pb-4 relative">
            <h1 className="tracking-tight leading-none uppercase" style={{ fontSize: '53px' }}>
              <span className="font-black text-gray-900 block">{firstName}</span>
              <span className="font-light text-gray-600 block mt-1" style={{ color: accentColor }}>{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mt-2 text-gray-600">
              {personal?.title}
            </p>
          </div>

          {/* EXPERIENCIA LABORAL */}
          {experience && experience.length > 0 && (
            <div className="space-y-2.5">
              <div className="bg-gray-100 px-3 py-1.5 rounded-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Experiencia Laboral</h3>
              </div>
              
              <div className="space-y-3 pl-2">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative space-y-1 border-l-2 pl-3" style={{ borderColor: accentColor }}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-black text-gray-900 text-[11px] uppercase">{exp.role}</h4>
                      <span className="text-gray-500 font-semibold text-[9px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-gray-600 text-[10px] font-bold">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed text-[10px] whitespace-pre-line text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCACIÓN */}
          {education && education.length > 0 && (
            <div className="space-y-2.5">
              <div className="bg-gray-100 px-3 py-1.5 rounded-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Educación</h3>
              </div>
              
              <div className="space-y-2.5 pl-2">
                {education.slice(0, 3).map((edu) => (
                  <div key={edu.id} className="relative space-y-0.5 border-l-2 pl-3" style={{ borderColor: accentColor }}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-black text-gray-900 text-[11px] uppercase">{edu.degree}</h4>
                      <span className="text-gray-500 font-semibold text-[9px]">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <p className="text-gray-600 text-[10px] font-medium">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REFERENCIAS */}
          {references && references.length > 0 && (
            <div className="space-y-2.5">
              <div className="bg-gray-100 px-3 py-1.5 rounded-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Referencias</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-[10px] pl-2">
                {references.slice(0, 2).map((ref) => (
                  <div key={ref.id} className="space-y-0.5 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                    <p className="font-black text-gray-900 text-[11px]">{ref.name}</p>
                    <p className="text-gray-600 font-medium">{ref.position} - {ref.company}</p>
                    <p className="font-bold text-gray-800">Tel: {ref.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Pie derecho */}
        <div className="flex justify-between items-center text-[10px] text-gray-400 pt-3 border-t border-gray-200 z-10">
          <span>Template Executive Leadership</span>
          <span>CVRD.DO — Premium</span>
        </div>

      </div>
    </div>
  );
}