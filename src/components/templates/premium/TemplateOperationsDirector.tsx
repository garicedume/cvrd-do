import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateOperationsDirector({ data }: Props) {
  const { personal, profile, experience, education, skills, references, styles, extras } = data;

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
        
        {/* FOTO CON RESPIRACIÓN ADECUADA (SUPERIOR) */}
        {personal?.showPhoto && (
          <div className="p-6 pb-2 flex justify-center">
            <div 
              className={`bg-gray-300 overflow-hidden border-2 border-white shadow-lg flex items-center justify-center shrink-0 ${photoShapeClass}`}
              style={{ width: '150px', height: '180px' }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-500 font-bold">FOTO</span>
              )}
            </div>
          </div>
        )}

        {/* BLOQUE INFERIOR DE LA BARRA LATERAL CON FONDO AZUL DINÁMICO */}
        <div className="flex-1 p-6 flex flex-col justify-between text-white mt-4" style={{ backgroundColor: accentColor }}>
          
          <div className="space-y-6">
            
            {/* INFORMACIÓN PERSONAL */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-black uppercase tracking-widest border-b border-white/30 pb-1.5">
                Información Personal
              </h3>
              <div className="text-[10px] space-y-2 opacity-9chny font-medium">
                {personal?.phone && (
                  <div>
                    <span className="block font-bold text-[9px] uppercase opacity-75">Teléfono</span>
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal?.email && (
                  <div>
                    <span className="block font-bold text-[9px] uppercase opacity-75">Correo</span>
                    <span className="break-all">{personal.email}</span>
                  </div>
                )}
                {extras?.portfolio && (
                  <div>
                    <span className="block font-bold text-[9px] uppercase opacity-75">Sitio Web</span>
                    <span className="break-all">{extras.portfolio}</span>
                  </div>
                )}
                {extras?.linkedin && (
                  <div>
                    <span className="block font-bold text-[9px] uppercase opacity-75">LinkedIn</span>
                    <span className="break-all">{extras.linkedin}</span>
                  </div>
                )}
                {personal?.location && (
                  <div>
                    <span className="block font-bold text-[9px] uppercase opacity-75">Dirección</span>
                    <span>{personal.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* HABILIDADES / SKILLS */}
            {skills && skills.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="text-xs font-black uppercase tracking-widest border-b border-white/30 pb-1.5">
                  Habilidades
                </h3>
                <div className="space-y-2 text-[10px]">
                  {skills.slice(0, 6).map((skill) => (
                    <div key={skill.id} className="space-y-0.5">
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

          </div>

          {/* Pie lateral */}
          <div className="text-[9px] text-white/60 text-center pt-2 border-t border-white/20">
            CVRD.DO — Operations Director
          </div>

        </div>
      </div>

      {/* ================= COLUMNA DERECHA PRINCIPAL ================= */}
      <div className="flex-1 bg-white p-8 flex flex-col justify-between relative">
        
        <div className="space-y-5">
          
          {/* ENCABEZADO: NOMBRE A EXACTAMENTE 53px (REGLA DE ORO 1) */}
          <div className="border-b border-gray-200 pb-4">
            <h1 className="tracking-tight leading-none uppercase" style={{ fontSize: '53px' }}>
              <span className="font-black text-gray-900 block">{firstName}</span>
              <span className="font-light text-gray-600 block mt-1">{lastName}</span>
            </h1>
            
            {/* ETIQUETA DE PUESTO DINÁMICA */}
            <div className="mt-3 inline-block px-4 py-1 text-white font-black text-[10px] uppercase tracking-widest shadow-sm" style={{ backgroundColor: accentColor }}>
              {personal?.title || 'DIRECTOR DE OPERACIONES'}
            </div>

            {/* Redes pequeñas en la cabecera */}
            <div className="flex gap-4 text-[10px] font-semibold text-gray-600 mt-2">
              <span>📷 @{firstName.toLowerCase()}</span>
              <span>👥 {fullNameStr}</span>
            </div>
          </div>

          {/* PERFIL PROFESIONAL (REGLA DE ORO 6: JUSTIFICADO) */}
          {profile && (
            <div className="space-y-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1">
                Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed text-[11px] text-justify font-normal">
                {profile}
              </p>
            </div>
          )}

          {/* EXPERIENCIA LABORAL */}
          {experience && experience.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1">
                Experiencia Laboral
              </h3>
              
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-black text-gray-900 text-[11px] uppercase">{exp.company}</h4>
                      <span className="text-gray-500 font-semibold text-[10px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="font-bold text-[10px]" style={{ color: accentColor }}>{exp.role}</p>
                    <p className="text-gray-700 leading-relaxed text-[10px] whitespace-pre-line text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCACIÓN */}
          {education && education.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1">
                Educación
              </h3>
              
              <div className="space-y-2">
                {education.slice(0, 2).map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-black text-gray-900 text-[11px] uppercase">{edu.institution}</h4>
                      <span className="text-gray-500 font-semibold text-[10px]">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <p className="font-bold text-[10px]" style={{ color: accentColor }}>{edu.degree}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REFERENCIAS / LOGROS */}
          {references && references.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1">
                Referencias
              </h3>
              
              <div className="grid grid-cols-2 gap-3 text-[10px]">
                {references.slice(0, 2).map((ref) => (
                  <div key={ref.id} className="space-y-0.5 bg-gray-50 p-2 rounded border border-gray-200">
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
        <div className="flex justify-between items-center text-[10px] text-gray-400 pt-3 border-t border-gray-200">
          <span>Template Operations Director</span>
          <span>CVRD.DO — Premium</span>
        </div>

      </div>
    </div>
  );
}