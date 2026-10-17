import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateCharcoalCompact({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, styles } = data;

  const photoShapeClass = 
    personal?.photoShape === 'circle' ? 'rounded-full' :
    personal?.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#374151';

  const fs = {
    base: '12px',
    small: '11px',
    tiny: '10px',
    h3: '11px',
    sidebarH3: '12px',
    name: '28px',
  };

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-950 flex justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div className="flex-1 h-full flex flex-col justify-between p-8 overflow-hidden bg-white">
        <div className="space-y-5">
          <div className="border-b border-gray-300 pb-3">
            <h1 className="tracking-tight leading-none font-black uppercase text-gray-900" style={{ fontSize: fs.name }}>
              <span className="font-light text-gray-700">{firstName}</span> {lastName}
            </h1>
            <p className="font-bold uppercase tracking-widest text-gray-600 mt-1" style={{ fontSize: fs.tiny }}>
              {personal?.title}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-600 mt-2" style={{ fontSize: fs.tiny }}>
              {personal?.phone && <span>📞 {personal.phone}</span>}
              {personal?.email && <span>✉️ {personal.email}</span>}
              {personal?.location && <span>📍 {personal.location}</span>}
            </div>
          </div>

          {profile && (
            <div className="space-y-1">
              <h3 className="font-black uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" style={{ fontSize: fs.h3 }}>
                About Me
              </h3>
              <p className="text-gray-700 leading-relaxed font-normal" style={{ fontSize: fs.small }}>{profile}</p>
            </div>
          )}

          {experience && experience.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" style={{ fontSize: fs.h3 }}>
                Experience
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
        </div>

        <div className="text-gray-400 pt-3 border-t border-gray-200" style={{ fontSize: fs.tiny }}>
          CVRD.DO — Charcoal Compact
        </div>
      </div>

      <div 
        className="w-[288px] h-full flex flex-col justify-between p-6 text-white shrink-0 box-border shadow-lg"
        style={{ backgroundColor: accentColor }}
      >
        <div className="space-y-5">
          {personal?.showPhoto && (
            <div className="flex justify-center pt-1">
              <div 
                className={`bg-gray-700 overflow-hidden border-2 border-white/20 flex items-center justify-center shadow-md shrink-0 ${photoShapeClass}`}
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
                Education
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
                Hobbies
              </h3>
              <ul className="space-y-1">
                {skills.map((skill) => (
                  <li key={skill.id} className="text-gray-200 font-medium" style={{ fontSize: fs.small }}>
                    • {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-wider border-b border-white/20 pb-1 text-amber-400" style={{ fontSize: fs.sidebarH3 }}>
                Language
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

        <div className="text-gray-400 text-center pt-2 border-t border-white/10" style={{ fontSize: fs.tiny }}>
          CVRD.DO
        </div>
      </div>
    </div>
  );
}