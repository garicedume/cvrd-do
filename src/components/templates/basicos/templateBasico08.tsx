import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function ExtraStandard07({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-xl';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = '#00b4d8'; // Azul cian brillante característico
  const darkSidebarBg = '#33383d'; // Gris carbón oscuro de la barra lateral

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex flex-col justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div className="flex flex-col h-full p-6 box-border justify-between">
        
        {/* ================= PARTE SUPERIOR (2 Columnas: Izquierda Oscura / Derecha Blanca) ================= */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* COLUMNA IZQUIERDA (Gris Oscuro con acento azul) */}
          <div 
            className="col-span-4 p-4 rounded-2xl flex flex-col space-y-5 text-white relative overflow-hidden"
            style={{ backgroundColor: darkSidebarBg }}
          >
            {/* Franja decorativa azul izquierda */}
            <div className="absolute left-0 top-0 bottom-0 w-3" style={{ backgroundColor: accentColor }}></div>

            {/* Foto de perfil */}
            {personal?.showPhoto && (
              <div className="flex justify-center pl-2 pt-2">
                <div 
                  className={`bg-gray-200 overflow-hidden border-2 border-white shadow-md flex items-center justify-center shrink-0 ${photoShapeClass}`}
                  style={{ width: '130px', height: '130px' }}
                >
                  {personal?.photoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-gray-600 font-bold">FOTO</span>
                  )}
                </div>
              </div>
            )}

            {/* Contact Me */}
            <div className="pl-3 text-[10.5px]">
              <div className="inline-block px-3 py-1 rounded-full text-white font-bold uppercase text-[9px] tracking-wider mb-2" style={{ backgroundColor: accentColor }}>
                Contact Me
              </div>
              <div className="space-y-1.5 text-gray-300">
                <p>{personal?.phone || '+1-855-822-2156'}</p>
                <p className="break-all">{personal?.email || 'www.yourwebsite.com / yourinfo@email.com'}</p>
                <p>{personal?.location || '1173 Valley Street Camden, NJ 08102'}</p>
              </div>
            </div>

            {/* References */}
            <div className="pl-3 text-[10.5px] pb-2">
              <h3 className="font-bold uppercase tracking-wider mb-2 text-[11px]" style={{ color: accentColor }}>
                References
              </h3>
              <div className="space-y-2.5 text-gray-300">
                {references && references.length > 0 ? (
                  references.map((ref) => (
                    <div key={ref.id}>
                      <p className="font-bold text-white uppercase text-[10px]">{ref.name}</p>
                      <p className="text-[9.5px] text-gray-400">{ref.company} - {ref.position}</p>
                      <p className="text-[9.5px] text-gray-400">T: {ref.phone}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <p className="font-bold text-white uppercase text-[10px]">MICHAEL R. MAGEE</p>
                      <p className="text-[9.5px] text-gray-400">4418 Bobcat Drive Southfield, MI 48034</p>
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase text-[10px]">TRAVIS M. GODINEZ</p>
                      <p className="text-[9.5px] text-gray-400">2745 Oakwood Drive Chicago, IL 60463</p>
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase text-[10px]">GILBERT R. CROSS</p>
                      <p className="text-[9.5px] text-gray-400">1786 Pretty View Lane San Jose, CA</p>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA (Nombre, About Me, Experiencia) */}
          <div className="col-span-8 flex flex-col space-y-4 pt-1">
            
            {/* Encabezado Principal (Nombre a 53px en azul brillante) */}
            <div className="border-b border-gray-200 pb-3">
              <h1 className="tracking-tight leading-none font-black uppercase" style={{ fontSize: '42px', color: accentColor }}>
                <span>{firstName}</span> <span className="text-gray-700 font-normal">{lastName}</span>
              </h1>
              <p className="text-xs font-bold uppercase tracking-[0.2em] mt-1.5 text-gray-600">
                {personal?.title || 'GRAPHIC & WEB DESIGNER'}
              </p>
            </div>

            {/* About Me */}
            <div className="text-xs">
              <div className="inline-block px-4 py-1 rounded-full text-white font-bold uppercase text-[9px] tracking-wider mb-1.5" style={{ backgroundColor: accentColor }}>
                About Me
              </div>
              <p className="text-gray-700 leading-relaxed font-normal text-[10.5px]">
                {profile || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.'}
              </p>
            </div>

            {/* Job Experience */}
            <div className="text-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-gray-800"></span>
                <h3 className="font-bold uppercase tracking-wider text-[12px]" style={{ color: accentColor }}>
                  Job Experience
                </h3>
              </div>
              
              <div className="space-y-3 relative pl-4 border-l-2 ml-1" style={{ borderColor: accentColor }}>
                {experience && experience.length > 0 ? (
                  experience.map((exp) => (
                    <div key={exp.id} className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gray-800 border-2 border-white"></div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[11px] uppercase">{exp.role}</h4>
                        <span className="font-bold text-[9px]" style={{ color: accentColor }}>{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-gray-600 text-[10px] font-semibold">{exp.company}</p>
                      <p className="text-gray-700 text-[10px] mt-0.5">{exp.description}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gray-800 border-2 border-white"></div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[11px] uppercase">WEB DESIGNER</h4>
                        <span className="font-bold text-[9px]" style={{ color: accentColor }}>2018 - PRESENT</span>
                      </div>
                      <p className="text-gray-600 text-[10px] font-semibold">Company Name</p>
                      <p className="text-gray-700 text-[10px] mt-0.5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gray-800 border-2 border-white"></div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[11px] uppercase">GRAPHIC DESIGNER</h4>
                        <span className="font-bold text-[9px]" style={{ color: accentColor }}>2015 - 2018</span>
                      </div>
                      <p className="text-gray-600 text-[10px] font-semibold">Company Name</p>
                      <p className="text-gray-700 text-[10px] mt-0.5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gray-800 border-2 border-white"></div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[11px] uppercase">MARKETING MANAGER</h4>
                        <span className="font-bold text-[9px]" style={{ color: accentColor }}>2010 - 2015</span>
                      </div>
                      <p className="text-gray-600 text-[10px] font-semibold">Company Name</p>
                      <p className="text-gray-700 text-[10px] mt-0.5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* ================= FRANJA CENTRAL (Education) ================= */}
        <div className="bg-gray-800 text-white p-3 rounded-2xl my-3 text-center relative">
          <div className="inline-block px-6 py-1 rounded-full bg-gray-700 font-bold uppercase text-[10px] tracking-wider mb-2" style={{ backgroundColor: accentColor }}>
            Education
          </div>
          <div className="grid grid-cols-3 gap-4 text-center text-[10px]">
            {education && education.length > 0 ? (
              education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-bold uppercase" style={{ color: accentColor }}>{edu.degree}</p>
                  <p className="text-gray-300 font-semibold">{edu.institution}</p>
                  <p className="text-gray-400 text-[9px]">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))
            ) : (
              <>
                <div>
                  <p className="font-bold uppercase" style={{ color: accentColor }}>MASTER OF CREATIVE ARTS</p>
                  <p className="text-gray-300 font-semibold">UNIVERSITY NAME</p>
                  <p className="text-gray-400 text-[9px] mt-0.5">Lorem ipsum dolor sit amet, consectetur . incididunt ut labore.</p>
                  <p className="font-bold text-[9px] mt-1" style={{ color: accentColor }}>2018 - present</p>
                </div>
                <div>
                  <p className="font-bold uppercase" style={{ color: accentColor }}>MASTER GRAPHIC DESIGNER</p>
                  <p className="text-gray-300 font-semibold">UNIVERSITY NAME</p>
                  <p className="text-gray-400 text-[9px] mt-0.5">Lorem ipsum dolor sit amet, consectetur . incididunt ut labore.</p>
                  <p className="font-bold text-[9px] mt-1" style={{ color: accentColor }}>2015 - 2018</p>
                </div>
                <div>
                  <p className="font-bold uppercase" style={{ color: accentColor }}>MASTER OF DESIGN</p>
                  <p className="text-gray-300 font-semibold">UNIVERSITY NAME</p>
                  <p className="text-gray-400 text-[9px] mt-0.5">Lorem ipsum dolor sit amet, consectetur . incididunt ut labore.</p>
                  <p className="font-bold text-[9px] mt-1" style={{ color: accentColor }}>2010 - 2012</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ================= FRANJA INFERIOR (Skills & Hobbies) ================= */}
        <div className="grid grid-cols-12 gap-6 pt-1 text-[10px]">
          
          {/* Skills */}
          <div className="col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-black uppercase tracking-widest text-[12px]" style={{ color: accentColor }}>SKILLS</span>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-12 items-center gap-2">
                <span className="col-span-5 font-semibold text-gray-800">Microsoft Word</span>
                <div className="col-span-7 flex items-center">
                  <div className="flex-1 bg-gray-200 h-1 rounded-full relative">
                    <div className="absolute w-3 h-3 rounded-full -top-1 left-3/4" style={{ backgroundColor: accentColor }}></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 items-center gap-2">
                <span className="col-span-5 font-semibold text-gray-800">Adobe Illustrator</span>
                <div className="col-span-7 flex items-center">
                  <div className="flex-1 bg-gray-200 h-1 rounded-full relative">
                    <div className="absolute w-3 h-3 rounded-full -top-1 left-4/5" style={{ backgroundColor: accentColor }}></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 items-center gap-2">
                <span className="col-span-5 font-semibold text-gray-800">Microsoft Powerpoint</span>
                <div className="col-span-7 flex items-center">
                  <div className="flex-1 bg-gray-200 h-1 rounded-full relative">
                    <div className="absolute w-3 h-3 rounded-full -top-1 left-2/3" style={{ backgroundColor: accentColor }}></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 items-center gap-2">
                <span className="col-span-5 font-semibold text-gray-800">Adobe Photoshop</span>
                <div className="col-span-7 flex items-center">
                  <div className="flex-1 bg-gray-200 h-1 rounded-full relative">
                    <div className="absolute w-3 h-3 rounded-full -top-1 left-1/2" style={{ backgroundColor: accentColor }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hobbies */}
          <div className="col-span-5 flex flex-col justify-center border-l border-gray-200 pl-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-black uppercase tracking-widest text-[12px]" style={{ color: accentColor }}>HOBBIES</span>
            </div>
            <div className="grid grid-cols-2 gap-y-1 text-gray-700 font-medium">
              <p>• WRITING</p>
              <p>• READING BOOKS</p>
              <p>• PLAYING FOOTBALL</p>
              <p>• PHOTOGRAPHY</p>
              <p>• TRAVELING</p>
            </div>
          </div>

        </div>

        {/* Pie de página */}
        <div className="text-right text-[9px] text-gray-400 pt-2 border-t border-gray-100">
          CVRD.DO — Extra Standard 07 Template
        </div>
      </div>
    </div>
  );
}