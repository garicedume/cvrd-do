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

export default function TemplateTechLeadPro({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, styles, extras } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // DINÁMICO: Conectado al selector de color de acento del editor (Pestaña 9)
  const accentColor = styles?.accentColor || '#d4b89c'; 
  const slateDark = '#334155'; // Azul pizarra oscuro característico de la referencia
  const nudeBoxBg = '#f5efe6'; // Fondo suave del bloque izquierdo

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex flex-col justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div className="flex flex-col h-full p-8 box-border justify-between relative z-10 text-[12px]">
        
        {/* ================= CABECERA SUPERIOR (NOMBRE EN UNA SOLA FILA) ================= */}
        <div className="grid grid-cols-12 gap-6 items-center pb-4 border-b border-gray-200">
          
          {/* FOTO CON TAMAÑO EXACTO 150x150 px (IZQUIERDA) */}
          {personal?.showPhoto && (
            <div className="col-span-3 flex justify-center">
              <div 
                className={`overflow-hidden border-4 border-white shadow-lg flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '150px', height: '150px' }}
              >
                {personal?.photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
                ) : (
                  <span className="text-[12px] text-gray-400 font-bold">FOTO 150x150</span>
                )}
              </div>
            </div>
          )}

          {/* NOMBRE EN UNA SOLA FILA + PUESTO + CONTACTO (DERECHA) */}
          <div className={`${personal?.showPhoto ? 'col-span-9' : 'col-span-12'} flex flex-col justify-center`}>
            {/* REGLA DE ORO: Nombre en una sola fila horizontal con control de desbordamiento */}
            <h1 className="tracking-tight leading-none uppercase flex items-baseline gap-3 whitespace-nowrap overflow-hidden" style={{ fontSize: '53px' }}>
              <span className="font-black" style={{ color: slateDark }}>{firstName}</span>
              <span className="font-light text-gray-700">{lastName}</span>
            </h1>
            <p className="font-bold uppercase tracking-[0.25em] mt-2 text-[13px]" style={{ color: accentColor }}>
              {personal?.title || 'TECH LEAD & ARCHITECT'}
            </p>

            {/* CONTACTO COMPLETO EN CABECERA */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-gray-600 mt-2.5 font-medium">
              {personal?.phone && <span>📞 {personal.phone}</span>}
              {personal?.secondaryPhone && <span className="text-gray-500">📞 {personal.secondaryPhone}</span>}
              {personal?.email && <span className="break-all">✉️ {personal.email}</span>}
              {personal?.secondaryEmail && <span className="break-all text-gray-500">✉️ {personal.secondaryEmail}</span>}
              {personal?.location && <span>📍 {personal.location}</span>}
              {personal?.locationLine2 && <span className="text-gray-500">{personal.locationLine2}</span>}

              {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
                (extras.customLinks as CustomLink[]).map((link, idx) => (
                  <span key={idx} className="break-all">🔗 {link?.label || 'Enlace'}: {link?.url}</span>
                ))
              ) : (
                <>
                  {extras?.linkedin && <span className="break-all">🔗 {extras.linkedin}</span>}
                  {extras?.portfolio && <span className="break-all">🌐 {extras.portfolio}</span>}
                </>
              )}
            </div>
          </div>

        </div>

        {/* ================= PERFIL PROFESIONAL / SOBRE MÍ ================= */}
        {profile && (
          <div className="space-y-1.5 py-1 text-[12px]">
            <h3 className="font-black uppercase tracking-wider text-[13px]" style={{ color: accentColor }}>Sobre Mí</h3>
            <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-normal bg-gray-50 p-3 rounded-lg border border-gray-100">
              {profile}
            </p>
          </div>
        )}

        {/* ================= CUERPO PRINCIPAL EN 2 COLUMNAS ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1 pt-2 text-[12px]">
          
          {/* ================= COLUMNA IZQUIERDA (EXPERIENCIA E IDIOMAS CON FONDO NUDE) ================= */}
          <div className="col-span-6 flex flex-col p-4 rounded-xl space-y-5 text-[12px]" style={{ backgroundColor: nudeBoxBg }}>
            
            {/* Experiencia Laboral */}
            <div className="space-y-3 text-[12px]">
              <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                <h3 className="font-black uppercase tracking-wider text-[13px]" style={{ color: slateDark }}>Experiencia Laboral</h3>
              </div>

              <div className="space-y-3.5 text-[12px]">
                {experience && experience.length > 0 ? (
                  experience.map((exp) => (
                    <div key={exp.id} className="relative space-y-1 border-l-2 pl-3 text-[12px]" style={{ borderColor: slateDark }}>
                      <div className="flex justify-between items-baseline text-[12px]">
                        <h4 className="font-black text-[13px] uppercase" style={{ color: slateDark }}>{exp.role}</h4>
                        <span className="font-bold text-[12px]" style={{ color: accentColor }}>{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="font-semibold text-gray-700 text-[12px]">{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed text-[12px] text-justify">{exp.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[12px] text-gray-500 italic">Agrega tu experiencia laboral en el editor.</p>
                )}
              </div>
            </div>

            {/* Idiomas (Debajo de Experiencia Laboral) */}
            {languages && languages.length > 0 && (
              <div className="space-y-2 text-[12px]">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="font-black uppercase tracking-wider text-[13px]" style={{ color: slateDark }}>Idiomas</h3>
                </div>
                <div className="space-y-1.5 pl-2 text-[12px]">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center font-bold text-[12px]">
                      <span className="text-gray-800 uppercase">{lang.name}</span>
                      <span className="text-gray-600 font-semibold text-[12px]">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ================= COLUMNA DERECHA (EDUCACIÓN, HABILIDADES Y REFERENCIAS) ================= */}
          <div className="col-span-6 flex flex-col space-y-4 pl-2 text-[12px]">
            
            {/* Educación */}
            {education && education.length > 0 && (
              <div className="space-y-2 text-[12px]">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="font-black uppercase tracking-wider text-[13px]" style={{ color: slateDark }}>Educación</h3>
                </div>
                
                <div className="space-y-2.5 pl-2 text-[12px]">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline border-b border-gray-100 pb-1.5 text-[12px]">
                      <div>
                        <h4 className="font-black text-[13px] uppercase" style={{ color: slateDark }}>{edu.degree}</h4>
                        <p className="text-gray-600 text-[12px]">{edu.institution}</p>
                      </div>
                      <span className="font-bold text-[12px]" style={{ color: accentColor }}>{edu.startDate} - {edu.endDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Habilidades / Skills */}
            {skills && skills.length > 0 && (
              <div className="space-y-2 text-[12px]">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="font-black uppercase tracking-wider text-[13px]" style={{ color: slateDark }}>Habilidades</h3>
                </div>
                <div className="space-y-2 pl-2 text-[12px]">
                  {skills.map((skill) => (
                    <div key={skill.id} className="space-y-0.5 text-[12px]">
                      <div className="flex justify-between font-bold text-gray-800 uppercase text-[12px]">
                        <span>{skill.name}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden flex">
                        <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referencias (Diseño minimalista tipo lista) */}
            {references && references.length > 0 && (
              <div className="space-y-2 text-[12px]">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="font-black uppercase tracking-wider text-[13px]" style={{ color: slateDark }}>Referencias</h3>
                </div>
                <div className="space-y-3 pl-2 text-[12px]">
                  {references.slice(0, 2).map((ref, idx) => (
                    <div key={ref.id} className={`space-y-0.5 text-[12px] ${idx > 0 ? 'pt-2 border-t border-gray-100' : ''}`}>
                      <div className="flex justify-between items-baseline">
                        <p className="font-black text-gray-900 text-[13px]">{ref.name}</p>
                        <p className="font-bold text-[12px]" style={{ color: accentColor }}>Tel: {ref.phone}</p>
                      </div>
                      <p className="text-gray-600 font-medium text-[12px]">{ref.position} — <span className="italic">{ref.company}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= PIE DE PÁGINA ================= */}
        <div className="pt-3 border-t border-gray-200 mt-2 flex justify-between items-center text-[12px] text-gray-400">
          <span>Template Tech Lead Pro</span>
          <span>CVRD.DO — Premium Edition</span>
        </div>

      </div>
    </div>
  );
}