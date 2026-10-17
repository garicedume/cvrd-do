'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, FileText, X, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useCV } from '@/context/CVContext';

interface ImportCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileAccepted?: (file: File) => void;
}

const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const ImportCVModal: React.FC<ImportCVModalProps> = ({
  isOpen,
  onClose,
  onFileAccepted,
}) => {
  const router = useRouter();
  
  // Tipado limpio con unknown para cumplir estrictamente con las reglas de ESLint
  let updateCVData: (_data: unknown) => void = () => {};
  let updatePersonal: (_contact: unknown) => void = () => {};

  try {
    const cvContext = useCV();
    updateCVData = cvContext.updateCVData as (_data: unknown) => void;
    updatePersonal = cvContext.updatePersonal as (_contact: unknown) => void;
  } catch {
    // Entorno sin proveedor ignorado
  }

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file: File) => {
    setError(null);

    if (!ALLOWED_TYPES.includes(file.type) && !file.name.toLowerCase().endsWith('.pdf') && !file.name.toLowerCase().endsWith('.docx')) {
      setError('Formato no permitido. Por favor sube un archivo PDF o Word (.docx).');
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('El archivo supera el límite de 5MB. Por favor elige uno más liviano.');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile) return;

    if (onFileAccepted) {
      onFileAccepted(selectedFile);
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/parse-cv', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Error al procesar el archivo.');
      }

      if (result.parsedData) {
        const parsed = result.parsedData as Record<string, unknown>;

        if (parsed.contact && typeof parsed.contact === 'object' && parsed.contact !== null) {
          const contactObj = parsed.contact as Record<string, string>;
          updatePersonal({
            fullName: contactObj.fullName || contactObj.nombre || '',
            professionalTitle: contactObj.professionalTitle || contactObj.cargo || '',
            phone: contactObj.phone || contactObj.telefono || '',
            email: contactObj.email || contactObj.correo || '',
            city: contactObj.city || '',
            country: contactObj.country || '',
          });
        }

        const safeExperiences = Array.isArray(parsed.experiences) ? parsed.experiences : [];
        const safeEducation = Array.isArray(parsed.education) ? parsed.education : [];
        const safeSkills = Array.isArray(parsed.skills) ? parsed.skills : [];
        const safeLanguages = Array.isArray(parsed.languages) ? parsed.languages : [];

        updateCVData({
          summary: typeof parsed.summary === 'string' ? parsed.summary : '',
          experience: safeExperiences.map((expItem: unknown, index: number) => {
            const exp = (expItem && typeof expItem === 'object' ? expItem : {}) as Record<string, unknown>;
            return {
              id: `exp-imported-${index}-${Date.now()}`,
              role: String(exp.position || exp.role || ''),
              company: String(exp.company || ''),
              startDate: String(exp.startDate || ''),
              endDate: String(exp.endDate || 'Presente'),
              description: Array.isArray(exp.responsibilities) 
                ? exp.responsibilities.join('\n') 
                : String(exp.responsibilities || exp.description || ''),
            };
          }),
          education: safeEducation.map((eduItem: unknown, index: number) => {
            const edu = (eduItem && typeof eduItem === 'object' ? eduItem : {}) as Record<string, unknown>;
            return {
              id: `edu-imported-${index}-${Date.now()}`,
              degree: String(edu.degree || ''),
              institution: String(edu.institution || ''),
              startDate: String(edu.startDate || ''),
              endDate: String(edu.endDate || ''),
            };
          }),
          skills: safeSkills.map((skItem: unknown, index: number) => {
            const sk = (skItem && typeof skItem === 'object' ? skItem : {}) as Record<string, unknown>;
            const name = typeof skItem === 'string' ? skItem : String(sk.name || '');
            const type = (typeof sk === 'object' && sk.type === 'blanda' ? 'blanda' : 'técnica') as 'técnica' | 'blanda';
            return {
              id: `sk-imported-${index}-${Date.now()}`,
              name,
              type,
            };
          }),
          languages: safeLanguages.map((langItem: unknown, index: number) => {
            const lang = (langItem && typeof langItem === 'object' ? langItem : {}) as Record<string, unknown>;
            const name = typeof langItem === 'string' ? langItem : String(lang.language || lang.name || '');
            const level = typeof lang === 'object' ? String(lang.proficiency || lang.level || 'Intermedio') : 'Intermedio';
            return {
              id: `lang-imported-${index}-${Date.now()}`,
              name,
              level,
            };
          }),
        });
      }

      setIsProcessing(false);
      onClose();
      router.push('/builder');

    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error inesperado al conectar con el servidor.';
      setError(errorMessage);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm p-4 font-poppins overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-gray-200 shadow-2xl relative space-y-6 my-auto">
        
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-5 right-5 p-3 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-gray-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20 shrink-0">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-950">¿Ya tienes un CV?</h3>
            <p className="text-xs text-gray-500 font-medium">
              Sube tu archivo y lo transformamos automáticamente.
            </p>
          </div>
        </div>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 ${
            dragActive
              ? 'border-amber-500 bg-amber-50/50 scale-[1.01]'
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleChange}
            disabled={isProcessing}
            className="hidden"
          />

          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-200 flex items-center justify-center text-amber-500">
            {selectedFile ? <FileText className="w-7 h-7 text-emerald-600" /> : <UploadCloud className="w-7 h-7" />}
          </div>

          {selectedFile ? (
            <div className="space-y-1">
              <p className="text-xs font-black text-emerald-700 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> {selectedFile.name}
              </p>
              <p className="text-[10px] text-gray-500 font-medium">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB — Listo para procesar
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-xs font-black text-gray-800">
                Toca aquí para <span className="text-amber-600 underline">elegir tu archivo</span> o arrástralo
              </p>
              <p className="text-[10px] text-gray-400 font-medium">
                PDF o Word (.docx) (Máximo 5MB)
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-red-700 text-xs font-bold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          disabled={!selectedFile || isProcessing}
          onClick={handleConfirmUpload}
          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
            selectedFile && !isProcessing
              ? 'bg-gray-900 text-white hover:bg-amber-400 hover:text-gray-950 cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
              <span>Transformando con IA...</span>
            </>
          ) : (
            <span>Transformar y Extraer Datos con IA</span>
          )}
        </button>

      </div>
    </div>
  );
};