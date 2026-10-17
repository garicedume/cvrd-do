import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function ExtraStandard06({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = '#38bdf8'; // Azul brillante característico de la plantilla

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA IZQUIERDA ================= */}
      <div 
        className="w-[280px] h-full flex flex-col justify-between p-6 shrink-0 relative border-r border-gray-200"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="flex flex-col space-y-6 pt-2">
          
          {/* Foto de perfil circular */}
          {personal?.showPhoto && (
            <div className="flex justify-center">
              <div 
                className={`bg-gray-100 overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '130px', height: '130px' }}
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

          {/* Contacto con iconos en negro */}
          <div className="text-[10px] space-y-2 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px]">📞</span>
              <span className="text-gray-700 font-medium">{personal?.phone || '008 563 864 4587'}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px]">✉️</span>
              <span className="text-gray-700 font-medium break-all">{personal?.email || 'robertsmith@email.com'}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px]">🌐</span>
              <span className="text-gray-700 font-medium break-all">{extras?.portfolio || 'www.website.com'}</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b-2 border-sky-400 pb-1 mb-3 text-[11px]">
              Achievements
            </h3>
            <div className="space-y-3 text-[10px]">
              <div>
                <div className="flex justify-between font-bold text-gray-900">
                  <span>BIG PROJECT</span>
                  <span className="text-gray-500 font-normal">2017</span>
                </div>
                <p className="text-gray-600 mt-0.5">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
              </div>
              <div>
                <div className="flex justify-between font-bold text-gray-900">
                  <span>BIG PROJECT</span>
                  <span className="text-gray-500 font-normal">2014</span>
                </div>
                <p className="text-gray-600 mt-0.5">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b-2 border-sky-400 pb-1 mb-2 text-[11px]">
              Languages
            </h3>
            <div className="space-y-1.5 text-[10px]">
              <div>
                <div className="flex justify-between mb-0.5"><span className="font-semibold text-gray-700 text-[9px]">ENGLISH</span></div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-sky-500" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-0.5"><span className="font-semibold text-gray-700 text-[9px]">SPANISH</span></div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-sky-500" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-0.5"><span className="font-semibold text-gray-700 text-[9px]">GERMAN</span></div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-sky-500" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-0.5"><span className="font-semibold text-gray-700 text-[9px]">FRANCE</span></div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-sky-500" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills con porcentajes */}
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b-2 border-sky-400 pb-1 mb-2 text-[11px]">
              Skills
            </h3>
            <div className="space-y-1.5 text-[10px] text-gray-700 font-medium">
              <div className="flex justify-between"><span>WEB DESIGN</span><span className="text-gray-500 font-bold">100 %</span></div>
              <div className="flex justify-between"><span>GRAPHIC DESIGN</span><span className="text-gray-500 font-bold">99 %</span></div>
              <div className="flex justify-between"><span>UI DESIGN</span><span className="text-gray-500 font-bold">65 %</span></div>
              <div className="flex justify-between"><span>DRAWING</span><span className="text-gray-500 font-bold">50 %</span></div>
              <div className="flex justify-between"><span>ANIMATION</span><span className="text-gray-500 font-bold">45 %</span></div>
            </div>
          </div>

        </div>

        <div className="text-[9px] text-gray-400 text-center pb-1">
          CVRD.DO
        </div>
      </div>

      {/* ================= COLUMNA DERECHA (Contenido Principal) ================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 bg-white">
        
        <div className="flex flex-col space-y-6">
          
          {/* Encabezado Principal (Nombre a 53px) */}
          <div className="border-b-2 border-sky-400 pb-4">
            <h1 className="tracking-widest leading-none font-black text-gray-900 uppercase" style={{ fontSize: '42px' }}>
              {firstName} {lastName}
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mt-1.5 text-gray-500">
              {personal?.title || 'CREATIVE DIRECTOR'}
            </p>
          </div>

          {/* About Me */}
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b-2 border-sky-400 pb-1 mb-2 text-[12px]">
              About Me
            </h3>
            <p className="text-gray-700 leading-relaxed font-normal text-[10.5px]">
              {profile || 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'}
            </p>
          </div>

          {/* Work Experience */}
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b-2 border-sky-400 pb-1 mb-3 text-[12px]">
              Work Experience
            </h3>
            
            <div className="space-y-4">
              {experience && experience.length > 0 ? (
                experience.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-12 gap-2">
                    <span className="col-span-3 text-gray-500 font-semibold text-[10px] uppercase">{exp.startDate} - {exp.endDate}</span>
                    <div className="col-span-9">
                      <h4 className="font-bold text-gray-900 text-[11px] uppercase">{exp.role} / {exp.company}</h4>
                      <p className="text-gray-600 text-[10px] mt-0.5">{exp.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="grid grid-cols-12 gap-2">
                    <span className="col-span-3 text-gray-500 font-semibold text-[10px] uppercase">PRESENT</span>
                    <div className="col-span-9">
                      <h4 className="font-bold text-gray-900 text-[11px] uppercase">POSITION TITLE / COMPANY NAME</h4>
                      <p className="text-gray-600 text-[10px] mt-0.5">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    <span className="col-span-3 text-gray-500 font-semibold text-[10px] uppercase">2013 - 2016</span>
                    <div className="col-span-9">
                      <h4 className="font-bold text-gray-900 text-[11px] uppercase">POSITION TITLE / COMPANY NAME</h4>
                      <p className="text-gray-600 text-[10px] mt-0.5">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    <span className="col-span-3 text-gray-500 font-semibold text-[10px] uppercase">2010 - 2013</span>
                    <div className="col-span-9">
                      <h4 className="font-bold text-gray-900 text-[11px] uppercase">POSITION TITLE / COMPANY NAME</h4>
                      <p className="text-gray-600 text-[10px] mt-0.5">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b-2 border-sky-400 pb-1 mb-3 text-[12px]">
              Education
            </h3>
            
            <div className="space-y-3">
              {education && education.length > 0 ? (
                education.map((edu) => (
                  <div key={edu.id} className="grid grid-cols-12 gap-2">
                    <span className="col-span-3 text-gray-500 font-semibold text-[10px]">{edu.startDate} - {edu.endDate}</span>
                    <div className="col-span-9">
                      <h4 className="font-bold text-gray-900 text-[11px] uppercase">{edu.degree}</h4>
                      <p className="text-gray-600 text-[10px]">{edu.institution}</p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="grid grid-cols-12 gap-2">
                    <span className="col-span-3 text-gray-500 font-semibold text-[10px]">2008 - 2010</span>
                    <div className="col-span-9">
                      <h4 className="font-bold text-gray-900 text-[11px] uppercase">DEGREE TITLE / MAJOR</h4>
                      <p className="text-gray-600 text-[10px] font-semibold">University Name. Location</p>
                      <p className="text-gray-500 text-[9.5px]">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    <span className="col-span-3 text-gray-500 font-semibold text-[10px]">2002 - 2008</span>
                    <div className="col-span-9">
                      <h4 className="font-bold text-gray-900 text-[11px] uppercase">DEGREE TITLE / MAJOR</h4>
                      <p className="text-gray-600 text-[10px] font-semibold">University Name. Location</p>
                      <p className="text-gray-500 text-[9.5px]">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Pie de página */}
        <div className="text-right text-[10px] text-gray-400 pt-2 border-t border-gray-100">
          CVRD.DO — Extra Standard 06 Template
        </div>
      </div>
    </div>
  );
}