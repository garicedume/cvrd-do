import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function LogisticsProTemplate({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = '#2563eb'; // Azul corporativo elegante de la plantilla
  const sidebarBg = '#f0f4f8'; // Azul claro muy suave para el fondo de la columna izquierda

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA IZQUIERDA (Fondo Azul Claro) ================= --> */}
      <div 
        className="w-[290px] h-full flex flex-col justify-between p-6 shrink-0 relative border-r border-blue-100"
        style={{ backgroundColor: sidebarBg }}
      >
        <div className="flex flex-col space-y-6">
          
          {/* Foto de perfil grande y centrada */}
          {personal?.showPhoto && (
            <div className="flex justify-center pt-2">
              <div 
                className={`bg-white overflow-hidden border-4 border-white shadow-md flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '135px', height: '135px' }}
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

          {/* Education */}
          {education && education.length > 0 && (
            <div className="text-xs">
              <h3 className="font-bold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-1 mb-2 text-[12px]">
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-blue-700 font-semibold text-[9px]">{edu.startDate} - {edu.endDate}</p>
                    <p className="font-bold text-gray-900 text-[11px]">{edu.degree}</p>
                    <p className="text-gray-600 text-[10px]">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact */}
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-1 mb-2 text-[12px]">
              Contact
            </h3>
            <div className="space-y-2 text-gray-700 text-[10px]">
              {personal?.phone && (
                <div>
                  <span className="font-semibold block text-gray-500 text-[9px]">Phone</span>
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal?.email && (
                <div>
                  <span className="font-semibold block text-gray-500 text-[9px]">Email</span>
                  <span className="break-all">{personal.email}</span>
                </div>
              )}
              {personal?.location && (
                <div>
                  <span className="font-semibold block text-gray-500 text-[9px]">Address</span>
                  <span>{personal.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills con estrellas */}
          {skills && skills.length > 0 && (
            <div className="text-xs">
              <h3 className="font-bold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-1 mb-2 text-[12px]">
                Skills
              </h3>
              <div className="space-y-2">
                {skills.slice(0, 4).map((skill, index) => (
                  <div key={skill.id || index} className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-800 font-medium">{skill.name}</span>
                    <span className="text-blue-600 text-[10px] tracking-widest">★★★☆</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="text-[9px] text-gray-400 text-center pb-2">
          CVRD.DO
        </div>
      </div>

      {/* ================= COLUMNA DERECHA (Contenido Principal) ================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 bg-white">
        
        <div className="flex flex-col space-y-6">
          
          {/* Encabezado Principal (Nombre en dos líneas y título) */}
          <div>
            <h1 className="tracking-tight leading-tight font-black uppercase text-blue-960" style={{ fontSize: '34px', color: '#1e3a8a' }}>
              <span>{firstName}</span>
              <br />
              <span>{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest mt-1 text-gray-600">
              {personal?.title}
            </p>
          </div>

          {/* Profile */}
          {profile && (
            <div className="text-xs border-b border-gray-200 pb-5">
              <h3 className="font-bold uppercase tracking-wider text-blue-900 mb-1 text-[12px]">
                Profile
              </h3>
              <p className="text-gray-700 leading-relaxed font-normal text-[11px]">{profile}</p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div className="text-xs">
              <h3 className="font-bold uppercase tracking-wider text-blue-900 mb-3 text-[12px]">
                Experience
              </h3>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2 border-blue-600">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-gray-600 text-[11px]">{exp.company}</span>
                      <span className="text-gray-500 font-semibold text-[10px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <h4 className="font-bold text-blue-900 text-[12px] mb-1">{exp.role}</h4>
                    <p className="text-gray-700 leading-relaxed text-[11px]">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Pie de página */}
        <div className="text-right text-[10px] text-gray-400 pt-2 border-t border-gray-100">
          CVRD.DO — Logistics Pro Template
        </div>
      </div>
    </div>
  );
}