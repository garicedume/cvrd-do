import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function HospitalityTourismTemplate({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA IZQUIERDA (Fondo Gris) ================= */}
      <div 
        className="w-[280px] h-full flex flex-col justify-between p-6 shrink-0 relative border-r border-gray-300 z-0"
        style={{ backgroundColor: '#e5e7eb' }}
      >
        <div className="flex flex-col space-y-6 pt-24">
          
          <h2 className="text-xl font-black uppercase tracking-widest text-gray-800 pb-1">
            Resume
          </h2>

          {/* Contact Me */}
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2 text-[11px]">
              Contact Me
            </h3>
            <div className="space-y-2 text-gray-700 text-[10px]">
              {personal?.phone && <p className="leading-tight">📞 {personal.phone}</p>}
              {personal?.email && <p className="leading-tight break-all">✉️ {personal.email}</p>}
              {personal?.location && <p className="leading-tight">📍 {personal.location}</p>}
              {extras?.portfolio && <p className="leading-tight break-all">🌐 {extras.portfolio}</p>}
            </div>
          </div>

          {/* Education con línea de tiempo */}
          {education && education.length > 0 && (
            <div className="text-xs">
              <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-3 text-[11px]">
                Education
              </h3>
              <div className="space-y-3 relative border-l border-gray-400 ml-2 pl-3">
                {education.map((edu) => (
                  <div key={edu.id} className="relative">
                    <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-gray-600 border border-gray-200"></div>
                    <p className="text-gray-600 font-semibold text-[9px]">{edu.startDate} - {edu.endDate}</p>
                    <p className="font-bold text-gray-900 text-[11px]">{edu.degree}</p>
                    <p className="text-gray-700 text-[10px]">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2 text-[11px]">
              Hobbies
            </h3>
            <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-700 font-medium">
              <p>• Woodworking</p>
              <p>• Metalworking</p>
              <p>• Web-design</p>
              <p>• Snowboarding</p>
              <p>• Top dance</p>
              <p>• Baseball</p>
              <p>• Board Game</p>
              <p>• Scrapbooking</p>
            </div>
          </div>

        </div>

        <div className="text-[9px] text-gray-500 text-center pb-2">
          CVRD.DO
        </div>
      </div>

      {/* ================= COLUMNA DERECHA (Contenido Principal) ================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 bg-white relative">
        
        {/* Foto de perfil flotante cruzando exactamente la división */}
        {personal?.showPhoto && (
          <div className="absolute top-6 -left-12 z-20">
            <div 
              className={`bg-white overflow-hidden border-4 border-white shadow-lg flex items-center justify-center shrink-0 ${photoShapeClass}`}
              style={{ width: '96px', height: '96px' }}
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

        <div className="flex flex-col space-y-4 pt-2">
          
          {/* Encabezado Principal */}
          <div className="border-b border-gray-300 pb-4 pl-8">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-2 items-baseline" style={{ fontSize: '34px' }}>
              <span className="font-black text-gray-900 uppercase">{firstName}</span>
              <span className="font-light text-gray-500 uppercase">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest mt-1.5 text-gray-600">
              {personal?.title}
            </p>
            <p className="text-[10px] text-gray-500 mt-1 max-w-md">
              {profile ? profile.substring(0, 95) + '...' : 'From logo design and branding to web and graphics and print materials, we offer a diverse range.'}
            </p>
          </div>

          {/* Profile */}
          {profile && (
            <div className="text-xs">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-1 text-gray-900 text-[11px]">
                Profile
              </h3>
              <p className="text-gray-700 leading-relaxed font-normal text-[10px]">{profile}</p>
            </div>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <div className="text-xs">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[11px]">
                Work Experience
              </h3>
              <div className="space-y-2.5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[11px]">• {exp.role} at {exp.company}</h4>
                      <span className="text-gray-500 font-semibold text-[9px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-[10px] pl-3 mt-0.5">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Professional Skills con barritas segmentadas */}
          <div className="text-xs pt-1">
            <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[11px]">
              Professional Skills
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-semibold text-gray-800 mb-1">Adobe illustrator</p>
                <div className="flex gap-1">
                  <div className="h-1.5 w-6 bg-gray-800 rounded-sm"></div>
                  <div className="h-1.5 w-6 bg-gray-800 rounded-sm"></div>
                  <div className="h-1.5 w-6 bg-gray-800 rounded-sm"></div>
                  <div className="h-1.5 w-6 bg-gray-300 rounded-sm"></div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800 mb-1">Adobe photoshop</p>
                <div className="flex gap-1">
                  <div className="h-1.5 w-6 bg-gray-800 rounded-sm"></div>
                  <div className="h-1.5 w-6 bg-gray-800 rounded-sm"></div>
                  <div className="h-1.5 w-6 bg-gray-800 rounded-sm"></div>
                  <div className="h-1.5 w-6 bg-gray-800 rounded-sm"></div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800 mb-1">UI/UX Design</p>
                <div className="flex gap-1">
                  <div className="h-1.5 w-6 bg-gray-800 rounded-sm"></div>
                  <div className="h-1.5 w-6 bg-gray-800 rounded-sm"></div>
                  <div className="h-1.5 w-6 bg-gray-300 rounded-sm"></div>
                  <div className="h-1.5 w-6 bg-gray-300 rounded-sm"></div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800 mb-1">Adobe XD</p>
                <div className="flex gap-1">
                  <div className="h-1.5 w-6 bg-gray-800 rounded-sm"></div>
                  <div className="h-1.5 w-6 bg-gray-800 rounded-sm"></div>
                  <div className="h-1.5 w-6 bg-gray-800 rounded-sm"></div>
                  <div className="h-1.5 w-6 bg-gray-300 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Pie de página */}
        <div className="text-right text-[9px] text-gray-400 pt-2 border-t border-gray-100">
          CVRD.DO — Hospitality & Tourism Template
        </div>
      </div>
    </div>
  );
}