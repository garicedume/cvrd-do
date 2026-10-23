import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateAtsClassic({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal?.photoShape === 'circle' ? 'rounded-full' :
    personal?.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#1F2937';

  // Tamaños estandarizados a 12px para todo el contenido (excepto el nombre)
  const fs = {
    base: '12px',
    small: '12px',
    tiny: '12px',
    h3: '12px',
    sidebarH3: '12px',
  };

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-950 flex flex-col justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div className="absolute inset-0 box-border flex flex-col justify-between p-10">
        
        <div className="text-center pb-4 border-b border-gray-300">
          <h1 className="tracking-tight leading-none flex flex-wrap justify-center gap-x-3 items-baseline" style={{ fontSize: '55px' }}>
            <span className="font-light text-gray-700">{firstName}</span>
            <span className="font-extrabold text-gray-950">{lastName}</span>
          </h1>
          <p className="font-bold uppercase tracking-widest mt-1 text-gray-600" style={{ fontSize: fs.base }}>
            {personal?.title}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-gray-700 mt-2" style={{ fontSize: fs.small }}>
            {personal?.phone && <span><strong>Phone:</strong> {personal.phone}</span>}
            {personal?.email && <span>| <strong>Email:</strong> {personal.email}</span>}
            {personal?.location && <span>| <strong>Address:</strong> {personal.location}</span>}
            {extras?.linkedin && <span>| <strong>LinkedIn:</strong> {extras.linkedin}</span>}
          </div>
        </div>

        <div className="flex-1 flex gap-6 pt-5 overflow-hidden">
          
          <div 
            className="w-65 flex flex-col justify-between p-5 text-white shrink-0 rounded-xl box-border shadow-inner"
            style={{ backgroundColor: accentColor }}
          >
            <div className="space-y-6">
              {personal?.showPhoto && (
                <div className="flex justify-center">
                  <div 
                    className={`bg-gray-700 overflow-hidden border-2 border-white/30 flex items-center justify-center shadow-md shrink-0 ${photoShapeClass}`}
                    style={{ width: '120px', height: '120px' }}
                  >
                    {personal?.photoUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-300 font-bold" style={{ fontSize: fs.tiny }}>FOTO</span>
                    )}
                  </div>
                </div>
              )}

              {education && education.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-black uppercase tracking-wider border-b border-white/20 pb-1 text-amber-400" style={{ fontSize: fs.sidebarH3 }}>
                    Educación
                  </h3>
                  <div className="space-y-2.5">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-0.5">
                        <span className="text-gray-400 font-semibold block" style={{ fontSize: fs.tiny }}>{edu.startDate} - {edu.endDate}</span>
                        <p className="font-bold text-white" style={{ fontSize: fs.small }}>{edu.degree}</p>
                        <p className="text-gray-300" style={{ fontSize: fs.tiny }}>{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skills && skills.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-black uppercase tracking-wider border-b border-white/20 pb-1 text-amber-400" style={{ fontSize: fs.sidebarH3 }}>
                    Habilidades
                  </h3>
                  <ul className="space-y-1.5">
                    {skills.map((skill) => (
                      <li key={skill.id} className="text-gray-200 font-medium flex items-center justify-between" style={{ fontSize: fs.small }}>
                        <span>• {skill.name}</span>
                        {skill.level && <span className="text-gray-400 text-[12px]">({skill.level})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {languages && languages.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-black uppercase tracking-wider border-b border-white/20 pb-1 text-amber-400" style={{ fontSize: fs.sidebarH3 }}>
                    Idiomas
                  </h3>
                  <ul className="space-y-1.5">
                    {languages.map((lang) => (
                      <li key={lang.id} className="text-gray-200 font-medium flex justify-between" style={{ fontSize: fs.small }}>
                        <span>{lang.name}</span>
                        <span className="text-gray-400">{lang.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="text-gray-400 text-center pt-3 border-t border-white/10" style={{ fontSize: fs.tiny }}>
              CVRD.DO
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between overflow-hidden space-y-4">
            <div className="space-y-4">
              {profile && (
                <div className="space-y-1">
                  <h3 className="font-black uppercase tracking-wider text-gray-950 border-b-2 border-gray-900 pb-0.5" style={{ fontSize: fs.h3 }}>
                    Perfil Profesional
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-normal" style={{ fontSize: fs.small }}>{profile}</p>
                </div>
              )}

              {experience && experience.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-black uppercase tracking-wider text-gray-950 border-b-2 border-gray-900 pb-0.5" style={{ fontSize: fs.h3 }}>
                    Experiencia Profesional
                  </h3>
                  <div className="space-y-3">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-bold text-gray-900" style={{ fontSize: fs.base }}>{exp.role}</h4>
                          <span className="text-gray-500 font-semibold" style={{ fontSize: fs.tiny }}>{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="font-bold text-gray-700" style={{ fontSize: fs.small }}>{exp.company}</p>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ fontSize: fs.small }}>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {references && references.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-black uppercase tracking-wider text-gray-950 border-b-2 border-gray-900 pb-0.5" style={{ fontSize: fs.h3 }}>
                    Referencias
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {references.map((ref) => (
                      <div key={ref.id} className="space-y-0.5 border-l-2 border-gray-300 pl-2">
                        <p className="font-bold text-gray-950" style={{ fontSize: fs.small }}>{ref.name}</p>
                        <p className="text-gray-600" style={{ fontSize: fs.tiny }}>{ref.position} - {ref.company}</p>
                        <p className="text-gray-500" style={{ fontSize: fs.tiny }}>{ref.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-gray-400 pt-3 border-t border-gray-200" style={{ fontSize: fs.tiny }}>
              <span>CVRD.DO — ATS Direct Classic</span>
              <span>100% Compatible con Sistemas ATS</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}