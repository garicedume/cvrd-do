import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function ExtraStandard05({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = '#c29b68'; // Tono ocre/dorado elegante de la plantilla
  const sidebarBg = '#f4f2ee'; // Fondo gris/crema muy suave

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA IZQUIERDA (Fondo Gris Suave) ================= */}
      <div 
        className="w-[280px] h-full flex flex-col justify-between p-6 shrink-0 relative border-r border-gray-200"
        style={{ backgroundColor: sidebarBg }}
      >
        <div className="flex flex-col space-y-6 pt-4">
          
          {/* Foto de perfil con borde curvado superior izquierdo */}
          {personal?.showPhoto && (
            <div className="flex justify-center pt-2">
              <div 
                className="bg-white overflow-hidden shadow-md flex items-center justify-center shrink-0"
                style={{ width: '150px', height: '150px', borderTopLeftRadius: '75px', borderTopRightRadius: '75px', borderBottomLeftRadius: '75px' }}
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

          {/* About */}
          <div className="text-xs pt-4">
            <div className="inline-block px-4 py-1 rounded-full text-white font-bold uppercase text-[10px] tracking-wider mb-2" style={{ backgroundColor: accentColor }}>
              About
            </div>
            <p className="text-gray-700 leading-relaxed text-[10px]">
              {profile || 'Hello, my name is Ashley Kok, I am a graphic designer with 10 years experience. I live in Singapore, but I worked and still working with people all around the world.'}
            </p>
          </div>

          {/* Contact */}
          <div className="text-xs">
            <div className="inline-block px-4 py-1 rounded-full text-white font-bold uppercase text-[10px] tracking-wider mb-2" style={{ backgroundColor: accentColor }}>
              Contact
            </div>
            <div className="space-y-1.5 text-gray-700 text-[10px]">
              <p className="break-all">{personal?.email || 'username@gmail.com'}</p>
              <p>{personal?.phone || '+603 1234 567'}</p>
              <p>{personal?.location || 'Your address, 123 road, postcode 451 state.'}</p>
            </div>
          </div>

          {/* Education */}
          <div className="text-xs">
            <div className="inline-block px-4 py-1 rounded-full text-white font-bold uppercase text-[10px] tracking-wider mb-2" style={{ backgroundColor: accentColor }}>
              Education
            </div>
            <div className="space-y-2.5">
              {education && education.length > 0 ? (
                education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-gray-900 text-[10px] uppercase">{edu.degree}</p>
                    <p className="text-gray-600 text-[9px]">{edu.institution} / {edu.endDate}</p>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <p className="font-bold text-gray-900 text-[10px]">ENTER YOU DEGREE / MAJOR</p>
                    <p className="text-gray-600 text-[9px]">University / Years</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-[10px]">ENTER YOU DEGREE / MAJOR</p>
                    <p className="text-gray-600 text-[9px]">University / Years</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-[10px]">ENTER YOU DEGREE / MAJOR</p>
                    <p className="text-gray-600 text-[9px]">University / Years</p>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        <div className="text-[9px] text-gray-400 text-center pb-2">
          CVRD.DO
        </div>
      </div>

      {/* ================= COLUMNA DERECHA (Contenido Principal) ================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 bg-white relative">
        
        <div className="flex flex-col space-y-6">
          
          {/* Encabezado Principal (Nombre a 53px en tono ocre) */}
          <div className="border-b border-gray-200 pb-5 relative">
            <h1 className="tracking-tight leading-none font-black" style={{ fontSize: '53px', color: accentColor }}>
              <span>{firstName}</span> <span className="font-normal text-gray-600">{lastName}</span>
            </h1>
            <p className="text-xs font-semibold text-gray-600 mt-2 whitespace-pre-line leading-snug">
              {personal?.title || "I'm Ashley\ngraphic designer\ncum interactive designer"}
            </p>

            {/* Iconos redes sociales derecha */}
            <div className="absolute right-0 top-6 flex gap-2 text-gray-400 text-xs">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold">f</span>
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold">in</span>
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold">t</span>
            </div>
          </div>

          {/* Experience */}
          <div className="text-xs relative pl-4 border-l-2" style={{ borderColor: accentColor }}>
            <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
            <h3 className="font-bold uppercase tracking-wider mb-3 text-[12px]" style={{ color: accentColor }}>
              Experience
            </h3>
            
            <div className="space-y-4">
              {experience && experience.length > 0 ? (
                experience.map((exp) => (
                  <div key={exp.id}>
                    <h4 className="font-bold text-gray-900 text-[11px]">{exp.role}</h4>
                    <p className="text-gray-500 text-[9px] mb-1">{exp.company} / {exp.startDate} - {exp.endDate}</p>
                    <p className="text-gray-700 text-[10px]">{exp.description}</p>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[11px]">Web Designer</h4>
                    <p className="text-gray-500 text-[9px] mb-1">Company/Location/Years</p>
                    <p className="text-gray-700 text-[10px]">Insert a brief statement about your current job. You want to highlight your actual duties.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[11px]">Interactive Designer</h4>
                    <p className="text-gray-500 text-[9px] mb-1">Company/Location/Years</p>
                    <p className="text-gray-700 text-[10px]">Insert a brief statement about your current job. You want to highlight your actual duties.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[11px]">Graphic Designer</h4>
                    <p className="text-gray-500 text-[9px] mb-1">Company/Location/Years</p>
                    <p className="text-gray-700 text-[10px]">Insert a brief statement about your current job. You want to highlight your actual duties.</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Languages */}
          <div className="text-xs relative pl-4 border-l-2" style={{ borderColor: accentColor }}>
            <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
            <h3 className="font-bold uppercase tracking-wider mb-2 text-[12px]" style={{ color: accentColor }}>
              Languages
            </h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-700 font-medium">English</span>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.8 }}></div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-700 font-medium">French</span>
                <div className="w-3/4 h-2 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.8 }}></div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-700 font-medium">Chinese</span>
                <div className="w-5/6 h-2 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.8 }}></div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-700 font-medium">Spanish</span>
                <div className="w-2/3 h-2 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.8 }}></div>
              </div>
            </div>
          </div>

          {/* Skill */}
          <div className="text-xs relative pl-4 border-l-2" style={{ borderColor: accentColor }}>
            <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
            <h3 className="font-bold uppercase tracking-wider mb-2 text-[12px]" style={{ color: accentColor }}>
              Skill
            </h3>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Photoshop</span>
                <span className="tracking-widest" style={{ color: accentColor }}>●●●●●●</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Illustrator</span>
                <span className="tracking-widest" style={{ color: accentColor }}>●●●●●○</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Premier</span>
                <span className="tracking-widest" style={{ color: accentColor }}>●●●●○○</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">After Effects</span>
                <span className="tracking-widest" style={{ color: accentColor }}>●●●○○○</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Microsoft Office</span>
                <span className="tracking-widest" style={{ color: accentColor }}>●●○○○○</span>
              </div>
            </div>
          </div>

        </div>

        {/* Pie de página */}
        <div className="text-right text-[9px] text-gray-400 pt-2 border-t border-gray-100">
          CVRD.DO — Extra Standard 05 Template
        </div>
      </div>
    </div>
  );
}