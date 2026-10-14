'use client';

import { useState } from 'react';

export default function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isVerified = localStorage.getItem('age_verified');
    return !isVerified;
  });

  const handleVerify = async (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem('age_verified', 'true');
      setIsOpen(false);
    } else {
      try {
        await fetch('/api/block-ip', { method: 'POST' });
      } catch {
        // Ignorar error de red si ocurre
      }
      alert('Acceso denegado: Debes ser mayor de edad para utilizar este portal. Tu acceso ha sido restringido por 24 horas.');
      window.location.href = 'https://www.google.com';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 font-poppins select-none">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl space-y-6">
        <div>
          <span className="inline-block bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Control de Acceso
          </span>
          <h2 className="text-2xl font-black text-white">Verificación de Edad</h2>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            Para acceder a CVRD.DO debes confirmar que eres mayor de edad según las regulaciones vigentes.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleVerify(true)}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 text-xs rounded-2xl transition shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            Soy mayor de edad
          </button>
          <button
            onClick={() => handleVerify(false)}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3.5 text-xs rounded-2xl transition cursor-pointer"
          >
            Soy menor de edad
          </button>
        </div>
      </div>
    </div>
  );
}