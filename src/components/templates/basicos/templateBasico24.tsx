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

export default function TemplateLegalStructural({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#6B8E88'; // Tono verde grisáceo formal / legal

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div 
        className="absolute box-border flex flex-col justify-between"
        style={{
          top: '40px',
          left: '48px',
          right: '48px',
          bottom: '40px',
        }}
      >
        {/* ENCABEZADO */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div className="flex flex-col justify-center">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '44px' }}>
              <span className="font-extrabold text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest mt-1.5 text-gray-500">
              {personal?.title}
            </p>
            {extras?.linkedin && (
              <span className="text-[10px] text-gray-400 mt-1">🔗 {extras.linkedin}</span>
            )}
          </div>
          {personal?.showPhoto && (
            <div 
              className={`bg-gray-100 overflow-hidden border-2 shadow-sm flex items-center justify-center shrink-0 ${photoShapeClass}`}
              style={{ width: '110px', height: '110px', borderColor: accentColor }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-400 font-bold">FOTO</span>
              )}
            </div>
          )}
        </div>

        {/* CUERPO CENTRAL */}
        <div className="flex flex-col flex-1 justify-around text-xs my-2" style={{ gap: '14px' }}>
          
          {/* SECCIÓN 1: STATEMENT / PERFIL & CONTACTO */}
          {profile && (
            <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="w-28 flex items-center justify-center font-bold uppercase tracking-wider text-white text-[11px] p-2 text-center" 
                style={{ backgroundColor: accentColor }}
              >
                Statement
              </div>
              <div className="p-3 flex-1 flex justify-between items-center gap-4">
                <p className="text-gray-700 leading-relaxed font-normal flex-1">{profile}</p>
                <div className="text-[11px] text-gray-600 border-l pl-4 border-gray-200 space-y-1 shrink-0">
                  {personal?.location && <p><strong>Address:</strong> {personal.location}</p>}
                  {personal?.email && <p><strong>Email:</strong> {personal.email}</p>}
                  {personal?.phone && <p><strong>Phone:</strong> {personal.phone}</p>}
                  {extras?.portfolio && <p><strong>Web:</strong> {extras.portfolio}</p>}
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 2: EXPERIENCIA */}
          {experience && experience.length > 0 && (
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="w-28 flex items-center justify-center font-bold uppercase tracking-wider text-white text-[11px] p-2 text-center [writing-mode:vertical-lr] rotate-180" 
                style={{ backgroundColor: accentColor }}
              >
                Work Experience
              </div>
              <div className="p-3 flex-1 space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-gray-900 text-sm">{exp.role}</span>
                      <span className="text-gray-500 font-semibold">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="font-semibold text-gray-600 text-[11px] mb-1">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[11px]">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN 3: EDUCACIÓN */}
          {education && education.length > 0 && (
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="w-28 flex items-center justify-center font-bold uppercase tracking-wider text-white text-[11px] p-2 text-center [writing-mode:vertical-lr] rotate-180" 
                style={{ backgroundColor: accentColor }}
              >
                Education
              </div>
              <div className="p-3 flex-1 grid grid-cols-2 gap-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-gray-600 text-[11px]">{edu.institution} <span className="text-gray-400">({edu.startDate} - {edu.endDate})</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN 4: HABILIDADES */}
          {skills && skills.length > 0 && (
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="w-28 flex items-center justify-center font-bold uppercase tracking-wider text-white text-[11px] p-2 text-center [writing-mode:vertical-lr] rotate-180" 
                style={{ backgroundColor: accentColor }}
              >
                Skills
              </div>
              <div className="p-3 flex-1 grid grid-cols-2 gap-x-6 gap-y-2 items-center">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-800 font-medium">{skill.name}</span>
                    <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* PIE DE PÁGINA */}
        <div className="text-right text-[10px] text-gray-400 pt-2 border-t">
          CVRD.DO — Legal Structural Template
        </div>
      </div>
    </div>
  );
}