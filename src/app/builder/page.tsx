'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { INITIAL_CV_DATA, CVData } from '@/types/cv';
import TemplateLaura from '@/components/templates/basicos/TemplateLaura';
import { TEMPLATE_COMPONENTS } from '@/lib/templateRegistry';
import { TEMPLATES_LIST } from '@/lib/templatesData';
import { Download, CheckCircle, ArrowRight, LayoutTemplate } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function BuilderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Datos del CV
  const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
  const [activeTab, setActiveTab] = useState<number>(1);
  
  // 2. Lectura directa de la plantilla desde la URL
  const templateFromUrl = searchParams.get('template');
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>(
    templateFromUrl || 'TemplateLaura'
  );

  // 3. Detección directa del estado de pago desde la URL
  const paymentStatus = searchParams.get('payment');
  const isPaid = paymentStatus === 'success';

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(isPaid);

  // Obtener el componente de la plantilla activa de forma segura
  const ActiveTemplateComponent = TEMPLATE_COMPONENTS[selectedTemplateKey] || TemplateLaura;

  // Cálculo del precio basado en la información real de la plantilla en TEMPLATES_LIST
  const getTemplatePrice = (key: string) => {
    const foundTemplate = TEMPLATES_LIST.find((t) => t.id === key);
    if (foundTemplate) {
      if (foundTemplate.category === 'master') return '10.00';
      if (foundTemplate.category === 'premium') return '5.00';
      return '3.00';
    }
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('master') || lowerKey.includes('executivegold')) return '10.00';
    if (lowerKey.includes('premium') || lowerKey.includes('corporatearch')) return '5.00';
    return '3.00';
  };
  const currentPrice = getTemplatePrice(selectedTemplateKey);

  // Funciones de actualización genéricas para datos personales
  const handlePersonalChange = (field: string, value: unknown) => {
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  // Experiencia
  const handleExpChange = (index: number, field: string, value: string) => {
    const updated = [...cvData.experience];
    updated[index] = { ...updated[index], [field]: value };
    setCvData({ ...cvData, experience: updated });
  };
  const addExperience = () => {
    setCvData({
      ...cvData,
      experience: [
        ...cvData.experience,
        { id: Date.now().toString(), role: '', company: '', startDate: '', endDate: '', description: '' }
      ]
    });
  };
  const removeExperience = (index: number) => {
    setCvData({ ...cvData, experience: cvData.experience.filter((_, i) => i !== index) });
  };

  // Educación
  const handleEduChange = (index: number, field: string, value: string) => {
    const updated = [...cvData.education];
    updated[index] = { ...updated[index], [field]: value };
    setCvData({ ...cvData, education: updated });
  };
  const addEducation = () => {
    setCvData({
      ...cvData,
      education: [
        ...cvData.education,
        { id: Date.now().toString(), degree: '', institution: '', startDate: '', endDate: '' }
      ]
    });
  };
  const removeEducation = (index: number) => {
    setCvData({ ...cvData, education: cvData.education.filter((_, i) => i !== index) });
  };

  // Habilidades
  const handleSkillChange = (index: number, field: string, value: string) => {
    const updated = [...cvData.skills];
    updated[index] = { ...updated[index], [field]: value as 'técnica' | 'blanda' };
    setCvData({ ...cvData, skills: updated });
  };
  const addSkill = (type: 'técnica' | 'blanda') => {
    setCvData({
      ...cvData,
      skills: [...cvData.skills, { id: Date.now().toString(), name: '', type }]
    });
  };
  const removeSkill = (index: number) => {
    setCvData({ ...cvData, skills: cvData.skills.filter((_, i) => i !== index) });
  };

  // Idiomas
  const handleLangChange = (index: number, field: string, value: string) => {
    const updated = [...cvData.languages];
    updated[index] = { ...updated[index], [field]: value };
    setCvData({ ...cvData, languages: updated });
  };
  const addLanguage = () => {
    setCvData({
      ...cvData,
      languages: [...cvData.languages, { id: Date.now().toString(), name: '', level: 'Intermedio' }]
    });
  };
  const removeLanguage = (index: number) => {
    setCvData({ ...cvData, languages: cvData.languages.filter((_, i) => i !== index) });
  };

  // Referencias
  const handleRefChange = (index: number, field: string, value: string) => {
    const updated = [...cvData.references];
    updated[index] = { ...updated[index], [field]: value };
    setCvData({ ...cvData, references: updated });
  };
  const addReference = () => {
    setCvData({
      ...cvData,
      references: [
        ...cvData.references,
        { id: Date.now().toString(), name: '', company: '', position: '', phone: '', email: '' }
      ]
    });
  };
  const removeReference = (index: number) => {
    setCvData({ ...cvData, references: cvData.references.filter((_, i) => i !== index) });
  };

  // Función de impresión limpia
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-poppins">
      
      {/* BARRA SUPERIOR DE PESTAÑAS Y SELECTOR DE PLANTILLAS */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm print:hidden">
        <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4 overflow-x-auto whitespace-nowrap scrollbar-thin">
          
          <div className="flex items-center gap-2">
            {[
              { id: 1, label: "1. Datos", icon: "👤" },
              { id: 2, label: "2. Perfil", icon: "📄" },
              { id: 3, label: "3. Experiencia", icon: "💼" },
              { id: 4, label: "4. Educación", icon: "🎓" },
              { id: 5, label: "5. Habilidades", icon: "🛠️" },
              { id: 6, label: "6. Idiomas", icon: "🌐" },
              { id: 7, label: "7. Referencias", icon: "👥" },
              { id: 8, label: "8. Extras", icon: "🔗" },
              { id: 9, label: "9. Estilos", icon: "🎨" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-xs transition-all shadow-xs shrink-0 cursor-pointer h-10 ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white shadow-md scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* SELECTOR DINÁMICO DE PLANTILLAS */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 h-10">
              <LayoutTemplate className="w-4 h-4 text-gray-500" />
              <select
                value={selectedTemplateKey}
                onChange={(e) => setSelectedTemplateKey(e.target.value)}
                className="bg-transparent text-xs font-bold text-gray-900 focus:outline-none cursor-pointer"
              >
                {TEMPLATES_LIST.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.name} ({tpl.category === 'master' ? 'Master $10' : tpl.category === 'premium' ? 'Premium $5' : 'Básica $3'})
                  </option>
                ))}
              </select>
            </div>

            {/* BOTÓN DE DESCARGA */}
            <button
              onClick={() => setShowConfirmModal(true)}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer h-10"
            >
              <Download className="w-4 h-4" />
              <span>Finalizar y Descargar CV</span>
            </button>
          </div>

        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL: EDITOR (IZQ) Y VISTA PREVIA (DER) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-[1700px] mx-auto w-full print:p-0 print:block">
        
        {/* COLUMNA IZQUIERDA: FORMULARIOS */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col h-[calc(100vh-180px)] overflow-y-auto print:hidden">
          
          {/* PESTAÑA 1: DATOS Y CONTACTO */}
          {activeTab === 1 && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">01 — DATOS Y CONTACTO</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-800">Fotografía de Perfil</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cvData.personal.showPhoto}
                    onChange={(e) => handlePersonalChange('showPhoto', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-xs font-medium text-gray-800">Mostrar foto</span>
                </label>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={cvData.personal.fullName}
                  onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Título / Cargo</label>
                <input
                  type="text"
                  value={cvData.personal.title}
                  onChange={(e) => handlePersonalChange('title', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Teléfono Principal</label>
                  <input
                    type="text"
                    value={cvData.personal.phone}
                    onChange={(e) => handlePersonalChange('phone', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">2do Teléfono (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Oficina / Otro"
                    value={cvData.personal.secondaryPhone || ''}
                    onChange={(e) => handlePersonalChange('secondaryPhone', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Correo Principal</label>
                  <input
                    type="text"
                    value={cvData.personal.email}
                    onChange={(e) => handlePersonalChange('email', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">2do Correo (Opcional)</label>
                  <input
                    type="text"
                    placeholder="correo@alternativo.com"
                    value={cvData.personal.secondaryEmail || ''}
                    onChange={(e) => handlePersonalChange('secondaryEmail', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-gray-600 uppercase">Ubicación / Dirección (2 Líneas)</label>
                <input
                  type="text"
                  placeholder="Línea 1: C/ primero #36, Maquiteria"
                  value={cvData.personal.location}
                  onChange={(e) => handlePersonalChange('location', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900"
                />
                <input
                  type="text"
                  placeholder="Línea 2: Santo Domingo, Rep. Dominicana"
                  value={cvData.personal.locationLine2 || ''}
                  onChange={(e) => handlePersonalChange('locationLine2', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900"
                />
              </div>
            </div>
          )}

          {/* PESTAÑA 2: PERFIL */}
          {activeTab === 2 && (
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">02 — PERFIL PROFESIONAL</h2>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Resumen del Perfil</label>
                <textarea
                  rows={6}
                  value={cvData.profile}
                  onChange={(e) => setCvData({ ...cvData, profile: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* PESTAÑA 3: EXPERIENCIA */}
          {activeTab === 3 && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">03 — EXPERIENCIA LABORAL</h2>
                <button onClick={addExperience} className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-800 transition">
                  + Añadir Puesto
                </button>
              </div>
              {cvData.experience.map((exp, idx) => (
                <div key={exp.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-orange-600">PUESTO #{idx + 1}</span>
                    <button onClick={() => removeExperience(idx)} className="text-red-500 hover:text-red-700 text-xs font-semibold">Eliminar</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Cargo"
                      value={exp.role}
                      onChange={(e) => handleExpChange(idx, 'role', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Empresa"
                      value={exp.company}
                      onChange={(e) => handleExpChange(idx, 'company', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Año Inicio"
                      value={exp.startDate}
                      onChange={(e) => handleExpChange(idx, 'startDate', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Año Fin (o Presente)"
                      value={exp.endDate}
                      onChange={(e) => handleExpChange(idx, 'endDate', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Descripción de funciones..."
                    value={exp.description}
                    onChange={(e) => handleExpChange(idx, 'description', e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs font-semibold text-gray-900"
                  />
                </div>
              ))}
            </div>
          )}

          {/* PESTAÑA 4: EDUCACIÓN */}
          {activeTab === 4 && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">04 — EDUCACIÓN</h2>
                <button onClick={addEducation} className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-800 transition">
                  + Añadir Título
                </button>
              </div>
              {cvData.education.map((edu, idx) => (
                <div key={edu.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-orange-600">TÍTULO #{idx + 1}</span>
                    <button onClick={() => removeEducation(idx)} className="text-red-500 hover:text-red-700 text-xs font-semibold">Eliminar</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Grado / Carrera"
                      value={edu.degree}
                      onChange={(e) => handleEduChange(idx, 'degree', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Institución"
                      value={edu.institution}
                      onChange={(e) => handleEduChange(idx, 'institution', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Año Inicio"
                      value={edu.startDate}
                      onChange={(e) => handleEduChange(idx, 'startDate', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Año Fin"
                      value={edu.endDate}
                      onChange={(e) => handleEduChange(idx, 'endDate', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PESTAÑA 5: HABILIDADES */}
          {activeTab === 5 && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">05 — HABILIDADES</h2>
                <div className="flex gap-2">
                  <button onClick={() => addSkill('técnica')} className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-800 transition">
                    + Técnica
                  </button>
                  <button onClick={() => addSkill('blanda')} className="bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition">
                    + Blanda
                  </button>
                </div>
              </div>
              {cvData.skills.map((skill, idx) => (
                <div key={skill.id} className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase px-2 py-1 bg-amber-100 text-amber-800 rounded">{skill.type}</span>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(idx, 'name', e.target.value)}
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                  />
                  <button onClick={() => removeSkill(idx)} className="text-red-500 hover:text-red-700 text-xs font-semibold">🗑️</button>
                </div>
              ))}
            </div>
          )}

          {/* PESTAÑA 6: IDIOMAS */}
          {activeTab === 6 && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">06 — IDIOMAS</h2>
                <button onClick={addLanguage} className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-800 transition">
                  + Añadir Idioma
                </button>
              </div>
              {cvData.languages.map((lang, idx) => (
                <div key={lang.id} className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Idioma"
                    value={lang.name}
                    onChange={(e) => handleLangChange(idx, 'name', e.target.value)}
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                  />
                  <input
                    type="text"
                    placeholder="Nivel (Ej. Nativo)"
                    value={lang.level}
                    onChange={(e) => handleLangChange(idx, 'level', e.target.value)}
                    className="w-32 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                  />
                  <button onClick={() => removeLanguage(idx)} className="text-red-500 hover:text-red-700 text-xs font-semibold">🗑️</button>
                </div>
              ))}
            </div>
          )}

          {/* PESTAÑA 7: REFERENCIAS */}
          {activeTab === 7 && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">07 — REFERENCIAS</h2>
                <button onClick={addReference} className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-800 transition">
                  + Añadir Referencia
                </button>
              </div>
              {cvData.references.map((ref, idx) => (
                <div key={ref.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-orange-600">REFERENCIA #{idx + 1}</span>
                    <button onClick={() => removeReference(idx)} className="text-red-500 hover:text-red-700 text-xs font-semibold">Eliminar</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Nombre Completo"
                      value={ref.name}
                      onChange={(e) => handleRefChange(idx, 'name', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Empresa"
                      value={ref.company}
                      onChange={(e) => handleRefChange(idx, 'company', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Cargo / Puesto"
                      value={ref.position}
                      onChange={(e) => handleRefChange(idx, 'position', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Teléfono"
                      value={ref.phone}
                      onChange={(e) => handleRefChange(idx, 'phone', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Correo Electrónico"
                    value={ref.email}
                    onChange={(e) => handleRefChange(idx, 'email', e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                  />
                </div>
              ))}
            </div>
          )}

          {/* PESTAÑA 8: ENLACES Y EXTRAS PERSONALIZADOS */}
          {activeTab === 8 && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">08 — ENLACES Y EXTRAS</h2>
                <button
                  onClick={() => {
                    const currentLinks = cvData.extras?.customLinks || [];
                    setCvData({
                      ...cvData,
                      extras: {
                        ...cvData.extras,
                        customLinks: [...currentLinks, { label: 'LinkedIn', url: 'linkedin.com/in/', urlLine2: '' }]
                      }
                    });
                  }}
                  className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                >
                  + Añadir Enlace
                </button>
              </div>

              {cvData.extras?.customLinks && Array.isArray(cvData.extras.customLinks) && cvData.extras.customLinks.length > 0 ? (
                cvData.extras.customLinks.map((link: { label?: string; url?: string; urlLine2?: string }, idx: number) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-amber-600">ENLACE #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = (cvData.extras?.customLinks || []).filter((_: unknown, i: number) => i !== idx);
                          setCvData({ ...cvData, extras: { ...cvData.extras, customLinks: updated } });
                        }}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Etiqueta (Ej. LinkedIn, Behance)</label>
                      <input
                        type="text"
                        value={link?.label || ''}
                        onChange={(e) => {
                          const updated = [...(cvData.extras?.customLinks || [])];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          setCvData({ ...cvData, extras: { ...cvData.extras, customLinks: updated } });
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Enlace Línea 1 (Ej. linkedin.com/in/)</label>
                      <input
                        type="text"
                        value={link?.url || ''}
                        onChange={(e) => {
                          const updated = [...(cvData.extras?.customLinks || [])];
                          updated[idx] = { ...updated[idx], url: e.target.value };
                          setCvData({ ...cvData, extras: { ...cvData.extras, customLinks: updated } });
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Enlace Línea 2 (Opcional - Ej. usuario)</label>
                      <input
                        type="text"
                        value={link?.urlLine2 || ''}
                        onChange={(e) => {
                          const updated = [...(cvData.extras?.customLinks || [])];
                          updated[idx] = { ...updated[idx], urlLine2: e.target.value };
                          setCvData({ ...cvData, extras: { ...cvData.extras, customLinks: updated } });
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-400 text-xs">
                  No hay enlaces personalizados añadidos. Haz clic en &quot;+ Añadir Enlace&quot; para configurar LinkedIn, Behance, Portafolio, etc.
                </div>
              )}
            </div>
          )}

          {/* PESTAÑA 9: ESTILOS Y DISEÑO */}
          {activeTab === 9 && (
            <div className="space-y-6">
              <div className="border-b pb-3">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">09 — ESTILOS Y DISEÑO</h2>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2">Tipografías del CV</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Lato", "Inter", "Roboto", "Open Sans", "Source Sans 3", 
                    "Poppins", "Montserrat", "Manrope", "DM Sans", "Plus Jakarta Sans", 
                    "Raleway", "Urbanist", "IBM Plex Sans", "Work Sans", "Nunito Sans"
                  ].map((font) => (
                    <button
                      key={font}
                      onClick={() => setCvData({ ...cvData, styles: { ...cvData.styles, fontFamily: font } })}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all border ${
                        cvData.styles.fontFamily === font
                          ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                      }`}
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2">Forma de la Fotografía</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'circle', label: 'Circular' },
                    { id: 'square', label: 'Cuadrado' },
                    { id: 'rounded', label: 'Ovalados' }
                  ].map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => setCvData({
                        ...cvData,
                        personal: { ...cvData.personal, photoShape: shape.id as 'circle' | 'square' | 'rounded' }
                      })}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                        cvData.personal.photoShape === shape.id
                          ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {shape.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2">Color de Acento</label>
                <div className="flex gap-3 mb-3">
                  {['#FBBF24', '#3B82F6', '#10B981', '#475569', '#EF4444', '#1E293B'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setCvData({ ...cvData, styles: { ...cvData.styles, accentColor: color } })}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${cvData.styles.accentColor === color ? 'scale-110 border-black shadow-md' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  <span className="text-xs font-bold text-gray-500">HEX</span>
                  <input
                    type="text"
                    value={cvData.styles.accentColor}
                    onChange={(e) => setCvData({ ...cvData, styles: { ...cvData.styles, accentColor: e.target.value } })}
                    className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none"
                    placeholder="#FBBF24"
                  />
                  <input
                    type="color"
                    value={cvData.styles.accentColor}
                    onChange={(e) => setCvData({ ...cvData, styles: { ...cvData.styles, accentColor: e.target.value } })}
                    className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* COLUMNA DERECHA: VISTA PREVIA DEL LIENZO CON MARCA DE AGUA */}
        <div className="lg:col-span-7 flex items-center justify-center bg-gray-200/70 rounded-2xl border border-gray-300 p-6 overflow-auto print:p-0 print:m-0 print:block print:bg-white">
          <div className="shadow-2xl relative">
            
            {/* MARCA DE AGUA DE SEGURIDAD (Se muestra si no ha pagado) */}
            {!isPaid && (
              <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden">
                <div className="transform -rotate-45 text-gray-400/30 text-4xl font-black uppercase tracking-widest whitespace-nowrap select-none border-4 border-gray-400/30 px-8 py-4 rounded-3xl">
                  CVRD.DO — VISTA PREVIA NO PAGADA
                </div>
              </div>
            )}

            {/* RENDERIZADO DINÁMICO DE LA PLANTILLA SELECCIONADA */}
            <ActiveTemplateComponent data={cvData} />
          </div>
        </div>

      </div>

      {/* MODAL DE CONFIRMACIÓN PREVIA */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 print:hidden">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
              ⚠️
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-gray-900">¿Todo está correctamente bien?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Por favor, revisa que tu ortografía, teléfono y datos profesionales estén correctos en la vista previa antes de proceder con el desbloqueo y descarga de tu currículum.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Volver a revisar
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  if (isPaid) {
                    setShowSuccessModal(true);
                  } else {
                    setShowPaymentModal(true);
                  }
                }}
                className="flex-1 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sí, continuar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CON LOS BOTONES OFICIALES DE PAYPAL Y TARJETA */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 print:hidden">
          <div className="bg-[#0f0f11] text-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-gray-800 animate-in fade-in zoom-in duration-200">
            
            {/* ENCABEZADO Y PRECIO ESTIMADO */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h3 className="text-base font-black text-white">Total Estimado:</h3>
                <p className="text-xs text-gray-400">Plan: {selectedTemplateKey}</p>
              </div>
              <span className="text-xl font-black text-emerald-400">
                USD ${currentPrice}
              </span>
            </div>

            {/* BOTONES OFICIALES DE PAYPAL */}
            <div className="space-y-3 pt-2">
              <PayPalScriptProvider
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                  currency: "USD",
                  intent: "capture",
                }}
              >
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "pay",
                    height: 48,
                  }}
                  createOrder={async () => {
                    try {
                      const response = await fetch("/api/paypal/create-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ templateId: selectedTemplateKey }),
                      });
                      const data = await response.json();
                      if (data.id) return data.id;
                      throw new Error(data.error || "No se pudo crear la orden.");
                    } catch (err: unknown) {
                      const msg = err instanceof Error ? err.message : 'Error al procesar la orden';
                      alert(`Error: ${msg}`);
                      throw err;
                    }
                  }}
                  onApprove={async () => {
                    router.push(`/builder?template=${selectedTemplateKey}&payment=success`);
                  }}
                  onError={(err) => {
                    console.error("Error PayPal Buttons:", err);
                    alert("Ocurrió un error con el procesador de pagos.");
                  }}
                />
              </PayPalScriptProvider>
            </div>

            {/* PIE Y BOTÓN CANCELAR */}
            <div className="text-center pt-2 border-t border-gray-800/60">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-xs text-gray-400 hover:text-white font-semibold transition cursor-pointer"
              >
                Cancelar y volver al editor
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL DE ÉXITO DE PAGO */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 print:hidden">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-gray-900">¡Pago Confirmado con Éxito!</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tu currículum está listo y optimizado para filtros ATS. 
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 font-medium">
                🎉 ¡Muchas gracias por elegir nuestra plataforma CVRD.DO! Te deseamos el mayor de los éxitos en tu búsqueda de empleo. ¡A por ese puesto!
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  handleDownloadPDF();
                }}
                className="w-full py-3.5 bg-gray-900 hover:bg-amber-400 hover:text-gray-950 text-white font-black text-xs rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PDF Listo para Imprimir</span>
              </button>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Volver al editor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REGLAS CSS GLOBALES DE IMPRESIÓN */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .print\:hidden {
            display: none !important;
          }
          @page {
            size: letter;
            margin: 0;
          }
        }
      `}</style>

    </div>
  );
}

// Envoltorio con Suspense obligatorio en Next.js App Router para el uso de useSearchParams
export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center font-bold text-sm">Cargando editor...</div>}>
      <BuilderContent />
    </Suspense>
  );
}