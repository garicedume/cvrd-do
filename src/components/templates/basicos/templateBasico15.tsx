import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TechDeveloperTemplate({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex flex-col justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      <div className="flex flex-col h-full p-8 box-border justify-between">
        
        {/* ================= ENCABEZADO SUPERIOR ================= */}
        <div className="flex justify-between items-start border-b border-gray-300 pb-5">
          <div className="flex flex-col justify-center">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '53px' }}>
              <span className="font-extrabold text-gray-900">{firstName}</span>
              <span className="font-light text-gray-500">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest mt-2 text-gray-600">
              {personal?.title || 'WEB DESIGNER & DEVELOPER'}
            </p>
          </div>

          {/* Contacto derecho */}
          <div className="text-[11px] text-gray-700 space-y-1.5 text-right pt-1">
            {personal?.phone && (
              <p className="flex items-center justify-end gap-2">
                <span>{personal.phone}</span>
                <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-[10px]">📞</span>
              </p>
            )}
            {personal?.email && (
              <p className="flex items-center justify-end gap-2">
                <span>{personal.email}</span>
                <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-[10px]">✉️</span>
              </p>
            )}
            {personal?.location && (
              <p className="flex items-center justify-end gap-2">
                <span>{personal.location}</span>
                <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-[10px]">📍</span>
              </p>
            )}
            {!personal?.phone && !personal?.email && (
              <>
                <p className="flex items-center justify-end gap-2"><span>012 222 7654 111</span><span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-[10px]">📞</span></p>
                <p className="flex items-center justify-end gap-2"><span>youremail@email.com</span><span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-[10px]">✉️</span></p>
                <p className="flex items-center justify-end gap-2"><span>2331 Woodland Drive</span><span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-[10px]">📍</span></p>
              </>
            )}
          </div>
        </div>

        {/* ================= CUERPO CENTRAL (2 Columnas) ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1 pt-4">
          
          {/* COLUMNA IZQUIERDA (Fondo gris suave) */}
          <div className="col-span-4 bg-gray-100/70 p-4 rounded-xl flex flex-col space-y-4 text-xs border border-gray-200">
            
            {/* Foto de perfil */}
            {personal?.showPhoto && (
              <div className="flex justify-center my-1">
                <div 
                  className={`bg-gray-200 overflow-hidden border border-gray-300 shadow-sm flex items-center justify-center shrink-0 ${photoShapeClass}`}
                  style={{ width: '130px', height: '145px' }}
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
            <div>
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[11px]">
                Education
              </h3>
              <div className="space-y-2.5">
                {education && education.length > 0 ? (
                  education.map((edu) => (
                    <div key={edu.id}>
                      <p className="text-gray-500 text-[9px] font-semibold">{edu.startDate} - {edu.endDate}</p>
                      <p className="font-bold text-gray-900 text-[11px]">{edu.degree}</p>
                      <p className="text-gray-600 text-[10px]">{edu.institution}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <p className="text-gray-500 text-[9px] font-semibold">2001-2007</p>
                      <p className="font-bold text-gray-900 text-[11px]">Master Degree</p>
                      <p className="text-gray-600 text-[10px]">Comunication</p>
                      <p className="text-gray-500 text-[9px]">Zurich University</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[9px] font-semibold">2007-2010</p>
                      <p className="font-bold text-gray-900 text-[11px]">Bachelor Degree</p>
                      <p className="text-gray-600 text-[10px]">Media and Comunication</p>
                      <p className="text-gray-500 text-[9px]">Zurich University</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Hobbies */}
            <div>
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[11px]">
                Hobbies
              </h3>
              <ul className="space-y-1 text-gray-700 text-[10px]">
                <li>• CYCLING</li>
                <li>• PHOTOGRAPHY</li>
              </ul>
            </div>

            {/* Reference */}
            <div>
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[11px]">
                Reference
              </h3>
              {references && references.length > 0 ? (
                <div className="space-y-1 text-[10px] text-gray-700">
                  <p className="font-bold uppercase">{references[0].name}</p>
                  <p>{references[0].company}</p>
                  <p className="text-gray-500">{references[0].phone}</p>
                </div>
              ) : (
                <div className="text-[10px] text-gray-700 space-y-0.5">
                  <p className="font-bold uppercase">LUIS GARCIA</p>
                  <p className="text-gray-600">Company Name</p>
                  <p className="text-gray-500">info@companyemail.com</p>
                </div>
              )}
            </div>

          </div>

          {/* COLUMNA DERECHA (Experiencia Principal) */}
          <div className="col-span-8 flex flex-col text-xs space-y-4 pl-2">
            
            {/* Profile / Summary */}
            <div>
              <p className="text-gray-700 leading-relaxed font-normal text-[10.5px]">
                {profile || 'Sedut perspiatis unde omnis iste natuserror sit voluptstem accusan tiumyu dolor emque laudantium, tortamrame eaque ipsa quae ab inventore. Veritatis quasi achritectop betameatea. Accusan tiumyudolor emque laudantium, tortamrame eaque ipsa quae ab inventore dolor emque laudantium tiumyu doloremque laudantium.'}
              </p>
            </div>

            {/* Experience */}
            <div>
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[12px]">
                Experience
              </h3>
              <div className="space-y-3">
                {experience && experience.length > 0 ? (
                  experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[11px]">{exp.role} at {exp.company}</h4>
                        <span className="text-gray-500 font-semibold text-[10px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-[10.5px] mt-0.5">{exp.description}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[11px]">Head of Design ABC Company</h4>
                        <span className="text-gray-500 font-semibold text-[10px]">2018 - 2020</span>
                      </div>
                      <p className="text-gray-700 text-[10px] mt-0.5 mb-1">
                        Sedut perspiatis unde omnis iste natus error sit voluptatem accusan tiumyu dolor emque laudantium, totam remaperi, eaque ipsa quae abaq inventoreveritasi quasi.
                      </p>
                      <ul className="list-disc list-inside text-gray-600 text-[9.5px] space-y-0.5 pl-1">
                        <li>Omnis iste natus error sit voluptatem erroe sit</li>
                        <li>Totam remaperi eaque omnis iste natus error</li>
                        <li>Iste natus error sit voluptatem erroe sit</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-[11px]">Senior Graphic Designer DEF Company</h4>
                        <span className="text-gray-500 font-semibold text-[10px]">2016 - 2018</span>
                      </div>
                      <p className="text-gray-700 text-[10px] mt-0.5 mb-1">
                        Sedut perspiatis unde omnis iste natus error sit voluptatem accusan tiumyu dolor emque laudantium, totam remaperi, eaque ipsa quae abaq inventoreveritasi quasi.
                      </p>
                      <ul className="list-disc list-inside text-gray-600 text-[9.5px] space-y-0.5 pl-1">
                        <li>Omnis iste natus error sit voluptatem erroe sit</li>
                        <li>Totam remaperi eaque omnis iste natus error</li>
                        <li>Iste natus error sit voluptatem erroe sit</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* ================= FRANJA INFERIOR (3 Columnas: Knowledge, Language, Software) ================= */}
        <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-300 mt-2 text-[10px]">
          
          {/* Knowledge */}
          <div>
            <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[11px]">
              Knowledge
            </h3>
            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between mb-0.5"><span className="font-semibold text-gray-800">WEB DESIGN</span></div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gray-700" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-0.5"><span className="font-semibold text-gray-800">GRAPHIC DESIGN</span></div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gray-700" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-0.5"><span className="font-semibold text-gray-800">VIDEO EDITING</span></div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gray-700" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Language */}
          <div>
            <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[11px]">
              Language
            </h3>
            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between mb-0.5"><span className="font-semibold text-gray-800">ENGLISH</span></div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gray-700" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-0.5"><span className="font-semibold text-gray-800">FRENCH</span></div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gray-700" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-0.5"><span className="font-semibold text-gray-800">SPANISH</span></div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gray-700" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Software */}
          <div>
            <h3 className="font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-900 text-[11px]">
              Software
            </h3>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[9px] bg-gray-800 text-white px-1 rounded">Ai</span>
                <div className="flex-1 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gray-700" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[9px] bg-blue-900 text-white px-1 rounded">Ps</span>
                <div className="flex-1 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gray-700" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[9px] bg-red-900 text-white px-1 rounded">Id</span>
                <div className="flex-1 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gray-700" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Pie de página */}
        <div className="text-right text-[9px] text-gray-400 pt-2 border-t border-gray-200">
          CVRD.DO — Tech & Code Developer Template
        </div>
      </div>
    </div>
  );
}