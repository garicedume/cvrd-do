import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateExecutiveClean({ data }: Props) {
  const { personal, profile, experience, education, skills, references, extras, styles } = data;

  const photoShapeClass = 
    personal?.photoShape === 'circle' ? 'rounded-full' :
    personal?.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#1e293b'; // Tono oscuro elegante de la referencia

  const fs = {
    base: '12px',
    small: '11px',
    tiny: '10px',
    h3: '12px',
    name: '32px',
  };

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex flex-col justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* =========================================================
          1. ENCABEZADO SUPERIOR DIVIDIDO (Izquierda foto / Derecha oscuro)
         ========================================================= */}
      <div className="w-full flex shrink-0" style={{ height: '240px' }}>
        
        {/* Mitad Izquierda: Foto de Perfil sobre fondo blanco/claro */}
        <div className="w-[320px] bg-gray-50 flex items-center justify-center p-6 border-b border-gray-200">
          {personal?.showPhoto && (
            <div 
              className={`bg-gray-300 overflow-hidden border-2 border-white shadow-md flex items-center justify-center shrink-0 ${photoShapeClass}`}
              style={{ width: '150px', height: '180px' }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 font-bold" style={{ fontSize: fs.tiny }}>FOTO</span>
              )}
            </div>
          )}
        </div>

        {/* Mitad Derecha: Nombre, Título y Contacto sobre fondo oscuro */}
        <div 
          className="flex-1 flex flex-col justify-center px-10 py-6 text-white space-y-4"
          style={{ backgroundColor: accentColor }}
        >
          <div className="space-y-1">
            <h1 className="tracking-tight leading-none font-bold text-white" style={{ fontSize: fs.name }}>
              <span className="block font-light text-gray-300">{firstName}</span>
              <span className="block font-black text-white">{lastName}</span>
            </h1>
            <div className="pt-1">
              <span className="inline-block bg-white/10 text-gray-200 px-2.5 py-1 rounded-md font-medium uppercase tracking-wider text-[11px]">
                {personal?.title}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/15" style={{ fontSize: fs.small }}>
            <div className="space-y-0.5">
              <span className="text-gray-400 font-semibold block text-[10px] uppercase tracking-wider">Phone</span>
              <p className="text-gray-200">{personal?.phone || '0123 456 789'}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-gray-400 font-semibold block text-[10px] uppercase tracking-wider">Address</span>
              <p className="text-gray-200 truncate">{personal?.location || 'Your Street Address'}</p>
            </div>
            <div className="space-y-0.5 col-span-2">
              <span className="text-gray-400 font-semibold block text-[10px] uppercase tracking-wider">Email</span>
              <p className="text-gray-200">{personal?.email || extras?.linkedin || 'uremail@namehere'}</p>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================
          2. CUERPO PRINCIPAL A DOS COLUMNAS
         ========================================================= */}
      <div className="flex-1 grid grid-cols-12 gap-8 p-8 overflow-hidden bg-white">
        
        {/* COLUMNA IZQUIERDA: Profile, Education, Reference */}
        <div className="col-span-5 flex flex-col space-y-6 border-r border-gray-200 pr-6">
          
          {/* Profile */}
          {profile && (
            <div className="space-y-1.5">
              <h3 className="font-black uppercase tracking-wider text-gray-900 pb-1 border-b-2 border-gray-900 inline-block" style={{ fontSize: fs.h3 }}>
                Profile
              </h3>
              <p className="text-gray-700 leading-relaxed font-normal pt-1" style={{ fontSize: fs.small }}>{profile}</p>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-wider text-gray-900 pb-1 border-b-2 border-gray-900 inline-block" style={{ fontSize: fs.h3 }}>
                Education
              </h3>
              <div className="space-y-3 pt-1">
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

          {/* Reference */}
          {references && references.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-wider text-gray-900 pb-1 border-b-2 border-gray-900 inline-block" style={{ fontSize: fs.h3 }}>
                Reference
              </h3>
              <div className="space-y-2.5 pt-1">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5" style={{ fontSize: fs.small }}>
                    <p className="font-bold text-gray-900">{ref.name}</p>
                    <p className="text-gray-600">{ref.position} - {ref.company}</p>
                    {ref.phone && <p className="text-gray-500">{ref.phone}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* COLUMNA DERECHA: Experience, Skills, Hobbies */}
        <div className="col-span-7 flex flex-col space-y-6">
          
          {/* Experience */}
          {experience && experience.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-wider text-gray-900 pb-1 border-b-2 border-gray-900 inline-block" style={{ fontSize: fs.h3 }}>
                Experience
              </h3>
              <div className="space-y-4 pt-1">
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

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-wider text-gray-900 pb-1 border-b-2 border-gray-900 inline-block" style={{ fontSize: fs.h3 }}>
                Skills
              </h3>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-gray-800 font-medium flex items-center gap-2" style={{ fontSize: fs.small }}>
                    <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* =========================================================
          3. PIE DE PÁGINA
         ========================================================= */}
      <div className="px-8 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-gray-400 shrink-0" style={{ fontSize: fs.tiny }}>
        <span>CVRD.DO — Emerald Clean Layout</span>
        <span>Página 1 de 1</span>
      </div>

    </div>
  );
}