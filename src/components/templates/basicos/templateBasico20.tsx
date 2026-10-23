'use client';

import React from 'react';
import { CVData } from '@/types/cv';

interface Props {
  data: CVData;
}

interface CustomLink {
  label?: string;
  url?: string;
  urlLine2?: string;
}

export default function CommercialSalesTemplate({ data }: Props) {
  const { personal, profile, experience, education, skills, languages, references, extras, styles } = data;

  const photoShapeClass = 
    personal?.photoShape === 'circle' ? 'rounded-full' :
    personal?.photoShape === 'rounded' ? 'rounded-3xl' : 'rounded-none';

  const fullNameStr = personal?.fullName || '';
  const nameParts = fullNameStr.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const accentColor = styles?.accentColor || '#1f2937';

  return (
    <div 
      className="relative bg-white shadow-2xl overflow-hidden box-border text-gray-950 flex flex-col justify-between"
      style={{
        width: '816px',
        height: '1056px',
        fontFamily: styles?.fontFamily || 'Poppins, sans-serif'
      }}
    >
      {/* ================= ENCABEZADO SUPERIOR ================= */}
      <div 
        className="w-full px-8 py-5 flex items-center justify-between text-white shrink-0 shadow-md gap-4"
        style={{ backgroundColor: accentColor, minHeight: '160px' }}
      >
        {/* Nombre imponente horizontal (10% más grande, Bold + Regular) y Título */}
        <div className="space-y-1">
          <h1 className="tracking-tight leading-none uppercase flex flex-wrap gap-x-3 items-baseline" style={{ fontSize: '38px' }}>
            <span className="font-extrabold text-white">{firstName}</span>
            <span className="font-normal text-gray-300">{lastName}</span>
          </h1>
          <p className="font-semibold uppercase tracking-widest text-amber-400 pt-1 text-[12px]">
            {personal?.title || 'DISEÑADOR GRÁFICO'}
          </p>
        </div>

        {/* Contacto central en una sola línea con iconos planos */}
        <div className="text-[12px] text-gray-200 space-y-1 border-x border-white/15 px-6 whitespace-nowrap">
          {personal?.phone && (
            <p className="flex items-center gap-2">
              <span>{personal.phone}</span>
              <span className="shrink-0 text-amber-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </span>
            </p>
          )}
          {personal?.secondaryPhone && (
            <p className="flex items-center gap-2 text-gray-400">
              <span>{personal.secondaryPhone}</span>
              <span className="shrink-0">📞</span>
            </p>
          )}
          {personal?.email && (
            <p className="flex items-center gap-2">
              <span>{personal.email}</span>
              <span className="shrink-0 text-amber-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </span>
            </p>
          )}
          {personal?.secondaryEmail && (
            <p className="flex items-center gap-2 text-gray-400">
              <span>{personal.secondaryEmail}</span>
              <span className="shrink-0">✉️</span>
            </p>
          )}
          {personal?.location && (
            <p className="flex items-center gap-2">
              <span>{personal.location}</span>
              <span className="shrink-0 text-amber-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </span>
            </p>
          )}
          {extras?.customLinks && Array.isArray(extras.customLinks) && extras.customLinks.length > 0 ? (
            (extras.customLinks as CustomLink[]).map((link, idx) => (
              <p key={idx} className="flex items-center gap-2">
                <span>{link?.label || 'Enlace'}: {link?.url}</span>
                <span className="shrink-0">🔗</span>
              </p>
            ))
          ) : (
            extras?.linkedin && (
              <p className="flex items-center gap-2">
                <span>{extras.linkedin}</span>
                <span className="shrink-0">🔗</span>
              </p>
            )
          )}
        </div>

        {/* Foto de perfil tamaño exacto 160x160px */}
        {personal?.showPhoto && (
          <div className="shrink-0">
            <div 
              className={`bg-gray-700 overflow-hidden border-2 border-white/25 flex items-center justify-center shadow-lg ${photoShapeClass}`}
              style={{ width: '130px', height: '130px' }}
            >
              {personal?.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={personal.photoUrl} alt="Perfil" className="w-full h-full object-cover object-center" />
              ) : (
                <span className="text-gray-300 font-bold text-[12px]">FOTO 160x160</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================= CUERPO CENTRAL (2 Columnas equilibradas a 12px) ================= */}
      <div className="flex-1 grid grid-cols-12 gap-6 p-8 overflow-hidden bg-white text-[12px]">
        
        {/* Columna Izquierda (Experiencia Profesional, Educación e Idiomas) */}
        <div className="col-span-7 flex flex-col space-y-5 border-r border-gray-200 pr-6">
          
          {/* Experiencia Profesional */}
          <div>
            <h3 className="font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1 mb-3 text-[12px]">
              Experiencia Profesional
            </h3>
            {experience && experience.length > 0 ? (
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[12px]">{exp.role}</h4>
                      <span className="text-gray-500 font-semibold text-[12px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="font-bold text-gray-700 text-[12px]">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[12px] text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic text-[12px]">Sin experiencia registrada.</p>
            )}
          </div>

          {/* Educación (Estilo horizontal en columna izquierda) */}
          {education && education.length > 0 && (
            <div>
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1 mb-3 text-[12px]">
                Educación
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-[12px]">{edu.degree}</h4>
                      <span className="text-gray-500 font-semibold text-[12px]">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <p className="text-gray-700 text-[12px]">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas */}
          {languages && languages.length > 0 && (
            <div>
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1 mb-2.5 text-[12px]">
                Idiomas
              </h3>
              <div className="space-y-1.5">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-gray-800 text-[12px]">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-gray-500 font-bold">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Columna Derecha (Perfil Profesional, Habilidades y Referencias) */}
        <div className="col-span-5 flex flex-col space-y-5">
          
          {/* Perfil Profesional */}
          {profile && (
            <div className="space-y-1 text-[12px]">
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1 text-[12px]">
                Perfil Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed font-normal text-[12px] text-justify">{profile}</p>
            </div>
          )}

          {/* Habilidades */}
          {skills && skills.length > 0 && (
            <div className="space-y-1.5 text-[12px]">
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1 text-[12px]">
                Habilidades
              </h3>
              <ul className="space-y-1">
                {skills.map((skill) => (
                  <li key={skill.id} className="text-gray-800 font-medium text-[12px]">
                    • {skill.name} {skill.level && <span className="text-gray-500">({skill.level})</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Referencias Personales (Visibles y completas) */}
          {references && references.length > 0 && (
            <div className="space-y-1.5 text-[12px]">
              <h3 className="font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1 text-[12px]">
                Referencias
              </h3>
              <div className="space-y-2.5">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5 text-[12px] border-l-2 border-gray-300 pl-2">
                    <p className="font-bold text-gray-900">{ref.name}</p>
                    <p className="text-gray-600">{ref.position} - {ref.company}</p>
                    <p className="text-gray-500">Tel: {ref.phone}</p>
                    {ref.email && <p className="text-gray-500">Correo: {ref.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ================= PIE DE PÁGINA ================= */}
      <div className="px-8 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-gray-400 shrink-0 text-[12px]">
        <span>CVRD.DO — Plantilla Comercial & Ventas</span>
        <span>Página 1 de 1</span>
      </div>
    </div>
  );
}