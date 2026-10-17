'use client';

import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function CustomerCareTemplate({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras } = data;

  const photoShapeClass = 
    personal?.photoShape === 'circle' ? 'rounded-full' :
    personal?.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const fs = {
    base: '11px',
    small: '10px',
    tiny: '9px',
    h3: '11px',
    name: '32px',
  };

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-950 flex flex-col justify-between p-8"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: data.styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div className="flex justify-between items-start border-b border-gray-300 pb-5 shrink-0">
        <div className="space-y-1">
          <h1 className="tracking-tight leading-none font-serif font-black uppercase text-gray-900" style={{ fontSize: fs.name }}>
            <span>{firstName}</span> <span className="font-light text-gray-700">{lastName}</span>
          </h1>
          <p className="font-bold uppercase tracking-widest text-gray-500 pt-1" style={{ fontSize: fs.small }}>
            {personal?.title}
          </p>
        </div>

        <div className="space-y-1 text-right text-gray-600 border-l border-gray-300 pl-4" style={{ fontSize: fs.small }}>
          {personal?.phone && <p>📞 {personal.phone}</p>}
          {personal?.email && <p>✉️ {personal.email}</p>}
          {personal?.location && <p>📍 {personal.location}</p>}
          {extras?.linkedin && <p>🔗 {extras.linkedin}</p>}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 my-4 flex-1 overflow-hidden">
        <div className="col-span-4 bg-gray-100/80 p-4 rounded-xl flex flex-col space-y-4 shadow-xs">
          {personal?.showPhoto && (
            <div className="flex justify-center pt-1">
              <div 
                className={`bg-gray-300 overflow-hidden border border-gray-300 flex items-center justify-center shadow-md ${photoShapeClass}`}
                style={{ width: '130px', height: '160px' }}
              >
                {personal?.photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 font-bold" style={{ fontSize: fs.tiny }}>FOTO</span>
                )}
              </div>
            </div>
          )}

          {education && education.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" style={{ fontSize: fs.h3 }}>
                Education
              </h3>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <span className="text-gray-500 font-semibold block" style={{ fontSize: fs.tiny }}>{edu.startDate} - {edu.endDate}</span>
                    <p className="font-bold text-gray-900" style={{ fontSize: fs.small }}>{edu.degree}</p>
                    <p className="text-gray-600" style={{ fontSize: fs.tiny }}>{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills && skills.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="font-black uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" style={{ fontSize: fs.h3 }}>
                Hobbies
              </h3>
              <ul className="space-y-1">
                {skills.map((skill) => (
                  <li key={skill.id} className="text-gray-800 font-medium" style={{ fontSize: fs.small }}>
                    • {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {references && references.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="font-black uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" style={{ fontSize: fs.h3 }}>
                Reference
              </h3>
              <div className="space-y-2">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5" style={{ fontSize: fs.small }}>
                    <p className="font-bold text-gray-900">{ref.name}</p>
                    <p className="text-gray-600">{ref.company}</p>
                    {ref.phone && <p className="text-gray-500">{ref.phone}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-8 flex flex-col space-y-4 pl-2">
          {profile && (
            <div className="space-y-1">
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1" style={{ fontSize: fs.h3 }}>
                About Me
              </h3>
              <p className="text-gray-700 leading-relaxed font-normal" style={{ fontSize: fs.small }}>{profile}</p>
            </div>
          )}

          {experience && experience.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1" style={{ fontSize: fs.h3 }}>
                Experience
              </h3>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
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
      </div>

      <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-300 shrink-0">
        <div className="space-y-1">
          <h4 className="font-black uppercase tracking-wider text-gray-900" style={{ fontSize: fs.tiny }}>Language</h4>
          {languages && languages.length > 0 ? (
            languages.map((lang) => (
              <div key={lang.id} className="flex justify-between text-gray-700" style={{ fontSize: fs.small }}>
                <span>{lang.name}</span>
                <span className="text-gray-500 font-semibold">{lang.level}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic" style={{ fontSize: fs.small }}>Español (Nativo)</p>
          )}
        </div>

        <div className="space-y-1">
          <h4 className="font-black uppercase tracking-wider text-gray-900" style={{ fontSize: fs.tiny }}>Skills</h4>
          {skills && skills.length > 0 ? (
            skills.slice(0, 3).map((s) => (
              <div key={s.id} className="text-gray-700 truncate" style={{ fontSize: fs.small }}>
                • {s.name}
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic" style={{ fontSize: fs.small }}>Comunicación, Empatía</p>
          )}
        </div>

        <div className="space-y-1 text-right">
          <h4 className="font-black uppercase tracking-wider text-gray-900" style={{ fontSize: fs.tiny }}>CVRD.DO</h4>
          <p className="text-gray-400" style={{ fontSize: fs.tiny }}>Customer Care Layout</p>
        </div>
      </div>
    </div>
  );
}