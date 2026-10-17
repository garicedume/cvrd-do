'use client';

import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function CommercialSalesTemplate({ data }: Props) {
  const { personal, profile, experience, education, skills, references, extras, styles } = data;

  const photoShapeClass = 
    personal?.photoShape === 'circle' ? 'rounded-full' :
    personal?.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#1f2937';

  const fs = {
    base: '11px',
    small: '10px',
    tiny: '9px',
    h3: '11px',
    name: '26px',
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
      <div 
        className="w-full px-8 py-5 flex items-center justify-between text-white shrink-0 shadow-md"
        style={{ backgroundColor: accentColor, height: '140px' }}
      >
        <div className="space-y-1">
          <h1 className="tracking-tight leading-none font-black uppercase text-white" style={{ fontSize: fs.name }}>
            <span className="font-light text-gray-300">{firstName}</span> {lastName}
          </h1>
          <p className="font-semibold uppercase tracking-widest text-amber-400 pt-1" style={{ fontSize: fs.small }}>
            {personal?.title}
          </p>
        </div>

        <div className="space-y-1 text-gray-300 border-x border-white/15 px-6" style={{ fontSize: fs.small }}>
          {personal?.phone && <p>📞 {personal.phone}</p>}
          {personal?.email && <p>✉️ {personal.email}</p>}
          {personal?.location && <p>📍 {personal.location}</p>}
          {extras?.linkedin && <p>🔗 {extras.linkedin}</p>}
        </div>

        {personal?.showPhoto && (
          <div className="shrink-0">
            <div 
              className={`bg-gray-700 overflow-hidden border-2 border-white/20 flex items-center justify-center shadow-lg ${photoShapeClass}`}
              style={{ width: '100px', height: '100px' }}
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
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 p-8 overflow-hidden bg-white">
        <div className="col-span-7 flex flex-col space-y-4 border-r border-gray-200 pr-6">
          <h3 className="font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1" style={{ fontSize: fs.h3 }}>
            Experience
          </h3>

          {experience && experience.length > 0 ? (
            <div className="space-y-4">
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
          ) : (
            <p className="text-gray-400 italic" style={{ fontSize: fs.small }}>Sin experiencia registrada.</p>
          )}
        </div>

        <div className="col-span-5 flex flex-col space-y-4">
          {profile && (
            <div className="space-y-1">
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1" style={{ fontSize: fs.h3 }}>
                About Me
              </h3>
              <p className="text-gray-700 leading-relaxed font-normal" style={{ fontSize: fs.small }}>{profile}</p>
            </div>
          )}

          {education && education.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1" style={{ fontSize: fs.h3 }}>
                Education
              </h3>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <span className="text-gray-400 font-semibold block" style={{ fontSize: fs.tiny }}>{edu.startDate} - {edu.endDate}</span>
                    <p className="font-bold text-gray-900" style={{ fontSize: fs.small }}>{edu.degree}</p>
                    <p className="text-gray-600" style={{ fontSize: fs.tiny }}>{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills && skills.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1" style={{ fontSize: fs.h3 }}>
                Skills
              </h3>
              <ul className="space-y-1">
                {skills.map((skill) => (
                  <li key={skill.id} className="text-gray-800 font-medium" style={{ fontSize: fs.small }}>
                    • {skill.name} {skill.level && <span className="text-gray-500">({skill.level})</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {references && references.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1" style={{ fontSize: fs.h3 }}>
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
      </div>

      <div className="px-8 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-gray-400 shrink-0" style={{ fontSize: fs.tiny }}>
        <span>CVRD.DO — Commercial Sales Layout</span>
        <span>Página 1 de 1</span>
      </div>
    </div>
  );
}