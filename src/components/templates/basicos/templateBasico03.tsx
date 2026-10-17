import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function ExtraStandard02({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#1f2937'; // Gris oscuro corporativo elegante

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex flex-col justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div className="flex flex-col h-full p-8 box-border justify-between">
        
        {/* ================= ENCABEZADO SUPERIOR ================= */}
        <div className="flex justify-between items-center border-b-2 border-gray-800 pb-5">
          <div className="flex flex-col justify-center">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '53px' }}>
              <span className="font-extrabold text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest mt-2 text-gray-600">
              {personal?.title || 'ADMINISTRATIVE PROFESSIONAL'}
            </p>
          </div>

          {/* Foto de perfil */}
          {personal?.showPhoto && (
            <div 
              className={`bg-gray-200 overflow-hidden border border-gray-300 shadow-inner flex items-center justify-center shrink-0 ${photoShapeClass}`}
              style={{ width: '130px', height: '130px' }}
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

        {/* ================= DATOS DE CONTACTO HORIZONTALES ================= */}
        <div className="flex flex-wrap items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 text-[11px] text-gray-700">
          {personal?.phone && <p>📞 {personal.phone}</p>}
          {personal?.email && <p>✉️ {personal.email}</p>}
          {personal?.location && <p>📍 {personal.location}</p>}
          {extras?.linkedin && <p>🔗 {extras.linkedin}</p>}
          {!personal?.phone && !personal?.email && (
            <>
              <p>📞 +1 (809) 555-0192</p>
              <p>✉️ yourname@email.com</p>
              <p>📍 Santo Domingo, Rep. Dom.</p>
            </>
          )}
        </div>

        {/* ================= CUERPO PRINCIPAL (2 Columnas) ================= */}
        <div className="grid grid-cols-12 gap-8 flex-1 pt-2">
          
          {/* COLUMNA IZQUIERDA (Skills, Languages, Education) */}
          <div className="col-span-4 flex flex-col space-y-5 border-r border-gray-200 pr-5">
            
            {/* Skills */}
            {skills && skills.length > 0 && (
              <div className="text-xs">
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[11px]">
                  Skills
                </h3>
                <ul className="space-y-1.5">
                  {skills.map((skill) => (
                    <li key={skill.id} className="text-gray-800 font-medium">• {skill.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div className="text-xs">
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[11px]">
                  Languages
                </h3>
                <ul className="space-y-1.5">
                  {languages.map((lang) => (
                    <li key={lang.id} className="text-gray-800 font-medium flex justify-between">
                      <span>{lang.name}</span>
                      <span className="text-gray-500">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div className="text-xs">
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[11px]">
                  Education
                </h3>
                <div className="space-y-2.5">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="font-bold text-gray-900 text-[10.5px]">{edu.degree}</p>
                      <p className="text-gray-600 text-[10px]">{edu.institution}</p>
                      <p className="text-gray-500 text-[9.5px]">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA (Profile & Experience) */}
          <div className="col-span-8 flex flex-col text-xs space-y-4">
            
            {/* Profile */}
            {profile && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-1.5 text-gray-900 text-[12px]">
                  Professional Profile
                </h3>
                <p className="text-gray-700 leading-relaxed font-normal text-[11px]">{profile}</p>
              </div>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[12px]">
                  Work Experience
                </h3>
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[11.5px]">{exp.role}</h4>
                        <span className="text-gray-500 font-semibold text-[10px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="font-bold text-gray-700 text-[10.5px] mb-0.5">{exp.company}</p>
                      <p className="text-gray-600 leading-relaxed text-[10.5px] whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            {references && references.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[12px]">
                  References
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {references.map((ref) => (
                    <div key={ref.id} className="text-[10px]">
                      <p className="font-bold text-gray-900">{ref.name}</p>
                      <p className="text-gray-600">{ref.position} - {ref.company}</p>
                      <p className="text-gray-500">{ref.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Pie de página */}
        <div className="text-right text-[9px] text-gray-400 pt-2 border-t border-gray-200">
          CVRD.DO — Standard Clean Line Template
        </div>
      </div>
    </div>
  );
}