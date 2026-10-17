import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateTechLeadPro({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // DINÁMICO: Conectado al selector de color de acento del editor (Pestaña 9), respetando el tono nude/beige de la muestra
  const accentColor = styles?.accentColor || '#d4b89c'; 
  const slateDark = '#334155'; // Azul pizarra oscuro característico de la referencia
  const nudeBoxBg = '#f5efe6'; // Fondo suave del bloque de experiencia

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex flex-col justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div className="flex flex-col h-full p-8 box-border justify-between relative z-10">
        
        {/* ================= CABECERA SUPERIOR ================= */}
        <div className="grid grid-cols-12 gap-6 items-center pb-4">
          
          {/* FOTO CON RESPIRACIÓN ADECUADA (IZQUIERDA) */}
          {personal?.showPhoto && (
            <div className="col-span-4 flex justify-center">
              <div 
                className={`overflow-hidden border-4 border-white shadow-lg flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '135px', height: '135px' }}
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

          {/* NOMBRE A EXACTAMENTE 53px + PUESTO + CONTACTO (DERECHA) */}
          <div className={`${personal?.showPhoto ? 'col-span-8' : 'col-span-12'} flex flex-col justify-center`}>
            <h1 className="tracking-tight leading-none uppercase" style={{ fontSize: '53px' }}>
              <span className="font-black block" style={{ color: slateDark }}>{firstName}</span>
              <span className="font-light block mt-1 text-gray-700">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mt-2" style={{ color: accentColor }}>
              {personal?.title || 'TECH LEAD & ARCHITECT'}
            </p>

            {/* CONTACTO RÁPIDO EN CABECERA */}
            <div className="flex flex-wrap gap-4 text-[10px] text-gray-600 mt-2 font-medium">
              {personal?.phone && <span>📞 {personal.phone}</span>}
              {personal?.email && <span className="break-all">✉️ {personal.email}</span>}
              {personal?.location && <span>📍 {personal.location}</span>}
            </div>
          </div>

        </div>

        {/* PERFIL PROFESIONAL / SOBRE MÍ (REGLA DE ORO 6: JUSTIFICADO) */}
        {profile && (
          <div className="space-y-1 pb-2 border-b border-gray-200">
            <h3 className="text-xs font-black uppercase tracking-wider" style={{ color: accentColor }}>Sobre Mí</h3>
            <p className="text-gray-700 leading-relaxed text-[10px] text-justify font-normal">
              {profile}
            </p>
          </div>
        )}

        {/* ================= CUERPO PRINCIPAL EN 2 COLUMNAS ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1 pt-3">
          
          {/* ================= COLUMNA IZQUIERDA (EXPERIENCIA CON FONDO NUDE) ================= */}
          <div className="col-span-6 flex flex-col p-4 rounded-xl space-y-3" style={{ backgroundColor: nudeBoxBg }}>
            <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
              <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
              <h3 className="text-xs font-black uppercase tracking-wider" style={{ color: slateDark }}>Experiencia Laboral</h3>
            </div>

            <div className="space-y-3 flex-1">
              {experience && experience.length > 0 ? (
                experience.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="relative space-y-0.5 border-l-2 pl-2.5" style={{ borderColor: slateDark }}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-black text-[11px] uppercase" style={{ color: slateDark }}>{exp.role}</h4>
                      <span className="text-[9px] font-bold" style={{ color: accentColor }}>{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-[10px] font-semibold text-gray-700">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed text-[9.5px] text-justify">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-[10px] text-gray-500 italic">Agrega tu experiencia laboral en el editor.</p>
              )}
            </div>
          </div>

          {/* ================= COLUMNA DERECHA (HABILIDADES, IDIOMAS, EDUCACIÓN) ================= */}
          <div className="col-span-6 flex flex-col space-y-4 pl-2">
            
            {/* HABILIDADES / SKILLS */}
            {skills && skills.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider" style={{ color: slateDark }}>Habilidades</h3>
                </div>
                <div className="flex justify-around pt-1">
                  {skills.slice(0, 3).map((skill, idx) => (
                    <div key={skill.id} className="flex flex-col items-center">
                      <div 
                        className="w-11 h-11 rounded-full border-2 flex items-center justify-center font-black text-[10px]"
                        style={{ borderColor: slateDark, color: slateDark }}
                      >
                        {idx === 0 ? '85%' : idx === 1 ? '75%' : '60%'}
                      </div>
                      <span className="text-[9px] font-bold text-gray-700 mt-1 uppercase">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IDIOMAS */}
            {languages && languages.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider" style={{ color: slateDark }}>Idiomas</h3>
                </div>
                <div className="space-y-1.5 text-[10px]">
                  {languages.slice(0, 3).map((lang) => (
                    <div key={lang.id} className="space-y-0.5">
                      <div className="flex justify-between font-bold text-gray-800 uppercase text-[9px]">
                        <span>{lang.name}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden flex">
                        <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: accentColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="text-xs font-black uppercase tracking-wider" style={{ color: slateDark }}>Educación</h3>
                </div>
                
                <div className="space-y-2 pl-2">
                  {education.slice(0, 2).map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline border-b border-gray-100 pb-1">
                      <div>
                        <h4 className="font-black text-[10px] uppercase" style={{ color: slateDark }}>{edu.degree}</h4>
                        <p className="text-gray-600 text-[9px]">{edu.institution}</p>
                      </div>
                      <span className="text-[9px] font-bold" style={{ color: accentColor }}>{edu.startDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= PIE DE PÁGINA ================= */}
        <div className="pt-3 border-t border-gray-200 mt-2 flex justify-between items-center text-[10px] text-gray-400">
          <span>Template Tech Lead Pro</span>
          <span>CVRD.DO — Premium Edition</span>
        </div>

      </div>
    </div>
  );
}