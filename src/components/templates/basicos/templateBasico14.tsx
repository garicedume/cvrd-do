import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function OperationsLeadTemplate({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const sidebarBg = '#e8e2d8'; // Tono beige/crema claro característico del diseño

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA IZQUIERDA (Franja Lateral Beige con curva/arco inferior) ================= */}
      <div 
        className="w-[300px] h-full flex flex-col justify-between p-6 shrink-0 relative border-r border-gray-200"
        style={{ backgroundColor: sidebarBg }}
      >
        <div className="flex flex-col space-y-6 pt-4">
          
          {/* Foto de perfil centrada */}
          {personal?.showPhoto && (
            <div className="flex justify-center">
              <div 
                className={`bg-white overflow-hidden border-4 border-white shadow-md flex items-center justify-center shrink-0 ${photoShapeClass}`}
                style={{ width: '110px', height: '110px' }}
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
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-3 text-center text-[12px]">
              Education
            </h3>
            <div className="space-y-3">
              {education && education.length > 0 ? (
                education.map((edu) => (
                  <div key={edu.id} className="text-center">
                    <p className="font-bold text-gray-900 text-[11px]">{edu.degree}</p>
                    <p className="text-gray-700 text-[10px]">{edu.institution}</p>
                    <p className="text-gray-600 text-[9px] font-semibold">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-[11px]">Enter Your Degree</p>
                  <p className="text-gray-700 text-[10px]">Name of university / Location</p>
                  <p className="text-gray-600 text-[9px]">2022 - 2025</p>
                </div>
              )}
            </div>
          </div>

          {/* Expertise */}
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2 text-center text-[12px]">
              Expertise
            </h3>
            <ul className="space-y-1 text-center text-gray-800 text-[11px] font-medium">
              {skills && skills.length > 0 ? (
                skills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))
              ) : (
                <>
                  <li>Active Listening</li>
                  <li>Communication</li>
                  <li>Computer Skills</li>
                  <li>Customer Service</li>
                  <li>Interpersonal Skills</li>
                  <li>Leadership</li>
                  <li>Problem-Solving</li>
                </>
              )}
            </ul>
          </div>

          {/* References */}
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2 text-center text-[12px]">
              References
            </h3>
            {references && references.length > 0 ? (
              <div className="space-y-2 text-center">
                {references.map((ref) => (
                  <div key={ref.id} className="text-[10px]">
                    <p className="font-bold text-gray-900">{ref.name}</p>
                    <p className="text-gray-700">{ref.company} | {ref.position}</p>
                    <p className="text-gray-600">T: {ref.phone}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-[10px] text-gray-800 space-y-0.5">
                <p className="font-bold">Mclarin Hamaan</p>
                <p className="text-gray-600">Company | Position</p>
                <p className="text-gray-700 mt-1">T: 123 456 7890</p>
                <p className="text-gray-700">E: info@email.com</p>
              </div>
            )}
          </div>

        </div>

        <div className="text-[9px] text-gray-500 text-center pb-2">
          CVRD.DO
        </div>
      </div>

      {/* ================= COLUMNA DERECHA (Contenido Principal) ================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 bg-white">
        
        <div className="flex flex-col space-y-6">
          
          {/* Encabezado Principal (Nombre a 53px y Contacto a la derecha) */}
          <div className="flex justify-between items-start border-b border-gray-300 pb-5">
            <div>
              <h1 className="tracking-tight leading-none flex flex-wrap gap-x-2 items-baseline" style={{ fontSize: '53px' }}>
                <span className="font-bold text-gray-900">{firstName}</span>
                <span className="font-light text-gray-700">{lastName}</span>
              </h1>
              <p className="text-xs font-bold uppercase tracking-widest mt-2 text-gray-600">
                {personal?.title || 'Creative Designer'}
              </p>
            </div>

            {/* Datos de contacto alineados a la derecha */}
            <div className="text-[11px] text-gray-700 space-y-1 text-right pt-1">
              {personal?.phone && <p>📞 {personal.phone}</p>}
              {personal?.email && <p>✉️ {personal.email}</p>}
              {personal?.location && <p>📍 {personal.location}</p>}
              {extras?.linkedin && <p>🔗 {extras.linkedin}</p>}
              {!personal?.phone && !personal?.email && (
                <>
                  <p>012 333 4444 📞</p>
                  <p>example@email.com ✉️</p>
                  <p>City, Street 123 📍</p>
                  <p>YourLinkedInId 🔗</p>
                </>
              )}
            </div>
          </div>

          {/* About Me */}
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900 text-[12px] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-400"></span> About Me
            </h3>
            <p className="text-gray-700 leading-relaxed font-normal text-[11px]">
              {profile || 'Namus nos adipis quibus doluptae nias sin estiati debilisdae perenia tivitl unt eum-qui dolore umquam sumque oditi rempore ostrum ipsum quam res, anhitatur, ipsa doluptatne, odit, corovid euelque ped ensequi omnimus rem molent iaclimbitate sus exrum rutlo que lascaer natur, primum nos ut odis.'}
            </p>
          </div>

          {/* Experience */}
          <div className="text-xs">
            <h3 className="font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3 text-gray-900 text-[12px] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-400"></span> Education & Experience
            </h3>
            
            <div className="space-y-4">
              {experience && experience.length > 0 ? (
                experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[12px]">{exp.role}</h4>
                      <span className="text-gray-500 font-semibold text-[10px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-gray-600 text-[10px] mb-1">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed text-[11px] whitespace-pre-line">{exp.description}</p>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[12px]">JOB POSITION HERE</h4>
                      <span className="text-gray-500 font-semibold text-[10px]">2015 - Present</span>
                    </div>
                    <p className="text-gray-600 text-[10px] mb-1">Company Name, Dhaka</p>
                    <p className="text-gray-700 text-[10px] leading-relaxed mb-1">
                      If you don't drive your business, you will be driven out of business. Did in nonsequia costen ericipsum ut mato te dolaptae re diciis quantitium quam quam faccab ipsaes dolorepre repudi accu sremt harum et sapitaes nillibus, si abo.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 text-[10px] space-y-0.5 pl-1">
                      <li>If you don't drive your business, you will be driven out of business.</li>
                      <li>Monsequas delibus danderum nimusici endum rem alique</li>
                      <li>Quid expla doloresit aut spiatis ut evenihit alit omnis endis.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[12px]">JOB POSITION HERE</h4>
                      <span className="text-gray-500 font-semibold text-[10px]">2016 - 2018</span>
                    </div>
                    <p className="text-gray-600 text-[10px] mb-1">Company Name, Dhaka</p>
                    <p className="text-gray-700 text-[10px] leading-relaxed mb-1">
                      If you don't drive your business, you will be driven out of business. Did in nonsequia costen ericipsum ut mato te dolaptae re diciis quantitium quam quam faccab ipsaes dolorepre repudi accu sremt harum et sapitaes nillibus, si abo.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 text-[10px] space-y-0.5 pl-1">
                      <li>If you don't drive your business, you will be driven out of business.</li>
                      <li>Monsequas delibus danderum nimusici endum rem alique</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Pie de página */}
        <div className="text-right text-[10px] text-gray-400 pt-2 border-t border-gray-200">
          CVRD.DO — Operations Lead Template
        </div>
      </div>
    </div>
  );
}