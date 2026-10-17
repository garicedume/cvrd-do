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

export default function TemplateAcademicResearch({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal?.photoShape === 'circle' ? 'rounded-full' :
    personal?.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#374151';

  const fs = {
    base: '13px',
    small: '11px',
    tiny: '10px',
    h3: '11px',
    sidebarH3: '13px',
  };

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div 
        className="`w-70` h-full flex flex-col justify-between p-7 text-white shrink-0 box-border"
        style={{ backgroundColor: accentColor }}
      >
        <div className="space-y-7">
          {personal?.showPhoto && (
            <div className="flex justify-center pt-2">
              <div 
                className={`bg-gray-600 overflow-hidden border-2 border-white/20 flex items-center justify-center shadow-md shrink-0 ${photoShapeClass}`}
                style={{ width: '130px', height: '130px' }}
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

          <div className="space-y-3" style={{ fontSize: fs.base }}>
            <h3 className="font-bold uppercase tracking-wider border-b border-white/20 pb-1 mb-3 text-white" style={{ fontSize: fs.sidebarH3 }}>
              Contacto
            </h3>
            
            {personal?.phone && <p className="text-gray-200 break-all">📞 {personal.phone}</p>}
            {personal?.secondaryPhone && <p className="text-gray-300 break-all">📞 {personal.secondaryPhone}</p>}
            {personal?.email && <p className="text-gray-200 break-all">✉️ {personal.email}</p>}
            {personal?.secondaryEmail && <p className="text-gray-300 break-all">✉️ {personal.secondaryEmail}</p>}
            {personal?.location && <p className="text-gray-200">📍 {personal.location}</p>}
            {personal?.locationLine2 && <p className="text-gray-300 pl-4">{personal.locationLine2}</p>}

            {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
              (extras.customLinks as CustomLink[]).map((link, idx) => (
                <div key={idx} className="text-gray-200 break-all pt-1.5">
                  <span className="font-bold text-white block" style={{ fontSize: fs.base }}>🔗 {link?.label || 'Enlace'}:</span>
                  <span className="block">{link?.url}</span>
                  {link?.urlLine2 && <span className="text-gray-300 block">{link.urlLine2}</span>}
                </div>
              ))
            ) : (
              <>
                {extras?.linkedin && <p className="text-gray-200 break-all pt-1.5">🔗 {extras.linkedin}</p>}
                {extras?.portfolio && <p className="text-gray-200 break-all pt-1.5">🌐 {extras.portfolio}</p>}
              </>
            )}
          </div>

          {skills && skills.length > 0 && (
            <div className="space-y-2.5" style={{ fontSize: fs.base }}>
              <h3 className="font-bold uppercase tracking-wider border-b border-white/20 pb-1 mb-3 text-white" style={{ fontSize: fs.sidebarH3 }}>
                Habilidades
              </h3>
              <ul className="flex flex-col gap-2">
                {skills.map((skill) => (
                  <li key={skill.id} className="text-gray-200 font-medium">• {skill.name}</li>
                ))}
              </ul>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div className="space-y-2.5" style={{ fontSize: fs.base }}>
              <h3 className="font-bold uppercase tracking-wider border-b border-white/20 pb-1 mb-3 text-white" style={{ fontSize: fs.sidebarH3 }}>
                Idiomas
              </h3>
              <ul className="flex flex-col gap-2">
                {languages.map((lang) => (
                  <li key={lang.id} className="text-gray-200 font-medium flex justify-between">
                    <span>{lang.name}</span>
                    <span className="text-gray-400">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="text-gray-400 text-center pb-4" style={{ fontSize: fs.tiny }}>
          CVRD.DO
        </div>
      </div>

      <div className="flex-1 h-full flex flex-col justify-between p-8 overflow-hidden bg-white">
        <div className="space-y-6">
          <div className="border-b pb-4 border-gray-300 flex flex-col justify-center">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-2.5 items-baseline" style={{ fontSize: '55px' }}>
              <span className="font-light text-gray-600">{firstName}</span>
              <span className="font-extrabold text-gray-900">{lastName}</span>
            </h1>
            <p className="font-semibold uppercase tracking-widest mt-2 text-gray-500" style={{ fontSize: fs.base }}>
              {personal?.title}
            </p>
          </div>

          {profile && (
            <div className="space-y-2">
              <h3 className="font-bold uppercase tracking-wider bg-gray-900 text-white px-3 py-1.5 inline-block" style={{ fontSize: fs.h3 }}>
                Perfil Profesional
              </h3>
              <p className="text-gray-800 leading-relaxed font-normal" style={{ fontSize: fs.base }}>{profile}</p>
            </div>
          )}

          {education && education.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold uppercase tracking-wider bg-gray-900 text-white px-3 py-1.5 inline-block" style={{ fontSize: fs.h3 }}>
                Educación
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-gray-300 pl-4 space-y-0.5">
                    <p className="font-bold text-gray-900" style={{ fontSize: fs.base }}>{edu.degree}</p>
                    <p className="text-gray-700" style={{ fontSize: fs.base }}>{edu.institution} <span className="text-gray-500" style={{ fontSize: fs.small }}>({edu.startDate} - {edu.endDate})</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {experience && experience.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold uppercase tracking-wider bg-gray-900 text-white px-3 py-1.5 inline-block" style={{ fontSize: fs.h3 }}>
                Experiencia
              </h3>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-gray-300 pl-4 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900" style={{ fontSize: fs.base }}>{exp.role}</h4>
                      <span className="text-gray-500 font-semibold" style={{ fontSize: fs.small }}>{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="font-bold text-gray-700" style={{ fontSize: fs.base }}>{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ fontSize: fs.base }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {references && references.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold uppercase tracking-wider bg-gray-900 text-white px-3 py-1.5 inline-block" style={{ fontSize: fs.h3 }}>
                Referencias
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {references.map((ref) => (
                  <div key={ref.id} className="border-l-2 border-gray-300 pl-3 space-y-0.5">
                    <p className="font-bold text-gray-900" style={{ fontSize: fs.base }}>{ref.name}</p>
                    <p className="text-gray-700" style={{ fontSize: fs.base }}>{ref.position} - {ref.company}</p>
                    <p className="text-gray-600" style={{ fontSize: fs.base }}>{ref.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-right text-gray-400 pt-4 border-t border-gray-200" style={{ fontSize: fs.tiny }}>
          CVRD.DO — Academic Research
        </div>
      </div>
    </div>
  );
}