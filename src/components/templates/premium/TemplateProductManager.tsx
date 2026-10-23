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

export default function TemplateProductManager({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, styles, extras } = data;

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

      <div className="flex flex-col h-full p-8 box-border justify-between relative z-10 text-[12px]">
        
        {/* ================= CABECERA SUPERIOR (FOTO + NOMBRE) ================= */}
        <div className="flex flex-col items-center pb-3 text-[12px]">
          
          {/* FOTO CON TAMAÑO EXACTO 150x150 px */}
          {personal?.showPhoto && (
            <div className="mb-3">
              <div 
                className={`bg-gray-200 overflow-hidden border-4 border-white shadow-xl flex items-center justify-center shrink-0 ${photoShapeClass}`}
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

          {/* NOMBRE INTACTO EN TAMAÑO 53px */}
          <div className="text-center text-[12px]">
            <h1 className="tracking-tight leading-none flex items-center justify-center gap-3 uppercase whitespace-nowrap overflow-hidden" style={{ fontSize: '53px' }}>
              <span className="font-black text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="font-bold uppercase tracking-[0.3em] mt-1.5 text-gray-500 text-[13px]">
              {personal?.title || 'GERENTE DE PRODUCTO'}
            </p>
          </div>

        </div>

        {/* ================= CUERPO PRINCIPAL EN 2 COLUMNAS ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1 pt-2 text-[12px]">
          
          {/* ================= COLUMNA IZQUIERDA ================= */}
          <div className="col-span-5 flex flex-col space-y-4 pr-4 border-r border-gray-200 text-[12px]">
            
            {/* SOBRE MÍ / PERFIL */}
            {profile && (
              <div className="space-y-1.5 text-[12px]">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="font-black uppercase tracking-wider text-gray-900 text-[13px]">Sobre Mí</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-[12px] text-justify font-normal bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {profile}
                </p>
              </div>
            )}

            {/* CONTACTO */}
            <div className="space-y-1.5 text-[12px]">
              <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                <h3 className="font-black uppercase tracking-wider text-gray-900 text-[13px]">Contacto</h3>
              </div>
              <div className="text-[12px] text-gray-700 space-y-1.5 font-medium">
                {personal?.phone && <p>📞 {personal.phone}</p>}
                {personal?.secondaryPhone && <p className="text-gray-500">📞 {personal.secondaryPhone}</p>}
                {personal?.email && <p className="break-all">✉️ {personal.email}</p>}
                {personal?.secondaryEmail && <p className="break-all text-gray-500">✉️ {personal.secondaryEmail}</p>}
                {personal?.location && <p>📍 {personal.location}</p>}
                {personal?.locationLine2 && <p className="text-gray-500 pl-4">{personal.locationLine2}</p>}

                {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
                  (extras.customLinks as CustomLink[]).map((link, idx) => (
                    <div key={idx} className="break-all pt-1">
                      <span className="font-bold text-gray-900 block">🔗 {link?.label || 'Enlace'}:</span>
                      <span className="block">{link?.url}</span>
                      {link?.urlLine2 && <span className="text-gray-500 block">{link.urlLine2}</span>}
                    </div>
                  ))
                ) : (
                  <>
                    {extras?.linkedin && <p className="break-all pt-1">🔗 {extras.linkedin}</p>}
                    {extras?.portfolio && <p className="break-all pt-1">🌐 {extras.portfolio}</p>}
                  </>
                )}
              </div>
            </div>

            {/* HABILIDADES / SKILLS */}
            {skills && skills.length > 0 && (
              <div className="space-y-1.5 text-[12px]">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="font-black uppercase tracking-wider text-gray-900 text-[13px]">Habilidades</h3>
                </div>
                <div className="space-y-2 text-[12px]">
                  {skills.slice(0, 5).map((skill) => (
                    <div key={skill.id} className="space-y-0.5">
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

          </div>

          {/* ================= COLUMNA DERECHA ================= */}
          <div className="col-span-7 flex flex-col space-y-4 pl-2 text-[12px]">
            
            {/* EDUCACIÓN */}
            {education && education.length > 0 && (
              <div className="space-y-2 text-[12px]">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="font-black uppercase tracking-wider text-gray-900 text-[13px]">Educación</h3>
                </div>
                
                <div className="space-y-2.5 pl-2 border-l-2 ml-1" style={{ borderColor: `${accentColor}80` }}>
                  {education.slice(0, 3).map((edu) => (
                    <div key={edu.id} className="relative space-y-0.5 text-[12px]">
                      <span className="font-bold uppercase text-[12px]" style={{ color: accentColor }}>{edu.startDate} - {edu.endDate}</span>
                      <h4 className="font-black text-gray-900 text-[13px] uppercase">{edu.degree}</h4>
                      <p className="text-gray-600 text-[12px]">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EXPERIENCIA LABORAL */}
            {experience && experience.length > 0 && (
              <div className="space-y-2 text-[12px]">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="font-black uppercase tracking-wider text-gray-900 text-[13px]">Experiencia Laboral</h3>
                </div>
                
                <div className="space-y-3.5 pl-2 border-l-2 ml-1 text-[12px]" style={{ borderColor: `${accentColor}80` }}>
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative space-y-1 text-[12px]">
                      <span className="font-bold uppercase text-[12px]" style={{ color: accentColor }}>{exp.startDate} - {exp.endDate}</span>
                      <h4 className="font-black text-gray-900 text-[13px] uppercase">{exp.role}</h4>
                      <p className="text-gray-600 text-[12px] font-bold">{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed text-[12px] whitespace-pre-line text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IDIOMAS (Movido aquí debajo de Experiencia Laboral) */}
            {languages && languages.length > 0 && (
              <div className="space-y-2 text-[12px]">
                <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: accentColor }}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: accentColor }}></span>
                  <h3 className="font-black uppercase tracking-wider text-gray-900 text-[13px]">Idiomas</h3>
                </div>
                <div className="space-y-1.5 pl-2 text-[12px]">
                  {languages.slice(0, 3).map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center font-bold text-[12px]">
                      <span className="text-gray-800 uppercase">{lang.name}</span>
                      <span className="text-[12px] text-gray-600 font-semibold">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= PIE DE PÁGINA ================= */}
        <div className="pt-3 border-t border-gray-200 mt-2 flex justify-between items-center text-[12px] text-gray-400">
          <span>Template Product Manager</span>
          <span>CVRD.DO — Premium Edition</span>
        </div>

      </div>
    </div>
  );
}