'use client';

import React from 'react';

export default function Canvas() {
  return (
    <div className="w-full min-h-[calc(100vh-140px)] bg-gray-200 flex items-center justify-center p-6">
      
      {/* HOJA CARTA OFICIAL: 816px x 1056px */}
      <div 
        className="relative bg-white shadow-2xl overflow-hidden box-border"
        style={{
          width: '816px',
          height: '1056px',
        }}
      >
        
        {/* ÁREA DE CONTENIDO ÚTIL CON 0.5" (48px) DE MARGEN EXACTO EN LOS 4 LADOS */}
        <div 
          className="absolute box-border border-2 border-dashed border-gray-400 flex flex-col justify-between p-4"
          style={{
            top: '48px',
            left: '48px',
            right: '48px',
            bottom: '48px',
          }}
        >
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">Lienzo del Editor CVRD</h2>
            <p className="text-xs text-gray-500">Margen perimetral simétrico de 48px (0.5 pulgadas) garantizado.</p>
          </div>

          <div className="flex-1 flex items-center justify-center border border-gray-300 my-4 bg-gray-50">
            <span className="text-sm text-gray-400 font-medium">[ Área de Trabajo Activa ]</span>
          </div>

          <div className="text-right text-xs text-gray-400">
            Formato Carta (8.5&quot; x 11&quot;)
          </div>
        </div>

      </div>

    </div>
  );
}