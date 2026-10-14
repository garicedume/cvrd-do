import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

export default function TemplateLaura({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  // Clases dinámicas para la forma de la foto con tamaño exacto de 156px x 156px
  const photoShapeClass = 
    personal.photoShape === 'circle' ? 'rounded-full' :
    personal.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  // Separación de nombre y apellido para aplicar Bold y Regular
  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-900"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ÁREA SEGURA CON MARGEN PERIMETRAL DE 48px (0.5 in) */}
      <div 
        className="absolute box-border flex flex-col justify-between"
        style={{
          top: '48px',
          left: '48px',
          right: '48px',
          bottom: '48px',
        }}
      >
        {/* ENCABEZADO SUPERIOR: NOMBRE HORIZONTAL (55px) + FOTO (156x156px) */}
        <div className="flex justify-between items-center border-b pb-6 mb-4">
          <div className="flex flex-col justify-center">
            <h1 className="tracking-tight leading-none flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '55px' }}>
              <span className="font-bold text-gray-900">{firstName}</span>
              <span className="font-normal text-gray-700">{lastName}</span>
            </h1>
            <p className="text-xs font-semibold uppercase tracking-widest mt-2 text-gray-600 pl-0.5">
              {personal?.title}
            </p>
          </div>
          {personal?.showPhoto && (
            <div 
              className={`bg-gray-200 overflow-hidden border-2 border-gray-200 flex items-center justify-center shadow-inner shrink-0 ${photoShapeClass}`}
              style={{ width: '156px', height: '156px' }}
            >
              {personal?.photoUrl ? (
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-500 font-bold">FOTO 156x156</span>
              )}
            </div>
          )}
        </div>

        {/* CUERPO A DOS COLUMNAS */}
        <div className="grid grid-cols-12 gap-8 flex-1">
          
          {/* COLUMNA IZQUIERDA (Contacto flexible, Habilidades, Idiomas) */}
          <div className="col-span-4 flex flex-col border-r pr-6 border-gray-200" style={{ gap: '35px' }}>
            
            {/* 1. CONTACTO Y EXTRAS FLEXIBLES */}
            <div className="text-xs">
              <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900" style={{ fontSize: '14px', borderColor: styles?.accentColor || '#111827' }}>Contacto</h3>
              
              {/* Teléfonos */}
              {personal?.phone && (
                <p className="mb-1 text-gray-700 break-all">📞 {personal.phone}</p>
              )}
              {personal?.secondaryPhone && (
                <p className="mb-1 text-gray-500 break-all">📞 {personal.secondaryPhone}</p>
              )}

              {/* Correos */}
              {personal?.email && (
                <p className="mb-1 text-gray-700 break-all">✉️ {personal.email}</p>
              )}
              {personal?.secondaryEmail && (
                <p className="mb-1 text-gray-500 break-all">✉️ {personal.secondaryEmail}</p>
              )}

              {/* Dirección en 2 líneas */}
              {personal?.location && (
                <p className="mb-1 text-gray-700">📍 {personal.location}</p>
              )}
              {personal?.locationLine2 && (
                <p className="mb-1 text-gray-500 pl-4">{personal.locationLine2}</p>
              )}

              {/* Enlaces y Extras Personalizados (LinkedIn, Behance, Portafolio, etc. con soporte a 2 líneas) */}
              {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
                extras.customLinks.map((link: any, idx: number) => (
                  <div key={idx} className="mb-1 text-gray-700 break-all">
                    <span className="font-bold text-gray-900 block">🔗 {link?.label || 'Enlace'}:</span>
                    <span className="block">{link?.url}</span>
                    {link?.urlLine2 && <span className="text-gray-500 block">{link.urlLine2}</span>}
                  </div>
                ))
              ) : (
                <>
                  {extras?.linkedin && <p className="mb-1 text-gray-700 break-all">🔗 {extras.linkedin}</p>}
                  {extras?.portfolio && <p className="mb-1 text-gray-700 break-all">🌐 {extras.portfolio}</p>}
                </>
              )}
            </div>

            {/* 2. HABILIDADES */}
            {skills && skills.length > 0 && (
              <div className="text-xs">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900" style={{ fontSize: '14px', borderColor: styles?.accentColor || '#111827' }}>Habilidades</h3>
                <ul className="flex flex-col gap-1.5">
                  {skills.map((skill) => (
                    <li key={skill.id} className="text-gray-800 font-medium">• {skill.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3. IDIOMAS */}
            {languages && languages.length > 0 && (
              <div className="text-xs">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900" style={{ fontSize: '14px', borderColor: styles?.accentColor || '#111827' }}>Idiomas</h3>
                <ul className="flex flex-col gap-1.5">
                  {languages.map((lang) => (
                    <li key={lang.id} className="text-gray-800 font-medium flex justify-between">
                      <span>{lang.name}</span>
                      <span className="text-gray-500">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA (Perfil -> Educación -> Experiencia -> Referencias) */}
          <div className="col-span-8 flex flex-col text-xs" style={{ gap: '20px' }}>
            
            {/* 4. PERFIL PROFESIONAL */}
            {profile && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-1.5 text-gray-900" style={{ fontSize: '14px', borderColor: styles?.accentColor || '#111827' }}>Perfil Profesional</h3>
                <p className="text-gray-700 leading-relaxed font-normal">{profile}</p>
              </div>
            )}

            {/* 5. EDUCACIÓN */}
            {education && education.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-1.5 text-gray-900" style={{ fontSize: '14px', borderColor: styles?.accentColor || '#111827' }}>Educación</h3>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="font-bold text-gray-900">{edu.degree}</p>
                      <p className="text-gray-600">{edu.institution} <span className="text-gray-400">({edu.startDate} - {edu.endDate})</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. EXPERIENCIA */}
            {experience && experience.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-1.5 text-gray-900" style={{ fontSize: '14px', borderColor: styles?.accentColor || '#111827' }}>Experiencia</h3>
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-gray-900 text-sm">{exp.role}</h4>
                        <span className="text-gray-500 font-semibold">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="font-bold mb-0.5" style={{ color: styles?.accentColor || '#111827' }}>{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. REFERENCIAS */}
            {references && references.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-1.5 text-gray-900" style={{ fontSize: '14px', borderColor: styles?.accentColor || '#111827' }}>Referencias</h3>
                <div className="grid grid-cols-2 gap-4">
                  {references.map((ref) => (
                    <div key={ref.id}>
                      <p className="font-bold text-gray-900">{ref.name}</p>
                      <p className="text-gray-600">{ref.position} - {ref.company}</p>
                      <p className="text-gray-500">{ref.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* PIE DE PÁGINA */}
        <div className="text-right text-[10px] text-gray-400 pt-2 border-t">
          CVRD.DO — Plantilla Profesional
        </div>

      </div>
    </div>
  );
}