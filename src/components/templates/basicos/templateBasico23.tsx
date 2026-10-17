import React from 'react';
import { CVData } from '../../../types/cv';

interface TemplateProps {
  data: CVData;
}

export default function TemplateFinanceStrict({ data }: TemplateProps) {
  const { personal, profile, experience, education, skills, styles } = data;
  const accentColor = styles?.accentColor || '#EAB308'; // Color amarillo/dorado de la muestra por defecto

  return (
    <div className="bg-white text-gray-900 w-full max-w-[210mm] min-h-[297mm] mx-auto p-8 sm:p-12 font-sans shadow-lg print:shadow-none select-none">
      
      {/* FRANJA SUPERIOR DECORATIVA */}
      <div className="w-12 h-2 mb-6" style={{ backgroundColor: accentColor }} />

      {/* CABECERA: FOTO + NOMBRE Y TÍTULO */}
      <header className="grid grid-cols-12 gap-8 items-center pb-8 border-b border-gray-200">
        {/* FOTO DE PERFIL */}
        <div className="col-span-4 flex justify-center">
          {personal?.showPhoto && personal?.photoUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={personal.photoUrl} 
              alt={personal?.fullName || 'Foto de perfil'} 
              className="w-32 h-32 object-cover rounded-full shadow-md border-2 border-gray-100"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-xs">
              Sin Foto
            </div>
          )}
        </div>

        {/* NOMBRE Y PUESTO */}
        <div className="col-span-8 space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900 leading-none">
            {personal?.fullName?.split(' ')[0] || 'DAVID'}
            <span className="block text-gray-700 mt-1">
              {personal?.fullName?.split(' ').slice(1).join(' ') || 'ANDERSON'}
            </span>
          </h1>
          <div className="inline-block px-4 py-1 text-xs font-black uppercase tracking-widest text-gray-950 shadow-xs" style={{ backgroundColor: accentColor }}>
            {personal?.title || 'UX DESIGNER'}
          </div>
        </div>
      </header>

      {/* CUERPO PRINCIPAL EN DOS COLUMNAS */}
      <div className="grid grid-cols-12 gap-8 pt-8">
        
        {/* COLUMNA IZQUIERDA (Education & Contact) */}
        <div className="col-span-4 space-y-8 border-r border-gray-200 pr-6">
          
          {/* EDUCATION */}
          <section className="space-y-4">
            <h2 className="text-sm font-black tracking-widest uppercase text-gray-900">
              Education
            </h2>
            <div className="w-8 h-0.5" style={{ backgroundColor: accentColor }} />
            
            <div className="space-y-4 text-xs">
              {education && education.length > 0 ? (
                education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <span className="text-gray-500 font-semibold">{edu.startDate} – {edu.endDate}</span>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                ))
              ) : (
                <div className="space-y-0.5">
                  <span className="text-gray-500 font-semibold">2014 – 2018</span>
                  <h3 className="font-bold text-gray-900">Degree Name</h3>
                  <p className="text-gray-600">University name here</p>
                </div>
              )}
            </div>
          </section>

          {/* CONTACT */}
          <section className="space-y-4">
            <h2 className="text-sm font-black tracking-widest uppercase text-gray-900">
              Contact
            </h2>
            <div className="w-8 h-0.5" style={{ backgroundColor: accentColor }} />
            
            <div className="space-y-3 text-xs text-gray-700">
              {personal?.phone && (
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Phone</p>
                  <p className="font-medium">{personal.phone}</p>
                </div>
              )}
              {personal?.email && (
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Email</p>
                  <p className="font-medium break-all">{personal.email}</p>
                </div>
              )}
              {personal?.location && (
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Address</p>
                  <p className="font-medium">{personal.location}</p>
                </div>
              )}
            </div>
          </section>

        </div>

        {/* COLUMNA DERECHA (Profile, Experience & Skills) */}
        <div className="col-span-8 space-y-8 pl-2">
          
          {/* PROFILE */}
          {profile && (
            <section className="space-y-3">
              <h2 className="text-sm font-black tracking-widest uppercase text-gray-900">
                Profile
              </h2>
              <div className="w-8 h-0.5" style={{ backgroundColor: accentColor }} />
              <p className="text-xs text-gray-600 leading-relaxed text-justify">
                {profile}
              </p>
            </section>
          )}

          {/* EXPERIENCE */}
          <section className="space-y-4">
            <h2 className="text-sm font-black tracking-widest uppercase text-gray-900">
              Experience
            </h2>
            <div className="w-8 h-0.5" style={{ backgroundColor: accentColor }} />
            
            <div className="space-y-5">
              {experience && experience.length > 0 ? (
                experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="text-[11px] font-bold text-gray-500">{exp.startDate} – {exp.endDate}</div>
                    <h3 className="text-xs font-bold text-gray-900">{exp.role}</h3>
                    <div className="text-[11px] font-semibold text-gray-700">{exp.company}</div>
                    {exp.description && (
                      <p className="text-[11px] text-gray-600 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-gray-500">2020 – Present</div>
                  <h3 className="text-xs font-bold text-gray-900">Senior UX Designer</h3>
                  <div className="text-[11px] font-semibold text-gray-700">Company Name</div>
                  <p className="text-[11px] text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SKILLS */}
          <section className="space-y-4">
            <h2 className="text-sm font-black tracking-widest uppercase text-gray-900">
              Skills
            </h2>
            <div className="w-8 h-0.5" style={{ backgroundColor: accentColor }} />
            
            <div className="grid grid-cols-2 gap-4">
              {skills && skills.length > 0 ? (
                skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-800">{skill.name}</span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                      <span className="w-2 h-2 rounded-full bg-gray-200" />
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-800">Photoshop</span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                      <span className="w-2 h-2 rounded-full bg-gray-200" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-800">Illustrator</span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                      <span className="w-2 h-2 rounded-full bg-gray-200" />
                      <span className="w-2 h-2 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

        </div>

      </div>

      {/* FRANJA INFERIOR DECORATIVA */}
      <div className="w-4 h-2 mt-8 mx-auto" style={{ backgroundColor: accentColor }} />

    </div>
  );
}