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

export default function TemplateMinimalistLine({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#111827'; // Gris oscuro / Negro elegante

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
        <div className="flex justify-between items-start border-b border-gray-300 pb-5">
          <div className="flex flex-col justify-center">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '42px' }}>
              <span className="font-extrabold text-gray-900">{firstName}</span>
              <span className="font-light text-gray-600">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest mt-2 text-gray-500">
              {personal?.title}
            </p>
          </div>

          {/* Contacto en la cabecera derecha */}
          <div className="text-[11px] text-gray-700 space-y-1 text-right">
            {personal?.phone && <p>📞 {personal.phone}</p>}
            {personal?.email && <p>✉️ {personal.email}</p>}
            {personal?.location && <p>📍 {personal.location}</p>}
            {extras?.linkedin && <p>🔗 {extras.linkedin}</p>}
          </div>
        </div>

        {/* CUERPO PRINCIPAL EN 2 COLUMNAS */}
        <div className="grid grid-cols-12 gap-8 flex-1 pt-4">
          
          {/* COLUMNA IZQUIERDA (Foto, Education, Skills, Language) */}
          <div className="col-span-4 flex flex-col border-r pr-6 border-gray-200 space-y-5">
            
            {/* Foto de perfil */}
            {personal?.showPhoto && (
              <div className="flex justify-center my-1">
                <div 
                  className={`bg-gray-100 overflow-hidden border-2 border-gray-300 shadow-sm flex items-center justify-center shrink-0 ${photoShapeClass}`}
                  style={{ width: '120px', height: '120px' }}
                >
                  {personal?.photoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-gray-400 font-bold">FOTO</span>
                  )}
                </div>
              </div>
            )}

            {/* Educación */}
            {education && education.length > 0 && (
              <div className="text-xs">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Education
                </h3>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="font-bold text-gray-900 text-[11px]">{edu.degree}</p>
                      <p className="text-gray-600 text-[10px]">{edu.institution} <span className="text-gray-400">({edu.startDate} - {edu.endDate})</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Habilidades */}
            {skills && skills.length > 0 && (
              <div className="text-xs">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Skills
                </h3>
                <ul className="space-y-2">
                  {skills.map((skill) => (
                    <li key={skill.id} className="text-gray-800 text-[11px]">
                      <div className="flex justify-between mb-0.5">
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <div className="text-xs">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Language
                </h3>
                <ul className="space-y-1">
                  {languages.map((lang) => (
                    <li key={lang.id} className="text-gray-800 text-[11px] flex justify-between">
                      <span>• {lang.name}</span>
                      <span className="text-gray-500">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA (About Me, Experience, References) */}
          <div className="col-span-8 flex flex-col text-xs space-y-5">
            
            {/* Sobre mí */}
            {profile && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  About Me
                </h3>
                <p className="text-gray-700 leading-relaxed font-normal text-[11px]">{profile}</p>
              </div>
            )}

            {/* Experiencia con línea de tiempo */}
            {experience && experience.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-3 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  Experience
                </h3>
                <div className="space-y-3 relative border-l-2 ml-2 pl-4" style={{ borderColor: '#d1d5db' }}>
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative">
                      {/* Punto de la línea de tiempo */}
                      <div 
                        className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2" 
                        style={{ borderColor: accentColor }}
                      ></div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-sm">{exp.role}</h4>
                        <span className="text-gray-500 font-semibold text-[10px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="font-semibold text-gray-600 text-[11px] mb-1">{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[11px]">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referencias */}
            {references && references.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900 text-[12px]" style={{ borderColor: accentColor }}>
                  References
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {references.map((ref) => (
                    <div key={ref.id} className="text-[11px]">
                      <p className="font-bold text-gray-900">{ref.name}</p>
                      <p className="text-gray-600 text-[10px]">{ref.position} - {ref.company}</p>
                      <p className="text-gray-500 text-[10px]">Phone: {ref.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* PIE DE PÁGINA */}
        <div className="text-right text-[10px] text-gray-400 pt-2 border-t">
          CVRD.DO — Minimalist Line Template
        </div>
      </div>
    </div>
  );
}