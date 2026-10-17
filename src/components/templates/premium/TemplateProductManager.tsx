import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateProductManager({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // DINÁMICO: Conectado al selector de color de acento del editor (Pestaña 9)
  const accentColor = styles?.accentColor || '#d4b2a7'; 

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex flex-col justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= FORMAS DE FONDO SUPERIORES ORGÁNICAS ================= */}
      <div 
        className="absolute top-0 left-0 w-full h-36 opacity-30 pointer-events-none rounded-b-[100%] transition-colors duration-200"
        style={{ backgroundColor: accentColor }}
      ></div>

      <div className="flex flex-col h-full p-8 box-border justify-between relative z-10">
        
        {/* ================= CABECERA SUPERIOR (FOTO + NOMBRE) ================= */}
        <div className="flex flex-col items-center pb-3">
          
          {/* FOTO CON RESPIRACIÓN ADECUADA (CENTRAL SUPERIOR) */}
          {personal?.showPhoto && (
            <div className="mb-3">
              <div 
                className={`bg-gray-200 overflow-hidden border-4 border-white shadow-xl flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '130px', height: '130px' }}
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

          {/* NOMBRE A EXACTAMENTE 53px EN UNA SOLA FILA + TÍTULO */}
          <div className="text-center">
            <h1 className="tracking-tight leading-none flex items-center justify-center gap-3 uppercase whitespace-nowrap overflow-hidden" style={{ fontSize: '53px' }}>
              <span className="font-black text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mt-1.5 text-gray-500">
              {personal?.title || 'GERENTE DE MARKETING'}
            </p>
          </div>

        </div>

        {/* ================= CUERPO PRINCIPAL EN 2 COLUMNAS ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1 pt-2">
          
          {/* ================= COLUMNA IZQUIERDA ================= */}
          <div className="col-span-5 flex flex-col space-y-4 pr-4 border-r border-gray-200">
            
            {/* SOBRE MÍ / PERFIL (REGLA DE ORO 6: JUSTIFICADO) */}
            {profile && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Sobre Mí</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-[10px] text-justify font-normal">
                  {profile}
                </p>
              </div>
            )}

            {/* CONTACTO */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Contacto</h3>
              </div>
              <div className="text-[10px] text-gray-700 space-y-1.5 font-medium">
                {personal?.phone && <p>📞 {personal.phone}</p>}
                {personal?.email && <p className="break-all">✉️ {personal.email}</p>}
                {personal?.location && <p>📍 {personal.location}</p>}
              </div>
            </div>

            {/* HABILIDADES / SKILLS */}
            {skills && skills.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Habilidades</h3>
                </div>
                <div className="space-y-2 text-[10px]">
                  {skills.slice(0, 4).map((skill) => (
                    <div key={skill.id} className="space-y-0.5">
                      <div className="flex justify-between font-bold text-gray-800 uppercase text-[9px]">
                        <span>{skill.name}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden flex">
                        <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IDIOMAS */}
            {languages && languages.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Idiomas</h3>
                </div>
                <div className="space-y-1 text-[10px]">
                  {languages.slice(0, 3).map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center font-bold">
                      <span className="text-gray-800 uppercase text-[9px]">{lang.name}</span>
                      <span className="text-[9px]" style={{ color: accentColor }}>●●●●○</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ================= COLUMNA DERECHA ================= */}
          <div className="col-span-7 flex flex-col space-y-4 pl-2">
            
            {/* EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Educación</h3>
                </div>
                
                <div className="space-y-2.5 pl-2 border-l-2 ml-1" style={{ borderColor: `${accentColor}80` }}>
                  {education.slice(0, 3).map((edu) => (
                    <div key={edu.id} className="relative space-y-0.5">
                      <span className="text-[9px] font-bold uppercase" style={{ color: accentColor }}>{edu.startDate} - {edu.endDate}</span>
                      <h4 className="font-black text-gray-900 text-[11px] uppercase">{edu.degree}</h4>
                      <p className="text-gray-600 text-[10px]">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EXPERIENCIA LABORAL */}
            {experience && experience.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Experiencia Laboral</h3>
                </div>
                
                <div className="space-y-3 pl-2 border-l-2 ml-1" style={{ borderColor: `${accentColor}80` }}>
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative space-y-1">
                      <span className="text-[9px] font-bold uppercase" style={{ color: accentColor }}>{exp.startDate} - {exp.endDate}</span>
                      <h4 className="font-black text-gray-900 text-[11px] uppercase">{exp.role}</h4>
                      <p className="text-gray-600 text-[10px] font-bold">{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed text-[10px] whitespace-pre-line text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= PIE DE PÁGINA ================= */}
        <div className="pt-3 border-t border-gray-200 mt-2 flex justify-between items-center text-[10px] text-gray-400">
          <span>Template Product Manager</span>
          <span>CVRD.DO — Premium Edition</span>
        </div>

      </div>
    </div>
  );
}