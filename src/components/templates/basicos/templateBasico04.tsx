import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateTechFocused({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const darkBg = '#1a1a1a'; // Fondo negro elegante de la barra inferior izquierda

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900 flex"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= COLUMNA IZQUIERDA (Barra Lateral) ================= */}
      <div className="w-[280px] h-full flex flex-col shrink-0 relative border-r border-gray-200">
        
        {/* Parte Superior (Fondo Blanco) */}
        <div className="p-6 bg-white flex flex-col items-center text-center border-b border-gray-200">
          {personal?.showPhoto && (
            <div 
              className={`bg-gray-100 overflow-hidden border border-gray-300 shadow-sm flex items-center justify-center shrink-0 mb-4 ${photoShapeClass}`}
              style={{ width: '130px', height: '130px' }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-400 font-bold">FOTO</span>
              )}
            </div>
          )}

          <h1 className="tracking-tight leading-none uppercase font-black text-gray-900 text-left w-full" style={{ fontSize: '32px' }}>
            <span>{firstName}</span>
            <br />
            <span className="text-gray-800">{lastName}</span>
          </h1>
          <div className="w-full h-0.5 bg-gray-900 my-2"></div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600 text-left w-full">
            {personal?.title || 'UI DESIGNER'}
          </p>
        </div>

        {/* Parte Inferior (Fondo Negro / Oscuro) */}
        <div 
          className="flex-1 p-6 flex flex-col justify-between text-white"
          style={{ backgroundColor: darkBg }}
        >
          <div className="space-y-6">
            
            {/* Profile */}
            <div>
              <h3 className="font-bold uppercase tracking-wider text-[12px] border-b border-gray-700 pb-1 mb-2 text-white">
                Profile
              </h3>
              <p className="text-gray-300 leading-relaxed text-[10px]">
                {profile || 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took.'}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold uppercase tracking-wider text-[12px] border-b border-gray-700 pb-1 mb-2 text-white">
                Contact
              </h3>
              <div className="space-y-2 text-[10px] text-gray-300">
                <div>
                  <span className="font-bold text-gray-400 block">Phone :</span>
                  <span>{personal?.phone || '+0000 1234 5678'}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-400 block">Email :</span>
                  <span className="break-all">{personal?.email || 'info@youremail.com'}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-400 block">Address :</span>
                  <span>{personal?.location || '123, Street Name, Unit Number, New York City, NY 567'}</span>
                </div>
              </div>
            </div>

          </div>

          <div className="text-[9px] text-gray-500 text-center pt-4">
            CVRD.DO
          </div>
        </div>

      </div>

      {/* ================= COLUMNA DERECHA (Contenido Principal) ================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-8 bg-white">
        
        <div className="flex flex-col space-y-6">
          
          {/* Experience */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-4 text-[13px]">
              Experience
            </h3>
            
            <div className="space-y-4">
              {experience && experience.length > 0 ? (
                experience.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-12 gap-2 text-xs">
                    <div className="col-span-4 text-gray-500 text-[10px]">
                      <p className="font-semibold">{exp.company}</p>
                      <p>{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <div className="col-span-8">
                      <h4 className="font-bold text-gray-900 text-[11px]">{exp.role}</h4>
                      <p className="text-gray-600 text-[10px] mt-0.5">{exp.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="grid grid-cols-12 gap-2 text-xs">
                    <div className="col-span-4 text-gray-500 text-[10px]">
                      <p className="font-semibold">Company Name</p>
                      <p>Location</p>
                    </div>
                    <div className="col-span-8">
                      <h4 className="font-bold text-gray-900 text-[11px]">Enter Your Job Position</h4>
                      <p className="text-gray-500 text-[9.5px]">From 2020 - Present</p>
                      <p className="text-gray-600 text-[10px] mt-0.5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-2 text-xs">
                    <div className="col-span-4 text-gray-500 text-[10px]">
                      <p className="font-semibold">Company Name</p>
                      <p>Location</p>
                    </div>
                    <div className="col-span-8">
                      <h4 className="font-bold text-gray-900 text-[11px]">Enter Your Job Position</h4>
                      <p className="text-gray-500 text-[9.5px]">From 2018 - 2020</p>
                      <p className="text-gray-600 text-[10px] mt-0.5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-2 text-xs">
                    <div className="col-span-4 text-gray-500 text-[10px]">
                      <p className="font-semibold">Company Name</p>
                      <p>Location</p>
                    </div>
                    <div className="col-span-8">
                      <h4 className="font-bold text-gray-900 text-[11px]">Enter Your Job Position</h4>
                      <p className="text-gray-500 text-[9.5px]">From 2016 - 2018</p>
                      <p className="text-gray-600 text-[10px] mt-0.5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-3 text-[13px]">
              Skills
            </h3>
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-12 items-center">
                <span className="col-span-4 text-gray-700 font-medium">Adobe Photoshop</span>
                <div className="col-span-8 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-gray-900 h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="grid grid-cols-12 items-center">
                <span className="col-span-4 text-gray-700 font-medium">Adobe Illustrator</span>
                <div className="col-span-8 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-gray-900 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="grid grid-cols-12 items-center">
                <span className="col-span-4 text-gray-700 font-medium">Adobe InDesign</span>
                <div className="col-span-8 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-gray-900 h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="grid grid-cols-12 items-center">
                <span className="col-span-4 text-gray-700 font-medium">Adobe XD</span>
                <div className="col-span-8 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-gray-900 h-full rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Reference */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-3 text-[13px]">
              Reference
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              {references && references.length > 0 ? (
                references.map((ref) => (
                  <div key={ref.id}>
                    <p className="font-bold text-gray-900">{ref.name}</p>
                    <p className="text-gray-500 text-[9.5px]">{ref.company} / {ref.position}</p>
                    <p className="text-gray-700 text-[10px]">P : {ref.phone}</p>
                    <p className="text-gray-700 text-[10px]">E : {ref.email || 'info@mailaddress.com'}</p>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <p className="font-bold text-gray-900">Micheal Smith</p>
                    <p className="text-gray-500 text-[9.5px]">Company Name / Location</p>
                    <p className="text-gray-700 text-[10px]">P : +0000 1234 5678</p>
                    <p className="text-gray-700 text-[10px]">E : info@mailaddress.com</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Jonathon Doe</p>
                    <p className="text-gray-500 text-[9.5px]">Company Name / Location</p>
                    <p className="text-gray-700 text-[10px]">P : +0000 1234 5678</p>
                    <p className="text-gray-700 text-[10px]">E : info@mailaddress.com</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Hobbies */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2 text-[13px]">
              Hobbies
            </h3>
            <div className="flex gap-8 text-xs text-gray-700 font-medium pt-1">
              <span>• Music</span>
              <span>• Sports</span>
              <span>• Travel</span>
              <span>• Writing</span>
            </div>
          </div>

        </div>

        {/* Pie de página */}
        <div className="text-right text-[9px] text-gray-400 pt-2 border-t border-gray-100">
          CVRD.DO — Template Tech Focused
        </div>
      </div>
    </div>
  );
}