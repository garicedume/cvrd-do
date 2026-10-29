'use client';

import React, { useState, useRef } from 'react';
import { ArrowRight, FileUp, Camera, Loader2 } from 'lucide-react';

interface ImportBannerProps {
  onOpenModal?: () => void;
}

export const ImportBanner: React.FC<ImportBannerProps> = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    "Subiendo archivo al servidor seguro...",
    "Analizando estructura del documento con IA...",
    "Extrayendo experiencia, educación y habilidades...",
    "¡Listo! Preparando tu plantilla profesional..."
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setProgressStep(0);

    const interval = setInterval(() => {
      setProgressStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // CORREGIDO: Ruta alineada con tu endpoint actual (/api/ai/parse-cv)
      const response = await fetch('/api/ai/parse-cv', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      clearInterval(interval);

      if (result.success) {
        setProgressStep(steps.length - 1);
        
        // CORREGIDO: Guardado con la clave que lee automáticamente el editor ('cvrd_saved_cv_data')
        localStorage.setItem('cvrd_saved_cv_data', JSON.stringify(result.data || result.parsedData));
        
        setTimeout(() => {
          window.location.href = '/builder?imported=true';
        }, 800);
      } else {
        clearInterval(interval);
        setIsUploading(false);
        alert('Error al procesar el archivo: ' + (result.error || 'Desconocido'));
      }
    } catch (error) {
      clearInterval(interval);
      console.error('Error de red:', error);
      setIsUploading(false);
      alert('Ocurrió un error de conexión con el servidor. Intenta de nuevo.');
    }
  };

  return (
    <>
      <div className="relative overflow-hidden bg-linear-to-br from-gray-950 via-gray-900 to-black rounded-[2.5rem] p-8 sm:p-12 border-2 border-amber-400/40 shadow-2xl text-white">
        {/* Destellos y luces de fondo */}
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ❄️ EFECTO DE NIEVE / PARTÍCULAS INTACTAS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" />
          <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-amber-300/40 rounded-full blur-[1px]" />
          <div className="absolute bottom-1/4 right-1/5 w-1.5 h-1.5 bg-white/70 rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-left max-w-2xl">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              ¿Ya tienes un CV viejo? <br />
              <span className="text-amber-400">Transfórmalo y actualízalo al instante.</span>
            </h3>
            
            <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed">
              Sube tu currículum actual en formato PDF, Word o imagen. Nuestra inteligencia artificial extraerá toda tu información y la colocará mágicamente en una plantilla profesional lista para destacar en República Dominicana.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto flex flex-col items-center lg:items-end gap-4">
            <input 
              type="file" 
              ref={fileInputRef}
              accept=".pdf,.docx,image/*" 
              className="hidden" 
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <input 
              type="file" 
              ref={cameraInputRef}
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              onChange={handleFileChange}
              disabled={isUploading}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full lg:w-auto px-8.5 py-4.5 bg-linear-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-gray-950 font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl shadow-xl hover:shadow-amber-400/30 transition-all duration-300 flex items-center justify-center gap-3.5 active:scale-95 cursor-pointer group border border-amber-200"
            >
              <FileUp className="w-6 h-6 text-gray-950 group-hover:-translate-y-1 transition-transform" />
              <span>Subir mi CV viejo y actualizarlo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={() => cameraInputRef.current?.click()}
              disabled={isUploading}
              className="w-full lg:w-auto px-7.5 py-4 bg-gray-900/90 hover:bg-gray-800 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl border-2 border-amber-400/50 hover:border-amber-400 transition-all duration-200 flex items-center justify-center gap-3 active:scale-95 cursor-pointer backdrop-blur-md shadow-lg"
            >
              <Camera className="w-7 h-7 text-amber-400" />
              <span>Tomar foto al CV con la cámara</span>
            </button>

            <span className="text-[11px] text-gray-400 font-semibold mt-1">
              Rápido, seguro y sin empezar de cero
            </span>
          </div>
        </div>
      </div>

      {/* MODAL DE PROGRESO EN TIEMPO REAL (LIMPIO, SIN ESTRELLITAS) */}
      {isUploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="bg-gray-900 border-2 border-amber-400/50 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-amber-400/10 rounded-full border border-amber-400/30">
              <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-black text-white">Transformando tu Currículum</h4>
              <p className="text-sm text-amber-400 font-medium min-h-6">
                {steps[progressStep]}
              </p>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-gray-700">
              <div 
                className="bg-linear-to-r from-amber-500 to-yellow-300 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((progressStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2">
              {steps.map((_, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div className={`w-full h-1 rounded-full transition-colors duration-300 ${idx <= progressStep ? 'bg-amber-400' : 'bg-gray-800'}`} />
                  <span className={`text-[10px] font-bold ${idx <= progressStep ? 'text-amber-300' : 'text-gray-500'}`}>
                    Paso {idx + 1}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 italic">
              Nuestra IA está estructurando cada sección para que brilles en las empresas de RD.
            </p>
          </div>
        </div>
      )}
    </>
  );
};