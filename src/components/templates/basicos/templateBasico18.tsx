import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateAtsMinimal({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal?.photoShape === 'circle' ? 'rounded-full' :
    personal?.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#262626';

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-950 flex justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* Barra lateral izquierda */}
      <div 
        className="w-72 h-full flex flex-col justify-between p-6 text-white shrink-0 box-border shadow-md"
        style={{ backgroundColor: accentColor }}
      >
        <div className="space-y-6">
          {personal?.showPhoto && (
            <div className="flex justify-center pt-2">
              <div 
                className={`bg-gray-700 overflow-hidden border-2 border-white/20 flex items-center justify-center shadow-lg shrink-0 ${photoShapeClass}`}
                style={{ width: '130px', height: '130px' }}
              >
                {personal?.photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-300 font-bold text-[12px]">FOTO</span>
                )}
              </div>
            </div>
          )}

          <div className="text-center space-y-1">
            <h1 className="tracking-tight leading-none font-black uppercase text-white" style={{ fontSize: '32px' }}>
              <span className="block font-light text-gray-300">{firstName}</span>
              <span className="block font-black text-white">{lastName}</span>
            </h1>
            <p className="font-bold uppercase tracking-wider text-amber-400 pt-1 text-[12px]">
              {personal?.title || 'DISEÑADOR GRÁFICO'}
            </p>
          </div>

          <div className="space-y-2 border-t border-white/15 pt-4 text-[12px]">
            <h3 className="font-bold uppercase tracking-wider text-gray-300 pb-1 text-[12px]">
              Contacto
            </h3>
            {personal?.phone && <p className="text-gray-200 break-all">📞 {personal.phone}</p>}
            {personal?.secondaryPhone && <p className="text-gray-300 break-all">📱 {personal.secondaryPhone}</p>}
            {personal?.email && <p className="text-gray-200 break-all">✉️ {personal.email}</p>}
            {personal?.secondaryEmail && <p className="text-gray-300 break-all">✉️ {personal.secondaryEmail}</p>}
            {personal?.location && <p className="text-gray-200">📍 {personal.location}</p>}
            {personal?.locationLine2 && <p className="text-gray-300 pl-4">{personal.locationLine2}</p>}
            {extras?.linkedin && <p className="text-gray-200 break-all">🔗 {extras.linkedin}</p>}
          </div>

          {education && education.length > 0 && (
            <div className="space-y-2 border-t border-white/15 pt-4 text-[12px]">
              <h3 className="font-bold uppercase tracking-wider text-gray-300 pb-1 text-[12px]">
                Educación
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <span className="text-gray-400 font-semibold block text-[12px]">{edu.startDate} - {edu.endDate}</span>
                    <p className="font-bold text-white text-[12px]">{edu.degree}</p>
                    <p className="text-gray-300 text-[12px]">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills && skills.length > 0 && (
            <div className="space-y-2 border-t border-white/15 pt-4 text-[12px]">
              <h3 className="font-bold uppercase tracking-wider text-gray-300 pb-1 text-[12px]">
                Habilidades
              </h3>
              <ul className="space-y-1">
                {skills.map((skill) => (
                  <li key={skill.id} className="text-gray-200 font-medium text-[12px]">
                    • {skill.name} {skill.level && <span className="text-gray-400">({skill.level})</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="text-gray-400 text-center pb-2 text-[12px]">
          CVRD.DO
        </div>
      </div>

      {/* Columna derecha principal */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 overflow-hidden bg-white">
        <div className="space-y-5">
          {profile && (
            <div className="space-y-1.5 border-b border-gray-200 pb-4 text-[12px]">
              <h3 className="font-black uppercase tracking-wider text-gray-950 flex items-center gap-2 text-[12px]">
                <span>👤</span> Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed font-normal text-[12px]">{profile}</p>
            </div>
          )}

          {experience && experience.length > 0 && (
            <div className="space-y-3 text-[12px]">
              <h3 className="font-black uppercase tracking-wider text-gray-950 flex items-center gap-2 border-b border-gray-200 pb-1 text-[12px]">
                <span>💼</span> Experiencia Profesional
              </h3>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[12px]">{exp.role}</h4>
                      <span className="text-gray-500 font-semibold text-[12px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="font-bold text-gray-700 text-[12px]">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[12px]">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas y Referencias ordenados uno debajo del otro */}
          <div className="space-y-4 border-t border-gray-200 pt-4 text-[12px]">
            {languages && languages.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-black uppercase tracking-wider text-gray-950 text-[12px]">
                  Idiomas
                </h3>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between text-gray-800 text-[12px]">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-gray-500">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {references && references.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="font-black uppercase tracking-wider text-gray-950 text-[12px]">
                  Referencias
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {references.map((ref) => (
                    <div key={ref.id} className="space-y-0.5 border-l-2 border-gray-300 pl-2 text-[12px]">
                      <p className="font-bold text-gray-950">{ref.name}</p>
                      <p className="text-gray-600">{ref.position} - {ref.company}</p>
                      <p className="text-gray-500">Tel: {ref.phone}</p>
                      {ref.email && <p className="text-gray-500">Correo: {ref.email}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-right text-gray-400 pt-3 border-t border-gray-200 text-[12px]">
          CVRD.DO — ATS Minimal Layout
        </div>
      </div>
    </div>
  );
}