import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function ExtraStandard04({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#4a5568'; // Gris pizarra corporativo
  const sidebarBg = '#eef0ed'; // Tono gris/crema muy suave característico

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
        
        {/* ================= CABECERA SUPERIOR (Asimétrica) ================= */}
        <div className="grid grid-cols-12 gap-6 pb-6 relative">
          
          {/* Izquierda: Nombre y Título */}
          <div className="col-span-7 flex flex-col justify-center">
            <h1 className="tracking-tight leading-none uppercase font-black text-gray-900" style={{ fontSize: '53px' }}>
              <span>{firstName}</span>
              <br />
              <span className="font-normal text-gray-600">{lastName}</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest mt-2 text-gray-700">
              {personal?.title || 'GRAPHIC DESIGN'}
            </p>
            <p className="text-gray-600 text-[10.5px] mt-2 leading-relaxed pr-4">
              {profile || 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'}
            </p>
          </div>

          {/* Derecha: Foto de perfil circular gigante con fondo gris */}
          <div 
            className="col-span-5 flex items-center justify-center p-4 rounded-b-3xl relative"
            style={{ backgroundColor: sidebarBg }}
          >
            {personal?.showPhoto && (
              <div 
                className={`overflow-hidden border-4 border-white shadow-md flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '150px', height: '150px' }}
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

        </div>

        <div className="w-full h-0.5 bg-gray-400 mb-4"></div>

        {/* ================= CUERPO PRINCIPAL (2 Columnas Invertidas) ================= */}
        <div className="grid grid-cols-12 gap-6 flex-1">
          
          {/* COLUMNA IZQUIERDA (Contenido Principal: Education, Experience, Skills) */}
          <div className="col-span-7 flex flex-col space-y-5 pr-4">
            
            {/* Education */}
            <div className="text-xs">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-gray-900 text-[12px]">
                Education
              </h3>
              <div className="space-y-2.5">
                {education && education.length > 0 ? (
                  education.map((edu) => (
                    <div key={edu.id}>
                      <p className="text-gray-500 font-semibold text-[10px]">{edu.startDate} - {edu.endDate}</p>
                      <p className="font-bold text-gray-900 text-[11px]">{edu.degree}</p>
                      <p className="text-gray-600 text-[10px]">{edu.institution}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <p className="text-gray-500 font-semibold text-[10px]">2010-2015</p>
                      <p className="font-bold text-gray-900 text-[11px]">Lorem ipsum dolor sit amet, consectetuer.</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold text-[10px]">2016-2019</p>
                      <p className="font-bold text-gray-900 text-[11px]">Lorem ipsum dolor sit amet, consectetuer.</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold text-[10px]">2018-2020</p>
                      <p className="font-bold text-gray-900 text-[11px]">Lorem ipsum dolor sit amet, consectetuer.</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Work Experience */}
            <div className="text-xs">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-gray-900 text-[12px]">
                Work Experience
              </h3>
              <div className="space-y-2.5">
                {experience && experience.length > 0 ? (
                  experience.map((exp) => (
                    <div key={exp.id}>
                      <p className="text-gray-500 font-semibold text-[10px]">{exp.startDate} - {exp.endDate}</p>
                      <p className="font-bold text-gray-900 text-[11px]">{exp.role} at {exp.company}</p>
                      <p className="text-gray-600 text-[10px]">{exp.description}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <p className="text-gray-500 font-semibold text-[10px]">2009-2011</p>
                      <p className="font-bold text-gray-900 text-[11px]">Lorem ipsum dolor sit amet, consectetuer.</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold text-[10px]">2012-2016</p>
                      <p className="font-bold text-gray-900 text-[11px]">Lorem ipsum dolor sit amet, consectetuer.</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold text-[10px]">2017-2020</p>
                      <p className="font-bold text-gray-900 text-[11px]">Lorem ipsum dolor sit amet, consectetuer.</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="text-xs">
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2.5 text-gray-900 text-[12px]">
                Skills
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5 font-semibold text-gray-800"><span>WEB DESIGN</span></div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gray-700" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5 font-semibold text-gray-800"><span>GRAPHIC DESIGN</span></div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gray-700" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5 font-semibold text-gray-800"><span>PHOTOSHOP</span></div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gray-700" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5 font-semibold text-gray-800"><span>EXCEL</span></div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gray-700" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA (Fondo Gris Suave: Contact, About Me, Languages) */}
          <div 
            className="col-span-5 p-5 rounded-2xl flex flex-col space-y-5 text-xs"
            style={{ backgroundColor: sidebarBg }}
          >
            
            {/* Contact Me */}
            <div>
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2.5 text-gray-900 text-[12px]">
                Contact Me
              </h3>
              <div className="space-y-2 text-gray-700 text-[10px]">
                <p className="flex items-center gap-2"><span>📱</span> {personal?.phone || '321 465 789'}</p>
                <p className="flex items-center gap-2 break-all"><span>✉️</span> {personal?.email || 'Linda@Smith.com'}</p>
                <p className="flex items-center gap-2"><span>📍</span> {personal?.location || 'Your address'}</p>
                <p className="flex items-center gap-2"><span>🌐</span> {extras?.linkedin || 'LindaSmith'}</p>
                <p className="flex items-center gap-2"><span>🐦</span> {extras?.portfolio || '@LindaSmith'}</p>
              </div>
            </div>

            {/* About Me */}
            <div>
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-gray-900 text-[12px]">
                About Me
              </h3>
              <p className="text-gray-700 leading-relaxed font-normal text-[10px]">
                {profile || 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.'}
              </p>
            </div>

            {/* Languages con puntos */}
            <div>
              <h3 className="font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-gray-900 text-[12px]">
                Languages
              </h3>
              <div className="space-y-2 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">ENGLISH</span>
                  <span className="tracking-widest text-gray-700">●●●●●●○</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">SPANISH</span>
                  <span className="tracking-widest text-gray-700">●●●●●●●</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">ITALIAN</span>
                  <span className="tracking-widest text-gray-700">●●●●○○○</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">FRENCH</span>
                  <span className="tracking-widest text-gray-700">●●●●●●○</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ================= PIE DE PÁGINA ================= */}
        <div className="text-right text-[9px] text-gray-400 pt-3 border-t border-gray-200">
          CVRD.DO — Extra Standard 04 Template
        </div>
      </div>
    </div>
  );
}