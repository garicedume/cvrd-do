'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { INITIAL_CV_DATA, CVData } from '@/types/cv';
import { TEMPLATE_COMPONENTS } from '@/lib/templateRegistry';
import { TEMPLATES_LIST } from '@/lib/templatesData';
import { Download, CheckCircle, ArrowRight, LayoutTemplate, Upload, Trash2, ShieldCheck, Eye, Edit3, X, ChevronDown, Check } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import dynamic from 'next/dynamic';
import { CVDocument } from '@/components/pdf/CVDocument';

const PDFDownloadButton = dynamic(
  () => import('@react-pdf/renderer').then((mod) => {
    const { PDFDownloadLink } = mod;
    return function PdfLinkWrapper({ cvData }: { cvData: CVData }) {
      return (
        <PDFDownloadLink
          document={<CVDocument data={cvData} />}
          fileName={`CV_${cvData.personal.fullName || 'Curriculum'}.pdf`}
          className="w-full py-3.5 bg-gray-900 hover:bg-amber-400 hover:text-gray-950 text-white font-black text-xs rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          {({ loading }) => (
            <>
              <Download className="w-4 h-4" />
              <span>{loading ? 'Generando PDF vectorial...' : 'Descargar PDF Profesional (Vectorial HD)'}</span>
            </>
          )}
        </PDFDownloadLink>
      );
    };
  }),
  { ssr: false }
);

const subscribe = () => () => {};
const useIsClient = () => useSyncExternalStore(subscribe, () => true, () => false);

function BuilderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isClient = useIsClient();

  const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
  const loadedRef = useRef<boolean>(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    try {
      const savedData = localStorage.getItem('cvrd_saved_cv_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        queueMicrotask(() => setCvData(parsed));
      }
    } catch (e) {
      console.error('Error al cargar datos guardados:', e);
    }
  }, []);

  const [activeTab, setActiveTab] = useState<number>(1);
  const [mobileViewMode, setMobileViewMode] = useState<'editor' | 'preview'>('editor');
  const [photoError, setPhotoError] = useState<string | null>(null);

  const [promoInput, setPromoInput] = useState<string>('');
  const [promoError, setPromoError] = useState<string | null>(null);

  const templateFromUrl = searchParams.get('template');
  const selectedTemplateKey = templateFromUrl || 'TemplateLaura';

  const paymentStatus = searchParams.get('payment');
  const unlockedStatus = searchParams.get('unlocked');
  const isPaid = paymentStatus === 'success' || unlockedStatus === 'true';

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(isPaid);

  // ESTADOS PARA EL SELECTOR / FILTRO DE PLANTILLAS ORDENADO
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState<boolean>(false);
  const [templateFilterCategory, setTemplateFilterCategory] = useState<string>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar desplegable al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTemplateDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!loadedRef.current) return;
    try {
      localStorage.setItem('cvrd_saved_cv_data', JSON.stringify(cvData));
    } catch (e) {
      console.error('Error al guardar datos automáticamente:', e);
    }
  }, [cvData]);

  const ActiveTemplateComponent = TEMPLATE_COMPONENTS[selectedTemplateKey] || TEMPLATE_COMPONENTS['basico-01'] || Object.values(TEMPLATE_COMPONENTS)[0];

  const getTemplatePrice = (key: string) => {
    const foundTemplate = TEMPLATES_LIST.find((t) => t.id === key);
    if (foundTemplate) {
      if (foundTemplate.category === 'master') return '10.00';
      if (foundTemplate.category === 'premium') return '5.00';
      return '3.00';
    }
    return '3.00';
  };
  const currentPrice = getTemplatePrice(selectedTemplateKey);

  const currentSelectedTemplateObj = TEMPLATES_LIST.find((t) => t.id === selectedTemplateKey);

  // FILTRADO INTELIGENTE Y FLEXIBLE DE PLANTILLAS
  const filteredTemplates = TEMPLATES_LIST.filter((tpl) => {
    if (templateFilterCategory === 'all') return true;
    
    const cat = (tpl.category || '').toLowerCase();
    
    if (templateFilterCategory === 'basico') {
      return cat.includes('basic') || cat.includes('basico') || cat === 'free' || (!cat.includes('premium') && !cat.includes('master'));
    }
    if (templateFilterCategory === 'premium') {
      return cat.includes('premium') || cat.includes('pro');
    }
    if (templateFilterCategory === 'master') {
      return cat.includes('master') || cat.includes('executive') || cat.includes('ultimate');
    }
    return true;
  });

  const handleApplyPromoCode = async () => {
    try {
      const response = await fetch('/api/verify-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoInput }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPromoError(null);
        setShowPaymentModal(false);
        setShowSuccessModal(true);
        router.replace(`/builder?template=${selectedTemplateKey}&unlocked=true`, { scroll: false });
      } else {
        setPromoError('Código promocional no válido.');
      }
    } catch (err) {
      console.error('Error al validar código:', err);
      setPromoError('Ocurrió un error al validar el código.');
    }
  };

  const handlePersonalChange = (field: string, value: unknown) => {
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPhotoError(null);

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError('La imagen es demasiado pesada. El tamaño máximo permitido es 2 MB.');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setPhotoError('Formato no válido. Utiliza JPG, PNG, WEBP o GIF.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handlePersonalChange('photoUrl', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    handlePersonalChange('photoUrl', '');
    setPhotoError(null);
  };

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

  const tabsList = [
    { id: 1, label: "1. Datos", icon: "👤" },
    { id: 2, label: "2. Perfil", icon: "📄" },
    { id: 3, label: "3. Experiencia", icon: "💼" },
    { id: 4, label: "4. Educación", icon: "🎓" },
    { id: 5, label: "5. Habilidades", icon: "🛠️" },
    { id: 6, label: "6. Idiomas", icon: "🌐" },
    { id: 7, label: "7. Referencias", icon: "👥" },
    { id: 8, label: "8. Extras", icon: "🔗" },
    { id: 9, label: "9. Estilos", icon: "🎨" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-poppins pb-20 lg:pb-0">
      
      {/* BARRA SUPERIOR DE PESTAÑAS Y SELECTOR DE PLANTILLAS */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 shadow-sm print:hidden">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Pestañas con scroll horizontal fluido en móvil */}
          <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-thin pb-2 md:pb-0">
            {tabsList.map((tab) => (
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

          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 shrink-0">
            
            {/* SELECTOR / FILTRO DE PLANTILLAS ORGANIZADO */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsTemplateDropdownOpen(!isTemplateDropdownOpen)}
                className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 h-10 transition cursor-pointer text-xs font-bold text-gray-900 shadow-xs"
              >
                <LayoutTemplate className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate max-w-55">
                  {currentSelectedTemplateObj ? currentSelectedTemplateObj.name : 'Seleccionar Plantilla'} 
                  <span className="text-gray-500 font-medium ml-1">
                    ({currentSelectedTemplateObj?.category === 'master' ? '$10' : currentSelectedTemplateObj?.category === 'premium' ? '$5' : '$3'})
                  </span>
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isTemplateDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isTemplateDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  
                  {/* Encabezado y Filtros por Categoría / Modo */}
                  <div className="p-3 bg-gray-50 border-b border-gray-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase text-gray-700 tracking-wider">Elegir Plantilla</span>
                      <span className="text-[10px] text-gray-500 font-semibold">{TEMPLATES_LIST.length} disponibles</span>
                    </div>

                    <div className="grid grid-cols-4 gap-1 bg-gray-200/80 p-1 rounded-xl">
                      {[
                        { id: 'all', label: 'Todas' },
                        { id: 'basico', label: 'Básico ($3)' },
                        { id: 'premium', label: 'Premium ($5)' },
                        { id: 'master', label: 'Master ($10)' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setTemplateFilterCategory(cat.id)}
                          className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer text-center truncate px-1 ${
                            templateFilterCategory === cat.id
                              ? 'bg-gray-900 text-white shadow-sm'
                              : 'text-gray-700 hover:bg-white/60'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lista con scroll de plantillas filtradas */}
                  <div className="max-h-72 overflow-y-auto p-2 space-y-1 scrollbar-thin">
                    {filteredTemplates.length > 0 ? (
                      filteredTemplates.map((tpl) => {
                        const isSelected = selectedTemplateKey === tpl.id;
                        const priceTag = tpl.category === 'master' ? '$10' : tpl.category === 'premium' ? '$5' : '$3';
                        const badgeColor = tpl.category === 'master' ? 'bg-purple-100 text-purple-800' : tpl.category === 'premium' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800';

                        return (
                          <button
                            key={tpl.id}
                            onClick={() => {
                              router.replace(`/builder?template=${tpl.id}`, { scroll: false });
                              setIsTemplateDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500/10 border border-amber-500/40 text-gray-900 font-bold'
                                : 'hover:bg-gray-50 text-gray-800 font-medium border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shrink-0 ${badgeColor}`}>
                                {tpl.category}
                              </span>
                              <span className="text-xs truncate">{tpl.name}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-black text-gray-900">{priceTag}</span>
                              {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <div className="text-center py-6 text-xs text-gray-400 font-medium">
                        No hay plantillas en esta categoría.
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>

            {/* BOTÓN DE DESCARGA */}
            <button
              onClick={() => setShowConfirmModal(true)}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer h-10"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Finalizar y Descargar CV</span>
              <span className="sm:hidden">Descargar</span>
            </button>
          </div>

        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL: EDITOR (IZQ) Y VISTA PREVIA (DER) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 max-w-[1700px] mx-auto w-full print:p-0 print:block">
        
        {/* COLUMNA IZQUIERDA: FORMULARIOS */}
        <div className={`lg:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 flex flex-col lg:h-[calc(100vh-180px)] overflow-y-auto print:hidden ${mobileViewMode === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          
          {activeTab === 1 && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">01 — DATOS Y CONTACTO</h2>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">Fotografía de Perfil</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cvData.personal.showPhoto ?? true}
                      onChange={(e) => handlePersonalChange('showPhoto', e.target.checked)}
                      className="w-4 h-4 text-amber-500 rounded border-gray-300 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-gray-700">Mostrar foto en CV</span>
                  </label>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-dashed border-gray-300 hover:border-amber-500 rounded-xl cursor-pointer text-xs font-bold text-gray-700 transition">
                      <Upload className="w-4 h-4 text-amber-500" />
                      <span>{cvData.personal.photoUrl ? 'Cambiar Imagen (Máx. 2MB)' : 'Subir Imagen (Máx. 2MB)'}</span>
                      <input 
                        type="file" 
                        accept=".jpg, .jpeg, .png, .webp, .gif" 
                        onChange={handlePhotoUpload} 
                        className="hidden" 
                      />
                    </label>
                    {cvData.personal.photoUrl && (
                      <button
                        onClick={removePhoto}
                        className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition cursor-pointer"
                        title="Eliminar foto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500">
                    Formatos: JPG, PNG, WEBP, GIF. Máximo: 2 MB.
                  </p>
                  {photoError && (
                    <div className="p-2 bg-red-50 border border-red-200 text-red-600 text-[11px] font-semibold rounded-xl">
                      {photoError}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={cvData.personal.fullName}
                  onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base lg:text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Título / Cargo</label>
                <input
                  type="text"
                  value={cvData.personal.title}
                  onChange={(e) => handlePersonalChange('title', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base lg:text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Teléfono Principal</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={cvData.personal.phone}
                    onChange={(e) => handlePersonalChange('phone', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 lg:py-2 text-base lg:text-xs font-semibold text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">2do Teléfono (Opcional)</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    placeholder="Oficina / Otro"
                    value={cvData.personal.secondaryPhone || ''}
                    onChange={(e) => handlePersonalChange('secondaryPhone', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 lg:py-2 text-base lg:text-xs font-semibold text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Correo Principal</label>
                  <input
                    type="email"
                    value={cvData.personal.email}
                    onChange={(e) => handlePersonalChange('email', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 lg:py-2 text-base lg:text-xs font-semibold text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">2do Correo (Opcional)</label>
                  <input
                    type="email"
                    placeholder="correo@alternativo.com"
                    value={cvData.personal.secondaryEmail || ''}
                    onChange={(e) => handlePersonalChange('secondaryEmail', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 lg:py-2 text-base lg:text-xs font-semibold text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-gray-600 uppercase">Ubicación / Dirección</label>
                <input
                  type="text"
                  placeholder="Línea 1: C/ primero #36"
                  value={cvData.personal.location}
                  onChange={(e) => handlePersonalChange('location', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 lg:py-2 text-base lg:text-xs font-semibold text-gray-900"
                />
                <input
                  type="text"
                  placeholder="Línea 2: Santo Domingo, Rep. Dominicana"
                  value={cvData.personal.locationLine2 || ''}
                  onChange={(e) => handlePersonalChange('locationLine2', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 lg:py-2 text-base lg:text-xs font-semibold text-gray-900"
                />
              </div>
            </div>
          )}

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
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-base lg:text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">03 — EXPERIENCIA LABORAL</h2>
                <button onClick={addExperience} className="bg-gray-900 text-white text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-gray-800 transition cursor-pointer">
                  + Añadir Puesto
                </button>
              </div>
              {cvData.experience.map((exp, idx) => (
                <div key={exp.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-600">PUESTO #{idx + 1}</span>
                    <button onClick={() => removeExperience(idx)} className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer">Eliminar</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Cargo"
                      value={exp.role}
                      onChange={(e) => handleExpChange(idx, 'role', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Empresa"
                      value={exp.company}
                      onChange={(e) => handleExpChange(idx, 'company', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Año Inicio"
                      value={exp.startDate}
                      onChange={(e) => handleExpChange(idx, 'startDate', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Año Fin"
                      value={exp.endDate}
                      onChange={(e) => handleExpChange(idx, 'endDate', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Descripción..."
                    value={exp.description}
                    onChange={(e) => handleExpChange(idx, 'description', e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm lg:text-xs font-semibold text-gray-900"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 4 && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">04 — EDUCACIÓN</h2>
                <button onClick={addEducation} className="bg-gray-900 text-white text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-gray-800 transition cursor-pointer">
                  + Añadir Título
                </button>
              </div>
              {cvData.education.map((edu, idx) => (
                <div key={edu.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-600">TÍTULO #{idx + 1}</span>
                    <button onClick={() => removeEducation(idx)} className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer">Eliminar</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Grado / Carrera"
                      value={edu.degree}
                      onChange={(e) => handleEduChange(idx, 'degree', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Institución"
                      value={edu.institution}
                      onChange={(e) => handleEduChange(idx, 'institution', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Año Inicio"
                      value={edu.startDate}
                      onChange={(e) => handleEduChange(idx, 'startDate', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Año Fin"
                      value={edu.endDate}
                      onChange={(e) => handleEduChange(idx, 'endDate', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 5 && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">05 — HABILIDADES</h2>
                <div className="flex gap-2">
                  <button onClick={() => addSkill('técnica')} className="bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-gray-800 transition cursor-pointer">
                    + Técnica
                  </button>
                  <button onClick={() => addSkill('blanda')} className="bg-amber-500 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-amber-600 transition cursor-pointer">
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
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                  />
                  <button onClick={() => removeSkill(idx)} className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer">🗑️</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 6 && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">06 — IDIOMAS</h2>
                <button onClick={addLanguage} className="bg-gray-900 text-white text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-gray-800 transition cursor-pointer">
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
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                  />
                  <input
                    type="text"
                    placeholder="Nivel"
                    value={lang.level}
                    onChange={(e) => handleLangChange(idx, 'level', e.target.value)}
                    className="w-28 sm:w-32 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                  />
                  <button onClick={() => removeLanguage(idx)} className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer">🗑️</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 7 && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm tracking-wide">07 — REFERENCIAS</h2>
                <button onClick={addReference} className="bg-gray-900 text-white text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-gray-800 transition cursor-pointer">
                  + Añadir Referencia
                </button>
              </div>
              {cvData.references.map((ref, idx) => (
                <div key={ref.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-600">REFERENCIA #{idx + 1}</span>
                    <button onClick={() => removeReference(idx)} className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer">Eliminar</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={ref.name}
                      onChange={(e) => handleRefChange(idx, 'name', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Empresa"
                      value={ref.company}
                      onChange={(e) => handleRefChange(idx, 'company', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Cargo"
                      value={ref.position}
                      onChange={(e) => handleRefChange(idx, 'position', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                    />
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="Teléfono"
                      value={ref.phone}
                      onChange={(e) => handleRefChange(idx, 'phone', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Correo"
                    value={ref.email}
                    onChange={(e) => handleRefChange(idx, 'email', e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                  />
                </div>
              ))}
            </div>
          )}

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
                  className="bg-gray-900 text-white text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-gray-800 transition cursor-pointer"
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
                      <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Etiqueta</label>
                      <input
                        type="text"
                        value={link?.label || ''}
                        onChange={(e) => {
                          const updated = [...(cvData.extras?.customLinks || [])];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          setCvData({ ...cvData, extras: { ...cvData.extras, customLinks: updated } });
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Enlace</label>
                      <input
                        type="text"
                        value={link?.url || ''}
                        onChange={(e) => {
                          const updated = [...(cvData.extras?.customLinks || [])];
                          updated[idx] = { ...updated[idx], url: e.target.value };
                          setCvData({ ...cvData, extras: { ...cvData.extras, customLinks: updated } });
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm lg:text-xs font-semibold text-gray-900"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-400 text-xs">
                  No hay enlaces añadidos.
                </div>
              )}
            </div>
          )}

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
                    "Raleway", "Urbanist", "IBM Plex Sans", "Work Sans", "Nunito Sans", "Times New Roman"
                  ].map((font) => (
                    <button
                      key={font}
                      onClick={() => setCvData({ ...cvData, styles: { ...cvData.styles, fontFamily: font } })}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border cursor-pointer ${
                        cvData.styles.fontFamily === font
                          ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                      }`}
                      style={{ fontFamily: font === 'Times New Roman' ? 'Times New Roman, serif' : font }}
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
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
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
                <div className="flex gap-3 mb-3 flex-wrap">
                  {['#FBBF24', '#3B82F6', '#10B981', '#475569', '#EF4444', '#1E293B'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setCvData({ ...cvData, styles: { ...cvData.styles, accentColor: color } })}
                      className={`w-9 h-9 rounded-full border-2 transition-transform cursor-pointer ${cvData.styles.accentColor === color ? 'scale-110 border-black shadow-md' : 'border-transparent'}`}
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
                    className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* COLUMNA DERECHA: VISTA PREVIA DEL LIENZO */}
        <div className={`lg:col-span-7 items-center justify-center bg-gray-200/70 rounded-2xl border border-gray-300 p-6 overflow-auto print:p-0 print:m-0 print:block print:bg-white ${mobileViewMode === 'preview' ? 'flex fixed inset-0 z-40 bg-gray-900/90 rounded-none p-4' : 'hidden lg:flex'}`}>
          
          {mobileViewMode === 'preview' && (
            <button
              onClick={() => setMobileViewMode('editor')}
              className="lg:hidden absolute top-4 right-4 z-50 p-3 bg-white text-gray-900 font-bold rounded-full shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
              <span className="text-xs">Volver a Editar</span>
            </button>
          )}

          <div id="cv-print-container" className="shadow-2xl relative bg-white scale-90 sm:scale-100 origin-top">
            {!isPaid && (
              <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden">
                <div className="transform -rotate-45 text-gray-400/30 text-3xl sm:text-4xl font-black uppercase tracking-widest whitespace-nowrap select-none border-4 border-gray-400/30 px-8 py-4 rounded-3xl">
                  CVRD.DO — VISTA PREVIA NO PAGADA
                </div>
              </div>
            )}

            {isClient && <ActiveTemplateComponent data={cvData} />}
          </div>
        </div>

      </div>

      {/* BARRA FLOTANTE INFERIOR EXCLUSIVA PARA MÓVILES */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-2xl flex items-center justify-around z-40 print:hidden">
        <button
          onClick={() => setMobileViewMode('editor')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
            mobileViewMode === 'editor' ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Edit3 className="w-4 h-4 text-amber-400" />
          <span>Editar Formulario</span>
        </button>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        <button
          onClick={() => setMobileViewMode('preview')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
            mobileViewMode === 'preview' ? 'bg-amber-500 text-gray-950 shadow-md' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Ver Vista Previa</span>
        </button>
      </div>

      {/* MODAL DE ADVERTENCIA / VERIFICACIÓN */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 print:hidden">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in duration-200 border border-gray-100">
            <div className="w-14 h-14 bg-gray-900 text-amber-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-gray-900">Verifica tus datos antes de continuar</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Asegúrate de que tu información profesional esté completa y sin errores antes de proceder al desbloqueo y descarga de tu currículum.
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
                className="flex-1 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE PAYPAL CON CÓDIGO PROMOCIONAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 print:hidden">
          <div className="bg-[#0f0f11] text-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-gray-800 animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h3 className="text-base font-black text-white">Total Estimado:</h3>
                <p className="text-xs text-gray-400">Plan: {selectedTemplateKey}</p>
              </div>
              <span className="text-xl font-black text-emerald-400">
                USD ${currentPrice}
              </span>
            </div>

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

            <div className="pt-4 border-t border-gray-800 space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-300 uppercase">
                <span>¿Tienes un código promocional?</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Introduce tu código"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white uppercase font-bold focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleApplyPromoCode}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs rounded-xl transition cursor-pointer"
                >
                  Aplicar
                </button>
              </div>
              {promoError && (
                <p className="text-[11px] text-red-500 font-semibold">{promoError}</p>
              )}
            </div>

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

      {/* MODAL DE ÉXITO */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 print:hidden">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-gray-900">¡Acceso Concedido con Éxito!</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tu currículum está listo para descargarse en formato vectorial HD de alta calidad.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 font-medium">
                🎉 ¡Gracias por elegir CVRD.DO! Mucho éxito en tu búsqueda de empleo.
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {isPaid ? (
                <PDFDownloadButton cvData={cvData} />
              ) : (
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setShowPaymentModal(true);
                  }}
                  className="w-full py-3.5 bg-amber-500 text-gray-950 font-black text-xs rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  Desbloquear Descarga
                </button>
              )}

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

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center font-bold text-sm">Cargando editor...</div>}>
      <BuilderContent />
    </Suspense>
  );
}